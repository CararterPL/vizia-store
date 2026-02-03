'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { ProductCard } from '../ui/ProductCard';

const relatedProducts = [
  { id: '911', name: 'GT3 RS', vin: 'SHDWRC-911RSGTTS-XX', left: 42, price: '259', daysLeft: 241, imgBack: '/products/vizia_shdwrc_911rsgt01ts-back.png', imgFront: '/products/vizia_shdwrc_911rsgt01ts-front.png' },
  { id: 'G700', name: 'G-BRABUS', vin: 'SHDWRC-AMGGBRBTS-XX', left: 12, price: '259', daysLeft: 14, imgBack: '/products/vizia_shdwrc_amggbrb01ts-back.png', imgFront: '/products/vizia_shdwrc_911rsgt01ts-front.png' },
  { id: 'GTD', name: 'MUSTANG GTD', vin: 'SHDWRC-MSTNGGTTS-XX', left: 7, price: '259', daysLeft: 310, imgBack: '/products/vizia_shdwrc_911rsgt01ts-front.png', imgFront: '/products/vizia_shdwrc_911rsgt01ts-front.png' },
];

export const CrossSelling = () => {
  return (
    <section className="py-24 px-4 md:px-10 max-w-[1600px] mx-auto bg-black border-t border-white/5">
      <h3 className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.5em] mb-12 italic ml-2">
        // DEPLOYED_UNITS_GRID
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}

        {/* CUSTOM CLUB BOX - zostaje tutaj jako unikalny element */}
        <div className="group relative flex flex-col bg-vizia-red/5 border border-vizia-red/20 p-8 justify-between">
          <div className="space-y-4">
            <span className="text-vizia-red font-mono text-[9px] tracking-[0.4em] font-bold">// CUSTOM_SERVICE</span>
            <h4 className="text-2xl font-brand font-black italic text-white uppercase tracking-tighter leading-tight">
              PROJEKT DLA <br/> TWOJEJ EKIPY
            </h4>
            <p className="text-[11px] font-mono text-zinc-500 uppercase leading-relaxed font-sans not-italic lowercase">
              Tworzymy dedykowane wzory dla klubów samochodowych, grup i eventów.
            </p>
            <div className="bg-black/40 p-3 border border-white/5 space-y-2">
              <p className="text-[10px] font-mono text-white tracking-tighter uppercase font-bold italic underline decoration-vizia-red decoration-2 underline-offset-4">
                Min. 10 jednostek
              </p>
              <p className="text-[10px] font-mono text-vizia-red uppercase font-bold tracking-tighter">
                Projekt graficzny: 0 PLN
              </p>
            </div>
          </div>
          <Button variant="cta" size="sm" className="w-full mt-8">CONTACT_DEPT</Button>
        </div>
      </div>
    </section>
  );
};