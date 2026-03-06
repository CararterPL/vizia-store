'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useNRG } from '../../../context/NRGContext'; // Importujemy Context

export const VinModule = ({ series, baseVin, productId, onVinSelect }: any) => {
  const { isNRG } = useNRG(); // Pobieramy stan globalny
  const [unitSlot, setUnitSlot] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [autoVin, setAutoVin] = useState<string | null>(null);

  // --- LOGIKA DLA ZWYKŁYCH UŻYTKOWNIKÓW (AUTO-ALLOCATION) ---
  useEffect(() => {
    // Jeśli użytkownik NIE jest NRG, system sam szuka pierwszego wolnego VINu
    if (!isNRG && series !== 'POLE_POSITION' && productId) {
      const fetchAutoVin = async () => {
        const { data } = await supabase
          .from('vin_pool')
          .select('vin_full')
          .eq('product_id', productId)
          .eq('is_sold', false)
          .is('assigned_at', null)
          .order('vin_full', { ascending: true })
          .limit(1)
          .single();

        if (data) {
          setAutoVin(data.vin_full);
          onVinSelect(data.vin_full);
        } else {
          onVinSelect(null);
        }
      };
      fetchAutoVin();
    }
  }, [isNRG, productId, series, onVinSelect]);

  // --- LOGIKA DLA NRG (MANUAL VERIFICATION) ---
  const checkVinAvailability = async (val: string) => {
    if (val.length !== 2) {
      setStatus('idle');
      onVinSelect(null);
      return;
    }

    setStatus('checking');
    const fullVin = `${baseVin}-${val}`.toUpperCase(); 

    const { data, error } = await supabase
      .from('vin_pool')
      .select('is_sold, assigned_at')
      .eq('vin_full', fullVin)
      .eq('product_id', productId)
      .single();

    if (error || !data || data.is_sold || data.assigned_at !== null) {
      setStatus('taken');
      onVinSelect(null);
    } else {
      setStatus('available');
      onVinSelect(fullVin);
    }
  };

  if (series === 'POLE_POSITION') return null;

  const vinTextStyle = "font-brand font-black italic text-xl md:text-2xl tracking-tighter uppercase leading-none";

  return (
    <div className="p-6 bg-white/[0.02] border border-white/5 space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Permanent_VIN_Protocol</span>
          
          {/* Status widoczny tylko przy ręcznym wpisywaniu (NRG) */}
          {isNRG && status !== 'idle' && (
            <span className={`text-[7px] font-mono uppercase tracking-widest ${status === 'available' ? 'text-emerald-500' : 'text-[#ff133a]'}`}>
              {status === 'checking' ? 'SYS_VERIFYING...' : status === 'available' ? 'UNIT_AVAILABLE' : 'UNIT_TERMINATED'}
            </span>
          )}
        </div>
        
        {isNRG && (
          <span className="text-[8px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 border border-emerald-500/20 uppercase font-mono italic font-bold tracking-widest animate-pulse">
            NRG_CUSTOM_SLOT_ACTIVE
          </span>
        )}
      </div>

      <div className="flex items-baseline">
        <span className={`${vinTextStyle} opacity-20`}>{baseVin}-</span>
        
        {isNRG ? (
          <input 
            type="text"
            maxLength={2} 
            value={unitSlot}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '');
              setUnitSlot(val);
              checkVinAvailability(val);
            }}
            className={`
              ${vinTextStyle} 
              w-[1.8em] 
              bg-transparent 
              border-b-2
              border-x-0
              border-t-0
              ${status === 'taken' ? 'border-[#ff133a] text-[#ff133a]' : 'border-white text-white'} 
              outline-none 
              text-center 
              p-0 
              m-0 
              ml-1
              transition-all
              duration-300
              placeholder:text-zinc-900
              appearance-none
              focus:ring-0
            `}
            placeholder="XX"
          />
        ) : (
          <span className={`${vinTextStyle} text-white ml-1 animate-pulse`}>
            {autoVin ? autoVin.split('-').pop() : '??'}
          </span>
        )}
      </div>

      {!isNRG && (
        <div className="pt-4 border-t border-white/5">
          <p className="text-[10px] font-mono text-zinc-500 uppercase leading-tight">
             STATUS: <span className={autoVin ? "text-white" : "text-red-500"}>
               {autoVin ? `UNIT_${autoVin.split('-').pop()}_ALLOCATED` : 'NO_UNITS_AVAILABLE'}
             </span>
          </p>
        </div>
      )}
    </div>
  );
};