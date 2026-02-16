import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { FaBoxOpen, FaClock, FaCheckCircle, FaTimesCircle, FaTruck, FaSpinner } from 'react-icons/fa';

const MyOrders = () => {
    const { currentUser } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('active'); // 'active' or 'past'
    const [cancellingId, setCancellingId] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [orderToCancel, setOrderToCancel] = useState(null);

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
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const ordersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setOrders(ordersData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching orders:", error);
            // Fallback for missing index error
            if (error.code === 'failed-precondition') {
                console.log("Index missing, might fall back to client-side sort if needed, but alerting dev.");
                // For now, let's just show unsorted or simple query if strictly needed,
                // but ideally user creates index.
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [currentUser]);

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
            const orderRef = doc(db, 'orders', orderToCancel);
            await updateDoc(orderRef, {
                status: 'Cancelled',
                cancelledAt: serverTimestamp()
            });
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

    // Filter active vs past orders
    // Active: Pending, Processing, Out for Delivery
    // Past: Completed, Delivered, Cancelled
    const activeStatus = ['Pending', 'Processing', 'Out for Delivery'];

    // Sort logic handled by Firestore query ideally, but client side robust too
    const activeOrders = orders.filter(order =>
        (activeStatus.includes(order.status) || !order.status) && order.status !== 'Cancelled'
    );

    const pastOrders = orders.filter(order =>
        (!activeStatus.includes(order.status) || order.status === 'Cancelled') && order.status
    );

    const displayedOrders = activeTab === 'active' ? activeOrders : pastOrders;

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
            <h1 className="text-3xl font-extrabold text-slate-900 mb-8">My Orders</h1>

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
                                    <p className="font-black text-slate-900 text-2xl">₹{(order.finalTotal || 0).toFixed(2)}</p>
                                    <p className="text-sm font-medium text-slate-400">{order.totalItems || order.cart?.length || 0} Items</p>
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
                            <div className="flex justify-end pt-2">
                                {activeTab === 'active' && (order.status === 'Pending' || !order.status) && (
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
                {/* Cancel Confirmation Modal */}
                {
                    showCancelModal && (
                        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
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
            </div>
        </div>
    );
};

export default MyOrders;
