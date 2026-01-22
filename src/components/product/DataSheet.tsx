const specs = [
  { id: "03", title: "Technical_Specifications", content: "280G Heavyweight-Combat Cotton. 3M™ Scotchlite™ 3D-Flex Reflectives. Industrial Boxy Fit." },
  { id: "04", title: "Logistics_&_Returns", content: "Personalized Unit. No returns as per VIZIA_LAB protocol." },
  { id: "05", title: "Deployment_Timeline", content: "Production: 3-5 days. Logistics: 1-2 days." }
];

export const DataSheet = () => (
  <div className="mb-16 border-t border-white/5">
    {specs.map((item) => (
      <details key={item.id} className="group border-b border-white/5 outline-none">
        <summary className="flex justify-between items-center py-6 cursor-pointer list-none hover:text-[#ff133a] transition-all duration-300">
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase italic font-mono text-zinc-500 group-open:text-[#ff133a]">
            {item.id} // {item.title}
          </span>
          <span className="text-2xl font-light group-open:rotate-45 transition-transform text-zinc-700">+</span>
        </summary>
        <div className="p-8 text-[11px] text-zinc-500 leading-relaxed uppercase tracking-[0.1em] font-mono border-l-2 border-[#ff133a]/30 bg-zinc-950/20">
          {item.content}
        </div>
      </details>
    ))}
  </div>
)