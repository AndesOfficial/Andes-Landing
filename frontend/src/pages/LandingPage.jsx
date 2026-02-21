import { Link, useNavigate } from "react-router-dom";
import Services from "../components/Services.jsx";
import CustomerReviews from "../components/CustomerReview.jsx";
import ServiceFeatures from "../components/ServiceFeatures.jsx";
import AppPromo from "../components/AppPromo.jsx";
import FAQ from "../components/Faq.jsx";
import { Helmet } from "react-helmet-async";
import MobileStickyBtn from "../components/MobileStickyBtn.jsx";
import { motion } from "framer-motion";
import { FaStar, FaBolt, FaCheckCircle, FaClock, FaShieldAlt, FaTruck, FaLeaf } from "react-icons/fa";

// Assets
import PrimaryElement from "../assets/PrimaryElement.png";
import wash_iron from "../assets/wash_iron.jpg";
import Decorativeele from "../assets/Decorativeele.png";
import card1 from "../assets/card1.png";
import card2 from "../assets/card2.png";
import card3 from "../assets/card3.png";

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

const ScrollReveal = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-hidden font-sans selection:bg-brand selection:text-white">
      <Helmet>
        <title>Andes Laundry - Premium Laundry Care</title>
        <meta name="description" content="Experience effortless laundry care with Andes. Reliable, 24h turnaround, and eco-friendly services in Pune." />
      </Helmet>

      {/*  HERO SECTION (Massive 2-Column Premium Layout with Animations) */}
      <div className="bg-gradient-to-br from-brand via-brand to-blue-900 min-h-[100dvh] flex flex-col justify-center relative overflow-hidden pb-12 pt-28 md:pt-32 z-10">

        {/* Deep Background Glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-[150px] -z-10 mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-dark/40 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <main className="container mx-auto px-4 md:px-8 max-w-[1400px] relative z-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

          {/* LEFT COLUMN: Powerful Typography & CTAs */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-30 pt-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-yellow-300 flex items-center justify-center lg:justify-start gap-2 font-extrabold tracking-widest uppercase text-sm md:text-base mb-4 drop-shadow-md"
            >
              <FaStar className="text-lg" /> Now in Pune
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-white text-4xl sm:text-5xl md:text-[clamp(4rem,6vw,6.5rem)] font-black tracking-tighter leading-[1.05] mb-6 drop-shadow-lg text-center lg:text-left"
            >
              Effortless <br className="hidden sm:block" /> Laundry Care <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-slate-900 px-4 sm:px-8 py-2 md:py-3 rounded-xl sm:rounded-[2rem] inline-block mt-3 shadow-xl drop-shadow-[0_4px_10px_rgba(250,204,21,0.3)]">
                ANYTIME
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-blue-50 text-lg md:text-xl lg:text-2xl font-medium mb-10 max-w-xl leading-relaxed opacity-95 text-center lg:text-left px-4 lg:px-0"
            >
              Experience the ultimate convenience with reliable, premium laundry services tailored perfectly to fit your busy lifestyle.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-5 w-full max-w-md items-center justify-center lg:justify-start mx-auto lg:mx-0"
            >
              <Link to="/order" className="w-full sm:w-3/5">
                <button className="w-full h-14 md:h-16 bg-yellow-400 text-slate-900 font-black tracking-wide uppercase rounded-xl md:rounded-2xl shadow-[0_10px_40px_rgba(250,204,21,0.4)] hover:-translate-y-1 hover:bg-yellow-300 transition-all duration-300 text-base md:text-lg flex items-center justify-center gap-2 group relative overflow-hidden">
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-[shine_1s_ease-in-out]" />
                  Schedule Pickup
                </button>
              </Link>
              <Link to="/services" className="w-full sm:w-2/5">
                <button className="w-full h-14 md:h-16 bg-white/10 backdrop-blur-lg border border-white/30 text-white font-bold uppercase rounded-xl md:rounded-2xl hover:bg-white/20 hover:border-white hover:-translate-y-1 transition-all duration-300 text-base md:text-lg shadow-xl">
                  View Pricing
                </button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-12 flex flex-col sm:flex-row items-center sm:items-center gap-6 sm:gap-4 opacity-100 sm:opacity-90 hover:opacity-100 transition-opacity w-full lg:justify-start justify-center text-center lg:text-left mx-auto lg:mx-0"
            >
              <div className="flex items-center justify-center sm:justify-start gap-4">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-brand bg-blue-200"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-brand bg-blue-300"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-brand bg-blue-400"></div>
                </div>
                <p className="text-xs text-blue-100 font-medium tracking-wide">Trusted by<br className="hidden sm:block" /> 10,000+ users</p>
              </div>
              <div className="flex flex-col w-full sm:w-auto">
                <Link to="/download" className="flex items-center justify-center sm:justify-start gap-2 text-xl sm:text-2xl md:text-3xl text-yellow-400 font-black hover:text-yellow-300 transition-colors group bg-white/10 px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/20 backdrop-blur-md shadow-lg w-full">
                  Download App <FaBolt className="text-lg sm:text-xl group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: MASSIVE FOCAL IMAGE WITH PARALLAX */}
          <motion.div
            className="w-full lg:w-1/2 relative z-30 flex justify-center lg:justify-end mt-12 lg:-mt-16 xl:-mt-24"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >

            {/* The Main Huge Image Container */}
            <div className="relative w-[85%] sm:w-full max-w-[350px] sm:max-w-[450px] lg:max-w-[550px] max-h-[60vh] sm:max-h-[70vh] lg:max-h-[65vh] xl:max-h-[70vh] aspect-[4/5] group mt-4 sm:mt-0">
              {/* Backglow for the image */}
              <div className="absolute inset-0 bg-yellow-400 rounded-[3rem] rotate-3 opacity-20 blur-2xl group-hover:rotate-6 group-hover:opacity-30 transition-all duration-700"></div>

              {/* Massive Main Image (Cinematic Slow Zoom) */}
              <motion.div
                className="w-full h-full overflow-hidden rounded-[3rem] shadow-2xl border-4 border-white/20 relative z-10"
              >
                <motion.img
                  src={PrimaryElement}
                  alt="Premium Laundry Care"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </motion.div>

              {/* OVERLAPPING BENTO BADGE 1: Rating (Floating) */}
              <motion.div
                className="absolute -bottom-4 -left-2 sm:-left-6 md:-left-12 bg-white/95 backdrop-blur-xl p-3 sm:p-5 rounded-xl sm:rounded-2xl shadow-2xl border border-white/50 z-40 flex items-center gap-3 sm:gap-4 w-max"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: [0, -10, 0], opacity: 1 }}
                transition={{
                  y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                  opacity: { delay: 0.8, duration: 0.5 }
                }}
              >
                <div className="bg-green-100 p-2 sm:p-3.5 rounded-lg sm:rounded-xl text-green-600 shadow-inner">
                  <FaStar className="text-xl sm:text-2xl" />
                </div>
                <div className="text-left text-slate-800">
                  <p className="font-black text-lg sm:text-xl leading-tight flex items-center gap-1">4.8/5</p>
                  <p className="text-[10px] sm:text-sm text-slate-500 font-bold uppercase tracking-wider">Top Rated</p>
                </div>
              </motion.div>

              {/* OVERLAPPING BENTO BADGE 2: 24h Turnaround (Floating) */}
              <motion.div
                className="absolute top-6 -right-2 sm:-right-4 md:-right-10 bg-white/95 backdrop-blur-xl p-3 sm:p-5 rounded-xl sm:rounded-2xl shadow-2xl border border-white/50 z-40 flex items-center gap-3 sm:gap-4 w-max"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: [0, 10, 0], opacity: 1 }}
                transition={{
                  y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 },
                  opacity: { delay: 1, duration: 0.5 }
                }}
              >
                <div className="bg-yellow-100 p-2 sm:p-3.5 rounded-lg sm:rounded-xl text-yellow-600 shadow-inner">
                  <FaClock className="text-xl sm:text-2xl" />
                </div>
                <div className="text-left text-slate-800">
                  <p className="font-black text-lg sm:text-xl leading-tight">24 Hours</p>
                  <p className="text-[10px] sm:text-sm text-slate-500 font-bold uppercase tracking-wider">Turnaround</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </main>
      </div>

      {/*  INFINITE SCROLLING TICKER */}
      <div className="bg-brand py-3 overflow-hidden border-y border-white/10 flex relative whitespace-nowrap z-30">
        <motion.div
          className="flex gap-10 items-center text-blue-100 font-bold uppercase tracking-widest text-sm"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-10 items-center">
              <span className="flex items-center gap-2"><FaStar className="text-yellow-400 text-lg" /> Premium Care</span>
              <span className="text-yellow-400">•</span>
              <span className="flex items-center gap-2"><FaBolt className="text-yellow-400 text-lg" /> 24h Turnaround</span>
              <span className="text-yellow-400">•</span>
              <span className="flex items-center gap-2"><FaTruck className="text-yellow-400 text-lg" /> Free Pickup & Delivery</span>
              <span className="text-yellow-400">•</span>
              <span className="flex items-center gap-2"><FaLeaf className="text-yellow-400 text-lg" /> Eco-Friendly Detergents</span>
              <span className="text-yellow-400">•</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/*  HIGHLIGHTED PROMO */}
      <div className="py-8 md:py-12 bg-slate-50 relative z-20">
        <ScrollReveal>
          <AppPromo />
        </ScrollReveal>
      </div>

      {/*  PREMIUM SERVICE FEATURES (Icons) - Pulled up with negative margin */}
      <section className="py-10 md:py-16 bg-white relative -mt-8 rounded-t-[2.5rem] z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        <ScrollReveal>
          <div className="container mx-auto px-4 max-w-7xl">
            <ServiceFeatures />
          </div>
        </ScrollReveal>
      </section>

      {/*  EXPLORE SERVICES */}
      <div className="bg-slate-50 py-12 md:py-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat relative z-20 -mt-12 pt-24 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <ScrollReveal>
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Exceptional Care for Your Garments</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">We treat every fabric with the specialized attention it deserves.</p>
            </div>
            <Services />
          </div>
        </ScrollReveal>
      </div>

      {/* 🌟 BENTO BOX GRID (Replacing bulky FeatureLeft/FeatureRight sections) */}
      <section className="bg-white py-12 md:py-20 relative -mt-10 rounded-t-[3rem] z-30 shadow-[0_-15px_40px_rgba(0,0,0,0.03)]">
        <ScrollReveal>
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <span className="text-brand font-bold uppercase tracking-widest text-sm mb-2 block">The Andes Advantage</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Laundry Made Simple</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">Experience a seamlessly optimized process from pickup to fresh delivery.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

              {/* Top Left Card */}
              <div className="bg-blue-50/50 rounded-[2rem] p-8 md:p-10 border border-blue-100 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-6 text-brand">
                    <FaShieldAlt className="text-2xl" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">A service designed completely for you</h3>
                  <ul className="space-y-4 text-slate-600 font-medium">
                    <li className="flex items-start gap-3"><FaCheckCircle className="text-brand mt-1 flex-shrink-0" /> Track order status and ETA via our app</li>
                    <li className="flex items-start gap-3"><FaCheckCircle className="text-brand mt-1 flex-shrink-0" /> Never wait around with our reliable drivers</li>
                    <li className="flex items-start gap-3"><FaCheckCircle className="text-brand mt-1 flex-shrink-0" /> Access service history & easily reorder</li>
                  </ul>
                </div>
                <img src={card3} alt="App Interface" className="absolute -bottom-16 -right-16 w-64 opacity-30 group-hover:scale-105 transition-transform duration-700" />
              </div>

              {/* Top Right Card */}
              <div className="bg-slate-50 rounded-[2rem] p-8 md:p-10 border border-slate-200 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-6 text-green-600">
                    <FaStar className="text-2xl" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">Transparent, <br /> affordable pricing</h3>
                  <ul className="space-y-4 text-slate-600 font-medium">
                    <li className="flex items-start gap-3"><FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" /> No hidden fees or surprise charges</li>
                    <li className="flex items-start gap-3"><FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" /> Premium cleaning at highly competitive rates</li>
                    <li className="flex items-start gap-3"><FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" /> Flexible pricing for specialized dry cleaning</li>
                  </ul>
                </div>
                <img src={card2} alt="Box" className="absolute -bottom-12 -right-12 w-56 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 mix-blend-multiply" />
              </div>

              {/* Bottom Full-Width Card */}
              <div className="bg-brand rounded-[2rem] p-8 md:p-12 shadow-2xl lg:col-span-2 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-white/10 to-transparent"></div>

                <div className="relative z-10 md:w-3/5 text-white">
                  <div className="bg-white/20 backdrop-blur-md w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-yellow-300">
                    <FaClock className="text-2xl" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black mb-4 leading-tight">Guaranteed 24h turnaround</h3>
                  <p className="text-blue-50 text-lg mb-6 opacity-90">Next-day delivery ensuring you always have fresh clothes ready to wear, without compromising our rigorous cleaning quality.</p>
                  <div className="flex flex-col sm:flex-row gap-4 font-bold text-sm tracking-wide uppercase">
                    <span className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-xl"><FaCheckCircle className="text-yellow-400" /> Rapid Processing</span>
                    <span className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-xl"><FaCheckCircle className="text-yellow-400" /> Instant Notifications</span>
                  </div>
                </div>

                <div className="relative z-10 md:w-2/5 flex justify-center mt-8 md:mt-0">
                  <div className="relative w-full max-w-[280px] group-hover:-translate-y-2 transition-transform duration-500">
                    <div className="absolute inset-0 bg-yellow-400 rounded-[2rem] rotate-3 opacity-30 blur-lg"></div>
                    <img src={card1} alt="Delivery Card" className="relative rounded-[2rem] shadow-2xl border-4 border-white/20" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 🌟 CUSTOMER INSIGHTS */}
      <div className="bg-slate-50 py-12 md:py-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat relative z-20 -mt-12 pt-24 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <ScrollReveal>
          <CustomerReviews />
        </ScrollReveal>
      </div>

      {/*  FAQ */}
      <section className="bg-white py-12 md:py-20 relative z-30 -mt-10 rounded-t-[3rem] shadow-[0_-15px_40px_rgba(0,0,0,0.03)]">
        <ScrollReveal>
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-10">
              <span className="bg-brand/10 text-brand font-extrabold px-4 py-1.5 rounded-full text-sm tracking-wide uppercase mb-4 inline-block">Support</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
              <p className="text-lg text-slate-600 font-medium">Quick answers for peace of mind. Find out how we operate.</p>
            </div>
            <FAQ />
          </div>
        </ScrollReveal>
      </section>

      <MobileStickyBtn />
    </div>
  );
};

export default LandingPage;