'use client';

import React, { use } from 'react';
import { ProductGallery } from "../../../components/product/ProductGallery";
import { ProductInfo } from "../../../components/product/ProductInfo";
import { CrossSelling } from "../../../components/product/CrossSelling"; // Zmieniona nazwa
import { Button } from "../../../components/ui/Button";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  return (
    <main className="relative min-h-screen w-full bg-black">
      
      {/* SEKCJA GŁÓWNA (HERO) - EDGE TO EDGE */}
      <div className="flex flex-col lg:flex-row relative">
        
        {/* LEWA STRONA: GALERIA */}
        <div className="relative w-full h-[60vh] lg:h-screen lg:sticky lg:top-0 lg:flex-1 overflow-hidden">
          <ProductGallery />
        </div>

        {/* PRAWA STRONA: PANEL INFO */}
        <aside 
          className="
            relative z-10 
            w-full lg:w-[clamp(450px,35vw,600px)] 
            bg-black lg:bg-black/30 lg:backdrop-blur-2xl 
            lg:border-l lg:border-white/10 
            min-h-screen
          "
        >
          <div className="p-6 md:p-14 pb-32 lg:pb-14">
            <ProductInfo />
          </div>

          {/* Pionowa linia pomocnicza */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </aside>
      </div>

      {/* SEKCJA CROSS-SELLINGU - Z MARGINESAMI BOCZNYMI */}
      <div className="relative z-20 px-6 md:px-14 lg:px-24 py-12 lg:py-24 border-t border-white/5">
        <CrossSelling />
      </div>

      {/* STICKY CTA NA MOBILE */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 bg-black/80 backdrop-blur-md border-t border-white/10 lg:hidden">
        <Button 
          variant="cta" 
          className="w-full py-4 uppercase italic text-lg tracking-tighter shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"
          onClick={() => {
            const ctaBtn = document.querySelector('#main-cta-button') as HTMLButtonElement;
            ctaBtn?.click();
          }}
        >
          Add to Vault // 259 PLN
        </Button>
      </div>

      {/* FOOTER */}
      <footer className="bg-black py-12 px-6 md:px-14 lg:px-24 border-t border-white/5 text-[8px] font-mono text-zinc-800 uppercase tracking-[0.5em]">
        Vizia_Technical_Apparel // All Rights Reserved 2026
      </footer>
    </main>
  );
}