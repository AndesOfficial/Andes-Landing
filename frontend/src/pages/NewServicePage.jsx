import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import Navbar from '../components/Navbar';
import ServiceFilters from '../components/NewServiceFilters';
import data from '../data';
import CartSidebar from '../components/CartSidebar';
import { FaSearch, FaShoppingBasket, FaBolt, FaClock } from 'react-icons/fa';
import { useOrder } from '../context/OrderContext';
import NewServiceCard from '../components/NewServiceCard';
import BottomNav from '../components/BottomNav';

/**
 * NewServicePage Component
 */
const NewServicePage = () => {
  const { cart, cartMode } = useOrder();
  const [selectedMain, setSelectedMain] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [serviceMode, setServiceMode] = useState('regular');

  // Keep serviceMode in sync when cartMode changes (e.g. first item added locks the cart)
  useEffect(() => {
    if (cartMode !== null) {
      setServiceMode(cartMode);
    }
    // When cartMode goes null (cart cleared), serviceMode keeps last value
    // but the toggle is now fully unlocked — user can freely switch
  }, [cartMode]);

  // Active display mode: if cart has items use its mode, otherwise use toggle
  const activeMode = cartMode || serviceMode;

  // Toggle handler — always update local state (disabled prop on button prevents clicks when locked)
  const handleModeSwitch = (mode) => {
    setServiceMode(mode);
  };

  // Filter: instant items only show in instant mode, regular items only in regular mode
  const filteredServices = useMemo(() => {
    if (!data || !data.services) return [];
    return data.services.filter(service => {
      const isInstantItem = !!service.instantOnly;
      if (activeMode === 'instant' && !isInstantItem) return false;
      if (activeMode === 'regular' && isInstantItem) return false;

      const matchesSearch = (service.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (service.displayName || '').toLowerCase().includes(searchQuery.toLowerCase());

      if (searchQuery.trim()) return matchesSearch;
      return service.mainCategory === selectedMain;
    });
  }, [selectedMain, searchQuery, activeMode]);

  const groupedServices = useMemo(() => {
    return filteredServices.reduce((acc, service) => {
      const group = service.group || 'Other';
      if (!acc[group]) acc[group] = [];
      acc[group].push(service);
      return acc;
    }, {});
  }, [filteredServices]);

  const isInstant = activeMode === 'instant';

  return (
    <div className="min-h-[100dvh] bg-slate-50 font-sans text-slate-900 pb-24 lg:pb-0">
      <Helmet>
        <title>Services | Andes Laundry</title>
        <meta name="description" content="Browse our premium laundry services with transparent pricing." />
      </Helmet>

      <Navbar />

      {/* MOBILE HEADER */}
      <div className="lg:hidden mt-[112px] sm:mt-[120px]">
        {/* Mode Toggle (Mobile) */}
        <div className="px-4 pt-4 pb-3 bg-white border-b border-slate-100 flex justify-center">
          <ServiceModeToggle activeMode={activeMode} cartMode={cartMode} onSwitch={handleModeSwitch} />
        </div>

        {/* Search Bar */}
        <div className="px-5 pt-3 pb-4 bg-white shadow-sm border-b border-slate-100">
          <div className="relative group">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0089FF] transition-colors" />
            <input
              type="text"
              placeholder="Search for a garment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-3.5 pl-12 pr-6 outline-none focus:border-[#0089FF]/10 focus:bg-white transition-all text-sm font-bold text-slate-700"
            />
          </div>
        </div>

        {/* Categories (Sticky on mobile) - hide category filter in instant mode since it only has General */}
        {!isInstant && (
          <div className="sticky top-[80px] z-40 bg-white/95 backdrop-blur-md py-3 px-4 shadow-sm border-b border-slate-100">
            <ServiceFilters
              mainCategories={data?.mainCategories || []}
              selectedMain={selectedMain}
              onMainChange={(key) => {
                setSelectedMain(key);
                setSearchQuery('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              layout="horizontal"
            />
          </div>
        )}
      </div>

      <main className="container mx-auto px-4 lg:px-6 max-w-7xl pt-24 lg:pt-32 min-h-[70vh]">

        {/* DESKTOP HERO & SEARCH */}
        <div className="hidden lg:block mb-10 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">
            Our <span className="text-[#0089FF]">Premium</span> Services
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-8">
            Transparent pricing • Professional care • Fast delivery
          </p>

          {/* Desktop Mode Toggle */}
          <div className="flex justify-center mb-8">
            <ServiceModeToggle activeMode={activeMode} cartMode={cartMode} onSwitch={handleModeSwitch} />
          </div>

          <div className="relative group shadow-2xl shadow-blue-500/5 rounded-[2.5rem]">
            <div className="absolute inset-y-0 left-0 pl-7 flex items-center pointer-events-none">
              <FaSearch className="text-slate-400 text-xl group-focus-within:text-[#0089FF] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="What can we clean for you today?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-8 py-6 rounded-[2.5rem] bg-white border-2 border-transparent shadow-sm focus:shadow-blue-500/10 focus:border-[#0089FF]/5 transition-all outline-none text-slate-800 font-extrabold text-xl placeholder:text-slate-300"
            />
          </div>
        </div>

        {/* Instant Banner */}
        {isInstant && (
          <div className="mb-8 bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl p-4 sm:p-5 flex items-center gap-4 shadow-lg shadow-amber-500/20">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <FaBolt className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-white font-black text-base">Andes Instant — Done in 4 Hours!</h3>
              <p className="text-white/80 text-xs font-semibold mt-0.5">Premium express service. Items picked up and returned same day.</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full flex-shrink-0">
              <FaClock className="text-white text-xs" />
              <span className="text-white text-xs font-black">4H</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative items-start">

          {/* DESKTOP SIDEBAR FILTERS */}
          {!isInstant && (
            <div className="hidden lg:block lg:col-span-1">
              <ServiceFilters
                mainCategories={data?.mainCategories || []}
                selectedMain={selectedMain}
                onMainChange={(key) => {
                  setSelectedMain(key);
                  setSearchQuery('');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                layout="vertical"
              />
            </div>
          )}

          {/* MAIN SERVICE FEED */}
          <div className={isInstant ? 'lg:col-span-4 space-y-12' : 'lg:col-span-3 space-y-12 lg:space-y-16'}>
            {Object.entries(groupedServices).map(([group, services]) => (
              <ServiceGroupSection key={group} title={group} services={services} serviceMode={activeMode} />
            ))}

            {filteredServices.length === 0 && (
              <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100 mt-8">
                <div className="text-7xl mb-6 opacity-20 filter grayscale flex justify-center">
                  <FaShoppingBasket />
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-3">No matching services</h3>
                <p className="text-slate-400 font-bold mb-8">We couldn't find any results for "{searchQuery}".</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="bg-[#0089FF] text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all active:scale-95 uppercase tracking-widest text-xs"
                >
                  View All Services
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <BottomNav />
      <div className="hidden lg:block">
        <CartSidebar cart={cart} />
      </div>
    </div>
  );
};

/**
 * ServiceModeToggle Component
 */
const ServiceModeToggle = ({ activeMode, cartMode, onSwitch }) => {
  const isLocked = !!cartMode;

  return (
    <div className="relative inline-flex flex-col items-center gap-2">
      <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl gap-1.5">
        {/* Regular */}
        <button
          id="toggle-regular-service"
          onClick={() => onSwitch('regular')}
          disabled={isLocked && cartMode !== 'regular'}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-black text-xs sm:text-sm transition-all duration-300 ${
            activeMode === 'regular'
              ? 'bg-white text-slate-900 shadow-md shadow-slate-200'
              : 'text-slate-400 hover:text-slate-600'
          } ${isLocked && cartMode !== 'regular' ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <FaClock className={activeMode === 'regular' ? 'text-[#0089FF]' : 'text-slate-400'} />
          <span>Regular Service</span>
          {activeMode === 'regular' && (
            <span className="hidden sm:inline text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold uppercase">24–48H</span>
          )}
        </button>

        {/* Instant */}
        <button
          id="toggle-andes-instant"
          onClick={() => onSwitch('instant')}
          disabled={isLocked && cartMode !== 'instant'}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-black text-xs sm:text-sm transition-all duration-300 ${
            activeMode === 'instant'
              ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-md shadow-amber-200'
              : 'text-slate-400 hover:text-slate-600'
          } ${isLocked && cartMode !== 'instant' ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <FaBolt className={activeMode === 'instant' ? 'text-white' : 'text-slate-400'} />
          <span>Andes Instant</span>
          {activeMode === 'instant' && (
            <span className="text-[9px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold uppercase">4H ⚡</span>
          )}
        </button>
      </div>

      {isLocked && (
        <span className="text-[10px] font-bold text-slate-400">
          Cart locked to {cartMode === 'instant' ? 'Andes Instant' : 'Regular Service'} — clear cart to switch
        </span>
      )}
    </div>
  );
};

/**
 * ServiceGroupSection Component
 */
const ServiceGroupSection = ({ title, services, serviceMode }) => {
  const sectionId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <div className="scroll-mt-32 lg:scroll-mt-40" id={sectionId}>
      <div className="bg-slate-50 py-4 lg:py-6 mb-6 border-b border-slate-200/40">
        <h3 className="text-xl lg:text-3xl font-black text-slate-800 flex items-center gap-4">
          {title}
          <div className="flex-grow h-[2px] bg-slate-100 hidden sm:block"></div>
          <span className="text-[10px] lg:text-xs font-black text-[#0089FF] bg-blue-50 px-3 py-1.5 rounded-full uppercase tracking-widest">
            {services.length} items
          </span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8 px-1 sm:px-0">
        {services.map(service => (
          <NewServiceCard key={service.id} service={service} serviceMode={serviceMode} />
        ))}
      </div>
    </div>
  );
};

export default NewServicePage;
