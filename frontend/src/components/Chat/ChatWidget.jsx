import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCommentDots, FaTimes } from 'react-icons/fa'; // Import FaTimes
import ChatWindow from './ChatWindow';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const hasAutoOpened = useRef(false);

    // Auto-open for new users (Desktop only)
    useEffect(() => {
        const hasSeenChat = localStorage.getItem('hasSeenChat');
        const isDesktop = window.innerWidth > 768; // Simple check for now

        if (!hasSeenChat && isDesktop && !hasAutoOpened.current) {
            const timer = setTimeout(() => {
                setIsOpen(true);
                localStorage.setItem('hasSeenChat', 'true');
                hasAutoOpened.current = true;
            }, 3000); // 3-second delay for politeness
            return () => clearTimeout(timer);
        }
    }, []);

    // Listen for custom 'openChat' event from MobileBottomBar
    useEffect(() => {
        const handleOpenChat = () => setIsOpen(true);
        window.addEventListener('openChat', handleOpenChat);
        return () => window.removeEventListener('openChat', handleOpenChat);
    }, []);

    return (
        <>
            <AnimatePresence>
                {isOpen && <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`fixed bottom-24 right-4 md:bottom-8 md:right-8 z-[9999] flex items-center justify-center transition-all duration-300 shadow-xl
          ${isOpen
                        ? 'w-10 h-10 bg-gray-800 text-white rounded-full rotate-90' // Smaller check/close
                        : 'w-14 h-14 bg-white text-blue-600 rounded-full hover:shadow-2xl border border-blue-100' // White with blue message icon
                    }
        `}
            >
                <AnimatePresence mode='wait'>
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                        >
                            <FaTimes className="text-xl" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                        >
                            <FaCommentDots className="text-2xl" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </>
    );
};

export default ChatWidget;
