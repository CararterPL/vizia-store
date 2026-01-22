'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

const originalImages = [
  '/products/vizia_shdwrc_911rsgt01ts-back.png',
  '/products/vizia_shdwrc_911rsgt01ts-front.png',
  '/products/vizia_shdwrc_911rsgt01ts-back.png',
  '/products/vizia_shdwrc_911rsgt01ts-front.png',
  '/products/vizia_shdwrc_911rsgt01ts-back.png',
  '/products/vizia_shdwrc_911rsgt01ts-front.png',
];

export const ProductGallery = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Potrójna lista dla płynnej pętli nieskończonej
  const images = [...originalImages, ...originalImages, ...originalImages];

  // Inicjalizacja: ustawienie scrolla na środkowym zestawie
  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      const singleSetWidth = el.scrollWidth / 3;
      el.scrollLeft = singleSetWidth;
    }
  }, []);

  const updateIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const singleSetWidth = el.scrollWidth / 3;
    const itemWidth = singleSetWidth / originalImages.length;
    const relativeScroll = el.scrollLeft % singleSetWidth;
    
    // Precyzyjne wyliczenie indeksu (0-3)
    const index = Math.round(relativeScroll / itemWidth) % originalImages.length;
    setActiveIndex(index);
  }, []);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    updateIndex();

    // Mechanizm przeskoku pętli nieskończonej
    const singleSetWidth = el.scrollWidth / 3;
    if (!isDragging) {
      if (el.scrollLeft >= singleSetWidth * 2) {
        el.scrollLeft -= singleSetWidth;
      } else if (el.scrollLeft <= 5) {
        el.scrollLeft += singleSetWidth;
      }
    }
  };

  const scrollManual = (dir: 'l' | 'r') => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({ 
        left: dir === 'l' ? -amount : amount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="relative w-full h-full group bg-black overflow-hidden">
      
      {/* KONTENER ZDJĘĆ */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseDown={(e) => {
          setIsDragging(true);
          setStartX(e.pageX - scrollRef.current!.offsetLeft);
          setScrollLeft(scrollRef.current!.scrollLeft);
        }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={(e) => {
          if (!isDragging) return;
          e.preventDefault();
          const x = e.pageX - scrollRef.current!.offsetLeft;
          const walk = (x - startX) * 1.5;
          scrollRef.current!.scrollLeft = scrollLeft - walk;
        }}
        className={`
          flex h-full w-full 
          overflow-x-auto overflow-y-hidden 
          scrollbar-hide select-none
          ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
        `}
      >
        <div className="flex h-full w-max">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className="relative h-full flex-shrink-0 border-r border-white/5" 
              style={{ aspectRatio: '4/5' }}
            >
              <Image 
                src={img} 
                alt={`Frame_${idx}`} 
                fill 
                priority={idx >= originalImages.length && idx < originalImages.length * 2}
                className="object-cover pointer-events-none" 
              />
              <div className="absolute top-8 left-8 font-mono text-[7px] text-white/10 tracking-[0.5em] uppercase">
                Data_Stream // 0{(idx % originalImages.length) + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP UI: KIERUNKOWSKAZY (Shift Left/Right) */}
      <div className="hidden lg:flex absolute inset-y-0 left-0 w-full justify-between items-center px-8 pointer-events-none z-30">
        
        {/* LEWY */}
        <button 
          onClick={() => scrollManual('l')}
          className="pointer-events-auto group flex items-center gap-4 outline-none"
        >
          <div className="flex gap-1.5">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="w-1.5 h-8 bg-amber-500 skew-x-[-20deg] transition-all duration-300 opacity-10 group-hover:opacity-100 group-hover:animate-pulse" 
                style={{ animationDelay: `${(3-i) * 150}ms` }} 
              />
            ))}
          </div>
          <span className="font-mono text-[9px] text-amber-500 tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-all uppercase transform -translate-x-2 group-hover:translate-x-0">
            Shift_L
          </span>
        </button>

        {/* PRAWY */}
        <button 
          onClick={() => scrollManual('r')}
          className="pointer-events-auto group flex items-center gap-4 text-right outline-none"
        >
          <span className="font-mono text-[9px] text-amber-500 tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-all uppercase transform translate-x-2 group-hover:translate-x-0">
            Shift_R
          </span>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="w-1.5 h-8 bg-amber-500 skew-x-[-20deg] transition-all duration-300 opacity-10 group-hover:opacity-100 group-hover:animate-pulse"
                style={{ animationDelay: `${i * 150}ms` }} 
              />
            ))}
          </div>
        </button>
      </div>

      {/* DASH INDICATORS (Centrowane wewnątrz samej galerii) */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-4 pointer-events-none">
        {originalImages.map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div 
              className={`h-[1px] transition-all duration-500 ease-out ${
                activeIndex === i ? 'w-12 bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)]' : 'w-4 bg-white/10'
              }`} 
            />
            <span className={`font-mono text-[7px] transition-opacity duration-500 ${
              activeIndex === i ? 'opacity-100' : 'opacity-0'
            }`}>
              UNIT_0{i + 1}
            </span>
          </div>
        ))}
      </div>

      {/* TECH DECORATION */}
      <div className="absolute top-8 right-8 font-mono text-[7px] text-white/20 tracking-[0.4em] uppercase pointer-events-none hidden lg:block">
        Vizia_Optics_System // Active
      </div>
    </div>
  );
};