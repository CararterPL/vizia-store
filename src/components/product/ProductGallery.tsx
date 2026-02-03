'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

const originalImages = [
  '/products/vizia_shdwrc_911rsgt01ts-back.png',
  '/products/vizia-minijcwgp.webp',
  '/products/vizia-mustang7gtd_view1.webp',
  '/products/vizia_shdwrc_911rsgt01ts-front.png'
];

export const ProductGallery = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  const [itemWidth, setItemWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const SIDE_PANEL_WIDTH = 560; 
  const HEADER_HEIGHT = 76;
  const images = [...originalImages, ...originalImages, ...originalImages];

  const calculateDimensions = useCallback(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 1024;
      const galleryHeight = window.innerHeight - HEADER_HEIGHT;
      const width = isMobile ? window.innerWidth * 0.9 : galleryHeight * 0.8;
      setItemWidth(width);
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);
    return () => window.removeEventListener('resize', calculateDimensions);
  }, [calculateDimensions]);

  const getOffset = useCallback(() => {
    if (typeof window === 'undefined') return 0;
    const isMobile = window.innerWidth < 1024;
    if (isMobile) return (window.innerWidth - itemWidth) / 2;
    return (window.innerWidth - SIDE_PANEL_WIDTH - itemWidth) / 2;
  }, [itemWidth]);

  const updateIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el || itemWidth === 0) return;
    const offset = getOffset();
    const index = Math.round((el.scrollLeft + offset - (itemWidth * originalImages.length)) / itemWidth);
    setActiveIndex(Math.abs(index % originalImages.length));

    const totalSetWidth = itemWidth * originalImages.length;
    if (!isDragging) {
      if (el.scrollLeft >= totalSetWidth * 2) el.scrollLeft -= totalSetWidth;
      if (el.scrollLeft <= totalSetWidth / 2) el.scrollLeft += totalSetWidth;
    }
  }, [isDragging, itemWidth, getOffset]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el && itemWidth > 0) {
      const offset = getOffset();
      el.scrollLeft = (itemWidth * originalImages.length) - offset;
      const timeout = setTimeout(() => {
        el.addEventListener('scroll', updateIndex);
        updateIndex();
      }, 50);
      return () => {
        clearTimeout(timeout);
        el.removeEventListener('scroll', updateIndex);
      }
    }
  }, [updateIndex, itemWidth, getOffset]);

  if (!isMounted) return <div className="w-full h-full bg-black" />;
  const offset = getOffset();

  const scrollManual = (dir: 'l' | 'r') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'l' ? -itemWidth : itemWidth, behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="relative w-full bg-black overflow-hidden flex flex-col lg:flex-row"
      style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
    >
      <div 
        ref={scrollRef}
        onMouseDown={(e) => {
          setIsDragging(true);
          setStartX(e.pageX - scrollRef.current!.offsetLeft);
          setScrollLeft(scrollRef.current!.scrollLeft);
        }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={(e) => {
          if (!isDragging) return;
          const x = e.pageX - scrollRef.current!.offsetLeft;
          const walk = (x - startX) * 1.5;
          scrollRef.current!.scrollLeft = scrollLeft - walk;
        }}
        className={`flex h-full w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ scrollPaddingLeft: `${offset}px` }}
      >
        <div className="flex h-full items-center">
          <div className="flex-shrink-0" style={{ width: `${offset}px` }} />
          
          {images.map((img, idx) => {
            const isCurrent = (idx % originalImages.length) === activeIndex;
            return (
              <div 
                key={idx} 
                className={`relative h-full flex-shrink-0 snap-start transition-all duration-500 ease-in-out
                  ${isCurrent ? 'opacity-100' : 'opacity-25 blur-[2px]'}
                `}
                style={{ width: `${itemWidth}px` }}
              >
                <div className="absolute inset-0 flex items-center justify-center lg:relative lg:h-full lg:w-full">
                  {/* Przesunięcie top-[-15%] likwiduje margines u góry na mobile */}
                  <div className="relative w-full h-[85%] top-[-15%] lg:top-0 lg:h-full">
                    <Image 
                      src={img} 
                      alt="Vizia_Asset" 
                      fill 
                      className="object-cover" 
                      priority={idx >= originalImages.length && idx < originalImages.length * 2}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex-shrink-0" style={{ width: `calc(100vw - ${itemWidth}px)` }} />
        </div>
      </div>

      {/* MOBILE INDICATORS */}
      <div className="absolute bottom-12 w-full flex justify-center gap-2 lg:hidden pointer-events-none z-30">
        {originalImages.map((_, i) => (
          <div key={i} className={`h-[2px] transition-all duration-300 ${activeIndex === i ? 'w-8 bg-amber-500 shadow-[0_0_8px_#f59e0b]' : 'w-2 bg-white/20'}`} />
        ))}
      </div>

      {/* DESKTOP HUD */}
      <div 
        className="hidden lg:flex absolute inset-y-0 left-0 pointer-events-none z-20 flex-col justify-between p-12"
        style={{ width: `calc(100vw - ${SIDE_PANEL_WIDTH}px)` }}
      >
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-amber-500 animate-pulse" />
          <span className="font-mono text-[8px] text-amber-500 tracking-[0.4em] uppercase">Visual_Stream_Live</span>
        </div>

        <div className="flex justify-between items-center w-full pointer-events-auto px-4">
          <button onClick={() => scrollManual('l')} className="p-4 group focus:outline-none">
            <div className="flex gap-1">
              {[0, 1, 2].map(i => <div key={i} className="w-1 h-8 bg-amber-500 skew-x-[-15deg] opacity-20 group-hover:opacity-100 transition-all" />)}
            </div>
          </button>
          <button onClick={() => scrollManual('r')} className="p-4 group focus:outline-none">
            <div className="flex gap-1">
              {[0, 1, 2].map(i => <div key={i} className="w-1 h-8 bg-amber-500 skew-x-[-15deg] opacity-20 group-hover:opacity-100 transition-all" />)}
            </div>
          </button>
        </div>

        <div className="flex justify-center gap-6">
          {originalImages.map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
               <div className={`h-[2px] transition-all duration-500 ${activeIndex === i ? 'w-12 bg-amber-500 shadow-[0_0_12px_#f59e0b]' : 'w-4 bg-white/10'}`} />
               <span className={`font-mono text-[7px] ${activeIndex === i ? 'text-amber-500 opacity-100' : 'text-zinc-700 opacity-40'}`}>0{i+1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};