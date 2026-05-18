import React, { useState } from 'react';
import { useOrder } from '../context/OrderContext';
import { toast } from 'react-toastify';
import { FaMinus, FaPlus, FaTshirt, FaBolt } from 'react-icons/fa';

const NewServiceCard = ({ service, serviceMode = 'regular' }) => {
  const { cart, cartMode, addToCart, updateQuantity, removeFromCart, clearCart } = useOrder();
  const [isAdding, setIsAdding] = useState(false);

  const isKg = service.unit === 'kg';
  const currentPrice = isKg ? service.rateByKg : service.rateByPiece;
  const originalPrice = service.fakePrice || service.originalPrice || currentPrice;
  const discount = originalPrice && originalPrice > currentPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  const cartItem = cart.find(item => item.id === service.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    setIsAdding(true);

    const result = addToCart({
      id: service.id,
      name: service.displayName,
      price: currentPrice,
      unit: service.unit,
      image: service.image,
    }, 1, serviceMode);

    if (result && result.conflict) {
      // Cart has items of a different mode — warn the user
      const lockedLabel = result.currentMode === 'instant' ? 'Andes Instant' : 'Regular Service';
      toast.warn(
        ({ closeToast }) => (
          <div>
            <p className="font-bold text-sm mb-1">Cannot mix service types!</p>
            <p className="text-xs text-slate-600 mb-3">
              Your cart is locked to <strong>{lockedLabel}</strong>. Clear the cart to switch.
            </p>
            <button
              onClick={() => { clearCart(); closeToast(); toast.success('Cart cleared! Add your new items.'); }}
              className="w-full bg-red-500 text-white text-xs font-bold py-2 rounded-lg"
            >
              Clear Cart & Switch
            </button>
          </div>
        ),
        {
          position: 'bottom-center',
          autoClose: 6000,
          closeOnClick: false,
          theme: 'light',
          style: { borderRadius: '16px', padding: '12px' },
        }
      );
      setTimeout(() => setIsAdding(false), 300);
      return;
    }

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

  const isInstant = serviceMode === 'instant';

  return (
    <div className="bg-white h-[110px] lg:h-auto rounded-xl shadow-sm border border-gray-100 flex flex-row lg:flex-col overflow-hidden hover:shadow-md transition-shadow duration-300 w-full relative">

      {/* IMAGE AREA */}
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
          {isInstant ? (
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md shadow-sm uppercase tracking-wide flex items-center gap-0.5">
              <FaBolt size={7} /> Instant
            </span>
          ) : service.badge && (
            <span className="bg-yellow-400 text-slate-900 text-[8px] font-black px-1.5 py-0.5 rounded-md shadow-sm uppercase tracking-wide">
              {service.badge}
            </span>
          )}
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="p-2.5 lg:p-3 flex flex-col h-full flex-grow w-full">
        <h3 className="text-sm lg:text-[15px] font-bold text-gray-800 leading-tight line-clamp-2">
          {service.displayName}
        </h3>

        <div className="mt-auto pt-2 flex items-end justify-between gap-1 w-full">
          {/* Price Block */}
          <div className="flex flex-col leading-none">
            <div className="flex items-baseline gap-0.5">
              <span className={`font-black text-base lg:text-lg tracking-tight ${isInstant ? 'text-orange-500' : 'text-gray-900'}`}>
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
              <div className={`flex items-center rounded-lg border h-[32px] w-[76px] overflow-hidden ${
                isInstant ? 'bg-orange-50 border-orange-200' : 'bg-brand/5 border-brand/20'
              }`}>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDecrement(); }}
                  className={`flex-1 h-full flex items-center justify-center active:opacity-70 transition-colors ${
                    isInstant ? 'text-orange-500' : 'text-brand'
                  }`}
                >
                  <FaMinus size={9} />
                </button>
                <span className={`font-bold text-xs w-5 text-center tabular-nums ${isInstant ? 'text-orange-500' : 'text-brand'}`}>
                  {quantity}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleIncrement(); }}
                  className={`flex-1 h-full flex items-center justify-center active:opacity-70 transition-colors ${
                    isInstant ? 'text-orange-500' : 'text-brand'
                  }`}
                >
                  <FaPlus size={9} />
                </button>
              </div>
            ) : (
              <button
                id={`add-service-${service.id}`}
                onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
                disabled={isAdding}
                className={`h-[32px] px-4 rounded-lg text-[11px] lg:text-xs font-bold transition-all active:scale-95 shadow-sm flex items-center justify-center ${
                  isInstant
                    ? 'bg-white border border-orange-400 text-orange-500 hover:bg-orange-400 hover:text-white'
                    : 'bg-white border border-brand text-brand hover:bg-brand hover:text-white'
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