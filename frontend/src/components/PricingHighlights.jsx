import React from 'react';
import { FaCheck, FaRupeeSign, FaTruck, FaWallet } from 'react-icons/fa';

const PricingHighlights = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Why Choose Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="flex flex-col items-center p-4">
          <FaWallet className="text-indigo-600 text-3xl mb-2" />
          <h3 className="font-semibold text-gray-800">Simple Pricing</h3>
          <p className="text-gray-600 text-sm text-center">Clear rates with no surprises</p>
        </div>
        <div className="flex flex-col items-center p-4">
          <FaCheck className="text-indigo-600 text-3xl mb-2" />
          <h3 className="font-semibold text-gray-800">No Hidden Fees</h3>
          <p className="text-gray-600 text-sm text-center">What you see is what you pay</p>
        </div>
        <div className="flex flex-col items-center p-4">
          <FaTruck className="text-indigo-600 text-3xl mb-2" />
          <h3 className="font-semibold text-gray-800">Free 48h Delivery</h3>
          <p className="text-gray-600 text-sm text-center">Fast and reliable</p>
        </div>
        <div className="flex flex-col items-center p-4">
          <FaRupeeSign className="text-indigo-600 text-3xl mb-2" />
          <h3 className="font-semibold text-gray-800">₹50 Minimum Order</h3>
          <p className="text-gray-600 text-sm text-center">Easy to get started</p>
        </div>
        <div className="flex flex-col items-center p-4">
          <FaRupeeSign className="text-indigo-600 text-3xl mb-2" />
          <h3 className="font-semibold text-gray-800">Service Fee from ₹8</h3>
          <p className="text-gray-600 text-sm text-center">Low additional costs</p>
        </div>
      </div>
    </div>
  );
};

export default PricingHighlights;