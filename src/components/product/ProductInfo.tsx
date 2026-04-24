'use client';

import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ProductHeader } from './info/ProductHeader';
import { SizeSelector } from './info/SizeSelector';
import { VinModule } from './info/VinModule';
import { ProductAccordion } from './info/ProductAccordion';
import { Button } from '../ui/Button';
import { useCart } from '../../context/CartContext';

// Funkcja pomocnicza do stałego tokena sesji
const getSessionToken = () => {
  if (typeof window === 'undefined') return '';
  let token = sessionStorage.getItem('vizia_session_token');
  if (!token) {
    token = crypto.randomUUID();
    sessionStorage.setItem('vizia_session_token', token);
  }
  return token;
};

export const ProductInfo = ({ product, isNRG = false }: any) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedVin, setSelectedVin] = useState<string | null>(null);
  const [isReserving, setIsReserving] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [uiMessage, setUiMessage] = useState<{type: 'error' | 'success' | 'info', text: string} | null>(null);

  const { addItem, items } = useCart();

  const nowDate = new Date();
  const releaseDate = product?.release_date ? new Date(product.release_date) : null;
  
  let isPreRelease = false;
  let isClassicsGarage = false;

  if (releaseDate && !isNaN(releaseDate.getTime())) {
    const classicsDate = new Date(releaseDate);
    classicsDate.setFullYear(releaseDate.getFullYear() + 1);
    isPreRelease = nowDate < releaseDate;
    isClassicsGarage = nowDate > classicsDate;
  }

  const handleAddToCart = async () => {
    setUiMessage(null);

    if (!selectedSize) {
      setUiMessage({ type: 'error', text: 'SYSTEM_ERROR: WYBIERZ_ROZMIAR' });
      return;
    }
    if (!selectedVin) {
      setUiMessage({ type: 'error', text: 'SYSTEM_ERROR: VIN_NIE_WYBRANY' });
      return;
    }

    // SPRAWDZENIE CZY VIN JEST JUŻ W TWOIM KOSZYKU
    const alreadyInCart = items.some((item: any) => item.vin === selectedVin);
    if (alreadyInCart) {
      setUiMessage({ type: 'info', text: 'INFO: TEN_NUMER_JEST_JUŻ_W_TWOIM_GARAŻU' });
      return;
    }

    setIsReserving(true);
    
    try {
      const cleanVin = selectedVin.trim().toUpperCase();
      const sessionToken = getSessionToken();

      // WYWOŁANIE RPC
      const { data: isReserved, error: rpcError } = await supabase.rpc('reserve_vin', {
        target_vin: cleanVin,
        target_product_id: product.id,
        session_id: sessionToken
      });

      if (rpcError) {
        console.error('BŁĄD RPC:', rpcError);
        setUiMessage({ 
          type: 'error', 
          text: `SYSTEM_BUSY: ${rpcError.message || 'BŁĄD KOMUNIKACJI'}` 
        });
        return;
      }

      if (!isReserved) {
        setUiMessage({ type: 'error', text: 'LOCK_FAILED: NUMER_WŁAŚNIE_ZOSTAŁ_ZAJĘTY' });
        setRefreshTrigger(prev => prev + 1);
        return;
      }

      // Dodanie do koszyka
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        vin: cleanVin,
        sessionToken: sessionToken,
        quantity: 1
      });

      setUiMessage({ type: 'success', text: `UNIT_LOCKED: ${cleanVin.split('-').pop()} (15 MIN)` });
      
      // Resetujemy wybór VIN, aby wymusić nowy wybór przy kolejnym produkcie
      setSelectedVin(null);
      setRefreshTrigger(prev => prev + 1);
      
    } catch (err) {
      console.error('CRITICAL FRONTEND ERROR:', err);
      setUiMessage({ type: 'error', text: 'CRITICAL_ERROR: SPRÓBUJ PONOWNIE' });
    } finally {
      setIsReserving(false);
    }
  };

  return (
    <div className="space-y-10">
      <ProductHeader product={product} />

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
            currentSessionId={getSessionToken()} 
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
            uiMessage.type === 'error' ? 'text-red-500 border-red-500/30' : 
            uiMessage.type === 'info' ? 'text-blue-400 border-blue-400/30' :
            'text-emerald-500 border-emerald-500/30'
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