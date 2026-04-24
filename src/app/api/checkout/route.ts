import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover' as any,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const { 
      items, 
      email, 
      buyerData, 
      invoiceData, 
      deliveryMethod, 
      selectedPoint, 
      shippingAddress 
    } = body;

    // Przygotowanie linii produktów dla Stripe
    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'pln',
        product_data: {
          name: item.name,
          // Kluczowe: Przekazujemy rozmiar w opisie, by webhook mógł go wyłuskać
          description: `Rozmiar: ${item.size || 'Uniwersalny'} | VIN: ${item.vin}`,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: 1,
    }));

    const origin = req.headers.get('origin') || 'https://www.viziawear.com';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'blik'],
      line_items,
      mode: 'payment',
      customer_email: email,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      metadata: {
        buyer_name: `${buyerData?.firstName || ''} ${buyerData?.lastName || ''}`.trim(),
        buyer_phone: String(buyerData?.phone || ''),
        delivery_method: String(deliveryMethod || 'kurier'),
        point_name: selectedPoint?.name || 'N/A',
        vin_assignments: JSON.stringify(items.map((i: any) => ({ vinFull: i.vin, size: i.size }))),
        // Dane adresowe - muszą być płaskimi stringami
        buyer_street: String(shippingAddress?.street || ''),
        buyer_city: String(shippingAddress?.city || ''),
        buyer_zip: String(shippingAddress?.zipCode || ''),
        invoice_requested: invoiceData?.wantsInvoice ? 'true' : 'false',
      },
    });

    // Zapis do bazy - USUNĄŁEM total_amount, bo powoduje błąd w Twoim Supabase
    const { error: orderError } = await supabase.from('orders').insert({
      status: 'pending',
      customer_email: email,
      customer_phone: buyerData?.phone,
      shipping_type: deliveryMethod,
      paczkomat_id: selectedPoint?.name ?? null,
      address_json: shippingAddress ?? null,
      assigned_vin: items.map((i: any) => i.vin).join(', '),
      stripe_session_id: session.id,
      // total_amount: items.reduce((sum: number, i: any) => sum + i.price, 0), // ODBLOKUJ JAK DODASZ KOLUMNĘ W SUPABASE
    });

    if (orderError) console.error('Błąd zapisu zamówienia:', orderError.message);

    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error('Błąd Checkout API:', err);
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 });
  }
}