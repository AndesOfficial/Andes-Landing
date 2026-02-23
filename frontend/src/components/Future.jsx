import { FaCarSide, FaTint, FaCheckCircle } from "react-icons/fa";
import future from "../assets/aboutus.jpeg";

const Future = () => {
  const handleButtonClick = () => {
    window.location.href = '/about';
  };

  return (
    <div className="bg-brand flex items-center justify-center py-16 px-6">
      <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12 max-w-6xl w-full">
        <div className="relative w-full md:w-1/2">
          {/* Removed rounded-full pill design */}
          <div className="overflow-hidden rounded-xl shadow-xl">
            <img
              src={future}
              alt="Laundry Service"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Reinventing the future of laundry and dry cleaning.
          </h2>
          <ul className="text-lg md:text-xl space-y-5 mb-8">
            <li className="flex items-center font-medium">
              <span className="inline-block w-6 h-6 mr-3 text-yellow-300">
                <FaCarSide className="w-6 h-6" />
              </span>
              Zero-emission delivery vehicles
            </li>
            <li className="flex items-center font-medium">
              <span className="inline-block w-6 h-6 mr-3 text-yellow-300">
                <FaTint className="w-6 h-6" />
              </span>
              Efficient water use
            </li>
            <li className="flex items-center font-medium">
              <span className="inline-block w-6 h-6 mr-3 text-yellow-300">
                <FaCheckCircle className="w-6 h-6" />
              </span>
              Trustworthy local cleaners
            </li>
          </ul>
          <button
            onClick={handleButtonClick}
            className="bg-white text-brand font-bold py-3 px-8 rounded-md shadow-md hover:bg-slate-50 transition hover:shadow-lg"
          >
            About us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Future;