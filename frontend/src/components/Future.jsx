import future from "../assets/aboutus.jpeg";

const Future = () => {
  const handleButtonClick = () => {
    window.location.href = '/about';
  };

  return (
    <div className="bg-brand flex items-center justify-center min-h-screen p-6">
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12 max-w-6xl">
        <div className="relative w-full md:w-1/2">
          <div className="overflow-hidden rounded-full md:rounded-xl">
            <img
              src={future}
              alt="Laundry Service"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 text-white">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">
            Reinventing the future of laundry and dry cleaning.
          </h2>
          <ul className="text-lg md:text-xl space-y-4 mb-6">
            <li className="flex items-center">
              <span className="inline-block w-6 h-6 mr-2 text-white/80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20.5l-6-4.5V7l6-4.5L18 7v9l-6 4.5z"
                  />
                </svg>
              </span>
              Zero-emission delivery vehicles
            </li>
            <li className="flex items-center">
              <span className="inline-block w-6 h-6 mr-2 text-white/80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 7.5a8.38 8.38 0 01-8 8.38A8.38 8.38 0 014 7.5C4 4.42 6.42 2 9.5 2S15 4.42 15 7.5a2.5 2.5 0 005 0"
                  />
                </svg>
              </span>
              Efficient water use
            </li>
            <li className="flex items-center">
              <span className="inline-block w-6 h-6 mr-2 text-white/80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 6L9 17l-5-5"
                  />
                </svg>
              </span>
              Trustworthy local cleaners
            </li>
          </ul>
          <button
            onClick={handleButtonClick}
            className="bg-white text-brand font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-brand/10 transition"
          >
            About us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Future;