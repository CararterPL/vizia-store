import React from 'react';
import Image from 'next/image';

const images = [
  '../products/vizia_shdwrc_911rsgt01ts-back.png',
  '/products/911-back.jpg',
  '/products/911-detail.jpg',
  '/products/911-side.jpg'
];

export const ProductGallery = () => {
  return (
    // Usunęliśmy overflow-hidden stąd, żeby napis mógł "wystawać" poza kontener
    <div className="relative flex flex-col lg:flex-row gap-4">
      
      {/* KONTENER DLA NAPISU - STICKY */}
      {/* Na desktopie ten kontener ma wysokość ekranu i trzyma napis w jednym miejscu */}
      <div className="hidden lg:block sticky top-32 h-[60vh] order-2 w-12">
        <div className="absolute top-1/2 left-1/2 -rotate-90 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
          <span className="text-data opacity-40 tracking-[0.5em] text-[10px] block">
            SCROLL_FOR_INTEL //
          </span>
        </div>
      </div>

      {/* OBSZAR ZDJĘĆ */}
      <div className="flex-1 order-1 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide lg:flex-col lg:gap-8 lg:overflow-visible">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className="min-w-full snap-center lg:min-w-0 relative aspect-[4/5] bg-zinc-900 border border-white/5 overflow-hidden group"
          >
            <Image 
              src={img} 
              alt={`View ${idx}`} 
              fill 
              className="object-cover saturate-[0.5] contrast-[1.1] group-hover:saturate-100 transition-all duration-700"
            />
            
            {/* Licznik zdjęć na mobile */}
            <div className="absolute bottom-6 left-6 lg:hidden text-data bg-vizia-black/80 px-3 py-1.5 backdrop-blur-md border border-white/10">
              {idx + 1} // {images.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};