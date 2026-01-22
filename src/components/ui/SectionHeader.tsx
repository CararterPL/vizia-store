import React from 'react';

interface SectionHeaderProps {
  tagline: string;
  title: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
}

export const SectionHeader = ({ 
  tagline, 
  title, 
  description, 
  className = "", 
  align = 'left' 
}: SectionHeaderProps) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-16 md:mb-20 ${isCenter ? 'text-center mx-auto' : ''} ${className}`}>
      {/* TAGLINE: Zawsze z prefixem // i w kolorze czerwonym */}
      <div className={`flex items-center gap-3 mb-4 ${isCenter ? 'justify-center' : ''}`}>
        {!isCenter && <span className="w-8 h-[1px] bg-vizia-red/50"></span>}
        <span className="text-data text-vizia-red tracking-[0.4em] uppercase">
          // {tagline.replace('// ', '')}
        </span>
      </div>

      {/* TYTUŁ: H2 - Automatycznie Black Italic */}
      <h2 className="text-5xl md:text-8xl mb-6">
        {title}
        <span className="text-vizia-red">.</span>
      </h2>

      {/* OPIS: Opcjonalny, z limitowaną szerokością dla czytelności */}
      {description && (
        <p className={`max-w-2xl text-zinc-500 text-sm md:text-base leading-relaxed ${isCenter ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
};