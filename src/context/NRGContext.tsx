'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const NRGContext = createContext({ isNRG: false, hideoutUnlocked: false });

export const NRGProvider = ({ children }: { children: React.ReactNode }) => {
  const [isNRG, setIsNRG] = useState(false);
  const [hideoutUnlocked, setHideoutUnlocked] = useState(false);
  const [keys, setKeys] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    // --- CZĘŚĆ 1: ACCESS TOKEN (Uprawnienia) ---
    const params = new URLSearchParams(window.location.search);
    const token = params.get('nrg');
    const VALID_TOKEN = 'vizia_protocol_nrg'; // Twój klucz dla subskrybentów

    if (token === VALID_TOKEN || localStorage.getItem('nrg_active') === 'true') {
      setIsNRG(true);
      localStorage.setItem('nrg_active', 'true');
      if (token) window.history.replaceState({}, '', window.location.pathname);
    }

    // --- CZĘŚĆ 2: EASTER EGG (Sekwencja NRG) ---
    const handleKeyDown = (e: KeyboardEvent) => {
      const newKeys = (keys + e.key).slice(-3).toUpperCase();
      setKeys(newKeys);

      if (newKeys === 'NRG') {
        setHideoutUnlocked(true);
        // Opcjonalnie: od razu przekieruj do kolekcji Hideout lub pokaż popup
        console.log("HIDEOUT_PROTOCOL_INITIATED");
        // router.push('/collection/hideout'); // Jeśli masz taką stronę
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keys, router]);

  return (
    <NRGContext.Provider value={{ isNRG, hideoutUnlocked }}>
      {children}
    </NRGContext.Provider>
  );
};

export const useNRG = () => useContext(NRGContext);