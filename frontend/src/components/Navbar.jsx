import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg py-2" : "bg-white/95 py-4"
      }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img src={logo} alt="Andes logo" className="h-16 w-16" />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/working"
              className={`text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium text-lg ${isActive("/working") ? "text-indigo-600 font-semibold" : ""
                }`}
            >
              How it works
            </Link>

            <Link to="/services"
              className={`text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium text-lg ${isActive("/services") ? "text-indigo-600 font-semibold" : ""
                }`}
            >
              Services & Pricing
            </Link>

            <Link to="/andes-assured"
              className={`text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium text-lg ${isActive("/andes-assured") ? "text-indigo-600 font-semibold" : ""
                }`}
            >
              Andes Assured
            </Link>

            <Link to="/about"
              className={`text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium text-lg ${isActive("/about") ? "text-indigo-600 font-semibold" : ""
                }`}
            >
              About us
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                <span className="text-gray-700 font-medium">
                  Hi, {currentUser.name ? currentUser.name.split(' ')[0] : currentUser.displayName?.split(' ')[0] || "User"}
                </span>                <button onClick={logout} className="text-gray-500 hover:text-indigo-600 font-medium">Logout</button>
                <Link
                  to="/order"
                  className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-indigo-700 transition duration-300 shadow-lg shadow-indigo-500/30"
                >
                  New Order
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-600 font-medium text-lg transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-600 text-white px-7 py-2.5 rounded-full font-semibold hover:bg-indigo-700 transition duration-300 flex items-center space-x-2 text-lg shadow-lg shadow-indigo-500/30"
                >
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none p-2"
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
          className={`${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            } md:hidden transition-all duration-300 ease-in-out overflow-hidden`}
        >
          <div className="pt-4 pb-6 space-y-4">
            <Link to="/working"
              className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-300 text-lg"
            >
              How it works
            </Link>
            <Link to="/services"
              className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-300 text-lg"
            >
              Services & Pricing
            </Link>

            <Link to="/andes-assured"
              className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-300 text-lg"
            >
              Andes Assured
            </Link>

            <Link to="/about"
              className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-300 text-lg"
            >
              About us
            </Link>

            <div className="pt-4 space-y-3 border-t border-gray-100 mt-4">
              {currentUser ? (
                <>
                  <div className="px-4 text-gray-700 font-medium">Logged in as {currentUser.name}</div>
                  <Link to="/order" className="block text-center bg-indigo-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 text-lg">
                    New Order
                  </Link>
                  <button onClick={logout} className="block w-full text-center text-gray-500 py-2">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block text-center text-gray-700 font-medium py-2">
                    Log In
                  </Link>
                  <Link to="/signup"
                    className="block text-center bg-indigo-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 text-lg"
                  >
                    Sign Up Now
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;