
import React, { useState, useMemo } from 'react';
import { Helmet } from "react-helmet-async";
import Navbar from '../components/Navbar';
import Footer from '../components/MyFooter';
import ServiceFilters from '../components/NewServiceFilters';
import data from '../data';
// import CartFloatingButton from '../components/CartFloatingButton'; // Removed as per request
import CartSidebar from '../components/CartSidebar';
import { FaSearch } from 'react-icons/fa';
import { useOrder } from '../context/OrderContext';
import NewServiceCard from '../components/NewServiceCard';
import BottomNav from '../components/BottomNav';
import { FaTshirt, FaShoePrints, FaLayerGroup } from 'react-icons/fa';

const NewServicePage = () => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useOrder();
  const [selectedMain, setSelectedMain] = useState('dry_cleaning'); // Default to Dry Cleaning as it's the main list now
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const getItemQuantity = (id) => {
    const item = cart.find(i => i.id === id);
    return item ? item.quantity : 0;
  };



  // Filter Logic
  const filteredServices = useMemo(() => {
    if (!data || !data.services) return [];
    return data.services.filter(service => {
      // 1. Search Filter
      const matchesSearch = (service.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (service.displayName || '').toLowerCase().includes(searchQuery.toLowerCase());

      // If searching, ignore category filter (Search Global)
      if (searchQuery.trim()) {
        return matchesSearch;
      }

      // 2. Main Category Filter (with Virtual Category support)
      return service.mainCategory === selectedMain;
    }).sort((a, b) => {
      // ... existing sort logic ...
      const priceA = a.rateByPiece || a.rateByKg || 0;
      const priceB = b.rateByPiece || b.rateByKg || 0;

      if (sortBy === 'priceLowHigh') return priceA - priceB;
      if (sortBy === 'priceHighLow') return priceB - priceA;
      return 0;
    });
  }, [selectedMain, searchQuery, sortBy]);


  return (
    <div className="min-h-[100dvh] bg-slate-50 font-sans text-gray-900 pb-24 lg:pb-0">
      <Helmet>
        <title>Services | Andes Laundry</title>
        <meta name="description" content="Browse our laundry services, from Wash & Fold to Dry Cleaning." />
      </Helmet>
      <Navbar />

      {/* Mobile Search Bar - Scrolls away (Not sticky) */}
      {/* Increased pt-20 to pt-28 (112px) to clear the 96px Navbar */}
      <div className="lg:hidden bg-brand px-4 py-2 pt-28">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-white/50 focus:outline-none text-gray-700 bg-white"
          />
        </div>
      </div>

      {/* Mobile Tabs - Sticky below Navbar (Adjusted to top-[80px] for scrolled navbar) */}
      <div className="lg:hidden sticky top-[80px] z-30 bg-brand shadow-md">
        <div className="flex justify-between px-4 pb-2 pt-1">
          <button
            onClick={() => setSelectedMain('general')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold pb-2 border-b-2 transition-all px-2 ${selectedMain === 'general' ? 'text-white border-white' : 'text-blue-200 border-transparent'}`}
          >
            <FaLayerGroup size={16} /> General
          </button>
          <button
            onClick={() => setSelectedMain('dry_cleaning')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold pb-2 border-b-2 transition-all px-2 ${selectedMain === 'dry_cleaning' ? 'text-white border-white' : 'text-blue-200 border-transparent'}`}
          >
            <FaTshirt size={16} /> Dry Cleaning
          </button>
          <button
            onClick={() => setSelectedMain('shoe_cleaning')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold pb-2 border-b-2 transition-all px-2 ${selectedMain === 'shoe_cleaning' ? 'text-white border-white' : 'text-blue-200 border-transparent'}`}
          >
            <FaShoePrints size={16} /> Shoes
          </button>
        </div>
      </div>

      {/* Main Content - Reduced top padding, 1-col mobile grid */}
      <main className="container mx-auto px-4 py-4 max-w-7xl lg:pt-8 min-h-[60vh]">
        {/* Desktop Header & Search (Hidden on Mobile) */}
        <div className="hidden lg:block">
          {/* Slim Utility Header */}
          <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-4 mb-8 flex flex-wrap justify-center md:justify-between items-center gap-4 shadow-sm text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="bg-blue-50 text-brand p-1.5 rounded-full text-xs">💳</span>
              <span>Simple Pricing</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-green-50 text-green-600 p-1.5 rounded-full text-xs">✅</span>
              <span>No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-orange-50 text-orange-600 p-1.5 rounded-full text-xs">🚚</span>
              <span>Free 24h Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-purple-50 text-purple-600 p-1.5 rounded-full text-xs">₹</span>
              <span>Min Order ₹50</span>
            </div>
          </div>

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-2">
              Fresh Laundry, <span className="text-brand relative inline-block">
                Delivered
                <svg className="absolute w-full h-2 bottom-1 left-0 text-brand/20 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto">Premium care for your clothes with simple, transparent pricing.</p>
          </div>

          {/* Search & Sort Area */}
          <div className="max-w-3xl mx-auto mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 group-focus-within:text-brand transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search for a garment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-full bg-white border border-gray-100 shadow-sm focus:shadow-xl focus:border-brand/20 focus:ring-4 focus:ring-brand/5 transition-all outline-none text-gray-700 placeholder:text-gray-400 font-medium"
              />
            </div>

            <div className="flex-shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full md:w-auto px-6 py-4 rounded-full bg-white border border-gray-100 shadow-sm focus:shadow-xl focus:border-brand/20 focus:ring-4 focus:ring-brand/5 outline-none text-gray-700 font-bold cursor-pointer transition-all hover:bg-gray-50"
              >
                <option value="default">Filters</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative items-start">

          {/* Filters Sidebar (Show only on Desktop) */}
          <div className="hidden lg:block lg:col-span-1 xl:col-span-1 sticky top-24 self-start transition-all duration-300 max-h-[calc(100vh-100px)] overflow-y-auto no-scrollbar">
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

          {/* Main Content: grid-cols-1 on mobile, 3 cols inside layout on desktop */}
          <div className="lg:col-span-3">

            {/* Grouped Service List */}
            {Object.entries(
              filteredServices.reduce((acc, service) => {
                const group = service.group || 'Other';
                if (!acc[group]) acc[group] = [];
                acc[group].push(service);
                return acc;
              }, {})
            ).map(([group, services]) => (
              <ServiceGroupSection
                key={group}
                title={group}
                services={services}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                getItemQuantity={getItemQuantity}
              />
            ))}

            {filteredServices.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="text-6xl mb-4 opacity-20">🧺</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No items found</h3>
                <p className="text-gray-500 mb-6">We couldn't find any services matching "<span className="font-bold text-gray-700">{searchQuery}</span>".</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="bg-brand text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-brand/20 hover:bg-brand-dark transition-all active:scale-95"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </main >

      <BottomNav />

      {/* Desktop Cart Sidebar Component (Positioned Fixed Right) */}
      <div className="hidden lg:block">
        <CartSidebar cart={cart} />
      </div>

    </div >
  );
};

// Desktop Table View
const DesktopServiceTable = ({ services, addToCart, removeFromCart, getItemQuantity }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-bold">
          <th className="p-4 rounded-tl-xl">Service</th>
          <th className="p-4">Details</th>
          <th className="p-4">Price</th>
          <th className="p-4 text-center rounded-tr-xl">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {services.map(service => {
          const qty = getItemQuantity(service.id);
          const unitPrice = service.price || service.rateByKg || service.rateByPiece;
          return (
            <tr key={service.id} className="hover:bg-blue-50/30 transition-colors group">
              <td className="p-4 font-bold text-gray-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xl overflow-hidden">
                  {/* Image Fix */}
                  {service.image ? <img src={service.image} alt="" className="w-full h-full object-cover" /> : '👕'}
                </div>
                {service.name}
              </td>
              <td className="p-4 text-sm text-gray-500 max-w-xs">{service.description}</td>
              <td className="p-4 font-bold text-brand whitespace-nowrap">
                {`₹${unitPrice}`}
              </td>
              <td className="p-4 text-right">
                {qty > 0 ? (
                  <div className="flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-lg px-2 py-1 shadow-sm">
                    <button onClick={() => removeFromCart(service.id)} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-red-500 font-bold">-</button>
                    <span className="text-sm font-bold w-4 text-center">{qty}</span>
                    <button onClick={() => addToCart({ ...service, price: unitPrice })} className="w-6 h-6 flex items-center justify-center text-brand font-bold">+</button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart({ ...service, price: unitPrice })}
                    className="bg-brand/10 text-brand hover:bg-brand hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-all w-full"
                  >
                    Add
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

// Mobile Accordion View
const MobileServiceList = ({ services, addToCart, removeFromCart, getItemQuantity }) => (
  <div className="flex flex-col gap-3">
    {services.map(service => {
      const qty = getItemQuantity(service.id);
      const unitPrice = service.price || service.rateByKg || service.rateByPiece;
      const totalPrice = qty * unitPrice;

      return (
        <div key={service.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-start gap-3 mb-2">
            <div className="flex items-start gap-3 flex-1">
              {/* Fixed: Added Image */}
              <div className="w-16 h-16 rounded-lg bg-gray-50 flex-shrink-0 overflow-hidden border border-gray-100">
                {service.image ? (
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">👕</div>
                )}
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg leading-tight mb-1">{service.name}</h4>
                <p className="text-xs text-gray-500 line-clamp-2">{service.description}</p>
              </div>
            </div>
            <div className="text-right">
              {/* Price Logic Update: Show total if qty > 0 */}
              <span className="block font-bold text-brand text-lg">
                {qty > 0 ? `₹${totalPrice}` : `₹${unitPrice}`}
              </span>
              <span className="text-xs text-gray-400 uppercase">
                {qty > 0 ? `(₹${unitPrice} x ${qty})` : (service.unit || 'unit')}
              </span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">24h Delivery</span>

            {qty > 0 ? (
              <div className="flex items-center gap-4 bg-gray-50 rounded-lg px-3 py-1.5 border border-gray-200">
                <button onClick={() => removeFromCart(service.id)} className="text-lg font-bold text-gray-500 px-2">-</button>
                <span className="font-bold text-gray-800">{qty}</span>
                <button onClick={() => addToCart({ ...service, price: unitPrice })} className="text-lg font-bold text-brand px-2">+</button>
              </div>
            ) : (
              <button
                onClick={() => addToCart({ ...service, price: unitPrice })}
                className="bg-brand text-white px-6 py-2 rounded-lg text-sm font-bold shadow-md shadow-brand/20 active:scale-95 transition-all"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      );
    })}
  </div>
);

// Helper Component for Collapsible Sections
const ServiceGroupSection = ({ title, services, addToCart, removeFromCart, getItemQuantity }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-4 lg:mb-8 bg-white rounded-xl lg:rounded-3xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 lg:p-6 bg-gray-50/80 hover:bg-gray-100 transition-colors text-left"
      >
        <h3 className="text-lg lg:text-2xl font-bold text-gray-800 flex items-center gap-3">
          <span className="w-1.5 h-6 lg:h-8 bg-brand rounded-full"></span>
          {title}
          <span className="text-sm font-normal text-gray-500 ml-2 bg-white px-2 py-1 rounded-full border border-gray-200 shadow-sm">{services.length} items</span>
        </h3>
        <span className={`text-gray-400 transform transition-transform duration-300 bg-white p-2 rounded-full shadow-sm ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-3 lg:p-6">
          {/* Desktop View: Grid of Cards */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {services.map(service => (
              <NewServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* Mobile View */}
          <div className="lg:hidden">
            <MobileServiceList
              services={services}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              getItemQuantity={getItemQuantity}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewServicePage;