import React from 'react';
import { Button } from '../ui/Button';
import { SectionHeader } from '../ui/SectionHeader';

export const Manifesto = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-32 md:py-56 px-6 relative overflow-hidden bg-vizia-black">
      {/* Dekoracyjne tło - numer seryjny manifestu */}
      <div className="absolute top-10 left-10 font-brand font-black italic text-[20vw] text-white/[0.02] select-none leading-none pointer-events-none">
        01
      </div>

      <div className="max-w-[1000px] mx-auto relative z-10">
        
        {/* NAGŁÓWEK KORZYSTAJĄCY Z NOWEGO KOMPONENTU UI */}
        <SectionHeader 
          tagline="THE VIZIA WAY"
          title="Zasady są proste"
          description="W motoryzacji cenimy limitowane serie i unikalność. VIZIA przenosi tę logikę na ulicę. Ścisłe limitowanie i selekcja. Dostarczamy produkt tak wyjątkowy, jak Ty i Twoja fura."
        />

        {/* Dwa filary oparte na naszym statemencie */}
        <div className="grid md:grid-cols-2 gap-12 text-left border-t border-white/5 pt-16 mb-20">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-vizia-red font-brand font-black italic text-lg">01 //</span>
              <h5 className="text-white tracking-[0.2em]">SCARCITY</h5>
            </div>
            <p className="text-sm text-zinc-400">
              99 sztuk. To nie jest slogan, to nasza nieprzekraczalna granica. 
              Każdy projekt to zamknięty rozdział w historii brandu.
            </p>
          </div>

          <div className="space-y-4 border-l border-white/10 pl-8 md:pl-12">
            <div className="flex items-center gap-3">
              <span className="text-vizia-red font-brand font-black italic text-lg">02 //</span>
              <h5 className="text-white tracking-[0.2em]">TIME</h5>
            </div>
            <p className="text-sm text-zinc-400">
              Każdy drop ma swoje 12-miesięczne okno. Jeśli w tym czasie nie trafi do Twojego garażu, 
              zostaje trwale wycofany z publicznej sprzedaży.
            </p>
          </div>
        </div>

        {/* Akcja: Przycisk z naszego Design Systemu */}
        <div className="flex justify-center md:justify-start">
          <Button variant="primary" size="lg" onClick={scrollToProducts}>
            Zobacz produkty
          </Button>
        </div>
      </div>

      {/* Akcent wizualny na dole */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </section>
  );
};