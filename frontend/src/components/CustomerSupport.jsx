import { FaClock, FaShoppingBag } from "react-icons/fa";
import third from "../assets/card3.png";

const CustomerSupport = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      {/* Right Section */}
      <div className="md:w-1/2 mt-6 md:mt-0 relative flex flex-col justify-center items-center">
        <img
          src={third}
          alt="Customer support representative"
          className="hidden md:block w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Left Section */}
      <div className="md:w-1/2 md:pl-32 flex flex-col justify-center">
        <h2 className="text-xl text-gray-500 uppercase mb-2">
          24H CUSTOMER SUPPORT
        </h2>
        <h1 className="text-3xl font-semibold md:text-4xl md:font-bold mb-6">
          We're here to help you
        </h1>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="bg-yellow-100 rounded-full p-3 mr-4">
              <FaShoppingBag className="h-8 w-8 text-yellow-500" />
            </div>
            <span className="text-xl md:text-2xl">Reach out to us anytime</span>
          </div>
          <div className="flex items-center">
            <div className="bg-yellow-100 rounded-full p-3 mr-4">
              <FaClock className="h-8 w-8 text-yellow-500" />
            </div>
            <span className="text-xl md:text-2xl">We're available 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;