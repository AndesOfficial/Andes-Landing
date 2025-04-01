import React, { useState } from 'react';
import ServiceFilters from '../components/NewServiceFilters';
import ServiceList from '../components/NewServiceList';
import PricingHighlights from '../components/PricingHighlights';
import {Helmet} from 'react-helmet-async';

const ServicesPage = ({ data }) => {
  const [selectedMode, setSelectedMode] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredServices = data.services.filter(service => {
    const modeMatch = selectedMode === 'all' || 
      (selectedMode === 'piece' && (service.unit === 'piece' || service.unit === 'pair')) || 
      (selectedMode === 'kg' && service.unit === 'kg');
    const categoryMatch = selectedCategory === 'all' || service.categories.includes(selectedCategory);
    return modeMatch && categoryMatch;
  });

return (
    <>
    <Helmet>
        <title>Andes Laundry - New Services</title>
        <meta name="description" content="Explore our new laundry services and pricing." />
      </Helmet>
    <div className="min-h-screen bg-gray-50">
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
               Services & Pricing
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              Professional cleaning services tailored to your needs
            </p>
          </div>
          
          {/* Pricing Highlights */}
          <PricingHighlights />
          
          {/* Filters and Services */}
          <div className="space-y-8">
            <ServiceFilters 
              serviceModes={data.serviceModes}
              serviceCategories={data.serviceCategories}
              selectedMode={selectedMode}
              selectedCategory={selectedCategory}
              onModeChange={setSelectedMode}
              onCategoryChange={setSelectedCategory}
            />
            
            <ServiceList services={filteredServices} />
          </div>
        </div>
      </div>
      
      
      {/* Footer */}
    </div>
    </>
  );
};

export default ServicesPage;