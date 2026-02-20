import { FaCheckCircle, FaShippingFast, FaShieldAlt, FaLeaf } from 'react-icons/fa';

const AndesAssured = () => {
  return (
    <div className="bg-brand py-16 lg:py-24 relative overflow-hidden mt-0">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-sm">
            Why Choose Andes?
          </h2>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
            We don't just do laundry; we care for your clothes and the planet.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Feature Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="bg-brand/10 rounded-full w-14 h-14 flex items-center justify-center mb-6 text-brand text-2xl">
              <FaCheckCircle />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Quality Check</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Rigorous 5-step inspection for perfect results, every time.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="bg-brand/10 rounded-full w-14 h-14 flex items-center justify-center mb-6 text-brand text-2xl">
              <FaShippingFast />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Ultra-Fast Delivery</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Priority pickup and 24-hour turnaround to match your busy schedule.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="bg-brand/10 rounded-full w-14 h-14 flex items-center justify-center mb-6 text-brand text-2xl">
              <FaShieldAlt />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Water Efficient</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Advanced technology that saves up to 40% more water per wash.
            </p>
          </div>

          {/* Feature Card 4 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="bg-brand/10 rounded-full w-14 h-14 flex items-center justify-center mb-6 text-brand text-2xl">
              <FaLeaf />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Eco-Friendly</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              100% non-toxic, skin-safe detergents that protect the environment.
            </p>
          </div>
        </div>

        <div className="text-center mt-16 opacity-90">
          <p className="text-white text-sm font-medium tracking-widest uppercase bg-white/10 inline-block px-4 py-2 rounded-full backdrop-blur-sm">Trusted by our growing community</p>
        </div>
      </div>
    </div>
  );
};

export default AndesAssured;