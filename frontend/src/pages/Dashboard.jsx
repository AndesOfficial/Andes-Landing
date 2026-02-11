import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { FaPlus, FaListAlt, FaTags, FaHeadset, FaBox, FaChevronRight, FaClock, FaCheckCircle, FaSpinner } from 'react-icons/fa';

// --- Reusable Components ---

const QuickActionBtn = ({ to, icon, label, primary = false }) => {
    const baseClass = `flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 w-full ${primary ? 'bg-brand text-white shadow-lg shadow-brand/20 hover:shadow-xl hover:bg-brand-dark' : 'bg-brand/5 text-brand-dark border border-brand/10 hover:border-brand/30 hover:bg-brand/10 hover:shadow-md'}`;
    const iconClass = `text-2xl mb-2 ${primary ? 'text-white' : 'text-brand-blue'}`;

    if (to.startsWith('http') || to.startsWith('mailto')) {
        return (
            <a href={to} className={baseClass}>
                <div className={iconClass}>{icon}</div>
                <span className="text-xs font-bold tracking-wide">{label}</span>
            </a>
        );
    }

    return (
        <Link to={to} className={baseClass}>
            <div className={iconClass}>{icon}</div>
            <span className="text-xs font-bold tracking-wide">{label}</span>
        </Link>
    );
};

const StatCard = ({ title, value, icon, colorClass, bgClass }) => (
    <div className="bg-white p-5 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-50 flex items-center justify-between hover:scale-[1.02] transition-transform duration-300 hover:shadow-brand/10 hover:border-brand/20 group">
        <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
            <p className="text-2xl font-black text-slate-800">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${bgClass} ${colorClass}`}>
            {icon}
        </div>
    </div>
);

const Dashboard = () => {
    const { currentUser } = useAuth();
    const [stats, setStats] = useState({ active: 0, completed: 0, saved: 0 });
    const [recentOrder, setRecentOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentUser) return;

        const q = query(collection(db, "orders"), where("userId", "==", currentUser.uid));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let activeCount = 0;
            let completedCount = 0;
            let totalSpent = 0;
            let orders = [];

            querySnapshot.docs.forEach(doc => {
                orders.push({ id: doc.id, ...doc.data() });
            });

            orders.sort((a, b) => {
                const timeA = a.createdAt?.seconds || 0;
                const timeB = b.createdAt?.seconds || 0;
                return timeB - timeA;
            });

            for (let i = 0; i < orders.length; i++) {
                const order = orders[i];
                const status = order.status || 'Processing';

                if (['Processing', 'Pending', 'Scheduled', 'Out for Delivery', 'Admin Approved'].includes(status)) {
                    activeCount++;
                } else if (['Delivered', 'Completed'].includes(status)) {
                    completedCount++;
                }

                if (order.totalPrice) {
                    totalSpent += parseFloat(order.totalPrice);
                }
            }

            setStats({
                active: activeCount,
                completed: completedCount,
                saved: totalSpent.toFixed(0) // No decimals for currency
            });

            let lastOrder = null;
            if (orders.length > 0) {
                const first = orders[0];
                let dateStr = 'Just now';
                if (first.createdAt) {
                    dateStr = first.createdAt.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
                }
                lastOrder = { ...first, date: dateStr };
            }
            setRecentOrder(lastOrder);
            setLoading(false);

        }, (error) => console.log("Dashboard Error:", error));

        return () => unsubscribe();
    }, [currentUser]);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className="animate-fade-in-up min-h-screen bg-slate-50/50 pb-20">
            {/* Header Section */}
            <header className="bg-white px-4 pt-8 pb-6 shadow-sm border-b border-slate-100">
                <div className="container mx-auto">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <p className="text-slate-400 text-sm font-semibold mb-1">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                            <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">
                                {getGreeting()}, <span className="text-brand-blue">{currentUser?.fullName?.split(' ')[0] || 'User'}</span>
                            </h1>
                        </div>
                        <div className="hidden md:block">
                            <Link to="/dashboard/profile" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-brand-blue hover:text-white transition-colors">
                                <span className="font-bold text-sm">{currentUser?.fullName?.charAt(0) || 'U'}</span>
                            </Link>
                        </div>
                    </div>

                    {/* Quick Actions - The "App-like" feel */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        <QuickActionBtn to="/order" icon={<FaPlus />} label="New Order" primary />
                        <QuickActionBtn to="/dashboard/orders" icon={<FaListAlt />} label="My Orders" />
                        <QuickActionBtn to="/services" icon={<FaTags />} label="Srvc & Pricing" />
                        <QuickActionBtn to="mailto:care@andes.co.in" icon={<FaHeadset />} label="Help & Support" />
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        title="Active Orders"
                        value={stats.active}
                        colorClass="text-brand"
                        bgClass="bg-brand/10"
                        icon={<FaClock />}
                    />
                    <StatCard
                        title="Completed"
                        value={stats.completed}
                        colorClass="text-green-600"
                        bgClass="bg-green-50"
                        icon={<FaCheckCircle />}
                    />
                    <StatCard
                        title="Total Spent"
                        value={`₹${stats.saved}`}
                        colorClass="text-brand"
                        bgClass="bg-brand/10"
                        icon={<span className="text-xl font-bold">₹</span>}
                    />
                    {/* Placeholder for Balance/Credits if needed in future */}
                    <StatCard
                        title="Andes Credits"
                        value="₹0"
                        colorClass="text-yellow-600"
                        bgClass="bg-yellow-50"
                        icon={<span className="text-xl font-bold">C</span>}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Order "Ticket" */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex justify-between items-center px-1">
                            <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
                            <Link to="/dashboard/orders" className="text-xs font-bold text-brand-blue hover:underline">View All</Link>
                        </div>

                        {loading ? (
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex justify-center text-brand-blue">
                                <FaSpinner className="animate-spin text-2xl" />
                            </div>
                        ) : recentOrder ? (
                            <div className="bg-white rounded-3xl p-0 overflow-hidden shadow-md border border-slate-100 relative group cursor-pointer hover:shadow-lg transition-all duration-300">
                                {/* Status Top Bar */}
                                <div className={`h-2 w-full ${['Delivered', 'Completed'].includes(recentOrder.status) ? 'bg-green-500' : 'bg-brand-blue'}`}></div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Order ID</span>
                                                <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">{recentOrder.id.slice(0, 8)}...</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900">
                                                {recentOrder.serviceType || 'Laundry Service'}
                                            </h3>
                                            <p className="text-sm text-slate-500">{recentOrder.items?.length || 0} items • {recentOrder.date}</p>
                                        </div>
                                        <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${['Delivered', 'Completed'].includes(recentOrder.status) ? 'bg-green-100 text-green-700' : 'bg-brand/10 text-brand'}`}>
                                            {recentOrder.status || 'Processing'}
                                        </div>
                                    </div>

                                    {/* Mini Progress Visual */}
                                    <div className="w-full bg-slate-100 h-2 rounded-full mb-4 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${['Delivered', 'Completed'].includes(recentOrder.status) ? 'bg-green-500 w-full' : 'bg-brand-blue w-1/3 animate-pulse'}`}
                                        ></div>
                                    </div>

                                    <div className="flex justify-between items-center pt-2 border-t border-slate-50 mt-2">
                                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                                            <FaBox />
                                            <span>Est. Delivery: Tomorrow</span>
                                        </div>
                                        <Link to={`/order-confirmation`} state={{ orderId: recentOrder.id }} className="text-brand-blue font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                            Track Order <FaChevronRight />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center py-12">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300 text-2xl">
                                    <FaBox />
                                </div>
                                <h3 className="text-slate-800 font-bold mb-2">No orders yet</h3>
                                <p className="text-slate-500 text-sm mb-6">Your recent orders will appear here.</p>
                                <Link to="/services" className="text-brand-blue font-bold text-sm hover:underline">Start your first order</Link>
                            </div>
                        )}
                    </div>

                    {/* Promo / Invite Card */}
                    <div className="lg:col-span-1 mt-6 lg:mt-0">
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-xl text-white p-8 relative overflow-hidden h-full min-h-[250px] flex flex-col justify-between group">
                            <div className="relative z-10">
                                <div className="bg-white/10 w-fit px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 border border-white/10 backdrop-blur-sm">Refer & Earn</div>
                                <h2 className="text-2xl font-bold mb-2 leading-tight">Get ₹200 Free Credit</h2>
                                <p className="text-slate-400 text-sm mb-6">Invite friends to Andes. You get ₹200, they get 20% off.</p>
                            </div>

                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText("FIRST20");
                                    alert("Referral code 'FIRST20' copied to clipboard!");
                                }}
                                className="relative z-10 w-full py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors shadow-lg active:scale-95 duration-200"
                            >
                                Invite Friends
                            </button>

                            {/* Decorative Background */}
                            <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                                <FaCheckCircle className="text-[150px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
