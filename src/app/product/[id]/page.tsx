'use client';

import React, { use, useState } from 'react';
import { ProductGallery } from "../../../components/product/ProductGallery";
import { ProductInfo } from "../../../components/product/ProductInfo";
import { ProductFeatures } from "../../../components/product/ProductFeatures";
import { CrossSelling } from "../../../components/product/CrossSelling";

export type ProductSeries = 'SHADOW_RACE' | 'THE_HIDEOUT' | 'CLASSICS_GARAGE' | 'POLE_POSITION';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [currentSeries, setCurrentSeries] = useState<ProductSeries>('SHADOW_RACE');
  const [isNRG, setIsNRG] = useState(false);

  const productData = {
    name: "MINI JCW GP",
    series: currentSeries,
    price: 359,
    limit: 99,
    remaining: 34,
    daysLeft: 14,
    baseVin: "SHDWRC-MNJCW01TS-",
    dropDate: "2026-03-01"
  };

  return (
    <main className="relative min-h-screen w-full bg-black text-white">
      {/* ADMIN TOGGLE */}
      <div className="fixed bottom-4 left-4 z-[200] bg-zinc-900/80 backdrop-blur-md border border-white/10 p-2 flex gap-2 rounded-sm opacity-40 hover:opacity-100 transition-opacity">
        <select 
          onChange={(e) => setCurrentSeries(e.target.value as ProductSeries)}
          className="bg-black text-[9px] font-mono p-1 border border-white/10"
          value={currentSeries}
        >
          <option value="SHADOW_RACE">SHADOW RACE</option>
          <option value="THE_HIDEOUT">THE HIDEOUT</option>
          <option value="CLASSICS_GARAGE">CLASSICS GARAGE</option>
          <option value="POLE_POSITION">POLE POSITION</option>
        </select>
        <button onClick={() => setIsNRG(!isNRG)} className="text-[9px] font-mono px-2 py-1 border border-white/10">
          NRG: {isNRG ? 'ON' : 'OFF'}
        </button>
      </div>

      {/* GŁÓWNA SEKCJA PRODUKTU - Z marginesem pod Header (76px) */}
      <div className="relative flex flex-col lg:block pt-[76px]">
        {/* GALERIA */}
        <div className="relative w-full h-[60vh] lg:h-[calc(100vh-76px)] lg:sticky lg:top-[76px] z-0">
          <ProductGallery />
        </div>

        {/* INFO PANEL - Szerokość 560px, odsunięty od góry o 76px */}
        <aside className="relative z-10 w-full lg:w-[560px] lg:absolute lg:top-[76px] lg:right-0 lg:h-[calc(100vh-76px)] bg-black/60 lg:backdrop-blur-2xl border-t lg:border-t-0 lg:border-l border-white/10">
          <div className="h-full overflow-y-auto scrollbar-hide p-6 lg:p-12 pb-32">
            <ProductInfo product={productData} isNRG={isNRG} />
          </div>
        </aside>
      </div>

      <ProductFeatures />
      <CrossSelling />

      <footer className="bg-black py-12 px-6 border-t border-white/5 text-center">
        <span className="text-[8px] font-mono text-zinc-800 uppercase tracking-[0.5em]">VIZIA WEAR // 2026</span>
      </footer>
    </main>
  );
}