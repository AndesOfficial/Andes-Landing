import { Link } from "react-router-dom";

const QuickCleanFresh = () => {
  const handleButtonClick = () => {
    window.open("https://play.google.com/store/apps/details?id=com.andes.laundry", "_blank");
  };

  return (
    <div className="relative bg-[#3B82F6] pt-32 pb-24 mt-16 mb-16">
      {/* Curved Background */}
      {/* <div className="absolute inset-x-0 top-0 transform -translate-y-1/2">
        <svg viewBox="0 0 1440 320" className="w-full">
          <path
            fill="#3B82F6"
            fillOpacity="1"
            d="M0,224L1440,64L1440,320L0,320Z"
          ></path>
        </svg>
      </div> */}

      {/* Text and Button */}
      <div className="relative text-center max-w-xl mx-auto justify-center flex-col flex">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Quick. Clean. Fresh.
        </h2>
        <p className="text-lg md:text-xl text-white mb-10">
          Your laundry delivered in 24h
        </p>
        <Link
          to="/services"
          className="bg-white mt-8 text-[#3B82F6] font-semibold rounded-lg shadow-md flex items-center justify-center h-12 w-full md:w-auto px-4 md:px-8 hover:bg-gray-100 transition mx-auto"
        >
          <span className="mr-2">
            {/* Icon or SVG for the button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 text-[#3B82F6]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.5l-6-4.5V7l6-4.5L18 7v9l-6 4.5z"
              />
            </svg>
          </span>
          <span>Schedule your pickup</span>
        </Link>
      </div>
    </div>
  );
};

export default QuickCleanFresh;