'use client';

import React, { use } from 'react';
import { ProductGallery } from "../../../components/product/ProductGallery";
import { ProductInfo } from "../../../components/product/ProductInfo";
import { CrossSelling } from "../../../components/product/CrossSelling";
import { Button } from "../../../components/ui/Button";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  return (
    <main className="relative min-h-screen w-full bg-black">
      
      {/* SEKCJA GŁÓWNA (HERO) */}
      <div className="relative flex flex-col lg:block">
        
        {/* GALERIA - Na desktopie zajmuje całe tło sekcji Hero */}
        <div className="relative w-full h-[60vh] lg:h-screen lg:sticky lg:top-0 z-0">
          <ProductGallery />
        </div>

        {/* PANEL INFO - "Frozen Glass" nakładka na galerię */}
        <aside 
          className="
            relative z-10 
            w-full lg:w-[clamp(450px,35vw,550px)] 
            lg:absolute lg:top-0 lg:right-0 lg:h-full
            bg-black lg:bg-black/40 lg:backdrop-blur-2xl 
            border-t lg:border-t-0 lg:border-l border-white/10 
          "
        >
          {/* Kontener z własnym scrollem dla treści info, jeśli tekst jest długi */}
          <div className="p-6 md:p-14 pb-32 lg:pb-14 h-full lg:overflow-y-auto scrollbar-hide">
            <ProductInfo />
          </div>

          {/* Pionowa linia pomocnicza dla efektu technicznego */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent pointer-events-none" />
        </aside>
      </div>

      {/* SEKCJA CROSS-SELLINGU */}
      <div className="relative z-20 bg-black px-6 md:px-14 lg:px-24 py-12 lg:py-24 border-t border-white/10">
        <CrossSelling currentProductId={productId} />
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
      <footer className="bg-black py-12 px-6 md:px-14 lg:px-24 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <span className="text-[8px] font-mono text-zinc-800 uppercase tracking-[0.5em]">
            Vizia_Technical_Apparel // Release_2026.01
          </span>
          <div className="flex gap-8 font-mono text-[7px] text-zinc-600 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy_Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms_of_Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact_Division</a>
          </div>
        </div>
      </footer>
    </main>
  );
}