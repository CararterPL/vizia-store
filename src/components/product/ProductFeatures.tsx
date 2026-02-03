'use client';

import React from 'react';

const features = [
  {
    tag: "FABRIC_TECH",
    title: "Danish Interlock 220g",
    desc: "Gęsty, mięsisty splot, który trzyma formę. To nie jest zwykły t-shirt – to techniczna baza pod Twój codzienny styl."
  },
  {
    tag: "VISIBILITY_LOG",
    title: "GhostTrace Reflective",
    desc: "Dyskretny branding widoczny tylko w bezpośrednim świetle. System odblasków przód/tył dla bezpieczeństwa w nocy."
  },
  {
    tag: "UNIT_AUTHENTICITY",
    title: "Permanent VIN Identity",
    desc: "Unikalny 17-znakowy numer seryjny naniesiony na stałe. Twój egzemplarz jest jeden na milion. Dosłownie."
  }
];

export const ProductFeatures = () => (
  <section className="relative z-20 bg-black py-24 px-6 md:px-14 lg:px-24 border-t border-white/10">
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 uppercase font-mono italic">
      {features.map((f) => (
        <div key={f.tag} className="space-y-4 group">
          <span className="text-vizia-red text-[10px] tracking-[0.4em] font-bold group-hover:animate-pulse">
            // {f.tag}
          </span>
          <h4 className="text-xl font-brand font-black italic tracking-tighter text-white">
            {f.title}
          </h4>
          <p className="text-zinc-500 text-[12px] leading-relaxed tracking-tight not-italic lowercase font-sans max-w-[300px]">
            {f.desc}
          </p>
        </div>
      ))}
    </div>
  </section>
);