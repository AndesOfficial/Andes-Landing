import React from 'react';
import { FaWeightHanging, FaTshirt, FaLayerGroup } from 'react-icons/fa';

const ServiceFilters = ({
  serviceModes,
  serviceCategories,
  selectedMode,
  selectedCategory,
  onModeChange,
  onCategoryChange
}) => {

  // Helper to get icon for mode
  const getModeIcon = (key) => {
    if (key === 'kg') return <FaWeightHanging className="mr-2 text-lg" />;
    if (key === 'piece') return <FaTshirt className="mr-2 text-lg" />;
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      {/* Service Type Section */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          Select Service Type
        </h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => onModeChange('all')}
            className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center shadow-sm ${selectedMode === 'all'
              ? 'bg-brand text-white shadow-brand/30 transform scale-105'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-brand/40 hover:text-brand'
              }`}
          >
            <FaLayerGroup className="mr-2 text-lg" />
            All
          </button>

          {serviceModes.map(mode => (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.key)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center shadow-sm ${selectedMode === mode.key
                ? 'bg-brand text-white shadow-brand/30 transform scale-105'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-brand/40 hover:text-brand'
                }`}
            >
              {getModeIcon(mode.key)}
              {mode.name}
            </button>
          ))}
        </div>
      </div>

      {/* Category Section */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Filter by Category</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onCategoryChange('all')}
            className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center shadow-sm ${selectedCategory === 'all'
              ? 'bg-brand text-white shadow-brand/30 transform scale-105'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-brand/40 hover:text-brand'
              }`}
          >
            All Categories
          </button>

          {serviceCategories.map(category => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.key)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center shadow-sm ${selectedCategory === category.key
                ? 'bg-brand text-white shadow-brand/30 transform scale-105'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-brand/40 hover:text-brand'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceFilters;