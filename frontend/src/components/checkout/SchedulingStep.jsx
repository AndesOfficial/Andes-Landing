import React from 'react';
import { FaCheck } from 'react-icons/fa';

const SchedulingStep = ({ selectedSlot, setSelectedSlot, onNext, onBack }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-8 animate-fade-in max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">When should we pickup?</h2>

            <div className="space-y-4 mb-8">
                <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">Pickup Time</label>
                <div
                    className="relative border-2 border-brand bg-brand/5 ring-1 ring-brand rounded-xl p-5 cursor-pointer transition-all"
                    onClick={() => setSelectedSlot('standard')}
                >
                    <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900">Standard Pickup</span>
                        <FaCheck className="text-brand" />
                    </div>
                    <div className="text-sm text-slate-500">6:00 PM - 9:00 AM</div>
                    <div className="mt-2 text-xs text-brand font-medium bg-brand/10 inline-block px-2 py-1 rounded">
                        Only one slot available
                    </div>
                </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-100">
                <button onClick={onBack} className="px-6 py-2 text-slate-500 font-medium hover:text-slate-800">
                    Back
                </button>
                <button
                    onClick={onNext}
                    disabled={!selectedSlot}
                    className={`px-8 py-3 rounded-xl font-bold transition-all ${!selectedSlot ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-brand text-white hover:bg-brand-dark shadow-lg'}`}
                >
                    Review Order
                </button>
            </div>
        </div>
    );
};

export default SchedulingStep;
