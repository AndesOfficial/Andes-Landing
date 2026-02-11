import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Button = ({
  children,
  variant = 'primary',
  isLoading = false,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 font-semibold rounded-xl transition-all duration-300 ease-in-out focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]";

  const variants = {
    primary: "bg-brand text-white hover:bg-brand-dark shadow-lg shadow-brand/30 hover:shadow-brand/40",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300",
    outline: "bg-transparent border-2 border-brand text-brand hover:bg-brand/5",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/30",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <FaSpinner className="animate-spin mr-2" />}
      {children}
    </button>
  );
};

export default Button;
