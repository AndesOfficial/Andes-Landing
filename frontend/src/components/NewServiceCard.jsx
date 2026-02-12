
import React, { useState } from 'react';
import { useOrder } from '../context/OrderContext';
import { toast } from 'react-toastify';
import { FaMinus, FaPlus } from 'react-icons/fa';

const NewServiceCard = ({ service }) => {
  const { cart, addToCart, updateQuantity, removeFromCart } = useOrder();
  const [isAdding, setIsAdding] = useState(false);

  // Helper to determine price logic
  const isKg = service.unit === 'kg';
  const originalPrice = isKg ? service.rateByKg : service.rateByPiece;

  // Check if item is already in cart
  const cartItem = cart.find(item => item.id === service.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    setIsAdding(true);

    const itemToAdd = {
      id: service.id,
      name: service.displayName,
      price: originalPrice,
      unit: service.unit,
      image: service.image,
    };

    addToCart(itemToAdd, 1);
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleIncrement = () => {
    updateQuantity(service.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(service.id, quantity - 1);
    } else {
      removeFromCart(service.id);
    }
  };

  return (
    <div className="relative bg-white rounded-xl lg:rounded-2xl shadow-sm border border-gray-100/50 flex flex-row lg:flex-col lg:h-full lg:overflow-hidden hover:shadow-md transition-all duration-300">

      {/* 1. Image & Tag */}
      {/* Mobile: Larger fixed width square (w-28 ~ 112px). Desktop: Full width aspect ratio */}
      <div className="w-28 h-28 lg:w-full lg:h-auto lg:aspect-[4/3] flex-shrink-0 relative bg-gray-50 rounded-l-xl lg:rounded-l-none lg:rounded-t-2xl overflow-hidden">
        <img
          src={service.image}
          alt={service.displayName}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 lg:group-hover:scale-105"
        />
        {/* Tag (Desktop or Mobile adjusted) */}
        {service.badge && (
          <div className="absolute top-1 left-1 lg:top-3 lg:left-3 z-10">
            <span className={`text-[9px] lg:text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wide shadow-sm backdrop-blur-md ${service.badge.includes('Dry Clean')
              ? 'bg-yellow-400/90 text-white'
              : 'bg-white/90 text-gray-700'
              }`}>
              {service.badge}
            </span>
          </div>
        )}
        {service.discount > 0 && (
          <div className="absolute top-1 right-1 lg:top-3 lg:right-3 bg-blue-600 text-white text-[9px] lg:text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-sm">
            {service.discount}% OFF
          </div>
        )}
      </div>

      {/* 2. Content & Action */}
      <div className="p-3 flex flex-col flex-grow justify-between lg:p-4">

        {/* Title */}
        <div className="mb-1 lg:mb-2">
          <h3 className="text-sm lg:text-base font-bold text-gray-800 leading-tight lg:group-hover:text-brand transition-colors line-clamp-2">{service.displayName}</h3>
        </div>

        {/* Pricing and Action Row */}
        {/* Mobile: Vertical Stack (Price then Button). Desktop: Horizontal Row */}
        <div className="mt-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 lg:gap-2">

          {/* Price */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-gray-900 font-extrabold text-base lg:text-lg">₹{originalPrice}</span>
              <span className="text-gray-400 text-[10px] font-medium">/{service.unit}</span>
            </div>
            {service.originalPrice > originalPrice && (
              <span className="text-[11px] text-gray-400 line-through">₹{service.originalPrice}</span>
            )}
          </div>

          {/* Action Button */}
          {/* Mobile: Full width button area if needed, or keeping neat compact */}
          <div className="flex-shrink-0 mt-1 lg:mt-0">
            {quantity > 0 ? (
              <div className="flex items-center bg-white rounded-lg border border-brand shadow-sm overflow-hidden h-8 lg:h-9 max-w-[100px] lg:max-w-none">
                <button
                  onClick={(e) => { e.stopPropagation(); handleDecrement(); }}
                  className="w-8 lg:w-8 h-full flex items-center justify-center bg-blue-50 text-brand hover:bg-blue-100 transition-colors"
                >
                  <FaMinus size={10} />
                </button>
                <span className="font-bold text-brand text-sm w-6 text-center tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleIncrement(); }}
                  className="w-8 lg:w-8 h-full flex items-center justify-center bg-brand text-white hover:bg-brand-dark transition-colors"
                >
                  <FaPlus size={10} />
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
                disabled={isAdding}
                className={`h-8 lg:h-9 px-4 lg:px-4 rounded-lg text-xs lg:text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-1 active:scale-95 ${isAdding
                  ? 'bg-green-500 text-white w-full lg:w-auto'
                  : 'bg-brand text-white hover:bg-brand-dark hover:shadow-brand/20 w-fit lg:w-auto'
                  }`}
              >
                {isAdding ? 'Added' : 'Add +'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewServiceCard;