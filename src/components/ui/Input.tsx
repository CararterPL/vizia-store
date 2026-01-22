import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = ({ label, error, ...props }: InputProps) => (
  <div className="flex flex-col gap-2 w-full">
    <label className="text-data text-[8px] flex justify-between">
      {label}
      {error && <span className="text-vizia-red animate-pulse">ERROR_UNAUTHORIZED</span>}
    </label>
    <input {...props} />
  </div>
);