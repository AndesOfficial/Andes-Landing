import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';
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
    // 'regular' or 'instant' — whichever was added first locks the cart
    const [cartMode, setCartMode] = useState(null);

    // Keep cartMode consistent: once cart is empty, unlock mode switching
    useEffect(() => {
        if (cart.length === 0 && cartMode !== null) {
            setCartMode(null);
        }
    }, [cart.length, cartMode]);

    const addToCart = (item, quantity = 1, serviceMode = 'regular') => {
        // Enforce single service type per cart
        if (cart.length > 0 && cartMode && cartMode !== serviceMode) {
            return { conflict: true, currentMode: cartMode };
        }
        if (cart.length === 0 || !cartMode) {
            setCartMode(serviceMode);
        }
        setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
                );
            }
            return [...prev, { ...item, quantity, serviceMode }];
        });
        return { conflict: false };
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

    const clearCart = () => {
        setCart([]);
        setCartMode(null);
    };

    const placeOrder = async (orderDetails) => {
        if (!currentUser) {
            console.error("Attempted to place order without user logged in");
            throw new Error("User must be logged in");
        }

        const { deliverySlot, addPaperBag, finalTotal, deliveryAddress, convenienceFee, deliveryFee, couponDiscount, userPhone } = orderDetails;

        const finalPhone = currentUser.phone || currentUser.mobile || userPhone || '';

        if (!finalPhone) {
            console.error("Attempted to place order without user phone number");
            throw new Error("A valid phone number is required to place an order.");
        }

        const orderData = {
            userId: currentUser.uid,
            userEmail: currentUser.email,
            userName: currentUser.fullName || 'Unknown',
            userPhone: finalPhone,
            items: cart.map(({ icon, ...rest }) => rest),
            totalItems: cart.reduce((acc, item) => acc + item.quantity, 0),
            totalPrice: finalTotal || cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), // Use passed total or calc
            subtotal: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
            addPaperBag: !!addPaperBag,
            convenienceFee: convenienceFee || 0,
            deliveryFee: deliveryFee || 0,
            couponDiscount: couponDiscount || 0,
            status: 'Pending',
            deliverySlot: deliverySlot || 'Not specified',
            deliveryAddress: deliveryAddress || null,
            createdAt: serverTimestamp(),
            orderId: '#ORD-' + Math.floor(100000 + Math.random() * 900000)
        };

        console.log("Placing order with data:", orderData); // Debug log

        try {
            const docRef = await addDoc(collection(db, "orders"), orderData);

            // Format services maps based on rider app expectations
            const serviceUnitsMap = {};
            const servicesMap = {};
            const isInstant = cartMode === 'instant';
            cart.forEach(item => {
                const itemName = item.title || item.name || 'Item';
                // e.g., "Wash & Fold_instant" or "Wash & Fold_regular"
                const suffix = isInstant ? 'instant' : 'regular';
                const key = `${itemName}_${suffix}`;
                serviceUnitsMap[key] = suffix;
                servicesMap[key] = item.quantity || 1;
            });

            // Forward to cartdetails for Rider app
            const cartDetailsData = {
                address: deliveryAddress ? `${deliveryAddress.scAddress || ''}, ${deliveryAddress.scCity || ''}` : "Not provided",
                convenienceFee: convenienceFee || 0,
                createdAt: orderData.createdAt,
                deliveryCharge: deliveryFee || 0,
                dropTime: deliverySlot || 'Not specified',
                freeDeliveryApplied: (deliveryFee === 0),
                hasFreeCadbury: false,
                location: {
                    accuracyMeters: null,
                    address: deliveryAddress ? `${deliveryAddress.scAddress || ''}, ${deliveryAddress.scCity || ''}` : "Not provided",
                    isManual: true,
                    latitude: 0.0,
                    longitude: 0.0,
                    pincode: deliveryAddress?.scZip || "",
                    selectionSource: "website",
                    timestamp: new Date().toISOString(),
                    userEnteredAddress: deliveryAddress ? deliveryAddress.scAddress || '' : "Not provided"
                },
                orderNumber: parseInt(orderData.orderId.replace('#ORD-', ''), 10) || 0,
                orderTimestamp: Date.now(),
                originalTotalCost: orderData.totalPrice,
                otherCharges: 0,
                paperBag: !!addPaperBag,
                paymentData: {
                    convenienceFee: convenienceFee || 0,
                    originalAmount: orderData.totalPrice - (convenienceFee || 0),
                    totalWithFee: orderData.totalPrice
                },
                paymentId: null,
                paymentMethod: "cod",
                paymentStatus: "pending",
                pickupTime: deliverySlot || 'Not specified',
                serviceUnits: serviceUnitsMap,
                services: servicesMap,
                status: 'pending', // Rider app seems to prefer lowercase 'pending' in paymentStatus, let's use 'Pending' or 'placed' depending on what's standard. We'll use orderData.status or 'pending'
                totalCost: orderData.totalPrice,
                totalItems: orderData.totalItems,
                ultraFastDelivery: cartMode === 'instant',
                updatedAt: serverTimestamp(),
                userId: currentUser.uid || '',
                userMobile: finalPhone,
                userName: currentUser.fullName || 'Unknown',
                walletAmountUsed: 0
            };

            // Clean up undefined values which Firestore hates just to be safe
            Object.keys(cartDetailsData).forEach(key => cartDetailsData[key] === undefined && delete cartDetailsData[key]);

            console.log("Saving to cartdetails with ID:", docRef.id, " Payload:", cartDetailsData);
            await setDoc(doc(db, "cartdetails", docRef.id), cartDetailsData);
            console.log("Successfully saved to cartdetails!");

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
        cartMode,
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
