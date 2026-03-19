import React from 'react';
import { motion } from 'framer-motion';

// Asset Imports (Ensure these are correct in your project structure)
import ibisLogo from '../assets/ibis.png';
import hostel99Logo from '../assets/hostel99.png';
import zoloLogo from '../assets/zolo.png';
import treeboLogo from '../assets/treebo.png';
import fabLogo from '../assets/fab.jpg';
import aaalayLogo from '../assets/aaalay.png';

const clients = [
  { name: "ibis Hotel", logo: ibisLogo },
  { name: "Hostel99", logo: hostel99Logo },
  { name: "Zolo Stays", logo: zoloLogo },
  { name: "Treebo Hotels", logo: treeboLogo },
  { name: "Fab Hotels", logo: fabLogo },
  { name: "Aaalay Property", logo: aaalayLogo },
];

const TrustedBy = () => {
  return (
    <section className="py-24 md:py-32 bg-[#fdfeff] relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(#2563eb 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }}>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-200/15 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-200/15 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-50 border border-blue-100"
          >
            <span className="text-blue-600 font-bold uppercase text-[10px] tracking-[0.25em]">
              Hospitality Partners
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight"
          >
            Trusted by Leading <span className="text-blue-600">Hotels & Stays in Pune</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            We proudly handle laundry operations for some of Pune’s most trusted hotels, hostels, and managed living spaces.
          </motion.p>
        </div>

        {/* --- INFINITE SCROLLING MARQUEE --- */}
        <div className="relative w-full overflow-hidden flex items-center pt-4 pb-12">
          
          {/* Fading Edges for the Marquee Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#fdfeff] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#fdfeff] to-transparent z-20 pointer-events-none"></div>

          <motion.div
            className="flex gap-8 md:gap-16 items-center flex-nowrap shrink-0"
            // The magic happens here: Animate x from 0% to -50% to create a seamless loop
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              repeat: Infinity, 
              ease: "linear", 
              duration: 25 // Adjust this value to make it scroll faster or slower
            }}
          >
            {/* 
              We duplicate the array twice combining them to create a seamless infinite loop.
              Total items = 6 original + 6 duplicated = 12 items.
              When the first set of 6 scrolls past, the second set of 6 comes in perfectly.
            */}
            {[...clients, ...clients].map((client, index) => (
              <div 
                key={index}
                className="group relative bg-white border border-slate-100/60 shadow-sm p-6 md:p-8 rounded-3xl flex items-center justify-center min-w-[150px] md:min-w-[200px] h-28 md:h-36 shrink-0 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-100 cursor-pointer"
              >
                {/* Subtle hover glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>

                <div className="relative h-full w-full flex items-center justify-center z-10">
                  <img
                    src={client.logo}
                    alt={client.name}
                    // Filter is set to none (no grayscale), maintaining native colors
                    className="max-h-full max-w-full object-contain filter-none opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105" 
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />

                  {/* Fallback Text in case image breaks */}
                  <span className="hidden font-bold text-slate-400 text-xs md:text-sm text-center uppercase tracking-wider relative z-10 group-hover:text-blue-600 transition-colors">
                    {client.name}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced "More Partners" Badge */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
        >
          <span className="text-slate-400 font-bold uppercase tracking-widest text-[11px]">
            and many more...
          </span>
        </motion.div>

      </div>
    </section>
  );
};

export default TrustedBy;