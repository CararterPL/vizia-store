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

    console.log('🔔 Procesowanie sesji:', session.id);
    console.log('📋 Metadata:', JSON.stringify(metadata, null, 2));

    try {
      // 1. Dekoduj VINy z metadanych
      const vinAssignments = JSON.parse(metadata?.vin_assignments || '[]');
      console.log('VIN assignments:', vinAssignments);

      // 2. Oznacz VINy jako sprzedane
      for (const assignment of vinAssignments) {
        const { error } = await supabase
          .from('vin_pool')
          .update({
            is_sold: true,
            assigned_at: new Date().toISOString(),
            reserved_until: null,
            reserved_by_session: null,
          })
          .eq('vin_full', assignment.vinFull);
        
        if (error) console.error('Błąd update VIN:', assignment.vinFull, error);
        else console.log('✅ VIN oznaczony jako sprzedany:', assignment.vinFull);
      }

      // 3. Zaktualizuj status zamówienia
      await supabase
        .from('orders')
        .update({ status: 'paid' })
        .eq('stripe_session_id', session.id);

      // 4. Pobierz line items ze Stripe
      const lineItemsResponse = await stripe.checkout.sessions.listLineItems(session.id);
      console.log('Line items:', JSON.stringify(lineItemsResponse.data, null, 2));

      // 5. Buduj items łącząc dane ze Stripe i metadanych
      const items = lineItemsResponse.data.map((lineItem, index) => {
        const assignment = vinAssignments[index] || {};
        // Wyciągnij rozmiar z description: "Rozmiar: M | VIN: SHDWRC-..."
        const sizeMatch = lineItem.description?.match(/Rozmiar:\s*([^|]+)/);
        const size = assignment.size || sizeMatch?.[1]?.trim() || 'N/A';
        const vinFull = assignment.vinFull || '';

        return {
          name: lineItem.description?.split('|')[0]?.trim() || lineItem.description || '',
          price: (lineItem.amount_total || 0) / 100,
          quantity: lineItem.quantity || 1,
          vin: vinFull,
          size: size,
        };
      });

      console.log('Items dla maila:', JSON.stringify(items, null, 2));

      // 6. Rozdziel imię i nazwisko
      const buyerName = metadata?.buyer_name || '';
      const nameParts = buyerName.trim().split(/\s+/);
      const firstName = nameParts[0] || 'Klient';
      const lastName = nameParts.slice(1).join(' ') || '';

      // 7. Buduj orderData
      const deliveryMethod = metadata?.delivery_method || 'kurier';
      const isPaczkomat = deliveryMethod === 'paczkomat';

      const orderData = {
        items,
        buyerData: {
          firstName,
          lastName,
          phone: metadata?.buyer_phone || '',
          email: session.customer_details?.email || session.customer_email || '',
        },
        invoiceData: {
          wantsInvoice: metadata?.invoice_requested === 'true',
        },
        deliveryMethod,
        selectedPoint: isPaczkomat ? {
          name: metadata?.point_name || '',
          address_details: { street: '', city: '' },
        } : null,
        shippingAddress: !isPaczkomat ? {
          street: metadata?.buyer_street || '',
          city: metadata?.buyer_city || '',
          zipCode: metadata?.buyer_zip || '',
        } : null,
        stripeOrderId: session.id,
      };

      console.log('📦 OrderData dla maila:', JSON.stringify(orderData, null, 2));

      // 8. Wyślij maile
      const emailResponse = await fetch(`${origin}/api/send-order-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error('❌ Błąd API mailowego:', errorText);
      } else {
        console.log('✅ Maile wysłane pomyślnie');
      }

    } catch (processError) {
      console.error('❌ Błąd krytyczny webhooka:', processError);
      return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}