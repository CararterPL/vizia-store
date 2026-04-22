'use client';

import React, { use, useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { ProductGallery } from "../../../components/product/ProductGallery";
import { ProductInfo } from "../../../components/product/ProductInfo";
import { ProductFeatures } from "../../../components/product/ProductFeatures";
import { CrossSelling } from "../../../components/product/CrossSelling";

export type ProductSeries = 'SHADOW_RACE' | 'THE_HIDEOUT' | 'CLASSICS_GARAGE' | 'POLE_POSITION';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNRG, setIsNRG] = useState(false);

  useEffect(() => {
    async function fetchProductData() {
      setLoading(true);
      const decodedSlug = decodeURIComponent(resolvedParams.id);

      const { data: productData, error: prodError } = await supabase
        .from('products')
        .select('*')
        .eq('slug', decodedSlug)
        .single();

      if (prodError || !productData) {
        setLoading(false);
        return;
      }

      const folderPath = productData.base_vin.trim();
      
      const { data: files } = await supabase.storage
        .from('vizia-products')
        .list(folderPath);

      if (files && files.length > 0) {
        const urls = files
          .filter(file => !file.name.includes('.empty'))
          .map((file) => 
            supabase.storage.from('vizia-products').getPublicUrl(`${folderPath}/${file.name}`).data.publicUrl
          );
        setImages(urls);
      }

      setProduct(productData);
      setLoading(false);
    }

    fetchProductData();
  }, [resolvedParams.id]);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center font-mono text-[10px] tracking-widest text-zinc-300 uppercase">
      Initialising_Visual_Stream...
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-black flex items-center justify-center font-mono text-xs text-red-500 uppercase">
      Error: Product_Not_Found
    </div>
  );

  return (
    <main className="relative min-h-screen w-full bg-black text-white">
      <div className="fixed bottom-4 left-4 z-[200] bg-zinc-900/80 backdrop-blur-md border border-white/10 p-2 flex gap-2 rounded-sm opacity-10 hover:opacity-100 transition-opacity">
        <button onClick={() => setIsNRG(!isNRG)} className="text-[9px] font-mono px-2 py-1 border border-white/10 uppercase text-amber-500">
          NRG_MODE: {isNRG ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="relative flex flex-col lg:block pt-[76px]">
        <div className="relative w-full h-[60vh] lg:h-[calc(100vh-76px)] lg:sticky lg:top-[76px] z-0">
          <ProductGallery key={images.length} images={images} />
        </div>

        <aside className="relative z-10 w-full lg:w-[560px] lg:absolute lg:top-[76px] lg:right-0 lg:h-[calc(100vh-76px)] bg-black/60 lg:backdrop-blur-2xl border-t lg:border-t-0 lg:border-l border-white/10">
          <div className="h-full overflow-y-auto scrollbar-hide p-6 lg:p-12 pb-32">
            <ProductInfo 
              product={{
                id: product.id,
                name: product.name,
                series: product.collection as ProductSeries,
                price: product.price,
                limit: 99,
                remaining: 34,
                daysLeft: 14,
                baseVin: product.base_vin,
                dropDate: product.created_at
              }} 
              isNRG={isNRG} 
            />
          </div>
        </aside>
      </div>

      <ProductFeatures />
      <CrossSelling />

      <footer className="bg-black py-12 px-6 border-t border-white/5 text-center">
        <span className="text-[8px] font-mono text-zinc-900 uppercase tracking-[0.5em]">VIZIA WEAR // 2026</span>
      </footer>
    </main>
  );
}