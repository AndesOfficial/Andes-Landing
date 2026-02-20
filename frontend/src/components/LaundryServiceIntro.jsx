import React from "react";

const LaundryServiceIntro = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center mt-12 p-6 lg:p-12">
      <div className="flex-1 mb-6 lg:mb-0 lg:mr-10">
        <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
          Reinventing the Future of Laundry and Dry Cleaning
        </h2>
        <p className="text-lg lg:text-xl mb-4 leading-relaxed">
          Andes delivers the quickest, easiest to use, and most reliable
          professional laundry and dry cleaning service that completely adjusts
          to your needs.
        </p>
        <p className="text-base lg:text-lg leading-relaxed">
          
          We collect, clean and deliver your laundry to your doorstep. When and
          where you need us, we will be there. 98.7% of all standard laundry and
          dry cleaning is delivered the next day.
        </p>
      </div>
      <div className="flex-1">
        <img
          className="w-full h-auto object-cover rounded-lg shadow-lg"
          alt="Laundry service"
        />
      </div>
    </div>
  );
};

export default LaundryServiceIntro;