'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { useCart } from '../../context/CartContext'; // Importujemy hook koszyka

// Interfejs dla propsów
interface HeaderProps {
  onCartClick: () => void;
}

export const Header = ({ onCartClick }: HeaderProps) => {
  const { items } = useCart();

  // Obliczamy sumę wszystkich sztuk w koszyku
  const itemsCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-vizia-black/90 backdrop-blur-lg border-b border-white/5 px-6 md:px-12 py-6">
      <div className="max-w-[1600px] mx-auto flex justify-between items-center">
        
        {/* LOGO AREA */}
        <Link href="/" className="group">
          <Logo className="h-4 md:h-5 w-auto text-white group-hover:text-vizia-red transition-colors duration-300" />
        </Link>

        {/* NAVIGATION */}
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
            
            {/* Dynamiczny licznik koszyka - widoczny tylko gdy itemsCount > 0 */}
            {itemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-vizia-red flex items-center justify-center rounded-full text-[9px] font-black italic text-white ring-2 ring-vizia-black animate-in zoom-in duration-300">
                {itemsCount}
              </span>
            )}
          </button>
          
          <button className="md:hidden text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>

      </div>
    </header>
  );
};