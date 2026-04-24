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
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  const origin = req.headers.get('origin') || 'https://viziawear.com';

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

    try {
      // 1. Dekodujemy metadane ze Stripe
      const vinAssignments = JSON.parse(session.metadata?.vin_assignments || '[]');
      const shippingAddress = session.metadata?.address ? JSON.parse(session.metadata.address) : null;
      const invoiceDetails = session.metadata?.invoice_details ? JSON.parse(session.metadata.invoice_details) : null;

      // 2. Oznacz VINy jako sprzedane w bazie
      for (const assignment of vinAssignments) {
        const { error: vinError } = await supabase
          .from('vin_pool')
          .update({
            is_sold: true,
            assigned_at: new Date().toISOString(),
            reserved_until: null,
            reserved_by_session: null,
          })
          .eq('vin_full', assignment.vinFull);
        
        if (vinError) console.error(`Błąd aktualizacji VIN ${assignment.vinFull}:`, vinError);
      }

      // 3. Zaktualizuj status zamówienia w Supabase na 'paid'
      const { error: orderError } = await supabase
        .from('orders')
        .update({ status: 'paid' })
        .eq('stripe_session_id', session.id);

      if (orderError) console.error('Błąd aktualizacji statusu zamówienia:', orderError);

      // 4. WYŚLIJ E-MAIL DO DRUKARNI
      // Pobieramy line_items ze Stripe, żeby mieć listę produktów z cenami
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      await fetch(`${origin}/api/send-order-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: lineItems.data.map(item => ({
            name: item.description, // Tutaj Stripe trzyma nazwę + nasz dopisek o VIN/Rozmiarze
            price: item.amount_total / 100,
            quantity: item.quantity,
            // Przekazujemy surowe dane z metadanych dla maila
            vin: vinAssignments.map((a: any) => a.vinFull).join(', ')
          })),
          buyerData: {
            firstName: session.metadata?.buyer_name?.split(' ')[0] || '',
            lastName: session.metadata?.buyer_name?.split(' ')[1] || '',
            phone: session.metadata?.buyer_phone || '',
            email: session.customer_details?.email || session.customer_email
          },
          deliveryMethod: session.metadata?.delivery_method,
          selectedPoint: { name: session.metadata?.point_name },
          shippingAddress: shippingAddress,
          invoiceData: invoiceDetails,
          stripeOrderId: session.id
        }),
      });

      console.log(`✅ Zamówienie opłacone i wysłane do drukarni: ${session.id}`);

    } catch (processError) {
      console.error('Błąd podczas procesowania opłaconego zamówienia:', processError);
      // Zwracamy 500, żeby Stripe ponowił webhooka za jakiś czas jeśli to błąd sieciowy
      return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}