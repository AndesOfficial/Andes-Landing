import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { FaClock } from "react-icons/fa";

const QuickCleanFresh = () => {
  return (
    <div className="relative bg-gradient-to-br from-brand via-brand to-blue-900 pt-32 pb-24 md:pt-40 md:pb-32 flex items-center justify-center overflow-hidden z-10 rounded-b-[3rem] shadow-2xl">
      {/* Deep Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-dark/40 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 text-center relative z-20">
        <motion.h1
          className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-[1.1] drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Quick. Clean. Fresh.
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-blue-100 font-medium mb-12 max-w-2xl mx-auto opacity-95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Your laundry delivered in 24h
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            to="/order"
            className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-slate-900 font-black tracking-wide uppercase text-lg px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl shadow-[0_10px_40px_rgba(250,204,21,0.4)] hover:-translate-y-1 hover:bg-yellow-300 transition-all duration-300 group relative overflow-hidden w-full sm:w-auto"
          >
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-[shine_1s_ease-in-out]" />
            <FaClock size={24} className="relative z-10" />
            <span className="relative z-10">Schedule your pickup</span>
          </Link>
        </motion.div>
      </div>

      {/* Subtle floating particles (optional flair) */}
      <motion.div
        className="absolute top-20 left-20 w-4 h-4 rounded-full bg-white/20 blur-sm pointer-events-none"
        animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-32 w-6 h-6 rounded-full bg-yellow-400/20 blur-md pointer-events-none"
        animate={{ y: [0, 30, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
};

export default QuickCleanFresh;