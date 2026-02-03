'use client';

import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { ProductCard } from '../ui/ProductCard';

const products = [
  { id: '911', name: 'GT3 RS', series: 'SHADOW RACE', left: 42, price: '359.00', variant: 'standard' as const, daysLeft: 241, imgBack: '/products/vizia_shdwrc_911rsgt01ts-back.png', imgFront: '/products/vizia_shdwrc_911rsgt01ts-front.png' },
  { id: 'GTD', name: 'MUSTANG GTD', series: 'SHADOW RACE', left: 7, price: '359.00', variant: 'standard' as const, daysLeft: 310, imgBack: '/products/vizia-mustang7gtd_view1.webp', imgFront: '/products/vizia_shdwrc_911rsgt01ts-front.png' },
  { id: 'GP3', name: 'MINI GP', series: 'SHADOW RACE', left: 88, price: '359.00', variant: 'standard' as const, daysLeft: 350, imgBack: '/products/vizia-minijcwgp.webp', imgFront: '/products/gp3_front.png' },
  { id: 'G700', name: 'G-BRABUS', series: 'THE HIDEOUT', left: 12, price: '359.00', variant: 'hideout' as const, daysLeft: 14, imgBack: '/products/vizia_shdwrc_amggbrb01ts-back.png', imgFront: '/products/vizia_shdwrc_911rsgt01ts-front.png' },
  { id: 'RS6', name: 'RS6 AVANT', series: 'POLE-POSITION', left: 0, price: '---', variant: 'pole-position' as const, releaseDate: 'MAY 2026', imgBack: '/products/rs6_back.jpg', imgFront: '' },
  { id: 'M3T', name: 'M3 TOURING', series: 'POLE-POSITION', left: 0, price: '---', variant: 'pole-position' as const, releaseDate: 'AUG 2026', imgBack: '/products/m3t_back.jpg', imgFront: '' },
];

export const ProductGrid = () => {
  return (
    <section id="products" className="py-24 md:py-40 bg-vizia-black">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="mb-20">
          <SectionHeader 
            tagline="LIVE_COLLECTION_STATUS // VOL_01"
            title="The Collection"
            description="Aktywne jednostki produkcyjne dostępne w aktualnym oknie czasowym. Każdy model objęty jest ścisłym limitem 99 egzemplarzy."
            align="left"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};