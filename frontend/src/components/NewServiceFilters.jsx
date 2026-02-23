import React from 'react';
import { FaLayerGroup, FaTshirt, FaShoePrints } from 'react-icons/fa';

/**
 * ServiceFilters Component
 * 
 * Provides category selection with two distinct layouts:
 * - 'horizontal' (Mobile): A scrollable row of tactile pills.
 * - 'vertical' (Desktop): A sticky sidebar list.
 */
const ServiceFilters = ({
  mainCategories = [],
  selectedMain,
  onMainChange,
  layout = 'horizontal',
}) => {

  const getMainIcon = (key) => {
    switch (key) {
      case 'general': return <FaLayerGroup />;
      case 'dry_cleaning': return <FaTshirt />;
      case 'shoe_cleaning': return <FaShoePrints />;
      default: return null;
    }
  };

  // 1. Desktop Sidebar Layout
  if (layout === 'vertical') {
    return (
      <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 p-6 sticky top-28">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Categories</h3>
        <div className="flex flex-col gap-2">
          {mainCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onMainChange(cat.key)}
              className={`px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center w-full text-left group ${selectedMain === cat.key
                ? 'bg-[#0089FF] text-white shadow-lg shadow-blue-500/20 translate-x-2'
                : 'bg-transparent text-slate-600 hover:bg-white hover:shadow-sm hover:translate-x-1'
                }`}
            >
              <span className={`text-lg mr-3 transition-transform duration-300 group-hover:scale-110 ${selectedMain === cat.key ? 'text-white' : 'text-[#0089FF] opacity-70'}`}>
                {getMainIcon(cat.key)}
              </span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 2. Mobile Pill Row Layout
  return (
    <div className="w-full">
      <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar scroll-smooth px-1">
        {mainCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onMainChange(cat.key)}
            className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black transition-all duration-300 border ${selectedMain === cat.key
              ? 'bg-[#0089FF] text-white border-[#0089FF] shadow-md scale-105 active:scale-95'
              : 'bg-white text-slate-600 border-slate-100 hover:bg-slate-50'
              }`}
          >
            <span className={selectedMain === cat.key ? 'text-white' : 'text-[#0089FF]'}>
              {getMainIcon(cat.key)}
            </span>
            <span className="uppercase tracking-tight">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceFilters;
