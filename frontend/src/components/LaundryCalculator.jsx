import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCalculator, FaClock, FaArrowRight, FaHandHoldingUsd, FaHourglassHalf, FaTshirt, FaWallet, FaRupeeSign, FaInfoCircle, FaChartLine } from "react-icons/fa";

// --- Hidden Constants (Pune Localized Data) ---
const HARD_COST_PER_LOAD = 40;       // ₹ detergent + electricity + water + depreciation
const TIME_PER_LOAD = 0.75;           // hours (45 min of manual labor)
const ANDES_COST_PER_LOAD = 237;      // 3kg avg × ₹79/kg Wash & Iron (1 load around 3kg)

const LaundryCalculator = () => {
    const [loadsPerWeek, setLoadsPerWeek] = useState(3);
    const [hourlyWage, setHourlyWage] = useState(400);

    // --- The Math ---
    const results = useMemo(() => {
        const costOfTimePerLoad = hourlyWage * TIME_PER_LOAD;
        const totalDiyCostPerLoad = HARD_COST_PER_LOAD + costOfTimePerLoad;
        const monthlyDiyCost = loadsPerWeek * 4 * totalDiyCostPerLoad;
        const monthlyAndesCost = loadsPerWeek * 4 * ANDES_COST_PER_LOAD;
        const monthlySavings = monthlyDiyCost - monthlyAndesCost;
        const hoursSavedMonthly = loadsPerWeek * 4 * TIME_PER_LOAD;
        return { monthlyDiyCost, monthlyAndesCost, monthlySavings, hoursSavedMonthly };
    }, [loadsPerWeek, hourlyWage]);

    const fmt = (n) => Math.round(n).toLocaleString("en-IN");

    // Slider fill percentages for the colored track
    const loadsFill = ((loadsPerWeek - 1) / (10 - 1)) * 100;
    const wageFill = ((hourlyWage - 100) / (2000 - 100)) * 100;

    const sliderClasses = `w-full h-2 rounded-full appearance-none cursor-pointer outline-none
        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6
        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
        [&::-webkit-slider-thumb]:shadow-[0_1px_6px_rgba(0,0,0,0.25)] [&::-webkit-slider-thumb]:border-[3px]
        [&::-webkit-slider-thumb]:border-brand [&::-webkit-slider-thumb]:active:scale-110
        [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:cursor-grab
        [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full
        [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-brand
        [&::-moz-range-thumb]:shadow-[0_1px_6px_rgba(0,0,0,0.25)] [&::-moz-range-thumb]:cursor-grab`;

    return (
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

            {/* Section Header */}
            <div className="text-center mb-8 md:mb-12">
                <span className="inline-flex items-center gap-2 bg-brand/10 text-brand font-extrabold px-4 py-1.5 rounded-full text-xs sm:text-sm tracking-wide uppercase mb-3">
                    <FaCalculator className="text-xs" /> Smart Calculator
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 mb-3 tracking-tight leading-tight">
                    Calculate Your Hidden{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-blue-400">Laundry Cost</span>
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                    Discover how much time & money you're really spending on laundry.
                </p>
            </div>

            {/* ═══════════ SPLIT-LAYOUT CARD ═══════════ */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-200/60 flex flex-col md:flex-row"
            >
                {/* ════ LEFT PANEL — Inputs (white) ════ */}
                <div className="w-full md:w-1/2 bg-white p-6 sm:p-8 md:p-10 flex flex-col justify-center">

                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-6 md:mb-8 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center text-brand text-sm">
                            <FaCalculator />
                        </span>
                        Adjust Your Inputs
                    </h3>

                    {/* Slider 1: Loads Per Week */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                                <FaTshirt className="text-brand/60" /> Loads per Week
                            </span>
                            <span className="text-xl sm:text-2xl font-black text-brand tabular-nums bg-brand/5 px-3 py-0.5 rounded-lg">
                                {loadsPerWeek}
                            </span>
                        </div>
                        <input
                            type="range"
                            min={1}
                            max={10}
                            step={1}
                            value={loadsPerWeek}
                            onChange={(e) => setLoadsPerWeek(Number(e.target.value))}
                            style={{ background: `linear-gradient(to right, #2563eb ${loadsFill}%, #e2e8f0 ${loadsFill}%)` }}
                            className={sliderClasses}
                        />
                        <div className="flex justify-between text-[10px] sm:text-xs text-slate-400 mt-1.5 font-medium px-0.5">
                            <span>1</span><span>5</span><span>10</span>
                        </div>
                    </div>

                    {/* Slider 2: Your Time Value */}
                    <div className="mb-2">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                                <FaWallet className="text-brand/60" /> Your Time Value (₹/hr)
                            </span>
                            <span className="text-xl sm:text-2xl font-black text-brand tabular-nums bg-brand/5 px-3 py-0.5 rounded-lg">
                                ₹{fmt(hourlyWage)}
                            </span>
                        </div>
                        <input
                            type="range"
                            min={100}
                            max={2000}
                            step={50}
                            value={hourlyWage}
                            onChange={(e) => setHourlyWage(Number(e.target.value))}
                            style={{ background: `linear-gradient(to right, #2563eb ${wageFill}%, #e2e8f0 ${wageFill}%)` }}
                            className={sliderClasses}
                        />
                        <div className="flex justify-between text-[10px] sm:text-xs text-slate-400 mt-1.5 font-medium px-0.5">
                            <span>₹100</span><span>₹1,000</span><span>₹2,000</span>
                        </div>
                    </div>

                    {/* Micro-info below sliders (Desktop only) */}
                    <p className="hidden md:block text-xs text-slate-400 mt-4 leading-relaxed flex items-start gap-1.5">
                        <FaInfoCircle className="text-slate-300 mt-0.5 flex-shrink-0" />
                        * Based on ₹40/load hard cost (detergent, water, electricity) + your time at ₹{fmt(hourlyWage)}/hr × 45 min per load.
                    </p>
                </div>

                {/* ════ RIGHT PANEL — Results (gradient) ════ */}
                <div className="w-full md:w-1/2 bg-gradient-to-br from-brand via-blue-600 to-blue-900 p-6 sm:p-8 md:p-10 text-white relative overflow-hidden flex flex-col justify-center">

                    {/* Decorative glows */}
                    <div className="absolute top-0 right-0 w-52 h-52 bg-blue-400/20 rounded-full blur-[90px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-400/10 rounded-full blur-[70px] pointer-events-none" />

                    <div className="relative z-10 space-y-5 sm:space-y-6">

                        {/* DIY vs Andes — Two highlight boxes */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center border border-white/10">
                                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-200 mb-1 flex items-center justify-center gap-1"><FaChartLine className="text-red-300/70" /> Your DIY Cost</p>
                                <p className="text-2xl sm:text-3xl md:text-4xl font-black text-red-300 tabular-nums leading-none">
                                    ₹{fmt(results.monthlyDiyCost)}
                                </p>
                                <p className="text-[10px] sm:text-xs text-blue-300 mt-1">per month</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center border border-white/10">
                                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-200 mb-1 flex items-center justify-center gap-1"><FaRupeeSign className="text-green-300/70" /> Andes Cost</p>
                                <p className="text-2xl sm:text-3xl md:text-4xl font-black text-green-300 tabular-nums leading-none">
                                    ₹{fmt(results.monthlyAndesCost)}
                                </p>
                                <p className="text-[10px] sm:text-xs text-blue-300 mt-1">per month</p>
                            </div>
                        </div>

                        {/* Savings + Hours badges */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <div className="bg-yellow-400/15 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center gap-3 border border-yellow-300/20">
                                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
                                    <FaHandHoldingUsd className="text-yellow-300 text-lg sm:text-xl" />
                                </div>
                                <div>
                                    <p className="text-[10px] sm:text-xs font-bold text-yellow-200 uppercase tracking-wider">You Save</p>
                                    <p className="text-lg sm:text-xl md:text-2xl font-black text-yellow-300 tabular-nums leading-tight">
                                        {results.monthlySavings > 0 ? `₹${fmt(results.monthlySavings)}` : "—"}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-yellow-400/15 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center gap-3 border border-yellow-300/20">
                                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
                                    <FaHourglassHalf className="text-yellow-300 text-lg sm:text-xl" />
                                </div>
                                <div>
                                    <p className="text-[10px] sm:text-xs font-bold text-yellow-200 uppercase tracking-wider">Hours Freed</p>
                                    <p className="text-lg sm:text-xl md:text-2xl font-black text-yellow-300 tabular-nums leading-tight">
                                        {results.hoursSavedMonthly}h
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Summary sentence */}
                        <div className="bg-black/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/10">
                            <p className="text-xs sm:text-sm md:text-base leading-relaxed font-medium text-blue-50">
                                {results.monthlySavings > 0 ? (
                                    <>
                                        You're spending <strong className="text-red-300">₹{fmt(results.monthlyDiyCost)}</strong> and
                                        wasting <strong className="text-yellow-300">{results.hoursSavedMonthly} hours</strong> every month
                                        on laundry! Switch to Andes for just <strong className="text-green-300">₹{fmt(results.monthlyAndesCost)}</strong> and
                                        save <strong className="text-yellow-300">₹{fmt(results.monthlySavings)}</strong>.
                                    </>
                                ) : (
                                    <>
                                        At your current rates, Andes is already cost-competitive at <strong className="text-green-300">₹{fmt(results.monthlyAndesCost)}</strong>/month — plus
                                        you'll reclaim <strong className="text-yellow-300">{results.hoursSavedMonthly} hours</strong> of your life every month!
                                    </>
                                )}
                            </p>
                        </div>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                            <Link to="/services" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-yellow-400 text-slate-900 font-black uppercase tracking-wide rounded-xl sm:rounded-2xl shadow-[0_8px_30px_rgba(250,204,21,0.35)] hover:-translate-y-0.5 hover:bg-yellow-300 transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2 group relative overflow-hidden">
                                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-[shine_1s_ease-in-out]" />
                                    Reclaim Your Weekends <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                            <p className="text-[10px] sm:text-xs text-blue-200/70 font-medium">
                                <FaClock className="inline mr-1" /> 60s to schedule
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LaundryCalculator;
