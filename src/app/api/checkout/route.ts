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
    const { 
      items, 
      email, 
      buyerData, 
      invoiceData, 
      deliveryMethod, 
      selectedPoint, 
      shippingAddress 
    } = await req.json();

    const vinAssignments = items.map((item: any) => ({
      vinFull: item.vin,
    }));

    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'pln',
        product_data: {
          name: `${item.name}`,
          // Dodajemy rozmiar do opisu, to zawsze widać w panelu Stripe
          description: `VIN: ${item.vin} | ROZMIAR: ${item.size}`,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: 1,
    }));

    const origin = req.headers.get('origin') || 'https://www.viziawear.com';

    // 3. Utworzenie sesji Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'blik'],
      line_items,
      mode: 'payment',
      customer_email: email,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      metadata: {
        buyer_name: `${buyerData.firstName} ${buyerData.lastName}`,
        buyer_phone: buyerData.phone,
        delivery_method: deliveryMethod,
        point_name: selectedPoint ? selectedPoint.name : 'N/A',
        vin_assignments: JSON.stringify(vinAssignments),
        // TUTAJ POPRAWKA - Mapujemy jawnie każde pole
        buyer_street: shippingAddress?.street || '',
        buyer_city: shippingAddress?.city || '',
        buyer_zip: shippingAddress?.zipCode || '', // frontend używa zipCode
        // Dodatkowo cały obiekt jako string
        address: shippingAddress ? JSON.stringify(shippingAddress) : '',
        invoice_requested: invoiceData.wantsInvoice ? 'true' : 'false',
        invoice_details: invoiceData.wantsInvoice ? JSON.stringify(invoiceData) : '',
      },
    });

    // 4. Zapisanie zamówienia w Supabase
    const { error: orderError } = await supabase.from('orders').insert({
      status: 'pending',
      customer_email: email,
      customer_phone: buyerData.phone,
      shipping_type: deliveryMethod,
      paczkomat_id: selectedPoint?.name ?? null,
      address_json: shippingAddress ?? null, // To zapisuje adres w bazie przy starcie
      assigned_vin: items.map((i: any) => i.vin).join(', '),
      stripe_session_id: session.id,
      total_amount: items.reduce((sum: number, i: any) => sum + i.price, 0),
    });

    if (orderError) console.error('Supabase Order Error:', orderError);

    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error('Błąd Checkout API:', err);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas procesowania zamówienia.' },
      { status: 500 }
    );
  }
}