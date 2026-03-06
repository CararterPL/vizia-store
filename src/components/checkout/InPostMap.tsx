'use client';

import React, { useEffect, useRef } from 'react';

interface InPostMapProps {
  onSelect: (id: string, name: string) => void;
}

export default function InPostMap({ onSelect }: InPostMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Definiujemy funkcję inicjalizacji
    const initWidget = () => {
      // @ts-ignore
      if (window.InPost && window.InPost.geowidget) {
        try {
          // @ts-ignore
          window.InPost.geowidget.init({
            onpoint: (point: any) => {
              onSelect(point.name, `${point.address.line1}, ${point.address.line2}`);
            }
          });
        } catch (e) {
          console.error("Widget Init Error", e);
        }
      }
    };

    // 2. Dynamiczne ładowanie skryptu SDK
    const scriptId = 'inpost-sdk-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = "https://geowidget.inpost.pl/sdk/for-javascript/lib/geowidget.min.js";
      script.async = true;
      script.onload = initWidget;
      document.body.appendChild(script);
    } else {
      // Jeśli skrypt już jest, odpalamy z lekkim opóźnieniem dla DOM
      setTimeout(initWidget, 500);
    }

    // Czyścimy przy odmontowaniu (opcjonalnie)
    return () => {
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, [onSelect]);

  return (
    <div className="relative w-full border border-white/10 bg-[#0a0a0a] overflow-hidden group">
      {/* Overlay informacyjny, gdyby mapa ładowała się długo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-has-[iframe]:hidden">
        <p className="font-mono text-[10px] text-zinc-700 animate-pulse tracking-[0.3em]">
          ESTABLISHING_TERMINAL_CONNECTION...
        </p>
      </div>
      
      {/* Właściwy kontener InPost */}
      <div 
        id="easypack-geowidget" 
        ref={containerRef}
        className="w-full h-[500px] grayscale invert contrast-125"
      ></div>
    </div>
  );
}