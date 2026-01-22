'use client';

import React from 'react';
import { X } from 'lucide-react';

export const SizeGuide = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  const measurements = [
    { size: 'S', width: '54', length: '70', sleeve: '22' },
    { size: 'M', width: '57', length: '73', sleeve: '23' },
    { size: 'L', width: '60', length: '76', sleeve: '24' },
    { size: 'XL', width: '63', length: '78', sleeve: '25' },
    { size: 'XXL', width: '66', length: '80', sleeve: '26' },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-white/10 p-8 md:p-12 overflow-hidden">
        {/* Background Grid Accent */}
<div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
     style={{ 
       backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90px, #fff 1px, transparent 1px)', 
       backgroundSize: '20px 20px' 
     }} 
/>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-12">
            <div>
              <p className="text-[10px] text-vizia-red font-mono tracking-[0.3em] uppercase mb-2">Technical_Draft_v01</p>
              <h2 className="text-3xl font-brand font-black italic text-white uppercase tracking-tighter">Size_Blueprint</h2>
            </div>
            <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white transition-colors">
              <X size={24} strokeWidth={1} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Schemat techniczny */}
            <div className="relative aspect-square bg-zinc-900/50 border border-white/5 flex items-center justify-center p-8">
              <svg viewBox="0 0 200 200" className="w-full h-full text-zinc-700 stroke-current fill-none">
                {/* Obrys koszulki */}
                <path d="M40 40 L60 20 L140 20 L160 40 L160 80 L145 80 L145 180 L55 180 L55 80 L40 80 Z" strokeWidth="1" />
                
                {/* Linie wymiarowe */}
                {/* Szerokość (A) */}
                <g className="text-vizia-red">
                  <line x1="55" y1="100" x2="145" y2="100" strokeWidth="0.5" strokeDasharray="2 2" />
                  <circle cx="55" cy="100" r="1" fill="currentColor" />
                  <circle cx="145" cy="100" r="1" fill="currentColor" />
                  <text x="100" y="95" textAnchor="middle" fontSize="6" className="font-mono fill-current uppercase tracking-widest">Width [A]</text>
                </g>

                {/* Długość (B) */}
                <g className="text-vizia-red text-opacity-50">
                  <line x1="100" y1="20" x2="100" y2="180" strokeWidth="0.5" strokeDasharray="2 2" />
                  <text x="105" y="150" fontSize="6" className="font-mono fill-current uppercase tracking-widest" style={{ writingMode: 'vertical-rl' }}>Length [B]</text>
                </g>
              </svg>
              
              <div className="absolute bottom-4 left-4">
                <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest leading-relaxed">
                  Unit_Type: Boxy_Fit<br />
                  Material: 280g_Heavy_Cotton<br />
                  Tolerance: +/- 1.5cm
                </p>
              </div>
            </div>

            {/* Tabela wymiarów */}
            <div className="flex flex-col h-full">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse font-mono text-[10px] md:text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-zinc-500 uppercase tracking-widest text-left">
                      <th className="py-4 font-normal">Size</th>
                      <th className="py-4 font-normal text-white">Width [A]</th>
                      <th className="py-4 font-normal">Length [B]</th>
                      <th className="py-4 font-normal">Sleeve</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-300">
                    {measurements.map((m) => (
                      <tr key={m.size} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 font-bold text-white">{m.size}</td>
                        <td className="py-4 text-vizia-red">{m.width} CM</td>
                        <td className="py-4">{m.length} CM</td>
                        <td className="py-4 opacity-50">{m.sleeve} CM</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-auto pt-8">
                <div className="p-4 bg-vizia-red/5 border border-vizia-red/20">
                  <p className="text-[10px] font-mono text-vizia-red uppercase leading-relaxed tracking-tight">
                    * Sugerujemy wybór standardowego rozmiaru dla efektu "Boxy Fit". <br />
                    Model na zdjęciu: 188cm / Rozmiar L.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};