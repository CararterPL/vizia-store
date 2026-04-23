'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Sprawdzamy, czy użytkownik już zaakceptował ciastka
    const consent = localStorage.getItem('vizia_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('vizia_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[200] p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-zinc-950 border border-white/10 p-6 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl">
        <div className="flex items-start gap-4">
          {/* Mały czerwony punkt - jedyny akcent wizualny */}
          <div className="w-2 h-2 bg-[rgb(255,19,58)] mt-1.5 shrink-0" />
          
          <p className="text-[12px] font-medium leading-relaxed tracking-tight text-zinc-400 max-w-2xl">
            Strona korzysta z plików cookies, aby zapewnić prawidłowe działanie koszyka i bezpieczną obsługę płatności Stripe. Korzystając ze strony, akceptujesz nasze zasady prywatności.
            <Link href="/polityka-prywatnosci" className="text-white underline ml-2 hover:text-[rgb(255,19,58)] transition-colors">
              Polityka prywatności
            </Link>
          </p>
        </div>
        
        <button
          onClick={acceptCookies}
          className="w-full md:w-auto px-8 py-3 bg-white text-black text-[11px] font-bold uppercase tracking-widest hover:bg-[rgb(255,19,58)] hover:text-white transition-all duration-300"
        >
          Rozumiem
        </button>
      </div>
    </div>
  );
};