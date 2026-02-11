import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import Button from '../components/common/Button';
import { FaTshirt, FaCalendarAlt, FaCheck, FaTruck, FaArrowLeft, FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

// TODO: put this in a separate file or database later
const quickServices = [
    { id: 'wash-fold', name: 'Wash & Fold', price: 1.5, unit: 'kg', icon: <FaTshirt />, desc: 'Regular laundry, washed, dried, and folded.' },
    { id: 'dry-clean', name: 'Dry Clean', price: 5.0, unit: 'item', icon: <FaTshirt />, desc: 'Delicate items cleaned with care.' },
    { id: 'ironing', name: 'Ironing', price: 2.0, unit: 'item', icon: <FaTshirt />, desc: 'Professional steam ironing.' },
    { id: 'bedding', name: 'Bedding', price: 8.0, unit: 'set', icon: <FaTshirt />, desc: 'Comforters, sheets, and blankets.' },
];

const OrderPlacement = () => {
    // keeping track of cart and order functions
    const { cart, addToCart, removeFromCart, updateQuantity, placeOrder, totalItems, totalPrice } = useOrder();

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const navigate = useNavigate();

    // checking what's in the cart for debugging
    console.log("Current Cart Items:", cart);

    const handlePlaceOrder = async () => {
        console.log("Placing order with slot:", selectedSlot);
        setLoading(true);

        try {
            await placeOrder(selectedSlot);
            navigate('/order-confirmation');
        } catch (error) {
            console.log("Something went wrong:", error);
            alert("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

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

    // if cart is empty, show the empty state
    if (cart.length === 0 && step === 1) {
        return (
            <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="bg-white rounded-2xl shadow-sm p-12">
                        <div className="mb-6 bg-brand/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                            <FaTshirt className="text-4xl text-brand/50" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
                        <p className="text-gray-500 mb-8 text-lg">Looks like you haven't added any services yet.</p>
                        <Link
                            to="/services"
                            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-brand hover:bg-brand-dark transition-all hover:shadow-lg hover:-translate-y-1"
                        >
                            Browse Services
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                    <button onClick={() => navigate(-1)} className="mr-4 text-slate-500 hover:text-slate-800">
                        <FaArrowLeft className="text-xl" />
                    </button>
                    <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
                </div>

                <div className="flex justify-center mb-12">
                    <div className="flex items-center space-x-4">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${step >= 1 ? 'bg-brand text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>1</div>
                        <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full bg-brand transition-all duration-500 ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
                        </div>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${step >= 2 ? 'bg-brand text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>2</div>
                        <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full bg-brand transition-all duration-500 ${step >= 3 ? 'w-full' : 'w-0'}`}></div>
                        </div>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${step >= 3 ? 'bg-brand text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>3</div>
                    </div>
                </div>

                {step === 1 && (
                    <div className="bg-white rounded-2xl shadow-sm p-8 animate-fade-in">
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

                        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-100">
                            <div className="mb-4 sm:mb-0 text-center sm:text-left">
                                <span className="text-gray-500 text-sm block">Subtotal</span>
                                <span className="text-3xl font-black text-brand">₹{totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex space-x-4">
                                <Link to="/services" className="px-6 py-3 border border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all">
                                    Add More
                                </Link>
                                <button onClick={() => setStep(2)} className="px-8 py-3 rounded-xl font-bold bg-brand text-white hover:bg-brand-dark shadow-lg hover:shadow-brand/30 transition-all">
                                    Proceed to Schedule
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="bg-white rounded-2xl shadow-sm p-8 animate-fade-in max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">When should we pickup?</h2>

                        <div className="space-y-4 mb-8">
                            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">Tomorrow</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div
                                    className={`relative border-2 rounded-xl p-5 cursor-pointer transition-all ${selectedSlot === 'morning' ? 'border-brand bg-brand/10 ring-1 ring-brand' : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'}`}
                                    onClick={() => setSelectedSlot('morning')}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-bold text-slate-900">Morning</span>
                                        {selectedSlot === 'morning' && <FaCheck className="text-brand" />}
                                    </div>
                                    <div className="text-sm text-slate-500">9:00 AM - 12:00 PM</div>
                                </div>

                                <div
                                    className={`relative border-2 rounded-xl p-5 cursor-pointer transition-all ${selectedSlot === 'afternoon' ? 'border-brand bg-brand/10 ring-1 ring-brand' : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'}`}
                                    onClick={() => setSelectedSlot('afternoon')}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-bold text-slate-900">Afternoon</span>
                                        {selectedSlot === 'afternoon' && <FaCheck className="text-brand" />}
                                    </div>
                                    <div className="text-sm text-slate-500">2:00 PM - 5:00 PM</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between pt-6 border-t border-gray-100">
                            <button onClick={() => setStep(1)} className="px-6 py-2 text-slate-500 font-medium hover:text-slate-800">
                                Back
                            </button>
                            <button
                                onClick={() => setStep(3)}
                                disabled={!selectedSlot}
                                className={`px-8 py-3 rounded-xl font-bold transition-all ${!selectedSlot ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-brand text-white hover:bg-brand-dark shadow-lg'}`}
                            >
                                Review Order
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="bg-white rounded-2xl shadow-sm p-8 animate-fade-in max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Order Confirmation</h2>

                        <div className="bg-gray-50 rounded-xl p-6 mb-8">
                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                                <div className="flex items-center">
                                    <div className="bg-white p-2 rounded-lg shadow-sm mr-3">
                                        <FaTruck className="text-brand" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">Pickup Tomorrow</p>
                                        <p className="text-sm text-slate-500">{selectedSlot === 'morning' ? '9:00 AM - 12:00 PM' : '2:00 PM - 5:00 PM'}</p>
                                    </div>
                                </div>
                                <button onClick={() => setStep(2)} className="text-xs text-brand font-bold hover:underline">CHANGE</button>
                            </div>

                            <div className="space-y-3">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center text-slate-700">
                                            <span className="bg-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shadow-sm mr-3">{item.quantity}x</span>
                                            <span>{item.name}</span>
                                        </div>
                                        <span className="font-medium text-slate-900">₹{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                                <span className="font-bold text-slate-700">Total To Pay</span>
                                <span className="text-xl font-black text-brand">₹{totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <button onClick={() => setStep(2)} className="px-6 py-2 text-slate-500 font-medium hover:text-slate-800">
                                Back
                            </button>
                            <Button onClick={handlePlaceOrder} isLoading={loading} className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold bg-brand text-white hover:bg-brand-dark shadow-xl hover:shadow-brand/30">
                                Confirm Pickup
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderPlacement;
