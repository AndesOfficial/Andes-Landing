import { FaTshirt, FaWater, FaTruck } from "react-icons/fa";

const ServiceFeatures = () => {
  return (
    <div className="text-center py-8 bg-white-100 md:mb-12">
      {/* Main Heading */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800">
        We Collect, Clean, and Deliver
        <br className="hidden lg:inline" /> your laundry and dry cleaning.
      </h1>

      {/* Icon Section */}
      <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-16 mt-6">
        {/* Icon 1 */}
        <div className="flex flex-row items-center gap-2 text-3xl md:text-4xl">
          <FaTruck className="text-brand mb-2 md:mb-0 mr-2 md:mr-4" />
          <span className="text-gray-700 text-lg md:text-2xl mr-4 md:mr-10 font-bold">
            Dedicated 24/7 Support
          </span>
        </div>

        {/* Icon 2 */}
        <div className="flex flex-row items-center gap-2 text-3xl md:text-4xl">
          <FaWater className="text-brand mb-2 md:mb-0 mr-2 md:mr-4" />
          <span className="text-gray-700 text-lg md:text-2xl font-bold">
            Free Collection and Delivery
          </span>
        </div>

        {/* Icon 3 */}
        <div className="flex flex-row items-center gap-2 text-3xl md:text-4xl">
          <FaTshirt className="text-brand mb-2 md:mb-0 mr-2 md:mr-4" />
          <span className="text-gray-700 text-lg md:text-2xl mr-4 md:mr-12 font-bold">
            24Hr Turnaround Time
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServiceFeatures;