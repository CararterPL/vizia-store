'use client';

import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';

export const ProductInfo = () => {
  const [isNRGMember, setIsNRGMember] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [vinSuffix, setVinSuffix] = useState('');

  return (
    <div className="flex flex-col relative">
      
      {/* DEBUG SWITCH */}
      <div className="fixed top-24 right-6 z-[9999] opacity-20 hover:opacity-100 transition-opacity scale-75 origin-right">
        <button 
          onClick={() => setIsNRGMember(!isNRGMember)}
          className="bg-white text-black px-2 py-1 text-[9px] font-black"
        >
          TOGGLE_NRG_STATUS
        </button>
      </div>

      {/* 1. NAZWA I NAGŁÓWEK - Bez zbędnego elementu powyżej */}
      <div className="mb-2">
        <SectionHeader 
          title="911 GT3 RS" 
          tagline="TECHNICAL_APPAREL" 
        />
      </div>

      {/* 2. CENA */}
      <div className="mb-6 text-3xl font-brand font-black italic">
        259 PLN
      </div>

      {/* 3. WYBÓR ROZMIARU - Pełna szerokość (grid-cols-5) */}
      <div className="mb-6">
        <div className="flex justify-between text-[10px] font-mono mb-2 opacity-50 uppercase tracking-widest">
          <span>SIZE_SELECT</span>
          <button className="underline hover:text-white transition-colors">GUIDE</button>
        </div>
        <div className="grid grid-cols-5 gap-2 w-full">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-3 border text-xs font-brand font-black italic transition-all ${
                selectedSize === size 
                ? 'bg-white text-black border-white' 
                : 'bg-transparent border-white/10 text-zinc-500 hover:border-white/40'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* 4. MODUŁ VIN / NRG ACCESS - Nowa kolorystyka ostrzegawcza */}
      <div className={`mb-6 border transition-all duration-500 ${
        isNRGMember 
        ? 'border-emerald-500/30 bg-emerald-500/5' 
        : 'border-amber-500/30 bg-amber-500/5'
      }`}>
        {isNRGMember ? (
          /* STAN: DOSTĘPNY / ZIELONY */
          <div className="p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[9px] font-mono text-emerald-500 tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                NRG_PROTOCOL: GRANTED
              </span>
              <span className="text-[9px] font-mono text-emerald-500/50 uppercase">Allocating_Unit...</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono opacity-30 tracking-widest uppercase">
                WP0ZZZ91ZJS1840
              </span>
              <input 
                type="text" 
                maxLength={2}
                value={vinSuffix}
                onChange={(e) => setVinSuffix(e.target.value.toUpperCase())}
                placeholder="00" 
                className="w-10 bg-black border-b border-emerald-500 text-center font-brand font-black italic text-emerald-500 text-base outline-none focus:bg-emerald-500/10 transition-all"
              />
            </div>
            <p className="text-[9px] mt-2 text-emerald-500/40 uppercase tracking-tighter italic">
              * System weryfikuje dostępność numeru w czasie rzeczywistym
            </p>
          </div>
        ) : (
          /* STAN: ZABLOKOWANY / ŻÓŁTY-AMBER */
          <div className="p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[9px] font-mono text-amber-500 tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rotate-45" />
                ACCESS_RESTRICTED
              </span>
              <span className="text-[9px] font-mono text-amber-500 bg-amber-500/10 px-1 font-bold">LOCKED</span>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] leading-tight text-amber-500/80 uppercase tracking-tight font-brand">
                Personalizacja VIN wymaga autoryzacji NRG_UNIT. Wprowadź e-mail, aby sprawdzić status.
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="NRG_ID_AUTH" 
                  className="flex-grow bg-black/40 border border-amber-500/20 py-1.5 px-3 text-[9px] font-brand outline-none focus:border-amber-500 transition-all text-amber-500 placeholder:text-amber-500/30"
                />
                <button className="bg-amber-500 text-black px-3 py-1.5 text-[9px] font-black italic uppercase hover:bg-white transition-all">
                  AUTHORIZE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. CTA BUTTON */}
      <div className="mb-6">
        <div className="fixed bottom-0 left-0 w-full p-4 bg-black/90 backdrop-blur-md border-t border-white/10 lg:relative lg:bg-transparent lg:border-none lg:p-0 z-50">
          <Button variant="cta" className="w-full py-5 text-lg uppercase italic lg:shadow-none">
            Dodaj do garażu //
          </Button>
        </div>
      </div>

      {/* 6. TECHNICAL DATA & POLICIES (H5 i P) */}
      <div className="border-t border-white/5">
        {[
          { id: 'TECH', label: 'TECHNICAL_SPECS', content: 'Nasza jednostka została wykonana z 280g bawełny Heavy Cotton w kroju Oversize Boxy Fit. Każdy egzemplarz posiada unikalny nadruk 3D High-Density oraz indywidualny VIN.' },
          { id: 'SHIP', label: 'SHIPPING_LOGISTICS', content: 'Dostawa realizowana w ciągu 3-5 dni roboczych. Każdy produkt pakowany jest w dedykowaną, antystatyczną folię techniczną NRG chroniącą przed czynnikami zewnętrznymi.' },
          { id: 'RETR', label: 'RETURNS_POLICY', content: 'Masz 14 dni na zwrot jednostki. Pamiętaj, że produkt musi posiadać nienaruszoną plombę gwarancyjną NRG. Produkty z personalizowanym VIN podlegają osobnej procedurze.' }
        ].map((item) => (
          <details key={item.id} className="group border-b border-white/5 cursor-pointer">
            <summary className="flex justify-between items-center py-4 list-none group-open:text-vizia-red transition-all">
              <h5>{item.label}</h5>
              <span className="group-open:rotate-45 transition-transform text-zinc-600">+</span>
            </summary>
            <div className="pb-6">
              <p className="text-zinc-400">
                {item.content}
              </p>
            </div>
          </details>
        ))}
      </div>
      
      <div className="h-24 lg:hidden" />
    </div>
  );
};