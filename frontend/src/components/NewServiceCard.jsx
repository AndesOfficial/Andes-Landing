import React, { useState } from 'react';
import { useOrder } from '../context/OrderContext';
import { toast } from 'react-toastify';
import { FaMinus, FaPlus, FaTshirt } from 'react-icons/fa';

const NewServiceCard = ({ service }) => {
  const { cart, addToCart, updateQuantity, removeFromCart } = useOrder();
  const [isAdding, setIsAdding] = useState(false);

  // Price Logic
  const isKg = service.unit === 'kg';
  const currentPrice = isKg ? service.rateByKg : service.rateByPiece;
  const originalPrice = service.fakePrice || service.originalPrice || currentPrice;
  const discount = originalPrice > currentPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

  const cartItem = cart.find(item => item.id === service.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      id: service.id,
      name: service.displayName,
      price: currentPrice,
      unit: service.unit,
      image: service.image,
    }, 1);

    toast.success(`${service.displayName} added!`, {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "dark",
      style: { borderRadius: '100px', fontSize: '12px', fontWeight: 'bold', marginBottom: '80px' }
    });
    setTimeout(() => setIsAdding(false), 400);
  };

  const handleIncrement = () => updateQuantity(service.id, quantity + 1);
  const handleDecrement = () => quantity > 1 ? updateQuantity(service.id, quantity - 1) : removeFromCart(service.id);

  return (
    <div className="bg-white h-[110px] lg:h-auto rounded-xl shadow-sm border border-gray-100 flex flex-row lg:flex-col overflow-hidden hover:shadow-md transition-shadow duration-300 w-full relative">

      {/* 1. IMAGE AREA: Strictly constrained so it never stretches out of view */}
      {/* Mobile: 110px Square | Desktop: 180px Height */}
      <div className="w-[110px] min-w-[110px] h-[110px] lg:w-full lg:h-[180px] flex-shrink-0 relative bg-slate-50 border-r lg:border-r-0 lg:border-b border-gray-100 flex items-center justify-center">
        {service.image ? (
          <img
            src={service.image}
            alt={service.displayName}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <FaTshirt className="text-3xl text-gray-300" />
        )}

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {discount > 0 && (
            <span className="bg-brand text-white text-[9px] font-black px-2 py-1 rounded-lg shadow-lg uppercase tracking-tight">
              {discount}% OFF
            </span>
          )}
          {service.badge && (
            <span className="bg-yellow-400 text-slate-900 text-[8px] font-black px-1.5 py-0.5 rounded-md shadow-sm uppercase tracking-wide">
              {service.badge}
            </span>
          )}
        </div>
      </div>

      {/* 2. CONTENT AREA: Flex-grow ensures it fills the space next to the image */}
      <div className="p-2.5 lg:p-3 flex flex-col h-full flex-grow w-full">

        {/* Title (Locked to max 2 lines so it never pushes the price down) */}
        <h3 className="text-sm lg:text-[15px] font-bold text-gray-800 leading-tight line-clamp-2">
          {service.displayName}
        </h3>

        {/* PRICE & BUTTON: Anchored to the bottom using mt-auto */}
        <div className="mt-auto pt-2 flex items-end justify-between gap-1 w-full">

          {/* Price Block */}
          <div className="flex flex-col leading-none">
            <div className="flex items-baseline gap-0.5">
              <span className="text-gray-900 font-black text-base lg:text-lg tracking-tight">
                ₹{currentPrice}
              </span>
              <span className="text-gray-400 text-[10px] lg:text-xs font-medium">
                /{service.unit}
              </span>
            </div>
            {originalPrice > currentPrice && (
              <span className="text-[10px] text-gray-400 line-through mt-0.5">
                ₹{originalPrice}
              </span>
            )}
          </div>

          {/* Compact Action Buttons */}
          <div className="flex-shrink-0">
            {quantity > 0 ? (
              <div className="flex items-center bg-brand/5 rounded-lg border border-brand/20 h-[32px] w-[76px] overflow-hidden">
                <button
                  onClick={(e) => { e.stopPropagation(); handleDecrement(); }}
                  className="flex-1 h-full flex items-center justify-center text-brand active:bg-brand/10 transition-colors"
                >
                  <FaMinus size={9} />
                </button>
                <span className="font-bold text-brand text-xs w-5 text-center tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleIncrement(); }}
                  className="flex-1 h-full flex items-center justify-center text-brand active:bg-brand/10 transition-colors"
                >
                  <FaPlus size={9} />
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
                disabled={isAdding}
                className="h-[32px] px-4 rounded-lg text-[11px] lg:text-xs font-bold transition-all active:scale-95 bg-white border border-brand text-brand hover:bg-brand hover:text-white shadow-sm flex items-center justify-center"
              >
                {isAdding ? '✓' : 'ADD'}
              </button>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default NewServiceCard;