import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover' as any, // Wymuszamy wersję lub używamy najnowszej dostępnej
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Używamy Service Role, aby ominąć RLS przy zapisie zamówienia
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

    // 1. Przygotowanie mapy VINów dla Webhooka (uproszczony format)
    const vinAssignments = items.map((item: any) => ({
      vinFull: item.vin,
    }));

    // 2. Przygotowanie pozycji koszyka dla Stripe
    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'pln',
        product_data: {
          name: `${item.name}`,
          description: `VIN: ${item.vin} | Rozmiar: ${item.size}`,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: 1,
    }));

    const origin = req.headers.get('origin') || 'https://viziawear.com';

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
        // Stripe metadata przyjmuje tylko stringi, więc obiekty musimy zserializować
        vin_assignments: JSON.stringify(vinAssignments),
        invoice_requested: invoiceData.wantsInvoice ? 'true' : 'false',
        invoice_details: invoiceData.wantsInvoice ? JSON.stringify(invoiceData) : '',
      },
    });

    // 4. Zapisanie zamówienia w Supabase ze statusem 'pending'
    // Zapisujemy wszystko, co będzie potrzebne webhookowi lub adminowi
    const { error: orderError } = await supabase.from('orders').insert({
      status: 'pending',
      customer_email: email,
      customer_phone: buyerData.phone,
      shipping_type: deliveryMethod,
      paczkomat_id: selectedPoint?.name ?? null,
      address_json: shippingAddress ?? null,
      assigned_vin: items.map((i: any) => i.vin).join(', '),
      stripe_session_id: session.id,
      total_amount: items.reduce((sum: number, i: any) => sum + i.price, 0),
      // Tutaj możesz zapisać invoiceData jako JSONB jeśli masz taką kolumnę
    });

    if (orderError) {
      console.error('Supabase Order Error:', orderError);
      // Nie przerywamy, bo sesja Stripe już jest utworzona, ale logujemy błąd
    }

    // UWAGA: Usunąłem stąd wysyłkę e-maila do drukarni. 
    // Przenieś ją do webhook/route.ts pod event 'checkout.session.completed'.

    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error('Błąd Checkout API:', err);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas procesowania zamówienia.' },
      { status: 500 }
    );
  }
}