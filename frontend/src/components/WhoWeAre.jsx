import { FaUsers, FaMapMarkedAlt, FaLeaf, FaCheckCircle } from "react-icons/fa";
import vanImage from '../assets/van-removebg-preview.png';

const FeatureItem = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group h-full">
    <div className="flex items-center gap-4 mb-3">
      <div className="bg-brand/10 p-3 rounded-xl flex-shrink-0 group-hover:bg-brand group-hover:text-white transition-colors duration-300">
        <div className="text-xl text-brand group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
    </div>
    <p className="text-slate-600 leading-relaxed text-sm">
      {description}
    </p>
  </div>
);

const WhoWeAre = () => {
  return (
    <div className="bg-slate-50 py-16 lg:py-24 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand/5 to-transparent hidden lg:block"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left Content - Text */}
          <div className="flex-1 lg:w-1/2 order-2 lg:order-1">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Redefining laundry
            </h2>

            {/* Exact Description Provided in Brief */}
            <div className="text-lg text-slate-600 mb-10 leading-relaxed font-medium space-y-4">
              <p>Managing your laundry and dry cleaning in the 21st century should be simple and accessible from anywhere.</p>
              <p>We created the app that allows you to schedule an order in less than 2 minutes, whether at home, at the office or on the go. No need to speak to any representative, you can now manage all your orders with our easy-to-use website or mobile app.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div className="md:col-span-2">
                <FeatureItem
                  icon={<FaUsers />}
                  title="Complete Care"
                  description="We handle pickup, cleaning, ironing, and 24-hour delivery. Express service available."
                />
              </div>
              <FeatureItem
                icon={<FaMapMarkedAlt />}
                title="Pune based"
                description="Dedicated, convenient local service starting right here in Pune."
              />
              <FeatureItem
                icon={<FaLeaf />}
                title="Eco-Friendly"
                description="Sustainable practices and eco-friendly electric vehicles."
              />
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="flex-1 lg:w-1/2 relative flex justify-center lg:justify-end order-1 lg:order-2 w-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-brand/20 to-brand-blue/5 rounded-full blur-3xl opacity-70 -z-10 animate-pulse-slow"></div>

            <div className="relative z-10 w-full max-w-lg mx-auto lg:mx-0 bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100/50">
              {/* Washing Machine Representation instead of Truck */}
              <div className="w-full aspect-square rounded-[2rem] bg-gradient-to-br from-blue-50 to-indigo-50 border-8 border-white shadow-inner flex items-center justify-center relative overflow-hidden group">
                <div className="w-48 h-48 rounded-full border-8 border-slate-200 flex items-center justify-center bg-white shadow-[inset_0_4px_20px_rgba(0,0,0,0.1)] relative overflow-hidden">
                  {/* Water/Clothes animation inside */}
                  <div className="absolute inset-0 bg-brand/10 group-hover:bg-brand/20 transition-colors duration-700 w-[150%] h-[150%] -left-1/4 -top-1/4 rounded-[40%] animate-[spin_8s_linear_infinite]"></div>
                  <div className="absolute inset-0 bg-blue-400/20 group-hover:bg-blue-400/30 transition-colors duration-700 w-[140%] h-[140%] -left-1/5 -top-1/5 rounded-[45%] animate-[spin_6s_linear_infinite_reverse]"></div>
                </div>
                {/* Digital Display */}
                <div className="absolute top-8 right-8 w-16 h-8 bg-slate-800 rounded-lg flex items-center justify-center border-t-2 border-slate-700 shadow-inner">
                  <span className="text-brand font-mono font-bold text-sm">24:00</span>
                </div>
              </div>

              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:-left-6 bg-white p-4 lg:p-6 rounded-2xl shadow-xl border border-slate-100 w-max animate-float flex items-center gap-4">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <FaCheckCircle className="text-xl" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm lg:text-base">Verified Quality</p>
                  <p className="text-slate-500 text-xs hidden sm:block">Premium care guaranteed.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;