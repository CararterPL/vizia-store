'use client';

import React, { useEffect, useState } from 'react';
import { StockGauges } from '../../ui/StockGauges';
import { supabase } from '../../../lib/supabase';

export const ProductHeader = ({ product }: any) => {
  const [remainingCount, setRemainingCount] = useState<number>(0);
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!product?.id) return;

      try {
        const { data: dbProduct } = await supabase
          .from('products')
          .select('release_date')
          .eq('id', product.id)
          .single();

        const actualReleaseDate = dbProduct?.release_date || product.release_date;

        const { count } = await supabase
          .from('vin_pool')
          .select('*', { count: 'exact', head: true })
          .eq('product_id', product.id)
          .eq('is_sold', false)
          .is('assigned_at', null);

        if (count !== null) setRemainingCount(count);

        if (actualReleaseDate) {
          const release = new Date(actualReleaseDate);
          if (!isNaN(release.getTime())) {
            const classicsDate = new Date(release);
            classicsDate.setFullYear(release.getFullYear() + 1);
            
            const now = new Date();
            const diffTime = classicsDate.getTime() - now.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDaysLeft(diffDays > 0 ? diffDays : 0);
          }
        }
      } catch (err) {
        console.error("HEADER_FETCH_ERROR:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [product?.id, product?.release_date]);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-brand font-black italic leading-none tracking-tighter uppercase text-white">
            {product?.name || "LOADING_UNIT..."}
          </h1>
          {daysLeft === 0 && !loading && (
            <span className="text-[8px] bg-red-500/10 text-red-500 px-2 py-1 font-mono uppercase tracking-widest border border-red-500/20 animate-pulse">
              Classics_Garage_Status
            </span>
          )}
        </div>
        <h2 className="text-[10px] font-mono text-zinc-300 tracking-[0.4em] uppercase">
          Series: {product?.series?.replace('_', ' ') || "PROTOCOL_UNDEFINED"}
        </h2>
      </div>

      <div className="flex justify-between items-end border-t border-white/5 pt-6">
        <div className="flex flex-col text-left">
          <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest mb-1 font-bold">
            CENA:
          </span>
          <div className="text-4xl font-brand font-black italic text-white tracking-tighter">
            {product?.price || "---"} <span className="text-sm text-zinc-400 not-italic font-bold tracking-normal uppercase font-sans">PLN</span>
          </div>
        </div>

        <div className="pb-1">
          <StockGauges 
            remaining={remainingCount} 
            daysLeft={daysLeft} 
          />
        </div>
      </div>
    </div>
  );
};