import {
  FaCheckCircle,
  FaShippingFast,
  FaShieldAlt,
  FaLeaf,
} from "react-icons/fa";
import {Helmet} from "react-helmet-async";



const AndesAssured = () => {
  return (
    <>
      <Helmet>
        <title>Andes Assured - Andes Laundry</title>
        <meta name="description" content="Learn more about Andes Laundry's commitment to quality and customer satisfaction." />
      </Helmet>
      <div className="bg-gray-100 py-12 mt-12">
        <div className="container mx-auto px-6 md:px-12 md:pt-24 md:pb-24">
          <h1 className="text-4xl font-bold text-center text-blue-900 mb-12">
            Why Andes Only?
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <FaCheckCircle className="text-blue-500 text-6xl mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Quality Check
              </h2>
              <p className="text-gray-600">
                Every piece of clothing undergoes a rigorous quality check to
                ensure it's cleaned and handled with the utmost care.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <FaShippingFast className="text-blue-500 text-6xl mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Ultra-Fast Delivery
              </h2>
              <p className="text-gray-600">
                Enjoy priority service with faster pickups and deliveries than
                ever before.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <FaLeaf className="text-blue-500 text-6xl mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Water Efficient
              </h2>
              <p className="text-gray-600">
                We use advanced water-saving technologies to minimize waste while
                maintaining superior cleaning quality.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <FaLeaf className="text-blue-500 text-6xl mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Eco-Friendly Cleaning
              </h2>
              <p className="text-gray-600">
                We use eco-friendly, non-toxic detergents, ensuring safety for
                sensitive skin and the environment.
              </p>
            </div>
          </div>
          <div className="text-center mt-20">
            <h2 className="text-xl md:text-2xl font-serif text-gray-800">
              &quot;Got your clothes dirty? Andes now!&quot;
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default AndesAssured;
