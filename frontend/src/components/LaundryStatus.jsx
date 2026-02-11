import { FaClock, FaShoppingBag } from "react-icons/fa";
import second from "../assets/card4.png";

const LaundryStatus = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      {/* Left Section */}
      <div className="md:w-1/2 pr-6 flex flex-col justify-center">
        <h2 className="text-xl text-gray-500 uppercase mb-2">
          24H TURNAROUND TIME
        </h2>
        <h1 className="text-3xl font-semibold md:text-4xl md:font-bold mb-6">
          No need to plan in advance
        </h1>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="bg-yellow-100 rounded-full p-3 mr-4">
              <FaShoppingBag className="h-8 w-8 text-yellow-500" />
            </div>
            <span className="text-xl md:text-2xl">Schedule a collection today</span>
          </div>
          <div className="flex items-center">
            <div className="bg-yellow-100 rounded-full p-3 mr-4">
              <FaClock className="h-8 w-8 text-yellow-500" />
            </div>
            <span className="text-xl md:text-2xl">Get your laundry back in 24h</span>
          </div>
        </div>
      </div>

      {/* Image and Instructions Section */}
      <div className="md:w-1/2 md:pl-4 flex flex-col justify-center items-center relative mt-4 mb-4">
        <img
          src={second}
          alt="Man in coat carrying documents"
          className="hidden md:block w-full h-500 object-cover rounded-lg" />

      </div>
    </div>
  );
};

export default LaundryStatus;