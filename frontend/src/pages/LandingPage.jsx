// import useTypewriter from "../hooks/useTypewriter";
import van from "../assets/van.png"; // Import the van image
import LaundryService from "../components/LaundryService.jsx";
import LaundryStatus from "../components/LaundryStatus.jsx";
import CustomerSupport from "../components/CustomerSupport.jsx";
import Services from "../components/Services.jsx";
import CustomerReviews from "../components/CustomerReview.jsx";
import Future from "../components/Future.jsx";
import BookNow from "../components/BookNow.jsx";
// import Serviceinfo from "../components/Serviceinfo.jsx";
import ServiceFeatures from "../components/ServiceFeatures.jsx";
import playstore from "../assets/playstoreicon.svg";
import appstore from "../assets/appstoreicon.svg"; // Import the App Store icon
import AndesAssured from "../components/AA.jsx";
import TeamSection from "../components/TeamSection.jsx";
import FeatureLeft from "../components/FeatureLeft.jsx";
import FeatureRight from "../components/FeatureRight.jsx";
import card1 from "../assets/card1.png";
import card2 from "../assets/card2.png";
import card3 from "../assets/card3.png";
import card4 from "../assets/card4.png";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Appsupport from "../components/Appsupport.jsx";
import FAQ from "../components/Faq.jsx";
import { Helmet } from "react-helmet-async";

const bulletPoints1 = [
  { icon: "🔔", text: "Get notified when your order is ready for pick-up" },
  { icon: "⏱️", text: "Schedule collection at your convenience" },
];

const bulletPoints2 = [
  { icon: "📦", text: "Track your delivery in real-time" },
  { icon: "🚪", text: "Know exactly when your laundry will arrive" },
];

const bulletPoints3 = [
  { icon: "📞", text: "24/7 customer support available" },
  { icon: "💬", text: "Reach us via call or chat in the app" },
];

const bulletPoints4 = [
  { icon: "✅", text: "Order scheduled and delivered promptly" },
  { icon: "📦", text: "Enjoy freshly cleaned clothes at your doorstep" },
];

const LandingPage = () => {
  return (
    <div className="overflow-x-hidden">
      <Helmet>
        <title>Andes Laundry - Home</title>
        <meta name="description" content="Welcome to Andes Laundry, your trusted laundry partner in Pune." />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 min-h-[90vh] flex flex-col justify-center relative overflow-hidden pb-16">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-white blur-3xl"></div>
          <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] rounded-full bg-yellow-300 blur-3xl"></div>
        </div>

        <main className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10 pt-20 md:pt-0 flex-grow">
          {/* Text Section */}
          <div className="w-full md:w-1/2 text-white md:pr-12 animate-slide-up text-center md:text-left">
            <div className="space-y-4 md:space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
                Laundry & dry
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
                cleaning within
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight text-blue-200">
                24h delivery
              </h1>
            </div>

            <div className="mt-8 mb-8 flex items-center justify-center md:justify-start">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-300">
                Kothrud, Pune
              </h1>
            </div>

            {/* Store links */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">
              <a
                href="https://play.google.com/store/apps/details?id=com.andes.laundry"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-white text-black p-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 max-w-[200px] mx-auto sm:mx-0"
              >
                <img src={playstore} alt="Play Store" className="w-8 h-8 md:w-10 md:h-10" />
                <div className="ml-3 text-left">
                  <p className="text-xs text-gray-600 font-medium">Get it on</p>
                  <p className="text-sm md:text-lg font-bold leading-none">Google Play</p>
                </div>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-white text-black p-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 max-w-[200px] mx-auto sm:mx-0"
              >
                <img src={appstore} alt="App Store" className="w-8 h-8 md:w-10 md:h-10" />
                <div className="ml-3 text-left">
                  <p className="text-xs text-gray-600 font-medium">Download on the</p>
                  <p className="text-sm md:text-lg font-bold leading-none">App Store</p>
                </div>
              </a>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center mt-12 md:mt-0 animate-fade-in animation-delay-200">
            <div className="relative w-full max-w-md lg:max-w-lg aspect-square">
              <img
                src={van}
                alt="Andes Laundry Van"
                className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </main>
      </div>

      {/* Stats Banner */}
      <div className="bg-blue-900 text-white py-12 shadow-xl relative z-20 -mt-8 mx-4 md:mx-16 rounded-2xl transform translate-y-0">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-yellow-300 mb-2">
              The #1 Smart Laundry Service
            </h2>
            <p className="text-gray-300 text-lg">
              in Dry Cleaning, Laundry Service & Laundrette
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center gap-1 text-3xl text-yellow-400 mb-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
            </div>
            <span className="text-lg font-medium opacity-90">4.5/5 Customer Rating</span>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20 space-y-12">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <ServiceFeatures />
        </div>

        <div className="space-y-12">
          <div className="bg-white p-0 rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            <LaundryService />
          </div>
          <div className="bg-white p-0 rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            <LaundryStatus />
          </div>
          <div className="bg-white p-0 rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            <CustomerSupport />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <Services />
        </div>
      </div>

      <div className="text-center mt-12 bg-white py-12 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
          How it Works
        </h2>
        <p className="text-slate-500 mt-4 text-lg">Simple steps to get your laundry done</p>
      </div>

      {/* Enhanced Feature Rows */}
      <section className="container mx-auto px-4 py-12 space-y-24">
        <FeatureLeft
          title="FLEXIBLE SCHEDULING"
          subtitle="1. Schedule Your Collection"
          description="Plan your day with ease. Choose a collection time that fits your schedule. We’ll notify you when the order is ready for pick-up, ensuring smooth coordination."
          imageSrc={card1}
          bulletPoints={bulletPoints1}
        />
        <FeatureRight
          title="REAL-TIME TRACKING"
          subtitle="2. Track Your Delivery"
          description="Stay informed about your laundry delivery with real-time tracking. Know exactly when your laundry will arrive at your doorstep, making it easy to plan your day."
          imageSrc={card2}
          bulletPoints={bulletPoints2}
        />
        <FeatureLeft
          title="24/7 SUPPORT"
          subtitle="3. Assistance When You Need It"
          description="We're here to help! Whether you have a question about your order or need assistance with our services, our customer support is always ready to assist you."
          imageSrc={card3}
          bulletPoints={bulletPoints3}
        />
        <FeatureRight
          title="HASSLE-FREE DELIVERY"
          subtitle="4. Order Scheduled and Delivered"
          description="Your laundry is handled with care from pick-up to delivery. Enjoy your freshly cleaned clothes delivered right to your door, hassle-free!"
          imageSrc={card4}
          bulletPoints={bulletPoints4}
        />
      </section>

      <div className="bg-gray-50 py-20">
        <CustomerReviews />
      </div>

      <AndesAssured />
      <Future />
      <BookNow />
      <TeamSection />

      <section className="py-20">
        <Appsupport />
      </section>

      <FAQ />
    </div>
  );
};

export default LandingPage;
