import React from 'react';
import { Link } from 'react-router-dom';
import { FaTshirt, FaMinus, FaPlus, FaTrash, FaExclamationCircle, FaShoppingCart, FaChevronRight } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { quickServices } from '../../data/servicesData';

/**
 * CartReviewStep Component
 * First step of checkout: View items, adjust quantities, or add more.
 */
const CartReviewStep = ({
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
    isBelowMOV,
    minOrderValue,
    onNext,
    addToCart
}) => {

    const handleIncrement = (item) => updateQuantity(item.id, item.quantity + 1);
    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            updateQuantity(item.id, item.quantity - 1);
        } else {
            removeFromCart(item.id);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-12">
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-8 sm:p-12 max-w-2xl w-full border border-slate-100">
                    <div className="mb-6 bg-brand/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-brand">
                        <FaShoppingCart className="text-3xl" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Your cart is empty</h2>
                    <p className="text-slate-400 font-bold mb-8 text-sm uppercase tracking-widest">Add some magic to your laundry</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
                        {quickServices.slice(0, 4).map((service) => (
                            <div
                                key={service.id}
                                className="p-4 bg-slate-50 border border-transparent rounded-2xl hover:border-brand/20 hover:bg-white hover:shadow-lg transition-all cursor-pointer group flex items-center gap-4 active:scale-95"
                                onClick={() => {
                                    addToCart(service, 1);
                                    toast.success(`${service.name} added!`);
                                }}
                            >
                                <div className="p-3 bg-white rounded-xl text-brand group-hover:bg-brand group-hover:text-white shadow-sm transition-colors text-xl">
                                    {service.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-sm">{service.name}</h4>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">₹{service.price}/{service.unit}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Link
                        to="/services"
                        className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-black text-white bg-brand hover:bg-brand-dark transition-all shadow-xl shadow-brand/20 hover:-translate-y-1"
                    >
                        Browse All Services
                        <FaChevronRight size={12} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pb-32 lg:pb-0"> {/* Added padding for fixed footer on mobile */}
            {/* MOV Notification */}
            {isBelowMOV && (
                <div className="bg-red-50 border border-red-100 p-4 rounded-2xl mb-8 flex items-start shadow-sm shadow-red-500/5 transition-all animate-pulse">
                    <div className="bg-red-500 p-2 rounded-lg mr-3 text-white shadow-lg">
                        <FaExclamationCircle className="text-lg" />
                    </div>
                    <div className="flex-grow">
                        <h3 className="font-black text-red-900 text-sm uppercase tracking-tight">Minimum Order Value</h3>
                        <p className="text-xs text-red-700 font-medium">Add ₹{(minOrderValue - totalPrice).toFixed(0)} more to proceed</p>
                    </div>
                    <Link to="/services" className="text-red-700 font-black text-[10px] uppercase tracking-widest border-b-2 border-red-200">Shop more</Link>
                </div>
            )}

            <div className="space-y-4">
                {/* CART ITEMS LIST */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-50">
                    <div className="p-4 border-b border-slate-50 flex items-center justify-between">
                        <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                            Items in Cart
                            <span className="text-xs bg-slate-100 px-2.5 py-1 rounded-lg text-slate-400 font-black">{cart.length}</span>
                        </h2>
                        <button
                            onClick={() => { if (window.confirm('Clear all items from your cart?')) clearCart(); }}
                            className="h-11 px-4 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors flex items-center justify-center rounded-xl hover:bg-red-50"
                        >
                            Empty Cart
                        </button>
                    </div>

                    <div className="p-2 sm:p-4 space-y-2">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors group">
                                {/* Side-by-Side Image */}
                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-slate-100 flex-shrink-0 shadow-sm relative">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center text-slate-200 bg-slate-50">
                                            <FaTshirt size={24} />
                                        </div>
                                    )}
                                </div>

                                <div className="flex-grow min-w-0">
                                    <h3 className="font-extrabold text-slate-800 text-sm truncate">{item.name}</h3>
                                    <p className="text-xs font-bold text-slate-400">₹{item.price}/{item.unit}</p>
                                </div>

                                {/* Modern Side-by-Side Quantity Controller */}
                                <div className="flex items-center bg-white rounded-xl border border-slate-200 p-1 shadow-sm">
                                    <button
                                        onClick={() => handleDecrement(item)}
                                        className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-brand transition-colors active:scale-90"
                                    >
                                        <FaMinus size={10} />
                                    </button>
                                    <span className="w-6 text-center font-black text-slate-800 text-xs tabular-nums">{item.quantity}</span>
                                    <button
                                        onClick={() => handleIncrement(item)}
                                        className="w-8 h-8 flex items-center justify-center text-brand active:scale-90"
                                    >
                                        <FaPlus size={10} />
                                    </button>
                                </div>

                                {/* Item Total & Remove */}
                                <div className="hidden sm:flex flex-col items-end min-w-[60px] ml-2">
                                    <span className="font-black text-slate-800 text-sm">₹{(item.price * item.quantity).toFixed(0)}</span>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="text-slate-200 hover:text-red-500 transition-colors p-2">
                                    <FaTrash size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upsell helper */}
                <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-5 flex items-center justify-between group">
                    <div>
                        <span className="text-sm font-black text-blue-900 block tracking-tight">Missed something?</span>
                        <p className="text-xs text-blue-700/60 font-medium">Add more items for faster service</p>
                    </div>
                    <Link to="/services" className="bg-white border-2 border-blue-200 text-brand px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-brand hover:shadow-lg transition-all active:scale-95">
                        Add Items
                    </Link>
                </div>
            </div>

            {/* FIXED BOTTOM CTA FOR MOBILE, CENTERED FOR DESKTOP */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-4 flex items-center justify-center z-50 lg:relative lg:bg-transparent lg:border-0 lg:px-0 lg:py-12 lg:z-10">
                <div className="w-full max-w-3xl flex items-center justify-between gap-6">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1">Total Bill</span>
                        <span className="text-2xl font-black text-slate-900 leading-none">₹{totalPrice.toFixed(0)}</span>
                    </div>

                    <button
                        onClick={onNext}
                        disabled={isBelowMOV}
                        className={`group px-10 py-4 rounded-2xl font-black text-white shadow-2xl transition-all flex items-center gap-3 shrink-0 active:scale-95 min-h-[56px] ${isBelowMOV
                            ? 'bg-slate-300 cursor-not-allowed shadow-none'
                            : 'bg-brand hover:bg-brand-dark shadow-brand/20 hover:-translate-y-0.5'
                            }`}
                    >
                        Proceed
                        <FaChevronRight className={`text-xs transition-transform group-hover:translate-x-1 ${isBelowMOV ? 'opacity-0' : 'opacity-100'}`} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartReviewStep;
