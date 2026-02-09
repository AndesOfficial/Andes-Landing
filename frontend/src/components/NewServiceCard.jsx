import React, { useState } from 'react';
import { useOrder } from '../context/OrderContext';
import { toast } from 'react-toastify';
import { FaMinus, FaPlus } from 'react-icons/fa';

const ServiceCard = ({ service }) => {
  const { cart, addToCart, updateQuantity, removeFromCart } = useOrder();
  const [isAdding, setIsAdding] = useState(false);

  // Helper to determine price logic
  const isPiece = service.unit === 'piece' || service.unit === 'pair';
  const originalPrice = isPiece ? service.rateByPiece : service.rateByKg;
  const discountedPrice = isPiece ? service.discountedRateByPiece : service.discountedRateByKg;

  const unitText = service.unit === 'piece'
    ? 'per piece'
    : service.unit === 'pair'
      ? 'per pair'
      : 'per kg';

  // Check if item is already in cart
  const cartItem = cart.find(item => item.id === service.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    setIsAdding(true);

    // Create a standardized item object for the cart
    const itemToAdd = {
      id: service.id,
      name: service.displayName,
      price: discountedPrice,
      unit: service.unit,
      image: service.image,
    };

    addToCart(itemToAdd, 1);

    // toast.success(`Added ${service.displayName} to cart!`);
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
    <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      {/* Discount Badge */}
      <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 animate-pulse">
        {service.discount}% OFF
      </div>

      {/* Service Image */}
      <div className="h-48 overflow-hidden relative">
        <img
          src={service.image}
          alt={service.displayName}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 will-change-transform"
        />
        {/* Optional overlay for better text contrast if needed */}
      </div>

      {/* Service Details */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{service.displayName}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

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

          {quantity > 0 ? (
            <div className="flex items-center bg-gray-100 rounded-lg shadow-inner overflow-hidden">
              <button
                onClick={handleDecrement}
                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors focus:outline-none active:bg-gray-400"
              >
                <FaMinus size={10} />
              </button>
              <span className="px-3 font-semibold text-gray-800 tabular-nums">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white transition-colors focus:outline-none active:bg-indigo-800"
              >
                <FaPlus size={10} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isAdding
                  ? 'bg-green-500 text-white scale-95'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-md hover:scale-105'
                }`}
            >
              {isAdding ? 'Added!' : 'Add'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;