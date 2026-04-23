// src/app/regulamin/page.tsx
import React from 'react';

export default function RegulaminPage() {
  const COMPANY = {
    name: "Viper Media Krystian Żmijewski",
    nip: "5661958346",
    address: "ul. 11 Pułku Ułanów Legionowych 5/2, 06-400 Ciechanów",
    email: "biuro@vipermedia.pl",
    phone: "573 982 226"
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-400 font-sans selection:bg-[rgb(255,19,58)] selection:text-white">
      <main className="max-w-4xl mx-auto px-6 py-24 md:py-32">
        
        {/* HEADER */}
        <header className="mb-20 border-l-2 border-[rgb(255,19,58)] pl-6">
          <p className="text-[10px] font-mono tracking-[0.4em] text-[rgb(255,19,58)] uppercase mb-2">
            Vizia_Core // Legal_Protocol
          </p>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
            Regulamin <span className="text-zinc-600 text-2xl md:text-4xl italic font-light">Sklepu</span>
          </h1>
        </header>

        <div className="space-y-12 text-sm leading-relaxed">
          
          {/* §1 DANE FIRMY */}
          <section>
            <h2 className="text-white font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-3">
              <span className="text-[rgb(255,19,58)]">01</span> // Dane firmy
            </h2>
            <div className="bg-zinc-900/30 p-6 border border-white/5 font-mono text-[13px]">
              <p><span className="text-zinc-500 uppercase">Owner:</span> <span className="text-white">{COMPANY.name}</span></p>
              <p><span className="text-zinc-500 uppercase">NIP:</span> <span className="text-white">{COMPANY.nip}</span></p>
              <p><span className="text-zinc-500 uppercase">Loc:</span> <span className="text-white">{COMPANY.address}</span></p>
              <p><span className="text-zinc-500 uppercase">Contact:</span> <span className="text-[rgb(255,19,58)]">{COMPANY.email}</span></p>
            </div>
          </section>

          {/* §2 POSTANOWIENIA OGÓLNE */}
          <section>
            <h2 className="text-white font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-3">
              <span className="text-[rgb(255,19,58)]">02</span> // Postanowienia ogólne
            </h2>
            <p>
              Niniejszy regulamin określa zasady korzystania ze sklepu internetowego VIZIA działającego pod adresem <span className="text-white font-bold">viziawear.com</span>. 
              Właścicielem Sklepu jest {COMPANY.name}. Wszystkie produkty są autorskimi projektami Vince&apos;a Carsona.
            </p>
          </section>

          {/* §3 SPECYFIKA TOWARU - KLUCZOWE */}
          <section className="bg-white/5 p-6 border-l border-[rgb(255,19,58)]">
            <h2 className="text-white font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-3">
              <span className="text-[rgb(255,19,58)]">03</span> // Specyfika Towaru (Made-to-Order)
            </h2>
            <div className="space-y-3">
              <p>
                Towary oferowane w Sklepie są <span className="text-white font-bold italic underline">nieprefabrykowane</span> i produkowane na indywidualne zamówienie Klienta.
              </p>
              <p>
                Każdy produkt posiada zindywidualizowane cechy, w tym <span className="text-white">unikalny numer identyfikacyjny VIN</span>, co czyni go produktem wykonanym ściśle według specyfikacji konsumenta.
              </p>
            </div>
          </section>

          {/* §4 DOSTAWA & PŁATNOŚCI */}
          <section>
            <h2 className="text-white font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-3">
              <span className="text-[rgb(255,19,58)]">04</span> // Logistics & Payment
            </h2>
            <p>
              Proces produkcji rozpoczyna się po zaksięgowaniu wpłaty przez system <span className="text-white font-bold uppercase">Stripe</span>. 
              Ze względu na zindywidualizowany proces wytwórczy, standardowy czas dostawy wynosi od <span className="text-white underline">14 do 21 dni roboczych</span>. 
              Ceny produktów są cenami brutto i zawierają koszt dostawy na terenie RP.
            </p>
          </section>

          {/* §6 PRAWO ODSTĄPIENIA - KLUCZOWE */}
          <section className="border border-[rgb(255,19,58)]/30 p-6">
            <h2 className="text-[rgb(255,19,58)] font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-3">
              <span className="bg-[rgb(255,19,58)] text-black px-1 font-bold">05</span> // Brak prawa do zwrotu
            </h2>
            <div className="space-y-4">
              <p className="text-white">
                Zgodnie z <span className="font-bold">art. 38 pkt 3 ustawy o prawach konsumenta</span>, prawo do odstąpienia od umowy zawartej na odległość 
                <span className="text-[rgb(255,19,58)] font-bold"> NIE PRZYSŁUGUJE</span> Klientowi w odniesieniu do towarów wyprodukowanych według specyfikacji konsumenta.
              </p>
              <p className="text-xs italic opacity-70">
                Oznacza to, że produkty personalizowane numerem VIN oraz produkowane w modelu Made-to-Order nie podlegają zwrotowi bez podania przyczyny. Reklamacje z tytułu wad fabrycznych pozostają w pełnej mocy.
              </p>
            </div>
          </section>

          {/* §7 REKLAMACJE */}
          <section>
            <h2 className="text-white font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-3">
              <span className="text-[rgb(255,19,58)]">06</span> // Service Protocol
            </h2>
            <p>
              Reklamacje dotyczące niezgodności towaru z umową należy zgłaszać drogą elektroniczną na adres: <span className="text-white font-mono">{COMPANY.email}</span>. 
              Sprzedawca rozpatrzy reklamację w terminie 14 dni.
            </p>
          </section>

          {/* FOOTER */}
          <footer className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[9px] font-mono uppercase tracking-[0.3em] opacity-40">
              System_Status: Operational // Viziawear
            </div>
            <div className="text-[9px] font-mono uppercase tracking-[0.3em]">
              © 2024 VIZIA // Designed by Vince Carson
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}