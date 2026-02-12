
import { FaClock, FaShoppingBag } from "react-icons/fa";
import third from "../assets/card3.png";

const CustomerSupport = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row w-full h-full bg-white rounded-3xl overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100/50 hover:shadow-lg transition-all duration-300">

      {/* Left Section (Text) */}
      <div className="md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
        <div className="inline-block relative mb-4">
          <h2 className="text-sm md:text-base text-gray-400 font-bold uppercase tracking-wider relative z-10">
            24h Customer Support
          </h2>
          <div className="absolute -bottom-1 -left-1 w-full h-2 bg-yellow-100 -rotate-1 rounded-full -z-0"></div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 mb-8 leading-tight">
          We're here to <span className="text-brand">help you</span>
        </h1>

        <div className="space-y-6">
          <div className="flex items-start group">
            <div className="bg-yellow-50 rounded-2xl p-4 mr-5 group-hover:bg-yellow-100 group-hover:scale-110 transition-all duration-300 shadow-sm">
              <FaShoppingBag className="text-xl md:text-2xl text-yellow-500" />
            </div>
            <div>
              <span className="block text-lg md:text-xl font-bold text-slate-800 mb-1 group-hover:text-brand transition-colors">Anytime Assistance</span>
              <p className="text-gray-500 text-sm leading-relaxed">Reach out to us anytime for order updates or queries.</p>
            </div>
          </div>

          <div className="flex items-start group">
            <div className="bg-yellow-50 rounded-2xl p-4 mr-5 group-hover:bg-yellow-100 group-hover:scale-110 transition-all duration-300 shadow-sm">
              <FaClock className="text-xl md:text-2xl text-yellow-500" />
            </div>
            <div>
              <span className="block text-lg md:text-xl font-bold text-slate-800 mb-1 group-hover:text-brand transition-colors">Available 24/7</span>
              <p className="text-gray-500 text-sm leading-relaxed">Our support team is always ready to resolve your issues.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className="md:w-1/2 relative min-h-[300px] md:min-h-full overflow-hidden group">
        <div className="absolute inset-0 bg-yellow-100/20 mix-blend-multiply z-10 transition-opacity group-hover:opacity-0"></div>
        <img
          src={third}
          alt="Customer support representative"
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        {/* Decorative Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-l opacity-60"></div>
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white z-20 md:hidden">
          <p className="font-bold text-lg">Always Online</p>
          <p className="text-sm opacity-90">Ready to serve you</p>
        </div>
      </div>

    </div>
  );
};

export default CustomerSupport;