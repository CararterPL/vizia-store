import React from 'react';
import { Button } from '../ui/Button';
import { SectionHeader } from '../ui/SectionHeader';

export const CustomDivision = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-vizia-black border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="max-w-4xl">
          <SectionHeader 
            tagline="Custom Division"
            title="Dedykowane serie"
            description="Budujesz markę, klub lub organizujesz event? Tworzymy dedykowane kolekcje ubrań, które łączą Twoją tożsamość z naszym standardem wykonania. Od projektu graficznego, przez dobór materiałów, aż po unikalną numerację każdego egzemplarza."
          />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-12 mt-12">
            {/* Przycisk kontaktu bezpośredniego */}
            <a href="mailto:vince@vizia-lab.com?subject=Custom Division Inquiry">
              <Button variant="cta" size="lg">
                Napisz do nas
              </Button>
            </a>

            {/* Szybkie parametry w formie surowego tekstu */}
            <div className="grid grid-cols-2 md:flex md:gap-16 gap-8">
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Minimum</span>
                <p className="text-sm text-zinc-300">10 sztuk</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Realizacja</span>
                <p className="text-sm text-zinc-300">3-4 tygodnie</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Opcje</span>
                <p className="text-sm text-zinc-300">Personalizacja VIN</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subtelny status na dole, bez podkreślników */}
        <div className="mt-20 pt-8 border-t border-white/5 flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-vizia-red rounded-full"></div>
          <p className="text-[11px] text-zinc-600 uppercase tracking-widest">
            Aktualna dostępność: 2 projekty miesięcznie
          </p>
        </div>

      </div>
    </section>
  );
};