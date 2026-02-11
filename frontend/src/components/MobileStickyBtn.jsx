import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTruck } from 'react-icons/fa';

const MobileStickyBtn = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hide when at the very top (hero section usually has a CTA)
            if (currentScrollY < 100) {
                setIsVisible(false);
            } else {
                // Show when scrolling up or down, as long as not at top
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 left-4 right-4 z-50 md:hidden transition-all duration-300 transform translate-y-0 animate-fade-in-up">
            <Link
                to="/order"
                className="flex items-center justify-center w-full bg-gradient-to-r from-brand to-brand-dark text-white font-bold text-lg py-4 rounded-2xl shadow-[0_8px_30px_rgb(8,144,241,0.4)] active:scale-95 transition-transform duration-200"
            >
                <span className="mr-2 animate-pulse">Schedule Pickup</span>
                <FaTruck className="text-xl" />
            </Link>
        </div>
    );
};

export default MobileStickyBtn;
