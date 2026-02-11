/* eslint-disable react/prop-types */
import React from "react";

const FeatureLeft = ({ title, subtitle, description, imageSrc, bulletPoints }) => {
  return (
    <div className="flex flex-col md:flex-row items-center my-0 pt-0 pb-0 md:py-12 relative">
      {/* Mobile Timeline Connector */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-dashed border-l-2 border-slate-200 md:hidden z-0"></div>

      <div className="hidden md:block md:w-1/2 m-6 pr-8">
        <img
          src={imageSrc}
          alt="feature"
          className="w-full h-auto object-cover rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform transition-transform duration-500 hover:scale-[1.02]"
        />
      </div>
      <div className="md:w-1/2 p-6 md:p-8 pl-12 md:pl-8 relative z-10">
        <div className="md:hidden mb-4 -ml-6 w-[calc(100%+1.5rem)]">
          <img src={imageSrc} alt="feature" className="w-full h-48 object-cover rounded-2xl shadow-sm" />
        </div>

        <div className="absolute left-0 top-6 w-12 h-0.5 bg-slate-200 md:hidden"></div>
        <div className="absolute left-[-5px] top-[22px] w-3 h-3 rounded-full bg-brand md:hidden ring-4 ring-white"></div>

        <h2 className="text-xs font-bold text-brand uppercase tracking-wider mb-2">{title}</h2>
        <h3 className="text-2xl font-bold text-slate-800 mb-3 leading-tight">{subtitle}</h3>
        <p className="text-slate-600 mb-6 leading-relaxed text-sm md:text-base">{description}</p>
        <ul className="space-y-3">
          {bulletPoints.map((point, index) => (
            <li key={index} className="flex items-start">
              <span className="bg-brand/10 text-brand p-2 rounded-full mr-3 shadow-sm shrink-0 mt-0.5">
                {/* You can replace this with an actual icon */}
                {point.icon}
              </span>
              <span className="text-slate-700 font-medium text-sm md:text-base">{point.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeatureLeft;