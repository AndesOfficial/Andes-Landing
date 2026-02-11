import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const MyOrders = () => {
    const { currentUser } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // check if user is logged in
        if (!currentUser) return;

        const ordersRef = collection(db, "orders");
        // query for my orders
        const q = query(
            ordersRef,
            where("userId", "==", currentUser.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            console.log("Fetched orders count:", snapshot.docs.length);

            let ordersList = [];

            // loop through docs to format data
            snapshot.docs.forEach(doc => {
                const data = doc.data();

                // date formatting is inconsistent, fixing it here
                let displayDate = 'Just now';
                if (data.createdAt) {
                    displayDate = data.createdAt.toDate().toLocaleDateString();
                }

                ordersList.push({
                    id: doc.id,
                    ...data,
                    date: displayDate,
                    timestamp: data.createdAt ? data.createdAt.seconds : 0
                });
            });

            // sort by newest first
            ordersList.sort((a, b) => {
                return b.timestamp - a.timestamp;
            });

            console.log("Processed Orders:", ordersList);
            setOrders(ordersList);
            setLoading(false);
        }, (error) => {
            console.log("Error getting orders:", error);
            setLoading(false);
        });

        // cleanup
        return () => unsubscribe();
    }, [currentUser]);

    return (
        <div className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900">My Orders</h1>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Filter</button>
                    <button className="px-4 py-2 bg-brand rounded-lg text-sm font-medium text-white hover:bg-brand-dark">New Order</button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12">Loading orders...</div>
            ) : orders.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No orders found.</div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                                    <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-900">{order.orderId}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{order.date}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{order.totalItems} items</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                                ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'Processing' ? 'bg-brand/10 text-brand-dark' :
                                                        'bg-red-100 text-red-800'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            ₹{order.totalPrice}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-brand hover:text-brand-dark font-semibold">Details</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyOrders;
