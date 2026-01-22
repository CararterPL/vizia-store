'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
}

const ALL_PRODUCTS: Product[] = [
  { id: '1', name: '911 GT3 RS', price: '259 PLN', image: '/products/911.jpg', category: 'NRG_CORE' },
  { id: '2', name: 'M4 COMPETITION', price: '259 PLN', image: '/products/m4.jpg', category: 'NRG_CORE' },
  { id: '3', name: 'TURBO S UNIT', price: '279 PLN', image: '/products/turbo.jpg', category: 'NRG_CORE' },
  { id: '4', name: 'SPECIAL-E HOODIE', price: '449 PLN', image: '/products/hoodie.jpg', category: 'NRG_LTD' },
];

export const CrossSelling = ({ currentProductId }: { currentProductId: string }) => {
  const relatedProducts = ALL_PRODUCTS.filter(p => p.id !== currentProductId).slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 3 PRODUKTY INNE NIŻ OBECNY */}
      {relatedProducts.map((product) => (
        <Link 
          key={product.id} 
          href={`/product/${product.id}`} 
          className="group bg-zinc-900/10 border border-white/5 p-4 hover:border-vizia-red/40 transition-all flex flex-col"
        >
          <div className="relative aspect-square mb-6 overflow-hidden bg-black border border-white/5">
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              className="object-cover saturate-0 contrast-[1.1] group-hover:saturate-100 transition-all duration-700"
            />
          </div>
          <div className="flex-grow">
             <div className="text-data text-vizia-red mb-1">// {product.category}</div>
             <h5>{product.name}</h5>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-vizia-red font-black italic">{product.price}</p>
          </div>
        </Link>
      ))}

      {/* 4. BOX CUSTOM UNITS - BLUEPRINT STYLE */}
      <div className="relative border border-dashed border-white/20 p-6 flex flex-col justify-between items-start min-h-[350px] bg-zinc-900/5 group hover:border-vizia-red/40 transition-colors">
        {/* Dekoracyjny narożnik */}
        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none opacity-20">
            <div className="absolute top-0 right-0 w-full h-[1px] bg-white"></div>
            <div className="absolute top-0 right-0 w-[1px] h-full bg-white"></div>
        </div>

        <div>
          <div className="text-data mb-6">// B2B_OPERATIONS</div>
          <h5>CUSTOM_UNITS</h5>
          <p className="mt-4 text-zinc-500 uppercase leading-relaxed max-w-[200px]">
            PROJEKTY DLA KLUBÓW I GRUP. <br/>DEDYKOWANE SERIE OD 10 SZTUK.
          </p>
        </div>

        <div className="w-full">
            <Link 
              href="mailto:nrg@vizia-lab.com" 
              className="block w-full text-center py-4 border border-white text-data text-[10px] hover:bg-white hover:text-black transition-all font-black uppercase italic"
            >
              Contact_Protocol //
            </Link>
        </div>

        <div className="mt-4 text-[8px] font-mono opacity-20 tracking-[0.3em] uppercase">
            Vizia_System_v2.0_Custom_Ready
        </div>
      </div>
    </div>
  );
};