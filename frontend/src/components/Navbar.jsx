import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { useOrder } from "../context/OrderContext";
import { FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa";

const Navbar = ({ isScrolled: externalIsScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalIsScrolled, setInternalIsScrolled] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const { totalItems } = useOrder();

  // Use external prop if available, otherwise fallback to internal state
  const isScrolled = externalIsScrolled !== undefined ? externalIsScrolled : internalIsScrolled;

  useEffect(() => {
    // If external control is provided, don't set up internal listener (or do it as backup? Better not to conflict)
    if (externalIsScrolled !== undefined) return;

    const handleScroll = () => {
      setInternalIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [externalIsScrolled]);

  const isActive = (path) => location.pathname === path;
  const isLanding = location.pathname === "/";

  //  Helper function to close the mobile menu
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className={`fixed w-full top-0 z-[100] transition-all duration-300 ${(isScrolled || isOpen)
        ? "bg-white/75 backdrop-blur-lg shadow-sm border-b border-slate-200/50 py-2"
        : (isLanding ? "bg-transparent py-4" : "bg-brand py-4")
        }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {/* Also close menu if clicking logo */}
              <Link to="/" onClick={closeMenu} className="flex items-center space-x-3">
                <img
                  src={logo}
                  alt="Andes logo"
                  className={`h-16 w-16 transition-all duration-300 ${(isScrolled || isOpen) ? "" : "brightness-0 invert"}`}
                />
              </Link>
            </div>


            <div className="hidden md:flex items-center space-x-8">
              <Link to="/working"
                className={`transition-colors duration-300 ease-in-out font-medium text-lg ${(isScrolled || isOpen) ? "text-slate-600 hover:text-brand" : "text-white hover:text-yellow-300"} ${isActive("/working") ? "font-bold text-brand" : ""}`}
              >
                How it works
              </Link>
              <Link to="/services"
                className={`transition-colors duration-300 ease-in-out font-medium text-lg ${(isScrolled || isOpen) ? "text-slate-600 hover:text-brand" : "text-white hover:text-yellow-300"} ${isActive("/services") ? "font-bold text-brand" : ""}`}
              >
                Services & Pricing
              </Link>
              <Link to="/andes-assured"
                className={`transition-colors duration-300 ease-in-out font-medium text-lg ${(isScrolled || isOpen) ? "text-slate-600 hover:text-brand" : "text-white hover:text-yellow-300"} ${isActive("/andes-assured") ? "font-bold text-brand" : ""}`}
              >
                Andes Assured
              </Link>
              <Link to="/about"
                className={`transition-colors duration-300 ease-in-out font-medium text-lg ${(isScrolled || isOpen) ? "text-slate-600 hover:text-brand" : "text-white hover:text-yellow-300"} ${isActive("/about") ? "font-bold text-brand" : ""}`}
              >
                About us
              </Link>
            </div>

            {/* Action Buttons (Desktop) */}
            <div className="hidden md:flex items-center space-x-6">
              {currentUser ? (
                <>
                  {/* Cart Icon */}
                  <Link to="/order" title="Cart" className="relative group p-1">
                    <FaShoppingCart className={`text-2xl transition-colors duration-300 ease-in-out ${(isScrolled || isOpen) ? "text-slate-600 group-hover:text-brand" : "text-white group-hover:text-yellow-300"}`} />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white bg-red-600 rounded-full border-2 border-white">
                        {totalItems}
                      </span>
                    )}
                  </Link>

                  {/* Dashboard / User Icon */}
                  <Link to="/dashboard" title="Dashboard" className="group p-1">
                    <FaUser className={`text-2xl transition-colors duration-300 ease-in-out ${(isScrolled || isOpen) ? "text-slate-600 group-hover:text-brand" : "text-white group-hover:text-yellow-300"}`} />
                  </Link>

                  {/* Logout Icon */}
                  <button onClick={logout} title="Logout" className="group p-1">
                    <FaSignOutAlt className={`text-2xl transition-colors duration-300 ease-in-out ${(isScrolled || isOpen) ? "text-slate-600 group-hover:text-brand" : "text-white group-hover:text-yellow-300"}`} />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`font-medium text-lg transition-colors duration-300 ease-in-out ${(isScrolled || isOpen) ? "text-slate-600 hover:text-brand" : "text-white hover:text-yellow-300"}`}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-brand text-white px-7 py-2.5 rounded hover:bg-brand-dark transition duration-300 ease-in-out flex items-center space-x-2 text-lg shadow-md font-bold"
                  >
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden z-50 relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${(isScrolled || isOpen) ? "text-slate-800" : "text-white"} hover:text-brand focus:outline-none p-2 transition-colors duration-300`}
              >
                <svg
                  className="h-8 w-8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[80] transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeMenu}
      />

      {/* Mobile menu drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] z-[90] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full justify-center items-center text-center px-8 relative">

          <div className="flex flex-col space-y-6 w-full">
            <Link to="/working"
              onClick={closeMenu}
              className="text-2xl font-bold text-slate-800 hover:text-brand transition-colors"
            >
              How it works
            </Link>
            <Link to="/services"
              onClick={closeMenu}
              className="text-2xl font-bold text-slate-800 hover:text-brand transition-colors"
            >
              Services & Pricing
            </Link>

            <Link to="/andes-assured"
              onClick={closeMenu}
              className="text-2xl font-bold text-slate-800 hover:text-brand transition-colors"
            >
              Andes Assured
            </Link>

            <Link to="/about"
              onClick={closeMenu}
              className="text-2xl font-bold text-slate-800 hover:text-brand transition-colors"
            >
              About us
            </Link>

            <div className="w-16 h-1 bg-gray-100 mx-auto rounded-full my-4"></div>

            {currentUser ? (
              <div className="flex flex-col space-y-4 w-full">
                <div className="text-gray-500 font-medium text-lg">Hi, {currentUser.fullName || currentUser.name || "User"}</div>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="text-xl font-semibold text-slate-700 hover:text-brand"
                >
                  Dashboard
                </Link>
                <Link
                  to="/order"
                  onClick={closeMenu}
                  className="bg-brand text-white flex items-center justify-center w-full h-14 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-brand-dark transition-all"
                >
                  New Order
                </Link>
                <button
                  onClick={() => { logout(); closeMenu(); }}
                  className="text-slate-400 font-medium hover:text-red-500 transition-colors"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4 w-full">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="text-xl font-semibold text-slate-700 hover:text-brand"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="bg-brand text-white flex items-center justify-center w-full h-14 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-brand-dark transition-all"
                >
                  Sign Up Free
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;