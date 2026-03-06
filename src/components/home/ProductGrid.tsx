'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { SectionHeader } from '../ui/SectionHeader';
import { ProductCard } from '../ui/ProductCard';
import { useNRG } from '../../context/NRGContext'; // Importujemy nasz nowy Context

export const ProductGrid = () => {
  const { isNRG, hideoutUnlocked } = useNRG(); // Pobieramy stany globalne
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      
      const { data: productsData, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Błąd pobierania produktów:", error);
        setLoading(false);
        return;
      }

      const now = new Date();

      const processedProducts = await Promise.all(productsData.map(async (product) => {
        // --- LOGIKA CZASU ---
        const releaseDate = product.release_date ? new Date(product.release_date) : null;
        let isPreRelease = false;
        let isClassicsGarage = false;
        let daysLeft: number | string = '--';

        if (releaseDate && !isNaN(releaseDate.getTime())) {
          const classicsDate = new Date(releaseDate);
          classicsDate.setFullYear(releaseDate.getFullYear() + 1);
          
          isPreRelease = now < releaseDate;
          isClassicsGarage = now > classicsDate;

          const diffTime = classicsDate.getTime() - now.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          daysLeft = diffDays > 0 ? diffDays : 0;
        }

        // --- FILTRACJA WIDOCZNOŚCI (NRG & HIDEOUT) ---
        const isHideout = product.collection?.toLowerCase().includes('hideout');

        // 1. Jeśli to produkt HIDEOUT, a kod 'NRG' nie został wpisany - ukryj całkowicie
        if (isHideout && !hideoutUnlocked) return null;

        // 2. Jeśli produkt jest przed premierą lub w Classics Garage, a user nie ma TOKENA - ukryj
        if (!isNRG) {
          if (isPreRelease || isClassicsGarage) return null;
        }

        // --- LOGIKA REALNEGO STOCKU ---
        const { count: remainingStock } = await supabase
          .from('vin_pool')
          .select('*', { count: 'exact', head: true })
          .eq('product_id', product.id)
          .eq('is_sold', false)
          .is('assigned_at', null);

        // --- LOGIKA ZDJĘĆ ---
        const folderPath = product.base_vin?.trim() || 'default';
        const { data: files } = await supabase.storage.from('vizia-products').list(folderPath);

        let imgFront = '';
        let imgBack = '';

        if (files && files.length > 0) {
          const frontFile = files.find(f => f.name.toLowerCase().includes('front')) || files[0];
          const backFile = files.find(f => f.name.toLowerCase().includes('back')) || (files[1] || files[0]);

          imgFront = supabase.storage.from('vizia-products').getPublicUrl(`${folderPath}/${frontFile.name}`).data.publicUrl;
          imgBack = supabase.storage.from('vizia-products').getPublicUrl(`${folderPath}/${backFile.name}`).data.publicUrl;
        }

        return {
          id: product.slug,
          name: product.name,
          series: product.collection,
          left: remainingStock || 0,
          price: product.price ? product.price.toFixed(2) : '---',
          variant: isHideout ? 'hideout' : 
                   product.collection?.toLowerCase().includes('pole') ? 'pole-position' : 'standard',
          daysLeft: daysLeft,
          imgFront: imgFront,
          imgBack: imgBack,
          isClassics: isClassicsGarage,
          isPreRelease: isPreRelease,
          isHideout: isHideout
        };
      }));

      setProducts(processedProducts.filter(p => p !== null));
      setLoading(false);
    }

    fetchProducts();
  }, [isNRG, hideoutUnlocked]); // Reaguj na zmiany dostępu

  if (loading) return (
    <div className="py-40 bg-vizia-black flex items-center justify-center font-mono text-[10px] text-zinc-800 tracking-widest uppercase animate-pulse">
      Initialising_Secure_Link...
    </div>
  );

  return (
    <section id="products" className="py-24 md:py-40 bg-vizia-black">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="mb-20">
          <SectionHeader 
            tagline={isNRG ? "PROTCOL_NRG_ACTIVE // DATA_UNLOCKED" : "LIVE_COLLECTION_STATUS // VOL_01"}
            title={hideoutUnlocked ? "Hideout & Collection" : (isNRG ? "NRG Archive" : "The Collection")}
            description={
              hideoutUnlocked 
                ? "ACCESS_GRANTED: Wyświetlasz superlimitowaną linię Hideout oraz pełne archiwum VIZIA."
                : (isNRG 
                    ? "Pełny dostęp dla subskrybentów: Archiwum Classics Garage oraz nadchodzące premiery są aktywne."
                    : "Aktywne jednostki produkcyjne. Modele archiwalne i przedpremierowe są widoczne wyłącznie dla subskrybentów NRG.")
            }
            align="left"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {products.map((product) => (
            <div key={product.id} className="relative group">
              {/* Badge dla produktów specjalnych */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.isHideout && (
                  <div className="bg-red-500 text-black px-2 py-1 font-mono text-[7px] font-bold uppercase tracking-widest border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    Hideout_Unit
                  </div>
                )}
                {isNRG && product.isClassics && (
                  <div className="bg-zinc-900/90 text-zinc-500 border border-white/10 px-2 py-1 font-mono text-[7px] uppercase tracking-widest">
                    Classics_Garage
                  </div>
                )}
                {isNRG && product.isPreRelease && (
                  <div className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-1 font-mono text-[7px] uppercase tracking-widest">
                    Early_Access
                  </div>
                )}
              </div>
              
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};