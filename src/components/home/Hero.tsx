'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';

export const Hero = () => {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-[100vh] flex items-center bg-vizia-black overflow-hidden">
      
      {/* TŁO - Pełny Focus na wizualu */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/erik-mclean-ulnrA9yfyAo-unsplash.jpg" 
          alt="Vizia Heritage" 
          fill 
          priority
          className="object-cover object-center opacity-80 grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-vizia-black via-vizia-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-vizia-black via-transparent to-transparent z-10" />
      </div>

      {/* CONTENT - Szeroki grid 1600px */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto sm:px-12 md:px-12 2xl:px-0">
        <div className="max-w-3xl outline-solid">
          
          {/* Minimalistyczny Tag */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-mono tracking-[0.4em] text-vizia-red font-bold uppercase">
              // Series_01. Release
            </span>
          </div>

          {/* Brutalistyczny Tytuł */}
          <h1 className="text-[14vw] md:text-[48px] lg:text-[64px] leading-[0.8] font-brand font-black italic uppercase tracking-tighter mb-10">
            For the Night Run
          </h1>

          {/* Krótki, uderzający tekst */}
          <p className="text-zinc-400 text-lg md:text-xl max-w-lg mb-12 font-light leading-snug">
            Garażowe dziedzictwo. Limitacja <span className="text-white font-bold">99 sztuk</span>. 
            Raz na zawsze.
          </p>

          {/* Główny punkt konwersji */}
          <div className="flex items-center gap-8">
            <Button 
              variant="primary" 
              size="md" 
              onClick={scrollToProducts}
              className="px-16 py-8 text-xl group"
            >
              SPRAWDŹ DROP 
              <span className="inline-block ml-4 group-hover:translate-x-2 transition-transform">→</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Techniczny pasek dolny - tylko kluczowe dane */}
      <div className="absolute bottom-10 left-0 w-full z-30">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-end">
          
          <div className="flex gap-12">
            <div className="hidden md:block">
              <p className="text-[8px] font-mono text-zinc-600 tracking-widest uppercase mb-1">Stock_Status</p>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-vizia-red animate-pulse"></span>
                <span className="font-brand font-black italic text-sm">LIVE_NOW</span>
              </div>
            </div>
            
            <div>
              <p className="text-[8px] font-mono text-zinc-600 tracking-widest uppercase mb-1">Fabric_Quality</p>
              <p className="font-brand font-black italic text-sm text-zinc-400 uppercase">Heavy_Cotton_400G</p>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <p className="text-[8px] font-mono text-zinc-600 tracking-widest uppercase mb-1">Designer_Note</p>
            <p className="font-mono text-[10px] text-zinc-500 italic">"No compromises, just performance."</p>
          </div>
          
        </div>
      </div>
    </section>
  );
};