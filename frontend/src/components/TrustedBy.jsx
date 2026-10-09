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
    <section className="pt-24 md:pt-32 pb-4 bg-[#fdfeff] relative overflow-hidden">
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

        {/* --- PARTNER LOGOS --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-10 items-center pt-4 pb-12">
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-center h-20 md:h-28 px-4"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />

              {/* Fallback Text in case image breaks */}
              <span className="hidden font-bold text-slate-400 text-xs md:text-sm text-center uppercase tracking-wider">
                {client.name}
              </span>
            </div>
          ))}
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