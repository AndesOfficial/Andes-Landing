import React from 'react';

const ServiceCard = ({ service }) => {
  const originalPrice = service.unit === 'piece' || service.unit === 'pair' 
    ? service.rateByPiece 
    : service.rateByKg;
  const discountedPrice = service.unit === 'piece' || service.unit === 'pair' 
    ? service.discountedRateByPiece 
    : service.discountedRateByKg;
  const unitText = service.unit === 'piece' 
    ? 'per piece' 
    : service.unit === 'pair' 
      ? 'per pair' 
      : 'per kg';

  return (
    <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Discount Badge */}
      <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 animate-pulse">
        {service.discount}% OFF
      </div>
      
      {/* Service Image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.displayName} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      {/* Service Details */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{service.displayName}</h3>
        <p className="text-gray-600 text-sm mb-4">{service.description}</p>
        
        <div className="flex items-end justify-between">
          <div>
            <span className="text-gray-400 text-sm line-through mr-2">
              ₹{originalPrice}
            </span>
            <span className="text-rose-500 font-bold text-lg">
              ₹{discountedPrice}
            </span>
            <span className="block text-gray-500 text-xs mt-1">
              {unitText}
            </span>
          </div>
          <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-md transition-all">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;