import React from 'react';
import { FaMobileAlt, FaTruck, FaMagic, FaBoxOpen } from 'react-icons/fa';
import { motion } from 'framer-motion';

const steps = [
    {
        icon: <FaMobileAlt size={32} className="text-white" />,
        title: "1. Schedule & Book",
        description: "Book your laundry pickup in seconds via our app or website. Choose a time that fits your life.",
        color: "bg-blue-500",
        shadow: "shadow-blue-500/30"
    },
    {
        icon: <FaTruck size={36} className="text-white" />,
        title: "2. We Collect",
        description: "Our dedicated Andes van will collect your laundry right from your doorstep at the scheduled time.",
        color: "bg-brand", // Primary Brand Color (#0890f1)
        shadow: "shadow-brand/30"
    },
    {
        icon: <FaMagic size={32} className="text-white" />,
        title: "3. Expert Cleaning",
        description: "Your garments are treated with premium care, eco-friendly detergents, and expert stain removal.",
        color: "bg-indigo-500",
        shadow: "shadow-indigo-500/30"
    },
    {
        icon: <FaBoxOpen size={32} className="text-white" />,
        title: "4. Fast Delivery",
        description: "Fresh, clean, and perfectly folded clothes delivered back to you in just 24 hours.",
        color: "bg-teal-500",
        shadow: "shadow-teal-500/30"
    }
];

const HowItWorksStepper = () => {
    return (
        <section className="py-20 md:py-32 bg-slate-50 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10">

                {/* Header Section */}
                <div className="text-center mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight uppercase">
                            Laundry Made <span className="text-brand">Simple</span>
                        </h2>
                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium">
                            We've streamlined the process so you can get back to what matters most. Four easy steps to perfectly clean clothes.
                        </p>
                    </motion.div>
                </div>

                {/* Desktop Timeline Stepper (Horizontal) */}
                <div className="hidden lg:grid grid-cols-4 gap-8 relative">
                    {/* The Connecting Line */}
                    <div className="absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-slate-200 via-brand/30 to-slate-200 -z-10 rounded-full"></div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center text-center group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                        >
                            {/* Icon Circle */}
                            <div className={`w-24 h-24 rounded-3xl ${step.color} shadow-xl ${step.shadow} flex items-center justify-center mb-8 transform group-hover:-translate-y-2 transition-transform duration-300 relative border-4 border-white`}>
                                {step.icon}
                                {/* Number Badge */}
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-black border-2 border-white shadow-md">
                                    {index + 1}
                                </div>
                            </div>

                            {/* Text Content */}
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">{step.title.substring(3)}</h3>
                            <p className="text-slate-600 leading-relaxed text-sm md:text-base px-2">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile/Tablet View (Vertical Flow) */}
                <div className="lg:hidden flex flex-col space-y-12 relative max-w-md mx-auto">
                    {/* The Connecting Vertical Line */}
                    <div className="absolute top-0 bottom-0 left-12 md:left-14 w-1 bg-gradient-to-b from-brand/20 via-brand/40 to-brand/10 -z-10 rounded-full hidden sm:block"></div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Icon Circle */}
                            <div className={`w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-[2rem] ${step.color} shadow-xl ${step.shadow} flex items-center justify-center relative border-4 border-white z-10`}>
                                {step.icon}
                                {/* Number Badge */}
                                <div className="absolute -top-2 -right-2 w-8 h-8 md:w-10 md:h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-sm md:text-base border-2 border-white shadow-md">
                                    {index + 1}
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="text-center sm:text-left bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:shadow-none sm:bg-transparent border border-slate-100 sm:border-none flex-1 mt-[-2rem] sm:mt-0 pt-10 sm:pt-2">
                                <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">{step.title.substring(3)}</h3>
                                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default HowItWorksStepper;
