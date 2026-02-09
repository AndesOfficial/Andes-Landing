import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

const Dashboard = () => {
    const { currentUser } = useAuth();
    const [stats, setStats] = useState({
        active: 0,
        completed: 0,
        saved: 0 // Mocked for now
    });
    const [recentOrder, setRecentOrder] = useState(null);

    useEffect(() => {
        if (!currentUser) return;

        // Create query for orders
        // Note: Removed orderBy("createdAt", "desc") to avoid needing a composite index immediately.
        // We will sort client-side instead.
        const q = query(
            collection(db, "orders"),
            where("userId", "==", currentUser.uid)
        );

        // Listen for real-time updates
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let activeCount = 0;
            let completedCount = 0;
            let totalSpent = 0;

            const orders = querySnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)); // Client-side sort desc

            orders.forEach(order => {
                const status = order.status || 'Processing'; // Default status
                if (['Processing', 'Pending', 'Scheduled'].includes(status)) {
                    activeCount++;
                } else if (['Delivered', 'Completed'].includes(status)) {
                    completedCount++;
                }
                totalSpent += parseFloat(order.totalPrice || 0);
            });

            setStats({
                active: activeCount,
                completed: completedCount,
                saved: totalSpent.toFixed(2)
            });

            if (orders.length > 0) {
                setRecentOrder({
                    ...orders[0],
                    date: orders[0].createdAt?.toDate().toLocaleDateString() || 'Just now'
                });
            } else {
                setRecentOrder(null);
            }
        }, (error) => {
            console.error("Error fetching dashboard data:", error);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [currentUser]);

    // Helper to get time of day greeting
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className="animate-fade-in-up">
            <header className="mb-10">
                <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
                    {getGreeting()}, <span className="text-blue-600">{currentUser?.fullName?.split(' ')[0] || 'User'}</span>!
                </h1>
                <p className="text-gray-500 mt-2 text-lg">Here's what's happening with your laundry today.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col justify-between h-40">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Active Orders</h3>
                            <div className="p-2 bg-blue-50 rounded-full text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-4xl font-bold text-gray-800">{stats.active}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col justify-between h-40">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Completed</h3>
                            <div className="p-2 bg-green-50 rounded-full text-green-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-4xl font-bold text-gray-800">{stats.completed}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col justify-between h-40">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total Spent</h3>
                            <div className="p-2 bg-yellow-50 rounded-full text-yellow-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-4xl font-bold text-gray-800">${stats.saved}</p>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-lg border border-transparent text-white flex flex-col justify-center items-center text-center h-40 group cursor-pointer" onClick={() => (window.location.href = '/order')}>
                    <div className="mb-2 group-hover:scale-110 transition-transform duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <span className="font-bold text-lg">New Order</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
                        <Link to="/dashboard/orders" className="text-sm font-medium text-blue-600 hover:text-blue-800">View All</Link>
                    </div>
                    <div className="p-6">
                        {/* Recent Item */}
                        {recentOrder ? (
                            <div className="flex items-center p-4 bg-gray-50 rounded-xl mb-4">
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-800">{recentOrder.orderId}</h4>
                                    <p className="text-sm text-gray-500">Placed on {recentOrder.date}</p>
                                </div>
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">{recentOrder.status}</span>
                            </div>
                        ) : (
                            <p className="text-gray-500">No recent activity.</p>
                        )}
                    </div>
                </div>

                {/* Quick Actions / Promo */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg text-white p-8 flex flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-2">Invite a Friend</h2>
                        <p className="text-gray-300 mb-6">Get $20 credit for every friend you refer to Andes.</p>
                        <button className="px-6 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors">
                            Copy Referral Link
                        </button>
                    </div>

                    {/* Decorative Graphic */}
                    <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-64 w-64" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
