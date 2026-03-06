"use client"

import { useState, useEffect } from "react"
import localFont from 'next/font/local'
import Script from 'next/script'
import "../styles/globals.css"
import { Header } from "../components/layout/Header"
import { Footer } from "../components/layout/Footer"
import { CartDrawer } from "../components/cart/CartDrawer"
import { CartProvider } from "../context/CartContext"
import { NRGProvider } from "../context/NRGContext"
import { NRGOverlay } from "../components/ui/NRGOverlay"

const zalando = localFont({
  src: '../../public/fonts/ZalandoSansSemiExpanded-VariableFont.ttf',
  variable: '--font-zalando',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false)

  // FORCE UNLOCK: Naprawa blokad scrolla i dotyku po zamknięciu koszyka
  useEffect(() => {
    const unlockTouch = () => {
      if (!isCartOpen) {
        document.documentElement.style.pointerEvents = 'auto'
        document.body.style.pointerEvents = 'auto'
        document.body.style.overflowY = 'auto'
        document.body.style.touchAction = 'auto'
        document.documentElement.style.overflow = 'auto'
      }
    };
    unlockTouch();
    const timer = setTimeout(unlockTouch, 500);
    return () => clearTimeout(timer);
  }, [isCartOpen]);

  // Zarządzanie scrollem przy otwartym koszyku
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isCartOpen])

  return (
    <html lang="pl" className={zalando.variable} suppressHydrationWarning>
      <head>
        {/* Krytyczne: Style dla mapy InPost GeoWidget */}
        <link 
          rel="stylesheet" 
          href="https://geowidget.inpost.pl/sdk/for-javascript/lib/geowidget.min.css" 
        />
      </head>
      <body className="bg-vizia-black text-white antialiased pointer-events-auto">
        <NRGProvider>
          <CartProvider>
            <Header onCartClick={() => setIsCartOpen(true)} />
            
            <div className="relative flex flex-col min-h-screen">
              <main id="main-content" className="flex-grow relative">
                {children}
              </main>
              <Footer />
            </div>

            <NRGOverlay />

            <CartDrawer 
              isOpen={isCartOpen} 
              onClose={() => setIsCartOpen(false)} 
            />
            
            {/* Skrypt InPost ładowany po interakcji, aby nie blokować hydration */}
            
          </CartProvider>
        </NRGProvider>
      </body>
    </html>
  )
}