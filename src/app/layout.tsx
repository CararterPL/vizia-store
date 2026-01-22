"use client"

import { useState } from "react"
import localFont from 'next/font/local'
import "../styles/globals.css"
import { Header } from "../components/layout/Header"
import { Footer } from "../components/layout/Footer"
import { CartDrawer } from "../components/cart/CartDrawer"
import { CartProvider } from "../context/CartContext"

// Konfiguracja fontu
const zalando = localFont({
  src: '../../public/fonts/ZalandoSansSemiExpanded-VariableFont.ttf',
  variable: '--font-zalando',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Stan widoczności panelu koszyka (otwarty/zamknięty)
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <html lang="pl">
      <body className={`${zalando.variable} antialiased bg-vizia-black`}>
        {/* Owijamy całą aplikację w CartProvider. 
            Dzięki temu każda karta produktu będzie mogła "wysłać" dane do koszyka.
        */}
        <CartProvider>
          {/* Header z funkcją otwierania panelu */}
          <Header onCartClick={() => setIsCartOpen(true)} />
          
          {/* Główna treść strony */}
          {children}
          
          <Footer />

          {/* Panel koszyka (Drawer) */}
          <CartDrawer 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
          />
        </CartProvider>
      </body>
    </html>
  )
}