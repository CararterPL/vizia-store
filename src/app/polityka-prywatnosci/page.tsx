// src/app/polityka-prywatnosci/page.tsx
import React from 'react';

export default function PolitykaPrywatnosciPage() {
  const COMPANY = {
    name: "Viper Media Krystian Żmijewski",
    nip: "5661958346",
    address: "ul. 11 Pułku Ułanów Legionowych 5/2, 06-400 Ciechanów",
    email: "biuro@vipermedia.pl", // Tu możesz wpisać też support@viziawear.com
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-400 font-sans selection:bg-[rgb(255,19,58)] selection:text-white">
      <main className="max-w-4xl mx-auto px-6 py-24 md:py-32">
        
        {/* HEADER */}
        <header className="mb-20 border-l-2 border-[rgb(255,19,58)] pl-6">
          <p className="text-[10px] font-mono tracking-[0.4em] text-[rgb(255,19,58)] uppercase mb-2">
            Data_Protection // Privacy_Protocol
          </p>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
            Polityka <span className="text-zinc-600 text-2xl md:text-4xl italic font-light">Prywatności</span>
          </h1>
        </header>

        <div className="space-y-12 text-sm leading-relaxed">
          
          {/* SEKCJA 01 - ADMINISTRATOR */}
          <section>
            <h2 className="text-white font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-3">
              <span className="text-[rgb(255,19,58)]">01</span> // Administrator Danych
            </h2>
            <p>
              Administratorem danych osobowych zbieranych za pośrednictwem sklepu viziawear.com jest 
              <span className="text-white font-bold"> {COMPANY.name}</span> z siedzibą w {COMPANY.address}, 
              NIP: {COMPANY.nip}. Dane przetwarzane są zgodnie z rozporządzeniem RODO.
            </p>
          </section>

          {/* SEKCJA 02 - CEL PRZETWARZANIA */}
          <section>
            <h2 className="text-white font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-3">
              <span className="text-[rgb(255,19,58)]">02</span> // Cel i zakres danych
            </h2>
            <p>
              Twoje dane (imię, nazwisko, adres e-mail, adres dostawy, numer telefonu) przetwarzane są wyłącznie w celu:
            </p>
            <ul className="list-none space-y-2 mt-4 ml-4">
              <li className="flex items-start gap-2 italic">
                <span className="text-[rgb(255,19,58)] font-mono">&gt;</span> Realizacji zamówienia w modelu Made-to-Order.
              </li>
              <li className="flex items-start gap-2 italic">
                <span className="text-[rgb(255,19,58)] font-mono">&gt;</span> Obsługi płatności i procesów księgowych.
              </li>
              <li className="flex items-start gap-2 italic">
                <span className="text-[rgb(255,19,58)] font-mono">&gt;</span> Komunikacji technicznej dotyczącej statusu produkcji (VIN status).
              </li>
            </ul>
          </section>

          {/* SEKCJA 03 - ODBIORCY DANYCH */}
          <section className="bg-white/5 p-6 border-l border-zinc-700">
            <h2 className="text-white font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-3">
              <span className="text-[rgb(255,19,58)]">03</span> // Odbiorcy danych (Transfer)
            </h2>
            <p>
              W celu poprawnej realizacji Twojego zamówienia, dane mogą być udostępniane następującym podmiotom:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="border border-white/5 p-4">
                <p className="text-white font-mono text-[11px] uppercase mb-1">Payment_Gate:</p>
                <p className="text-[12px]">Stripe, Inc. (Obsługa płatności online)</p>
              </div>
              <div className="border border-white/5 p-4">
                <p className="text-white font-mono text-[11px] uppercase mb-1">Logistics_Core:</p>
                <p className="text-[12px]">Firmy kurierskie (InPost, DPD, DHL)</p>
              </div>
            </div>
          </section>

          {/* SEKCJA 04 - PLIKI COOKIES */}
          <section>
            <h2 className="text-white font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-3">
              <span className="text-[rgb(255,19,58)]">04</span> // Cookies & Tracking
            </h2>
            <p>
              Sklep VIZIA wykorzystuje pliki cookies w celu zapewnienia prawidłowego działania koszyka oraz w celach analitycznych. 
              Możesz zarządzać plikami cookies bezpośrednio w ustawieniach swojej przeglądarki. Wyłączenie plików cookies może wpłynąć na funkcjonalność "Bagażnika".
            </p>
          </section>

          {/* SEKCJA 05 - TWOJE PRAWA */}
          <section className="border border-white/10 p-6 italic">
            <h2 className="text-white font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-3">
              <span className="text-[rgb(255,19,58)]">05</span> // User Rights
            </h2>
            <p>
              Masz prawo do wglądu w swoje dane, ich poprawiania, żądania ograniczenia przetwarzania lub całkowitego usunięcia (prawo do bycia zapomnianym). 
              Wszelkie prośby w tym zakresie prosimy kierować na: <span className="text-white font-mono">{COMPANY.email}</span>.
            </p>
          </section>

          {/* FOOTER */}
          <footer className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[9px] font-mono uppercase tracking-[0.3em] opacity-40">
              Encryption_Active // Privacy_Secure
            </div>
            <div className="text-[9px] font-mono uppercase tracking-[0.3em]">
              © 2024 VIZIA // Vince Carson Systems
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}