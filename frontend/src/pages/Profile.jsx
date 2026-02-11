import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { currentUser } = useAuth();

    // Fallback if Date object is not valid
    const formatDate = (date) => {
        if (!date) return 'N/A';
        try {
            // Handle Firestore Timestamp or standard Date
            const d = date.toDate ? date.toDate() : new Date(date);
            return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
        } catch (e) {
            return 'Invalid Date';
        }
    };

    return (
        <div className="animate-fade-in-up md:max-w-2xl">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">My Profile</h1>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-brand to-brand-dark p-8 text-white">
                    <div className="flex items-center space-x-6">
                        <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center text-brand text-3xl font-bold shadow-lg">
                            {currentUser?.fullName?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{currentUser?.fullName || 'User'}</h2>
                            <p className="text-white/80">{currentUser?.email}</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-brand-dark bg-opacity-50 rounded-full text-xs font-medium tracking-wide">Standard Member</span>
                        </div>
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                        <div className="p-3 bg-gray-50 rounded-lg text-gray-800 font-medium">
                            {currentUser?.fullName || 'Not set'}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                        <div className="p-3 bg-gray-50 rounded-lg text-gray-800 font-medium">
                            {currentUser?.email}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Account Created</label>
                        <div className="p-3 bg-gray-50 rounded-lg text-gray-800 font-medium">
                            {formatDate(currentUser?.createdAt)}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex gap-4">
                        <button className="flex-1 bg-brand text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-dark transition-colors">
                            Edit Profile
                        </button>
                        <button className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
