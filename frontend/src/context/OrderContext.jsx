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

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(itemId);
            return;
        }
        setCart((prev) =>
            prev.map((i) => (i.id === itemId ? { ...i, quantity: newQuantity } : i))
        );
    };

    const clearCart = () => setCart([]);

    const placeOrder = async (deliverySlot) => {
        if (!currentUser) {
            console.error("Attempted to place order without user logged in");
            throw new Error("User must be logged in");
        }

        const orderData = {
            userId: currentUser.uid,
            userEmail: currentUser.email,
            userName: currentUser.fullName || 'Unknown',
            items: cart.map(({ icon, ...rest }) => rest), // Remove icon (React component) which causes Firestore error
            totalItems: cart.reduce((acc, item) => acc + item.quantity, 0),
            totalPrice: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
            status: 'Pending', // Changed from 'Processing' to 'Pending' to allow user cancellation
            deliverySlot: deliverySlot || 'Not specified',
            createdAt: serverTimestamp(),
            orderId: '#ORD-' + Math.floor(100000 + Math.random() * 900000) // Simple random ID
        };

        console.log("Placing order with data:", orderData); // Debug log

        try {
            const docRef = await addDoc(collection(db, "orders"), orderData);
            clearCart();
            return { id: docRef.id, ...orderData };
        } catch (error) {
            console.error("Error creating order: ", error);
            // Log specifically if it's a permission error
            if (error.code === 'permission-denied') {
                console.error("Permission denied. Check Firestore rules. User ID:", currentUser.uid);
            }
            throw error;
        }
    };

    const value = {
        cart,
        preferences,
        schedule,
        addToCart,
        removeFromCart,
        updateQuantity,
        setPreferences,
        setSchedule,
        placeOrder,
        clearCart,
        totalItems: cart.reduce((acc, item) => acc + item.quantity, 0),
        totalPrice: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
};
