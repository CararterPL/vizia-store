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
                alt="Vince Carson- Founder of Vizia" 
                fill 
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
              />
              
              {/* Overlay skanera na zdjęciu */}
              <div className="absolute inset-0 bg-gradient-to-t from-vizia-black/80 via-transparent to-transparent opacity-60"></div>
              
              {/* Techniczny tag pływający */}
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="bg-vizia-red text-white font-brand font-black italic px-5 py-3 text-sm tracking-widest shadow-2xl">
                  DESIGNER // VINCE_CARSON
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
                tagline="// CREATOR_ORIGIN"
                title="VINCE CARSON. DESIGN TO INSTYNKT"
                description="VIZIA nie potrzebuje dorobionej filozofii. Ma historię spisaną projektami. Za sterami stoi Vince Carson – petrolhead i artysta, dla którego granica między arkuszem blachy a płótnem nigdy nie istniała."
                align="left"
                className="!mb-0"
              />
              
              <div className="space-y-6 text-zinc-400 font-light leading-relaxed text-lg max-w-2xl">
                <p>
                  Od lat buduje markę Cararter, projektuje brandingi, tworzy wizualizacje ekstremalnych modyfikacji i unikalne oklejenia, które definiują polską scenę tuningową - <span className="text-white font-bold">Dub It, GoinWide, Fast Cartel</span>. W jego żyłach płynie mieszanka wysokooktanowego paliwa i farby.
                </p>
                <p>
                  Szczytowy punkt? <span className="text-white font-bold">Zwycięstwo w globalnym finale Hot Wheels Legends Tour 2025</span>. To Vince, ramię w ramię z Pawłem, przekuł koncepcję w legendę. Maluch, który podbił świat, to efekt jego wizji, modyfikacji i projektu oklejenia, który sam Jay Leno uznał za absolutny majstersztyk.
                </p>
              </div>
            </div>
            
            {/* Cytat Jaya Leno - stylizowany na raport techniczny */}
            <div className="relative mt-12 group">
              <div className="absolute top-0 left-0 w-1 h-full bg-vizia-red"></div>
              <div className="pl-10 py-4">
                <p className="text-white italic text-2xl md:text-3xl font-brand font-light leading-snug tracking-tight">
                  "Jest idealny! I ten ogrom pracy, żeby stworzyć takie grafiki. Wyglądają świetnie. Gdyby była tu choć jedna więcej, powiedziałbym, że to przesada."
                </p>
                
                <div className="flex items-center gap-4 mt-8">
                  <div className="w-12 h-px bg-zinc-800"></div>
                  <div className="flex flex-col">
                    <span className="text-white font-brand font-black italic uppercase tracking-widest text-sm">
                      Jay Leno
                    </span>
                    <span className="text-data text-[9px] text-zinc-400 uppercase tracking-[0.3em]">
                      Hot Wheels Legends Tour 2025 Global Final
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dolne metadane sekcji */}
            <div className="pt-12 flex gap-12 border-t border-white/5">
              <div>
                <span className="block text-[8px] font-mono text-zinc-400 uppercase mb-1 tracking-widest">Philosophy</span>
                <span className="text-[10px] text-zinc-400 font-mono uppercase">Form_Follows_Function</span>
              </div>
              <div>
                <span className="block text-[8px] font-mono text-zinc-400 uppercase mb-1 tracking-widest">Location</span>
                <span className="text-[10px] text-zinc-400 font-mono uppercase">Poland</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};