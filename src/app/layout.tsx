"use client"

import { useState, useEffect } from "react"
import localFont from 'next/font/local'
import "../styles/globals.css"
import { Header } from "../components/layout/Header"
import { Footer } from "../components/layout/Footer"
import { CartDrawer } from "../components/cart/CartDrawer"
import { CartProvider } from "../context/CartContext"

const zalando = localFont({
  src: '../../public/fonts/ZalandoSansSemiExpanded-VariableFont.ttf',
  variable: '--font-zalando',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false)

  // FORCE UNLOCK: Ten skrypt walczy z bibliotekami UI o dostęp do dotyku
  useEffect(() => {
    const unlockTouch = () => {
      // Jeśli koszyk jest zamknięty, siłowo usuwamy wszelkie blokady pointer-events
      if (!isCartOpen) {
        document.documentElement.style.pointerEvents = 'auto'
        document.body.style.pointerEvents = 'auto'
        document.body.style.overflowY = 'auto'
        document.body.style.touchAction = 'auto'
        
        // Niektóre biblioteki Medusa/HeadlessUI dodają styl inline na <html>
        document.documentElement.style.overflow = 'auto'
      }
    };

    unlockTouch();
    // Powtarzamy po 500ms, aby nadpisać spóźnione skrypty bibliotek UI
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
      {/* Dodaliśmy pointer-events-auto, aby upewnić się, że body zawsze przyjmuje dotyk */}
      <body className="bg-vizia-black text-white antialiased pointer-events-auto">
        <CartProvider>
          <Header onCartClick={() => setIsCartOpen(true)} />
          
          <div className="relative flex flex-col min-h-screen">
            <main id="main-content" className="flex-grow relative">
              {children}
            </main>
            <Footer />
          </div>

          {/* Renderowanie warunkowe to jedyny sposób, by HeadlessUI nie blokował scrolla w tle */}
          {isCartOpen && (
            <CartDrawer 
              isOpen={isCartOpen} 
              onClose={() => setIsCartOpen(false)} 
            />
          )}
        </CartProvider>
      </body>
    </html>
  )
}