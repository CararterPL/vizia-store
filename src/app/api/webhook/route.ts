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
  
  // Wymuszamy pełny URL dla fetch, aby uniknąć problemów z przekierowaniami
  const origin = 'https://www.viziawear.com';

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

    console.log('🔔 Procesowanie opłaconej sesji:', session.id);

    try {
      // 1. Dekodujemy metadane (VINy i opcjonalny obiekt adresu)
      const vinAssignments = JSON.parse(metadata?.vin_assignments || '[]');
      
      let addressObj: any = null;
      if (metadata?.address) {
        try {
          addressObj = JSON.parse(metadata.address);
        } catch (e) {
          console.error("Błąd parsowania metadata.address JSON");
        }
      }

      // Rozdzielanie imienia i nazwiska z pola buyer_name
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

      // 4. Pobierz przedmioty z sesji Stripe (tu jest nazwa, cena i opis z rozmiarem)
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      // 5. Budujemy finalny obiekt zamówienia dla maila
      const orderData = {
        items: lineItems.data.map(item => ({
          name: item.description, // Zawiera: "Nazwa | Rozmiar: ... | VIN: ..."
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
        deliveryMethod: metadata?.delivery_method || 'kurier',
        selectedPoint: { 
          name: metadata?.point_name || '' 
        },
        // Pobieramy dane z konkretnych kluczy, które teraz wysyła Checkout
        shippingAddress: {
          street: metadata?.buyer_street || addressObj?.street || '',
          city: metadata?.buyer_city || addressObj?.city || '',
          zip: metadata?.buyer_zip || addressObj?.zipCode || addressObj?.zip || ''
        },
        stripeOrderId: session.id
      };

      // 6. Wyślij e-mail (drukarnia / klient)
      console.log('📨 Wysyłanie maila dla:', orderData.buyerData.email);
      
      const emailResponse = await fetch(`${origin}/api/send-order-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error('❌ Błąd API mailowego:', errorText);
      } else {
        console.log('✅ Mail wysłany pomyślnie');
      }

    } catch (processError) {
      console.error('❌ Błąd krytyczny webhooka:', processError);
      return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}