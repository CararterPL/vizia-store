import "../styles/globals.css"
import { Syne, JetBrains_Mono } from "next/font/google"

const syne = Syne({ 
  subsets: ["latin", "latin-ext"], 
  variable: "--font-syne",
  weight: ["400", "700", "800"] 
})

const jetbrains = JetBrains_Mono({ 
  subsets: ["latin", "latin-ext"], 
  variable: "--font-mono" 
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={`${syne.variable} ${jetbrains.variable}`}>
      <body className="font-mono">
        {children}
      </body>
    </html>
  )
}