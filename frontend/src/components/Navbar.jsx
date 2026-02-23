
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { useOrder } from "../context/OrderContext";
import { FaShoppingCart, FaUser, FaSignOutAlt, FaRocket, FaList, FaChevronRight, FaStar } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const { totalItems } = useOrder();

  // We now handle scroll state locally only
  const [isScrolled, setIsScrolled] = useState(false);

  /* 
     SCROLL LISTENER LOGIC:
     We want the navbar to change its background color when the user scrolls down.
     This useEffect adds an event listener to the window's scroll event.
     If the user scrolls more than 20 pixels, we set isScrolled to true.
  */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path || (location.hash && location.pathname + location.hash === path);
  const isLanding = location.pathname === "/";

  //  Helper function to close the mobile menu
  const closeMenu = () => setIsOpen(false);


  // --- Helper Variables for CSS Clarity ---
  // Using variables makes the main return statement much cleaner and easier to read.

  const navBackgroundClass = (isScrolled || isOpen)
    ? "bg-white/80 backdrop-blur-md shadow-lg shadow-brand/5 border-b border-white/40 py-2" // Scrolled or Menu Open state
    : (isLanding ? "bg-transparent py-4 border-transparent" : "bg-brand py-4 border-transparent"); // Transparent on landing, Brand color on other pages

  const linkColorClass = (isScrolled || isOpen)
    ? "text-slate-600 hover:text-brand" // Dark text when scrolled
    : "text-white hover:text-yellow-300"; // White text when transparent

  const logoClass = (isScrolled || isOpen)
    ? ""
    : "brightness-0 invert"; // Invert logo to white when on transparent background


  return (
    <>
      {/* Top Announcement Bar */}
      <div className={`fixed w-full top-0 z-[110] transition-transform duration-300 ${isScrolled ? "-translate-y-full" : "translate-y-0"} bg-slate-900 border-b border-white/10 text-white text-[11px] sm:text-sm font-medium py-2 px-4 flex items-center justify-center gap-2 tracking-wide`}>
        <FaStar className="text-yellow-400 text-[10px] sm:text-xs" />
        <span>Premium Laundry Service in Pune</span>
        <span className="hidden sm:inline opacity-30 mx-2">|</span>
        <span className="font-bold text-yellow-400 hidden sm:inline">24h Express Delivery Available</span>
      </div>

      <nav className={`fixed w-full z-[100] transition-all duration-300 ${navBackgroundClass} ${isScrolled ? "top-0" : "top-[32px] sm:top-[36px]"}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">

            {/* Logo Section */}
            <div className="flex items-center">
              <Link to="/" onClick={closeMenu} className="flex items-center space-x-3">
                <img
                  src={logo}
                  alt="Andes logo"
                  className={`h-16 w-16 transition-all duration-300 ${logoClass}`}
                />
              </Link>
            </div>


            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/working"
                className={`transition-colors duration-300 ease-in-out font-medium text-lg ${linkColorClass} ${isActive("/working") ? "font-bold text-brand" : ""}`}
              >
                How it works
              </Link>
              <Link to="/services"
                className={`transition-colors duration-300 ease-in-out font-medium text-lg ${linkColorClass} ${isActive("/services") ? "font-bold text-brand" : ""}`}
              >
                Services & Pricing
              </Link>
              <Link to="/about"
                className={`transition-colors duration-300 ease-in-out font-medium text-lg ${linkColorClass} ${isActive("/about") ? "font-bold text-brand" : ""}`}
              >
                About us
              </Link>
              <Link to="/andes-assured"
                className={`transition-colors duration-300 ease-in-out font-medium text-lg ${linkColorClass} ${isActive("/andes-assured") ? "font-bold text-brand" : ""}`}
              >
                Andes Assured
              </Link>
            </div>

            {/* Action Buttons (Desktop) */}
            <div className="hidden md:flex items-center space-x-6">
              {currentUser ? (
                <>
                  {/* Cart Icon */}
                  <Link to="/order" title="Cart" className="relative group p-1">
                    <FaShoppingCart className={`text-2xl transition-colors duration-300 ease-in-out ${isScrolled || isOpen ? "text-slate-600 group-hover:text-brand" : "text-white group-hover:text-yellow-300"}`} />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white bg-red-600 rounded-full border-2 border-white">
                        {totalItems}
                      </span>
                    )}
                  </Link>

                  {/* Dashboard / User Icon */}
                  <Link to="/dashboard" title="Dashboard" className="group p-1">
                    <FaUser className={`text-2xl transition-colors duration-300 ease-in-out ${isScrolled || isOpen ? "text-slate-600 group-hover:text-brand" : "text-white group-hover:text-yellow-300"}`} />
                  </Link>

                  {/* Logout Icon */}
                  <button onClick={logout} title="Logout" className="group p-1">
                    <FaSignOutAlt className={`text-2xl transition-colors duration-300 ease-in-out ${isScrolled || isOpen ? "text-slate-600 group-hover:text-brand" : "text-white group-hover:text-yellow-300"}`} />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`font-medium text-lg transition-colors duration-300 ease-in-out ${linkColorClass}`}
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
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] z-[90] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto pt-24 pb-24 px-6 flex flex-col no-scrollbar">

          {/* Main Navigation Links */}
          <div className="flex flex-col space-y-2 mb-8">
            <Link to="/working" onClick={closeMenu} className="text-xl font-bold text-slate-800 py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors flex justify-between items-center group">
              How it works
              <FaChevronRight className="text-slate-300 text-sm group-hover:text-brand transition-colors" />
            </Link>
            <Link to="/services" onClick={closeMenu} className="text-xl font-bold text-slate-800 py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors flex justify-between items-center group">
              Services & Pricing
              <FaChevronRight className="text-slate-300 text-sm group-hover:text-brand transition-colors" />
            </Link>
            <Link to="/about" onClick={closeMenu} className="text-xl font-bold text-slate-800 py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors flex justify-between items-center group">
              About us
              <FaChevronRight className="text-slate-300 text-sm group-hover:text-brand transition-colors" />
            </Link>
            <Link to="/andes-assured" onClick={closeMenu} className="text-xl font-bold text-slate-800 py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors flex justify-between items-center group">
              Andes Assured
              <FaChevronRight className="text-slate-300 text-sm group-hover:text-brand transition-colors" />
            </Link>
          </div>

          <div className="flex-1"></div> {/* Spacer to push bottom content down */}

          {/* User Profile Section (Bottom) */}
          <div className="mt-auto">
            <div className="w-full h-px bg-slate-100 mb-6"></div>

            {currentUser ? (
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                {/* User Info Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center text-brand font-bold">
                    {currentUser.fullName ? currentUser.fullName.charAt(0).toUpperCase() : <FaUser />}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Welcome Back</p>
                    <p className="text-slate-800 font-bold leading-tight line-clamp-1">{currentUser.fullName || "User"}</p>
                  </div>
                </div>

                {/* Dashboard Link */}
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="bg-white border border-gray-200 text-slate-700 w-full py-3 rounded-xl font-bold text-sm shadow-sm hover:border-brand/30 hover:text-brand hover:shadow-md transition-all flex items-center justify-center gap-2 mb-3"
                >
                  <FaList className="text-slate-400" />
                  View Dashboard
                </Link>

                {/* New Order Button */}
                <Link
                  to="/order"
                  onClick={closeMenu}
                  className="bg-brand text-white w-full py-3.5 rounded-xl font-bold text-base shadow-lg shadow-brand/20 hover:bg-brand-dark hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mb-4"
                >
                  <FaRocket />
                  New Order
                </Link>

                {/* Logout */}
                <button
                  onClick={() => { logout(); closeMenu(); }}
                  className="w-full text-center text-sm font-medium text-slate-400 hover:text-red-500 transition-colors py-1 flex items-center justify-center gap-2"
                >
                  <FaSignOutAlt />
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="w-full py-3 rounded-xl font-bold text-slate-700 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all text-center"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="bg-brand text-white w-full py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-brand/20 hover:bg-brand-dark transition-all text-center"
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