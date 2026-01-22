'use client';

import React from 'react';
import { Header } from "../../../components/layout/Header";
import { Footer } from "../../../components/layout/Footer";
import { ProductGallery } from "../../../components/product/ProductGallery";
import { ProductInfo } from "../../../components/product/ProductInfo";
import { CrossSelling } from "../../../components/product/CrossSelling";

export default function ProductPage() {
  return (
    <div className="bg-vizia-black min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          {/* Główny grid produktu */}
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-24 items-start">
              
            {/* LEWA STRONA: Galeria (Zawsze pierwsza na mobile) */}
            <div className="w-full order-1 lg:order-1">
              <ProductGallery />
            </div>

            {/* PRAWA STRONA: Info (Druga na mobile, sticky na desktopie) */}
            <div className="w-full order-2 lg:order-2 lg:sticky lg:top-32">
              <ProductInfo />
            </div>

          </div>

          {/* SEKACJA POD PRODUKTEM: Cross Selling (Klocek 3) */}
          <div className="mt-32 border-t border-white/5 pt-24">
            <h4 className="mb-12">Uzupełnij garaż</h4>
            <CrossSelling />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}