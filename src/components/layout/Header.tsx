'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { useCart } from '../../context/CartContext';

interface HeaderProps {
  onCartClick: () => void;
}

export const Header = ({ onCartClick }: HeaderProps) => {
  const { items } = useCart();
  // Dodajemy stan menu mobilnego, aby uniknąć martwych interakcji
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const itemsCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-vizia-black/90 backdrop-blur-lg border-b border-white/5 px-6 md:px-12 py-6">
      <div className="max-w-[1600px] mx-auto flex justify-between items-center">
        
        {/* LOGO AREA */}
        <Link href="/" className="group" onClick={() => setIsMenuOpen(false)}>
          <Logo className="h-4 md:h-5 w-auto text-white group-hover:text-vizia-red transition-colors duration-300" />
        </Link>

        {/* NAVIGATION - DESKTOP */}
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
          <button 
            onClick={onCartClick}
            className="relative group p-1 transition-transform hover:scale-110 active:scale-95"
          >
            <ShoppingBag className="w-5 h-5 text-white group-hover:text-vizia-red transition-colors" strokeWidth={1.5} />
            
            {itemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-vizia-red flex items-center justify-center rounded-full text-[9px] font-black italic text-white ring-2 ring-vizia-black animate-in zoom-in duration-300">
                {itemsCount}
              </span>
            )}
          </button>
          
          {/* MOBILE MENU TOGGLE */}
          <button 
            className="md:hidden text-white p-1 hover:text-vizia-red transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION DROPDOWN */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-vizia-black border-b border-white/5 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-6 gap-6">
            <Link 
              href="/#manifesto" 
              onClick={() => setIsMenuOpen(false)}
              className="font-bold uppercase tracking-widest text-zinc-400 text-sm"
            >
              Manifest
            </Link>
            <Link 
              href="/#products" 
              onClick={() => setIsMenuOpen(false)}
              className="font-bold uppercase tracking-widest text-zinc-400 text-sm"
            >
              Kolekcja
            </Link>
            <Link 
              href="/#blueprint" 
              onClick={() => setIsMenuOpen(false)}
              className="font-bold uppercase tracking-widest text-zinc-400 text-sm"
            >
              Specyfikacja
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};