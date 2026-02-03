'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './Button';
import { StockGauges } from './StockGauges';

interface ProductCardProps {
  id: string;
  name: string;
  series: string; // Zmienione z VIN
  price: string;
  left: number;
  daysLeft?: number;
  imgBack: string;
  imgFront?: string;
  variant?: 'standard' | 'pole-position' | 'hideout';
  releaseDate?: string;
  estimatedUnits?: number;
}

export const ProductCard = ({ 
  id, name, series, price, left, daysLeft, imgBack, imgFront, 
  variant = 'standard',
  releaseDate = 'Q4 2026',
  estimatedUnits = 99
}: ProductCardProps) => {
  const isPolePosition = variant === 'pole-position';
  const isHideout = variant === 'hideout';

  return (
    <div className={`group relative flex flex-col bg-zinc-950 border transition-all duration-500 overflow-hidden
      ${isHideout ? 'border-vizia-red shadow-[0_0_20px_rgba(255,19,58,0.15)] animate-[pulse_4s_infinite]' : 'border-white/5 hover:border-vizia-red/40'}
    `}>
      <Link href={isPolePosition ? "#" : `/product/${id}`} className={isPolePosition ? 'cursor-default' : 'cursor-pointer'}>
        
        {/* MEDIA SECTION */}
        <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
          <Image 
            src={imgBack} alt={name} fill 
            className={`object-cover transition-all duration-700 
              ${isPolePosition ? 'opacity-20 saturate-0 blur-md' : 'opacity-100 saturate-[1] group-hover:opacity-0 group-hover:scale-110'}`} 
          />
          {!isPolePosition && imgFront && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Image src={imgFront} alt={name} fill className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
            </div>
          )}

          {isHideout && (
            <div className="absolute top-4 left-4 z-20 bg-vizia-red text-white font-brand font-black italic text-[10px] px-3 py-1 uppercase tracking-widest">
              Limited_Hideout_Edition
            </div>
          )}
        </div>

        {/* CONTENT SECTION */}
        <div className="p-8 space-y-6 flex-grow flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-white/5 pb-4">
              <div className="flex-grow">
                <h4 className={`text-3xl leading-none font-brand font-black italic uppercase transition-colors ${isPolePosition ? 'text-zinc-700' : 'text-white group-hover:text-vizia-red'}`}>
                  {name}
                </h4>
                <p className="text-vizia-red font-mono text-[10px] mt-2 tracking-[0.2em] uppercase italic font-bold">{series}</p>
              </div>
            </div>

            {/* CENA I ZEGRARY NA JEDNEJ WYSOKOŚCI */}
            <div className="flex justify-between items-end h-14">
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Status_Price</span>
                {isPolePosition ? (
                   <div className="text-xl font-brand font-black italic text-zinc-700 uppercase">TBA</div>
                ) : (
                  <div className="text-3xl font-brand font-black italic text-white leading-none">
                    {price}<span className="text-xs text-zinc-500 not-italic ml-1 font-sans">PLN</span>
                  </div>
                )}
              </div>

              {!isPolePosition && (
                <div className="scale-90 origin-bottom-right">
                  <StockGauges remaining={left} daysLeft={daysLeft || 0} className="flex gap-3" />
                </div>
              )}
              
              {isPolePosition && (
                <div className="text-right flex flex-col items-end pb-1">
                   <span className="text-[9px] font-mono text-vizia-red uppercase tracking-widest font-bold animate-pulse">Pending_Release</span>
                   <span className="text-[10px] font-mono text-zinc-500 uppercase">{releaseDate}</span>
                </div>
              )}
            </div>
          </div>

          {/* BUTTON CTA */}
          <div className="pt-4">
            {!isPolePosition ? (
              <Button variant="primary" size="md" className="w-full text-base py-0 tracking-[0.2em] uppercase font-black italic group-hover:bg-vizia-red group-hover:text-white transition-all duration-300">
                Szczegóły
              </Button>
            ) : (
              <div className="w-full border border-zinc-800 text-zinc-800 font-brand font-black italic text-center uppercase tracking-widest text-[10px] py-4">
                Coming_Soon_2026
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};