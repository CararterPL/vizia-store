'use client';

import React from 'react';
import { useCart } from '../../context/CartContext';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';

export const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { items, removeItem, totalPrice } = useCart();

  const getProductImage = (item: any) => {
    // 1. Próbujemy użyć base_vin jeśli został przekazany do obiektu koszyka
    // 2. Jeśli go nie ma, tniemy VIN (usuwamy ostatni człon po myślniku)
    let folderPath = 'default';
    
    if (item.base_vin) {
      folderPath = item.base_vin.trim();
    } else if (item.vin) {
      const parts = item.vin.split('-');
      if (parts.length > 1) {
        parts.pop(); // usuwa np. "66"
        folderPath = parts.join('-'); // zostaje "SHDWRC-MSTNG01TS"
      }
    }

    // Generujemy URL dokładnie tak jak w ProductGrid, celując w "front.png"
    const { data } = supabase.storage
      .from('vizia-products')
      .getPublicUrl(`${folderPath}/front.png`);
    
    return data.publicUrl;
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/95 backdrop-blur-sm z-[100] transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      <div className={`fixed right-0 top-0 h-full w-full md:w-[480px] bg-[#050505] border-l border-white/5 z-[101] transform transition-transform duration-500 ease-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        <div className="flex flex-col h-full p-8 md:p-12">
          <div className="flex justify-between items-start mb-12">
            <div className="text-left">
              <p className="text-[10px] text-vizia-red font-mono tracking-[0.3em] uppercase mb-2">YOUR_APPAREL</p>
              <h2 className="text-3xl font-brand font-black italic text-white uppercase tracking-tighter text-left">Bagażnik</h2>
            </div>
            <button onClick={onClose} className="p-2 text-zinc-300 hover:text-white transition-colors">
              <X size={24} strokeWidth={1} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto space-y-8 pr-2 custom-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-20 text-center">
                <ShoppingBag size={48} strokeWidth={0.5} className="mb-4 text-white" />
                <p className="font-mono text-[10px] uppercase tracking-widest text-white text-left text-center w-full">Bagażnik jest pusty</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.vin} className="group relative flex gap-6 pb-8 border-b border-white/5">
                  {/* Kontener obrazu */}
                  <div className="relative w-28 h-32 bg-zinc-900 border border-white/5 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    <img 
                      src={getProductImage(item)} 
                      alt={item.name}
                      className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/0a0a0a/333333?text=NO_SIGNAL';
                      }}
                    />
                  </div>
                  
                  <div className="flex flex-col justify-between py-1 flex-grow">
                    <div className="text-left">
                      <div className="flex justify-between items-start">
                        <h4 className="text-white font-bold text-sm uppercase leading-tight font-brand italic text-left tracking-tighter">
                          {item.name}
                        </h4>
                        <span className="text-white font-mono text-xs ml-4">{item.price} PLN</span>
                      </div>
                      
                      <div className="mt-2 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[12px] text-zinc-300 font-mono uppercase">VIN:</span>
                          <span className="text-[12px] text-vizia-red font-mono font-bold tracking-tighter bg-vizia-red/5 px-1 uppercase">{item.vin}</span>
                        </div>
                        <span className="inline-block text-[12px] text-zinc-400 uppercase tracking-widest border border-zinc-800 px-2 py-0.5 font-mono text-left">
                          Rozmiar: {item.size}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-end items-center mt-4">
                      <button 
                        onClick={() => removeItem(item.id, item.size, item.vin)}
                        className="text-[9px] text-zinc-400 uppercase tracking-widest hover:text-vizia-red transition-colors flex items-center gap-2 font-mono"
                      >
                        <Trash2 size={12} /> Usuń z bagażnika
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="mt-auto pt-10">
              <div className="space-y-4 mb-10">
                <div className="flex justify-between items-end">
                  <div className="text-left">
                    <span className="text-[10px] text-zinc-300 uppercase font-mono block mb-1 tracking-widest text-left">Do zapłaty</span>
                    <span className="text-4xl font-brand font-black italic text-white tracking-tighter">{totalPrice} PLN</span>
                  </div>
                  
                  <Link href="/checkout" onClick={onClose}>
                    <Button variant="cta" className="px-10 py-6 group relative overflow-hidden h-fit">
                      <span className="relative z-10 flex items-center justify-center gap-3 uppercase tracking-[0.2em] font-black text-xs italic">
                        Checkout <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};