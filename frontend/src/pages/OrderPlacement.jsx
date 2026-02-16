import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { FaArrowLeft } from 'react-icons/fa';
import { Helmet } from "react-helmet-async";
import { toast } from 'react-toastify';

import CartReviewStep from '../components/checkout/CartReviewStep';
import SchedulingStep from '../components/checkout/SchedulingStep';
import PaymentSummaryStep from '../components/checkout/PaymentSummaryStep';

const MIN_ORDER_VALUE = 99;

const OrderPlacement = () => {
    // keeping track of cart and order functions
    const { cart, addToCart, removeFromCart, updateQuantity, placeOrder, clearCart, totalItems, totalPrice } = useOrder();

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [addPaperBag, setAddPaperBag] = useState(false);
    // showAddressModal and couponCode moved to PaymentSummaryStep or keep if needed?
    // PaymentSummaryStep handles them internally for UI. 
    // couponCode state was local to input, didn't seem to affect order logic in original code.
    // selectedAddress IS needed for placeOrder, so keep it here.
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
        }
    }, [location.state]);

    const isBelowMOV = totalPrice < MIN_ORDER_VALUE;

    const handleProceedToSchedule = () => {
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
        console.log("Placing order with slot:", selectedSlot);
        setLoading(true);

        try {
            await placeOrder({ ...selectedSlot, addPaperBag, finalTotal, deliveryAddress: selectedAddress }); // Pass new details
            navigate('/order-confirmation');
        } catch (error) {
            console.log("Something went wrong:", error);
            toast.error("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[100dvh] bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Checkout | Andes Laundry</title>
                <meta name="description" content="Review your cart and schedule your laundry pickup." />
            </Helmet>
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                    <button onClick={() => navigate(-1)} className="mr-4 text-slate-500 hover:text-slate-800">
                        <FaArrowLeft className="text-xl" />
                    </button>
                    <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
                </div>

                {/* Stepper */}
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
                    <CartReviewStep
                        cart={cart}
                        updateQuantity={updateQuantity}
                        removeFromCart={removeFromCart}
                        clearCart={clearCart}
                        totalPrice={totalPrice}
                        isBelowMOV={isBelowMOV}
                        minOrderValue={MIN_ORDER_VALUE}
                        onNext={handleProceedToSchedule}
                        addToCart={addToCart}
                    />
                )}

                {step === 2 && (
                    <SchedulingStep
                        selectedSlot={selectedSlot}
                        setSelectedSlot={setSelectedSlot}
                        onNext={() => setStep(3)}
                        onBack={() => setStep(1)}
                    />
                )}

                {step === 3 && (
                    <PaymentSummaryStep
                        cart={cart}
                        totalItems={totalItems}
                        totalPrice={totalPrice}
                        addPaperBag={addPaperBag}
                        setAddPaperBag={setAddPaperBag}
                        paperBagCost={paperBagCost}
                        selectedSlot={selectedSlot}
                        selectedAddress={selectedAddress}
                        setSelectedAddress={setSelectedAddress}
                        finalTotal={finalTotal}
                        onPlaceOrder={handlePlaceOrder}
                        loading={loading}
                        onBack={() => setStep(2)}
                    />
                )}
            </div>
        </div >
    );
};

export default OrderPlacement;
