import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc, serverTimestamp, getDoc, setDoc, limit } from 'firebase/firestore';
import { FaBoxOpen, FaClock, FaCheckCircle, FaTimesCircle, FaTruck, FaSpinner, FaTshirt, FaMotorcycle, FaHome, FaCheck, FaBox, FaArrowLeft } from 'react-icons/fa';

const TRACKING_STEPS = [
    { id: 'placed', label: 'Order Placed', time: '48 Hrs', icon: FaCheck, match: ['pending', 'placed'] },
    { id: 'confirmed', label: 'Order Confirmed', time: '48 Hrs', icon: FaCheckCircle, match: ['confirm'] },
    { id: 'partner_on_way', label: 'Pickup partner on the way', time: '48 Hrs', icon: FaMotorcycle, match: ['on the way', 'partner'] },
    { id: 'picked_up', label: 'Pickup Completed', time: '48 Hrs', icon: FaBox, match: ['picked up', 'pickup completed', 'reached laundry facility'] },
    { id: 'processing', label: 'Laundry Processing', time: '48 Hrs', icon: FaTshirt, match: ['process', 'processing'] },
    { id: 'out_for_delivery', label: 'Out for Delivery', time: '48 Hrs', icon: FaTruck, match: ['out for delivery'] },
    { id: 'delivered', label: 'Delivered', time: '48 Hrs (24h delivery)', icon: FaHome, match: ['deliver', 'completed'] }
];

const MyOrders = () => {
    const { currentUser } = useAuth();
    const [orders, setOrders] = useState([]);
    const [cartDetails, setCartDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('active'); // 'active' or 'past'
    const [cancellingId, setCancellingId] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [orderToCancel, setOrderToCancel] = useState(null);
    const [trackingOrder, setTrackingOrder] = useState(null); // The order currently being tracked
    const [orderLimit, setOrderLimit] = useState(20);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            setLoading(false);
            return;
        }

        // Query orders for current user
        // Note: Requires composite index in Firestore for userId + createdAt
        // If index is missing, it might fail or require creating one via link in console
        const q = query(
            collection(db, 'orders'),
            where('userId', '==', currentUser.uid),
            orderBy('createdAt', 'desc'),
            limit(orderLimit)
        );

        const unsubscribeOrders = onSnapshot(q, (snapshot) => {
            const ordersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setOrders(ordersData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching orders:", error);
            if (error.code === 'failed-precondition') {
                console.log("Index missing, might fall back to client-side sort if needed, but alerting dev.");
            }
            setLoading(false);
        });

        // Query cartdetails for tracking status
        const qCart = query(
            collection(db, 'cartdetails'),
            where('userId', '==', currentUser.uid)
        );

        const unsubscribeCart = onSnapshot(qCart, (snapshot) => {
            const cartData = {};
            snapshot.docs.forEach(doc => {
                cartData[doc.id] = doc.data();
            });
            setCartDetails(cartData);
        }, (error) => {
            console.error("Error fetching cartdetails:", error);
        });

        return () => {
            unsubscribeOrders();
            unsubscribeCart();
        };
    }, [currentUser, orderLimit]);

    const initiateCancel = (orderId) => {
        setOrderToCancel(orderId);
        setShowCancelModal(true);
    };

    const confirmCancel = async () => {
        if (!orderToCancel) return;
        setCancellingId(orderToCancel);
        setShowCancelModal(false); // Close modal immediately to show loading state on button or global

        try {
            console.log(`Attempting to cancel order: ${orderToCancel}`);
            
            // 1. Update orders collection
            const orderRef = doc(db, 'orders', orderToCancel);
            await updateDoc(orderRef, {
                status: 'Cancelled',
                cancelledAt: serverTimestamp()
            });

            // 2. Update cartdetails collection for Rider App
            try {
                const cartRef = doc(db, 'cartdetails', orderToCancel);
                await updateDoc(cartRef, {
                    status: 'cancelled',
                    updatedAt: serverTimestamp()
                });
            } catch (cartErr) {
                console.warn("Cartdetails document might not exist or failed to update:", cartErr);
                // We don't throw here so the user still sees the success message for their side
            }

            console.log("Order cancelled successfully");
            alert("Order cancelled successfully.");
        } catch (error) {
            console.error("Error cancelling order:", error);
            alert("Failed to cancel order: " + (error.message || "Unknown error"));
        } finally {
            setCancellingId(null);
            setOrderToCancel(null);
        }
    };

    const closeCancelModal = () => {
        setShowCancelModal(false);
        setOrderToCancel(null);
    };

    const runSync = async () => {
        const ids = ["ftIj39EVylxXDPeCTSeK", "w3ar7Z28vWD5ZNEuWrmi", "w467k5Ja4ctparDJzi0k", "wDD6gzDCEnMEmzSZufIk", "wGUTPtIQChMz7tWqQMUi", "wXpmBz4KXWTVcG8cHIG9", "wlYQ5Nuaqp8ASFz6NPpm", "wpPgqAZzOw8CVANNBUNC", "wqHcEVKNn7EZM2vaPzuc", "wsKLizKRag03ANpGy1mp", "wsXhduqPww0u2GRvH7VW", "wyWYdgSh67vhsegm8qaV", "x6cNdE6JCtQSgFBvgAmm", "xI8AOJLwiSlLHWt1IyqE", "xKS0puSUnO76Rla1CoWF", "xMrH6QCK2hHR7RCC4kSQ", "xXmJjP6kN9oalY9cOqeJ", "xYCPYBoswN0CG2X8WbKw", "xhJtt7NwY7tLrbzprQCw", "xuY0KcTUaabSGmnK6wfb", "xwQlvZHFnssjhWeV5eIG", "xxoA0xqBQBiNpibuOBgJ", "xzVWICaHWSgxyJtNJ0uw", "xzdgx6hf5Re1evb8aIIv", "y2ntwWEpO0ObmG1wnBw3", "y5HJuBUkujbgBi6KfnJL", "yDCoGIgS0Vg29BxkopGL", "yGo3N0FScdLSGoxCXSxF", "yJNSKg9PLugEpbt1IwRY", "yMmO49gZLeiZSRGd0zUg", "yMsVa3JvoQFegbu9pHUI", "yW5rsAiyknp1OlesOUXf", "yWVFkamWDlZU7feySlYS", "yZOW8F5gWncsHoGdaRYw", "ycAFje6GUJefgnCDZuyl", "yprbnpP7VGfnog6o8ERu", "z9VJuJqWJ3yuImRBj4z9", "zIJTDObCfBCmFPNnQd69", "zRcGSs1bDE5vjCexIdgZ", "zSapKq7LmFhs1uBEMO3G", "zTO1DYfPbGgV98EUp40m", "zU0UjcqPORKtEzIxU1cF", "zXT9AnvRRUz3Bs9Qh5p6", "zsn01GUob766QCVZg5yf", "zvzWU1fB3P8nMBBGsVZL", "zwytHIuCvcKUHUxxEOSc"];
        let count = 0;
        alert("Starting sync for " + ids.length + " orders...");
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            try {
                const orderSnapshot = await getDoc(doc(db, "orders", id));
                if (orderSnapshot.exists()) {
                    const orderData = orderSnapshot.data();
                    const deliveryAddress = orderData.deliveryAddress;
                    const items = orderData.items || [];
                    
                    const serviceUnitsMap = {};
                    const servicesMap = {};
                    items.forEach(item => {
                        const itemName = item.title || item.name || 'Item';
                        const key = `${itemName}_regular`; 
                        serviceUnitsMap[key] = "regular";
                        servicesMap[key] = item.quantity || item.count || 1;
                    });

                    const cartDetailsData = {
                        address: deliveryAddress ? `${deliveryAddress.scAddress || ''}, ${deliveryAddress.scCity || ''}` : "Not provided",
                        convenienceFee: orderData.convenienceFee || 0,
                        createdAt: orderData.createdAt || serverTimestamp(),
                        deliveryCharge: orderData.deliveryFee || 0,
                        dropTime: orderData.deliverySlot || 'Not specified',
                        freeDeliveryApplied: ((orderData.deliveryFee || 0) === 0),
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
                        orderNumber: orderData.orderId ? parseInt(orderData.orderId.replace('#ORD-', ''), 10) : 0,
                        orderTimestamp: orderData.createdAt ? (orderData.createdAt.toMillis ? orderData.createdAt.toMillis() : Date.now()) : Date.now(),
                        originalTotalCost: orderData.totalPrice || orderData.subtotal || 0,
                        otherCharges: 0,
                        paperBag: !!orderData.addPaperBag,
                        paymentData: {
                             convenienceFee: orderData.convenienceFee || 0,
                             originalAmount: (orderData.totalPrice || orderData.subtotal || 0) - (orderData.convenienceFee || 0),
                             totalWithFee: orderData.totalPrice || orderData.subtotal || 0
                        },
                        paymentId: null,
                        paymentMethod: "cod",
                        paymentStatus: "pending",
                        pickupTime: orderData.deliverySlot || 'Not specified',
                        serviceUnits: serviceUnitsMap,
                        services: servicesMap,
                        status: orderData.status ? orderData.status.toLowerCase() : 'pending',
                        totalCost: orderData.totalPrice || orderData.subtotal || 0,
                        totalItems: orderData.totalItems || items.length,
                        ultraFastDelivery: false,
                        updatedAt: serverTimestamp(),
                        userId: orderData.userId || '',
                        userMobile: orderData.userMobile || '',
                        userName: orderData.userName || 'Unknown',
                        walletAmountUsed: 0
                    };
                    
                    Object.keys(cartDetailsData).forEach(key => cartDetailsData[key] === undefined && delete cartDetailsData[key]);
                    await setDoc(doc(db, "cartdetails", id), cartDetailsData);
                    count++;
                }
            } catch (err) {
                console.error("Failed syncing " + id, err);
            }
        }
        alert(`Finished syncing! Synced ${count} of ${ids.length} orders.`);
    };

    // Filter active vs past orders
    // Active: Pending, Processing, Out for Delivery, etc.
    // Past: Completed, Delivered, Cancelled
    const pastStatusList = useMemo(() => ['completed', 'delivered', 'cancelled'], []);

    // Combine order data with real-time cartdetails status
    const mergedOrders = useMemo(() => {
        return orders.map(order => {
            const cart = cartDetails[order.id];
            let mergedStatus = order.status || 'Pending';
            let rawCartStatus = 'pending';
            
            if (cart && cart.status) {
                rawCartStatus = cart.status.toLowerCase();
                // Title case the status from cartdetails for UI display
                mergedStatus = cart.status
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(' ');
            }
            
            return {
                ...order,
                status: mergedStatus,
                cartStatus: rawCartStatus
            };
        });
    }, [orders, cartDetails]);

    const activeOrders = useMemo(() => {
        return mergedOrders.filter(order =>
            !pastStatusList.includes((order.status || '').toLowerCase())
        );
    }, [mergedOrders, pastStatusList]);

    const pastOrders = useMemo(() => {
        return mergedOrders.filter(order =>
            pastStatusList.includes((order.status || '').toLowerCase())
        );
    }, [mergedOrders, pastStatusList]);

    const displayedOrders = activeTab === 'active' ? activeOrders : pastOrders;

    // Auto-open tracking modal if navigated from elsewhere with state
    useEffect(() => {
        if (location.state?.autoTrackOrderId && mergedOrders.length > 0) {
            const orderToTrack = mergedOrders.find(o => o.id === location.state.autoTrackOrderId);
            if (orderToTrack) {
                setTrackingOrder(orderToTrack);
                // Clean up state via react-router so it doesn't reopen it
                navigate(location.pathname, { replace: true, state: {} });
            }
        }
    }, [location.state, mergedOrders, navigate, location.pathname]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Processing': return 'bg-blue-100 text-blue-800';
            case 'Out for Delivery': return 'bg-purple-100 text-purple-800';
            case 'Completed':
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        // Handle Firestore Timestamp or JS Date
        const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <FaSpinner className="animate-spin text-brand text-3xl" />
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up max-w-4xl">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900">My Orders</h1>
                {currentUser?.email === 'andesnow1604@gmail.com' && (
                    <button onClick={runSync} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md hover:bg-blue-700">Sync Missing Orders</button>
                )}
            </div>

            {/* Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-xl mb-8 w-fit">
                <button
                    onClick={() => setActiveTab('active')}
                    className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${activeTab === 'active' ? 'bg-white text-brand shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Active Orders
                </button>
                <button
                    onClick={() => setActiveTab('past')}
                    className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${activeTab === 'past' ? 'bg-white text-brand shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Past Orders
                </button>
            </div>

            {/* Orders List */}
            <div className="space-y-6">
                {displayedOrders.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                            <FaBoxOpen className="text-5xl" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No {activeTab} orders found</h3>
                        <p className="text-slate-500">
                            {activeTab === 'active' ? "You don't have any orders in progress." : "You haven't completed any orders yet."}
                        </p>
                    </div>
                ) : (
                    displayedOrders.map((order) => (
                        <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
                            {/* Order Header */}
                            <div className="flex flex-col md:flex-row justify-between md:items-start mb-6 pb-6 border-b border-gray-50 gap-4">
                                <div>
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                        <h3 className="font-bold text-slate-900 text-lg">Order #{order.id.slice(0, 8).toUpperCase()}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status || 'Pending')}`}>
                                            {order.status || 'Pending'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500 flex items-center">
                                        <FaClock className="mr-2 text-brand/60" />
                                        Placed on {formatDate(order.createdAt)}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-slate-900 text-2xl">₹{(order.totalPrice || order.finalTotal || order.subtotal || 0).toFixed(2)}</p>
                                    <p className="text-sm font-medium text-slate-400">{order.totalItems || order.cart?.length || order.items?.length || 0} Items</p>
                                </div>
                            </div>

                            {/* Order Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Pickup & Delivery</h4>
                                    <div className="space-y-2 text-sm text-slate-700">
                                        <span className="font-medium text-slate-500">Slot:</span>
                                        <span className="font-bold">Standard (6 PM - 9 PM)</span>
                                    </div>
                                    {/* You can add delivery estimate here if available */}
                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Shipping Address</h4>
                                    {order.deliveryAddress ? (
                                        <div className="text-sm text-slate-700">
                                            <p className="font-bold">{order.deliveryAddress.scTitle}</p>
                                            <p>{order.deliveryAddress.scAddress}</p>
                                            <p>{order.deliveryAddress.scCity} - {order.deliveryAddress.scZip}</p>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-slate-400 italic">No address details</p>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end pt-2 space-x-3">
                                {activeTab === 'active' && (
                                    <button
                                        onClick={() => setTrackingOrder(order)}
                                        className="px-5 py-2.5 bg-blue-50 text-brand rounded-xl font-bold text-sm hover:bg-blue-100 transition-all flex items-center"
                                    >
                                        Track Order
                                    </button>
                                )}

                                {activeTab === 'active' && (order.status.toLowerCase() === 'pending' || order.status.toLowerCase() === 'order placed') && (
                                    <button
                                        onClick={() => initiateCancel(order.id)}
                                        disabled={cancellingId === order.id}
                                        className="px-5 py-2.5 border-2 border-red-100 text-red-600 rounded-xl font-bold text-sm hover:bg-red-50 hover:border-red-200 transition-all flex items-center disabled:opacity-50"
                                    >
                                        {cancellingId === order.id ? (
                                            <>
                                                <FaSpinner className="animate-spin mr-2" /> Processing...
                                            </>
                                        ) : (
                                            <>
                                                <FaTimesCircle className="mr-2" /> Cancel Order
                                            </>
                                        )}
                                    </button>
                                )}

                                {activeTab === 'past' && (
                                    <button
                                        onClick={() => alert("Reorder feature coming soon!")}
                                        className="px-5 py-2.5 bg-brand/10 text-brand rounded-xl font-bold text-sm hover:bg-brand/20 transition-all"
                                    >
                                        View Details
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
                
                {/* Load More Button */}
                {displayedOrders.length >= orderLimit && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => setOrderLimit(prev => prev + 20)}
                            className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors"
                        >
                            Load More Orders
                        </button>
                    </div>
                )}
                {/* Cancel Confirmation Modal */}
                {
                    showCancelModal && (
                        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 animate-fade-in">
                            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl transform transition-all scale-100">
                                <div className="text-center">
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                        <FaTimesCircle className="h-6 w-6 text-red-600" />
                                    </div>
                                    <h3 className="text-lg leading-6 font-bold text-gray-900 mb-2">Cancel Order?</h3>
                                    <p className="text-sm text-gray-500 mb-6">
                                        Are you sure you want to cancel this order? This action cannot be undone.
                                    </p>
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={closeCancelModal}
                                            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                                        >
                                            No, Keep It
                                        </button>
                                        <button
                                            onClick={confirmCancel}
                                            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
                                        >
                                            Yes, Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* Track Order Modal */}
                {trackingOrder && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in sm:p-0">
                        <div className="bg-white w-full h-full sm:h-auto sm:max-w-md sm:rounded-2xl flex flex-col shadow-2xl relative">
                            {/* Header */}
                            <div className="flex items-center p-4 border-b border-gray-100 sticky top-0 bg-white sm:rounded-t-2xl z-10">
                                <button 
                                    onClick={() => setTrackingOrder(null)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2"
                                >
                                    <FaArrowLeft className="text-gray-800" />
                                </button>
                                <h2 className="text-lg font-bold text-gray-900 mx-auto absolute left-1/2 -translate-x-1/2">Track Order</h2>
                            </div>

                            {/* Timeline Content */}
                            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-2 mb-8 text-brand font-bold text-lg">
                                        <FaCheckCircle /> Order Status
                                    </div>

                                    {(() => {
                                        const currentStatus = (trackingOrder.cartStatus || trackingOrder.status || 'pending').toLowerCase();

                                        if (currentStatus.includes('cancel')) {
                                            return (
                                                <div className="flex flex-col items-center justify-center py-10">
                                                    <FaTimesCircle className="text-red-500 text-6xl mb-4" />
                                                    <h3 className="text-xl font-bold text-gray-900">Order Cancelled</h3>
                                                    <p className="text-gray-500 text-center mt-2">This order has been cancelled and will not be processed further.</p>
                                                </div>
                                            );
                                        }

                                        let currentIndex = 0;
                                        // Determine highest matching index
                                        TRACKING_STEPS.forEach((step, index) => {
                                            if (step.match.some(keyword => currentStatus.includes(keyword))) {
                                                currentIndex = Math.max(currentIndex, index);
                                            }
                                        });

                                        return (
                                            <div className="relative pl-6 space-y-8 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                                                {TRACKING_STEPS.map((step, index) => {
                                                    const isCompleted = index <= currentIndex;
                                                    const isCurrent = index === currentIndex;
                                                    const Icon = step.icon;

                                                    return (
                                                        <div key={step.id} className={`relative flex items-start group ${isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                                                            {/* Line override for completed steps */}
                                                            {isCompleted && index !== TRACKING_STEPS.length - 1 && (
                                                                <div className="absolute left-[-11px] top-8 bottom-[-40px] w-0.5 bg-blue-500 z-0"></div>
                                                            )}
                                                            
                                                            {/* Icon node */}
                                                            <div className={`absolute left-[-30px] flex items-center justify-center w-7 h-7 rounded-full border-2 bg-white z-10 transition-colors ${
                                                                isCurrent ? 'border-blue-500 bg-blue-500 text-white' : 
                                                                isCompleted ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-400'
                                                            }`}>
                                                                <Icon className="w-3 h-3" />
                                                            </div>

                                                            {/* Content */}
                                                            <div className="ml-4 flex-1">
                                                                <h4 className={`text-base font-bold ${isCurrent ? 'text-gray-900' : isCompleted ? 'text-gray-700' : 'text-gray-400'}`}>
                                                                    {step.label}
                                                                </h4>
                                                                <p className="text-xs text-gray-400 mt-1">{step.time}</p>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
