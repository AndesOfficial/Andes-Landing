import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaClock, FaInfoCircle, FaMapMarkerAlt, FaTags, FaWallet, FaFileInvoice, FaChevronDown } from 'react-icons/fa';
import AddressList from '../AddressList';
import Button from '../common/Button';

const PaymentSummaryStep = ({
    cart,
    totalItems,
    totalPrice,
    addPaperBag,
    setAddPaperBag,
    paperBagCost,
    selectedSlot,
    selectedAddress,
    setSelectedAddress,
    finalTotal,
    onPlaceOrder,
    loading
}) => {
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [couponCode, setCouponCode] = useState('');

    return (
        <div className="bg-gray-50 min-h-screen pb-40"> {/* Added padding for fixed footer */}
            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
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
                            {[...new Set(cart.map(item => item.name.split(' ')[0]))].map((type, idx) => (
                                <span key={idx} className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                                    {type === 'Wash' ? 'Wash & Fold' : 'Regular'}
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
                        onClick={onPlaceOrder}
                        isLoading={loading}
                        disabled={!selectedAddress} // Disable if no address selected
                        className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all ${!selectedAddress ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand hover:bg-brand-dark shadow-xl hover:shadow-brand/30'}`}
                    >
                        {selectedAddress ? 'Place Order' : 'Select Address to Proceed'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSummaryStep;
