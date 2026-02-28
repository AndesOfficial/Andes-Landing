import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaPaperPlane, FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

// ─── CONTACT INFO DATA ───
const contactInfo = [
    {
        icon: <FaEnvelope />,
        label: "Email",
        value: "care@andes.co.in",
        href: "mailto:care@andes.co.in",
        gradient: "from-[#1A7FE8] to-[#4DA8FF]",
    },
    {
        icon: <FaMapMarkerAlt />,
        label: "Address",
        value: "Survey No 124, Paud Rd, Mahatma Society, Kothrud, Pune 411038",
        href: "https://maps.google.com/?q=Survey+No+124+Paud+Rd+Mahatma+Society+Kothrud+Pune+411038",
        gradient: "from-purple-500 to-indigo-500",
    },
    {
        icon: <FaPhone />,
        label: "Customer Care",
        value: "+91 86260 76578",
        href: "tel:+918626076578",
        gradient: "from-emerald-500 to-teal-500",
    },
];

const locations = ["Kothrud", "Karve Nagar", "Warje", "Bavdhan", "Other"];

// ─── FLOATING LABEL INPUT ───
const FloatingInput = ({ label, name, type = "text", value, onChange, required = true }) => (
    <div className="relative">
        <input
            type={type}
            name={name}
            id={name}
            required={required}
            value={value}
            onChange={onChange}
            placeholder=" "
            className="peer w-full border-2 border-slate-200 rounded-xl py-3.5 px-4 pt-6 outline-none focus:border-[#1A7FE8] transition-all text-sm font-semibold text-slate-800 bg-white"
        />
        <label
            htmlFor={name}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium pointer-events-none transition-all duration-200 peer-focus:top-3 peer-focus:text-[11px] peer-focus:text-[#1A7FE8] peer-focus:font-bold peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-bold"
        >
            {label}
        </label>
    </div>
);

// ─── FLOATING LABEL SELECT ───
const FloatingSelect = ({ label, name, value, onChange, options, required = true }) => (
    <div className="relative">
        <select
            name={name}
            id={name}
            required={required}
            value={value}
            onChange={onChange}
            className={`peer w-full appearance-none border-2 border-slate-200 rounded-xl py-3.5 px-4 pt-6 outline-none focus:border-[#1A7FE8] transition-all text-sm font-semibold bg-white cursor-pointer ${value ? "text-slate-800" : "text-transparent"}`}
        >
            <option value="" disabled></option>
            {options.map((opt) => (
                <option key={opt} value={opt} className="text-slate-800">{opt}</option>
            ))}
        </select>
        <label
            htmlFor={name}
            className={`absolute left-4 text-slate-400 text-sm font-medium pointer-events-none transition-all duration-200 ${value ? "top-3 text-[11px] font-bold" : "top-1/2 -translate-y-1/2"} peer-focus:top-3 peer-focus:text-[11px] peer-focus:text-[#1A7FE8] peer-focus:font-bold peer-focus:translate-y-0`}
        >
            {label}
        </label>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
        </div>
    </div>
);

// ─── FLOATING LABEL TEXTAREA ───
const FloatingTextarea = ({ label, name, value, onChange, required = true }) => (
    <div className="relative">
        <textarea
            name={name}
            id={name}
            required={required}
            value={value}
            onChange={onChange}
            rows={4}
            placeholder=" "
            className="peer w-full border-2 border-slate-200 rounded-xl py-3.5 px-4 pt-6 outline-none focus:border-[#1A7FE8] transition-all text-sm font-semibold text-slate-800 bg-white resize-none"
        />
        <label
            htmlFor={name}
            className="absolute left-4 top-5 text-slate-400 text-sm font-medium pointer-events-none transition-all duration-200 peer-focus:top-3 peer-focus:text-[11px] peer-focus:text-[#1A7FE8] peer-focus:font-bold peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-bold"
        >
            {label}
        </label>
    </div>
);

// ─── MAIN COMPONENT ───
const ContactUs = () => {
    const [form, setForm] = useState({ name: "", email: "", location: "", message: "" });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setTimeout(() => {
            toast.success("Message sent! We'll get back to you shortly. 🎉");
            setForm({ name: "", email: "", location: "", message: "" });
            setSubmitting(false);
        }, 600);
    };

    return (
        <div className="pt-20 md:pt-24 bg-white min-h-screen font-sans selection:bg-[#1A7FE8] selection:text-white">
            <Helmet>
                <title>Contact Us | Andes Laundry</title>
                <meta name="description" content="Get in touch with Andes Laundry. Reach out for inquiries, support, or partnership opportunities." />
            </Helmet>

            <div className="container mx-auto px-5 md:px-10 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 py-8 md:py-14 items-start">

                    {/* ════════════ LEFT COLUMN ════════════ */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        {/* Heading */}
                        <div className="mb-10">
                            <h1 className="text-3xl md:text-[2.5rem] font-black text-slate-900 tracking-tight leading-tight mb-3">
                                Get in <span className="text-[#1A7FE8]">Touch</span> With Us
                            </h1>
                            <p className="text-slate-500 text-sm md:text-[15px] font-medium leading-relaxed max-w-md">
                                Reach out to us for inquiries, support, or partnership opportunities. We're here to assist you!
                            </p>
                        </div>

                        {/* Info Cards */}
                        <div className="space-y-4">
                            {contactInfo.map((info, i) => (
                                <motion.a
                                    key={i}
                                    href={info.href}
                                    target={info.href.startsWith("mailto") || info.href.startsWith("tel") ? undefined : "_blank"}
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-5 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 * i, ease: "easeOut" }}
                                    whileHover={{ scale: 1.015 }}
                                >
                                    {/* Icon */}
                                    <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center text-white text-2xl shadow-lg`}>
                                        {info.icon}
                                    </div>

                                    {/* Text */}
                                    <div className="flex-grow min-w-0">
                                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{info.label}</p>
                                        <p className="text-slate-800 font-bold text-sm md:text-base leading-snug">{info.value}</p>
                                    </div>

                                    {/* Arrow */}
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#1A7FE8] group-hover:bg-[#1A7FE8] group-hover:text-white transition-all duration-300">
                                        <FaArrowRight className="text-sm" />
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* ════════════ RIGHT COLUMN: FORM ════════════ */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                    >
                        <h2 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-wide mb-1">Send Us A Message</h2>
                        <p className="text-slate-400 text-sm font-medium mb-6">
                            Questions, feedback, or collaboration inquiries — we'd love to hear from you.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <FloatingInput label="Name" name="name" value={form.name} onChange={handleChange} />
                            <FloatingInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
                            <FloatingSelect label="Select Location" name="location" value={form.location} onChange={handleChange} options={locations} />
                            <FloatingTextarea label="Message" name="message" value={form.message} onChange={handleChange} />

                            {/* Response time note */}
                            <div className="flex items-center gap-2 pt-1">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                <p className="text-xs text-slate-400 font-semibold">We typically respond within 24 hours</p>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-[#FF6B35] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:bg-[#e85f2e] transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                                whileHover={{ scale: 1.015, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <FaPaperPlane className="text-xs" />
                                {submitting ? "Sending..." : "Submit"}
                            </motion.button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default ContactUs;
