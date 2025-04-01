import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white shadow-lg py-2" : "bg-white/95 py-4"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-3">
              <img src={logo} alt="Andes logo" className="h-16 w-16" />

            </a>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/working"
              className={`text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium text-lg ${
                isActive("/working") ? "text-blue-600 font-semibold" : ""
              }`}
            >
              How it works
            </a>
            
            <a
              href="/services"
              className={`text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium text-lg ${
                isActive("/services") ? "text-blue-600 font-semibold" : ""
              }`}
            >
              Services & Pricing
            </a>
            <a
              href="/andes-assured"
              className={`text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium text-lg ${
                isActive("/andes-assured") ? "text-blue-600 font-semibold" : ""
              }`}
            >
              Andes Assured
            </a>
            <a
              href="/about"
              className={`text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium text-lg ${
                isActive("/about") ? "text-blue-600 font-semibold" : ""
              }`}
            >
              About us
            </a>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/download"
              className="bg-white text-blue-600 border-2 border-blue-600 px-5 py-2.5 rounded-full font-semibold hover:bg-blue-50 transition duration-300 text-lg"
            >
              Download App
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.andes.laundry"
              className="bg-blue-600 text-white px-7 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition duration-300 flex items-center space-x-2 text-lg"
            >
              <span>Book Now</span>
              <span className="text-lg">→</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none p-2"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } md:hidden transition-all duration-300 ease-in-out overflow-hidden`}
        >
          <div className="pt-4 pb-6 space-y-4">
            <a
              href="/working"
              className={`block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-300 text-lg ${
                isActive("/working") ? "bg-blue-50 text-blue-600 font-semibold" : ""
              }`}
            >
              How it works
            </a>
    
            <a href="/services"
              className={`block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-300 text-lg ${
                isActive("/services") ? "bg-blue-50 text-blue-600 font-semibold" : ""
              }`}
            >
               Services & Pricing
            </a>
            <a
              href="/andes-assured"
              className={`block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-300 text-lg ${
                isActive("/andes-assured") ? "bg-blue-50 text-blue-600 font-semibold" : ""
              }`}
            >
              Andes Assured
            </a>
            <a
              href="/about"
              className={`block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-300 text-lg ${
                isActive("/about") ? "bg-blue-50 text-blue-600 font-semibold" : ""
              }`}
            >
              About us
            </a>
            <div className="pt-4 space-y-3">
              <a
                href="https://play.google.com/store/apps/details?id=com.andes.laundry"
                className="block text-center bg-blue-50 text-blue-600 px-4 py-3 rounded-lg font-semibold hover:bg-blue-100 transition duration-300 text-lg"
              >
                Download App
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.andes.laundry"
                className="block text-center bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 text-lg"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;