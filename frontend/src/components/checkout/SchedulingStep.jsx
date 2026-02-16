import React from 'react';
import { FaCheck } from 'react-icons/fa';

const SchedulingStep = ({ selectedSlot, setSelectedSlot, onNext, onBack }) => {
    return (
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
