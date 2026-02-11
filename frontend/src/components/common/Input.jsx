import React from 'react';

const Input = ({ label, error, type = "text", className = "", ...props }) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 transition-all duration-200 outline-none
          ${error
                        ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                        : 'border-slate-200 focus:border-brand focus:ring-4 focus:ring-brand/10 hover:border-slate-300'
                    } ${className}`}
                {...props}
            />
            {error && (
                <p className="mt-1.5 text-sm text-red-500 ml-1">{error}</p>
            )}
        </div>
    );
};

export default Input;
