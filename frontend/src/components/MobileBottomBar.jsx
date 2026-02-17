import React from 'react';
import { FaCommentDots, FaCalendarCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MobileBottomBar = () => {
    const navigate = useNavigate();

    const openChat = () => {
        // Custom event to trigger ChatWidget opening
        window.dispatchEvent(new Event('openChat'));
    };

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-6 z-[9980] flex gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
            {/* Chat Button (30%) */}
            <button
                onClick={openChat}
                className="flex-[0.4] bg-blue-50 text-brand font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform border border-blue-100"
            >
                <FaCommentDots className="text-lg" />
                <span className="text-sm">Chat</span>
            </button>

            {/* Schedule Button (70%) */}
            <button
                onClick={() => navigate('/order')}
                className="flex-[1] bg-brand text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-brand/25 active:scale-95 transition-transform"
            >
                <FaCalendarCheck className="text-lg" />
                <span className="text-sm">Schedule Pickup</span>
            </button>
        </div>
    );
};

export default MobileBottomBar;
