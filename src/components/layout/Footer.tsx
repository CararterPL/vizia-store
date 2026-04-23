'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleNRG = async () => {
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-vizia-black pt-24 pb-12 px-6 md:px-12 border-t border-white/5">
      {/* USPÓJNIONA SZEROKOŚĆ 1600px */}
      <div className="max-w-[1600px] mx-auto">
        
        {/* TOP SECTION: LOGO + NRG_ACCESS */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-sm">
            <Logo className="h-6 md:h-7 w-auto text-white mb-8 transition-colors hover:text-vizia-red" />
            <p className="text-zinc-300 font-sans text-sm leading-relaxed">
              VIZIA Wear for night run. Designed by Vince Carson. Powered by Automotive Culture. Ściśle limitowane serie. Raz na zawsze.
            </p>
          </div>

          {/* MODUŁ ZAPISU DO NRG */}
          <div className="w-full lg:w-[450px] space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 bg-vizia-red animate-pulse" />
              <h5 className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white italic">
                NRG_Subscription //
              </h5>
            </div>

            {status === 'success' ? (
              <div className="border border-vizia-red/30 bg-vizia-red/5 p-4">
                <p className="text-[11px] font-mono text-vizia-red uppercase tracking-widest">
                  Dostęp przyznany. Sprawdź skrzynkę.
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="EMAIL_ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleNRG()}
                    className="flex-grow bg-zinc-900/50 border border-white/5 px-4 py-3 font-mono text-[11px] text-white focus:outline-none focus:border-vizia-red/50 transition-colors uppercase tracking-widest"
                  />
                  <Button
                    variant="primary"
                    size="md"
                    className="whitespace-nowrap"
                    onClick={handleNRG}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'AUTH...' : 'JOIN_NRG'}
                  </Button>
                </div>
                {status === 'error' && (
                  <p className="text-[10px] font-mono text-vizia-red uppercase tracking-widest">
                    Błąd zapisu. Spróbuj ponownie.
                  </p>
                )}
              </>
            )}

            <p className="font-mono text-[8px] text-zinc-400 uppercase tracking-widest leading-relaxed">
              * Zapisując się do sieci NRG, zyskujesz pierwszeństwo przy rezerwacji limitowanych serii oraz dostęp do modeli w fazie "The Hideout".
            </p>
          </div>
        </div>

        {/* MIDDLE SECTION: NAVIGATION GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16 border-y border-white/5 py-12">
          <div className="space-y-6">
            <h5 className="text-vizia-red text-[10px] font-mono uppercase tracking-[0.3em] font-black italic">System_//</h5>
            <ul className="list-none p-0 space-y-3 font-mono text-[11px] uppercase tracking-widest text-zinc-300">
              <li><Link href="/#products" className="hover:text-white transition-colors">Kolekcja</Link></li>
              <li><Link href="/custom" className="hover:text-white transition-colors">Custom Division</Link></li>
              <li><Link href="/archive" className="hover:text-white transition-colors">Archiwum</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h5 className="text-vizia-red text-[10px] font-mono uppercase tracking-[0.3em] font-black italic">Social_//</h5>
            <ul className="list-none p-0 space-y-3 font-mono text-[11px] uppercase tracking-widest text-zinc-300">
              <li><a href="https://www.instagram.com/vizia_wear/" className="hover:text-white transition-colors" target='_blank'>Instagram</a></li>
              <li><a href="https://www.facebook.com/vizia.wear" className="hover:text-white transition-colors" target='_blank'>Facebook</a></li>
            </ul>
          </div>

          <div className="space-y-6 col-span-2">
            <h5 className="text-vizia-red text-[10px] font-mono uppercase tracking-[0.3em] font-black italic">Kontakt_//</h5>
            <p className="font-brand font-black italic uppercase tracking-tighter text-white text-xl hover:text-vizia-red transition-colors cursor-pointer">
              vince@cararter.pl
            </p>
          </div>
        </div>

        {/* BOTTOM SECTION: LEGAL BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-mono text-[9px] text-zinc-400 tracking-[0.2em] uppercase">
            © {currentYear} VIZIA WEAR // DESIGNED_FOR_DRIVERS // ALL RIGHTS RESERVED
          </div>
          
          <div className="flex gap-8">
            <Link href="/privacy" className="font-mono text-[9px] text-zinc-400 hover:text-white transition-colors uppercase tracking-[0.2em]">
              Polityka Prywatności
            </Link>
            <Link href="/terms" className="font-mono text-[9px] text-zinc-400 hover:text-white transition-colors uppercase tracking-[0.2em]">
              Regulamin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};