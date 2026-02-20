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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight tracking-tight uppercase">
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

            <div className="relative z-10 w-full max-w-lg mx-auto lg:mx-0 bg-white p-4 sm:p-8 rounded-[3rem] shadow-2xl border border-slate-100/50">
              {/* Truck Image */}
              <div className="w-full relative rounded-[2.5rem] overflow-hidden bg-brand/5">
                <img src={vanImage} alt="Andes Laundry Van" className="w-full h-auto object-cover filter drop-shadow-xl p-4" />
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