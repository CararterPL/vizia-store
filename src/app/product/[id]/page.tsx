'use client';

import React, { use } from 'react';
import { ProductGallery } from "../../../components/product/ProductGallery";
import { ProductInfo } from "../../../components/product/ProductInfo";
import { CrossSelling } from "../../../components/product/CrossSelling";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  
  // Rozpakowujemy ID produktu
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  return (
    /* Usuwamy Header i Footer stąd! 
       Zostaną one automatycznie dodane przez RootLayout.
       Usuwamy też bg-vizia-black, bo layout już to ma.
    */
    <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto">
        {/* Główny grid produktu */}
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-24 items-start">
            
          {/* LEWA STRONA: Galeria */}
          <div className="w-full order-1 lg:order-1">
            <ProductGallery />
          </div>

          {/* PRAWA STRONA: Info */}
          <div className="w-full order-2 lg:order-2 lg:sticky lg:top-32">
            <ProductInfo />
          </div>

        </div>

        {/* SEKCJA POD PRODUKTEM: Cross Selling */}
        <div className="mt-32 border-t border-white/5 pt-24">
          <h4 className="mb-12 text-zinc-400 uppercase tracking-widest text-xs font-bold">Uzupełnij garaż</h4>
          <CrossSelling currentProductId={id} />
        </div>
      </div>
    </main>
  );
}