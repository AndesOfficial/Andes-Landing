import React from "react";
import WhoWeAre from "../components/WhoWeAre";
import TeamSection from "../components/TeamSection";
import WorkWithUs from "../components/WorkWithUs";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

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

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen relative selection:bg-brand selection:text-white overflow-hidden font-sans">
      <Helmet>
        <title>About Us | Andes Laundry</title>
        <meta name="description" content="Learn more about Andes Laundry, your trusted premium laundry partner in Pune." />
      </Helmet>

      <div className="relative pt-32 pb-16 md:pt-44 md:pb-28 px-4 overflow-hidden">
        {/* Animated Background Glows */}
        <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 flex justify-center items-center">
          <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-brand/10 rounded-full blur-[80px] sm:blur-[120px] mix-blend-multiply animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-cyan-300/10 rounded-full blur-[80px] sm:blur-[120px] mix-blend-multiply animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
        </div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <span className="text-brand font-bold tracking-widest text-xs md:text-sm uppercase mb-6 px-4 py-1.5 rounded-full bg-blue-50/80 border border-brand/20 backdrop-blur-md shadow-sm">
              Our Story
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[1.05] mb-8">
              Changing how the <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-cyan-500 pb-2">
                world does laundry
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
              We started with a simple idea: returning the most valuable asset to people — their time.
              By combining premium care with seamless technology.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ─── PAGE CONTENT ─── */}
      <div className="relative z-10 pb-24 space-y-20 md:space-y-32">
        <ScrollReveal>
          <WhoWeAre />
        </ScrollReveal>

        <ScrollReveal>
          <div className="mx-4 md:mx-8">
            <div className="rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100/50 max-w-[1400px] mx-auto">
              <TeamSection />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <WorkWithUs />
        </ScrollReveal>
      </div>
    </div>
  );
};

export default AboutPage;