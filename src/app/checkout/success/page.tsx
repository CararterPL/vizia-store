'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [vin, setVin] = useState<string | null>(null);
  const { clearCart } = useCart();

  useEffect(() => {
    if (!sessionId) return;
    
    // Wyczyść koszyk po udanej płatności
    clearCart();

    // Pobierz numer VIN z zamówienia
    fetch(`/api/order-details?session_id=${sessionId}`)
      .then(r => r.json())
      .then(d => { if (d.vin) setVin(d.vin); });
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="space-y-2">
          <p className="text-[rgb(255,19,58)] text-xs uppercase tracking-widest">Zamówienie potwierdzone</p>
          <h1 className="text-5xl font-bold">Dziękujemy.</h1>
        </div>

        <div className="border border-white/10 bg-zinc-900 p-8 space-y-4">
          <p className="text-white/60 text-sm">Twój numer rejestracyjny koszulki</p>
          {vin ? (
            <p className="text-3xl font-mono font-bold tracking-widest text-[rgb(255,19,58)]">{vin}</p>
          ) : (
            <p className="text-white/30 text-sm animate-pulse">Pobieranie numeru VIN...</p>
          )}
          <p className="text-white/40 text-xs">
            Potwierdzenie zamówienia zostało wysłane na Twój adres e-mail.
          </p>
        </div>

        <p className="text-white/50 text-sm leading-relaxed">
          Koszulka jest produkowana na zamówienie.<br />
          Szacowany czas realizacji: <span className="text-white">7–14 dni roboczych</span>.
        </p>

        <Link href="/" className="inline-block border border-white/20 px-8 py-4 text-xs uppercase tracking-widest hover:border-white transition-colors">
          Wróć do sklepu
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="animate-pulse text-xs tracking-widest uppercase">Weryfikacja płatności...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}