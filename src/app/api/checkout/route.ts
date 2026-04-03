import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Pobieramy klucz z Env lub używamy bezpiecznej atrapy dla buildu
const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_vizia_placeholder';

// Inicjalizacja Stripe z ignorowaniem błędów wersji dla atrapy
const stripe = new Stripe(STRIPE_KEY, {
  // @ts-ignore - wymuszamy kompatybilność przy braku klucza
  apiVersion: '2023-10-16', 
});

export async function POST(req: Request) {
  try {
    const { items, email, buyerData, deliveryMethod, selectedPoint } = await req.json();

    // LOGIKA TESTOWA: Jeśli nie ma prawdziwego klucza Stripe
    if (STRIPE_KEY === 'sk_test_vizia_placeholder') {
      console.log("TRYB SYMULACJI: Brak klucza STRIPE_SECRET_KEY. Przekierowanie do sukcesu.");
      
      // Tutaj w przyszłości możesz dodać zapis do bazy danych (np. Supabase) 
      // jako zamówienie oczekujące na płatność.

      return NextResponse.json({ 
        url: '/checkout/success', 
        simulated: true 
      });
    }

    // LOGIKA PRODUKCYJNA: Wykonywana tylko gdy klucz zostanie dodany do .env
    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'pln',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Stripe operuje na groszach
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'p24', 'blik'],
      line_items,
      mode: 'payment',
      customer_email: email,
      success_url: `${req.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/checkout`,
      metadata: {
        buyer_name: `${buyerData.firstName} ${buyerData.lastName}`,
        delivery: deliveryMethod,
        point: selectedPoint ? selectedPoint.name : 'Kurier',
      },
    });

    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error("Błąd Checkout API:", err);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas procesowania zamówienia.' }, 
      { status: 500 }
    );
  }
}