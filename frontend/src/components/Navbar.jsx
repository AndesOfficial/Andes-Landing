import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white py-1 fixed w-full top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/">
              <img src={logo} alt="Andes logo" className="mr-3 h-16 w-16" />
            </a>
            <a href="/"></a>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center justify-center flex-grow space-x-6">
            <a
              href="/working"
              className={`text-gray-900 hover:text-gray-700 transition duration-300 ${
                isActive("/working") ? "underline" : ""
              }`}
            >
              How it works
            </a>
            <a
              href="/services"
              className={`text-gray-900 hover:text-gray-700 transition duration-300 ${
                isActive("/services") ? "underline" : ""
              }`}
            >
              Services & Pricing
            </a>
            <a
              href="/andes-assured"
              className={`text-gray-900 hover:text-gray-700 transition duration-300 ${
                isActive("/andes-assured") ? "underline" : ""
              }`}
            >
              Andes
            </a>
            <a
              href="/about"
              className={`text-gray-900 hover:text-gray-700 transition duration-300 ${
                isActive("/about") ? "underline" : ""
              }`}
            >
              About us
            </a>
            <a
              href="/privacypolicy"
              className={`text-gray-900 hover:text-gray-700 transition duration-300 ${
                isActive("/privacy-policy") ? "underline" : ""
              }`}
            >
              Privacy Policy
            </a>
          </div>
          <div className="hidden md:flex items-center">
            <a
              href="https://play.google.com/store/apps/details?id=com.andes.laundry"
              className={`bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 transition duration-300 ${
                isActive("/book-now") ? "bg-blue-600" : ""
              }`}
            >
              Book now
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`${isOpen ? "block" : "hidden"} md:hidden mt-4 space-y-4`}
        >
          <a
            href="/working"
            className={`block text-gray-900 py-2 hover:bg-blue-600 hover:text-white transition duration-300 ${
              isActive("/working") ? "bg-blue-600 text-white" : ""
            }`}
          >
            How it works
          </a>
          <a
            href="/services"
            className={`block text-gray-900 py-2 hover:bg-blue-600 hover:text-white transition duration-300 ${
              isActive("/services") ? "bg-blue-600 text-white" : ""
            }`}
          >
            Services & Pricing
          </a>
          <a
            href="/andes-assured"
            className={`block text-gray-900 py-2 hover:bg-blue-600 hover:text-white transition duration-300 ${
              isActive("/andes-assured") ? "bg-blue-600 text-white" : ""
            }`}
          >
            Andes Assured
          </a>
          <a
            href="/about"
            className={`block text-gray-900 py-2 hover:bg-blue-600 hover:text-white transition duration-300 ${
              isActive("/about") ? "bg-blue-600 text-white" : ""
            }`}
          >
            About us
          </a>
          <a
            href="/privacypolicy"
            className={`block text-gray-900 py-2 hover:bg-blue-600 hover:text-white transition duration-300 ${
              isActive("/privacy-policy") ? "bg-blue-600 text-white" : ""
            }`}
          >
            Privacy Policy
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.andes.laundry"
            className={`block text-gray-900 py-2 hover:bg-blue-600 hover:text-white transition duration-300 ${
              isActive("/book-now") ? "bg-blue-600 text-white" : ""
            }`}
          >
            Book now
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;