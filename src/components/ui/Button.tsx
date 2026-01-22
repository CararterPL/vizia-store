import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'cta';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = ({ variant = 'primary', size = 'md', children, className = '', ...props }: ButtonProps) => {
  const baseStyles = "font-brand font-black italic uppercase tracking-[0.2em] transition-all duration-300 transform active:scale-95 disabled:opacity-50";
  
  const variants = {
    // Solidny, biały przycisk - główna akcja
    primary: "bg-white text-black hover:bg-vizia-red hover:text-white",
    // Tylko obramowanie - akcja drugorzędna
    ghost: "bg-transparent border border-white/20 text-white hover:border-vizia-red hover:text-vizia-red",
    // Czerwony, agresywny - najważniejsze akcje (np. KUP TERAZ)
    cta: "bg-vizia-red text-white shadow-[0_0_20px_rgba(255,19,58,0.3)] hover:shadow-[0_0_30px_rgba(255,19,58,0.5)] hover:-skew-x-12"
  };

  const sizes = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-8 py-4 text-xs",
    lg: "px-12 py-6 text-sm md:text-base"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};