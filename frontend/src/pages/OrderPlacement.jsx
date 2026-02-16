import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import { FaTshirt, FaCalendarAlt, FaCheck, FaTruck, FaArrowLeft, FaTrash, FaMinus, FaPlus, FaExclamationCircle, FaShoppingCart, FaClock, FaMapMarkerAlt, FaTags, FaWallet, FaFileInvoice, FaInfoCircle, FaChevronDown } from 'react-icons/fa';
import AddressList from '../components/AddressList';

// TODO: put this in a separate file or database later
const quickServices = [
    { id: 'wash-fold', name: 'Wash & Fold', price: 1.5, unit: 'kg', icon: <FaTshirt />, desc: 'Regular laundry, washed, dried, and folded.' },
    { id: 'dry-clean', name: 'Dry Clean', price: 5.0, unit: 'item', icon: <FaTshirt />, desc: 'Delicate items cleaned with care.' },
    { id: 'ironing', name: 'Ironing', price: 2.0, unit: 'item', icon: <FaTshirt />, desc: 'Professional steam ironing.' },
    { id: 'bedding', name: 'Bedding', price: 8.0, unit: 'set', icon: <FaTshirt />, desc: 'Comforters, sheets, and blankets.' },
];

const MIN_ORDER_VALUE = 99;

const OrderPlacement = () => {
    // keeping track of cart and order functions
    const { cart, addToCart, removeFromCart, updateQuantity, placeOrder, clearCart, totalItems, totalPrice } = useOrder();

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [addPaperBag, setAddPaperBag] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const paperBagCost = 6.00;

    // Calculate final total including paper bag
    const finalTotal = totalPrice + (addPaperBag ? paperBagCost : 0);
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useAuth();

    useEffect(() => {
        if (location.state && location.state.selectedSlot) {
            setSelectedSlot(location.state.selectedSlot);
            setStep(2); // Jump to schedule step
            // Optional: clear state so back button works expectedly? 
            // actually keeping it might be fine, but let's leave it for now.
        }
    }, [location.state]);

    const isBelowMOV = totalPrice < MIN_ORDER_VALUE;

    const handleProceedToSchedule = () => {
        if (isBelowMOV) {
            alert(`Minimum order value is ₹${MIN_ORDER_VALUE}`);
            return;
        }

        if (!currentUser) {
            navigate('/login', { state: { from: '/order' } });
            return;
        }
        setStep(2);
    };

    // checking what's in the cart for debugging
    console.log("Current Cart Items:", cart);

    const handlePlaceOrder = async () => {
        console.log("Placing order with slot:", selectedSlot);
        setLoading(true);

        try {
            await placeOrder({ ...selectedSlot, addPaperBag, finalTotal, deliveryAddress: selectedAddress }); // Pass new details
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
                    <>
                        <div className="bg-white rounded-2xl shadow-sm p-8 animate-fade-in">
                            {isBelowMOV && (
                                <div className="bg-red-500 text-white p-4 rounded-xl mb-6 flex items-start animate-fade-in shadow-md">
                                    <div className="bg-white/20 p-2 rounded-lg mr-3">
                                        <FaExclamationCircle className="text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Minimum Order Value</h3>
                                        <p className="text-sm opacity-90">The minimum order value is ₹{MIN_ORDER_VALUE}. Please add items to your cart.</p>
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
                                onClick={handleProceedToSchedule}
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
                    <div className="bg-gray-50 min-h-screen pb-40"> {/* Added padding for fixed footer */}
                        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
                            {/* Header - usually handled by parent, but ensuring it matches screenshot */}
                            {/* <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Order Details</h2> */}

                            {/* Card 1: Cart Summary */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 animate-fade-in">
                                <div className="flex items-center mb-4 text-slate-800">
                                    <FaShoppingCart className="text-brand mr-3 text-xl" />
                                    <h3 className="font-bold text-lg">Cart Summary</h3>
                                </div>

                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-slate-600 font-medium">Total Items</span>
                                    <span className="text-slate-900 font-bold">{totalItems}</span>
                                </div>

                                <div className="mb-6">
                                    <p className="text-slate-600 font-medium mb-2">Types of Services</p>
                                    <div className="flex flex-wrap gap-2">
                                        {/* Deduplicate service names/types roughly */}
                                        {[...new Set(cart.map(item => item.name.split(' ')[0]))].map((type, idx) => (
                                            <span key={idx} className={`px-3 py-1 rounded-full text-sm font-semibold ${idx % 2 === 0 ? 'bg-green-100 text-green-700' : 'bg-green-100 text-green-700'}`}>
                                                {type === 'Wash' ? 'Wash & Fold' : 'Regular'}
                                                {/* Logic to map names to 'Regular' or specific types if needed, treating 'Wash' as 'Wash & Fold' example */}
                                            </span>
                                        ))}
                                        {cart.length === 0 && <span className="text-gray-400 text-sm">No items</span>}
                                    </div>
                                </div>

                                <div className="flex items-center pt-4 border-t border-gray-100">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            id="paper-bag"
                                            checked={addPaperBag}
                                            onChange={(e) => setAddPaperBag(e.target.checked)}
                                            className="w-5 h-5 text-brand border-gray-300 rounded focus:ring-brand focus:ring-offset-0 cursor-pointer"
                                        />
                                        <label htmlFor="paper-bag" className="ml-3 text-slate-700 font-medium cursor-pointer select-none">
                                            Add a Paper Bag <span className="text-gray-400 font-normal">(₹{paperBagCost.toFixed(2)})</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Pickup & Delivery Time */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 animate-fade-in">
                                <div className="flex items-center mb-4 text-slate-800">
                                    <FaClock className="text-brand mr-3 text-xl" />
                                    <h3 className="font-bold text-lg">Pickup & Delivery Time</h3>
                                </div>

                                <div className="bg-blue-50 rounded-xl p-4 flex items-start text-blue-800">
                                    <FaInfoCircle className="mt-1 mr-3 flex-shrink-0 text-blue-500" />
                                    <p className="text-sm font-medium leading-relaxed">
                                        Orders will be picked up and delivered between 6:00 PM and 9:00 PM
                                        {selectedSlot && <span className="block mt-1 text-xs opacity-75">Selected Preference: {selectedSlot === 'morning' ? 'Morning (9-12)' : 'Afternoon (2-5)'}</span>}
                                    </p>
                                </div>
                            </div>

                            {/* Card 3: Delivery Address */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 animate-fade-in">
                                <div className="flex items-center mb-4 text-slate-800">
                                    <FaMapMarkerAlt className="text-brand mr-3 text-xl" />
                                    <h3 className="font-bold text-lg">Delivery Address</h3>
                                </div>

                                <div className="flex justify-between items-start">
                                    {selectedAddress ? (
                                        <div>
                                            <p className="font-bold text-slate-800">{selectedAddress.scTitle}</p>
                                            <p className="text-sm text-slate-600">{selectedAddress.scAddress}</p>
                                            <p className="text-xs text-slate-500">{selectedAddress.scCity}, {selectedAddress.scZip}</p>
                                        </div>
                                    ) : (
                                        <span className="text-gray-400">Select an address</span>
                                    )}
                                    <button
                                        onClick={() => setShowAddressModal(true)}
                                        className="bg-blue-50 text-brand px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors shrink-0 ml-4"
                                    >
                                        {selectedAddress ? 'Change' : 'Select'}
                                    </button>
                                </div>
                            </div>

                            {/* Address Modal */}
                            {showAddressModal && (
                                <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 animate-fade-in">
                                    <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative">
                                        <AddressList
                                            onSelectAddress={(addr) => {
                                                setSelectedAddress(addr);
                                                setShowAddressModal(false);
                                            }}
                                            selectedAddressId={selectedAddress?.id}
                                            onClose={() => setShowAddressModal(false)}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Card 4: Discount Coupon */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 animate-fade-in">
                                <div className="flex items-center mb-4 text-slate-800">
                                    <FaTags className="text-brand mr-3 text-xl" />
                                    <h3 className="font-bold text-lg">Discount Coupon</h3>
                                </div>

                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center text-slate-800 font-medium">
                                        <FaTags className="text-brand mr-2" />
                                        Discount Coupon
                                    </div>
                                    <button className="text-xs text-brand font-bold hover:underline">Available Coupons</button>
                                </div>

                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        placeholder="Enter Coupon Code"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                                    />
                                    <button className="bg-brand text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-brand-dark transition-colors shadow-sm">
                                        APPLY
                                    </button>
                                </div>
                            </div>

                            {/* Card 5: Wallet Balance */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 animate-fade-in">
                                <div className="flex items-center mb-4 text-slate-800">
                                    <FaWallet className="text-brand mr-3 text-xl" />
                                    <h3 className="font-bold text-lg">Wallet Balance</h3>
                                </div>

                                <div className="bg-blue-50 rounded-xl p-4 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="bg-brand w-10 h-10 rounded-full flex items-center justify-center mr-3 text-white">
                                            <FaWallet />
                                        </div>
                                        <span className="font-medium text-slate-800">Available Balance</span>
                                    </div>
                                    <span className="text-green-600 font-bold border border-green-200 bg-white px-3 py-1 rounded-full">₹0.00</span>
                                </div>
                            </div>

                            {/* Card 6: Bill Summary */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 mb-24 animate-fade-in">
                                <div className="flex items-center mb-4 text-slate-800">
                                    <FaFileInvoice className="text-brand mr-3 text-xl" />
                                    <h3 className="font-bold text-lg">Bill Summary</h3>
                                </div>

                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-bold text-lg text-slate-800">Summary</span>
                                    <button className="text-brand text-sm font-medium flex items-center bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100">
                                        View Details <FaChevronDown className="ml-1 text-xs" />
                                    </button>
                                </div>

                                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                                    <span className="font-bold text-slate-800">Total Amount</span>
                                    <span className="font-black text-xl text-slate-900">₹{finalTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Fixed Footer */}
                        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
                            <div className="max-w-2xl mx-auto w-full">
                                <Button
                                    onClick={handlePlaceOrder}
                                    isLoading={loading}
                                    disabled={!selectedAddress} // Disable if no address selected
                                    className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all ${!selectedAddress ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand hover:bg-brand-dark shadow-xl hover:shadow-brand/30'}`}
                                >
                                    {selectedAddress ? 'Place Order' : 'Select Address to Proceed'}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

export default OrderPlacement;
