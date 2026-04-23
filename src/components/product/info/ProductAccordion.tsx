'use client';

import React from 'react';

export const ProductAccordion = ({ description }: { description?: string }) => {
  return (
    <div className="border-t border-white/10 mt-4">

      {/* 01_SPECYFIKACJA */}
      <details className="group border-b border-white/5" open>
        <summary className="flex justify-between py-5 list-none cursor-pointer outline-none group-open:text-vizia-red transition-colors">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase italic">
            01_Specyfikacja //
          </span>
          <span className="text-zinc-400 transition-transform duration-300 group-open:rotate-45">+</span>
        </summary>
        <div className="pb-6">
          <table className="w-full text-[11px] font-mono text-zinc-300 uppercase">
            <tbody>
              <tr className="border-b border-white/5">
                <td className="py-2.5 text-zinc-400 tracking-tighter">Baza</td>
                <td className="py-2.5 text-right italic text-white">TeeJays Interlock Tee 520</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2.5 text-zinc-400 tracking-tighter">Materiał</td>
                <td className="py-2.5 text-right italic">100% Ringspun Combed Cotton</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2.5 text-zinc-400 tracking-tighter">Gramatura</td>
                <td className="py-2.5 text-right italic">220 gsm</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2.5 text-zinc-400 tracking-tighter">Splot</td>
                <td className="py-2.5 text-right italic">Double Interlock</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2.5 text-zinc-400 tracking-tighter">Kolor</td>
                <td className="py-2.5 text-right italic">Głęboka czerń</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2.5 text-zinc-400 tracking-tighter">Nadruk</td>
                <td className="py-2.5 text-right italic">Odblaskowa folia flex</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2.5 text-zinc-400 tracking-tighter">Przód</td>
                <td className="py-2.5 text-right italic">Reflektor biały — LED DRL</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2.5 text-zinc-400 tracking-tighter">Tył</td>
                <td className="py-2.5 text-right italic">Reflektor czerwony — LED Stop</td>
              </tr>
              <tr>
                <td className="py-2.5 text-zinc-400 tracking-tighter">Pranie</td>
                <td className="py-2.5 text-right italic text-vizia-red">Max 40°C, bez suszarki</td>
              </tr>
            </tbody>
          </table>

          {/* Opis wzoru — dynamiczny z Supabase */}
          {description && (
            <p className="mt-6 text-[12px] font-sans text-zinc-400 leading-relaxed border-t border-white/5 pt-6">
              {description}
            </p>
          )}
        </div>
      </details>

      {/* 02_TWÓJ VIN */}
      <details className="group border-b border-white/5">
        <summary className="flex justify-between py-5 list-none cursor-pointer outline-none group-open:text-vizia-red transition-colors">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase italic">
            02_Twój_VIN //
          </span>
          <span className="text-zinc-400 transition-transform duration-300 group-open:rotate-45">+</span>
        </summary>
        <div className="pb-6 space-y-4">
          <p className="text-[12px] font-sans text-zinc-400 leading-relaxed">
            Każda koszulka ma unikalny <span className="text-white">17-znakowy numer VIN</span> — 
            dokładnie jak tabliczka znamionowa samochodu. Pierwsze 15 znaków identyfikuje wzór i serię. 
            Ostatnie 2 cyfry to Twój numer kolejny w limitowanej serii.
          </p>

          <div className="bg-zinc-900/50 border border-white/5 p-4 font-mono text-xs">
            <div className="flex gap-0 items-center justify-center">
              <div className="text-center">
                <div className="text-white tracking-widest text-sm">SHDWRC-MSTNG01TS</div>
                <div className="text-zinc-600 text-[9px] mt-1 tracking-wider">SERIA / WZÓR</div>
              </div>
              <div className="text-vizia-red mx-1">-</div>
              <div className="text-center">
                <div className="text-vizia-red tracking-widest text-sm font-bold">05</div>
                <div className="text-zinc-600 text-[9px] mt-1 tracking-wider">NUMER</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 text-[9px] font-mono uppercase">
            <div className="bg-zinc-950 p-3">
              <div className="text-vizia-red mb-1">Limit</div>
              <div className="text-zinc-300">99 sztuk na wzór</div>
            </div>
            <div className="bg-zinc-950 p-3">
              <div className="text-vizia-red mb-1">Dostępność</div>
              <div className="text-zinc-300">12 miesięcy od premiery</div>
            </div>
            <div className="bg-zinc-950 p-3">
              <div className="text-vizia-red mb-1">Subskrybenci NRG</div>
              <div className="text-zinc-300">Wybór własnego numeru</div>
            </div>
            <div className="bg-zinc-950 p-3">
              <div className="text-vizia-red mb-1">Pozostali</div>
              <div className="text-zinc-300">Pierwszy wolny numer</div>
            </div>
          </div>
        </div>
      </details>

      {/* 03_DOSTAWA & ZWROTY */}
      <details className="group border-b border-white/5">
        <summary className="flex justify-between py-5 list-none cursor-pointer outline-none group-open:text-vizia-red transition-colors">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase italic">
            03_Dostawa_&_Zwroty //
          </span>
          <span className="text-zinc-400 transition-transform duration-300 group-open:rotate-45">+</span>
        </summary>
        <div className="pb-6 space-y-4">
          <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 text-[9px] font-mono uppercase">
            <div className="bg-zinc-950 p-3">
              <div className="text-vizia-red mb-1">Koszt dostawy</div>
              <div className="text-zinc-300">W cenie — 0 zł</div>
            </div>
            <div className="bg-zinc-950 p-3">
              <div className="text-vizia-red mb-1">Czas realizacji</div>
              <div className="text-zinc-300">7–14 dni roboczych</div>
            </div>
            <div className="bg-zinc-950 p-3">
              <div className="text-vizia-red mb-1">Paczkomat</div>
              <div className="text-zinc-300">InPost — cała Polska</div>
            </div>
            <div className="bg-zinc-950 p-3">
              <div className="text-vizia-red mb-1">Kurier</div>
              <div className="text-zinc-300">Dostawa pod drzwi</div>
            </div>
          </div>

          <div className="border border-vizia-red/40 p-4 bg-vizia-red/5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-vizia-red animate-pulse shrink-0" />
              <p className="text-vizia-red font-mono font-bold uppercase text-[10px] tracking-widest">
                Brak możliwości zwrotu
              </p>
            </div>
            <p className="text-[11px] font-mono text-zinc-400 leading-relaxed uppercase">
              Każda koszulka produkowana jest indywidualnie pod zamówienie
              i posiada przypisany unikalny numer VIN. Z tego powodu{' '}
              <span className="text-white font-bold">nie przyjmujemy zwrotów ani wymian</span>.
            </p>
            <p className="text-[11px] font-mono text-vizia-red/80 leading-relaxed uppercase mt-3">
              Przed zakupem dokładnie sprawdź tabelę rozmiarów.
              W razie wątpliwości wybierz rozmiar większy.
            </p>
          </div>
        </div>
      </details>

    </div>
  );
};