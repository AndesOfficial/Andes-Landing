
import React from 'react';
import { useOrder } from '../context/OrderContext';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaTrash, FaArrowRight } from 'react-icons/fa';

const CartSidebar = () => {
    const { cart, totalItems, totalPrice, removeFromCart, updateQuantity } = useOrder();
    const total = totalPrice;

    if (totalItems === 0) {
        return (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <FaShoppingCart className="mr-2 text-brand" /> Your Cart
                </h3>
                <div className="text-center py-8">
                    <div className="bg-gray-50 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center text-gray-300">
                        <FaShoppingCart size={24} />
                    </div>
                    <p className="text-gray-500 text-sm">Your cart is empty.</p>
                    <p className="text-gray-400 text-xs mt-1">Start adding items to build your order.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sticky top-24 animate-fade-in">
            <div className="flex items-center justify-between mb-4 border-b pb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center">
                    <FaShoppingCart className="mr-2 text-brand" /> Your Cart
                </h3>
                <span className="bg-brand/10 text-brand text-xs font-bold px-2 py-1 rounded-full">
                    {totalItems} Items
                </span>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-start group">
                        <div className="flex-grow">
                            <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">{item.name}</h4>
                            <div className="text-xs text-gray-500 mt-1">
                                {item.quantity} x ₹{item.price}
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="font-bold text-sm text-gray-800">
                                ₹{item.price * item.quantity}
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-gray-300 hover:text-red-500 transition-colors"
                                title="Remove"
                            >
                                <FaTrash size={12} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t mt-4 pt-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{total}</span>
                </div>

                <Link
                    to="/order"
                    className="block w-full bg-brand hover:bg-brand-dark text-white font-bold py-3 px-4 rounded-xl text-center transition-all shadow-md hover:shadow-lg flex items-center justify-center group"
                >
                    Proceed to Order <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
};

export default CartSidebar;
