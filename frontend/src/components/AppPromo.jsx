import playstore from "../assets/playstoreicon.svg";
import { FaMobileAlt } from "react-icons/fa";

const AppPromo = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-8 py-12 bg-white">
      {/* Left Section */}
      <div className="lg:w-1/2 mb-12 lg:mb-0">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Committed to making things easy for you
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Managing your laundry and dry cleaning in the 21st century should be
          simple and accessible from anywhere.
        </p>
        <p className="text-lg text-gray-700 mb-10">
          We created the app that allows you to schedule an order in less than 2
          minutes, whether at home, at the office or on the go. No need to speak
          to any representative, you can now manage all your orders with our
          easy-to-use website or mobile app.
        </p>
        <div className="bg-brand/20 p-6 rounded-2xl flex items-center border border-brand/10">
          <FaMobileAlt className="text-4xl text-brand mr-4" />
          <div>
            <h3 className="text-xl font-bold text-slate-900">Download our App</h3>
            <p className="text-gray-600">Get exclusive offers and track your orders on the go!</p>
            <div className="mt-2 flex space-x-2">
              <button className="bg-brand text-white px-3 py-1 rounded hover:bg-brand-dark transition">
                App Store
              </button>
              <button className="bg-brand text-white px-3 py-1 rounded hover:bg-brand-dark transition">
                Play Store
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="mt-8 bg-gradient-to-r from-brand to-brand-dark rounded-xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Get 20% Off Your First Order!</h2>
          <p className="text-lg mb-4">Use code <span className="font-bold bg-white text-brand px-2 py-1 rounded">FIRST20</span> at checkout.</p>
          <p className="text-sm opacity-80">*Terms and conditions apply. Valid for new customers only.</p>
        </div>
        <div className="absolute top-0 right-0 h-full w-1/3 bg-white opacity-10 transform skew-x-12"></div>
      </div>
      <div className="lg:w-1/2 flex justify-center lg:justify-end hidden ">
        <img
          src="/path/to/app-preview.png"
          alt="App Preview"
          className="max-w-xs lg:max-w-md"
        />
      </div>
    </div>
  );
};

export default AppPromo;