'use client';

import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';

export const Manifesto = () => {
  return (
    <section className="py-24 md:py-56 px-6 relative overflow-hidden bg-vizia-black border-y border-white/5">
      {/* TŁO: Protokół */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-brand font-black italic text-[35vw] text-white/[0.01] select-none leading-none pointer-events-none tracking-tighter">
        PROTOCOL
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* NAGŁÓWEK SEKCJI */}
        <div className="mb-16 lg:mb-32">
          <SectionHeader 
            tagline="THE VIZIA WAY // PHILOSOPHY"
            title="Zasady są proste"
            description="W motoryzacji cenimy limitowane serie i unikalność. VIZIA przenosi tę logikę na ulicę. Ścisłe limitowanie i selekcja. Dostarczamy produkt tak wyjątkowy, jak Ty i Twoja fura."
          />
        </div>

        {/* FILARY / LABELS */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-stretch">
          
          {/* LABEL 01 - SCARCITY */}
          <div className="relative p-6 md:p-10 bg-white/[0.02] border border-white/5 flex flex-col justify-between group overflow-hidden">
            <div className="absolute top-0 right-0 w-12 md:w-16 h-12 md:h-16 border-t-2 border-r-2 border-vizia-red/20 group-hover:border-vizia-red transition-colors duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <span className="text-vizia-red font-brand font-black italic text-3xl md:text-4xl">01</span>
                <div className="h-px flex-grow bg-white/10" />
                <span className="font-mono text-[8px] md:text-[10px] text-zinc-600 tracking-[0.2em] md:tracking-[0.3em] whitespace-nowrap">REF_ID: SC-99</span>
              </div>
              
              <h5 className="text-xl md:text-2xl mb-4 md:mb-6 tracking-[0.1em]">SCARCITY // SZTUKI</h5>
              <p className="text-zinc-400 text-sm md:text-lg leading-relaxed max-w-xl">
                99 sztuk. To nie jest slogan, to nasza <span className="text-white font-bold">nieprzekraczalna granica</span>. 
                Każdy projekt to zamknięty rozdział w historii brandu. Gdy licznik dobije do zera, protokół zostaje wyłączony.
              </p>
            </div>

            {/* STOPKA BOXA - FIX DLA MOBILE */}
            <div className="mt-8 md:mt-12 flex flex-row justify-between items-center border-t border-white/5 pt-4">
              <span className="text-[7px] md:text-[9px] font-mono text-zinc-700 uppercase tracking-widest">Verification_Req</span>
              <div className="text-vizia-red font-brand font-black italic text-xs md:text-lg opacity-40 md:opacity-20 group-hover:opacity-100 transition-opacity">LTD_EDITION</div>
            </div>
          </div>

          {/* LABEL 02 - TIME */}
          <div className="relative p-6 md:p-10 bg-white/[0.02] border border-white/5 flex flex-col justify-between group overflow-hidden">
            <div className="absolute top-0 right-0 w-12 md:w-16 h-12 md:h-16 border-t-2 border-r-2 border-vizia-red/20 group-hover:border-vizia-red transition-colors duration-500" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <span className="text-vizia-red font-brand font-black italic text-3xl md:text-4xl">02</span>
                <div className="h-px flex-grow bg-white/10" />
                <span className="font-mono text-[8px] md:text-[10px] text-zinc-600 tracking-[0.2em] md:tracking-[0.3em] whitespace-nowrap">REF_ID: TM-12</span>
              </div>
              
              <h5 className="text-xl md:text-2xl mb-4 md:mb-6 tracking-[0.1em]">TIME // OKNO DROPU</h5>
              <p className="text-zinc-400 text-sm md:text-lg leading-relaxed max-w-xl">
                Każdy drop ma swoje 12-miesięczne okno. Jeśli w tym czasie nie trafi do Twojego garażu, 
                zostaje <span className="text-white font-bold">trwale wycofany</span>. Nie robimy restocków. Nigdy.
              </p>
            </div>

            {/* STOPKA BOXA - FIX DLA MOBILE */}
            <div className="mt-8 md:mt-12 flex flex-row justify-between items-center border-t border-white/5 pt-4">
              <span className="text-[7px] md:text-[9px] font-mono text-zinc-700 uppercase tracking-widest">Clock_Active</span>
              <div className="text-vizia-red font-brand font-black italic text-xs md:text-lg opacity-40 md:opacity-20 group-hover:opacity-100 transition-opacity">TERMINATION</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};