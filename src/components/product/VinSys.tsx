"use client"
import React from 'react'

interface VinSystemProps {
  isGridMember: boolean;
  series: string;
  modelCode: string;
  type: string;
  unitSlot: string;
  setUnitSlot: (val: string) => void;
  onJoinGrid: () => void;
}

export const VinSystem = ({ 
  isGridMember, series, modelCode, type, unitSlot, setUnitSlot, onJoinGrid 
}: VinSystemProps) => {
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

      <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#ff133a] mb-10 italic font-mono">02 // Custom_VIN_Slot</p>
      
      <div className={`transition-all duration-1000 ${!isGridMember ? 'blur-md opacity-20' : 'opacity-100'}`}>
        <div className="flex justify-between text-[7px] tracking-[0.3em] uppercase text-zinc-700 font-bold px-1 mb-4 italic">
          <span>Series</span><span>Model_ID</span><span>Type</span><span className="text-[#ff133a]">Unit_Slot</span>
        </div>
        <div className="flex flex-wrap gap-2 items-center bg-black border border-white/5 p-6 shadow-inner">
          <span className="text-zinc-600 font-mono text-lg font-bold">{series}-</span>
          <span className="text-zinc-600 font-mono text-lg font-bold">{modelCode}</span>
          <span className="text-[#ff133a] font-mono text-lg font-bold italic">{type}</span>
          <span className="text-zinc-600 font-mono text-lg font-bold">-</span>
          <input 
            type="text" 
            maxLength={2} 
            value={unitSlot} 
            onChange={(e) => setUnitSlot(e.target.value.replace(/\D/g, ''))} 
            placeholder="XX" 
            disabled={!isGridMember}
            className="bg-transparent text-white text-3xl font-mono focus:outline-none w-16 tracking-widest uppercase placeholder:text-zinc-900 font-black" 
          />
        </div>
      </div>
    </div>
  )
}