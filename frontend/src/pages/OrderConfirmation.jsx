import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { Helmet } from 'react-helmet-async';
import { FaCheckCircle } from 'react-icons/fa';

const OrderConfirmation = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Helmet>
                <title>Order Confirmed | Andes Laundry</title>
                <meta name="robots" content="noindex" />
            </Helmet>
            <div className="max-w-lg w-full text-center">
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                    <div className="flex justify-center mb-6">
                        <FaCheckCircle className="text-6xl text-green-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-4">Order Confirmed!</h1>
                    <p className="text-slate-600 mb-8 text-lg">
                        Thank you for choosing Andes Laundry. Your pickup has been scheduled.
                    </p>

                    <div className="bg-gray-50 p-4 rounded-xl mb-8">
                        <p className="text-sm text-gray-500 mb-1">Order ID</p>
                        <p className="text-xl font-mono font-bold text-slate-800">#ORD-89234</p>
                    </div>

                    <Link to="/">
                        <Button className="w-full">Return Home</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
