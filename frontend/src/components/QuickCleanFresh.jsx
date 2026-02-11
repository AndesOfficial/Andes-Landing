import { Link } from "react-router-dom";

const QuickCleanFresh = () => {
  const handleButtonClick = () => {
    window.open("https://play.google.com/store/apps/details?id=com.andes.laundry", "_blank");
  };

  return (
    <div className="relative bg-brand py-24 md:py-32 flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
          Quick. Clean. Fresh.
        </h1>
        <p className="text-xl md:text-2xl text-white/90 font-medium mb-12 max-w-2xl mx-auto">
          Your laundry delivered in 24h
        </p>

        <Link
          to="/services"
          className="inline-flex items-center gap-2 bg-white text-brand font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Schedule your pickup
        </Link>
      </div>

      {/* Subtle Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default QuickCleanFresh;