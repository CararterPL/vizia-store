'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { supabase } from '../../lib/supabase';

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [shippingMethod, setShippingMethod] = useState<'paczkomat' | 'kurier'>('paczkomat');
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
  });

  const searchLocker = async (term: string) => {
    if (term.length < 3) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/inpost?term=${encodeURIComponent(term)}`);
      const data = await res.json();
      setResults(data.items || []);
    } catch (err) {
      console.error("FETCH_ERROR_FRONTEND");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (shippingMethod === 'paczkomat' && searchTerm.length >= 3) searchLocker(searchTerm);
    }, 600);
    return () => clearTimeout(timer);
  }, [searchTerm, shippingMethod]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (shippingMethod === 'paczkomat' && !selectedPoint) {
      alert("SELECT_PACZKOMAT_LOCKER");
      return;
    }
    setIsSubmitting(true);
    // Tu Twoja logika Supabase...
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black py-48 px-6 text-white font-brand uppercase tracking-tighter text-left">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        <div className="lg:col-span-7 space-y-12">
          <header className="border-b border-white/10 pb-8">
            <h1 className="text-6xl font-black italic">CHECKOUT</h1>
            <p className="text-[10px] font-mono text-emerald-500 mt-2 tracking-[0.3em]">GATEWAY_READY // VIZIA_SECURE</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input required type="email" placeholder="EMAIL" className="bg-zinc-900 border border-white/10 p-4 font-mono text-xs focus:border-white outline-none" onChange={e => setFormData({...formData, email: e.target.value})} />
              <input required type="tel" placeholder="PHONE" className="bg-zinc-900 border border-white/10 p-4 font-mono text-xs focus:border-white outline-none" onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button type="button" onClick={() => setShippingMethod('paczkomat')} className={`py-6 border font-black text-[10px] transition-all ${shippingMethod === 'paczkomat' ? 'bg-white text-black' : 'border-white/5 text-zinc-800'}`}>PACZKOMAT</button>
              <button type="button" onClick={() => setShippingMethod('kurier')} className={`py-6 border font-black text-[10px] ${shippingMethod === 'kurier' ? 'bg-white text-black' : 'border-white/5 text-zinc-800'}`}>KURIER</button>
            </div>

            {shippingMethod === 'paczkomat' && (
              <div className="space-y-4 animate-in fade-in duration-700">
                <input 
                  placeholder="WPISZ MIASTO LUB KOD (NP. RADOM / 26-600)" 
                  className="w-full bg-zinc-950 border border-white/20 p-6 font-mono text-xs focus:border-emerald-500 outline-none italic"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                <div className="grid grid-cols-1 gap-1 max-h-[350px] overflow-y-auto border-l border-white/5 pr-2">
                  {loading ? (
                    <div className="p-10 text-[10px] font-mono animate-pulse text-zinc-600">LINKING_TO_SATELLITE...</div>
                  ) : results.length > 0 ? results.map((point) => (
                    <button
                      key={point.name}
                      type="button"
                      onClick={() => setSelectedPoint(point)}
                      className={`p-5 border-l-2 text-left flex justify-between items-center transition-all ${selectedPoint?.name === point.name ? 'bg-white text-black border-white' : 'border-transparent bg-zinc-900/40 hover:bg-zinc-900'}`}
                    >
                      <div className="font-mono">
                        <p className="text-xs font-black italic">{point.name}</p>
                        <p className="text-[9px] opacity-40">{point.address_details.city}, {point.address_details.street} {point.address_details.building_number}</p>
                      </div>
                      <div className="text-[7px] font-black border border-current px-2 py-1">CONNECT</div>
                    </button>
                  )) : searchTerm.length >= 3 && (
                    <div className="p-12 text-center border border-dashed border-white/5 text-zinc-800 font-mono text-[9px]">NO_TERMINALS_FOUND</div>
                  )}
                </div>

                {selectedPoint && (
                  <div className="p-8 bg-zinc-900 border-l-4 border-emerald-500 animate-in slide-in-from-left duration-300">
                    <p className="text-[8px] font-mono text-emerald-500 mb-1 tracking-widest italic uppercase">Locker_Locked</p>
                    <h2 className="text-4xl font-black italic">{selectedPoint.name}</h2>
                    <p className="text-[10px] font-mono text-zinc-500 mt-1">{selectedPoint.address_details.city} // {selectedPoint.address_details.street}</p>
                  </div>
                )}
              </div>
            )}

            <button type="submit" className="w-full bg-white text-black py-10 font-black italic text-3xl hover:bg-emerald-500 transition-all tracking-tighter">
              {isSubmitting ? 'UPLOADING...' : 'CONFIRM_ORDER'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-5 bg-zinc-900/10 border border-white/5 p-12 h-fit sticky top-48">
           <p className="font-mono text-[10px] text-zinc-700 tracking-[0.4em] mb-10 italic uppercase">Order_Manifest</p>
           <div className="pt-10 flex justify-between text-6xl font-black italic tracking-tighter uppercase">
             <span>TOTAL</span>
             <span>{totalPrice}</span>
           </div>
        </div>
      </div>
    </div>
  );
}