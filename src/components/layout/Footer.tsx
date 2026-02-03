'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-vizia-black pt-24 pb-12 px-6 md:px-12 border-t border-white/5">
      {/* USPÓJNIONA SZEROKOŚĆ 1600px */}
      <div className="max-w-[1600px] mx-auto">
        
        {/* TOP SECTION: LOGO + NRG_ACCESS */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-sm">
            <Logo className="h-6 md:h-7 w-auto text-white mb-8 transition-colors hover:text-vizia-red" />
            <p className="text-zinc-500 lowercase font-sans text-sm leading-relaxed">
              Autentyczność, technologia i motoryzacyjny puryzm. <br/>
              Vizia Technical Apparel – projektowane w Polsce, testowane na asfalcie.
            </p>
          </div>

          {/* MODUŁ ZAPISU DO NRG */}
          <div className="w-full lg:w-[450px] space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 bg-vizia-red animate-pulse" />
              <h5 className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white italic">
                NRG_Network_Subscription //
              </h5>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="ENTER_EMAIL_ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow bg-zinc-900/50 border border-white/5 px-4 py-3 font-mono text-[11px] text-white focus:outline-none focus:border-vizia-red/50 transition-colors uppercase tracking-widest"
              />
              <Button 
                variant="primary" 
                size="md" 
                className="whitespace-nowrap"
                onClick={() => console.log('NRG Access Request:', email)}
              >
                JOIN_NRG
              </Button>
            </div>
            <p className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest leading-relaxed">
              * Zapisując się do sieci NRG, zyskujesz pierwszeństwo przy rezerwacji limitowanych serii oraz dostęp do modeli w fazie "The Hideout".
            </p>
          </div>
        </div>

        {/* MIDDLE SECTION: NAVIGATION GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16 border-y border-white/5 py-12">
          <div className="space-y-6">
            <h5 className="text-vizia-red text-[10px] font-mono uppercase tracking-[0.3em] font-black italic">System_//</h5>
            <ul className="list-none p-0 space-y-3 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
              <li><Link href="/#products" className="hover:text-white transition-colors">Kolekcja</Link></li>
              <li><Link href="/custom" className="hover:text-white transition-colors">Custom Division</Link></li>
              <li><Link href="/archive" className="hover:text-white transition-colors">Archiwum</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h5 className="text-vizia-red text-[10px] font-mono uppercase tracking-[0.3em] font-black italic">Social_//</h5>
            <ul className="list-none p-0 space-y-3 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
            </ul>
          </div>

          <div className="space-y-6 col-span-2">
            <h5 className="text-vizia-red text-[10px] font-mono uppercase tracking-[0.3em] font-black italic">Kontakt_//</h5>
            <p className="font-brand font-black italic uppercase tracking-tighter text-white text-xl hover:text-vizia-red transition-colors cursor-pointer">
              vince@cararter.pl
            </p>
            <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
              Techniczne wsparcie: Mon-Fri 09:00 - 17:00
            </p>
          </div>
        </div>

        {/* BOTTOM SECTION: LEGAL BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-mono text-[9px] text-zinc-600 tracking-[0.2em] uppercase">
            © {currentYear} VIZIA WEAR // DESIGNED_FOR_DRIVERS // ALL RIGHTS RESERVED
          </div>
          
          <div className="flex gap-8">
            <Link href="/privacy" className="font-mono text-[9px] text-zinc-600 hover:text-white transition-colors uppercase tracking-[0.2em]">
              Polityka Prywatności
            </Link>
            <Link href="/terms" className="font-mono text-[9px] text-zinc-600 hover:text-white transition-colors uppercase tracking-[0.2em]">
              Regulamin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};