import React, { useState } from 'react';
import { FaShoppingCart, FaClock, FaInfoCircle, FaMapMarkerAlt, FaTags, FaWallet, FaFileInvoice, FaChevronDown, FaChevronUp, FaArrowLeft, FaShieldAlt, FaPlus, FaCheck, FaChevronRight } from 'react-icons/fa';
import AddressList from '../AddressList';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PaymentSummaryStep Component
 * Step 2: Finalize address, view bill breakdown, and place order.
 */
const PaymentSummaryStep = ({
    cart,
    totalItems,
    totalPrice,
    addPaperBag,
    setAddPaperBag,
    paperBagCost,
    convenienceFee,
    deliveryFee,
    couponDiscount,
    setCouponDiscount,
    selectedSlot,
    selectedAddress,
    setSelectedAddress,
    finalTotal,
    onPlaceOrder,
    loading,
    onBack
}) => {
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [couponInput, setCouponInput] = useState('');
    const [couponError, setCouponError] = useState('');
    const [showBillDetails, setShowBillDetails] = useState(false);
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

    const handleApplyCoupon = () => {
        setIsApplyingCoupon(true);
        setCouponError('');

        // Simulating API call for coupon validation
        setTimeout(() => {
            const upperCode = couponInput.toUpperCase();
            if (upperCode === 'WELCOME20') {
                setCouponDiscount(20);
                toast.success("₹20 discount applied!");
            } else if (upperCode === 'ANDES10') {
                setCouponDiscount(10);
                toast.success("₹10 discount applied!");
            } else {
                setCouponError('Invalid coupon code');
                setCouponDiscount(0);
            }
            setIsApplyingCoupon(false);
        }, 600);
    };

    // Bill Breakdown Calculations
    const taxValue = totalPrice * 0.05; // Assuming 5% GST
    const pickupCharge = totalPrice > 500 ? 0 : 40; // Example: Free above 500, else 40

    return (
        <div className="pb-32 lg:pb-0"> {/* Padding for fixed bottom CTA */}
            <div className="space-y-6">

                {/* 1. DELIVERY ADDRESS SECTION */}
                <div className="bg-white rounded-3xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-slate-100 ring-1 ring-slate-100/50">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-brand/5 flex items-center justify-center text-brand shadow-inner">
                                <FaMapMarkerAlt size={18} />
                            </div>
                            <h3 className="font-black text-slate-800 tracking-tight">Delivery Address</h3>
                        </div>
                        <button
                            onClick={() => setShowAddressModal(true)}
                            className="text-xs font-black text-brand uppercase tracking-widest bg-brand/5 px-4 py-2 rounded-xl transition-all hover:bg-brand hover:text-white active:scale-95"
                        >
                            {selectedAddress ? 'Change' : 'Select'}
                        </button>
                    </div>

                    {selectedAddress ? (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100 flex items-start gap-4"
                        >
                            <div className="mt-1 text-slate-400">
                                <FaMapMarkerAlt size={14} />
                            </div>
                            <div>
                                <p className="font-black text-slate-800 mb-1">{selectedAddress.scTitle}</p>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{selectedAddress.scAddress}</p>
                                <p className="text-xs text-slate-400 font-bold mt-2 uppercase tracking-tight">{selectedAddress.scCity}, {selectedAddress.scZip}</p>
                            </div>
                        </motion.div>
                    ) : (
                        <button
                            onClick={() => setShowAddressModal(true)}
                            className="w-full h-32 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 group hover:border-brand/40 hover:bg-brand/5 transition-all outline-none"
                        >
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-brand group-hover:text-white transition-all">
                                <FaPlus size={14} />
                            </div>
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-brand">Select an address</span>
                        </button>
                    )}
                </div>

                {/* 2. PICKUP WINDOW (READ-ONLY PER USER REQ) */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-2xl bg-brand/5 flex items-center justify-center text-brand">
                            <FaClock size={16} />
                        </div>
                        <h3 className="font-black text-slate-800 tracking-tight">Pickup Timing</h3>
                    </div>
                    <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100 flex items-center gap-3">
                        <FaInfoCircle className="text-brand shrink-0" />
                        <div className="text-sm">
                            <span className="font-black text-blue-900 block tracking-tight">Standard Pickup window</span>
                            <span className="text-blue-700 font-bold">6:00 PM - 9:00 PM Today</span>
                        </div>
                    </div>
                </div>

                {/* 3. EXTRAS & OFFERS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Paper Bag Toggle */}
                    <button
                        onClick={() => setAddPaperBag(!addPaperBag)}
                        className={`p-5 rounded-3xl border-2 transition-all flex items-center gap-4 text-left group ${addPaperBag ? 'bg-brand/5 border-brand ring-1 ring-brand/20' : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'}`}
                    >
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${addPaperBag ? 'bg-brand text-white' : 'bg-slate-50 text-slate-400 group-hover:text-slate-600'}`}>
                            <FaShoppingCart size={14} />
                        </div>
                        <div className="flex-grow">
                            <span className="text-xs font-black text-slate-800 uppercase tracking-widest block mb-0.5">Add Paper Bag</span>
                            <span className="text-[10px] font-bold text-slate-400">₹{paperBagCost.toFixed(0)} additional</span>
                        </div>
                        <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${addPaperBag ? 'border-brand bg-brand text-white' : 'border-slate-200'}`}>
                            {addPaperBag && <FaCheck size={10} />}
                        </div>
                    </button>

                    {/* Coupon Section */}
                    <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-3">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-yellow-50 text-yellow-600 flex items-center justify-center">
                                <FaTags size={14} />
                            </div>
                            <div className="flex-grow">
                                <span className="text-xs font-black text-slate-800 uppercase tracking-widest block mb-0.5">Apply Coupon</span>
                                <span className="text-[10px] font-bold text-slate-400">Save more on your order</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={couponInput}
                                onChange={(e) => setCouponInput(e.target.value)}
                                placeholder="Enter code (e.g. WELCOME20)"
                                className="flex-grow bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm font-bold focus:ring-2 focus:ring-brand/20 outline-none transition-all placeholder:text-slate-300 uppercase"
                            />
                            <button
                                onClick={handleApplyCoupon}
                                disabled={isApplyingCoupon || !couponInput}
                                className="bg-brand text-white px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-dark transition-all disabled:bg-slate-200 active:scale-95"
                            >
                                {isApplyingCoupon ? '...' : 'Apply'}
                            </button>
                        </div>
                        {couponError && <p className="text-[10px] text-red-500 font-bold px-1">{couponError}</p>}
                        {couponDiscount > 0 && <p className="text-[10px] text-green-600 font-black px-1 uppercase tracking-tight">🎉 Coupon Applied: -₹{couponDiscount}</p>}
                    </div>
                </div>

                {/* 4. PREMIUM BILL SUMMARY (RECEIPT STYLE) */}
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
                    <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FaFileInvoice className="text-slate-400" />
                            <h3 className="font-extrabold text-slate-800 tracking-tight">Bill Summary</h3>
                        </div>
                        <button
                            onClick={() => setShowBillDetails(!showBillDetails)}
                            className="flex items-center gap-1.5 text-[10px] font-black text-brand uppercase tracking-[0.1em] px-3 py-1.5 rounded-full bg-brand/5 hover:bg-brand hover:text-white transition-all active:scale-95"
                        >
                            {showBillDetails ? 'Hide' : 'View Details'}
                            {showBillDetails ? <FaChevronUp size={8} /> : <FaChevronDown size={8} />}
                        </button>
                    </div>

                    <div className="p-6 space-y-4">
                        <AnimatePresence>
                            {showBillDetails && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden space-y-3 border-b border-dashed border-slate-200 pb-4"
                                >
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-slate-500">Item Total</span>
                                        <span className="text-slate-800">₹{totalPrice.toFixed(0)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-slate-500">Convenience Fee</span>
                                        <span className="text-slate-800">₹{convenienceFee}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-slate-500">Delivery Fee</span>
                                        <span className={deliveryFee === 0 ? "text-green-600" : "text-slate-800"}>
                                            {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                                        </span>
                                    </div>
                                    {addPaperBag && (
                                        <div className="flex justify-between text-sm font-bold">
                                            <span className="text-slate-500">Paper Bag Charge</span>
                                            <span className="text-slate-800">₹{paperBagCost.toFixed(0)}</span>
                                        </div>
                                    )}
                                    {couponDiscount > 0 && (
                                        <div className="flex justify-between text-sm font-black italic">
                                            <span className="text-green-600 uppercase tracking-tighter">Coupon Discount</span>
                                            <span className="text-green-600">-₹{couponDiscount}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-300">
                                        <span>Taxes included</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex justify-between items-center bg-brand/5 p-4 rounded-[1.5rem] border border-brand/10">
                            <span className="font-black text-slate-800 tracking-tight text-lg">Total amount</span>
                            <span className="text-2xl font-black text-brand">₹{finalTotal.toFixed(0)}</span>
                        </div>
                    </div>

                    {/* Safety Badge */}
                    <div className="p-4 bg-slate-50 flex items-center justify-center gap-3">
                        <FaShieldAlt className="text-green-500" size={14} />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Safe & Secure checkout</span>
                    </div>
                </div>
            </div>

            {/* FIXED BOTTOM CTA - MATCHES Swiggy/Urban Company style */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-4 flex items-center justify-center z-50 lg:relative lg:bg-transparent lg:border-0 lg:px-0 lg:py-12 lg:z-10 animate-slide-up">
                <div className="w-full max-w-3xl flex items-center justify-between gap-6">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Paying To Andes</span>
                        <span className="text-xl font-black text-slate-900 leading-none">₹{finalTotal.toFixed(0)}</span>
                    </div>

                    <button
                        onClick={onPlaceOrder}
                        disabled={loading || !selectedAddress}
                        className={`group cursor-pointer px-10 py-4 h-[56px] rounded-2xl font-black text-white shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95 disabled:grayscale disabled:opacity-50 min-w-[200px] ${!selectedAddress
                            ? 'bg-slate-300'
                            : 'bg-green-600 hover:bg-green-700 shadow-green-500/20 hover:-translate-y-0.5'}`}
                    >
                        {loading ? (
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span className="uppercase tracking-widest text-xs">Processing...</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <span className="uppercase tracking-widest text-xs">{selectedAddress ? 'Place Order' : 'Select Address'}</span>
                                {selectedAddress && <FaChevronRight size={10} />}
                            </div>
                        )}
                    </button>
                </div>
            </div>

            {/* ADDRESS MODAL */}
            {showAddressModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
                    >
                        <AddressList
                            onSelectAddress={(addr) => {
                                setSelectedAddress(addr);
                                setShowAddressModal(false);
                            }}
                            selectedAddressId={selectedAddress?.id}
                            onClose={() => setShowAddressModal(false)}
                        />
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default PaymentSummaryStep;
