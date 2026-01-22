import React from 'react';
import Link from 'next/link';
import { Logo } from '../ui/Logo';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-vizia-black pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Centralna sekcja z logo */}
        <div className="flex flex-col items-center mb-20 text-center">
          <Logo className="h-6 md:h-8 w-auto text-white mb-8" />
          <p className="max-w-xs mx-auto">
            Autentyczność, technologia i motoryzacyjny puryzm.
          </p>
        </div>

        {/* Nawigacja w stopce - automatycznie dziedziczy style p i ul z globals */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16 border-y border-white/5 py-12">
          <div className="space-y-6">
            <h5 className="text-vizia-red text-xs">System</h5>
            <ul className="list-none p-0">
              <li><Link href="/#products" className="hover:text-white">Kolekcja</Link></li>
              <li><Link href="/custom" className="hover:text-white">Custom Division</Link></li>
              <li><Link href="/archive" className="hover:text-white">Archiwum</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h5 className="text-vizia-red text-xs">Social</h5>
            <ul className="list-none p-0">
              <li><a href="#" className="hover:text-white">Instagram</a></li>
              <li><a href="#" className="hover:text-white">Facebook</a></li>
            </ul>
          </div>

          <div className="space-y-6 col-span-2">
            <h5 className="text-vizia-red text-xs">Kontakt</h5>
            <p className="font-bold uppercase tracking-widest text-zinc-400">
              contact@vizia-lab.com
            </p>
          </div>
        </div>

        {/* Bottom bar - korzysta z klasy .text-data */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-data">
            © {currentYear} VIZIA LAB // ALL RIGHTS RESERVED
          </div>
          
          <div className="flex gap-8">
            <Link href="/privacy" className="text-data hover:text-white transition-colors">
              Polityka Prywatności
            </Link>
            <Link href="/terms" className="text-data hover:text-white transition-colors">
              Regulamin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};