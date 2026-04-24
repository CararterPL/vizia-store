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
  // Upewnij się, że origin ma WWW jeśli tak masz w Stripe
  const origin = req.headers.get('origin') || 'https://www.viziawear.com';

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
      // 1. Dekodujemy metadane (zgodnie z logami Stripe)
      const vinAssignments = JSON.parse(session.metadata?.vin_assignments || '[]');
      
      // LOGIKA NAPRAWCZA DLA ADRESU:
      // Twoje metadane nie mają obiektu "address", mają pola "buyer_name" itp.
      // Jeśli adres przesyłasz w metadata jako stringi, musimy je stąd wyciągnąć.
      const buyerName = session.metadata?.buyer_name || '';
      const [firstName, ...lastNameParts] = buyerName.split(' ');
      const lastName = lastNameParts.join(' ');

      // 2. Oznacz VINy jako sprzedane
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

      // 3. Zaktualizuj status zamówienia
      await supabase
        .from('orders')
        .update({ status: 'paid' })
        .eq('stripe_session_id', session.id);

      // 4. Przygotuj dane do maila
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      // Mapowanie danych dla maila, aby uniknąć "undefined"
      const orderData = {
        items: lineItems.data.map(item => ({
          name: item.description, // Zawiera nazwę + rozmiar (Stripe to łączy)
          price: item.amount_total / 100,
          quantity: item.quantity,
          vin: vinAssignments.map((a: any) => a.vinFull).join(', ')
        })),
        buyerData: {
          firstName: firstName || 'Klient',
          lastName: lastName || '',
          phone: session.metadata?.buyer_phone || '',
          email: session.customer_details?.email || session.customer_email
        },
        deliveryMethod: session.metadata?.delivery_method || 'Kurier',
        selectedPoint: { 
          name: session.metadata?.point_name || '' 
        },
        // Jeśli nie masz obiektu address w metadata, budujemy go z dostępnych pól:
        shippingAddress: {
          street: session.metadata?.buyer_street || '', // Upewnij się że wysyłasz te klucze w checkout
          city: session.metadata?.buyer_city || '',
          zip: session.metadata?.buyer_zip || ''
        },
        stripeOrderId: session.id
      };

      // 5. Wyślij maila
      await fetch(`${origin}/api/send-order-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      console.log(`✅ Sukces: ${session.id}`);

    } catch (processError) {
      console.error('Błąd procesowania:', processError);
      return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}