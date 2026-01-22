'use client';

import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { useCart } from '../../context/CartContext';
import { SizeGuide } from './SizeGuide'; // Importujemy nowy komponent

// SYMULACJA GLOBALNEJ BAZY DANYCH (W przyszłości pobierane z API)
const TAKEN_VINS_DATABASE = ['SHDWRC-911GTR01TS-41', 'SHDWRC-911GTR01TS-07'];

export const ProductInfo = () => {
  const { addItem, items } = useCart();
  const [isNRGMember, setIsNRGMember] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [vinSuffix, setVinSuffix] = useState('');
  const [showSizeError, setShowSizeError] = useState(false);
  const [vinError, setVinError] = useState('');
  const [isConfirmingAutoVin, setIsConfirmingAutoVin] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false); // Stan modala

  const VIN_CONFIG = {
    drop: "SHDWRC",
    pattern: "911GTR01",
    type: "TS"
  };

  // Resetuj prośbę o potwierdzenie, jeśli użytkownik zacznie wpisywać VIN
  useEffect(() => {
    if (vinSuffix) setIsConfirmingAutoVin(false);
  }, [vinSuffix]);

  const handleAddToCart = () => {
    // 1. Walidacja rozmiaru
    if (!selectedSize) {
      setShowSizeError(true);
      setTimeout(() => setShowSizeError(false), 2000);
      return;
    }

    // 2. Ostrzeżenie dla NRG Member o braku wpisanego VIN
    if (isNRGMember && !vinSuffix && !isConfirmingAutoVin) {
      setIsConfirmingAutoVin(true);
      return;
    }

    let finalVin = "";

    // 3. Logika przydzielania VIN
    if (isNRGMember && vinSuffix) {
      const suffix = vinSuffix.padStart(2, '0');
      
      if (suffix === '00') {
        setVinError('SYSTEM_ERROR: VIN_00_RESERVED');
        setTimeout(() => setVinError(''), 3000);
        return;
      }

      const requestedVin = `${VIN_CONFIG.drop}-${VIN_CONFIG.pattern}${VIN_CONFIG.type}-${suffix}`;
      
      const isTakenGlobally = TAKEN_VINS_DATABASE.includes(requestedVin);
      const isTakenInCart = items.some(item => item.vin === requestedVin);

      if (isTakenGlobally || isTakenInCart) {
        setVinError(isTakenGlobally ? 'GLOBAL_COLLISION: UNIT_ALREADY_SOLD' : 'CART_COLLISION: UNIT_IN_GARAGE');
        setTimeout(() => setVinError(''), 3000);
        return;
      }
      finalVin = requestedVin;
    } else {
      let currentNum = 1;
      let found = false;

      while (!found && currentNum <= 99) {
        const testSuffix = currentNum.toString().padStart(2, '0');
        const testVin = `${VIN_CONFIG.drop}-${VIN_CONFIG.pattern}${VIN_CONFIG.type}-${testSuffix}`;
        
        const isTakenGlobally = TAKEN_VINS_DATABASE.includes(testVin);
        const isTakenInCart = items.some(item => item.vin === testVin);

        if (!isTakenGlobally && !isTakenInCart) {
          finalVin = testVin;
          found = true;
        } else {
          currentNum++;
        }
      }

      if (!found) {
        setVinError('SYSTEM_ERROR: SERIES_EXHAUSTED');
        return;
      }
    }

    // 4. Finalizacja
    addItem({
      id: 'porsche-911-gt3rs-tee',
      name: '911 GT3 RS TECHNICAL APPAREL',
      price: 259,
      size: selectedSize,
      vin: finalVin,
      quantity: 1,
    });

    setVinSuffix('');
    setIsConfirmingAutoVin(false);
    console.log(`SYSTEM: UNIT_${finalVin}_ALLOCATED`);
  };

  return (
    <div className="flex flex-col relative">
      
      {/* MODAL BLUEPRINTU */}
      <SizeGuide isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

      <div className="fixed top-24 right-6 z-[9999] opacity-20 hover:opacity-100 transition-opacity scale-75 origin-right">
        <button onClick={() => setIsNRGMember(!isNRGMember)} className="bg-white text-black px-2 py-1 text-[9px] font-black">
          TOGGLE_NRG_STATUS
        </button>
      </div>

      <div className="mb-2">
        <SectionHeader title="911 GT3 RS" tagline="TECHNICAL_APPAREL" />
      </div>

      <div className="mb-6 text-3xl font-brand font-black italic text-white">259 PLN</div>

      {/* WYBÓR ROZMIARU */}
      <div className="mb-6">
        <div className="flex justify-between text-[10px] font-mono mb-2 opacity-50 uppercase tracking-widest text-white">
          <span className={`${showSizeError ? 'text-vizia-red animate-pulse' : ''}`}>
            {showSizeError ? 'ERROR_SELECT_SIZE_REQUIRED' : 'SIZE_SELECT'}
          </span>
          <button 
            onClick={() => setIsSizeGuideOpen(true)}
            className="underline hover:text-white transition-colors font-mono uppercase"
          >
            Guide_Blueprint
          </button>
        </div>
        <div className="grid grid-cols-5 gap-2 w-full">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <button
              key={size}
              onClick={() => { setSelectedSize(size); setShowSizeError(false); }}
              className={`py-3 border text-xs font-brand font-black italic transition-all ${
                selectedSize === size ? 'bg-white text-black border-white' : 'border-white/10 text-zinc-500 hover:border-white/40'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* MODUŁ VIN / NRG ACCESS */}
      <div className={`mb-6 border transition-all duration-500 ${
        vinError ? 'border-vizia-red bg-vizia-red/10' :
        isConfirmingAutoVin ? 'border-amber-500 bg-amber-500/10' :
        isNRGMember ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-amber-500/30 bg-amber-500/5'
      }`}>
        <div className="p-3">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-[9px] font-mono tracking-widest flex items-center gap-2 font-bold ${
              vinError ? 'text-vizia-red' : isConfirmingAutoVin ? 'text-amber-500' : isNRGMember ? 'text-emerald-500' : 'text-amber-500'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                vinError ? 'bg-vizia-red' : isConfirmingAutoVin ? 'bg-amber-500' : isNRGMember ? 'bg-emerald-500' : 'bg-amber-500'
              }`} />
              {vinError ? vinError : isConfirmingAutoVin ? 'WARNING: NO_VIN_ENTERED' : isNRGMember ? 'NRG_PROTOCOL: GRANTED' : 'ACCESS_RESTRICTED'}
            </span>
          </div>

          {isNRGMember ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono opacity-30 tracking-widest uppercase text-white">
                  {VIN_CONFIG.drop}-{VIN_CONFIG.pattern}{VIN_CONFIG.type}-
                </span>
                <input 
                  type="text" 
                  maxLength={2}
                  value={vinSuffix}
                  onChange={(e) => setVinSuffix(e.target.value.replace(/\D/g, ''))}
                  placeholder="--" 
                  className="w-14 bg-black border-b border-emerald-500 text-center font-brand font-black italic text-emerald-500 text-xl outline-none focus:bg-emerald-500/10 transition-all placeholder:opacity-20"
                />
              </div>
              {isConfirmingAutoVin && (
                <p className="text-[9px] font-mono text-amber-500 uppercase leading-tight animate-pulse">
                  Nie podano numeru. System przydzieli pierwszy wolny slot. Potwierdź klikając przycisk poniżej.
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-[10px] leading-tight text-amber-500/80 uppercase tracking-tight font-brand">
                Personalizacja VIN wymaga autoryzacji NRG_UNIT. System przydzieli wolny numer (01-99) automatycznie.
              </p>
              <div className="flex gap-2">
                <input type="email" placeholder="NRG_ID_AUTH" className="flex-grow bg-black/40 border border-amber-500/20 py-1.5 px-3 text-[9px] font-brand outline-none focus:border-amber-500 text-amber-500" />
                <button className="bg-amber-500 text-black px-3 py-1.5 text-[9px] font-black italic hover:bg-white transition-all">AUTHORIZE</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA BUTTON */}
      <div className="mb-6">
        <Button 
          onClick={handleAddToCart}
          variant={isConfirmingAutoVin ? "secondary" : "cta"} 
          className={`w-full py-5 text-lg uppercase italic lg:shadow-none transition-all ${
            isConfirmingAutoVin ? 'bg-amber-500 text-black border-amber-500' : ''
          }`}
        >
          {isConfirmingAutoVin ? 'Potwierdź Auto_VIN //' : 'Dodaj do garażu //'}
        </Button>
      </div>

      {/* TECHNICAL DATA */}
      <div className="border-t border-white/5">
        {[
          { id: 'TECH', label: 'TECHNICAL_SPECS', content: 'Nasza jednostka została wykonana z 280g bawełny Heavy Cotton w kroju Oversize Boxy Fit. Każdy egzemplarz posiada unikalny nadruk 3D High-Density oraz indywidualny VIN.' },
          { id: 'SHIP', label: 'SHIPPING_LOGISTICS', content: 'Dostawa realizowana w ciągu 3-5 dni roboczych. Każdy produkt pakowany jest w dedykowaną, antystatyczną folię techniczną NRG chroniącą przed czynnikami zewnętrznymi.' },
          { id: 'RETR', label: 'RETURNS_POLICY', content: 'Masz 14 dni na zwrot jednostki. Pamiętaj, że produkt musi posiadać nienaruszoną plombę gwarancyjną NRG. Produkty z personalizowanym VIN podlegają osobnej procedurze.' }
        ].map((item) => (
          <details key={item.id} className="group border-b border-white/5 cursor-pointer">
            <summary className="flex justify-between items-center py-4 list-none group-open:text-vizia-red transition-all">
              <h5 className="text-[11px] font-mono tracking-widest text-white">{item.label}</h5>
              <span className="group-open:rotate-45 transition-transform text-zinc-600">+</span>
            </summary>
            <div className="pb-6 text-zinc-400 text-sm leading-relaxed uppercase font-mono">{item.content}</div>
          </details>
        ))}
      </div>
      <div className="h-24 lg:hidden" />
    </div>
  );
};