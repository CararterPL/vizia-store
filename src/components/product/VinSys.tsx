"use client"
import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

interface VinSystemProps {
  isGridMember: boolean;
  series: string;     // np. "SHDWRC"
  modelCode: string; // np. "BRBG801"
  type: string;      // np. "TS"
  unitSlot: string;
  setUnitSlot: (val: string) => void;
  onJoinGrid: () => void;
  productId: string; 
}

export const VinSystem = ({ 
  isGridMember, series, modelCode, type, unitSlot, setUnitSlot, onJoinGrid, productId 
}: VinSystemProps) => {
  const [status, setStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');

  // FUNKCJA ZAPISUJĄCA REZERWACJĘ W SUPABASE
  const reserveVinSlot = async (fullVin: string) => {
    // Obliczamy czas wygaśnięcia: teraz + 15 minut
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 15);

    const { error } = await supabase
      .from('vin_pool')
      .update({ 
        reserved_until: expiryDate.toISOString(),
        // Opcjonalnie: przypisz ID sesji, jeśli je śledzisz
        // reserved_by_session: 'user_session_id' 
      })
      .eq('vin_full', fullVin)
      .eq('is_sold', false);

    if (error) {
      console.error("VIZIA_PROTOCOL_ERROR: LOCK_FAILED", error);
    }
  };

  const checkAvailability = async (val: string) => {
    if (val.length !== 2) {
      setStatus('idle');
      return;
    }

    setStatus('checking');
    
    // Budujemy pełny VIN zgodnie z Twoim schematem
    const fullVin = `${series}-${modelCode}${type}-${val}`;

    // Pobieramy dane z tabeli vin_pool
    const { data, error } = await supabase
      .from('vin_pool')
      .select('is_sold, reserved_until')
      .eq('product_id', productId)
      .eq('vin_full', fullVin)
      .single();

    if (error || !data) {
      setStatus('taken'); 
      return;
    }

    // SPRAWDZENIE: Czy rezerwacja jeszcze trwa?
    const now = new Date();
    const isReserved = data.reserved_until && new Date(data.reserved_until) > now;

    if (data.is_sold || isReserved) {
      setStatus('taken');
    } else {
      setStatus('available');
      // JEŚLI WOLNY: Natychmiastowa rezerwacja na 15 min
      await reserveVinSlot(fullVin);
    }
  };

  useEffect(() => {
    if (isGridMember && unitSlot.length === 2) {
      checkAvailability(unitSlot);
    } else if (unitSlot.length < 2) {
      setStatus('idle');
    }
  }, [unitSlot, isGridMember]);

  const getStatusTextColor = () => {
    if (status === 'available') return 'text-emerald-500';
    if (status === 'taken') return 'text-[#ff133a]';
    return 'text-zinc-500';
  };

  const getInputTextColor = () => {
    if (status === 'available') return 'text-white'; 
    if (status === 'taken') return 'text-[#ff133a]'; 
    return 'text-zinc-400';
  };

  return (
    <div className="mb-16 bg-[#050505] border border-white/5 p-8 relative group overflow-hidden">
      {!isGridMember && (
        <div className="absolute inset-0 z-30 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center border border-[#ff133a]/30">
          <div className="text-[#ff133a] font-black text-[10px] tracking-[0.5em] mb-4">[ ACCESS_DENIED ]</div>
          <p className="text-[9px] text-zinc-400 uppercase tracking-widest mb-6 max-w-[250px] leading-relaxed">
            Personalizacja slotu jednostki zarezerwowana dla <br/>
            <span className="text-white italic font-bold underline decoration-[#ff133a]">THE NIGHT RUN GRID</span>.
          </p>
          <button onClick={onJoinGrid} className="bg-white text-black px-6 py-2 text-[9px] font-black uppercase hover:bg-[#ff133a] hover:text-white transition-all duration-300">Join_Grid</button>
        </div>
      )}

      <div className="flex justify-between items-center mb-10">
        <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#ff133a] italic font-mono">02 // UNIT_RESERVATION_SYS</p>
        {status !== 'idle' && (
          <span className={`text-[7px] font-mono uppercase tracking-[0.2em] px-2 py-1 border border-current ${getStatusTextColor()}`}>
            {status === 'checking' && 'SCANNING_POOL...'}
            {status === 'available' && 'LOCKED_FOR_15_MIN'}
            {status === 'taken' && 'SLOT_UNAVAILABLE'}
          </span>
        )}
      </div>
      
      <div className={`transition-all duration-1000 ${!isGridMember ? 'blur-md opacity-20' : 'opacity-100'}`}>
        <div className="flex justify-between text-[7px] tracking-[0.3em] uppercase text-zinc-700 font-bold px-1 mb-4 italic">
          <span>Series</span><span>Model_ID</span><span>Type</span><span className="text-[#ff133a]">Unit_Slot</span>
        </div>
        
        <div className="flex items-center bg-black border border-white/5 p-6 shadow-inner">
          <div className="flex items-center gap-0 font-mono text-lg font-bold tracking-tight">
            <span className="text-zinc-600 uppercase">{series}-</span>
            <span className="text-zinc-600 uppercase">{modelCode}</span>
            <span className="text-[#ff133a] italic uppercase">{type}</span>
            <span className="text-zinc-600">-</span>
            <input 
              type="text" 
              maxLength={2} 
              value={unitSlot} 
              onChange={(e) => setUnitSlot(e.target.value.replace(/\D/g, ''))} 
              placeholder="XX" 
              disabled={!isGridMember}
              className={`bg-transparent outline-none w-10 text-lg font-bold font-mono transition-colors placeholder:text-zinc-900 uppercase ml-1 ${getInputTextColor()}`} 
            />
          </div>
        </div>
        
        {status === 'available' && (
          <div className="mt-4 flex items-center gap-2">
            <div className="w-1 h-1 bg-emerald-500 animate-ping"></div>
            <p className="text-[7px] text-emerald-500/70 tracking-[0.2em] uppercase font-mono">
              System zabezpieczył Twój numer. Masz 15 minut na finalizację zamówienia.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}