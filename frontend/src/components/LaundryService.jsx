
import first from "../assets/first.png";

const LaundryService = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-full bg-white rounded-3xl overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100/50 hover:shadow-lg transition-all duration-300">
      {/* Left Section (Image) */}
      <div className="md:w-1/2 relative min-h-[300px] md:min-h-full overflow-hidden group">
        <div className="absolute inset-0 bg-blue-100/20 mix-blend-multiply z-10 transition-opacity group-hover:opacity-0"></div>
        <img
          src={first}
          alt="Woman examining clothes"
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        {/* Decorative Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r opacity-60"></div>
      </div>

      {/* Right Section (Text) */}
      <div className="md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
        <div className="inline-block relative mb-4">
          <h2 className="text-sm md:text-base text-gray-400 font-bold uppercase tracking-wider relative z-10">
            Freedom from Laundry
          </h2>
          <div className="absolute -bottom-1 -left-1 w-full h-2 bg-blue-100 -rotate-1 rounded-full -z-0"></div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 leading-tight">
          A laundry service <br /> designed <span className="text-brand">for you</span>
        </h1>

        <p className="text-gray-500 text-lg leading-relaxed mb-8">
          Never worry about staining your favorite shirt again. We offer comprehensive laundry, dry cleaning, and ironing services tailored to fit your busy lifestyle.
        </p>

        <div className="flex flex-wrap gap-3">
          <span className="bg-blue-50 text-brand px-4 py-2 rounded-full text-sm font-bold">Wash & Fold</span>
          <span className="bg-blue-50 text-brand px-4 py-2 rounded-full text-sm font-bold">Dry Cleaning</span>
          <span className="bg-blue-50 text-brand px-4 py-2 rounded-full text-sm font-bold">Ironing</span>
        </div>
      </div>
    </div>
  );
};

export default LaundryService;
