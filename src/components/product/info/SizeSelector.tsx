'use client';

import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

export const SizeSelector = ({ selectedSize, onSizeSelect, showError }: any) => {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const sizes = ['S', 'M', 'L', 'XL', 'XXL', '3XL'];

  const sizeData = [
    { s: 'S',   chest: '96',  length: '72' },
    { s: 'M',   chest: '100', length: '74' },
    { s: 'L',   chest: '104', length: '76' },
    { s: 'XL',  chest: '110', length: '78' },
    { s: 'XXL', chest: '116', length: '80' },
    { s: '3XL', chest: '122', length: '82' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-[0.2em]">
        <span className={`${showError ? 'text-vizia-red animate-pulse font-bold' : 'text-zinc-300'}`}>
          {showError ? '// Wybierz_Rozmiar' : 'Rozmiar:'}
        </span>
        <button
          onClick={() => setIsGuideOpen(true)}
          className="text-white/40 hover:text-white underline underline-offset-4 decoration-zinc-800 transition-colors uppercase"
        >
          TABELA_ROZMIARÓW
        </button>
      </div>

      <div className="grid grid-cols-6 gap-1">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelect(size)}
            className={`py-4 border font-brand font-black italic text-[11px] transition-all duration-300
              ${selectedSize === size
                ? 'bg-white text-black border-white'
                : 'border-white/5 text-zinc-400 hover:border-white/20 hover:text-white'}`}
          >
            {size}
          </button>
        ))}
      </div>

      {isGuideOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 backdrop-blur-xl p-0 lg:p-4">
          <div className="relative w-full max-w-2xl h-full lg:h-auto lg:max-h-[90vh] bg-zinc-950 border-x lg:border border-white/10 overflow-y-auto scrollbar-hide">

            {/* HEADER */}
            <div className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur-md p-6 border-b border-white/10 flex justify-between items-center">
              <div>
                <h3 className="font-brand font-black italic text-2xl uppercase tracking-tighter text-white leading-none">
                  Tabela_Rozmiarów <span className="text-vizia-red">// V.01</span>
                </h3>
                <p className="font-mono text-[8px] text-zinc-400 uppercase tracking-widest mt-1">
                  Ref: TeeJays Interlock Tee 520 — 220gsm
                </p>
              </div>
              <button onClick={() => setIsGuideOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X size={20} className="text-zinc-300 hover:text-white" />
              </button>
            </div>

            <div className="p-6 lg:p-10 space-y-12">

              {/* SVG SCHEMAT KOSZULKI */}
<div className="space-y-4">
  <span className="font-mono text-[9px] text-zinc-300 uppercase tracking-widest border-l-2 border-vizia-red pl-3">01_Schemat_Wymiarów</span>
  <div className="flex items-center justify-center py-4">
    <svg viewBox="0 0 320 260" className="w-full max-w-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      
      {/* Koszulka — poprawione proporcje, szersza i krótsza */}
      <path
        d="M85 50 Q95 38 118 35 Q128 52 150 52 Q172 52 182 35 Q205 38 215 50 L248 88 L215 100 L215 210 L85 210 L85 100 L52 88 Z"
        fill="#1a1a1a"
        stroke="#444"
        strokeWidth="1.5"
      />
      {/* Kołnierzyk */}
      <path
        d="M118 35 Q134 56 150 52 Q166 56 182 35"
        fill="none"
        stroke="#666"
        strokeWidth="1"
      />

      {/* Linia A — szerokość pod pachami (wyżej, przy pasze) */}
      <line x1="85" y1="105" x2="215" y2="105" stroke="#FF133A" strokeWidth="1" strokeDasharray="3,3"/>
      <line x1="85" y1="100" x2="85" y2="110" stroke="#FF133A" strokeWidth="1.5"/>
      <line x1="215" y1="100" x2="215" y2="110" stroke="#FF133A" strokeWidth="1.5"/>
      <text x="150" y="122" textAnchor="middle" fill="#FF133A" fontSize="8" fontFamily="monospace">A — SZEROKOŚĆ</text>

      {/* Linia B — długość przy środku koszulki */}
      <line x1="238" y1="52" x2="238" y2="210" stroke="#FF133A" strokeWidth="1" strokeDasharray="3,3"/>
      <line x1="233" y1="52" x2="243" y2="52" stroke="#FF133A" strokeWidth="1.5"/>
      <line x1="233" y1="210" x2="243" y2="210" stroke="#FF133A" strokeWidth="1.5"/>
      <text 
        x="255" 
        y="131" 
        textAnchor="middle" 
        fill="#FF133A" 
        fontSize="8" 
        fontFamily="monospace"
        transform="rotate(90, 255, 131)"
      >B — DŁUGOŚĆ</text>

    </svg>
  </div>
</div>

              {/* TABELA ROZMIARÓW */}
              <div className="space-y-4">
                <span className="font-mono text-[9px] text-zinc-300 uppercase tracking-widest border-l-2 border-vizia-red pl-3">02_Wymiary_cm</span>
                <table className="w-full text-[12px] font-mono text-zinc-400 uppercase">
                  <thead>
                    <tr className="border-b border-white/10 text-zinc-500 text-[10px]">
                      <th className="py-4 text-left font-normal tracking-widest">Rozmiar</th>
                      <th className="py-4 text-center font-normal tracking-widest">A — Szerokość</th>
                      <th className="py-4 text-right font-normal tracking-widest">B — Długość</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeData.map((row) => (
                      <tr key={row.s} className={`border-b border-white/5 transition-all ${selectedSize === row.s ? 'bg-vizia-red/5' : ''}`}>
                        <td className={`py-5 font-brand font-black italic text-xl ${selectedSize === row.s ? 'text-vizia-red' : 'text-zinc-300'}`}>{row.s}</td>
                        <td className="py-5 text-center italic">{row.chest} cm</td>
                        <td className="py-5 text-right italic">{row.length} cm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                  * Wymiary podane przed praniem. A = pełna szerokość klatki piersiowej.
                </p>
              </div>

              {/* SPECYFIKACJA */}
              <div className="space-y-6 pt-4">
                <span className="font-mono text-[9px] text-zinc-300 uppercase tracking-widest border-l-2 border-vizia-red pl-3">03_Specyfikacja_Materiału</span>

                <div className="p-5 border border-white/5 bg-white/[0.01] flex gap-5 items-start">
                  <Ruler className="text-vizia-red w-5 h-5 mt-1 shrink-0" />
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">Krój:</h4>
                    <p className="text-[11px] text-zinc-300 lowercase leading-relaxed">
                      Dopasowany krój <span className="text-white">fitted</span>. Wybierz swój standardowy rozmiar lub rozmiar większy dla efektu oversize.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 text-[9px] font-mono uppercase text-zinc-400">
                  <div className="bg-zinc-950 p-3 text-center tracking-tighter">100% Ringspun<br/>Combed Cotton</div>
                  <div className="bg-zinc-950 p-3 text-center tracking-tighter">220 gsm<br/>Premium Weight</div>
                  <div className="bg-zinc-950 p-3 text-center tracking-tighter">Enzyme &<br/>Silicone Washed</div>
                  <div className="bg-zinc-950 p-3 text-center tracking-tighter">Pranie<br/>do 60°C</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};