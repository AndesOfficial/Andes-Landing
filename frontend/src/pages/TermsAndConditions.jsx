import { FaClock, FaTruck, FaShieldAlt, FaMapMarkerAlt, FaPhoneAlt, FaFileContract, FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

// Static data moved outside to prevent re-allocation on every render
const sections = [
        {
            number: "01",
            title: "Contractual Relationship",
            icon: FaFileContract,
            content: [
                "These Terms & Conditions ('Terms') govern your access to and use of services provided by ANDES Services Private Limited ('ANDES', 'we', 'us', 'our'), including our website, mobile applications, and offline services (collectively, the 'Services').",
                "By accessing or using our Services, you agree to be bound by these Terms. If you do not agree, you may not use our Services.",
                "ANDES reserves the right to modify these Terms at any time. Continued use of Services after updates constitutes acceptance of the revised Terms."
            ]
        },
        {
            number: "02",
            title: "Services",
            icon: FaTruck,
            content: [
                "ANDES provides professional laundry and garment care services including:",
                "✓ Laundry and washing",
                "✓ Dry cleaning",
                "✓ Ironing and finishing",
                "✓ Doorstep pickup and delivery",
                "All services are performed using standard industry practices. While we aim for high-quality results, outcomes may vary depending on fabric condition and garment characteristics."
            ]
        },
        {
            number: "03",
            title: "User Obligations",
            icon: FaShieldAlt,
            content: [
                "By using our Services, you agree that:",
                "• You will provide accurate information during order placement.",
                "• You will not use the Services for unlawful purposes.",
                "• You will ensure garments are suitable for cleaning.",
                "You are solely responsible for all activity conducted under your account or request."
            ]
        },
        {
            number: "04",
            title: "Orders, Pickup & Verification",
            icon: FaClock,
            content: [
                "• All garments/items are counted at the time of pickup.",
                "• The quantity recorded digitally or on the pickup receipt shall be considered final and binding.",
                "• Customers must verify the count at pickup.",
                "ANDES shall not be responsible for any discrepancies reported after pickup confirmation."
            ]
        },
        {
            number: "05",
            title: "Pricing & Billing",
            icon: FaTruck,
            content: [
                "• Prices vary depending on garment type, fabric, and treatment required.",
                "• Final pricing is determined after inspection at our facility.",
                "• Customers will be informed of any changes, if applicable.",
                "Accepted payment methods: UPI | Debit/Credit Cards | Wallets | Cash",
                "ANDES reserves the right to revise pricing without prior notice."
            ]
        },
        {
            number: "06",
            title: "Delivery Terms",
            icon: FaClock,
            content: [
                "• Standard delivery timelines: 24–48 hours.",
                "• Timelines may vary based on service type and operational conditions.",
                "Delivery Attempts: Up to three (3) attempts will be made. If unsuccessful due to customer unavailability, the order may be marked as completed and additional charges may apply."
            ]
        },
        {
            number: "07",
            title: "Cleaning Process & Limitations",
            icon: FaShieldAlt,
            content: [
                "Garment cleaning is a technical process. While ANDES uses professional methods:",
                "• Stain removal is not guaranteed.",
                "• Certain stains may be permanent due to fabric nature, chemical reactions, or prior damage/treatment.",
                "We will notify customers where possible if risks are identified."
            ]
        },
        {
            number: "08",
            title: "Damage, Loss & Compensation",
            icon: FaShieldAlt,
            content: [
                "ANDES handles all garments with care. However, in case of damage or loss attributable to our processing:",
                "▪ Maximum Compensation: 5x the service charge OR Rs. 3,000 per item (whichever is lower)",
                "▪ Claim Window: 48-72 hours of delivery",
                "▪ Garment Retention: ANDES may retain the garment upon compensation"
            ]
        },
        {
            number: "09",
            title: "Exclusions of Liability",
            icon: FaShieldAlt,
            content: [
                "ANDES shall not be liable for:",
                "• Color bleeding, shrinkage, or fabric deterioration.",
                "• Pre-existing damage or weak fabrics.",
                "• Damage to embellishments (buttons, zippers, embroidery, etc.).",
                "• Items left inside garments (cash, valuables, accessories).",
                "All garments are processed at the customer's risk for inherent defects."
            ]
        },
        {
            number: "10",
            title: "Customer Responsibilities",
            icon: FaShieldAlt,
            content: [
                "Customers are required to:",
                "• Inspect garments at the time of delivery.",
                "• Report issues immediately.",
                "• Remove valuables before handing over garments.",
                "• Provide accurate contact and delivery details.",
                "Failure to comply may result in denial of claims."
            ]
        },
        {
            number: "11",
            title: "Storage & Unclaimed Items",
            icon: FaClock,
            content: [
                "• Orders not collected within 15 days may attract storage charges.",
                "• After 30 days, ANDES shall not be responsible for loss, damage, or deterioration."
            ]
        },
        {
            number: "12",
            title: "Cancellation & Rescheduling",
            icon: FaClock,
            content: [
                "• Orders may be cancelled free of charge before pickup.",
                "• Late cancellations or rescheduling may incur charges."
            ]
        },
        {
            number: "13",
            title: "Refund Policy",
            icon: FaTruck,
            content: [
                "Refunds may be provided in cases of service failure, incorrect billing, or duplicate payments.",
                "Refund processing timeline: 7-10 working days (for online payments). All refunds are subject to internal verification."
            ]
        },
        {
            number: "14",
            title: "Force Majeure",
            icon: FaShieldAlt,
            content: [
                "ANDES shall not be liable for delays or service failures caused by events beyond its control, including:",
                "• Natural disasters",
                "• Government restrictions",
                "• Power or water shortages",
                "• Transport disruptions"
            ]
        },
        {
            number: "15",
            title: "Termination",
            icon: FaShieldAlt,
            content: [
                "ANDES reserves the right to suspend or terminate Services in case of:",
                "• Violation of Terms",
                "• Non-payment of dues",
                "• Misuse or abuse of Services"
            ]
        },
        {
            number: "16",
            title: "Privacy",
            icon: FaShieldAlt,
            content: [
                "Customer information is collected and used only for order processing, communication, and service improvement.",
                "We do not sell or share personal data with unauthorized third parties."
            ]
        },
        {
            number: "17",
            title: "Intellectual Property",
            icon: FaFileContract,
            content: [
                "All content, trademarks, branding, and materials related to ANDES are owned by the company. Unauthorized use is strictly prohibited."
            ]
        },
        {
            number: "18",
            title: "Limitation of Liability",
            icon: FaShieldAlt,
            content: [
                "To the maximum extent permitted by law, ANDES shall not be liable for:",
                "• Indirect or consequential damages.",
                "• Loss of profits, revenue, or business.",
                "• Delays beyond reasonable control."
            ]
        },
        {
            number: "19",
            title: "Governing Law & Jurisdiction",
            icon: FaFileContract,
            content: [
                "These Terms shall be governed by the laws of India.",
                "All disputes shall be subject to the exclusive jurisdiction of courts in Pune, Maharashtra."
            ]
        },
        {
            number: "20",
            title: "Contact Information",
            icon: FaPhoneAlt,
            content: [
                "Email: care@andes.co.in",
                "Phone: +91 86260 76578",
                "Address: Survey No 124, Paud Rd, Kothrud, Pune 411038"
            ]
        }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
};

const TermsAndConditions = () => {
    return (
        <>
            <Helmet>
                <title>ANDES Services - Terms & Conditions</title>
                <meta
                    name="description"
                    content="Read the Terms & Conditions for ANDES Services Pvt. Ltd. professional laundry and garment care services. Version 1.0, Effective March 2025."
                />
            </Helmet>

            <div className="min-h-screen bg-[#F8FAFC] pt-20 md:pt-24 font-sans text-slate-800">
                {/* ─── ENHANCED HERO COMPONENT ─── */}
                <div className="relative overflow-hidden bg-brand">
                    {/* Subtle aesthetic patterns */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1e40af]/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
                    
                    <div className="container mx-auto px-6 py-12 md:py-16 relative z-10 text-center text-white">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-blue-50 mb-6"
                        >
                            <FaInfoCircle />
                            Legal Documentation
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-[3.5rem] font-black tracking-tight mb-4 text-white drop-shadow-sm"
                        >
                            Terms & Conditions
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-blue-100 text-sm md:text-base max-w-xl mx-auto font-medium"
                        >
                            Everything you need to know about our services, guarantees, and policies before using ANDES professional garment care.
                        </motion.p>
                    </div>
                </div>

                <div className="container mx-auto px-5 md:px-8 py-10 md:py-16 max-w-7xl">
                    
                    {/* ─── INTRO CARD ─── */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                        className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-12 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand to-cyan-400 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                        <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">ANDES Services Private Limited</h3>
                        <p className="text-slate-500 text-[15px] leading-relaxed font-medium">
                            These Terms & Conditions constitute a legally binding agreement between you and ANDES Services Private Limited.
                            Please read them carefully before using our services. By accessing or using any of our services, you acknowledge that you have
                            read, understood, and agree to be bound by these Terms.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-slate-100">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100"><FaFileContract className="text-brand"/> Version 1.0</div>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100"><FaClock className="text-brand"/> Effective: March 2025</div>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100"><FaMapMarkerAlt className="text-brand"/> Pune, Maharashtra</div>
                        </div>
                    </motion.div>

                    {/* ─── SECTIONS GRID ─── */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
                    >
                        {sections.map((section, index) => {
                            const IconComponent = section.icon;
                            return (
                                <motion.div 
                                    key={section.number}
                                    variants={itemVariants} 
                                    className="bg-white rounded-3xl p-7 relative border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-400 group flex flex-col h-full"
                                >
                                    <div className="flex items-center gap-4 mb-5 pb-5 border-b border-slate-100">
                                        <div className="w-14 h-14 rounded-2xl bg-blue-50/80 flex items-center justify-center relative overflow-hidden group-hover:bg-brand transition-colors duration-400">
                                            <IconComponent className="text-2xl text-brand group-hover:text-white transition-colors duration-400 relative z-10" />
                                            {/* decorative number */}
                                            <span className="absolute -bottom-2 -right-1 text-[2.5rem] font-black text-brand/5 group-hover:text-white/10 select-none leading-none">
                                                {section.number}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Section {section.number}</span>
                                            <h2 className="text-xl font-bold text-slate-900 group-hover:text-brand transition-colors duration-300 leading-tight">
                                                {section.title}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="space-y-3.5 flex-grow">
                                        {section.content.map((paragraph, pIndex) => {
                                            const isBullet = paragraph.startsWith("•") || paragraph.startsWith("▪") || paragraph.startsWith("✓");
                                            let icon = null;
                                            let text = paragraph;

                                            if (isBullet) {
                                                text = paragraph.substring(1).trim();
                                                icon = <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0 text-sm" />;
                                            }

                                            return (
                                                <div key={pIndex} className={`flex ${isBullet ? "items-start gap-3" : ""}`}>
                                                    {isBullet && icon}
                                                    <p className={`text-[14.5px] leading-relaxed ${isBullet ? "text-slate-600 font-medium" : "text-slate-500"}`}>
                                                        {text}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default TermsAndConditions;

