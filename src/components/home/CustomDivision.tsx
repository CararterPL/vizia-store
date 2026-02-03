'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { SectionHeader } from '../ui/SectionHeader';

export const CustomDivision = () => {
  return (
    // Używamy px-0 na mobile, żeby elementy mogły stykać się z krawędzią (styl brutalistyczny)
    <section className="py-24 md:py-40 px-0 md:px-6 bg-vizia-black border-t border-white/5 relative overflow-hidden">
      
      {/* Background Graphic Element - ukryty na mobile dla czystości kodu */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-vizia-red/[0.02] to-transparent pointer-events-none hidden md:block" />
      
      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* LEWA STRONA: Tekst i Nagłówek (7 kolumn) */}
          <div className="lg:col-span-7 px-6 md:px-0">
            <div className="max-w-full overflow-hidden">
              <SectionHeader 
                tagline="B2B // BESPOKE_SOLUTIONS"
                title="Custom Division"
                // Kluczowe: łamanie długich słów i wymuszony whitespace-normal
                className="[&_h2]:break-words [&_h2]:whitespace-normal [&_h2]:leading-[0.85]"
                description="Budujesz markę, klub lub organizujesz event? Tworzymy dedykowane kolekcje ubrań, które łączą Twoją tożsamość z naszym standardem wykonania."
                align="left"
              />
            </div>

            <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
              <a href="mailto:vince@vizia-lab.com?subject=Custom Division Inquiry" className="w-full md:w-auto">
                <Button variant="primary" size="lg" className="w-full md:w-auto px-8 md:px-16 py-7 md:py-8 text-lg md:text-xl font-black italic">
                  Napisz do nas // Start
                </Button>
              </a>

              <div className="flex flex-col gap-1 pl-1 md:pl-0">
                <span className="text-[10px] text-zinc-600 uppercase tracking-[0.3em] font-bold">Project_Lead</span>
                <p className="text-white font-mono text-sm tracking-tight italic">vince@vizia-lab.com</p>
              </div>
            </div>
          </div>

          {/* PRAWA STRONA: Parametry techniczne (5 kolumn) */}
          {/* Na mobile usuwamy border-x i puszczamy gap-px na całą szerokość */}
          <div className="lg:col-span-5 w-full grid grid-cols-1 gap-px bg-white/5 border-y md:border border-white/5 shadow-2xl">
            {[
              { label: 'Minimum_Order', value: '10 Units', detail: 'Low volume' },
              { label: 'Turnaround', value: '3-4 Weeks', detail: 'End-to-end' },
              { label: 'DNA_Options', value: 'Personalized VIN', detail: 'Unique serial' },
              { label: 'Quality_Grade', value: 'High GSM', detail: 'Lab Tested' }
            ].map((stat, i) => (
              <div key={i} className="bg-zinc-950 p-6 md:p-8 group hover:bg-zinc-900 transition-colors">
                <div className="flex justify-between items-center gap-4">
                  <div>
                    <span className="text-[9px] text-vizia-red uppercase tracking-widest font-mono block mb-1">
                      {stat.label}
                    </span>
                    <p className="text-xl md:text-2xl font-brand font-black italic text-white uppercase group-hover:text-vizia-red transition-colors">
                      {stat.value}
                    </p>
                  </div>
                  <p className="text-[9px] md:text-[10px] text-zinc-700 font-mono uppercase text-right leading-tight">
                    {stat.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DOLNY PASEK STATUSU */}
        <div className="mt-16 md:mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 px-6 md:px-0">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 bg-vizia-red animate-pulse"></span>
              <span className="w-3 h-3 bg-zinc-800"></span>
            </div>
            <p className="text-[10px] md:text-[11px] text-zinc-500 uppercase tracking-[0.2em] font-bold">
              Current_Capacity: <span className="text-white">2 Slots Monthly</span>
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-[8px] md:text-[9px] text-zinc-700 font-mono uppercase tracking-[0.2em]">
            <span>Verified_Service</span>
            <span className="hidden sm:inline">Worldwide_Shipping</span>
            <span>Est_2024</span>
          </div>
        </div>
      </div>
    </section>
  );
};