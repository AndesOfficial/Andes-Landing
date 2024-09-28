import React from "react";

const BookNow = () => {
  return (
    <div className="bg-yellow-200 flex flex-col items-center justify-center py-20 mt-4 mb-4">
      <h2 className="text-2xl md:text-3xl font-semibold text-blue-900 mb-6">
        Book now. Smile away. Everyday.
      </h2>
      <button className="bg-white text-blue-900 font-semibold py-3 px-8 rounded-lg shadow-md flex items-center space-x-2 hover:bg-blue-100 transition">
        <span>
          {/* Icon or SVG for the button */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 text-blue-900"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.5l-6-4.5V7l6-4.5L18 7v9l-6 4.5z"
            />
          </svg>
        </span>
        <span>Schedule your pickup</span>
      </button>
    </div>
  );
};

export default BookNow;
