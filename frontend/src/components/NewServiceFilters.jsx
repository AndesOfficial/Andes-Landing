
import React, { useEffect } from 'react';
import { FaLayerGroup, FaTshirt, FaShoePrints, FaHome, FaMale, FaFemale, FaBoxOpen, FaWeightHanging } from 'react-icons/fa';

const ServiceFilters = ({
  mainCategories,
  subCategories,
  selectedMain,
  selectedSub,
  onMainChange,
  onSubChange,
  layout = 'horizontal', // 'horizontal' or 'vertical'

}) => {

  const getMainIcon = (key) => {
    switch (key) {
      case 'general': return <FaLayerGroup className="mr-2" />;
      case 'dry_cleaning': return <FaTshirt className="mr-2" />;
      case 'shoe_cleaning': return <FaShoePrints className="mr-2" />;
      default: return null;
    }
  };


  if (layout === 'vertical') {
    // Desktop Sidebar Layout
    return (
      <div className="space-y-6">
        {/* Categories */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-brand-soft border border-white/50 p-6">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Categories</h3>
          <div className="flex flex-col gap-3">
            {mainCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => onMainChange(cat.key)}
                className={`px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center w-full text-left group ${selectedMain === cat.key
                  ? 'bg-brand text-white shadow-lg shadow-brand/20 translate-x-2'
                  : 'bg-transparent text-slate-600 hover:bg-white/50 hover:translate-x-1'
                  }`}
              >
                <span className={`text-lg transition-transform duration-300 group-hover:scale-110 ${selectedMain === cat.key ? 'text-white' : 'text-brand opacity-80'}`}>
                  {getMainIcon(cat.key)}
                </span>
                <span className="ml-3">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Mobile/Horizontal Layout
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-8">
      {/* 1. Main Category Tabs */}
      <div className="mb-0">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Categories</h3>
        <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar md:flex-wrap md:overflow-hidden">
          {mainCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onMainChange(cat.key)}
              className={`flex-shrink-0 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center whitespace-nowrap ${selectedMain === cat.key
                ? 'bg-brand text-white shadow-lg shadow-brand/30 scale-105'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
            >
              {getMainIcon(cat.key)}
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceFilters;