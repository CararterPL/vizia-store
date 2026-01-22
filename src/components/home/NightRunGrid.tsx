'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { SectionHeader } from '../ui/SectionHeader';

export const NightRunGrid = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section className="py-24 px-6 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
      {/* Dekoracyjne tło */}
      <div className="absolute right-0 top-0 font-brand font-black italic text-[15vw] text-white/[0.01] pointer-events-none">
        NRG_01
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <SectionHeader 
            tagline="ACCESS_PROTOCOL"
            title="Night Run Grid"
            description="Dołącz do zamkniętej listy dystrybucyjnej. Informacje o dropach, unikalne numery VIN i dostęp do przedsprzedaży. Zero marketingu, czyste dane."
          />

          <div className="relative group">
            {/* Techniczna ramka formularza */}
            <div className="absolute -inset-1 bg-gradient-to-r from-vizia-red/20 to-transparent blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            
            <form 
              onSubmit={handleSubmit}
              className="relative bg-black border border-white/10 p-8 md:p-12 space-y-6"
            >
              <div className="space-y-2">
                <label className="text-data text-[10px] text-zinc-500 tracking-widest uppercase">
                  User_Email_Address
                </label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER_EMAIL_FOR_AUTH"
                  required
                  className="w-full bg-zinc-900/50 border border-white/5 px-4 py-4 text-white font-mono text-sm focus:outline-none focus:border-vizia-red/50 transition-colors"
                />
              </div>

              <Button 
                variant="primary" 
                size="lg" 
                className="w-full"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'AUTHORIZING...' : 'JOIN_THE_GRID'}
              </Button>

              {/* Statusy zwrotne */}
              {status === 'success' && (
                <div className="text-vizia-red font-mono text-[10px] text-center animate-pulse uppercase tracking-widest">
                  ACCESS_GRANTED // CHECK_INBOX
                </div>
              )}
              {status === 'error' && (
                <div className="text-zinc-500 font-mono text-[10px] text-center uppercase tracking-widest">
                  CONNECTION_ERROR // TRY_AGAIN
                </div>
              )}

              <div className="pt-4 text-center">
                <span className="text-[8px] text-zinc-700 uppercase tracking-[0.4em]">Secure_Encryption_Active</span>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};