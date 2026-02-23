
import { FaMobileAlt } from "react-icons/fa";

const AppPromo = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 py-8 bg-white container mx-auto gap-12 rounded-2xl shadow-soft border border-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      {/* Left Section */}
      <div className="lg:w-1/2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
          Committed to making things easy for you
        </h2>
        <div className="text-lg text-slate-600 mb-8 space-y-4">
          <p>
            Managing your laundry and dry cleaning in the 21st century should be
            simple and accessible from anywhere.
          </p>
          <p>
            We created the app that allows you to schedule an order in less than 2
            minutes, whether at home, at the office or on the go. No need to speak
            to any representative, you can now manage all your orders with our
            easy-to-use website or mobile app.
          </p>
        </div>

        {/* Highlighted Download Section */}
        <div className="bg-brand/5 p-6 md:p-8 rounded-xl flex flex-col sm:flex-row items-center sm:items-start border border-brand/20 shadow-sm">
          <FaMobileAlt className="text-5xl text-brand mb-4 sm:mb-0 sm:mr-6" />
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Download our App</h3>
            <p className="text-slate-500 font-medium mb-4">Get exclusive offers and track your orders on the go!</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              <a href="https://apps.apple.com/in/app/andes/id6747010488" target="_blank" rel="noopener noreferrer">
                <button className="bg-brand text-white font-bold px-6 py-3 rounded-xl shadow-sm hover:bg-brand-dark hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                  App Store
                </button>
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.andes.laundry" target="_blank" rel="noopener noreferrer">
                <button className="bg-brand text-white font-bold px-6 py-3 rounded-xl shadow-sm hover:bg-brand-dark hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                  Play Store
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="lg:w-5/12 w-full mt-8 lg:mt-0 bg-gradient-to-br from-brand to-brand-dark rounded-2xl p-8 md:p-12 text-white relative overflow-hidden shadow-soft">
        <div className="relative z-10 text-center lg:text-left">
          <span className="bg-white/20 backdrop-blur-sm text-white font-extrabold text-sm px-3 py-1 rounded-lg uppercase tracking-wider mb-4 inline-block">Special Offer</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">Get ₹50 on your Andes Wallet!</h2>
          <p className="text-lg md:text-xl mb-6">Minimum order <span className="font-extrabold bg-white text-brand px-3 py-1 rounded-lg border-2 border-dashed border-brand mx-1">₹99</span> required.</p>
          <p className="text-sm opacity-80 mt-8">*Only first time users. Terms and conditions apply.</p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 h-full w-1/2 bg-white opacity-5 transform skew-x-12 translate-x-1/4"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full border-4 border-white opacity-10"></div>
      </div>
    </div>
  );
};

export default AppPromo;