import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { items, email, buyerData, invoiceData, deliveryMethod, selectedPoint, shippingAddress } = await req.json();

    // 1. VINy są już zarezerwowane przy dodaniu do koszyka
    const vinAssignments = items.map((item: any) => ({
      vinFull: item.vin,
    }));

    // 2. Utwórz sesję Stripe Checkout
    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'pln',
        product_data: {
          name: `${item.name} — VIN: ${item.vin}`,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: 1,
    }));

    const origin = req.headers.get('origin') || 'https://vizia.pl';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'p24', 'blik'],
      line_items,
      mode: 'payment',
      customer_email: email,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      metadata: {
        buyer_name: `${buyerData.firstName} ${buyerData.lastName}`,
        buyer_phone: buyerData.phone,
        delivery: deliveryMethod,
        point: selectedPoint ? selectedPoint.name : '',
        address: shippingAddress ? JSON.stringify(shippingAddress) : '',
        vin_assignments: JSON.stringify(vinAssignments),
      },
    });

    // 3. Zapisz zamówienie w Supabase ze statusem 'pending'
    await supabase.from('orders').insert({
      status: 'pending',
      customer_email: email,
      customer_phone: buyerData.phone,
      shipping_type: deliveryMethod,
      paczkomat_id: selectedPoint?.name ?? null,
      address_json: shippingAddress ?? null,
      assigned_vin: items.map((i: any) => i.vin).join(', '),
      stripe_session_id: session.id,
    });

    // 4. Wyślij e-mail do drukarni
    await fetch(`${origin}/api/send-order-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items,
        buyerData,
        invoiceData,
        deliveryMethod,
        selectedPoint,
        shippingAddress,
      }),
    });

    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error('Błąd Checkout API:', err);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas procesowania zamówienia.' },
      { status: 500 }
    );
  }
}