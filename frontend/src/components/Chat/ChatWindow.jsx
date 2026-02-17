import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaRobot } from 'react-icons/fa';
import { getBotResponse, createInitialMessage } from '../../utils/chatLogic';
import { useNavigate } from 'react-router-dom';

const ChatWindow = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([createInitialMessage()]);
    const [inputValue, setInputValue] = useState('');
    const [chatState, setChatState] = useState('IDLE'); // New: Track conversation state
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = (text) => {
        if (!text.trim()) return;

        // Add User Message
        const userMsg = { id: Date.now(), text: text, sender: 'user' };
        setMessages((prev) => [...prev, userMsg]);
        setInputValue('');

        // Simulate Bot Typing
        setTimeout(() => {
            // Pass current chatState to the logic function
            let botResponse = getBotResponse(text, chatState);

            // Update state based on bot's decision
            if (botResponse.nextState) {
                setChatState(botResponse.nextState);
            }

            // Contextual Navigation Actions (Client-side overrides)
            if (['View Full Price List', 'Check Pricing'].includes(text)) {
                navigate('/services');
                onClose();
            }
            if (['Place an Order', 'Schedule Pickup', 'Book Now', 'Start Order'].includes(text)) {
                navigate('/services');
                onClose();
            }
            if (text === 'Go to My Orders') {
                navigate('/dashboard/orders');
                onClose();
            }

            // Smart Toggle: Scroll to Pricing (Desktop) logic
            if ((text.toLowerCase().includes('pricing') || text.toLowerCase().includes('cost')) && window.location.pathname === '/') {
                const pricingSection = document.getElementById('pricing-section');
                if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth' });
                }
            }

            const botMsg = {
                id: Date.now() + 1,
                text: botResponse.text,
                sender: 'bot',
                options: botResponse.options
            };
            setMessages((prev) => [...prev, botMsg]);
        }, 600);
    };

    const handleOptionClick = (option) => {
        handleSendMessage(option);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSendMessage(inputValue);
    };

    // Safe area handling for mobile
    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 md:inset-auto md:bottom-28 md:right-8 md:w-96 md:h-auto md:max-h-[600px] w-full h-full md:rounded-[24px] flex flex-col z-[9990] font-sans antialiased"
            style={{
                boxShadow: window.innerWidth > 768 ? "0 20px 50px rgba(0,0,0,0.15)" : "none",
            }}
        >
            {/* Blurred Backdrop for Glassmorphism */}
            <div className="absolute inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl md:rounded-[24px] border border-white/20 dark:border-gray-700/50" />

            {/* Content Container (Relative to sit on top of blur) */}
            <div className="relative flex flex-col h-full overflow-hidden md:rounded-[24px]">

                {/* Minimal Header */}
                <div className="px-6 py-5 bg-white/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                        <FaRobot className="text-lg" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-lg tracking-tight">Andy</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Laundry Assistant</p>
                    </div>
                </div>


                <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                        >
                            <div
                                className={`max-w-[85%] px-5 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm ${msg.sender === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-bl-none'
                                    }`}
                            >
                                <p className="whitespace-pre-wrap">{msg.text}</p>
                            </div>

                            {/* Time/Status could go here for extra polish, keeping it minimal for now */}
                        </div>
                    ))}

                    {/* Render Options separately to avoid cramping the message bubble */}
                    {messages[messages.length - 1].sender === 'bot' && messages[messages.length - 1].options && (
                        <div className="flex flex-wrap gap-2 mt-1 ml-1 animate-fadeIn">
                            {messages[messages.length - 1].options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleOptionClick(option)}
                                    className="text-xs font-medium px-4 py-2 bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-600 text-blue-600 dark:text-blue-300 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 hover:scale-105 transition-all shadow-sm"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area - Floated effect */}
                <div className="p-4 bg-transparent">
                    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/30 transition-all">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 ml-3 bg-transparent border-none outline-none text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 font-medium"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            onClick={() => handleSendMessage(inputValue)}
                            disabled={!inputValue.trim()}
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${inputValue.trim()
                                ? 'bg-blue-600 text-white shadow-md hover:scale-105'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                                }`}
                        >
                            <FaPaperPlane className="text-xs ml-0.5" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ChatWindow;
