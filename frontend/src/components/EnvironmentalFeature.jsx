/* eslint-disable react/prop-types */
import React from "react";

const EnvironmentalFeature = ({
  title,
  subtitle,
  description,
  bulletPoints,
  buttonText,
  imageSrc,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-gradient-to-br from-brand via-brand to-blue-900 text-white p-10 md:p-16 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
      <div className="md:w-1/2 relative z-10">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <h3 className="text-3xl font-bold mb-4">{subtitle}</h3>
        <p className="text-xl mb-6">{description}</p>
        <ul className="mb-8">
          {bulletPoints.map((point, index) => (
            <li key={index} className="flex items-center mb-4">
              <span className="text-yellow-400 mr-3">{point.icon}</span>
              <span className="text-lg">{point.text}</span>
            </li>
          ))}
        </ul>
        <button className="bg-white text-brand font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-200 transition">
          {buttonText}
        </button>
      </div>
      <div className="md:w-1/2 mt-8 ml-36 md:mt-0 hidden md:block">
        <img
          src={imageSrc}
          alt="feature"
          className="w-[90%] h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default EnvironmentalFeature;