"use client"
import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

interface VinSystemProps {
  isGridMember: boolean;
  series: string;    // np. "SHDWRC"
  modelCode: string; // np. "BRBG801"
  type: string;      // np. "TS"
  unitSlot: string;
  setUnitSlot: (val: string) => void;
  onJoinGrid: () => void;
  productId: string; // Musi być przekazane z page.tsx!
}

export const VinSystem = ({ 
  isGridMember, series, modelCode, type, unitSlot, setUnitSlot, onJoinGrid, productId 
}: VinSystemProps) => {
  const [status, setStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');

  const checkAvailability = async (val: string) => {
    if (val.length !== 2) {
      setStatus('idle');
      return;
    }

    setStatus('checking');
    
    // Budujemy VIN dokładnie tak jak w bazie: SHDWRC-BRBG801TS-XX
    // Sprawdź czy base_vin w bazie ma myślnik na końcu!
    const fullVin = `${series}-${modelCode}${type}-${val}`;

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

    const isReserved = data.reserved_until && new Date(data.reserved_until) > new Date();

    if (data.is_sold || isReserved) {
      setStatus('taken');
    } else {
      setStatus('available');
    }
  };

  useEffect(() => {
    if (isGridMember && unitSlot.length === 2) {
      checkAvailability(unitSlot);
    } else if (unitSlot.length < 2) {
      setStatus('idle');
    }
  }, [unitSlot, isGridMember]);

  // Kolory dla statusu (HUD w prawym górnym rogu)
  const getStatusTextColor = () => {
    if (status === 'available') return 'text-green-500';
    if (status === 'taken') return 'text-[#ff133a]';
    return 'text-zinc-500';
  };

  // Kolor dla samego numeru w inpucie
  const getInputTextColor = () => {
    if (status === 'available') return 'text-white'; // Wolny - biały (pasuje do reszty)
    if (status === 'taken') return 'text-[#ff133a]'; // Zajęty - czerwony
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
          <div className="flex w-full max-w-xs gap-2">
            <input type="email" placeholder="ENTER_EMAIL" className="flex-1 bg-black border border-white/10 p-3 text-[10px] font-mono focus:border-[#ff133a] outline-none transition-colors text-white" />
            <button onClick={onJoinGrid} className="bg-white text-black px-6 py-2 text-[9px] font-black uppercase hover:bg-[#ff133a] hover:text-white transition-all duration-300">Join</button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-10">
        <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#ff133a] italic font-mono">02 // Custom_VIN_Slot</p>
        {status !== 'idle' && (
          <span className={`text-[7px] font-mono uppercase tracking-[0.2em] ${getStatusTextColor()}`}>
            {status === 'checking' && 'SYS_VERIFYING...'}
            {status === 'available' && 'STATUS: AVAILABLE'}
            {status === 'taken' && 'STATUS: TERMINATED'}
          </span>
        )}
      </div>
      
      <div className={`transition-all duration-1000 ${!isGridMember ? 'blur-md opacity-20' : 'opacity-100'}`}>
        <div className="flex justify-between text-[7px] tracking-[0.3em] uppercase text-zinc-700 font-bold px-1 mb-4 italic">
          <span>Series</span><span>Model_ID</span><span>Type</span><span className="text-[#ff133a]">Unit_Slot</span>
        </div>
        
        {/* Kontener z VINem */}
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
              // Zmieniony font: teraz text-lg i font-bold, aby pasował do reszty VINu
              className={`bg-transparent outline-none w-10 text-lg font-bold font-mono transition-colors placeholder:text-zinc-900 uppercase ml-1 ${getInputTextColor()}`} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}