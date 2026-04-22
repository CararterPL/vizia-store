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

// WAŻNE: wyłącz parsowanie body przez Next.js – Stripe wymaga raw body
export const config = { api: { bodyParser: false } };

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature error:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Oznacz VINy jako sprzedane
    const vinAssignments = JSON.parse(session.metadata?.vin_assignments || '[]');
    for (const assignment of vinAssignments) {
      await supabase
        .from('vin_pool')
        .update({
          is_sold: true,
          assigned_at: new Date().toISOString(),
          reserved_until: null,
          reserved_by_session: null,
        })
        .eq('vin_full', assignment.vinFull);
    }

    // Zaktualizuj status zamówienia na 'paid'
    await supabase
      .from('orders')
      .update({ status: 'paid' })
      .eq('stripe_session_id', session.id);

    console.log(`✅ Zamówienie opłacone: ${session.id}`);
  }

  return NextResponse.json({ received: true });
}