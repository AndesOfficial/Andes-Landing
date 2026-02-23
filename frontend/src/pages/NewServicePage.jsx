import React, { useState, useMemo } from 'react';
import { Helmet } from "react-helmet-async";
import Navbar from '../components/Navbar';
import ServiceFilters from '../components/NewServiceFilters';
import data from '../data';
import CartSidebar from '../components/CartSidebar';
import { FaSearch, FaShoppingBasket } from 'react-icons/fa';
import { useOrder } from '../context/OrderContext';
import NewServiceCard from '../components/NewServiceCard';
import BottomNav from '../components/BottomNav';

/**
 * NewServicePage Component
 * 
 * The main services layout featuring:
 * - Desktop: Sticky sidebar filters and hero search.
 * - Mobile: Compact sticky pills and horizontal app-style cards.
 * - Both: Sticky category group headers.
 */
const NewServicePage = () => {
  const { cart } = useOrder();
  const [selectedMain, setSelectedMain] = useState('dry_cleaning');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Filter & Search Logic
  const filteredServices = useMemo(() => {
    if (!data || !data.services) return [];
    return data.services.filter(service => {
      const matchesSearch = (service.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (service.displayName || '').toLowerCase().includes(searchQuery.toLowerCase());

      if (searchQuery.trim()) return matchesSearch;
      return service.mainCategory === selectedMain;
    });
  }, [selectedMain, searchQuery]);

  // 2. Grouping Logic
  const groupedServices = useMemo(() => {
    return filteredServices.reduce((acc, service) => {
      const group = service.group || 'Other';
      if (!acc[group]) acc[group] = [];
      acc[group].push(service);
      return acc;
    }, {});
  }, [filteredServices]);

  return (
    <div className="min-h-[100dvh] bg-slate-50 font-sans text-slate-900 pb-24 lg:pb-0">
      <Helmet>
        <title>Services | Andes Laundry</title>
        <meta name="description" content="Browse our premium laundry services with transparent pricing." />
      </Helmet>

      <Navbar />

      {/* MOBILE HEADER: Search (scrolls) + Categories (sticky) */}
      <div className="lg:hidden mt-[60px] md:mt-[80px]">
        {/* Search Bar (Non-sticky on mobile per req) */}
        <div className="px-5 pt-6 pb-4 bg-white shadow-sm border-b border-slate-100">
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

        {/* Categories (Sticky on mobile) */}
        <div className="sticky top-[70px] md:top-[80px] z-40 bg-white/95 backdrop-blur-md py-3 px-4 shadow-sm border-b border-slate-100">
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
      </div>

      <main className="container mx-auto px-4 lg:px-6 max-w-7xl pt-24 lg:pt-32 min-h-[70vh]">

        {/* DESKTOP HERO & SEARCH */}
        <div className="hidden lg:block mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-6">
            Our <span className="text-[#0089FF]">Premium</span> Services
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-8">Transparent pricing • Professional care • Fast delivery</p>

          <div className="relative group shadow-2xl shadow-blue-500/5 rounded-[2.5rem]">
            <div className="absolute inset-y-0 left-0 pl-7 flex items-center pointer-events-none">
              <FaSearch className="text-slate-400 text-xl group-focus-within:text-[#0089FF] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="What can we clean for you today? (e.g., Saree, Blazer, Blanket)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-8 py-6 rounded-[2.5rem] bg-white border-2 border-transparent shadow-sm focus:shadow-blue-500/10 focus:border-[#0089FF]/5 transition-all outline-none text-slate-800 font-extrabold text-xl placeholder:text-slate-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative items-start">

          {/* DESKTOP SIDEBAR FILTERS */}
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

          {/* MAIN SERVICE FEED */}
          <div className="lg:col-span-3 space-y-12 lg:space-y-16">
            {Object.entries(groupedServices).map(([group, services]) => (
              <ServiceGroupSection key={group} title={group} services={services} />
            ))}

            {/* EMPTY STATE */}
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
      {/* Desktop Persistent Cart Sidebar */}
      <div className="hidden lg:block">
        <CartSidebar cart={cart} />
      </div>
    </div>
  );
};

/**
 * ServiceGroupSection Component
 * 
 * Renders a category group with a sticky header.
 */
const ServiceGroupSection = ({ title, services }) => {
  const sectionId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <div className="scroll-mt-32 lg:scroll-mt-40" id={sectionId}>
      {/* STICKY GROUP HEADER */}
      <div className="sticky top-[125px] lg:top-[120px] z-30 bg-slate-50/95 backdrop-blur-md py-4 lg:py-6 mb-6 border-b border-slate-200/40">
        <h3 className="text-xl lg:text-3xl font-black text-slate-800 flex items-center gap-4">
          {title}
          <div className="flex-grow h-[2px] bg-slate-100 hidden sm:block"></div>
          <span className="text-[10px] lg:text-xs font-black text-[#0089FF] bg-blue-50 px-3 py-1.5 rounded-full uppercase tracking-widest">
            {services.length} items
          </span>
        </h3>
      </div>

      {/* UNIFIED GRID: Handled by NewServiceCard's adaptive layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8 px-1 sm:px-0">
        {services.map(service => (
          <NewServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default NewServicePage;
