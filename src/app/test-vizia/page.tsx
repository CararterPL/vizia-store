'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ShadowRaceList() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('collection', 'Shadow Race')
      
      if (data) setProducts(data)
      if (error) console.error('Błąd pobierania:', error)
    }

    fetchProducts()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-black text-white">
      {products.map((product) => (
        <div key={product.id} className="border border-zinc-800 p-6 rounded-lg hover:border-zinc-500 transition">
          <h2 className="text-2xl font-bold uppercase tracking-tighter">{product.name}</h2>
          <p className="text-zinc-300 text-sm mb-4">{product.collection}</p>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-zinc-400">BASE VIN</p>
              <p className="font-mono text-sm">{product.base_vin}</p>
            </div>
            <p className="text-xl font-bold">{product.price} PLN</p>
          </div>
          <button className="w-full mt-6 bg-white text-black py-3 font-black hover:bg-zinc-200 transition uppercase italic">
            Wybierz rozmiar i zamów
          </button>
        </div>
      ))}
    </div>
  )
}