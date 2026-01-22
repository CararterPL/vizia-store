import localFont from 'next/font/local'
import { JetBrains_Mono } from 'next/font/google'
import "../styles/globals.css";

// Konfiguracja Zalando Sans SemiExpanded (Variable)
const zalando = localFont({
  src: [
    {
      path: '../../public/fonts/ZalandoSansSemiExpanded-VariableFont.ttf',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ZalandoSansSemiExpanded-Italic-VariableFont.ttf',
      style: 'italic',
    },
  ],
  variable: '--font-brand', // Mapowanie na zmienną CSS
})

const jetbrains = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-mono' 
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body className={`${zalando.variable} ${jetbrains.variable} font-brand antialiased bg-[#020202]`}>
        {children}
      </body>
    </html>
  )
}