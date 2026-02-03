'use client';

import React from 'react';

const ArchGauge = ({ value, max, label }: { value: number, max: number, label: string }) => {
  const radius = 20;
  const strokeWidth = 4;
  const center = 24;
  const fullCircumference = 2 * Math.PI * radius;
  const arcLength = fullCircumference * 0.75;
  const gapLength = fullCircumference - arcLength;
  const percentage = Math.min(value / max, 1);
  const progressLength = arcLength * percentage;

  // LOGIKA KOLORÓW (Pasek i Tekst)
  let strokeStyle = 'stroke-white';
  let textStyle = 'text-white';
  
  if (percentage < 0.2) {
    // STAN KRYTYCZNY: Czerwony + Glow + Pulsowanie tekstu
    strokeStyle = 'stroke-vizia-red shadow-[0_0_8px_#ff133a]';
    textStyle = 'text-vizia-red animate-pulse';
  } else if (percentage < 0.4) {
    // NISKI STAN: Pomarańczowy
    strokeStyle = 'stroke-orange-500';
    textStyle = 'text-orange-500';
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg className="w-12 h-12 -rotate-[225deg] absolute inset-0">
          <circle 
            cx={center} cy={center} r={radius} 
            fill="transparent" stroke="rgba(255,255,255,0.08)" 
            strokeWidth={strokeWidth} strokeDasharray={`${arcLength} ${gapLength}`} 
            strokeLinecap="round" 
          />
          <circle 
            cx={center} cy={center} r={radius} 
            fill="transparent" strokeWidth={strokeWidth} 
            strokeDasharray={`${progressLength} ${fullCircumference}`} 
            strokeDashoffset={0} strokeLinecap="round" 
            className={`${strokeStyle} transition-all duration-1000 ease-out`} 
          />
        </svg>
        <div className="relative z-10 flex flex-col items-center justify-center leading-none mt-0.5 text-center">
          {/* Dynamiczny kolor cyfr */}
          <span className={`font-brand font-black italic text-[14px] tracking-tighter transition-colors duration-500 ${textStyle}`}>
            {value.toString().padStart(2, '0')}
          </span>
          <span className="font-mono text-[6px] text-zinc-500 uppercase font-bold tracking-tight">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
};

interface StockGaugesProps {
  remaining: number;
  remainingMax?: number;
  daysLeft: number;
  daysLeftMax?: number;
  className?: string;
}

export const StockGauges = ({ 
  remaining, 
  remainingMax = 99, 
  daysLeft, 
  daysLeftMax = 365,
  className = "flex gap-4" 
}: StockGaugesProps) => {
  return (
    <div className={className}>
      <ArchGauge value={remaining} max={remainingMax} label="sztuki" />
      <ArchGauge value={daysLeft} max={daysLeftMax} label="dni" />
    </div>
  );
};