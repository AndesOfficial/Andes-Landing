import { FaTshirt, FaWater, FaTruck } from "react-icons/fa";

const ServiceFeatures = () => {
  return (
    <div className="text-center py-4 bg-transparent md:mb-8">
      {/* Main Heading */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-gray-800 leading-tight">
        We Collect, Clean, and Deliver
        <br className="hidden lg:inline" /> your laundry and dry cleaning.
      </h1>

      {/* Icon Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 mt-8">
        {/* Icon 1 */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="bg-brand/10 p-4 rounded-full">
            <FaTruck className="text-brand text-3xl" />
          </div>
          <span className="text-gray-700 text-lg md:text-xl font-bold max-w-[200px] md:max-w-none">
            Dedicated 24/7 Support
          </span>
        </div>

        {/* Vertical Divider (Desktop) */}
        <div className="hidden md:block h-12 w-px bg-gray-200"></div>

        {/* Icon 2 */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="bg-brand/10 p-4 rounded-full">
            <FaWater className="text-brand text-3xl" />
          </div>
          <span className="text-gray-700 text-lg md:text-xl font-bold max-w-[200px] md:max-w-none">
            Free Collection and Delivery
          </span>
        </div>

        {/* Vertical Divider (Desktop) */}
        <div className="hidden md:block h-12 w-px bg-gray-200"></div>

        {/* Icon 3 */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="bg-brand/10 p-4 rounded-full">
            <FaTshirt className="text-brand text-3xl" />
          </div>
          <span className="text-gray-700 text-lg md:text-xl font-bold max-w-[200px] md:max-w-none">
            24Hr Turnaround Time
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServiceFeatures;