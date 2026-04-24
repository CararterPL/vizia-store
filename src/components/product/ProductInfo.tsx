'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { ProductHeader } from './info/ProductHeader';
import { SizeSelector } from './info/SizeSelector';
import { VinModule } from './info/VinModule';
import { ProductAccordion } from './info/ProductAccordion';
import { Button } from '../ui/Button';
import { useCart } from '../../context/CartContext';

export const ProductInfo = ({ product, isNRG = false }: any) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedVin, setSelectedVin] = useState<string | null>(null);
  const [isReserving, setIsReserving] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [uiMessage, setUiMessage] = useState<{type: 'error' | 'success' | 'info', text: string} | null>(null);

  const { addItem } = useCart();

  // Logika czasu
  const now = new Date();
  const releaseDate = product?.release_date ? new Date(product.release_date) : null;
  
  let isPreRelease = false;
  let isClassicsGarage = false;

  if (releaseDate && !isNaN(releaseDate.getTime())) {
    const classicsDate = new Date(releaseDate);
    classicsDate.setFullYear(releaseDate.getFullYear() + 1);
    isPreRelease = now < releaseDate;
    isClassicsGarage = now > classicsDate;
  }

const handleAddToCart = async () => {
  setUiMessage(null);
  if (!selectedSize) { setUiMessage({ type: 'error', text: 'SYSTEM_ERROR: WYBIERZ_ROZMIAR' }); return; }
  if (!selectedVin) { setUiMessage({ type: 'error', text: 'SYSTEM_ERROR: VIN_NIE_WYBRANY' }); return; }

  setIsReserving(true);
  const cleanVin = selectedVin.trim().toUpperCase();
  const sessionToken = crypto.randomUUID();
  const reservedUntil = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 minut
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('vin_pool')
    .update({
      reserved_until: reservedUntil,
      reserved_by_session: sessionToken,
    })
    .eq('vin_full', cleanVin)
    .eq('is_sold', false)
    .is('assigned_at', null)
    // Tylko niezarezerwowane lub z wygasłą rezerwacją
    .or(`reserved_until.is.null,reserved_until.lt.${now}`)
    .select();

  if (error || !data || data.length === 0) {
    setUiMessage({ type: 'error', text: 'LOCK_FAILED: UNIT_BUSY_OR_NOT_FOUND' });
    setIsReserving(false);
    setRefreshTrigger(prev => prev + 1);
    return;
  }

  addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    size: selectedSize,
    vin: cleanVin,
    sessionToken, // przekazujemy token do koszyka
    quantity: 1
  });

  setUiMessage({ type: 'success', text: `UNIT_LOCKED: ${cleanVin.split('-').pop()}` });
  setRefreshTrigger(prev => prev + 1);
  setSelectedVin(null);
  setIsReserving(false);
};

  return (
    <div className="space-y-10">
      <ProductHeader product={product} key={`header-${refreshTrigger}`} />

      {(!isPreRelease || isNRG) && (!isClassicsGarage || isNRG) ? (
        <>
          <SizeSelector selectedSize={selectedSize} onSizeSelect={setSelectedSize} />
          <VinModule 
            key={refreshTrigger}
            series={product.series} 
            isNRG={isNRG} 
            baseVin={product.baseVin} 
            productId={product.id}
            onVinSelect={setSelectedVin}
          />
        </>
      ) : (
        <div className="p-8 border border-white/10 bg-white/[0.02] text-center">
          <p className="font-brand italic font-black text-2xl text-white uppercase tracking-tighter">
            {isPreRelease ? 'Coming Soon' : 'Classics Garage'}
          </p>
          <p className="text-[10px] font-mono text-zinc-300 uppercase mt-2">NRG Subscribers Only</p>
        </div>
      )}

      <div className="pt-2">
        {uiMessage && (
          <div className={`p-4 border font-mono text-[10px] tracking-[0.2em] mb-4 ${
            uiMessage.type === 'error' ? 'text-red-500 border-red-500/30' : 'text-emerald-500 border-emerald-500/30'
          }`}>
            {uiMessage.text}
          </div>
        )}

        
      <div className="pb-6 space-y-4">
          <p className="text-[12px] font-sans text-zinc-400 leading-relaxed font-bold">
           UWAGA! Zdjęcia są jedynie poglądowe. Finalny produkt może różnić się detalami. Każda koszulka jest ręcznie produkowana na zamówienie.
          </p>
      </div>

        <Button 
          variant="cta" 
          size="lg" 
          disabled={isReserving || (isPreRelease && !isNRG) || (isClassicsGarage && !isNRG)}
          onClick={handleAddToCart}
          className="w-full text-sm py-8 font-black italic tracking-[0.2em]"
        >
          {isReserving ? 'SYNCHRONIZING...' : 'DODAJ DO GARAŻU'}
        </Button>
      </div>
      <ProductAccordion description={product.description} />
    </div>
  );
};