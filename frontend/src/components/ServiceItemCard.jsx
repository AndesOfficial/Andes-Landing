import React from 'react';
import { motion } from 'framer-motion';

const ServiceItemCard = ({ service, onAdd }) => {
    const { displayName, actualPrice, fakePrice, image, unit, badge } = service;

    const discount = fakePrice ? Math.round(((fakePrice - actualPrice) / fakePrice) * 100) : 0;

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col h-full group"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={image}
                    alt={displayName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {discount > 0 && (
                    <div className="absolute top-0 right-0 bg-blue-500 text-white font-bold text-xs px-3 py-1.5 rounded-bl-2xl">
                        {discount}% OFF
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-slate-800 font-bold mb-1 line-clamp-1">{displayName}</h3>
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-black text-slate-900 leading-none">₹{actualPrice}/{unit}</span>
                    {fakePrice && (
                        <span className="text-sm text-slate-400 line-through">₹{fakePrice}</span>
                    )}
                </div>

                {/* Add Button */}
                <button
                    onClick={() => onAdd(service)}
                    className="mt-auto w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-2xl transition-colors shadow-lg shadow-blue-500/20 active:scale-95 transform transition-transform"
                >
                    Add to Cart
                </button>
            </div>
        </motion.div>
    );
};

export default ServiceItemCard;
