import React, { useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase';
import { FaWhatsapp, FaPaperPlane, FaTimes, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const WhatsAppTestTool = ({ onClose }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [type, setType] = useState('text'); // 'text' or 'template'
    const [templateName, setTemplateName] = useState('order_placed');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // { success: boolean, message: string }

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!phoneNumber) {
            toast.error("Please enter a phone number");
            return;
        }

        setLoading(true);
        setStatus(null);

        try {
            const sendWhatsAppMessage = httpsCallable(functions, 'sendWhatsAppMessage');
            const result = await sendWhatsAppMessage({
                to: phoneNumber,
                type: type,
                body: message,
                templateName: type === 'template' ? templateName : undefined,
                parameters: type === 'template' ? ['Test User', 'Laundry Services', 'ORD-TEST-123'] : undefined
            });

            if (result.data.success) {
                setStatus({ success: true, message: `Message sent! ID: ${result.data.messageId}` });
                toast.success("Message sent successfully!");
            } else {
                setStatus({ success: false, message: `Error: ${result.data.error.error?.message || 'Unknown error'}` });
                toast.error("Failed to send message.");
            }
        } catch (error) {
            console.error("Tool Error:", error);
            setStatus({ success: false, message: error.message });
            toast.error("An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-200">
                        <FaWhatsapp size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">WhatsApp Tool</h2>
                </div>
                {onClose && (
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <FaTimes />
                    </button>
                )}
            </div>

            <form onSubmit={handleSendMessage} className="space-y-5">
                <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Phone Number</label>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="e.g. 919876543210"
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-green-500/20 outline-none transition-all placeholder:text-slate-300"
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Message Type</label>
                    <div className="flex gap-2 p-1 bg-slate-50 rounded-xl border border-slate-100">
                        <button
                            type="button"
                            onClick={() => setType('text')}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${type === 'text' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Custom Text
                        </button>
                        <button
                            type="button"
                            onClick={() => setType('template')}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${type === 'template' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Template
                        </button>
                    </div>
                </div>

                {type === 'text' ? (
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Message Content</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message here..."
                            rows={3}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-green-500/20 outline-none transition-all placeholder:text-slate-300 resize-none"
                        />
                        <p className="text-[10px] text-orange-500 font-bold mt-2 flex items-center gap-1">
                            <FaExclamationTriangle size={8} /> Only works if user messaged in last 24h
                        </p>
                    </div>
                ) : (
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Template Name</label>
                        <input
                            type="text"
                            value={templateName}
                            onChange={(e) => setTemplateName(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                        />
                        <p className="text-[10px] text-slate-400 font-bold mt-2">Default test params: [Name, Service, OrderID]</p>
                    </div>
                )}

                {status && (
                    <div className={`p-4 rounded-xl text-xs font-bold flex items-start gap-3 ${status.success ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                        {status.success ? <FaCheckCircle className="mt-0.5 shrink-0" /> : <FaExclamationTriangle className="mt-0.5 shrink-0" />}
                        <span className="break-all">{status.message}</span>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-green-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                >
                    {loading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
                    {loading ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    );
};

export default WhatsAppTestTool;
