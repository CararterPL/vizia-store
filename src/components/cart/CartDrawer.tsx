'use client';

import React from 'react';
import { useCart } from '../../context/CartContext';
import { X, ShoppingBag, Trash2, ArrowRight, Minus, Plus } from 'lucide-react';
import { Button } from '../ui/Button';

export const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  // Pobieramy updateQuantity zamiast addItem do obsługi +/-
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/95 backdrop-blur-sm z-[100] transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className={`fixed right-0 top-0 h-full w-full md:w-[480px] bg-[#050505] border-l border-white/5 z-[101] transform transition-transform duration-500 ease-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        <div className="flex flex-col h-full p-8 md:p-12">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <p className="text-[10px] text-vizia-red font-mono tracking-[0.3em] uppercase mb-2">Unit_Manifest</p>
              <h2 className="text-3xl font-brand font-black italic text-white uppercase tracking-tighter">Garaż</h2>
            </div>
            <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white transition-colors">
              <X size={24} strokeWidth={1} />
            </button>
          </div>

          {/* Lista produktów */}
          <div className="flex-grow overflow-y-auto space-y-8 pr-2 custom-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-20 text-center">
                <ShoppingBag size={48} strokeWidth={0.5} className="mb-4 text-white" />
                <p className="font-mono text-[10px] uppercase tracking-widest text-white">Garaż_jest_pusty</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.vin}`} className="group relative flex gap-6 pb-8 border-b border-white/5">
                  {/* Miniaturka */}
                  <div className="relative w-24 h-28 bg-zinc-900 border border-white/5 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-vizia-red/10 to-transparent" />
                    <span className="text-[8px] font-mono text-zinc-700 uppercase rotate-90">Visual_Data</span>
                  </div>
                  
                  <div className="flex flex-col justify-between py-1 flex-grow">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-white font-bold text-sm uppercase leading-tight max-w-[180px] font-brand italic">
                          {item.name}
                        </h4>
                        <span className="text-white font-mono text-xs">{item.price * item.quantity} PLN</span>
                      </div>
                      
                      {/* Wyświetlanie VIN i Rozmiaru */}
                      <div className="mt-2 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] text-zinc-500 font-mono uppercase">VIN:</span>
                          <span className="text-[9px] text-vizia-red font-mono font-bold tracking-tighter bg-vizia-red/5 px-1">{item.vin}</span>
                        </div>
                        <span className="inline-block text-[9px] text-zinc-400 uppercase tracking-widest border border-zinc-800 px-2 py-0.5 font-mono">
                          SIZE: {item.size}
                        </span>
                      </div>
                    </div>

                    {/* Kontrola ilości i usuwanie */}
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center border border-zinc-800 bg-black">
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, item.vin, -1)}
                          className="px-2 py-1 text-zinc-500 hover:text-white transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 py-1 text-[11px] text-white border-x border-zinc-800 font-mono min-w-[32px] text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, item.vin, 1)}
                          className="px-2 py-1 text-zinc-500 hover:text-white transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button 
                        onClick={() => removeItem(item.id, item.size, item.vin)}
                        className="text-[9px] text-zinc-600 uppercase tracking-widest hover:text-vizia-red transition-colors flex items-center gap-2 font-mono"
                      >
                        <Trash2 size={12} /> Usuń_Log
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Podsumowanie */}
          {items.length > 0 && (
            <div className="mt-auto pt-10">
              <div className="space-y-4 mb-10">
                <div className="flex justify-between items-center font-mono">
                  <span className="text-[9px] text-zinc-500 uppercase tracking-[0.2em]">Logistyka_USA_PL</span>
                  <span className="text-[9px] text-zinc-300 uppercase">Standard_Dispatch</span>
                </div>
                <div className="h-[1px] bg-gradient-to-r from-vizia-red/50 to-transparent my-6" />
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase font-mono block mb-1 text-left tracking-widest">Suma_szacowana</span>
                    <span className="text-4xl font-brand font-black italic text-white tracking-tighter">{totalPrice} PLN</span>
                  </div>
                  <Button 
                    variant="cta" 
                    className="px-10 py-6 group relative overflow-hidden h-fit"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3 uppercase tracking-[0.2em] font-black text-xs italic">
                      Checkout <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </div>
              </div>
              
              <div className="text-center opacity-20">
                <p className="text-[8px] text-zinc-500 uppercase tracking-[0.4em] font-mono">Vizia_Laboratory_Systems_v.1.0</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};