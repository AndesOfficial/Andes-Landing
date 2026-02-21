import { FaUsers, FaMapMarkedAlt, FaLeaf, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import vanImage from '../assets/van-removebg-preview.png';

const FeatureItem = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full">
    <div className="flex items-center gap-4 mb-3">
      <div className="bg-blue-50 p-3 rounded-xl flex-shrink-0 group-hover:bg-brand group-hover:text-white transition-colors duration-300 border border-blue-100 group-hover:border-brand">
        <div className="text-xl text-brand group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-bold text-slate-900 leading-tight">{title}</h3>
    </div>
    <p className="text-slate-600 leading-relaxed text-sm font-medium">
      {description}
    </p>
  </div>
);

const WhoWeAre = () => {
  return (
    <div className="py-16 lg:py-24 overflow-hidden relative">
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-100/40 to-transparent hidden lg:block -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand/5 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left Content - Text */}
          <div className="flex-1 lg:w-1/2 order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start">
            <span className="text-brand font-extrabold uppercase tracking-widest text-xs md:text-sm mb-4 block bg-blue-50 w-max px-4 py-1.5 rounded-full border border-blue-100 shadow-sm">
              About Andes
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
              REDEFINING <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-blue-400">LAUNDRY</span>
            </h2>

            <div className="text-lg text-slate-600 mb-10 leading-relaxed font-medium space-y-4 max-w-xl">
              <p>Managing your laundry and dry cleaning in the 21st century should be simple and accessible from anywhere.</p>
              <p>We created the app that allows you to schedule an order in less than 2 minutes, whether at home, at the office or on the go. No need to speak to any representative, you can now manage all your orders with our easy-to-use website or mobile app.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 w-full text-left">
              <div className="md:col-span-2">
                <FeatureItem
                  icon={<FaUsers />}
                  title="Complete Care"
                  description="We handle pickup, cleaning, ironing, and 24-hour delivery. Express service available."
                />
              </div>
              <FeatureItem
                icon={<FaMapMarkedAlt />}
                title="Pune Based"
                description="Dedicated, convenient local service starting right here in Pune."
              />
              <FeatureItem
                icon={<FaLeaf />}
                title="Eco-Friendly"
                description="Sustainable practices and eco-friendly electric vehicles."
              />
            </div>
          </div>

          {/* Right Content - Premium Image Display */}
          <div className="flex-1 lg:w-1/2 relative flex justify-center lg:justify-end order-1 lg:order-2 w-full mt-8 lg:mt-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-brand/20 to-blue-200/40 rounded-full blur-[80px] opacity-70 -z-10 animate-pulse-slow"></div>

            <div className="relative z-10 w-full max-w-md lg:max-w-lg mx-auto lg:mx-0 bg-white p-4 sm:p-6 rounded-[3rem] shadow-2xl border border-white/60">
              {/* Premium Image Container */}
              <div className="w-full aspect-square relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/30 group border border-slate-100">
                <div className="absolute inset-0 bg-blue-400/5 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img
                  src={vanImage}
                  alt="Andes Laundry Van"
                  className="w-full h-full object-contain filter drop-shadow-xl p-8 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Parallax Floating Badge */}
              <motion.div
                className="absolute -bottom-4 md:-bottom-6 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:-left-8 bg-white/95 backdrop-blur-xl p-4 lg:p-5 rounded-2xl shadow-2xl border border-white/50 z-40 flex items-center gap-3 sm:gap-4 w-max scale-[0.85] sm:scale-100 origin-bottom lg:origin-bottom-left"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              >
                <div className="bg-green-100 p-2 sm:p-3 rounded-xl text-green-600 shadow-inner">
                  <FaCheckCircle className="text-xl sm:text-2xl" />
                </div>
                <div className="text-left">
                  <p className="font-black text-slate-800 text-sm lg:text-base leading-tight">Verified Quality</p>
                  <p className="text-slate-500 font-semibold text-[10px] sm:text-xs uppercase tracking-wider mt-0.5">Premium Care</p>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;