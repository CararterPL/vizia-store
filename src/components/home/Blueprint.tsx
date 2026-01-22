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
    <section className="py-24 px-6 bg-vizia-black border-t border-white/5 relative overflow-hidden">
      {/* TŁO: Techniczny Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* NAGŁÓWEK KORZYSTAJĄCY Z NOWEGO KOMPONENTU UI */}
        <SectionHeader 
          tagline="SPEC_SHEET_v1.0"
          title="Blueprint"
          description="Pełna dokumentacja techniczna serii produkcyjnej. Wszystkie parametry konstrukcyjne i materiałowe zostały zwalidowane w warunkach drogowych."
        />

        {/* SIATKA SPECYFIKACJI */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {specData.map((spec) => (
            <div 
              key={spec.id} 
              className="bg-vizia-black p-8 group hover:bg-zinc-900/50 transition-all duration-300 relative overflow-hidden"
            >
              {/* Overlay ID w tle karty */}
              <span className="absolute -right-4 -bottom-8 font-brand font-black italic text-[120px] text-white/[0.02] group-hover:text-vizia-red/[0.03] transition-colors pointer-events-none">
                {spec.id}
              </span>

              <div className="flex justify-between items-start mb-12">
                <span className="font-brand font-black italic text-2xl text-zinc-700 group-hover:text-vizia-red transition-colors">
                  {spec.id}
                </span>
                <span className="text-data text-[8px] text-zinc-600">
                  STATUS // {spec.status}
                </span>
              </div>
              
              <h5 className="mb-8 tracking-[0.2em] text-white uppercase">{spec.title}</h5>
              
              <ul className="space-y-4 relative z-10">
                {spec.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    <span className="w-1.5 h-[1px] bg-vizia-red"></span>
                    <span className="text-[11px] font-mono uppercase tracking-wider">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Skaner na hover wewnątrz karty */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-vizia-red group-hover:w-full transition-all duration-700"></div>
            </div>
          ))}
        </div>

        {/* DOLNE DANE SYSTEMOWE */}
        <div className="mt-12 flex flex-wrap justify-between gap-6 opacity-30">
          <div className="text-data text-[9px] tracking-[0.3em]">
            ENGINEERED_IN_POLAND // [52.2297° N, 21.0122° E]
          </div>
          <div className="text-data text-[9px] tracking-[0.3em]">
            VIZIA_LAB_CORE_IDENTITY_PROTECTED
          </div>
        </div>
      </div>
    </section>
  );
};