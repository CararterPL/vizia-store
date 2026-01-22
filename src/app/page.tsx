"use client"

import React, { useEffect, useState } from "react"
import { Hero } from "../components/home/Hero"
import { Manifesto } from "../components/home/Manifesto"
import { ProductGrid } from "../components/home/ProductGrid"
import { Blueprint } from "../components/home/Blueprint"
import { NightRunGrid } from "../components/home/NightRunGrid"
import { DesignerStory } from "../components/home/DesignerStory"
import { CustomDivision } from "../components/home/CustomDivision"

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <main className="relative min-h-screen bg-[#020202] text-white selection:bg-[#ff133a] font-mono overflow-x-hidden">
      {/* Dynamiczna Aura - zostaje tutaj, bo jest efektem wizualnym tylko dla strony głównej */}
      <div 
        className="fixed inset-0 pointer-events-none z-40 transition-opacity duration-500" 
        style={{ background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 19, 58, 0.04), transparent 80%)` }}
      ></div>

      {/* Sekcje zawartości */}
      <Hero />
      <Manifesto />
      <ProductGrid />
      <Blueprint />
      <NightRunGrid />
      <CustomDivision />
      <DesignerStory />
    </main>
  )
}