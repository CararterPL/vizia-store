'use client';

import React, { useState, useEffect } from 'react';

export default function CheckoutPage() {
  const [points, setPoints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('Warszawa'); // Domyślny start
  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  // Funkcja pobierająca punkty (używana na starcie i przy szukaniu)
  const fetchPoints = async (query: string) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api-pl-points.easypack24.net/v1/points?query=${encodeURIComponent(query)}&limit=20`);
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        setPoints(data.items);
        // Jeśli nic nie jest wybrane, ustawiamy mapę na pierwszy punkt z listy
        if (!selectedPoint) {
          setSelectedPoint(data.items[0]);
        }
      }
    } catch (err) {
      console.error("FETCH_ERROR", err);
    } finally {
      setLoading(false);
    }
  };

  // Ładowanie początkowe
  useEffect(() => {
    fetchPoints(search);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 pb-20 pt-[120px] font-mono uppercase italic tracking-tighter">
      <div className="max-w-7xl mx-auto">
        
        {/* NAGŁÓWEK SEKCI */}
        <header className="mb-10 border-b border-white/10 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter leading-none">TERMINAL_V4</h1>
            <p className="text-emerald-500 text-[10px] mt-2 tracking-[0.4em]">STATUS: SECURE_CONNECTION_STABLE</p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-[10px] opacity-30">CURRENT_NODE</p>
            <p className="text-xs">{selectedPoint?.name || 'SEARCHING...'}</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEWA: MAPA I WYSZUKIWARKA */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Ręczna wyszukiwarka */}
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="WPISZ MIASTO LUB KOD POCZTOWY..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchPoints(search)}
                className="flex-grow bg-zinc-900 border border-white/20 p-4 focus:border-emerald-500 transition-all uppercase outline-none text-sm italic"
              />
              <button 
                onClick={() => fetchPoints(search)}
                className="bg-white text-black px-8 font-black hover:bg-emerald-500 transition-all text-xs"
              >
                AKTUALIZUJ_MAPĘ
              </button>
            </div>

            {/* Kontener Mapy (Zawsze widoczny) */}
            <div className="relative border border-white/10 bg-zinc-900 h-[500px] w-full overflow-hidden">
              {selectedPoint ? (
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}
                  src={`https://maps.google.com/maps?q=${selectedPoint.location.latitude},${selectedPoint.location.longitude}&z=16&output=embed`}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
                   <p className="animate-pulse text-[10px] tracking-[0.5em] opacity-30 font-black text-center">
                    LOADING_GEODATA...<br/>PLEASE_WAIT
                   </p>
                </div>
              )}
            </div>
          </div>

          {/* PRAWA: LISTA PUNKTÓW I PODSUMOWANIE */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-zinc-900/50 p-6 border border-white/10 flex flex-col h-[600px]">
              <p className="text-[10px] opacity-30 mb-4 tracking-[0.4em]">AVAILABLE_NODES</p>
              
              <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar space-y-2 mb-6">
                {loading ? (
                  <div className="space-y-4 opacity-20">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-20 bg-white/5 animate-pulse" />
                    ))}
                  </div>
                ) : (
                  points.map((point) => (
                    <div 
                      key={point.name}
                      onClick={() => setSelectedPoint(point)}
                      className={`p-4 border transition-all cursor-pointer ${
                        selectedPoint?.name === point.name ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/5 bg-black/40 hover:border-white/20'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[10px] text-emerald-500 font-black">{point.name}</p>
                          <h3 className="text-sm font-black leading-tight mt-1">{point.address_details.street} {point.address_details.building_number}</h3>
                          <p className="text-[9px] opacity-40 uppercase">{point.address_details.city}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Dolny Panel Płatności */}
              <div className="pt-6 border-t border-white/10 bg-zinc-900">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-[10px] opacity-30 tracking-widest">TOTAL_PAYMENT</span>
                  <span className="text-4xl font-black italic">99.00 PLN</span>
                </div>
                <button 
                  disabled={!selectedPoint}
                  className={`w-full py-6 font-black text-xl transition-all ${
                    selectedPoint ? 'bg-white text-black hover:bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                  }`}
                >
                  INITIALIZE_CHECKOUT
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); }
        /* Usunięcie domyślnych ikonek UI z iframe google */
        iframe { pointer-events: auto; }
      `}</style>
    </div>
  );
}