'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ProductCard } from '../ui/ProductCard';
import { Button } from '../ui/Button';

export const CrossSelling = ({ currentProductId }: { currentProductId?: string }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      const { data: productsData, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !productsData) {
        setLoading(false);
        return;
      }

      const now = new Date();

      const processed = await Promise.all(
        productsData
          .filter(p => p.slug !== currentProductId)
          .slice(0, 3)
          .map(async (product) => {
            const releaseDate = product.release_date ? new Date(product.release_date) : null;
            let daysLeft: number | string = '--';

            if (releaseDate && !isNaN(releaseDate.getTime())) {
              const classicsDate = new Date(releaseDate);
              classicsDate.setFullYear(releaseDate.getFullYear() + 1);
              const diffTime = classicsDate.getTime() - now.getTime();
              daysLeft = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
            }

            const { count: remainingStock } = await supabase
              .from('vin_pool')
              .select('*', { count: 'exact', head: true })
              .eq('product_id', product.id)
              .eq('is_sold', false)
              .is('assigned_at', null);

            const folderPath = product.base_vin?.trim() || 'default';
            const { data: files } = await supabase.storage.from('vizia-products').list(folderPath);

            let imgFront = '';
            let imgBack = '';

            if (files && files.length > 0) {
              const frontFile = files.find(f => f.name.toLowerCase().includes('front')) || files[0];
              const backFile = files.find(f => f.name.toLowerCase().includes('back')) || files[1] || files[0];
              imgFront = supabase.storage.from('vizia-products').getPublicUrl(`${folderPath}/${frontFile.name}`).data.publicUrl;
              imgBack = supabase.storage.from('vizia-products').getPublicUrl(`${folderPath}/${backFile.name}`).data.publicUrl;
            }

            return {
              id: product.slug,
              name: product.name,
              series: product.collection,
              left: remainingStock || 0,
              price: product.price ? product.price.toFixed(2) : '---',
              daysLeft,
              imgFront,
              imgBack,
            };
          })
      );

      setProducts(processed);
      setLoading(false);
    }

    fetchProducts();
  }, [currentProductId]);

  return (
    <section className="py-24 px-4 md:px-10 max-w-[1600px] mx-auto bg-black border-t border-white/5">
      <h3 className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.5em] mb-12 italic ml-2">
        // DEPLOYED_UNITS_GRID
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-3 py-20 flex items-center justify-center font-mono text-[10px] text-zinc-600 uppercase tracking-widest animate-pulse">
            Loading_Units...
          </div>
        ) : (
          products.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))
        )}

        {/* CUSTOM DIVISION BOX */}
        <div className="group relative flex flex-col bg-vizia-red/5 border border-vizia-red/20 p-8 justify-between">
          <div className="space-y-6">
            <span className="text-vizia-red font-mono text-[9px] tracking-[0.4em] font-bold">// CUSTOM_DIVISION</span>
            
            <h4 className="text-2xl font-brand font-black italic text-white uppercase tracking-tighter leading-tight">
              Projekt dla<br/>Twojej ekipy
            </h4>

            <p className="text-[11px] font-mono text-zinc-400 lowercase leading-relaxed">
              Dedykowane wzory dla klubów samochodowych, grup i eventów. Twoje DNA, nasz standard wykonania.
            </p>

            <div className="space-y-px">
              {[
                { label: 'Min. zamówienie', value: '10 szt.' },
                { label: 'Projekt graficzny', value: '0 PLN' },
                { label: 'Czas realizacji', value: '3–4 tyg.' },
                { label: 'Personalizowany VIN', value: 'TAK' },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center py-2.5 border-b border-white/5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{row.label}</span>
                  <span className="text-[10px] font-mono text-white font-bold uppercase">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <div className="w-1.5 h-1.5 bg-vizia-red animate-pulse shrink-0" />
              <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                Aktualnie: <span className="text-white">2 sloty miesięcznie</span>
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <a href="mailto:vince@cararter.pl?subject=Custom Division Inquiry">
              <Button variant="cta" size="sm" className="w-full">
                Napisz do nas
              </Button>
            </a>
            <p className="text-center text-[9px] font-mono text-zinc-600 uppercase tracking-wider">
              vince@cararter.pl
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};