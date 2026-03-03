import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../components/common/Button';
import { Helmet } from 'react-helmet-async';
import { FaCheckCircle, FaWallet, FaShieldAlt, FaMapMarkerAlt, FaFileInvoice, FaRegCopy, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

const OrderConfirmation = () => {
    const [showConfetti, setShowConfetti] = useState(true);
    const location = useLocation();

    // In a real app, you'd get this from location.state or context
    const orderId = location.state?.orderId || "#ORD-89234";

    // Stop confetti after 5 seconds to prevent overwhelming the UI
    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 py-12 relative overflow-hidden font-sans">
            <Helmet>
                <title>Order Confirmed | Andes Laundry</title>
                <meta name="robots" content="noindex" />
            </Helmet>

            {/* Confetti Celebration */}
            {showConfetti && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={400}
                    gravity={0.15}
                    colors={['#0089FF', '#22c55e', '#fbbf24', '#a855f7', '#ec4899']}
                    style={{ zIndex: 100 }}
                />
            )}

            {/* Subtle Dribbble-style Gradient Orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#0089FF]/10 rounded-full blur-[100px] opacity-70 pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-green-400/10 rounded-full blur-[100px] opacity-70 pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="max-w-md w-full relative z-10"
            >
                {/* The "Receipt" Card */}
                <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden text-center relative">

                    {/* Top Accent Bar */}
                    <div className="h-2 w-full bg-gradient-to-r from-[#0089FF] via-blue-400 to-green-400"></div>

                    <div className="p-8 md:p-10">
                        {/* Animated Success Checkmark Ring */}
                        <div className="flex justify-center mb-8 relative">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 250, damping: 15, delay: 0.3 }}
                                className="relative z-10"
                            >
                                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 border-4 border-white">
                                    <FaCheckCircle className="text-5xl text-white" />
                                </div>
                            </motion.div>

                            {/* Pulsing rings */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: [1, 1.3, 1.8], opacity: [0.3, 0.1, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
                                className="absolute inset-0 bg-green-400 rounded-full z-0 pointer-events-none"
                            ></motion.div>
                        </div>

                        <h1 className="text-3xl lg:text-4xl font-black text-slate-900 mb-3 tracking-tight">Order Confirmed!</h1>
                        <p className="text-slate-500 mb-8 font-medium leading-relaxed px-2 text-sm">
                            Thank you for choosing Andes. Your pickup has been scheduled successfully.
                        </p>

                        {/* Order Details - Receipt Style */}
                        <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100/60 shadow-inner relative">
                            {/* Decorative Receipt Notches */}
                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-r border-slate-100"></div>
                            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-l border-slate-100"></div>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between pb-4 border-b border-dashed border-slate-200">
                                    <div className="text-left">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Order ID</p>
                                        <p className="text-lg font-mono font-black text-slate-800 tracking-wider flex items-center gap-2">
                                            {orderId}
                                            <button className="text-slate-300 hover:text-[#0089FF] transition-colors"><FaRegCopy size={14} /></button>
                                        </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0089FF]">
                                        <FaFileInvoice />
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 text-left">
                                    <div className="mt-1 text-slate-400 bg-white p-1.5 rounded-lg shadow-sm border border-slate-100">
                                        <FaCalendarAlt size={12} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Pickup Date</p>
                                        <p className="text-sm font-bold text-slate-700">Scheduled for Today</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Premium Pay on Delivery Notice */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="bg-gradient-to-br from-[#0089FF]/5 to-indigo-50/40 rounded-3xl p-6 mb-8 border border-[#0089FF]/10 relative overflow-hidden group hover:border-[#0089FF]/20 transition-colors"
                        >
                            <div className="absolute -right-6 -top-6 text-[#0089FF]/5 text-9xl rotate-12 group-hover:rotate-6 transition-transform duration-700 ease-out">
                                <FaWallet />
                            </div>

                            <div className="relative z-10 text-left">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="bg-white p-2.5 rounded-xl shadow-sm border border-slate-100 text-[#0089FF]">
                                        <FaWallet size={18} />
                                    </div>
                                    <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">Pay on Delivery</h3>
                                </div>
                                <p className="text-[13px] font-medium text-slate-600 leading-relaxed mb-4">
                                    No advance payment required! Pay conveniently via Cash or UPI when we deliver your fresh garments.
                                </p>

                                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white shadow-sm">
                                    <FaShieldAlt className="text-green-500 text-xs" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-700">100% Secure Checkout</span>
                                </div>
                            </div>
                        </motion.div>

                        <Link to="/">
                            <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_8px_20px_-8px_rgba(0,137,255,0.4)] hover:shadow-[0_12px_25px_-8px_rgba(0,137,255,0.6)] hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2">
                                Track My Order
                            </Button>
                        </Link>

                        <div className="mt-6 text-center">
                            <Link to="/" className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">
                                Return to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default OrderConfirmation;
