'use client';

import React, { useState } from 'react';
import { ProductHeader } from './info/ProductHeader';
import { SizeSelector } from './info/SizeSelector';
import { VinModule } from './info/VinModule';
import { ProductAccordion } from './info/ProductAccordion';
import { Button } from '../ui/Button';
import { useCart } from '../../context/CartContext'; // IMPORT KONTEKSTU

interface ProductInfoProps {
  product: any;
  isNRG?: boolean;
}

export const ProductInfo = ({ product, isNRG = false }: ProductInfoProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addItem } = useCart(); // POBIERAMY FUNKCJĘ DODAWANIA

  // LOGIKA CTA
  const getCTAConfig = () => {
    if (product.series === 'POLE_POSITION') {
      return { text: 'COMING_SOON // NOT_FOR_SALE', disabled: true };
    }
    if ((product.series === 'THE_HIDEOUT' || product.series === 'CLASSICS_GARAGE') && !isNRG) {
      return { text: 'NRG_MEMBERS_ONLY // LOCKED', disabled: true };
    }
    return { text: 'KUP TERAZ!', disabled: false };
  };

  const cta = getCTAConfig();

  // FUNKCJA DODAWANIA DO KOSZYKA
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Proszę wybrać rozmiar przed dodaniem do garażu.");
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      vin: product.baseVin || 'GENERIC_VIN', // Upewnij się, że przekazujesz VIN
      quantity: 1
    });

    // Opcjonalnie: Możesz tu wywołać otwarcie CartDrawera, jeśli masz taką funkcję w kontekście
  };

  return (
    <div className="space-y-10">
      <ProductHeader product={product} />

      {!(product.series === 'CLASSICS_GARAGE' && !isNRG) && (
        <>
          <SizeSelector selectedSize={selectedSize} onSizeSelect={setSelectedSize} />
          <VinModule series={product.series} isNRG={isNRG} baseVin={product.baseVin} />
        </>
      )}

      <div className="pt-2">
        <Button 
          variant="cta" 
          size="lg" 
          disabled={cta.disabled}
          onClick={handleAddToCart} // PODPIĘCIE FUNKCJI
          className={`w-full text-sm py-8 font-black italic tracking-[0.2em] ${cta.disabled ? 'opacity-30 grayscale' : ''}`}
        >
          {cta.text}
        </Button>
      </div>

      <ProductAccordion />
    </div>
  );
};