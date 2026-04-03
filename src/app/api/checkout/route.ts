import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase'; // Poprawna ścieżka do Twojego pliku
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      items, 
      buyerData, 
      deliveryMethod, 
      shippingCost, 
      selectedPoint, 
      shippingAddress 
    } = body;

    // 1. Inicjacja sesji Stripe (wymaga kluczy w .env)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'p24', 'blik'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'pln',
          product_data: { name: `${item.name} [VIN: ${item.vin_full}]` }, // Klumna z Twojej bazy
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
    });

    // 2. Zapis do Twojej tabeli 'orders'
    const { error: dbError } = await supabase
      .from('orders')
      .insert([
        {
          status: 'pending', //
          customer_email: buyerData.email, //
          customer_phone: buyerData.phone, //
          shipping_type: deliveryMethod, //
          paczkomat_id: selectedPoint?.name || null, //
          address_json: deliveryMethod === 'kurier' ? shippingAddress : selectedPoint?.address_details, //
          assigned_vin: items.map((i: any) => i.vin_full).join(', '), //
          stripe_session_id: session.id //
        }
      ]);

    if (dbError) throw dbError;

    return NextResponse.json({ sessionId: session.id });

  } catch (err: any) {
    console.error("BŁĄD_CHECKOUT:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}