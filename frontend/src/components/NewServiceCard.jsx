
import React, { useState } from 'react';
import { useOrder } from '../context/OrderContext';
import { toast } from 'react-toastify';
import { FaMinus, FaPlus } from 'react-icons/fa';

const ServiceCard = ({ service }) => {
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
    <div className="relative bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] group border border-gray-100 flex flex-col h-full">

      {/* 1. TOP: Image & Tag */}
      <div className="aspect-[4/3] overflow-hidden relative bg-gray-50">
        <img
          src={service.image}
          alt={service.displayName}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Tag */}
        {service.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide shadow-sm backdrop-blur-md ${service.badge.includes('Dry Clean')
              ? 'bg-yellow-400/90 text-white'
              : 'bg-white/90 text-gray-700'
              }`}>
              {service.badge}
            </span>
          </div>
        )}
        {service.discount > 0 && (
          <div className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
            {service.discount}% OFF
          </div>
        )}
      </div>

      {/* 2. BOTTOM: Content & Action */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          {/* Product Name (Restored) */}
          <h3 className="text-sm md:text-base font-bold text-gray-800 leading-tight group-hover:text-brand transition-colors line-clamp-2 min-h-[2.5em]">{service.displayName}</h3>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2">
          {/* Price (Removed 'From') */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-0.5">
              <span className="text-brand font-extrabold text-lg">₹{originalPrice}</span>
              <span className="text-gray-400 text-[10px] font-medium">/{service.unit}</span>
            </div>
            {service.originalPrice > originalPrice && (
              <span className="text-[10px] text-gray-300 line-through">₹{service.originalPrice}</span>
            )}
          </div>

          {/* Action Button */}
          <div className="flex-shrink-0">
            {quantity > 0 ? (
              <div className="flex items-center bg-white rounded-lg border border-brand shadow-sm overflow-hidden h-9">
                <button
                  onClick={(e) => { e.stopPropagation(); handleDecrement(); }}
                  className="w-8 h-full flex items-center justify-center bg-blue-50 text-brand hover:bg-blue-100 transition-colors"
                >
                  <FaMinus size={10} />
                </button>
                <span className="font-bold text-brand text-sm w-6 text-center tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleIncrement(); }}
                  className="w-8 h-full flex items-center justify-center bg-brand text-white hover:bg-brand-dark transition-colors"
                >
                  <FaPlus size={10} />
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
                disabled={isAdding}
                className={`h-9 px-4 rounded-lg text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95 ${isAdding
                  ? 'bg-green-500 text-white'
                  : 'bg-brand text-white hover:bg-brand-dark hover:shadow-brand/20'
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

export default ServiceCard;