'use client';

import React from 'react';
import { StockGauges } from '../../ui/StockGauges';

export const ProductHeader = ({ product }: any) => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-brand font-black italic leading-none tracking-tighter uppercase mb-2 text-white">
          {product.name}
        </h1>
        <h2 className="text-[10px] font-mono text-zinc-500 tracking-[0.4em] uppercase">
          Series: {product.series.replace('_', ' ')}
        </h2>
      </div>

      <div className="flex justify-between items-end border-t border-white/5 pt-6">
        <div className="flex flex-col">
          <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mb-1 font-bold">Unit_Price:</span>
          <div className="text-4xl font-brand font-black italic text-white tracking-tighter">
            {product.price} <span className="text-sm text-zinc-600 not-italic font-bold tracking-normal uppercase font-sans">PLN</span>
          </div>
        </div>

        <div className="pb-1">
          <StockGauges 
            remaining={product.remaining} 
            daysLeft={product.daysLeft} 
          />
        </div>
      </div>
    </div>
  );
};