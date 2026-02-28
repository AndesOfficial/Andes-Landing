import { FaUsers, FaMapMarkedAlt, FaLeaf, FaCheckCircle, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import vanImage from '../assets/van-removebg-preview.png';

const BentoCard = ({ icon, title, description, className = "" }) => (
  <div className={`bg-white/60 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] border border-white shadow-xl hover:shadow-2xl transition-all duration-300 group ${className}`}>
    <div className="flex flex-col sm:flex-row items-start gap-4 mb-2">
      <div className="bg-gradient-to-br from-blue-100 to-brand/20 p-3 sm:p-4 rounded-2xl flex-shrink-0 text-brand group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm">
        <div className="text-xl sm:text-2xl">
          {icon}
        </div>
      </div>
      <div className="mt-1">
        <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 leading-tight">{title}</h3>
        <p className="text-slate-600 leading-relaxed text-sm font-medium">
          {description}
        </p>
      </div>
    </div>
  </div>
);

const WhoWeAre = () => {
  return (
    <div className="py-8 md:py-16 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">

        {/* Top Content: Title & Intro */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-center mb-16 md:mb-20">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-black text-slate-900 leading-[1.15] tracking-tight">
              Premium laundry care, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-cyan-500">
                simplified for you.
              </span>
            </h2>
          </div>
          <div className="lg:w-1/2 text-lg text-slate-600 font-medium leading-relaxed space-y-4 text-center lg:text-left">
            <p>
              Managing laundry and dry cleaning today shouldn't feel like a chore. We built Andes to make it accessible from anywhere, picking up your clothes and delivering them fresh.
            </p>
            <p>
              Whether at home or on the go, schedule an order in minutes through our app. No phone calls needed, just pure convenience wrapped in premium care.
            </p>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* Main Visual Box (Spans 7 cols on desktop) */}
          <div className="lg:col-span-7 bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-[2.5rem] p-6 sm:p-12 relative overflow-hidden border border-slate-100 shadow-lg group flex items-center justify-center min-h-[350px] md:min-h-[450px]">
            {/* Animated Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-brand/20 to-blue-300/30 rounded-full blur-[60px] opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>

            <img
              src={vanImage}
              alt="Andes Laundry Delivery Van"
              className="w-full max-w-md object-contain relative z-10 filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Floating Badges */}
            <motion.div
              className="absolute top-6 right-6 md:top-8 md:right-8 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-white flex items-center gap-2 z-20"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <FaStar className="text-yellow-400" />
              <span className="font-bold text-slate-800 text-sm">4.9/5 Rating</span>
            </motion.div>

            <motion.div
              className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-white flex items-center gap-3 z-20"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            >
              <div className="bg-green-100 p-1.5 rounded-lg text-green-600">
                <FaCheckCircle />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-xs leading-none">Verified</p>
                <p className="text-slate-500 font-semibold text-[10px] uppercase tracking-wider mt-0.5">Premium Care</p>
              </div>
            </motion.div>
          </div>

          {/* Features Grid (Spans 5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            <BentoCard
              icon={<FaUsers />}
              title="Complete Care"
              description="We handle pickup, cleaning, ironing, and 24-hour delivery. Express service available for urgent needs."
              className="flex-1"
            />
            <div className="flex flex-col sm:flex-row lg:flex-col gap-6 lg:gap-8 flex-1">
              <BentoCard
                icon={<FaMapMarkedAlt />}
                title="Pune Based"
                description="Dedicated, convenient local service."
                className="flex-1"
              />
              <BentoCard
                icon={<FaLeaf />}
                title="Eco-Friendly"
                description="Sustainable practices & EV fleet."
                className="flex-1"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;