import { Link, useNavigate } from "react-router-dom";
import van from "../assets/van-removebg-preview.png";
import Services from "../components/Services.jsx";
import CustomerReviews from "../components/CustomerReview.jsx";
import BookNow from "../components/BookNow.jsx";
import ServiceFeatures from "../components/ServiceFeatures.jsx";
import WhoWeAre from "../components/WhoWeAre.jsx";
import AppPromo from "../components/AppPromo.jsx";
import FAQ from "../components/Faq.jsx";
import { Helmet } from "react-helmet-async";
import MobileStickyBtn from "../components/MobileStickyBtn.jsx";
import { motion } from "framer-motion";
import { FaStar, FaBolt, FaShoppingBasket, FaMagic, FaTruck, FaClock, FaHeadset, FaLifeRing } from "react-icons/fa";
import FeatureLeft from "../components/FeatureLeft.jsx";
import FeatureRight from "../components/FeatureRight.jsx";
import card1 from "../assets/card1.png";
import card2 from "../assets/card2.png";
import card3 from "../assets/card3.png";

const bulletPoints1 = [
  { icon: <FaShoppingBasket />, text: "We offer laundry, dry cleaning, and ironing at a schedule that fits your lifestyle." },
  { icon: <FaMagic />, text: "Never worry about staining your favorite shirt again." },
];

const bulletPoints2 = [
  { icon: <FaTruck />, text: "Schedule a Collection Today, book a slot that works for you in seconds." },
  { icon: <FaClock />, text: "Get it Back in 24h. Fast, reliable turnaround for your clean clothes." },
];

const bulletPoints3 = [
  { icon: <FaHeadset />, text: "Anytime Assistance. Reach out to us anytime for order updates or queries." },
  { icon: <FaLifeRing />, text: "Available 24/7. Our support team is always ready to resolve your issues." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-hidden">
      <Helmet>
        <title>Andes Laundry - Home</title>
        <meta name="description" content="Welcome to Andes Laundry, your trusted laundry partner in Pune." />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-brand min-h-[100dvh] flex flex-col justify-center relative overflow-hidden pb-12 pt-24 md:pt-32">
        <main className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16" variants={containerVariants} initial="hidden" animate="visible">

            {/* Left Content - Text & Widget */}
            <div className="w-full lg:w-3/5 text-white z-20 flex flex-col items-start text-left lg:pl-4">
              <motion.div className="mb-6 w-full" variants={itemVariants}>
                <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-bold tracking-tight leading-[1.1] mb-4">
                  Laundry & Dry Cleaning <br /> within 24h
                </h1>

                {/* Location */}
                <p className="text-yellow-400 text-2xl font-bold mb-8 flex items-center gap-2">
                  Pune, India - Now in Pune
                </p>

                {/* New Order & Download Actions */}
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                  <Link to="/order" className="w-full">
                    <button className="w-full bg-yellow-400 text-slate-900 font-extrabold px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.6)] hover:scale-105 hover:bg-yellow-300 transition-all duration-300 text-xl flex items-center justify-center gap-2">
                      Book Now
                    </button>
                  </Link>
                  <Link to="/order" className="w-full">
                    <button className="w-full bg-transparent border-2 border-white/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 hover:border-white transition-all duration-300 text-xl whitespace-nowrap">
                      Order Now
                    </button>
                  </Link>
                </div>

                {/* Download App Link */}
                <div className="mt-8 flex flex-col items-start opacity-90 hover:opacity-100 transition-opacity">
                  <p className="text-base text-white/80 mb-2 font-medium">Get the full experience</p>
                  <Link to="/download" className="flex items-center gap-3 text-2xl text-yellow-300 font-extrabold hover:text-yellow-200 group">
                    Download App <FaBolt className="text-xl group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Content - Image with Blob */}
            <motion.div className="w-full lg:w-1/2 flex justify-center relative mt-12 lg:mt-0" variants={itemVariants}>
              <div className="relative w-full max-w-lg lg:max-w-xl aspect-square flex items-center justify-center group perspective-1000">
                <img src={van} alt="Andes Laundry Van" style={{ maskImage: 'radial-gradient(circle, black 50%, transparent 100%)', WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 100%)', mixBlendMode: 'lighten' }} />

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
            </motion.div>
          </motion.div>
        </main>
      </div>

      <AppPromo />

      <section className="bg-white">
        <WhoWeAre />
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <ServiceFeatures />
        </div>
      </section>

      {/* Services Section */}
      <div className="bg-slate-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <Services />
        </div>
      </div>

      {/* 3 Feature Blocks (2 Top, 1 Bottom) */}
      <section className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8 lg:mb-12">
            <FeatureLeft
              title="Freedom From Laundry"
              subtitle="A laundry service designed for you"
              description=""
              imageSrc={card1}
              bulletPoints={bulletPoints1}
            />
            <FeatureRight
              title="24h Turnaround Time"
              subtitle="No need to plan in advance"
              description=""
              imageSrc={card2}
              bulletPoints={bulletPoints2}
            />
          </div>

          <div className="max-w-4xl mx-auto">
            <FeatureLeft
              title="24h Customer Support"
              subtitle="We're here to help you"
              description=""
              imageSrc={card3}
              bulletPoints={bulletPoints3}
            />
          </div>
        </div>
      </section>

      <div className="bg-slate-50 py-12 md:py-20">
        <CustomerReviews />
      </div>

      <section className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600">Have questions? We're here to help.</p>
          </div>
          <FAQ />
        </div>
      </section>

      <MobileStickyBtn />
    </div>
  );
};

export default LandingPage;