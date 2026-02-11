import React from "react";
import { Link } from "react-router-dom";
import scheduleImage from "../assets/Schedule.jpeg"; // Adjust the path according to your setup

const Schedule = () => {
  return (
    <section className="bg-brand/10 flex justify-center items-center py-24 px-6">
      <div className="flex flex-col md:flex-row items-center md:space-x-12 max-w-5xl mx-auto">
        {/* Image Section */}
        <div className="flex-shrink-0 mb-8 md:mb-0">
          <div className="w-64 h-64 bg-cover bg-center rounded-tl-[120px] rounded-tr-[120px] rounded-bl-[120px] rounded-br-[120px] overflow-hidden">
            <img
              src={scheduleImage}
              alt="Schedule your pickup"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            Laundry & Dry Cleaning
          </h1>
          <p className="text-lg text-brand mb-6">
            Schedule a pickup and get your clothes cleaned in no time!
          </p>
          <Link to="/schedule-pickup">
            <button
              className="inline-block bg-white text-brand font-semibold py-3 px-6 rounded-md shadow-lg hover:bg-brand/10 transition-colors"
            >
              <span className="mr-2">💙</span> Schedule your pickup
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
