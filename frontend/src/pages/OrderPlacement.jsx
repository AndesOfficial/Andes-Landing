import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import { Helmet } from "react-helmet-async";
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

import CartReviewStep from '../components/checkout/CartReviewStep';
import PaymentSummaryStep from '../components/checkout/PaymentSummaryStep';

const MIN_ORDER_VALUE = 99;

/**
 * OrderPlacement Component
 * Handles the 2-step checkout flow:
 * Step 1: Cart Review
 * Step 2: Payment & Address Summary
 */
const OrderPlacement = () => {
    const { cart, addToCart, removeFromCart, updateQuantity, placeOrder, clearCart, totalItems, totalPrice } = useOrder();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedSlot] = useState('standard'); // Default slot as per user request
    const [addPaperBag, setAddPaperBag] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [couponDiscount, setCouponDiscount] = useState(0);

    const paperBagCost = 6.00;
    const convenienceFee = 10;
    const deliveryFee = totalPrice >= 99 ? 0 : 40;

    // finalTotal = Item Total + Convenience Fee + Delivery Fee + Extras - Discount
    const finalTotal = totalPrice + convenienceFee + deliveryFee + (addPaperBag ? paperBagCost : 0) - couponDiscount;

    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useAuth();

    useEffect(() => {
        // Handle incoming navigation state
        if (location.state && location.state.selectedSlot) {
            setStep(2);
        }
        window.scrollTo(0, 0);
    }, [location.state, step]);

    const isBelowMOV = totalPrice < MIN_ORDER_VALUE;

    const handleProceedToPayment = () => {
        if (isBelowMOV) {
            toast.error(`Minimum order value is ₹${MIN_ORDER_VALUE}`);
            return;
        }
        if (!currentUser) {
            navigate('/login', { state: { from: '/order' } });
            return;
        }
        setStep(2);
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            toast.error("Please select a delivery address.");
            return;
        }
        setLoading(true);
        try {
            await placeOrder({
                deliverySlot: selectedSlot,
                addPaperBag,
                finalTotal,
                deliveryAddress: selectedAddress,
                convenienceFee,
                deliveryFee,
                couponDiscount
            });
            navigate('/order-confirmation');
        } catch (error) {
            console.error("Order placement failed:", error);
            toast.error("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[100dvh] bg-slate-50 pt-24 pb-12">
            <Helmet>
                <title>Checkout | Andes Laundry</title>
                <meta name="description" content="Review your cart and place your laundry order." />
            </Helmet>

            <div className="max-w-3xl mx-auto px-4 relative">
                {/* Header & Back Button */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => step === 1 ? navigate(-1) : setStep(1)}
                        className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-600 hover:text-brand transition-all hover:shadow-md active:scale-95"
                    >
                        <FaArrowLeft />
                    </button>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                        {step === 1 ? 'Review Cart' : 'Checkout'}
                    </h1>
                </div>

                {/* PREMIUM SLEEK STEPPER */}
                <div className="flex items-center justify-center mb-12 px-8">
                    <div className="relative flex items-center justify-between w-full max-w-xs">
                        {/* Connecting Line background */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 rounded-full overflow-hidden">
                            {/* Animated line fill */}
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: step === 2 ? "100%" : "0%" }}
                                className="h-full bg-brand shadow-[0_0_8px_rgba(0,137,255,0.5)]"
                            />
                        </div>

                        {/* Step 1 Circle */}
                        <div className="relative z-10 flex flex-col items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 shadow-md ${step >= 1 ? 'bg-brand text-white' : 'bg-white text-slate-400 border border-slate-200'}`}>
                                {step > 1 ? <FaCheck size={12} /> : '1'}
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${step >= 1 ? 'text-brand' : 'text-slate-400'}`}>Cart</span>
                        </div>

                        {/* Step 2 Circle */}
                        <div className="relative z-10 flex flex-col items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 shadow-md ${step === 2 ? 'bg-brand text-white ring-4 ring-brand/10' : 'bg-white text-slate-400 border border-slate-200'}`}>
                                2
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${step === 2 ? 'text-brand' : 'text-slate-400'}`}>Summary</span>
                        </div>
                    </div>
                </div>

                {/* STEP CONTENT WITH ANIMATION */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {step === 1 ? (
                            <CartReviewStep
                                cart={cart}
                                updateQuantity={updateQuantity}
                                removeFromCart={removeFromCart}
                                clearCart={clearCart}
                                totalPrice={totalPrice}
                                isBelowMOV={isBelowMOV}
                                minOrderValue={MIN_ORDER_VALUE}
                                onNext={handleProceedToPayment}
                                addToCart={addToCart}
                            />
                        ) : (
                            <PaymentSummaryStep
                                cart={cart}
                                totalItems={totalItems}
                                totalPrice={totalPrice}
                                addPaperBag={addPaperBag}
                                setAddPaperBag={setAddPaperBag}
                                paperBagCost={paperBagCost}
                                convenienceFee={convenienceFee}
                                deliveryFee={deliveryFee}
                                couponDiscount={couponDiscount}
                                setCouponDiscount={setCouponDiscount}
                                selectedSlot={selectedSlot}
                                selectedAddress={selectedAddress}
                                setSelectedAddress={setSelectedAddress}
                                finalTotal={finalTotal}
                                onPlaceOrder={handlePlaceOrder}
                                loading={loading}
                                onBack={() => setStep(1)}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default OrderPlacement;
