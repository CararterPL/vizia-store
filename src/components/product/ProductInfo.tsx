'use client';

import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { useCart } from '../../context/CartContext';
import { SizeGuide } from './SizeGuide';

export const ProductInfo = () => {
  const { addItem } = useCart();
  
  // STANY
  const [isNRGMember, setIsNRGMember] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [vinSuffix, setVinSuffix] = useState('');
  const [showSizeError, setShowSizeError] = useState(false);
  const [isConfirmingAutoVin, setIsConfirmingAutoVin] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const VIN_CONFIG = { drop: "SHDWRC", pattern: "911GTR01", type: "TS" };

  const handleAddToCart = () => {
    // 1. Walidacja Rozmiaru
    if (!selectedSize) {
      setShowSizeError(true);
      const element = document.getElementById('size-selector');
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => setShowSizeError(false), 2000);
      return;
    }

    // 2. Logika NRG Member / VIN Confirmation
    if (isNRGMember && !vinSuffix && !isConfirmingAutoVin) {
      setIsConfirmingAutoVin(true);
      return;
    }

    let finalVin = "";
    const suffix = vinSuffix.padStart(2, '0');
    
    if (isNRGMember && vinSuffix) {
      finalVin = `${VIN_CONFIG.drop}-${VIN_CONFIG.pattern}${VIN_CONFIG.type}-${suffix}`;
    } else {
      finalVin = `${VIN_CONFIG.drop}-${VIN_CONFIG.pattern}${VIN_CONFIG.type}-01`;
    }

    addItem({
      id: `porsche-911-gt3rs-${selectedSize}-${finalVin}`,
      name: '911 GT3 RS TECHNICAL APPAREL',
      price: 259,
      size: selectedSize,
      vin: finalVin,
      quantity: 1,
      image: '/products/vizia_shdwrc_911rsgt01ts-back.png'
    });

    // Reset po dodaniu
    setVinSuffix('');
    setIsConfirmingAutoVin(false);
  };

  return (
    <div className="flex flex-col w-full overflow-visible antialiased pb-12">
      <SizeGuide isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

      {/* DEBUG SWITCHER - Dla testów widoku NRG/GUEST */}
      <div className="mb-8 opacity-20 hover:opacity-100 transition-opacity">
        <button 
          onClick={() => setIsNRGMember(!isNRGMember)}
          className="bg-white/10 text-white text-[7px] font-mono px-2 py-1 border border-white/10 uppercase tracking-widest"
        >
          AUTH_MODE: {isNRGMember ? 'NRG_CONNECTED' : 'GUEST_ACCESS'}
        </button>
      </div>

      {/* 1. NAGŁÓWEK */}
      <div className="mb-6 overflow-visible pr-4">
        <h3 className="text-2xl md:text-4xl font-brand font-black italic text-white leading-[0.9] tracking-tighter uppercase">
          911 GT3 RS <br/>
          <span className="text-[10px] font-mono not-italic tracking-[0.5em] text-zinc-500 block mt-2">
            TECHNICAL_APPAREL // 01
          </span>
        </h3>
      </div>

      {/* 2. CENA */}
      <div className="mb-12">
        <span className="text-4xl font-brand font-black italic text-white leading-none tracking-tighter">
          259 PLN
        </span>
      </div>

      {/* 3. ROZMIAR */}
      <div id="size-selector" className="mb-12">
        <div className="flex justify-between items-end mb-4 font-mono text-[9px] tracking-[0.2em] uppercase">
          <span className={`${showSizeError ? 'text-red-500 animate-pulse font-bold' : 'text-zinc-400'}`}>
            {showSizeError ? 'ERROR_SIZE_REQUIRED' : 'SELECT_UNIT_SIZE //'}
          </span>
          <button 
            onClick={() => setIsSizeGuideOpen(true)} 
            className="text-zinc-500 underline hover:text-white transition-colors"
          >
            Blueprint_Guide
          </button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <button
              key={size}
              onClick={() => { setSelectedSize(size); setShowSizeError(false); }}
              className={`py-4 border text-[10px] font-brand font-black italic transition-all ${
                selectedSize === size 
                ? 'bg-white text-black border-white scale-[1.05] z-10' 
                : 'border-white/10 text-zinc-500 hover:border-white/30'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* 4. VIN MODULE */}
      <div className={`mb-12 border transition-all duration-500 ${
        isConfirmingAutoVin ? 'border-amber-500 bg-amber-500/5' : 'border-white/5 bg-white/[0.03]'
      }`}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className={`w-1 h-1 rounded-full ${isNRGMember ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span className={`text-[9px] font-mono tracking-widest font-bold uppercase ${isNRGMember ? 'text-emerald-500' : 'text-amber-500'}`}>
              {isNRGMember ? 'NRG_AUTH_SUCCESS' : 'NRG_AUTH_REQUIRED'}
            </span>
          </div>

          {isNRGMember ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 overflow-visible">
                <span className="text-[10px] font-mono opacity-20 text-white uppercase tracking-tighter whitespace-nowrap">
                  {VIN_CONFIG.drop}-{VIN_CONFIG.pattern}{VIN_CONFIG.type}-
                </span>
                <input 
                  type="text" 
                  maxLength={2} 
                  value={vinSuffix}
                  onChange={(e) => setVinSuffix(e.target.value.replace(/\D/g, ''))}
                  placeholder="--" 
                  className="w-16 bg-transparent border-b border-emerald-500 text-center font-brand font-black italic text-emerald-500 text-2xl outline-none focus:bg-emerald-500/5 transition-all"
                />
              </div>
              <p className="text-[8px] font-mono text-emerald-500/40 uppercase tracking-tighter">Enter 2 digits for custom unit serial.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-[9px] text-zinc-500 uppercase font-mono leading-tight">
                Provide NRG credentials to unlock VIN personalization protocol.
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="ENTER_EMAIL" 
                  className="flex-grow bg-black/40 border border-white/10 py-3 px-4 text-[9px] font-mono text-white outline-none focus:border-amber-500 transition-all" 
                />
                <button 
                  onClick={() => setIsNRGMember(true)}
                  className="bg-amber-500 text-black px-4 py-3 text-[9px] font-black italic hover:bg-white transition-all uppercase"
                >
                  Auth
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. CTA - Z unikalnym ID dla mobile-sync */}
      <div className="mb-12">
        <Button 
          id="main-cta-button"
          onClick={handleAddToCart} 
          variant={isConfirmingAutoVin ? "primary" : "cta"} 
          className="w-full py-6 text-xl uppercase italic tracking-tighter"
        >
          {isConfirmingAutoVin ? 'Confirm Auto_VIN //' : 'Add to Vault //'}
        </Button>
      </div>

      {/* 6. ACCORDION */}
      <div className="border-t border-white/5">
        {[
          { title: 'Tech_Specs', content: '280g Heavy Cotton. Oversize Boxy Fit. 3D High-Density Print. Reinforced shoulder construction.' },
          { title: 'Shipping', content: 'Standard Global Shipping 3-5 Business Days. Tracked technical delivery.' },
          { title: 'Returns', content: '14-day return policy. Security seal on the neck must remain intact for validation.' }
        ].map((item, idx) => (
          <details key={idx} className="group border-b border-white/5">
            <summary className="flex justify-between py-4 list-none cursor-pointer group-open:text-red-500 transition-all outline-none">
              <span className="text-[9px] font-mono font-bold tracking-widest text-white uppercase">{item.title}</span>
              <span className="text-zinc-600 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="pb-6 text-[10px] font-mono text-zinc-500 uppercase leading-relaxed tracking-tight">
              {item.content}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};