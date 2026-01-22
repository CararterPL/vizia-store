import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { SectionHeader } from '../ui/SectionHeader';

const products = [
  { id: '911', name: 'GT3 RS', vin: 'SHDWRC-911RSGTTS-XX', left: 42, price: '259.00', type: 'active', daysLeft: 241, imgBack: '/products/vizia_shdwrc_911rsgt01ts-back.png', imgFront: '/products/vizia_shdwrc_911rsgt01ts-front.png' },
  { id: 'G700', name: 'G-BRABUS', vin: 'SHDWRC-AMGGBRBTS-XX', left: 12, price: '259.00', type: 'active', daysLeft: 14, imgBack: '/products/vizia_shdwrc_amggbrb01ts-back.png', imgFront: '/products/vizia_shdwrc_911rsgt01ts-front.png' },
  { id: 'GTD', name: 'MUSTANG GTD', vin: 'SHDWRC-MSTNGGTTS-XX', left: 7, price: '259.00', type: 'active', daysLeft: 310, imgBack: '/products/vizia_shdwrc_911rsgt01ts-front.png', imgFront: '/products/vizia_shdwrc_911rsgt01ts-front.png' },
  { id: 'GP3', name: 'MINI GP', vin: 'SHDWRC-MNJCWGPTS-XX', left: 88, price: '259.00', type: 'active', daysLeft: 350, imgBack: '/products/gp3_back.png', imgFront: '/products/gp3_front.png' },
  { id: 'RS6', name: 'RS6 AVANT', vin: 'SHDWRC-ADRS6AVTS-XX', left: 0, price: '---', type: 'upcoming', daysLeft: 0, imgBack: '/products/rs6_back.jpg', imgFront: '' },
  { id: 'M3T', name: 'M3 TOURING', vin: 'SHDWRC-BMWM3TRTS-XX', left: 0, price: '---', type: 'upcoming', daysLeft: 0, imgBack: '/products/m3t_back.jpg', imgFront: '' },
];

const ChronoGauge = ({ value, max, label, critical }: { value: number, max: number, label: string, critical: boolean }) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / max) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-14 h-14 flex items-center justify-center bg-zinc-900 rounded-full border border-white/5">
        <svg className="w-12 h-12 -rotate-90">
          <circle cx="24" cy="24" r={radius} fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
          <circle 
            cx="24" cy="24" r={radius} fill="transparent" strokeWidth="3"
            strokeDasharray={circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="square"
            className={`${critical ? 'stroke-vizia-red shadow-[0_0_10px_#ff133a]' : 'stroke-zinc-500'} transition-all duration-1000`}
          />
        </svg>
        <span className={`absolute font-brand font-black italic text-[11px] ${critical ? 'text-vizia-red' : 'text-white'}`}>
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="font-mono text-[7px] text-zinc-600 mt-1 uppercase font-bold tracking-widest">{label}</span>
    </div>
  );
};

export const ProductGrid = () => (
  <section id="products" className="py-24 px-4 md:px-10 max-w-[1600px] mx-auto bg-vizia-black">
    
    {/* NAGŁÓWEK SYSTEMOWY */}
    <SectionHeader 
      tagline="LIVE_COLLECTION_STATUS"
      title="The Collection"
      description="Aktywne jednostki produkcyjne dostępne w aktualnym oknie czasowym. Każdy model objęty jest ścisłym limitem 99 egzemplarzy."
      align="left"
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {products.map((p) => {
        const isUpcoming = p.type === 'upcoming';
        const criticalUnits = p.left < 15 && !isUpcoming;
        const criticalDays = p.daysLeft < 30 && !isUpcoming;

        return (
          <div key={p.id} className="group relative flex flex-col bg-zinc-950 border border-white/5 transition-colors hover:border-vizia-red/30">
            <Link href={isUpcoming ? "#" : `/product/${p.id}`} className={isUpcoming ? 'cursor-default' : 'cursor-pointer'}>
              
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image 
                  src={p.imgBack} alt={p.name} fill 
                  className={`object-cover transition-opacity duration-500 ${isUpcoming ? 'opacity-10 saturate-[0.6] contrast-[1.2] blur-xl' : 'opacity-80 saturate-[0.6] group-hover:opacity-0'}`} 
                />
                
                {!isUpcoming && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Image src={p.imgFront} alt={p.name} fill className="object-cover" />
                  </div>
                )}

                {!isUpcoming && (
                  <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-vizia-red shadow-[0_0_15px_#ff133a] opacity-0 group-hover:animate-scan-once" />
                  </div>
                )}
                
                {isUpcoming && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-brand font-black italic text-2xl text-zinc-800 uppercase tracking-[0.3em]">Wkrótce</span>
                  </div>
                )}
              </div>

              <div className="p-8 space-y-8 flex-grow">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-grow">
                    <h4 className={`text-3xl leading-none ${isUpcoming ? 'text-zinc-800' : 'text-white group-hover:text-vizia-red'} transition-colors uppercase italic font-black`}>
                      {p.name}
                    </h4>
                    <p className="text-zinc-600 font-mono text-[11px] mt-2 tracking-widest">{p.vin}</p>
                    
                    {!isUpcoming && (
                      <div className="mt-6 text-2xl font-brand font-black italic text-white">
                        {p.price} <span className="text-sm text-zinc-500 not-italic font-bold">PLN</span>
                      </div>
                    )}
                  </div>

                  {!isUpcoming && (
                    <div className="flex gap-4">
                      <ChronoGauge value={p.left} max={99} label="SZTUKI" critical={criticalUnits} />
                      <ChronoGauge value={p.daysLeft} max={365} label="DNI" critical={criticalDays} />
                    </div>
                  )}
                </div>

                <div className="pt-8 border-t border-white/5">
                  {!isUpcoming ? (
                    <Button variant="primary" size="md" className="w-full">
                      SPRAWDŹ DETALE
                    </Button>
                  ) : (
                    <div className="text-zinc-800 font-brand font-black italic text-center uppercase tracking-widest text-sm">
                      RELEASE_WINDOW // 2026
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  </section>
);