import { FaShieldAlt, FaUserCheck, FaEnvelope, FaLock, FaBell, FaSyncAlt, FaPhoneAlt } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

// Static data outside component to prevent per-render re-allocation
const sections = [
    {
        number: "01",
        title: "Information We Collect",
        icon: FaUserCheck,
        content: [
            "We collect personal information from our customers through various sources, including:",
            "• Customer registration via our website or mobile application.",
            "• Information provided during support calls or WhatsApp interactions.",
            "• Order details, delivery addresses, and payment method preferences.",
            "• Device information and usage data when you access our digital platforms."
        ]
    },
    {
        number: "02",
        title: "How We Use Your Information",
        icon: FaShieldAlt,
        content: [
            "Any information shared with us is used only with your consent and for the following purposes:",
            "• Order processing, pickup scheduling, and delivery coordination.",
            "• Sending order status updates and service notifications.",
            "• Improving our services based on customer feedback.",
            "• Sharing relevant promotions and new service announcements (you may opt out at any time)."
        ]
    },
    {
        number: "03",
        title: "Communication Channels",
        icon: FaPhoneAlt,
        content: [
            "We may contact you using the following methods to keep you informed:",
            "• Telephone calls and WhatsApp messages.",
            "• SMS / Text messages.",
            "• Email communications.",
            "We will never contact you for purposes unrelated to your ANDES service experience."
        ]
    },
    {
        number: "04",
        title: "Data Protection",
        icon: FaLock,
        content: [
            "We implement strict security measures to protect your information from unauthorized access, disclosure, alteration, or destruction.",
            "Your data is stored on secure servers and is accessible only to authorized ANDES personnel.",
            "We do not sell, trade, or transfer your personal information to outside parties without your explicit consent."
        ]
    },
    {
        number: "05",
        title: "Third-Party Disclosure",
        icon: FaShieldAlt,
        content: [
            "We do not sell or share personal data with unauthorized third parties.",
            "We may share limited data with trusted service partners (e.g., payment processors, logistics providers) solely to fulfill your order.",
            "All third-party partners are bound by confidentiality agreements."
        ]
    },
    {
        number: "06",
        title: "Notifications & Marketing",
        icon: FaBell,
        content: [
            "• We may send you service updates, promotional offers, and laundry tips.",
            "• You may opt out of marketing communications at any time by contacting us.",
            "• Transactional messages (order confirmations, delivery updates) cannot be opted out of as they are essential to the service."
        ]
    },
    {
        number: "07",
        title: "Consent",
        icon: FaUserCheck,
        content: [
            "By providing your personal information to ANDES, you expressly consent to its collection and use in accordance with this Privacy Policy.",
            "You have the right to request access to, correction of, or deletion of your personal data at any time by contacting us at care@andes.co.in."
        ]
    },
    {
        number: "08",
        title: "Contact & Support",
        icon: FaEnvelope,
        content: [
            "Email: care@andes.co.in",
            "Phone: +91 86260 76578",
            "Address: Survey No 124, Paud Rd, Kothrud, Pune 411038"
        ]
    },
    {
        number: "09",
        title: "Updates to This Policy",
        icon: FaSyncAlt,
        content: [
            "We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements.",
            "Any significant changes will be communicated through our website or via email.",
            "Continued use of our services after policy updates constitutes your acceptance of the revised Privacy Policy."
        ]
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.3 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
};

const PrivacyPolicy = () => {
    return (
        <>
            <Helmet>
                <title>ANDES Services - Privacy Policy</title>
                <meta
                    name="description"
                    content="Read the Privacy Policy for ANDES Services Pvt. Ltd. — how we collect, use, and protect your personal information."
                />
            </Helmet>

            <div className="min-h-screen bg-[#F8FAFC] pt-20 md:pt-24 font-sans text-slate-800">
                {/* ─── HERO ─── */}
                <div className="relative overflow-hidden bg-brand">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1e40af]/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

                    <div className="container mx-auto px-6 py-12 md:py-16 relative z-10 text-center text-white">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-blue-50 mb-6"
                        >
                            <FaShieldAlt />
                            Legal Documentation
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-[3.5rem] font-black tracking-tight mb-4 text-white drop-shadow-sm"
                        >
                            Privacy Policy
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-blue-100 text-sm md:text-base max-w-xl mx-auto font-medium"
                        >
                            Your privacy matters to us. Here's everything about how we collect, use, and protect your personal information.
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
                            At ANDES, we are committed to safeguarding your privacy. This policy explains what personal data we collect,
                            why we collect it, and how we use it to provide you with the best laundry and garment care experience in Pune.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-slate-100">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                <FaShieldAlt className="text-brand" /> GDPR Aligned
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                <FaLock className="text-brand" /> Data Secure
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                <FaSyncAlt className="text-brand" /> Last Updated: March 2026
                            </div>
                        </div>
                    </motion.div>

                    {/* ─── SECTIONS GRID ─── */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
                    >
                        {sections.map((section) => {
                            const IconComponent = section.icon;
                            return (
                                <motion.div
                                    key={section.number}
                                    variants={itemVariants}
                                    className="bg-white rounded-3xl p-7 relative border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
                                >
                                    <div className="flex items-center gap-4 mb-5 pb-5 border-b border-slate-100">
                                        <div className="w-14 h-14 rounded-2xl bg-blue-50/80 flex items-center justify-center relative overflow-hidden group-hover:bg-brand transition-colors duration-300">
                                            <IconComponent className="text-2xl text-brand group-hover:text-white transition-colors duration-300 relative z-10" />
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
                                            const isBullet = paragraph.startsWith("•");
                                            const text = isBullet ? paragraph.substring(1).trim() : paragraph;
                                            return (
                                                <div key={pIndex} className={`flex ${isBullet ? "items-start gap-3" : ""}`}>
                                                    {isBullet && (
                                                        <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0"></div>
                                                    )}
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

export default PrivacyPolicy;
