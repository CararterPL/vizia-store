"use client"

import React, { useEffect, useState } from "react"

export default function ViziaHome() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const products = [
    { id: '911', name: 'GT3 RS // NOCNA ZMIANA', color: 'Reflective Red', left: 42 },
    { id: 'G700', name: 'G-BRABUS // STEALTH', color: 'Reflective White', left: 12 },
    { id: 'GTD', name: 'MUSTANG // DARK HORSE', color: 'Reflective Amber', left: 88 },
    { id: 'GP3', name: 'MINI JCW // GHOST', color: 'Reflective White', left: 65 }
  ];

  return (
    <main className="relative min-h-screen bg-[#020202] text-white overflow-x-hidden selection:bg-red-600 font-mono">
      
      {/* --- WARSTWY TŁA --- */}
      <div className="fixed inset-0 pointer-events-none z-[99] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] contrast-150"></div>
      <div 
        className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(220, 38, 38, 0.08), transparent 80%)`
        }}
      ></div>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex flex-col justify-between p-6 md:p-10 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0 grayscale opacity-40">
          <img src="/images/vizia-bg.png" className="w-full h-full object-cover" alt="Vizia Background" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]"></div>
        </div>

        <nav className="relative z-20 flex justify-between items-start">
          <div className="group cursor-pointer">
            <h1 className="text-4xl font-extrabold italic tracking-tighter uppercase leading-none font-syne">
              VIZIA<span className="text-red-600">_</span>
            </h1>
            <p className="text-[7px] tracking-[0.6em] text-zinc-500 uppercase font-bold mt-2">Kraków // Poland</p>
          </div>
          <div className="flex gap-12 items-center text-[10px] tracking-widest uppercase font-bold">
            <span className="hover:text-red-600 cursor-pointer transition-colors">Kolekcje</span>
            <span className="bg-white text-black px-6 py-2 hover:bg-red-600 hover:text-white transition-all cursor-pointer">
              Koszyk (0)
            </span>
          </div>
        </nav>

        <div className="relative z-20 max-w-5xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-red-600"></div>
            <p className="text-red-600 text-[10px] font-black tracking-[0.6em] uppercase italic">Drop 001 // Night Icons</p>
          </div>
          <h2 className="text-[11vw] md:text-[9vw] font-extrabold italic uppercase leading-[0.8] tracking-[-0.04em] font-syne">
            Niewidoczni <br /> 
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>W Dzień.</span>
          </h2>
          <p className="max-w-md text-zinc-400 text-[11px] mt-12 leading-relaxed uppercase tracking-[0.2em] font-bold italic">
            Techniczna odzież automotive. <br />
            Aktywne odblaski 3D. Limitacja 99 sztuk. <br />
            Bez powtórnych dropów.
          </p>
        </div>

        <div className="relative z-20 flex justify-between items-end border-t border-white/10 pt-8 text-[8px] text-zinc-600 tracking-[0.5em] uppercase">
          <p>System Status: Operacyjny</p>
          <p className="text-white font-bold italic">© 2026 VIZIA_LAB</p>
        </div>
      </section>

      {/* --- GRID PRODUKTÓW (2 Kolumny HD) --- */}
      <section className="relative z-10 py-40 px-6 md:px-10 max-w-[1500px] mx-auto">
        <div className="flex flex-wrap -mx-4">
          {products.map((car) => (
            <div key={car.id} className="w-full md:w-1/2 px-4 mb-20 group">
              <div className="relative bg-zinc-950 border border-white/5 transition-all duration-700 group-hover:border-red-600/50">
                <div className="relative aspect-[16/10] overflow-hidden">
                   <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                      <span className="text-[12vw] font-black italic uppercase font-syne">{car.id}</span>
                   </div>
                   <div className="absolute inset-0 flex items-center justify-center z-10">
                      <p className="text-zinc-800 text-6xl font-black italic group-hover:text-white transition-all duration-1000 group-hover:drop-shadow-[0_0_20px_rgba(220,38,38,0.3)] font-syne">
                        {car.id}_UNIT
                      </p>
                   </div>
                   <div className="absolute top-6 left-6 z-20 bg-black/80 backdrop-blur-md px-4 py-2 border-l border-red-600">
                      <p className="text-[8px] text-zinc-500 tracking-widest uppercase mb-1">Dostępność</p>
                      <p className="text-xs font-bold italic">{car.left} / 99</p>
                   </div>
                   <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <button className="bg-white text-black px-12 py-5 text-[10px] font-black uppercase tracking-[0.5em] -skew-x-12 hover:bg-red-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0">
                        Konfiguruj VIN
                      </button>
                   </div>
                </div>
                <div className="p-8 flex justify-between items-center bg-black border-t border-white/5">
                  <div>
                    <h4 className="text-3xl font-extrabold italic uppercase tracking-tighter group-hover:text-red-600 transition-colors font-syne">{car.name}</h4>
                    <p className="text-[8px] text-zinc-600 tracking-[0.4em] uppercase font-bold mt-2">Seria 001 // Projekt: {car.color}</p>
                  </div>
                  <p className="text-3xl font-light italic text-zinc-200 tracking-tighter font-syne">
                    259<span className="text-xs ml-1 text-red-600 font-bold uppercase">pln</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- ATUTY: SPECYFIKACJA --- */}
      <section className="relative z-10 py-32 px-6 md:px-10 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
            <h3 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] font-syne">
              Inżynieria <br /> <span className="text-red-600">Tekstyliów.</span>
            </h3>
            <p className="text-xs md:text-sm text-zinc-500 uppercase tracking-[0.3em] font-bold italic leading-loose self-end font-mono">
              VIZIA to nie odzież reklamowa. To precyzyjnie zaprojektowane jednostki, stworzone do przetrwania setek nocnych przejazdów i intensywnej eksploatacji.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { t: "SPEC-01: OPTYKA", d: "Technologia odblaskowa 3M™. Grafika widoczna z odległości 150m po naświetleniu reflektorem." },
              { t: "SPEC-02: BAZA", d: "Gęsty splot bawełny czesanej (200g). Materiał 'premium feel' – ciężki, stabilny i miękki w dotyku." },
              { t: "SPEC-03: VIN", d: "Unikalna personalizacja. Możliwość wyboru własnego numeru bocznego dla członków THE NIGHT RUN GRID." }
            ].map((spec, i) => (
              <div key={i} className="border-l-4 border-black pl-8 group">
                <h5 className="text-2xl font-black italic uppercase mb-4 group-hover:text-red-600 transition-colors font-syne">{spec.t}</h5>
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest leading-relaxed font-bold font-mono">{spec.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER --- */}
      <section className="relative z-10 py-40 px-6 md:px-10 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h4 className="text-5xl font-black italic uppercase tracking-tighter mb-8 font-syne">Dołącz do <span className="text-red-600">Gridu.</span></h4>
          <p className="text-[10px] text-zinc-400 uppercase tracking-[0.4em] mb-12 font-bold italic font-mono">
            Zapisz się, aby otrzymać priorytetowy dostęp do nowych dropów <br /> i limitowanych numerów VIN.
          </p>
          <form className="flex flex-col md:flex-row gap-0 group">
            <input 
              type="email" 
              placeholder="TWÓJ_EMAIL_OPERACYJNY" 
              className="flex-1 bg-zinc-900 border border-zinc-800 px-8 py-6 text-[10px] font-mono focus:border-red-600 outline-none uppercase text-white"
            />
            <button className="bg-red-600 text-white px-10 py-6 text-[11px] font-black uppercase italic tracking-[0.4em] hover:bg-white hover:text-black transition-all font-syne">
              Uzyskaj Dostęp
            </button>
          </form>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 py-20 px-6 md:px-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[8px] tracking-[0.5em] text-zinc-600 uppercase font-bold">
        <p>VIZIA LAB // KRAKÓW // POLSKA</p>
        <div className="flex gap-10">
          <span className="hover:text-red-600 cursor-pointer transition-colors">Regulamin</span>
          <span className="hover:text-red-600 cursor-pointer transition-colors">Instagram</span>
        </div>
        <p>Status: Połączenie Szyfrowane</p>
      </footer>
    </main>
  )
}