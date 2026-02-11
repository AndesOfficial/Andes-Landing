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
import MobileStickyBtn from "../components/MobileStickyBtn.jsx";

const bulletPoints1 = [
  { icon: <FaBell className="text-brand text-xl" />, text: "Get notified when your order is ready for pick-up" },
  { icon: <FaClock className="text-brand text-xl" />, text: "Schedule collection at your convenience" },
];

const bulletPoints2 = [
  { icon: <FaBox className="text-brand text-xl" />, text: "Track your delivery in real-time" },
  { icon: <FaDoorOpen className="text-brand text-xl" />, text: "Know exactly when your laundry will arrive" },
];

const bulletPoints3 = [
  { icon: <FaHeadset className="text-brand text-xl" />, text: "24/7 customer support available" },
  { icon: <FaCommentDots className="text-brand text-xl" />, text: "Reach us via call or chat in the app" },
];

const bulletPoints4 = [
  { icon: <FaCheck className="text-brand text-xl" />, text: "Order scheduled and delivered promptly" },
  { icon: <FaBox className="text-brand text-xl" />, text: "Enjoy freshly cleaned clothes at your doorstep" },
];

const LandingPage = () => {
  return (
    <div className="overflow-x-hidden">
      <Helmet>
        <title>Andes Laundry - Home</title>
        <meta name="description" content="Welcome to Andes Laundry, your trusted laundry partner in Pune." />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-brand min-h-[85vh] flex flex-col justify-center relative overflow-hidden pb-12 pt-20 md:pt-32">
        <main className="container mx-auto px-4 max-w-7xl flex flex-col lg:flex-row items-center relative z-10 gap-8 lg:gap-16">
          {/* Left Content - Text & Widget */}
          <div className="w-full lg:w-3/5 text-white z-20 flex flex-col items-start text-left lg:pl-4">
            <div className="mb-6 w-full">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                Laundry & dry <br /> cleaning with <br /> 24h delivery
              </h1>

              {/* Location */}
              <div className="flex items-baseline gap-3">
                <h2 className="text-yellow-300 font-bold text-3xl md:text-4xl tracking-wide">
                  Pune, India
                </h2>
              </div>
            </div>

            {/* Store links */}
            <div className="flex flex-row gap-4 mb-10">
              <a
                href="https://play.google.com/store/apps/details?id=com.andes.laundry"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-white text-black px-4 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <img src={playstore} alt="Play Store" className="w-6 h-6" />
                <div className="ml-3 text-left">
                  <p className="text-[10px] text-gray-600 font-medium leading-none mb-1">Get it on</p>
                  <p className="text-sm font-bold leading-none">Google Play</p>
                </div>
              </a>

              <a
                href="https://apps.apple.com/in/app/andes/id6747010488"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-white text-black px-4 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <img src={appstore} alt="App Store" className="w-6 h-6" />
                <div className="ml-3 text-left">
                  <p className="text-[10px] text-gray-600 font-medium leading-none mb-1">Download on the</p>
                  <p className="text-sm font-bold leading-none">App Store</p>
                </div>
              </a>
            </div>

            {/* Scheduling Widget Mockup */}
            <div className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-xl border border-white/20 backdrop-blur-sm">
              <h3 className="text-slate-800 font-semibold mb-4 text-lg">Schedule your collection in <span className="text-brand">Pune</span></h3>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 w-full border border-gray-100 bg-gray-50/50 rounded-2xl p-3 flex items-center justify-between cursor-pointer hover:border-brand hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out group">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <FaBolt className="text-lg text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-brand-dark font-bold uppercase tracking-wider mb-0.5">Earliest</p>
                      <p className="text-slate-800 font-bold text-base group-hover:text-brand transition-colors ease-in-out duration-300">12:00 - 15:00</p>
                    </div>
                  </div>
                  <FaChevronRight className="text-gray-300 font-bold text-sm group-hover:text-brand" />
                </div>

                <div className="flex-1 w-full border border-gray-100 bg-gray-50/50 rounded-2xl p-3 flex items-center justify-between cursor-pointer hover:border-brand hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out group">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-full">
                      <FaMoon className="text-lg text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-brand-dark font-bold uppercase tracking-wider mb-0.5">Last</p>
                      <p className="text-slate-800 font-bold text-base group-hover:text-brand transition-colors ease-in-out duration-300">20:00 - 23:00</p>
                    </div>
                  </div>
                  <FaChevronRight className="text-gray-300 font-bold text-sm group-hover:text-brand" />
                </div>
              </div>

              <div className="mt-4 text-center">
                <a href="#" className="text-brand font-bold text-sm hover:underline hover:text-brand-dark transition-colors duration-300 ease-in-out">See all slots</a>
              </div>
            </div>
          </div>

          {/* Right Content - Image with Blob */}
          <div className="w-full lg:w-1/2 flex justify-center relative mt-12 lg:mt-0">
            {/* Blob Backgrounds */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-brand/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-blue-400/10 rounded-full blur-2xl -z-20"></div>

            <div className="relative w-full max-w-lg lg:max-w-xl aspect-square flex items-center justify-center group perspective-1000">
              <img
                src={van}
                alt="Andes Laundry Van"
                className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 relative z-10"
              />

              {/* Floating Trust Badge */}
              <div className="absolute -bottom-6 -right-4 lg:bottom-12 lg:right-4 bg-white p-4 rounded-2xl shadow-brand-soft border border-white/60 backdrop-blur-md animate-bounce-slow z-20 flex items-center gap-4 hover:scale-105 transition-transform">
                <div className="bg-green-50 p-3 rounded-full text-green-500">
                  <FaStar className="text-xl" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-base leading-tight">4.5/5 Rating</p>
                  <p className="text-xs text-gray-500">Trusted by thousands</p>
                </div>
              </div>

              {/* 24h Delivery Badge */}
              <div className="absolute top-0 -left-2 lg:top-12 lg:-left-6 bg-white p-4 rounded-2xl shadow-brand-soft border border-white/60 backdrop-blur-md animate-float z-20 flex items-center gap-3 hover:scale-105 transition-transform">
                <div className="bg-yellow-50 p-3 rounded-full text-yellow-500">
                  <FaBolt className="text-xl" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-base leading-tight">24hr Turnaround</p>
                  <p className="text-xs text-gray-500">Express delivery</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <section className="container mx-auto px-4 py-12 md:py-20 space-y-8">
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
          <ServiceFeatures />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <LaundryService />
          </div>
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <LaundryStatus />
          </div>
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <CustomerSupport />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <div className="bg-slate-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <Services />
        </div>
      </div>

      {/* How it Works Section with Rounded Top */}
      <div className="bg-white rounded-t-[3rem] md:rounded-t-[5rem] -mt-12 pt-16 pb-12 relative z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <div className="text-center px-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            How it Works
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Simple steps to get your laundry done right.</p>
        </div>

        <section className="container mx-auto px-4 space-y-16 md:space-y-24">
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
      </div>

      <div className="bg-slate-50 py-12 md:py-20">
        <CustomerReviews />
      </div>

      <AndesAssured />
      <Future />
      <BookNow />
      <TeamSection />

      <section className="py-12 md:py-20">
        <Appsupport />
      </section>

      <FAQ />
      <MobileStickyBtn />
    </div>
  );
};

export default LandingPage;
