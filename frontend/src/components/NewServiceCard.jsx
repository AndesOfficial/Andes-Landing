import React, { useState } from 'react';
import { useOrder } from '../context/OrderContext';
import { toast } from 'react-toastify';
import { FaMinus, FaPlus, FaTshirt } from 'react-icons/fa';

/**
 * NewServiceCard Component
 * 
 * A unified, responsive card that adapts its layout:
 * - Mobile: Horizontal list style (Image left, content right).
 * - Desktop (lg): Vertical grid style (Image top, content below).
 */
const NewServiceCard = ({ service }) => {
  const { cart, addToCart, updateQuantity, removeFromCart } = useOrder();
  const [isAdding, setIsAdding] = useState(false);

  // Pricing Logic
  const isKg = service.unit === 'kg';
  const currentPrice = isKg ? service.rateByKg : service.rateByPiece;
  const originalPrice = service.fakePrice || service.originalPrice || currentPrice;
  const discount = originalPrice > currentPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

  // Cart Logic
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

    toast.success(`${service.displayName} Added`, {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: true,
      theme: "dark",
      style: { borderRadius: '50px', fontSize: '12px', fontWeight: '800', marginBottom: '80px' }
    });
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleIncrement = () => updateQuantity(service.id, quantity + 1);
  const handleDecrement = () => quantity > 1 ? updateQuantity(service.id, quantity - 1) : removeFromCart(service.id);

  return (
    <div className="group bg-white rounded-[2rem] lg:rounded-3xl shadow-sm border border-slate-100 flex flex-row lg:flex-col lg:h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 lg:hover:-translate-y-1">

      {/* 1. Image Area: Fixed square on mobile, Aspect 4/3 on Desktop */}
      <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] lg:w-full lg:h-auto lg:aspect-[4/3] flex-shrink-0 relative bg-slate-50 overflow-hidden">
        {service.image ? (
          <img
            src={service.image}
            alt={service.displayName}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
              <FaTshirt size={32} />
            </div>
            <span className="mt-2 text-[8px] lg:text-[10px] uppercase font-black tracking-widest text-slate-400">Premium Care</span>
          </div>
        )}

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {discount > 0 && (
            <span className="bg-[#0089FF] text-white text-[9px] lg:text-[10px] font-black px-2 py-1 rounded-lg shadow-lg uppercase tracking-tight">
              {discount}% OFF
            </span>
          )}
          {service.badge && (
            <span className="bg-yellow-400 text-white text-[8px] lg:text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-sm uppercase tracking-wide">
              {service.badge}
            </span>
          )}
        </div>
      </div>

      {/* 2. Content & Actions */}
      <div className="p-4 lg:p-4 flex flex-col flex-grow min-w-0">

        {/* Text Block */}
        <div>
          <h3 className="text-sm lg:text-base font-black text-slate-800 leading-tight mb-1 truncate lg:whitespace-normal lg:line-clamp-2">
            {service.displayName}
          </h3>
        </div>

        {/* Pricing & Controls Row */}
        <div className="mt-2 flex items-end justify-between gap-3">

          {/* Price Layout */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-slate-900 font-extrabold text-lg lg:text-xl tracking-tight">₹{currentPrice}</span>
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-tighter">/{service.unit}</span>
            </div>
            {originalPrice > currentPrice && (
              <span className="text-[11px] lg:text-xs text-slate-300 line-through font-bold">₹{originalPrice}</span>
            )}
          </div>

          {/* Action Area: Thumb-Zone Optimized */}
          <div className="flex-shrink-0">
            {quantity > 0 ? (
              <div className="flex items-center bg-[#0089FF]/5 rounded-xl border-2 border-[#0089FF]/20 h-10 lg:h-11 w-[90px] lg:w-[110px] overflow-hidden">
                <button
                  onClick={(e) => { e.stopPropagation(); handleDecrement(); }}
                  className="flex-1 h-full flex items-center justify-center text-[#0089FF] active:bg-[#0089FF]/10 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <FaMinus size={12} />
                </button>
                <span className="font-black text-[#0089FF] text-sm lg:text-base w-6 text-center tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleIncrement(); }}
                  className="flex-1 h-full flex items-center justify-center text-[#0089FF] active:bg-[#0089FF]/10 transition-colors"
                  aria-label="Increase quantity"
                >
                  <FaPlus size={12} />
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
                disabled={isAdding}
                className={`h-10 lg:h-11 px-6 lg:px-8 rounded-xl text-xs lg:text-sm font-black transition-all active:scale-90 shadow-lg ${isAdding
                  ? 'bg-green-500 text-white shadow-green-200'
                  : 'bg-white border-2 border-[#0089FF] text-[#0089FF] hover:bg-[#0089FF] hover:text-white shadow-blue-500/10'
                  }`}
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
