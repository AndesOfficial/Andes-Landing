import React, { createContext, useContext, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export const useOrder = () => {
    return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [cart, setCart] = useState([]);
    const [preferences, setPreferences] = useState({});
    const [schedule, setSchedule] = useState({ pickup: null, delivery: null });

    const addToCart = (item, quantity = 1) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
                );
            }
            return [...prev, { ...item, quantity }];
        });
    };

    const removeFromCart = (itemId) => {
        setCart((prev) => prev.filter((i) => i.id !== itemId));
    };

    const clearCart = () => setCart([]);

    const placeOrder = async (deliverySlot) => {
        if (!currentUser) throw new Error("User must be logged in");

        const orderData = {
            userId: currentUser.uid,
            userEmail: currentUser.email,
            userName: currentUser.fullName || 'Unknown',
            items: cart.map(({ icon, ...rest }) => rest), // Remove icon (React component) which causes Firestore error
            totalItems: cart.reduce((acc, item) => acc + item.quantity, 0),
            totalPrice: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
            status: 'Processing',
            deliverySlot: deliverySlot || 'Not specified',
            createdAt: serverTimestamp(),
            orderId: '#ORD-' + Math.floor(100000 + Math.random() * 900000) // Simple random ID
        };

        try {
            const docRef = await addDoc(collection(db, "orders"), orderData);
            clearCart();
            return { id: docRef.id, ...orderData };
        } catch (error) {
            console.error("Error creating order: ", error);
            throw error;
        }
    };

    const value = {
        cart,
        preferences,
        schedule,
        addToCart,
        removeFromCart,
        setPreferences,
        setSchedule,
        placeOrder,
        totalItems: cart.reduce((acc, item) => acc + item.quantity, 0),
        totalPrice: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
};
