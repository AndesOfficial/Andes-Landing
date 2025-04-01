import React from 'react';
import ServiceCard from './NewServiceCard';

const ServiceList = ({ services }) => {
  if (services.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center ">
        <div className="text-gray-500 text-lg mb-4">😕</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No services found</h3>
        <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServiceList;