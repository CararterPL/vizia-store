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
    const metadata = session.metadata;

    try {
      // 1. Dekodujemy metadane
      const vinAssignments = JSON.parse(metadata?.vin_assignments || '[]');
      
      // Próba odczytania adresu z obiektu JSON (jeśli istnieje)
      let addressObj: any = null;
      try {
        if (metadata?.address) {
          addressObj = JSON.parse(metadata.address);
        }
      } catch (e) {
        console.error("Błąd parsowania adresu JSON:", e);
      }

      // Rozdzielanie imienia i nazwiska
      const buyerName = metadata?.buyer_name || '';
      const nameParts = buyerName.trim().split(/\s+/);
      const firstName = nameParts[0] || 'Klient';
      const lastName = nameParts.slice(1).join(' ') || '';

      // 2. Oznacz VINy jako sprzedane w bazie danych
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

      // 3. Zaktualizuj status zamówienia w Supabase
      await supabase
        .from('orders')
        .update({ status: 'paid' })
        .eq('stripe_session_id', session.id);

      // 4. Przygotuj listę przedmiotów z sesji Stripe
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      // 5. Budujemy finalny obiekt zamówienia dla maila
      const orderData = {
        items: lineItems.data.map(item => ({
          name: item.description, 
          price: item.amount_total / 100,
          quantity: item.quantity,
          vin: vinAssignments.map((a: any) => a.vinFull).join(', ')
        })),
        buyerData: {
          firstName: firstName,
          lastName: lastName,
          phone: metadata?.buyer_phone || '',
          email: session.customer_details?.email || session.customer_email || ''
        },
        deliveryMethod: metadata?.delivery_method || 'Kurier',
        selectedPoint: { 
          name: metadata?.point_name || '' 
        },
        // Pobieramy dane z obiektu LUB z płaskich metadanych
        shippingAddress: {
          street: addressObj?.street || metadata?.buyer_street || '',
          city: addressObj?.city || metadata?.buyer_city || '',
          zip: addressObj?.zipCode || addressObj?.zip || metadata?.buyer_zip || ''
        },
        stripeOrderId: session.id
      };

      // 6. Wyślij e-mail do drukarni/klienta
      const emailResponse = await fetch(`${origin}/api/send-order-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!emailResponse.ok) {
        throw new Error(`Email API responded with status ${emailResponse.status}`);
      }

      console.log(`✅ Webhook zakończony sukcesem dla sesji: ${session.id}`);

    } catch (processError) {
      console.error('❌ Błąd podczas procesowania webhooka:', processError);
      return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}