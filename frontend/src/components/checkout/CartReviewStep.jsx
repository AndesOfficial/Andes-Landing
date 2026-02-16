import React from 'react';
import { Link } from 'react-router-dom';
import { FaTshirt, FaMinus, FaPlus, FaTrash, FaExclamationCircle, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { quickServices } from '../../data/servicesData';

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

    const handleIncrement = (item) => {
        updateQuantity(item.id, item.quantity + 1);
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            updateQuantity(item.id, item.quantity - 1);
        } else {
            removeFromCart(item.id);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
                <div className="bg-white rounded-2xl shadow-sm p-12 max-w-2xl w-full">
                    <div className="mb-6 bg-brand/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                        <FaTshirt className="text-4xl text-brand/50" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
                    <p className="text-gray-500 mb-8 text-lg">Start with our popular services:</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
                        {quickServices.slice(0, 4).map((service) => (
                            <div key={service.id} className="p-4 border rounded-xl hover:border-brand/30 hover:shadow-md transition-all cursor-pointer group" onClick={() => {
                                addToCart(service, 1);
                                toast.success(`${service.name} added to cart!`);
                            }}>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="p-2 bg-brand/5 rounded-lg text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                                        {service.icon}
                                    </div>
                                    <span className="font-bold text-brand">₹{service.price}/{service.unit}</span>
                                </div>
                                <h4 className="font-bold text-gray-900">{service.name}</h4>
                                <p className="text-xs text-gray-500 line-clamp-1">{service.desc}</p>
                            </div>
                        ))}
                    </div>

                    <Link
                        to="/services"
                        className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-brand hover:bg-brand-dark transition-all hover:shadow-lg hover:-translate-y-1"
                    >
                        Browse All Services
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white rounded-2xl shadow-sm p-8 animate-fade-in">
                {isBelowMOV && (
                    <div className="bg-red-500 text-white p-4 rounded-xl mb-6 flex items-start animate-fade-in shadow-md">
                        <div className="bg-white/20 p-2 rounded-lg mr-3">
                            <FaExclamationCircle className="text-xl" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Minimum Order Value</h3>
                            <p className="text-sm opacity-90">The minimum order value is ₹{minOrderValue}. Please add items to your cart.</p>
                        </div>
                    </div>
                )}
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Review Cart</h2>

                <div className="space-y-6 mb-8">
                    {cart.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-brand/20 transition-colors bg-gray-50/50">
                            <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
                                <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center text-gray-400">
                                            <FaTshirt />
                                        </div>
                                    )}
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                                    <p className="text-sm text-gray-500">₹{item.price}/{item.unit}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-8">
                                <div className="flex items-center bg-white rounded-lg border border-gray-200">
                                    <button onClick={() => handleDecrement(item)} className="px-3 py-1 hover:bg-gray-50 text-gray-600">
                                        <FaMinus size={10} />
                                    </button>
                                    <span className="px-3 font-medium text-gray-900">{item.quantity}</span>
                                    <button onClick={() => handleIncrement(item)} className="px-3 py-1 hover:bg-gray-50 text-brand">
                                        <FaPlus size={10} />
                                    </button>
                                </div>
                                <div className="text-right min-w-[80px]">
                                    <p className="font-bold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 flex items-center justify-between animate-fade-in mt-4">
                <span className="text-lg font-medium text-slate-800">Missed Something?</span>
                <Link to="/services" className="bg-brand text-white px-6 py-2 rounded-xl font-medium hover:bg-brand-dark transition-colors shadow-sm whitespace-nowrap">
                    + Add Items
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between animate-fade-in">
                <button
                    onClick={() => { if (window.confirm('Are you sure you want to clear your cart?')) clearCart(); }}
                    className="text-red-500 p-4 hover:bg-red-50 rounded-xl transition-colors border-2 border-red-100"
                    title="Clear Cart"
                >
                    <FaTrash className="text-xl" />
                </button>

                <div className="text-center">
                    <span className="text-green-600 font-bold text-xl">Total: ₹{totalPrice.toFixed(2)}</span>
                </div>

                <button
                    onClick={onNext}
                    disabled={isBelowMOV}
                    className={`px-8 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 ${isBelowMOV
                        ? 'bg-brand/50 text-white cursor-not-allowed shadow-none'
                        : 'bg-brand text-white hover:bg-brand-dark hover:shadow-brand/30'
                        }`}
                >
                    <FaShoppingCart className="text-lg" />
                    Checkout
                </button>
            </div>
        </>
    );
};

export default CartReviewStep;
