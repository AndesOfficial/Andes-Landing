import { FaTshirt, FaWater, FaHeadset } from "react-icons/fa";

const ServiceFeatures = () => {
  return (
    <div className="text-center py-4 bg-transparent md:mb-8">
      {/* Main Heading */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-gray-800 leading-tight">
        We Collect, Clean and Deliver
        <br className="hidden lg:inline" /> your laundry and dry cleaning.
      </h1>

      {/* Icon Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 mt-8">
        {/* Icon 1 */}
        <div className="flex flex-col md:flex-row items-center gap-4 group">
          <div className="bg-brand/10 p-4 rounded-full group-hover:bg-brand/20 transition-colors">
            <FaHeadset className="text-brand text-3xl group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-gray-800 text-lg md:text-xl font-bold max-w-[200px] md:max-w-none">
            24/7 Support
          </span>
        </div>

        {/* Vertical Divider (Desktop) */}
        <div className="hidden md:block h-12 w-px bg-gray-200"></div>

        {/* Icon 2 */}
        <div className="flex flex-col md:flex-row items-center gap-4 group">
          <div className="bg-brand/10 p-4 rounded-full group-hover:bg-brand/20 transition-colors">
            <FaWater className="text-brand text-3xl group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-gray-800 text-lg md:text-xl font-bold max-w-[200px] md:max-w-none">
            Free Pickup & Delivery
          </span>
        </div>

        {/* Vertical Divider (Desktop) */}
        <div className="hidden md:block h-12 w-px bg-gray-200"></div>

        {/* Icon 3 */}
        <div className="flex flex-col md:flex-row items-center gap-4 group">
          <div className="bg-brand/10 p-4 rounded-full group-hover:bg-brand/20 transition-colors">
            <FaTshirt className="text-brand text-3xl group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-gray-800 text-lg md:text-xl font-bold max-w-[200px] md:max-w-none">
            24Hr Turnaround
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServiceFeatures;