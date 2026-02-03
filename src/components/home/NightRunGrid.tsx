'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { SectionHeader } from '../ui/SectionHeader';

const nrgBenefits = [
  { code: '01', title: 'Early Access', desc: 'Dostęp do dropu 2h wcześniej.' },
  { code: '02', title: 'VIN Reserve', desc: 'Rezerwacja numeru seryjnego.' },
  { code: '03', title: 'Hideout Entry', desc: 'Dostęp do ukrytej kategorii.' }
];

export const NightRunGrid = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500); 
  };

  return (
    <section className="py-24 md:py-40 bg-[#030303] border-t border-white/5 relative overflow-hidden">
      {/* Dekoracyjne tło XXL - wymuszone absolute-center dla bezpieczeństwa */}
      <div className="absolute right-0 top-0 font-brand font-black italic text-[25vw] text-white/[0.01] pointer-events-none select-none uppercase hidden md:block">
        NRG_System
      </div>

      {/* Kontener 1600px - na mobile px-0, żeby formularz i teksty miały całą szerokość */}
      <div className="w-full max-w-[1600px] mx-auto relative z-10 px-0 md:px-12 lg:px-20">
        
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* LEWA STRONA: Header i Benefity */}
          <div className="lg:col-span-7 px-6 md:px-0 space-y-12">
            <div className="max-w-full">
              <SectionHeader 
                tagline="AUTHENTICATION_REQUIRED"
                title="Night Run Grid"
                // Wymuszamy łamanie linii przy zachowaniu gigantycznego rozmiaru
                className="[&_h2]:break-words [&_h2]:whitespace-normal [&_h2]:leading-[0.85]"
                description="Dołącz do elitarnego protokołu dystrybucji. To bezpośredni link do bazy danych Vizia Lab."
                align="left"
              />
            </div>

            {/* BENEFITS - na mobile w pionie, od krawędzi do krawędzi */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {nrgBenefits.map((benefit) => (
                <div key={benefit.code} className="group p-6 border-l border-vizia-red/20 bg-white/[0.01] lg:bg-transparent">
                  <div className="text-vizia-red font-mono text-[10px] tracking-widest mb-3">
                    BENEFIT_{benefit.code}
                  </div>
                  <h4 className="text-white font-brand font-black italic text-lg uppercase mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-zinc-500 text-xs leading-relaxed font-mono uppercase tracking-tight">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* PRAWA STRONA: Formularz */}
          <div className="lg:col-span-5 w-full">
            <div className="relative group w-full">
              {/* Na mobile usuwamy zaokrąglenia i zbędne marginesy boczne, by zyskać miejsce */}
              <form 
                onSubmit={handleSubmit}
                className="relative bg-black lg:bg-zinc-950 border-y lg:border border-white/10 p-8 sm:p-12 md:p-16 space-y-8 w-full"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-data text-[10px] text-zinc-600 tracking-widest uppercase italic">
                      Identify_Email
                    </label>
                    <span className="hidden sm:block text-[8px] font-mono text-zinc-800">SECURE_AUTH</span>
                  </div>
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER_ADDRESS"
                    required
                    className="w-full bg-zinc-900/30 border border-zinc-800 px-6 py-5 text-white font-brand font-black italic tracking-widest focus:outline-none focus:border-vizia-red transition-all text-lg"
                  />
                </div>

                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full py-8 text-xl font-black italic tracking-[0.2em]"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'AUTH...' : 'JOIN_THE_GRID'}
                </Button>

                <p className="text-[9px] text-zinc-700 font-mono text-center uppercase tracking-widest">
                  Encryption: Active // No_Spam_Protocol
                </p>

                {/* Success Overlay */}
                {status === 'success' && (
                  <div className="absolute inset-0 bg-black flex flex-col items-center justify-center p-6 text-center z-20">
                    <h3 className="font-brand font-black italic text-3xl text-vizia-red mb-4 uppercase">Access_Granted</h3>
                    <Button variant="ghost" onClick={() => setStatus('idle')}>Close</Button>
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};