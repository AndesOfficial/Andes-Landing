
import React from 'react';
import { FaHome, FaTag, FaShoppingCart, FaBox } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cart } = useOrder();

    const navItems = [
        { id: 'home', icon: <FaHome size={20} />, label: 'Shop', path: '/' },
        { id: 'services', icon: <FaTag size={20} />, label: 'Services', path: '/services' },
        { id: 'cart', icon: <FaShoppingCart size={20} />, label: 'Cart', path: '/order', badge: cart.length },
        { id: 'orders', icon: <FaBox size={20} />, label: 'My Order', path: '/dashboard' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] px-6 py-2 z-50 lg:hidden flex justify-between items-center safe-area-pb">
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <button
                        key={item.id}
                        onClick={() => navigate(item.path)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors relative ${isActive ? 'text-brand' : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        <div className="relative">
                            {item.icon}
                            {item.badge > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                                    {item.badge}
                                </span>
                            )}
                        </div>
                        <span className={`text-[10px] font-bold ${isActive ? 'text-brand' : 'text-gray-400'}`}>
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

export default BottomNav;
