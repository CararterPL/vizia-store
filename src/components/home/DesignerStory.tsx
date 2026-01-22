import React from 'react';
import Image from 'next/image';
import { SectionHeader } from '../ui/SectionHeader';

export const DesignerStory = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-vizia-black border-t border-white/5 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEWA KOLUMNA: Obraz - miejsce na Twoje zdjęcie */}
          <div className="relative aspect-[4/3] sm:aspect-square bg-zinc-900 border border-white/5 overflow-hidden">
            <Image 
              src="/images/vince_portrait.jpg" // Ścieżka do Twojego zdjęcia
              alt="Portret Vince'a - założyciela Vizia Lab" 
              fill 
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            {/* Techniczny tag na zdjęciu */}
            <div className="absolute bottom-6 left-6 bg-vizia-red text-white font-brand font-black italic px-4 py-2 text-xs">
              DESIGNER // VINCE_LAB
            </div>
          </div>

          {/* PRAWA KOLUMNA: Treść - nagłówek, Twój tekst i cytat Jaya Leno */}
          <div className="space-y-8">
            <SectionHeader 
              tagline="Founder's Note"
              title="Historia to paliwo"
              description="Vizia Lab to esencja mojej pasji do motoryzacji. Od pierwszych projektów w garażu, po zwycięstwo w Hot Wheels Legends Tour. Każdy element, który tworzymy, jest odzwierciedleniem tej drogi – niepowtarzalny, autentyczny i zawsze z charakterem."
              className="!mb-0" // Nadpisujemy domyślny margin-bottom, bo mamy tu inny layout
            />
            
            {/* Cytat Jaya Leno */}
            <div className="border-l-2 border-vizia-red pl-6 py-2 mt-8">
              <p className="text-white italic text-lg leading-relaxed">
                "To jest właśnie to, o co chodzi w pasji do aut. Prostota, charakter i wykonanie, którego nie da się zignorować."
              </p>
              <span className="block text-data text-[10px] text-zinc-600 mt-4 uppercase tracking-widest">
                — Jay Leno
              </span>
            </div>

            {/* Opcjonalny przycisk - jeśli chcesz dodać np. link do portfolio */}
            {/* <div className="pt-8">
              <Button variant="primary" size="lg">
                Moje projekty
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};