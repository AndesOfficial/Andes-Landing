import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBolt, FaMoon, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SchedulingWidget = () => {
    const navigate = useNavigate();

    const handleSlotClick = (slot) => {
        navigate('/order', { state: { selectedSlot: slot } });
    };

    return (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-2xl w-full max-w-xl border border-white/40">
            <h3 className="text-slate-800 font-semibold mb-4 text-lg">
                Schedule your collection in <span className="text-brand">Pune</span>
            </h3>

            <div className="flex flex-col sm:flex-row gap-3">
                <div
                    onClick={() => handleSlotClick('morning')}
                    className="flex-1 w-full border border-gray-100 bg-white/50 rounded-2xl p-3 flex items-center justify-between cursor-pointer hover:border-brand hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out group"
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-yellow-100 p-2 rounded-full">
                            <FaBolt className="text-lg text-yellow-500" />
                        </div>
                        <div>
                            <p className="text-[10px] text-brand-dark font-bold uppercase tracking-wider mb-0.5">Earliest</p>
                            <p className="text-slate-800 font-bold text-base group-hover:text-brand transition-colors ease-in-out duration-300">09:00 - 12:00</p>
                        </div>
                    </div>
                    <FaChevronRight className="text-gray-300 font-bold text-sm group-hover:text-brand" />
                </div>

                <div
                    onClick={() => handleSlotClick('afternoon')}
                    className="flex-1 w-full border border-gray-100 bg-white/50 rounded-2xl p-3 flex items-center justify-between cursor-pointer hover:border-brand hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out group"
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-slate-100 p-2 rounded-full">
                            <FaMoon className="text-lg text-slate-400" />
                        </div>
                        <div>
                            <p className="text-[10px] text-brand-dark font-bold uppercase tracking-wider mb-0.5">Last</p>
                            <p className="text-slate-800 font-bold text-base group-hover:text-brand transition-colors ease-in-out duration-300">14:00 - 17:00</p>
                        </div>
                    </div>
                    <FaChevronRight className="text-gray-300 font-bold text-sm group-hover:text-brand" />
                </div>
            </div>

            <div className="mt-4 text-center">
                <Link to="/services" className="text-brand font-bold text-sm hover:underline hover:text-brand-dark transition-colors duration-300 ease-in-out">
                    Book Now
                </Link>
            </div>
        </div>
    );
};

export default SchedulingWidget;
