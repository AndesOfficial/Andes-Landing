import React from "react";
import WhoWeAre from "../components/WhoWeAre";
import TeamSection from "../components/TeamSection";
import AppPromo from "../components/AppPromo";
import WorkWithUs from "../components/WorkWithUs";
import Future from "../components/Future";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

// --- Premium Scroll Reveal Wrapper ---
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
    <div className="pt-20 md:pt-24 bg-slate-50 min-h-screen relative selection:bg-brand selection:text-white">
      <Helmet>
        <title>About Us | Andes Laundry</title>
        <meta name="description" content="Learn more about Andes Laundry, your trusted premium laundry partner in Pune." />
      </Helmet>

      {/* Subtle Texture Background */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

      <div className="relative z-10 space-y-12 md:space-y-24 pb-20">
        <ScrollReveal>
          <WhoWeAre />
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-[3rem] overflow-hidden mx-4 md:mx-8 shadow-soft">
            <TeamSection />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <AppPromo />
        </ScrollReveal>

        <ScrollReveal>
          <WorkWithUs />
        </ScrollReveal>
      </div>
    </div>
  );
};

export default AboutPage;