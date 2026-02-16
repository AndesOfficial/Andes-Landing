import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { FaMapMarkerAlt, FaPlus, FaTrash, FaCheck } from 'react-icons/fa';

const AddressList = ({ onSelectAddress, selectedAddressId, onClose }) => {
    const { currentUser } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        scTitle: '',
        scAddress: '',
        scCity: '',
        scZip: '',
    });

    useEffect(() => {
        if (!currentUser) return;

        const q = query(collection(db, `users/${currentUser.uid}/addresses`));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const addressData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setAddresses(addressData);
        });

        return () => unsubscribe();
    }, [currentUser]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) return;
        setLoading(true);

        try {
            await addDoc(collection(db, `users/${currentUser.uid}/addresses`), {
                ...formData,
                createdAt: serverTimestamp()
            });
            setShowAddForm(false);
            setFormData({ scTitle: '', scAddress: '', scCity: '', scZip: '' });
        } catch (error) {
            console.error("Error adding address:", error);
            alert("Failed to add address: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAddress = async (id, e) => {
        console.log("Attempting delete", id);
        e.stopPropagation(); // Stop click from triggering selection
        if (!window.confirm("Delete this address?")) return;

        try {
            await deleteDoc(doc(db, `users/${currentUser.uid}/addresses`, id));
            if (selectedAddressId === id) {
                onSelectAddress(null); // Deselect if deleted
            }
        } catch (error) {
            console.error("Error deleting address:", error);
            alert("Failed to delete address.");
        }
    };

    return (
        <div className="bg-white w-full h-full flex flex-col">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-lg text-slate-800">Select Delivery Address</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
                {!showAddForm ? (
                    <>
                        <div className="space-y-3">
                            {addresses.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                                        <FaMapMarkerAlt className="text-2xl" />
                                    </div>
                                    <p className="text-gray-500">No addresses saved yet.</p>
                                </div>
                            ) : (
                                addresses.map(addr => (
                                    <div
                                        key={addr.id}
                                        onClick={() => onSelectAddress(addr)}
                                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all flex justify-between items-start ${selectedAddressId === addr.id ? 'border-brand bg-brand/5 ring-1 ring-brand' : 'border-gray-100 hover:border-gray-300'}`}
                                    >
                                        <div className="flex items-start">
                                            <div className={`mt-1 mr-3 ${selectedAddressId === addr.id ? 'text-brand' : 'text-gray-400'}`}>
                                                <FaMapMarkerAlt />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">{addr.scTitle}</h4>
                                                <p className="text-sm text-slate-600">{addr.scAddress}</p>
                                                <p className="text-xs text-slate-500">{addr.scCity}, {addr.scZip}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            {selectedAddressId === addr.id && (
                                                <div className="bg-brand text-white p-1 rounded-full text-xs">
                                                    <FaCheck size={10} />
                                                </div>
                                            )}
                                            <button
                                                onClick={(e) => handleDeleteAddress(addr.id, e)}
                                                className="text-gray-300 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                                                title="Delete Address"
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <button
                            onClick={() => setShowAddForm(true)}
                            className="w-full mt-6 py-3 border-2 border-dashed border-gray-300 text-slate-600 rounded-xl font-bold flex items-center justify-center hover:bg-gray-50 hover:border-brand/50 hover:text-brand transition-all"
                        >
                            <FaPlus className="mr-2" /> Add New Address
                        </button>
                    </>
                ) : (
                    <div className="animate-fade-in-up">
                        <div className="flex items-center mb-4">
                            <button onClick={() => setShowAddForm(false)} className="mr-2 text-slate-500 hover:text-slate-800">
                                &larr; Back
                            </button>
                            <h4 className="font-bold text-slate-800">Add New Address</h4>
                        </div>

                        <form onSubmit={handleAddSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Label (e.g. Home, Office)</label>
                                <input
                                    type="text"
                                    name="scTitle"
                                    value={formData.scTitle}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-brand focus:border-brand focus:outline-none transition-shadow"
                                    placeholder="Home"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                                <textarea
                                    name="scAddress"
                                    value={formData.scAddress}
                                    onChange={handleInputChange}
                                    required
                                    rows="3"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-brand focus:border-brand focus:outline-none transition-shadow"
                                    placeholder="Street address, apartment, etc."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input
                                        type="text"
                                        name="scCity"
                                        value={formData.scCity}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-brand focus:border-brand focus:outline-none transition-shadow"
                                        placeholder="City"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                                    <input
                                        type="text"
                                        name="scZip"
                                        value={formData.scZip}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-brand focus:border-brand focus:outline-none transition-shadow"
                                        placeholder="Zip Code"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAddForm(false)}
                                    className="flex-1 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 py-3 bg-brand text-white rounded-xl font-bold hover:bg-brand-dark transition-colors shadow-lg hover:shadow-brand/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Saving...' : 'Save Address'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddressList;
