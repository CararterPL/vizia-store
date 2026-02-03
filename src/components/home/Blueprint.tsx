'use client';

import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';

const specData = [
  {
    id: '01',
    title: 'MATERIAŁ',
    items: ['Ciężka bawełna czesana', 'Gramatura High GSM', 'Standard Deep Black', 'Odporność na deformację'],
    status: 'OPTIMIZED'
  },
  {
    id: '02',
    title: 'LUMITRACE™',
    items: ['Elementy odblaskowe', 'Nocna sygnatura', 'Dyskretne w dzień', 'Trwałość przemysłowa'],
    status: 'ACTIVE'
  },
  {
    id: '03',
    title: 'WYKOŃCZENIE',
    items: ['Miks Flex / Flock', 'Nadruk 3D strukturalny', 'Certyfikat papierowy', 'Metki satynowe'],
    status: 'CERTIFIED'
  },
  {
    id: '04',
    title: 'TOŻSAMOŚĆ',
    items: ['Unikalny numer VIN', 'Limit 99 egzemplarzy', 'Brak re-edycji', 'Logowanie NRG'],
    status: 'ENFORCED'
  }
];

export const Blueprint = () => {
  return (
    <section className="py-24 md:py-40 px-6 bg-vizia-black border-t border-white/5 relative overflow-hidden">
      {/* TŁO: Techniczny Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
          backgroundSize: '50px 50px' 
        }}
      />

      {/* Kontener dopasowany do 1600px */}
      <div className="max-w-[1600px] mx-auto relative z-10">
        
        <div className="mb-20">
          <SectionHeader 
            tagline="SPEC_SHEET_v1.0 // SYSTEM_ARCHITECTURE"
            title="Blueprint"
            description="Pełna dokumentacja techniczna serii produkcyjnej. Wszystkie parametry konstrukcyjne i materiałowe zostały zwalidowane w warunkach drogowych przed wdrożeniem do produkcji."
            align="left"
          />
        </div>

        {/* SIATKA SPECYFIKACJI - gap-px tworzy cienkie linie siatki */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {specData.map((spec) => (
            <div 
              key={spec.id} 
              className="bg-vizia-black p-10 group hover:bg-zinc-950 transition-all duration-500 relative overflow-hidden flex flex-col min-h-[400px]"
            >
              {/* Overlay ID w tle karty - Powiększony dla lepszego efektu na szerokim ekranie */}
              <span className="absolute -right-8 -bottom-10 font-brand font-black italic text-[180px] text-white/[0.01] group-hover:text-vizia-red/[0.03] transition-all duration-700 pointer-events-none select-none">
                {spec.id}
              </span>

              {/* Header Karty */}
              <div className="flex justify-between items-start mb-16 relative z-10">
                <div className="flex flex-col">
                  <span className="font-brand font-black italic text-4xl text-zinc-800 group-hover:text-vizia-red transition-colors duration-500">
                    {spec.id}
                  </span>
                  <div className="w-8 h-1 bg-vizia-red mt-2 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                </div>
                <span className="font-mono text-[9px] text-zinc-600 tracking-[0.2em] pt-2">
                  ID // {spec.status}
                </span>
              </div>
              
              {/* Tytuł i Lista */}
              <div className="relative z-10 flex-grow">
                <h5 className="mb-8 tracking-[0.3em] text-white text-sm font-bold uppercase border-l-2 border-zinc-800 pl-4 group-hover:border-vizia-red transition-colors">
                  {spec.title}
                </h5>
                
                <ul className="space-y-5">
                  {spec.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full border border-vizia-red/30 group-hover:bg-vizia-red transition-all"></div>
                      <span className="text-[12px] font-mono uppercase tracking-wider leading-none">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stopka karty z dynamicznym elementem */}
              <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center relative z-10">
                <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest">Comp_Ready</span>
                <div className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-vizia-red group-hover:animate-pulse transition-colors"></div>
              </div>

              {/* Skaner na hover */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-vizia-red/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
            </div>
          ))}
        </div>

        {/* DOLNE DANE SYSTEMOWE */}
        <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/5 pb-8">
          <div className="flex gap-12 text-data text-[10px] tracking-[0.3em] text-zinc-600 uppercase italic">
            <span>Core_Engine: Vizia_v1</span>
            <span className="hidden sm:inline">Build: 2026.04</span>
          </div>
          <div className="text-data text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
            Designed_for_Performance // <span className="text-vizia-red">Vizia_Lab</span>
          </div>
        </div>
      </div>
    </section>
  );
};