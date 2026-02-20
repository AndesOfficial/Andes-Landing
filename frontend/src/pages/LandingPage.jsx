import { Link, useNavigate } from "react-router-dom";
import van from "../assets/van-removebg-preview.png";
import Services from "../components/Services.jsx";
import CustomerReviews from "../components/CustomerReview.jsx";
import BookNow from "../components/BookNow.jsx";
import ServiceFeatures from "../components/ServiceFeatures.jsx";
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
import PrimaryElement from "../assets/PrimaryElement.png";
import wash_iron from "../assets/wash_iron.jpg";
import Decorativeele from "../assets/Decorativeele.png";

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
          <motion.div className="w-full flex flex-col items-center justify-center text-center relative z-20 py-10 lg:py-20" variants={containerVariants} initial="hidden" animate="visible">

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/10 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>

            {/* Floating Parallax Images */}

            {/* Top Left Floating Image */}
            <motion.div
              className="absolute z-10 top-[0%] lg:top-[10%] left-[2%] lg:left-[5%] w-[25%] sm:w-[20%] lg:w-[15%] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-slate-900/5 hidden sm:block"
              animate={{ y: [0, 15, 0], rotate: [-5, -2, -5] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 0.5 }}
            >
              <img src={PrimaryElement} alt="Laundry Service" className="w-full h-full object-cover" />
            </motion.div>

            {/* Top Right Floating Image */}
            <motion.div
              className="absolute z-10 top-[5%] lg:top-[12%] right-[2%] lg:right-[8%] w-[20%] sm:w-[15%] lg:w-[12%] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-slate-900/5 hidden sm:block"
              animate={{ y: [0, 20, 0], rotate: [5, 2, 5] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
            >
              <img src={wash_iron} alt="Ironing Support" className="w-full h-full object-cover" />
            </motion.div>

            {/* Bottom Left Floating Decorative Element */}
            <motion.div
              className="absolute z-10 bottom-[15%] lg:bottom-[20%] left-[5%] lg:left-[12%] w-[15%] sm:w-[12%] lg:w-[10%] rounded-[1.5rem] overflow-hidden shadow-xl ring-1 ring-slate-900/5 hidden sm:block"
              animate={{ y: [0, -15, 0], rotate: [-10, -5, -10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
            >
              <img src={Decorativeele} alt="Decorative Bubble" className="w-full h-full object-cover" />
            </motion.div>

            {/* Bottom Right Floating Image */}
            <motion.div
              className="absolute z-10 bottom-[10%] lg:bottom-[15%] right-[5%] lg:right-[15%] w-[25%] sm:w-[18%] lg:w-[14%] rounded-[2rem] overflow-hidden shadow-xl ring-1 ring-slate-900/5 hidden sm:block delay-75"
              animate={{ y: [0, -10, 0], rotate: [2, 5, 2] }}
              transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 1.5 }}
            >
              <img src={card2} alt="Delivery Element" className="w-full h-full object-cover" />
            </motion.div>

            {/* Central Text Content */}
            <motion.div className="w-full max-w-4xl z-30 flex flex-col items-center mt-[-2rem] sm:mt-0" variants={itemVariants}>
              <h1 className="text-white text-4xl sm:text-5xl md:text-[clamp(3.5rem,5vw,5.5rem)] font-black tracking-tighter leading-[1.1] sm:leading-[1.05] mb-4 sm:mb-6 uppercase drop-shadow-sm px-2">
                Effortless<br />Laundry<br />Care<br />
                <span className="bg-yellow-400 text-slate-900 px-4 sm:px-6 py-2 rounded-2xl sm:rounded-[2rem] inline-block mt-2 sm:mt-3 shadow-lg">ANYTIME</span>
              </h1>

              {/* Subheading */}
              <p className="text-white/90 text-base sm:text-lg lg:text-xl font-medium mb-8 sm:mb-10 max-w-2xl px-4">
                Experience the ultimate convenience with reliable laundry services tailored to fit your busy lifestyle. Now in Pune.
              </p>

              {/* New Order & Download Actions */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center max-w-lg mx-auto relative z-40 px-4 sm:px-0">
                <Link to="/order" className="w-full sm:w-1/2 flex justify-center">
                  <button className="w-full h-14 sm:h-16 bg-yellow-400 text-slate-900 font-black tracking-tight uppercase px-4 sm:px-6 rounded-xl sm:rounded-2xl shadow-[0_8px_30px_rgb(250,204,21,0.4)] hover:scale-105 hover:bg-yellow-300 transition-all duration-300 text-base sm:text-lg flex items-center justify-center gap-2">
                    Schedule Pickup
                  </button>
                </Link>
                <Link to="/services" className="w-full sm:w-1/2 flex justify-center">
                  <button className="w-full h-14 sm:h-16 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold uppercase px-4 sm:px-6 rounded-xl sm:rounded-2xl hover:bg-white/20 hover:border-white transition-all duration-300 text-base sm:text-lg whitespace-nowrap">
                    View Pricing
                  </button>
                </Link>
              </div>

              {/* Floating Badges (Desktop Only) */}
              <div className="hidden md:flex relative w-full max-w-2xl mt-16 justify-between px-4 sm:px-0">
                {/* Trust Badge */}
                <motion.div
                  className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-2xl border border-white/60 z-40 flex items-center gap-3 sm:gap-4"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                >
                  <div className="bg-green-50 p-2 sm:p-3 rounded-full text-green-500">
                    <FaStar className="text-lg sm:text-xl" />
                  </div>
                  <div className="text-left text-slate-800">
                    <p className="font-bold text-sm sm:text-base leading-tight">4.8+ <FaStar className="inline text-yellow-500 -mt-1 mb-[2px]" /> Rating</p>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Satisfied Customers</p>
                  </div>
                </motion.div>

                {/* Delivery Badge */}
                <motion.div
                  className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-2xl border border-white/60 z-40 flex items-center gap-2 sm:gap-3"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1.5 }}
                >
                  <div className="bg-yellow-50 p-2 sm:p-3 rounded-full text-yellow-500">
                    <FaBolt className="text-lg sm:text-xl" />
                  </div>
                  <div className="text-left text-slate-800">
                    <p className="font-bold text-sm sm:text-base leading-tight">24hr Turnaround</p>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Express delivery</p>
                  </div>
                </motion.div>
              </div>

              {/* Download App Link */}
              <div className="mt-12 md:mt-8 flex flex-col items-center opacity-90 hover:opacity-100 transition-opacity">
                <p className="text-sm text-white/80 mb-2 font-medium">Get the full experience</p>
                <Link to="/download" className="flex items-center gap-2 text-xl text-yellow-300 font-extrabold hover:text-yellow-200 group">
                  Download App <FaBolt className="text-lg group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </motion.div>
          </motion.div>
        </main>
      </div>

      <div className="py-10 md:py-20 lg:py-24">
        <AppPromo />
      </div>

      <section className="py-10 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <ServiceFeatures />
        </div>
      </section>

      {/* Services Section */}
      <div className="bg-slate-50 py-10 md:py-24">
        <div className="container mx-auto px-4">
          <Services />
        </div>
      </div>

      {/* 3 Feature Blocks (2 Top, 1 Bottom) */}
      <section className="bg-white py-10 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 space-y-16">
          <FeatureRight
            title="A laundry service designed for you"
            description=""
            bulletPoints={[
              "Never wait around for laundry again with our reliable drivers",
              "Track your order status and ETA directly from the Andes web app",
              "Access your service history and easily reorder your favorite plans"
            ]}
            imageSrc={card3}
          />
          <FeatureRight
            title="Transparent, affordable pricing"
            description=""
            bulletPoints={[
              "No hidden fees or surprise charges. What you see is exactly what you pay",
              "Enjoy premium cleaning quality at highly competitive, straightforward rates",
              "Flexible pricing tiers available for delicate items and specialized dry cleaning"
            ]}
            imageSrc={card2}
          />
          <FeatureLeft
            title="Guaranteed 24h turnaround"
            description=""
            bulletPoints={[
              "Next-day delivery, making sure you always have fresh clothes ready to wear",
              "Rapid processing without ever compromising on our rigorous cleaning quality",
              "Receive instant notifications the moment your cleanly folded laundry arrives"
            ]}
            imageSrc={card1}
          />
        </div>
      </section>

      <div className="bg-slate-50 py-10 md:py-24">
        <CustomerReviews />
      </div>

      <section className="bg-white py-10 md:py-24">
        <div className="container mx-auto px-4">
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