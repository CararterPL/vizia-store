import localFont from 'next/font/local'
import "../styles/globals.css"

// Zostaw tylko swój lokalny font, jeśli go używasz
const zalando = localFont({
  src: './fonts/ZalandoSans-Variable.woff2', // upewnij się, że ścieżka jest poprawna
  variable: '--font-zalando',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body className={`${zalando.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}