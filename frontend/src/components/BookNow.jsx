import { Link } from 'react-router-dom';

const BookNow = () => {
  const handleButtonClick = () => {
    window.location.href = 'https://play.google.com/store/apps/details?id=com.andes.laundry';
  };

  return (
    <div className="bg-yellow-200 flex flex-col items-center justify-center py-20">
      <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-6 px-4 md:px-0">
        Book your slot now
      </h2>

      <Link to="/schedule-pickup">
        <button
          className="bg-white text-brand-dark font-semibold py-3 px-8 rounded-lg shadow-md flex items-center space-x-2 hover:bg-brand/10 transition self-center"
        >
          <span>Schedule a Pickup</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 text-brand-dark"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.5l-6-4.5V7l6-4.5L18 7v9l-6 4.5z"
            />
          </svg>
        </button>
      </Link>
    </div>
  );
};

export default BookNow;