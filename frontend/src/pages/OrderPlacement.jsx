import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import Button from '../components/common/Button';
import { FaTshirt, FaCalendarAlt, FaCheck, FaTruck } from 'react-icons/fa';

const services = [
    { id: 'wash-fold', name: 'Wash & Fold', price: 1.5, unit: 'kg', icon: <FaTshirt />, desc: 'Regular laundry, washed, dried, and folded.' },
    { id: 'dry-clean', name: 'Dry Clean', price: 5.0, unit: 'item', icon: <FaTshirt />, desc: 'Delicate items cleaned with care.' },
    { id: 'ironing', name: 'Ironing', price: 2.0, unit: 'item', icon: <FaTshirt />, desc: 'Professional steam ironing.' },
    { id: 'bedding', name: 'Bedding', price: 8.0, unit: 'set', icon: <FaTshirt />, desc: 'Comforters, sheets, and blankets.' },
];

const OrderPlacement = () => {
    const { cart, addToCart, removeFromCart, placeOrder } = useOrder();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const navigate = useNavigate();

    const handleServiceSelect = (service) => {
        addToCart(service, 1);
    };

    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            await placeOrder(selectedSlot);
            navigate('/order-confirmation');
        } catch (error) {
            console.error("Order placement failed:", error);
            alert("Failed to place order. Please check your connection or try again.");
        } finally {
            setLoading(false); // This runs whether it succeeds or fails
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">Place Your Order</h1>

                {/* Steps Indicator */}
                <div className="flex justify-center mb-12">
                    <div className="flex items-center space-x-4">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                        <div className="w-16 h-1 bg-gray-200">
                            <div className={`h-full bg-indigo-600 transition-all ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
                        </div>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                        <div className="w-16 h-1 bg-gray-200">
                            <div className={`h-full bg-indigo-600 transition-all ${step >= 3 ? 'w-full' : 'w-0'}`}></div>
                        </div>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
                    </div>
                </div>

                {step === 1 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Select Services</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {services.map((service) => {
                                const inCart = cart.find(c => c.id === service.id);
                                return (
                                    <div
                                        key={service.id}
                                        className={`card cursor-pointer transition-all hover:-translate-y-1 ${inCart ? 'ring-2 ring-indigo-500 bg-indigo-50' : ''}`}
                                        onClick={() => handleServiceSelect(service)}
                                    >
                                        <div className="text-3xl text-indigo-600 mb-4">{service.icon}</div>
                                        <h3 className="text-lg font-bold text-slate-900">{service.name}</h3>
                                        <p className="text-sm text-slate-600 mb-4">{service.desc}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold text-slate-900">${service.price}/{service.unit}</span>
                                            {inCart && <FaCheck className="text-green-500" />}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex justify-end mt-8">
                            <Button onClick={() => setStep(2)} disabled={cart.length === 0}>
                                Next: Schedule
                            </Button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="max-w-2xl mx-auto card">
                        <h2 className="text-2xl font-semibold text-slate-800 mb-6">Schedule Pickup</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Pickup Date</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div
                                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedSlot === 'morning' ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500' : 'hover:border-indigo-500 hover:bg-indigo-50'}`}
                                        onClick={() => setSelectedSlot('morning')}
                                    >
                                        <div className="font-semibold text-slate-900">Tomorrow</div>
                                        <div className="text-sm text-slate-500">9:00 AM - 12:00 PM</div>
                                    </div>
                                    <div
                                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedSlot === 'afternoon' ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500' : 'hover:border-indigo-500 hover:bg-indigo-50'}`}
                                        onClick={() => setSelectedSlot('afternoon')}
                                    >
                                        <div className="font-semibold text-slate-900">Tomorrow</div>
                                        <div className="text-sm text-slate-500">2:00 PM - 5:00 PM</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between mt-8">
                                <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
                                <Button onClick={() => setStep(3)} disabled={!selectedSlot}>Next: Review</Button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="max-w-2xl mx-auto card">
                        <h2 className="text-2xl font-semibold text-slate-800 mb-6">Order Summary</h2>
                        <div className="space-y-4 mb-8">
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <div className="flex items-center">
                                        <div className="bg-indigo-100 p-2 rounded-lg mr-3 text-indigo-600">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-slate-900">{item.name}</h4>
                                            <p className="text-xs text-slate-500">${item.price}/{item.unit}</p>
                                        </div>
                                    </div>
                                    <span className="font-semibold text-slate-900">x{item.quantity}</span>
                                </div>
                            ))}
                            <div className="pt-4 flex justify-between items-center text-lg font-bold text-slate-900">
                                <span>Total Items</span>
                                <span>{cart.reduce((acc, i) => acc + i.quantity, 0)}</span>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg flex items-start mb-8">
                            <FaTruck className="text-blue-500 mt-1 mr-3" />
                            <div>
                                <h4 className="font-semibold text-blue-900">Pickup Details</h4>
                                <p className="text-sm text-blue-700">Scheduled for Tomorrow, {selectedSlot === 'morning' ? '9:00 AM - 12:00 PM' : '2:00 PM - 5:00 PM'}</p>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
                            <Button onClick={handlePlaceOrder} isLoading={loading}>Confirm Order</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderPlacement;
