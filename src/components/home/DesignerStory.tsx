'use client';

import React from 'react';
import Image from 'next/image';
import { SectionHeader } from '../ui/SectionHeader';

export const DesignerStory = () => {
  return (
    <section className="py-24 md:py-48 px-6 bg-vizia-black border-t border-white/5 relative overflow-hidden">
      
      {/* Dekoracyjne oznaczenie sekcji w tle */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 font-brand font-black italic text-[20vw] text-white/[0.01] pointer-events-none select-none uppercase leading-none">
        DNA
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* LEWA KOLUMNA: Obraz (5 kolumn) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] bg-zinc-900 border border-white/10 overflow-hidden group">
              <Image 
                src="/images/vince_portrait.jpg" 
                alt="Vince - Founder of Vizia Lab" 
                fill 
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
              />
              
              {/* Overlay skanera na zdjęciu */}
              <div className="absolute inset-0 bg-gradient-to-t from-vizia-black/80 via-transparent to-transparent opacity-60"></div>
              
              {/* Techniczny tag pływający */}
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="bg-vizia-red text-white font-brand font-black italic px-5 py-3 text-sm tracking-widest shadow-2xl">
                  DESIGNER // VINCE_LAB
                </div>
                <div className="hidden md:block text-right">
                  <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest leading-none">Build_Reference</p>
                  <p className="text-[10px] font-mono text-white uppercase font-bold">HW_LEGENDS_WINNER</p>
                </div>
              </div>
            </div>
            
            {/* Ozdobny element graficzny pod zdjęciem */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r-2 border-b-2 border-vizia-red/20 pointer-events-none"></div>
          </div>

          {/* PRAWA KOLUMNA: Treść (7 kolumn) */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <SectionHeader 
                tagline="CORE_STORY // GENESIS"
                title="Historia to paliwo"
                description="Vizia Lab nie powstała w biurze projektowym. Powstała w oparach benzyny, wśród iskier szlifierki i setek godzin spędzonych na dopracowywaniu detali, które dla innych nie miały znaczenia."
                align="left"
                className="!mb-0"
              />
              
              <div className="space-y-6 text-zinc-400 font-light leading-relaxed text-lg max-w-2xl">
                <p>
                  Od pierwszych szkiców w garażu, po globalne uznanie i zwycięstwo w <span className="text-white font-bold italic">Hot Wheels Legends Tour</span>. Każdy drop, który wypuszczamy, jest fizycznym zapisem tej drogi.
                </p>
                <p>
                  Nie interesuje nas masowa produkcja. Interesuje nas moment, w którym zakładasz naszą rzecz i czujesz, że stoi za nią autentyczna, inżynierska pasja. To odzież dla tych, którzy wiedzą, że <span className="text-vizia-red uppercase font-bold tracking-widest">detal to wszystko</span>.
                </p>
              </div>
            </div>
            
            {/* Cytat Jaya Leno - stylizowany na raport techniczny */}
            <div className="relative mt-12 group">
              <div className="absolute top-0 left-0 w-1 h-full bg-vizia-red"></div>
              <div className="pl-10 py-4">
                <p className="text-white italic text-2xl md:text-3xl font-brand font-light leading-snug tracking-tight">
                  "To jest właśnie to, o co chodzi w pasji do aut. Prostota, charakter i wykonanie, którego nie da się zignorować."
                </p>
                
                <div className="flex items-center gap-4 mt-8">
                  <div className="w-12 h-px bg-zinc-800"></div>
                  <div className="flex flex-col">
                    <span className="text-white font-brand font-black italic uppercase tracking-widest text-sm">
                      Jay Leno
                    </span>
                    <span className="text-data text-[9px] text-zinc-600 uppercase tracking-[0.3em]">
                      External_Validation // TV_Host_&_Collector
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dolne metadane sekcji */}
            <div className="pt-12 flex gap-12 border-t border-white/5">
              <div>
                <span className="block text-[8px] font-mono text-zinc-600 uppercase mb-1 tracking-widest">Philosophy</span>
                <span className="text-[10px] text-zinc-400 font-mono uppercase">Form_Follows_Function</span>
              </div>
              <div>
                <span className="block text-[8px] font-mono text-zinc-600 uppercase mb-1 tracking-widest">Location</span>
                <span className="text-[10px] text-zinc-400 font-mono uppercase">Vizia_Lab_Warsaw</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};