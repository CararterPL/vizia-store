'use client';

import React, { useState } from 'react';
import { X, Ruler, Crosshair } from 'lucide-react';

export const SizeSelector = ({ selectedSize, onSizeSelect, showError }: any) => {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-[0.2em]">
        <span className={`${showError ? 'text-vizia-red animate-pulse font-bold' : 'text-zinc-500'}`}>
          {showError ? '// Select_Size_Required' : '01_Unit_Scale:'}
        </span>
        <button 
          onClick={() => setIsGuideOpen(true)}
          className="text-white/40 hover:text-white underline underline-offset-4 decoration-zinc-800 transition-colors uppercase"
        >
          Size_Blueprint_Full_Spec [?]
        </button>
      </div>

      <div className="grid grid-cols-5 gap-1">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelect(size)}
            className={`py-4 border font-brand font-black italic text-[12px] transition-all duration-300
              ${selectedSize === size 
                ? 'bg-white text-black border-white' 
                : 'border-white/5 text-zinc-600 hover:border-white/20 hover:text-white'}`}
          >
            {size}
          </button>
        ))}
      </div>

      {/* MODAL: VERTICAL STACK BLUEPRINT */}
      {isGuideOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 backdrop-blur-xl p-0 lg:p-4">
          <div className="relative w-full max-w-2xl h-full lg:h-auto lg:max-h-[90vh] bg-zinc-950 border-x lg:border border-white/10 overflow-y-auto scrollbar-hide">
            
            {/* STICKY HEADER */}
            <div className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur-md p-6 border-b border-white/10 flex justify-between items-center">
              <div>
                <h3 className="font-brand font-black italic text-2xl uppercase tracking-tighter text-white leading-none">
                  Technical_Blueprint <span className="text-vizia-red">// V.01</span>
                </h3>
                <p className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest mt-1">Ref_ID: VN-360-GP-SIZE</p>
              </div>
              <button onClick={() => setIsGuideOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X size={20} className="text-zinc-500 hover:text-white" />
              </button>
            </div>

            <div className="p-6 lg:p-10 space-y-12">
              
              {/* 1. SCHEMAT (PIONOWO) */}
              <div className="space-y-4">
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest border-l-2 border-vizia-red pl-3">01_Visual_Matrix</span>
                <div className="relative aspect-video bg-zinc-900/30 border border-white/5 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
                  <div className="relative w-40 h-52 border border-white/20 flex flex-col justify-between p-2">
                    <Crosshair className="absolute -top-2 -left-2 w-4 h-4 text-vizia-red opacity-50" />
                    <div className="w-full h-px bg-dashed bg-white/10 border-b border-dashed border-white/20 self-center mt-12" />
                    <div className="absolute top-1/2 left-0 w-full h-px border-t border-vizia-red/40" />
                    <div className="absolute left-1/2 top-0 h-full w-px border-l border-white/5" />
                  </div>
                </div>
              </div>

              {/* 2. TABELA (PIONOWO) */}
              <div className="space-y-4">
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest border-l-2 border-vizia-red pl-3">02_Dimension_Table</span>
                <table className="w-full text-[12px] font-mono text-zinc-400 uppercase">
                  <thead>
                    <tr className="border-b border-white/10 text-zinc-600 text-[10px]">
                      <th className="py-4 text-left font-normal tracking-widest">SIZE_ID</th>
                      <th className="py-4 text-center font-normal tracking-widest">WIDTH (A)</th>
                      <th className="py-4 text-right font-normal tracking-widest">LENGTH (B)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { s: 'S', c: '56', l: '70' },
                      { s: 'M', c: '59', l: '72' },
                      { s: 'L', c: '62', l: '74' },
                      { s: 'XL', c: '65', l: '76' },
                      { s: 'XXL', c: '68', l: '78' },
                    ].map((row) => (
                      <tr key={row.s} className={`border-b border-white/5 transition-all ${selectedSize === row.s ? 'bg-vizia-red/5' : ''}`}>
                        <td className={`py-5 font-brand font-black italic text-xl ${selectedSize === row.s ? 'text-vizia-red' : 'text-zinc-500'}`}>{row.s}</td>
                        <td className="py-5 text-center italic group-hover/row:text-white">{row.c} CM</td>
                        <td className="py-5 text-right italic group-hover/row:text-white">{row.l} CM</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 3. UWAGI (PIONOWO) */}
              <div className="space-y-6 pt-4">
                <div className="p-5 border border-white/5 bg-white/[0.01] flex gap-5 items-start">
                  <Ruler className="text-vizia-red w-5 h-5 mt-1" />
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">Fit_Instruction:</h4>
                    <p className="text-[11px] text-zinc-500 lowercase leading-relaxed">
                      Produkt o kroju <span className="text-white">boxy fit</span>. Szerokie ramiona i korpus, skrócona długość. Wybierz swój standardowy rozmiar dla efektu oversize lub rozmiar mniejszy dla dopasowania regular.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 text-[9px] font-mono uppercase text-zinc-600">
                  <div className="bg-zinc-950 p-3 text-center tracking-tighter">Cotton 220G</div>
                  <div className="bg-zinc-950 p-3 text-center tracking-tighter">Pre-Shrunk</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};