import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaRobot } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';

const ChatWindow = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { id: 'init', text: "Hi! I'm Andy. How can I lighten your load today?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [currentUser, setCurrentUser] = useState(auth?.currentUser);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // 0. Ensure user is authenticated (sign in anonymously if needed)
    useEffect(() => {
        const unsubAuth = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            if (!user) {
                // No user at all — sign in anonymously so chatbot works for guests
                signInAnonymously(auth).catch((err) => {
                    console.error('Anonymous sign-in failed:', err);
                });
            }
        });
        return () => unsubAuth();
    }, []);

    // 1. Listen to Firestore in Real-Time (works for both regular & anonymous users)
    useEffect(() => {
        if (!currentUser) return; // Wait until auth is resolved

        const messagesRef = collection(db, `users/${currentUser.uid}/messages`);
        const q = query(messagesRef, orderBy('createTime', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedMessages = [
                { id: 'init', text: "Hi! I'm Andy. How can I lighten your load today?", sender: 'bot' }
            ];

            snapshot.forEach((doc) => {
                const data = doc.data();
                if (data.prompt) {
                    fetchedMessages.push({ id: doc.id + '-u', text: data.prompt, sender: 'user' });
                }
                if (data.response) {
                    fetchedMessages.push({ id: doc.id + '-b', text: data.response, sender: 'bot' });
                } else if (data.prompt && !data.response) {
                    // Show a loading state while AI is thinking
                    fetchedMessages.push({ id: doc.id + '-loading', text: "Andy is typing...", sender: 'bot' });
                }
            });

            setMessages(fetchedMessages);
        });

        return () => unsubscribe();
    }, [currentUser]);

    // 2. Prevent Background Scroll on Mobile
    useEffect(() => {
        scrollToBottom();
        if (isOpen && window.innerWidth < 768) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [messages, isOpen]);

    // 3. Send Message to Firestore (works for both regular & anonymous users)
    const handleSendMessage = async (text) => {
        if (!text.trim()) return;
        if (!currentUser) return; // Auth still resolving, ignore

        setInputValue(''); // Clear input instantly

        try {
            await addDoc(collection(db, `users/${currentUser.uid}/messages`), {
                prompt: text,
                createTime: serverTimestamp()
            });
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSendMessage(inputValue);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 md:inset-auto md:bottom-28 md:right-8 md:w-96 md:h-auto md:max-h-[600px] w-full h-[100dvh] md:rounded-[24px] flex flex-col z-[9990] font-sans antialiased"
            style={{
                boxShadow: window.innerWidth > 768 ? "0 20px 50px rgba(0,0,0,0.15)" : "none",
            }}
        >
            <div className="absolute inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl md:rounded-[24px] border border-white/20 dark:border-gray-700/50" />

            <div className="relative flex flex-col h-full overflow-hidden md:rounded-[24px]">
                {/* Header */}
                <div className="px-6 py-5 bg-white/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                        <FaRobot className="text-lg" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-lg tracking-tight">Andy</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Laundry Assistant</p>
                    </div>
                </div>

                {/* Messages Area */}
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
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
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