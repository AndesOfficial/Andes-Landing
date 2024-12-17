import React from "react";
import scheduleImage from "../assets/Schedule.jpeg"; // Adjust the path according to your setup

const Schedule = () => {
  return (
    <section className="bg-teal-200 flex justify-center items-center py-24 px-6">
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
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Don't let your chores define who you are
          </h1>
          <p className="text-lg text-blue-700 mb-6">
            Enter your address and schedule a collection today
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.andes.laundry"
            className="inline-block bg-white text-blue-900 font-semibold py-3 px-6 rounded-md shadow-lg hover:bg-blue-50 transition-colors"
          >
            <span className="mr-2">💙</span> Schedule your pickup
          </a>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
