import React from "react";
import EnvironmentalFeature from "../components/EnvironmentalFeature";
import QuickCleanFresh from "../components/QuickCleanFresh";
import CustomerStories from "../components/CustomerStories";
import Schedule from "../components/Schedule";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FaBell, FaClock, FaBoxOpen, FaDoorOpen, FaPhoneAlt, FaCommentDots, FaCheckCircle, FaLeaf, FaTint, FaHeart } from "react-icons/fa";
import LaundryCalculator from "../components/LaundryCalculator.jsx";


// Assets
import AboutUsImage from "../assets/aboutus.jpeg";
import card1 from "../assets/card1.png";
import card2 from "../assets/card2.png";
import card3 from "../assets/card3.png";
import card4 from "../assets/card4.png";

// --- Premium Scroll Reveal Wrapper ---
const ScrollReveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }} // Adjusted margin for earlier trigger on mobile
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const stepsData = [
  {
    num: "01",
    title: "Schedule Your Collection",
    subtitle: "FLEXIBLE",
    img: card1,
    bullets: [
      { icon: <FaBell />, text: "Get notified when your order is ready for pick-up" },
      { icon: <FaClock />, text: "Schedule collection at your convenience" },
    ]
  },
  {
    num: "02",
    title: "Track Your Delivery",
    subtitle: "DELIVERY STATUS",
    img: card2,
    bullets: [
      { icon: <FaBoxOpen />, text: "Track your delivery in real-time" },
      { icon: <FaDoorOpen />, text: "Know exactly when your laundry will arrive" },
    ]
  },
  {
    num: "03",
    title: "Assistance When You Need It",
    subtitle: "CUSTOMER SUPPORT",
    img: card3,
    bullets: [
      { icon: <FaPhoneAlt />, text: "24/7 customer support available" },
      { icon: <FaCommentDots />, text: "Reach us via call or chat in the app" },
    ]
  },
  {
    num: "04",
    title: "Order Scheduled & Delivered",
    subtitle: "ORDER COMPLETED",
    img: card4,
    bullets: [
      { icon: <FaCheckCircle />, text: "Order scheduled and delivered promptly" },
      { icon: <FaBoxOpen />, text: "Enjoy freshly cleaned clothes at your doorstep" },
    ]
  }
];

const bulletPointsEnvironmental = [
  { icon: <FaLeaf />, text: "Zero-emission delivery vehicles" },
  { icon: <FaTint />, text: "Efficient water use" },
  { icon: <FaHeart />, text: "Trustworthy local cleaners" },
];

const Working = () => {
  return (
    <div className="bg-slate-50/50 selection:bg-brand selection:text-white font-sans overflow-x-hidden pt-20 md:pt-24">
      <Helmet>
        <title>How it Works | Andes Laundry</title>
        <meta name="description" content="Discover the simple 4-step process to effortless laundry care with Andes." />
      </Helmet>

      {/* Hero / Intro */}
      <ScrollReveal>
        <QuickCleanFresh />
      </ScrollReveal>


      <section className="py-12 md:py-28 bg-white relative">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-20">
              <span className="text-brand font-extrabold uppercase tracking-widest text-xs md:text-sm mb-3 block bg-blue-50 w-max mx-auto px-4 py-1.5 rounded-full border border-blue-100 shadow-sm">
                The Process
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight leading-tight">
                Laundry Made <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-blue-400">Simple</span>
              </h2>
              <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed px-2">
                We've streamlined the entire laundry process to give you back your free time in just four easy steps.
              </p>
            </div>
          </ScrollReveal>

          {/* Grid Layout for Steps - Gap reduced for mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
            {stepsData.map((step, index) => (
              <ScrollReveal delay={0.1} key={index}>
                <div className="bg-slate-50 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group h-full flex flex-col sm:flex-row items-center sm:items-start gap-6 md:gap-8">

                  {/* Big Background Number - Scaled down for mobile */}
                  <div className="absolute -top-4 -right-2 md:-top-6 md:-right-4 text-[5rem] sm:text-[7rem] md:text-[8rem] font-black text-slate-200/50 z-0 group-hover:scale-110 transition-transform duration-500 pointer-events-none select-none">
                    {step.num}
                  </div>

                  {/* Left: Image/Icon - Resized for mobile */}
                  <div className="relative z-10 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex-shrink-0 flex items-center justify-center bg-white rounded-2xl md:rounded-3xl shadow-md border border-slate-100 p-3 md:p-4 group-hover:rotate-3 transition-transform duration-500">
                    <img src={step.img} alt={step.title} className="w-full h-full object-contain drop-shadow-sm md:drop-shadow-md" />
                  </div>

                  {/* Right: Text Content */}
                  <div className="relative z-10 flex-1 text-center sm:text-left mt-2 sm:mt-0 w-full">
                    <span className="text-xs md:text-sm font-black text-brand tracking-widest uppercase mb-2 block bg-white/50 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none py-1 sm:py-0 rounded-md">
                      Step {step.num} — {step.subtitle}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 md:mb-5 leading-tight">
                      {step.title}
                    </h3>
                    <ul className="space-y-3 md:space-y-4">
                      {step.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start justify-center sm:justify-start gap-2 md:gap-3 text-slate-600 font-medium text-base md:text-lg text-left">
                          <div className="text-brand mt-0.5 md:mt-1 text-base md:text-lg flex-shrink-0">
                            {bullet.icon}
                          </div>
                          <span className="leading-snug">{bullet.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──── Visual Divider ──── */}
      <div className="relative z-10">
        <div className="h-8 md:h-12 bg-gradient-to-b from-white to-slate-50" />
      </div>

      {/* 💰 LAUNDRY COST CALCULATOR */}
      <section className="bg-slate-50 py-8 md:py-16 relative z-10">
        <ScrollReveal>
          <LaundryCalculator />
        </ScrollReveal>
      </section>

      {/* ──── Visual Divider ──── */}
      <div className="relative z-10">
        <div className="h-12 md:h-20 bg-gradient-to-b from-slate-50 to-slate-50" />
      </div>

      {/* Environmental Feature */}
      <section className="bg-slate-50 py-12 md:py-24">
        <ScrollReveal>
          <div className="px-4">
            <EnvironmentalFeature
              title="A CONVENIENT LAUNDRY SOLUTION"
              subtitle="That Helps Protect the Environment"
              description="Our service doesn’t just benefit you—it’s also designed with sustainability in mind. We use zero-emission vehicles for deliveries and efficient water usage to minimize environmental impact."
              bulletPoints={bulletPointsEnvironmental}
              buttonText="About us"
              imageSrc={AboutUsImage}
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Customer Stories */}
      <section className="bg-white py-12 md:py-24 border-y border-slate-100">
        <ScrollReveal>
          <CustomerStories />
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Working;