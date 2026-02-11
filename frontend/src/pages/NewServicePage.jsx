import React, { useState } from 'react';
import ServiceFilters from '../components/NewServiceFilters';
import ServiceList from '../components/NewServiceList';
import PricingHighlights from '../components/PricingHighlights';
import { Helmet } from 'react-helmet-async';
import { useOrder } from '../context/OrderContext';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaArrowRight } from 'react-icons/fa';

const ServicesPage = ({ data }) => {
  const [selectedMode, setSelectedMode] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { cart, totalItems, totalPrice } = useOrder();

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
      <div className="min-h-screen bg-gray-50 pb-24"> {/* Added padding bottom for floating button */}
        <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
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

        {/* Floating Cart Button */}
        {cart.length > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md z-50 animate-bounce-in">
            <Link to="/order" className="bg-gradient-to-r from-brand to-brand-dark text-white rounded-2xl shadow-2xl p-4 flex items-center justify-between hover:scale-105 transition-transform duration-300">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                  <FaShoppingCart className="text-xl" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
                  <span className="text-sm opacity-90">₹{totalPrice}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                <span className="font-medium">Checkout</span>
                <FaArrowRight />
              </div>
            </Link>
          </div>
        )}

        {/* Footer */}
      </div>
    </>
  );
};

export default ServicesPage;