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
import { FaStar, FaStarHalfAlt, FaBell, FaClock, FaBox, FaDoorOpen, FaHeadset, FaCommentDots, FaCheck, FaBolt, FaMoon, FaChevronRight } from "react-icons/fa";
import Appsupport from "../components/Appsupport.jsx";
import FAQ from "../components/Faq.jsx";
import { Helmet } from "react-helmet-async";

const bulletPoints1 = [
  { icon: <FaBell className="text-brand-blue text-xl" />, text: "Get notified when your order is ready for pick-up" },
  { icon: <FaClock className="text-brand-blue text-xl" />, text: "Schedule collection at your convenience" },
];

const bulletPoints2 = [
  { icon: <FaBox className="text-brand-blue text-xl" />, text: "Track your delivery in real-time" },
  { icon: <FaDoorOpen className="text-brand-blue text-xl" />, text: "Know exactly when your laundry will arrive" },
];

const bulletPoints3 = [
  { icon: <FaHeadset className="text-brand-blue text-xl" />, text: "24/7 customer support available" },
  { icon: <FaCommentDots className="text-brand-blue text-xl" />, text: "Reach us via call or chat in the app" },
];

const bulletPoints4 = [
  { icon: <FaCheck className="text-brand-blue text-xl" />, text: "Order scheduled and delivered promptly" },
  { icon: <FaBox className="text-brand-blue text-xl" />, text: "Enjoy freshly cleaned clothes at your doorstep" },
];

const LandingPage = () => {
  return (
    <div className="overflow-x-hidden">
      <Helmet>
        <title>Andes Laundry - Home</title>
        <meta name="description" content="Welcome to Andes Laundry, your trusted laundry partner in Pune." />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-brand-blue min-h-screen flex flex-col justify-center relative overflow-hidden pb-16 pt-32 md:pt-40">

        <main className="container mx-auto px-4 flex flex-col lg:flex-row items-center relative z-10 gap-12 lg:gap-8">
          {/* Left Content - Text & Widget */}
          <div className="w-full lg:w-1/2 text-white z-20">
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                Laundry & dry <br /> cleaning with <br /> 24h delivery
              </h1>

              {/* Location - Just Yellow Text */}
              <div className="flex items-baseline gap-3">
                <h2 className="text-yellow-400 font-bold text-3xl md:text-5xl tracking-wide">
                  Kothrud, Pune
                </h2>
              </div>
            </div>



            {/* Scheduling Widget Mockup */}
            <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-md border border-slate-100">
              <h3 className="text-slate-800 font-semibold mb-4 text-lg">Schedule your collection in <span className="text-brand-blue">Pune</span></h3>

              <div className="space-y-3">
                <div className="border border-gray-100 bg-gray-50/50 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-brand-blue hover:bg-white transition-all group">
                  <div className="flex items-center gap-4">
                    <FaBolt className="text-xl text-yellow-400" />
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Earliest</p>
                      <p className="text-slate-800 font-bold text-lg group-hover:text-brand-blue transition-colors">12:00 - 15:00</p>
                    </div>
                  </div>
                  <FaChevronRight className="text-gray-300 font-bold text-lg group-hover:text-brand-blue" />
                </div>

                <div className="border border-gray-100 bg-gray-50/50 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-brand-blue hover:bg-white transition-all group">
                  <div className="flex items-center gap-4">
                    <FaMoon className="text-xl text-slate-400" />
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Last</p>
                      <p className="text-slate-800 font-bold text-lg group-hover:text-brand-blue transition-colors">20:00 - 23:00</p>
                    </div>
                  </div>
                  <FaChevronRight className="text-gray-300 font-bold text-lg group-hover:text-brand-blue" />
                </div>
              </div>

              <div className="mt-5 text-center">
                <a href="#" className="text-brand-blue text-sm font-bold hover:underline">See all slots</a>
              </div>
            </div>
          </div>

          {/* Right Content - Image with Blob */}
          <div className="w-full lg:w-1/2 flex justify-center relative mt-12 lg:mt-0">
            {/* Blob Background */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-white/20 rounded-full blur-xl -z-10"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-400/30 rounded-full blur-2xl -z-20"></div>

            <div className="relative w-full max-w-lg lg:max-w-xl aspect-square flex items-center justify-center">
              <img
                src={van}
                alt="Andes Laundry Van"
                className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </main>
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
