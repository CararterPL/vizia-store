// Skrócony przykład poprawnego Nav
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Nav({ countryCode }: { countryCode: string }) {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
      <nav className="flex items-center justify-between px-6 py-4">
        <LocalizedClientLink 
          href="/" 
          className="font-syne text-2xl font-bold tracking-tighter uppercase text-white"
        >
          VIZIA<span className="text-red-600">.</span>
        </LocalizedClientLink>
        
        {/* Reszta nawigacji */}
      </nav>
    </header>
  )
}