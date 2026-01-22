'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu } from 'lucide-react';
import { Logo } from '../ui/Logo';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-vizia-black/90 backdrop-blur-lg border-b border-white/5 px-6 md:px-12 py-6">
      <div className="max-w-[1600px] mx-auto flex justify-between items-center">
        
        {/* LOGO AREA - Czyste logo z Twojego SVG */}
        <Link href="/" className="group">
          <Logo className="h-4 md:h-5 w-auto text-white group-hover:text-vizia-red transition-colors duration-300" />
        </Link>

        {/* NAVIGATION - Wykorzystuje bazowe style dla linków */}
        <nav className="hidden md:flex items-center gap-10">
          <Link href="/#manifesto" className="font-bold uppercase tracking-widest text-zinc-400 hover:text-white text-[11px]">
            Manifest
          </Link>
          <Link href="/#products" className="font-bold uppercase tracking-widest text-zinc-400 hover:text-white text-[11px]">
            Kolekcja
          </Link>
          <Link href="/#blueprint" className="font-bold uppercase tracking-widest text-zinc-400 hover:text-white text-[11px]">
            Specyfikacja
          </Link>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-6">
          <Link href="/cart" className="relative group p-1">
            <ShoppingBag className="w-5 h-5 text-white group-hover:text-vizia-red" strokeWidth={1.5} />
            {/* Licznik koszyka używa font-brand i italic */}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-vizia-red flex items-center justify-center rounded-full text-[9px] font-black italic text-white ring-2 ring-vizia-black">
              0
            </span>
          </Link>
          
          <button className="md:hidden text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>

      </div>
    </header>
  );
};