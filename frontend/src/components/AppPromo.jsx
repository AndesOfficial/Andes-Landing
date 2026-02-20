
import { FaMobileAlt } from "react-icons/fa";

const AppPromo = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 py-12 bg-white container mx-auto gap-12">
      {/* Left Section */}
      <div className="lg:w-1/2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
          Committed to making things easy for you
        </h2>
        <div className="text-lg text-gray-700 mb-8 space-y-4">
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
        <div className="bg-brand/10 p-6 md:p-8 rounded-xl flex flex-col sm:flex-row items-center sm:items-start border-2 border-brand shadow-lg">
          <FaMobileAlt className="text-5xl text-brand mb-4 sm:mb-0 sm:mr-6" />
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Download our App</h3>
            <p className="text-gray-700 font-medium mb-4">Get exclusive offers and track your orders on the go!</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              <a href="https://apps.apple.com/in/app/andes/id6747010488" target="_blank" rel="noopener noreferrer">
                <button className="bg-yellow-400 text-slate-900 font-bold px-6 py-3 rounded-md shadow-md hover:bg-yellow-300 hover:scale-105 transition border border-yellow-500">
                  App Store
                </button>
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.andes.laundry" target="_blank" rel="noopener noreferrer">
                <button className="bg-yellow-400 text-slate-900 font-bold px-6 py-3 rounded-md shadow-md hover:bg-yellow-300 hover:scale-105 transition border border-yellow-500">
                  Play Store
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Banner - Kept highly visible on the right */}
      <div className="lg:w-5/12 w-full mt-8 lg:mt-0 bg-gradient-to-br from-brand to-brand-dark rounded-xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 text-center lg:text-left">
          <span className="bg-yellow-400 text-slate-900 font-extrabold text-sm px-3 py-1 rounded-md uppercase tracking-wider mb-4 inline-block">Special Offer</span>
          <h2 className="text-4xl font-extrabold mb-4 leading-tight">Get 20% Off Your First Order!</h2>
          <p className="text-xl mb-6">Use code <span className="font-extrabold bg-white text-brand px-3 py-1 rounded-md border-2 border-dashed border-brand mx-1">FIRST20</span> at checkout.</p>
          <p className="text-sm opacity-80 mt-8">*Terms and conditions apply. Valid for new customers only.</p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 h-full w-1/2 bg-white opacity-5 transform skew-x-12 translate-x-1/4"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full border-4 border-white opacity-10"></div>
      </div>
    </div>
  );
};

export default AppPromo;