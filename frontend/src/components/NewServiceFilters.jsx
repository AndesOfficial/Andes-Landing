import React from 'react';

const ServiceFilters = ({ 
  serviceModes, 
  serviceCategories, 
  selectedMode, 
  selectedCategory, 
  onModeChange, 
  onCategoryChange 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Filter by Mode</h3>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => onModeChange('all')} 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedMode === 'all' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Modes
          </button>
          {serviceModes.map(mode => (
            <button 
              key={mode.id} 
              onClick={() => onModeChange(mode.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedMode === mode.key 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {mode.name}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Filter by Category</h3>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => onCategoryChange('all')} 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === 'all' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Categories
          </button>
          {serviceCategories.map(category => (
            <button 
              key={category.id} 
              onClick={() => onCategoryChange(category.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.key 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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