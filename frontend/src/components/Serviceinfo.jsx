import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // Importing star icons from react-icons

const ServiceInfo = () => {
  return (
    <div className="bg-brand text-white p-8 shadow-md">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        {/* Title and Subtitle Section */}
        <div className="mb-4 md:mb-0">
          <h1 className="text-xl font-bold mb-2">
            The First Smart Laundry Service
          </h1>
          <p className="text-sm">
            Includes Washing, Ironing, Dry Cleaning, and much more
          </p>
        </div>
        {/* Star Rating Section */}
        <div className="flex items-center text-4xl">
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
          <FaStarHalfAlt className="text-yellow-400" />
          <span className="ml-2 text-sm">(4.5)</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceInfo;