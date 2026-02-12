
import React from 'react';
import { useOrder } from '../context/OrderContext';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaArrowRight } from 'react-icons/fa';

const CartFloatingButton = () => {
    const { totalItems, totalPrice } = useOrder();
    const total = totalPrice;

    if (totalItems === 0) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden animate-fade-in-up">
            <Link to="/order" className="flex items-center justify-between bg-brand text-white p-4 rounded-xl shadow-2xl hover:bg-brand-dark transition-colors">
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                        <FaShoppingCart size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-sm uppercase tracking-wide">{totalItems} Items</span>
                        <span className="font-bold text-lg">₹{total}</span>
                    </div>
                </div>

                <div className="flex items-center font-bold">
                    View Cart <FaArrowRight className="ml-2" />
                </div>
            </Link>
        </div>
    );
};

export default CartFloatingButton;
