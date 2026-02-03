'use client';

import React from 'react';

export const ProductAccordion = () => {
  return (
    <div className="border-t border-white/10 mt-4">
      {/* 01_OPIS */}
      <details className="group border-b border-white/5" open>
        <summary className="flex justify-between py-5 list-none cursor-pointer outline-none group-open:text-vizia-red transition-colors">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase italic">
            01_Product_Brief //
          </span>
          <span className="text-zinc-600 transition-transform duration-300 group-open:rotate-45">+</span>
        </summary>
        <div className="pb-6 text-[13px] font-sans text-zinc-400 leading-relaxed lowercase tracking-tight">
          Interpretacja Shadow Race serii <span className="text-white">Mini JCW GP</span>. 
          GhostTrace Reflective system: przód (white reflection), tył (red reflection). 
          Fason Fit – zaprojektowany, by podkreślać sylwetkę przy zachowaniu pełnej 
          swobody ruchów. Każdy detal został przetestowany pod kątem trwałości w warunkach miejskich.
        </div>
      </details>

      {/* 02_SPECYFIKACJA TECHNICZNA (TABELA) */}
      <details className="group border-b border-white/5">
        <summary className="flex justify-between py-5 list-none cursor-pointer outline-none group-open:text-vizia-red transition-colors">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase italic">
            02_Technical_Specs //
          </span>
          <span className="text-zinc-600 transition-transform duration-300 group-open:rotate-45">+</span>
        </summary>
        <div className="pb-6">
          <table className="w-full text-[11px] font-mono text-zinc-500 uppercase">
            <tbody>
              <tr className="border-b border-white/5">
                <td className="py-2.5 text-zinc-300 font-bold tracking-tighter">Material</td>
                <td className="py-2.5 text-right italic">Danish Egyptian Cotton 220g</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2.5 text-zinc-300 font-bold tracking-tighter">Weave</td>
                <td className="py-2.5 text-right italic">Double Interlock (Non-Stretch)</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2.5 text-zinc-300 font-bold tracking-tighter">Graphics</td>
                <td className="py-2.5 text-right italic">GhostTrace Reflective Ink</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2.5 text-zinc-300 font-bold tracking-tighter">Construction</td>
                <td className="py-2.5 text-right italic">Reinforced Double Stitch</td>
              </tr>
              <tr>
                <td className="py-2.5 text-zinc-300 font-bold tracking-tighter">Thermal_Limit</td>
                <td className="py-2.5 text-right italic text-vizia-red">60°C Max Wash</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      {/* 03_DOSTAWA I ZWROTY */}
      <details className="group border-b border-white/5">
        <summary className="flex justify-between py-5 list-none cursor-pointer outline-none group-open:text-vizia-red transition-colors">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase italic">
            03_Logistics_&_Policy //
          </span>
          <span className="text-zinc-600 transition-transform duration-300 group-open:rotate-45">+</span>
        </summary>
        <div className="pb-6 space-y-4">
          <div className="text-[12px] font-sans text-zinc-400 leading-relaxed">
            Standardowa procedura wysyłki: <span className="text-white">3-5 dni roboczych</span>. 
            Wszystkie przesyłki są ubezpieczone i monitorowane.
          </div>
          
          <div className="border border-vizia-red/30 p-4 bg-vizia-red/5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 bg-vizia-red animate-pulse" />
              <p className="text-vizia-red font-brand font-black italic uppercase text-[11px] tracking-widest">
                Personalization_Notice
              </p>
            </div>
            <p className="text-[11px] font-mono uppercase text-zinc-400 leading-normal">
              Produkt personalizowany (przypisany unikalny numer VIN oraz wybór rozmiaru). 
              Splot Interlock jest <span className="text-white underline decoration-vizia-red/50">mniej elastyczny</span> niż standardowy jersey. 
              <br/><br/>
              Ze względu na limitowany charakter serii i indywidualną produkcję pod zamówienie: 
              <span className="text-white font-bold"> brak możliwości zwrotu</span>. 
              Prosimy o dokładne sprawdzenie tabeli rozmiarów w module "Size_Blueprint".
            </p>
          </div>
        </div>
      </details>
    </div>
  );
};