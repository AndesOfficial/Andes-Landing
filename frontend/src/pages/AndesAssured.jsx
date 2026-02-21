import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FaShieldAlt, FaUndoAlt, FaLeaf, FaUserTie, FaCheckCircle } from "react-icons/fa";

// Replace with one of your actual high-quality assets (e.g., folded clothes)
import PremiumCareImage from "../assets/PrimaryElement.png";

// --- Reusable Scroll Reveal ---
const ScrollReveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// --- The Guarantees Data ---
const assurances = [
  {
    icon: <FaShieldAlt />,
    title: "Damage Protection",
    description: "Your garments are insured. In the rare event of damage during our process, we cover the cost up to 10x the cleaning price.",
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100"
  },
  {
    icon: <FaUndoAlt />,
    title: "Free Re-wash Policy",
    description: "Not completely satisfied with a stain removal? Let us know within 24 hours and we will re-process the item entirely for free.",
    color: "text-brand",
    bg: "bg-brand/10",
    border: "border-brand/20"
  },
  {
    icon: <FaUserTie />,
    title: "Expert Handling",
    description: "Every item undergoes a rigorous 5-point inspection by our fabric specialists before and after the cleaning process.",
    color: "text-purple-500",
    bg: "bg-purple-50",
    border: "border-purple-100"
  },
  {
    icon: <FaLeaf />,
    title: "Eco-Safe Detergents",
    description: "We strictly use premium, non-toxic, and hypoallergenic cleaning agents that are tough on stains but gentle on your skin and the earth.",
    color: "text-green-500",
    bg: "bg-green-50",
    border: "border-green-100"
  }
];

const AndesAssured = () => {
  return (
    <div className="bg-slate-50/50 min-h-screen pt-24 pb-8 flex flex-col justify-center selection:bg-brand selection:text-white font-sans overflow-hidden relative">
      <Helmet>
        <title>Andes Assured | Our Guarantee</title>
        <meta name="description" content="Discover the Andes Assured guarantee. We offer damage protection, free re-washes, and expert garment care." />
      </Helmet>

      {/* Faint Background Texture */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">

        {/* HEADER SECTION */}
        <ScrollReveal>
          <div className="text-center mb-8 md:mb-12">
            <span className="text-brand font-extrabold uppercase tracking-widest text-xs md:text-sm mb-3 block bg-blue-50 w-max mx-auto px-5 py-1.5 rounded-full border border-blue-100 shadow-sm flex items-center gap-2">
              <FaShieldAlt className="text-base" /> The Andes Promise
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
              Total peace of mind, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-blue-400">guaranteed.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
              We don't just wash clothes; we care for your wardrobe. The Andes Assured program ensures your garments are always treated with the highest standard of excellence.
            </p>
          </div>
        </ScrollReveal>

        {/* SPLIT LAYOUT: Image Left, Grid Right */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 h-full">

          {/* Left: Animated Focal Image */}
          <div className="w-full lg:w-5/12 relative">
            <ScrollReveal delay={0.2}>
              <div className="relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-white group bg-white p-4">
                {/* Internal Image Container */}
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative">
                  <div className="absolute inset-0 bg-blue-100/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-multiply"></div>
                  <img
                    src={PremiumCareImage}
                    alt="Premium Garment Care"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Floating "Verified" Badge */}
                <motion.div
                  className="absolute -right-4 top-1/4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 z-20 flex items-center gap-3 w-max"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                >
                  <div className="bg-green-100 p-2.5 rounded-xl text-green-600">
                    <FaCheckCircle className="text-xl" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm leading-tight">100% Secure</p>
                    <p className="text-xs text-slate-500 font-medium">Quality Inspected</p>
                  </div>
                </motion.div>

              </div>
            </ScrollReveal>
          </div>

          {/* Right: The Guarantees Grid */}
          <div className="w-full lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {assurances.map((item, index) => (
              <ScrollReveal delay={0.1 * (index + 2)} key={index}>
                <div className="bg-white p-5 md:p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full group relative overflow-hidden flex flex-col justify-center">

                  {/* Subtle hover gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className={`${item.bg} ${item.color} ${item.border} border w-12 h-12 rounded-xl flex items-center justify-center shadow-sm mb-4 text-xl group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 font-medium leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default AndesAssured;