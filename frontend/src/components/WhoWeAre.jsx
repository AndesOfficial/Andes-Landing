import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faMapMarkerAlt, faLeaf } from "@fortawesome/free-solid-svg-icons";
import vanImage from '../assets/van.png'; // Import the image

const WhoWeAre = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center p-6 lg:p-12 bg-white md:h-screen">
      {/* Text Section */}
      <div className="flex-1 mb-6 pt-20 lg:mb-0 lg:mr-10">
        <h2 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight text-blue-500">
          <FontAwesomeIcon icon={faUsers} className="mr-6" />
          Who We Are ?
        </h2>
        <p className="text-base lg:text-lg mb-6 leading-relaxed text-gray-600">
          Andes is the #1 fastest and safest on-demand laundry service platform.
          You can schedule a laundry pickup with just a few taps, and we’ll take
          care of the rest. From pickup to cleaning, ironing, or dry cleaning to
          delivery – all within 48 hours. Need just ironing? We’ll have your
          clothes back to you in as fast as 120 minutes. Every service is backed
          by Andes Assured.
        </p>
        {/* Subsection: Current Availability */}
        <div className="mb-6">
          <h3 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight text-blue-500">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-6" />
            Currently Available in Pune
          </h3>
          <p className="text-sm lg:text-base leading-relaxed text-gray-600">
            We are an early-stage startup, starting in Pune with a vision to
            provide convenient, efficient, and reliable laundry services. While
            we are currently serving Pune, we are actively working to expand to
            other cities in India and beyond. Stay tuned as we grow and bring
            our on-demand laundry service to more locations.
          </p>
        </div>
        {/* Subsection: Environmental Protection */}
        <div className="mb-6">
          <h3 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight text-blue-500">
            <FontAwesomeIcon icon={faLeaf} className="mr-6" />
            We Protect Our Environment
          </h3>
          <p className="text-sm lg:text-base leading-relaxed text-gray-600">
            Social and environmental sustainability is at the heart of what we
            do. We are building the largest fleet of electric delivery vehicles
            and are committed to reducing water, electricity consumption, and
            the amount of packaging.
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex-1 hidden md:block">
        <img
          src={vanImage} // Use the imported image
          alt="Andes Delivery Van"
          className="w-full md:max-h md:pt-10 object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default WhoWeAre;