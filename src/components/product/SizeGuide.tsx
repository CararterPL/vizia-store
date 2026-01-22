'use client';

import React, { useEffect } from 'react';

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuide = ({ isOpen, onClose }: SizeGuideProps) => {
  // Blokowanie scrolla tła, gdy modal jest otwarty
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
      {/* Overlay - kliknięcie w tło zamyka */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md" 
        onClick={onClose} 
      />

      {/* Kontener Modala */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-zinc-900 border border-white/10 flex flex-col shadow-2xl">
        
        {/* NAGŁÓWEK - STICKY (Zawsze widoczny) */}
        <div className="flex justify-between items-center p-6 border-b border-white/5 bg-zinc-900 z-10">
          <div>
            <h4 className="font-brand font-black italic text-xl text-white uppercase tracking-tighter">
              Blueprint_Guide //
            </h4>
            <p className="font-mono text-[8px] text-zinc-500 tracking-widest uppercase mt-1">
              Technical_Specifications_v1.0
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center border border-white/10 hover:bg-white hover:text-black transition-all group"
          >
            <span className="font-mono text-xl transform group-hover:rotate-90 transition-transform">×</span>
          </button>
        </div>

        {/* TREŚĆ - SCROLLABLE AREA */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <div className="space-y-8">
            
            {/* Tabela rozmiarów */}
            <div className="grid grid-cols-4 border border-white/5 text-[10px] font-mono uppercase">
              <div className="p-3 bg-white/5 text-zinc-500">Size</div>
              <div className="p-3 bg-white/5 text-zinc-500">Chest</div>
              <div className="p-3 bg-white/5 text-zinc-500">Length</div>
              <div className="p-3 bg-white/5 text-zinc-500">Sleeve</div>
              
              {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                <React.Fragment key={s}>
                  <div className="p-3 border-t border-white/5 text-white font-bold">{s}</div>
                  <div className="p-3 border-t border-white/5 text-zinc-400">54cm</div>
                  <div className="p-3 border-t border-white/5 text-zinc-400">70cm</div>
                  <div className="p-3 border-t border-white/5 text-zinc-400">22cm</div>
                </React.Fragment>
              ))}
            </div>

            {/* Instrukcja mierzenia */}
            <div className="space-y-4">
              <h5 className="font-mono text-[9px] text-white tracking-widest uppercase border-l-2 border-amber-500 pl-3">
                Measurement_Protocol:
              </h5>
              <p className="font-mono text-[10px] text-zinc-500 leading-relaxed uppercase">
                1. Chest: Measure across the fullest part of your chest, keeping the tape horizontal.<br/>
                2. Length: Measure from the highest point of the shoulder to the bottom hem.<br/>
                3. Fit: Our Technical Apparel features a "Boxy Fit". If you prefer a tighter look, consider sizing down.
              </p>
            </div>

            {/* Grafika pomocnicza (opcjonalnie kropki/siatka) */}
            <div className="aspect-video w-full bg-white/[0.02] border border-white/5 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
               <span className="font-mono text-[8px] text-zinc-700 uppercase">Chassis_Reference_Visual</span>
            </div>
          </div>
        </div>

        {/* STOPKA MODALA - Też może być sticky, jeśli chcesz tam przycisk */}
        <div className="p-6 border-t border-white/5 bg-zinc-900/50 backdrop-blur-sm">
           <button 
             onClick={onClose}
             className="w-full py-4 bg-white text-black font-brand font-black italic uppercase tracking-tighter hover:bg-amber-500 transition-colors"
           >
             Acknowledge //
           </button>
        </div>
      </div>
    </div>
  );
};