'use client';

import { useNRG } from '../../context/NRGContext';
import Link from 'next/link';
import { Button } from './Button';

export const NRGOverlay = () => {
  const { hideoutUnlocked } = useNRG();

  if (!hideoutUnlocked) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="max-w-md w-full p-8 border border-red-500 bg-black shadow-[0_0_50px_rgba(239,68,68,0.2)] text-center space-y-6 mx-4">
        <div className="space-y-2">
          <div className="text-red-500 font-mono text-[10px] tracking-[0.4em] uppercase animate-pulse">
            Protocol_Breach_Detected
          </div>
          <h2 className="text-3xl font-brand font-black italic text-white uppercase tracking-tighter">
            Hideout Access Granted
          </h2>
          <p className="text-zinc-500 font-mono text-[9px] leading-relaxed uppercase tracking-widest">
            Nawiązano połączenie z zastrzeżonymi jednostkami serii V-HIDEOUT. 
            Dostęp ograniczony czasowo.
          </p>
        </div>

        <div className="pt-4">
          {/* Tutaj wpisz slug Twojego głównego produktu Hideout */}
          <Link href="/product/vizia-hideout-prototype">
            <Button 
              variant="cta" 
              className="w-full py-6 bg-red-600 hover:bg-red-700 text-black font-black italic tracking-widest"
              onClick={() => {
                // Opcjonalnie: można tu dodać logikę zamykania pop-upa po kliknięciu
              }}
            >
              ENTER_HIDEOUT_GRID
            </Button>
          </Link>
          
          <button 
            onClick={() => window.location.reload()} // Prosty sposób na reset sesji/zamknięcie
            className="mt-6 text-[8px] font-mono text-zinc-700 hover:text-white transition-colors uppercase tracking-[0.3em]"
          >
            [ Terminate_Session ]
          </button>
        </div>
      </div>
    </div>
  );
};