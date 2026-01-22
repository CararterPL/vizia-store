import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 py-20 bg-vizia-black overflow-hidden">
      
      {/* TŁO: Obraz i efekty */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Główny obraz tła */}
        <div className="absolute inset-0 opacity-40">
          <Image 
            src="/images/vizia-bg.png" 
            alt="Vizia Background" 
            fill 
            priority
            className="object-cover object-right-bottom md:object-center"
          />
          {/* Gradient maskujący obraz, aby dół i lewa strona płynnie przeszły w czerń */}
          <div className="absolute inset-0 bg-gradient-to-t from-vizia-black via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-vizia-black via-transparent to-transparent"></div>
        </div>

        {/* Efekty świetlne i linie pomocnicze */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,19,58,0.05)_0%,transparent_50%)]"></div>
        <div className="absolute left-10 md:left-20 top-0 w-[1px] h-full bg-gradient-to-b from-vizia-red/40 via-white/5 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-[1400px]">
        {/* Nadtytuł */}
        <div className="text-data mb-6 flex items-center gap-4">
          <span className="w-8 h-[1px] bg-vizia-red"></span>
          STORY: FROM MALUCH TO HOT WHEELS LEGEND
        </div>

        {/* GŁÓWNY TYTUŁ */}
        <h1 className="mb-6 max-w-5xl leading-[0.85] text-glow-red">
          VIZIA LAB<span className="text-vizia-red">.</span>
        </h1>

        {/* PODTYTUŁ */}
        <h3 className="text-zinc-400 mb-8 max-w-3xl">
          Garage Built. Performance Driven.
        </h3>

        {/* PARAGRAF */}
        <p className="max-w-xl mb-12 text-zinc-500">
          Projektujemy rzeczy, które sami chcemy nosić. Bez kompromisów w jakości, 
          bez masowej produkcji. Tylko 99 sztuk z każdego wzoru. Raz na zawsze.
        </p>

        {/* PRZYCISKI */}
        <div className="flex flex-wrap gap-6 items-center">
          <Button variant="cta" size="lg">
            Sprawdź drop
          </Button>
          
          <Button variant="ghost" size="lg">
            O projekcie
          </Button>
        </div>
      </div>

      {/* STATYSTYKI DOLNE - Chłodne, techniczne podejście */}
<div className="absolute bottom-10 left-6 md:left-20 z-10 flex flex-wrap gap-8 md:gap-20 border-t border-white/5 pt-10 w-[calc(100%-3rem)] md:w-[calc(100%-10rem)]">
  
  <div className="flex flex-col">
    <span className="text-data text-[10px] text-zinc-500 mb-1">GARMENT_ORIGIN</span>
    <div className="flex items-baseline gap-2">
       <span className="font-brand font-black italic text-xl text-white">HEAVY_COTTON_USA</span>
    </div>
  </div>
  
  <div className="flex flex-col">
    <span className="text-data text-[10px] text-vizia-red mb-1">EDITION_STATUS</span>
    <div className="flex items-baseline gap-2">
       <span className="font-brand font-black italic text-xl text-white uppercase">Series_01_Drop</span>
       <span className="text-zinc-600 text-[10px] ml-2 font-mono">/ AVAILABLE_UNTIL_2027</span>
    </div>
  </div>

  <div className="flex flex-col border-l border-white/10 pl-8 hidden lg:flex">
    <span className="text-data text-[10px] text-zinc-600 mb-1">FINISHING_LAB</span>
    <span className="font-brand font-black italic text-xl text-zinc-400 uppercase">Vizia_Studio_Poland</span>
  </div>

  <div className="flex flex-col border-l border-white/10 pl-8 hidden xl:flex">
    <span className="text-data text-[10px] text-zinc-600 mb-1">PROCESS_LOG</span>
    <span className="font-brand font-black italic text-xl text-zinc-400 uppercase">Print_On_Order</span>
  </div>
</div>

      {/* SYGNATURA ŚWIETLNA */}
      <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 rotate-90 hidden xl:block z-10">
        <span className="text-data text-[10px] text-white/10 tracking-[2em] whitespace-nowrap">
          LUMITRACE™_REFLECTIVE_SIGNATURE_SYSTEM
        </span>
      </div>
    </section>
  );
};