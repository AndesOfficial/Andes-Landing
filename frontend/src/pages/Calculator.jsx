import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiRefreshCw, FiAlertTriangle, FiTrendingUp, FiTrendingDown, FiMinus, FiSettings, FiX, FiZap, FiDroplet, FiPackage, FiInfo } from "react-icons/fi";

// ─── Scenario seeds ───────────────────────────────────────────────────────────
const SCENARIO_SEEDS = {
  optimistic:   { cycles: 12, label: "Optimistic",   color: "emerald", icon: "up",   desc: "8 hrs · 12 cycles/day — best-case" },
  mostlikely:   { cycles: 11, label: "Most Likely",  color: "blue",    icon: "mid",  desc: "7h 20m · 11 cycles/day — practical" },
  conservative: { cycles: 10, label: "Conservative", color: "amber",   icon: "down", desc: "6h 40m · 10 cycles/day — conservative" },
};

// ─── B2B client presets ───────────────────────────────────────────────────────
const B2B_CLIENTS = {
  hostel: { label: "Hostel", cycles: 12, cycleMins: 40, kgPerCycle: 21, rate: 55, is_premium: true },
  hotel:  { label: "Hotel",  cycles: 6,  cycleMins: 75, kgPerCycle: 21, rate: 60, is_premium: true },
};
const B2B_DAY_MINS = 480;

// ─── All defaults ─────────────────────────────────────────────────────────────
const DEFAULT_ASSUMPTIONS = {
  machine_count: 2,
  m1cap: 13, m2cap: 8,
  m3enabled: false, m3cap: 8,
  m4enabled: false, m4cap: 8,
  m5enabled: false, m5cap: 8,
  m1mode: "b2c", m2mode: "b2c", m3mode: "b2c", m4mode: "b2c", m5mode: "b2c",
  b2bClientType: "hostel",
  hostelPct: 100, hotelPct: 0,
  dailyKgDemand: 0,
  demandB2CPct: 50,
  workdays: 30,

  b2bPrice: 55, b2cPrice: 81, dcPrice: 100, gpkg: 3,
  laundrySplit: 83.33, dcSplit: 16.67,
  heaterColdPct: 83.33, heaterHotPct: 16.67,

  elecRate: 13.80,
  cycleMins: 60,
  m10_washerColdKw: 0.5,
  m10_washerHotKw:  2.6,
  m10_dryerKw:      0.25,
  m15_washerColdKw: 0.5,
  m15_washerHotKw:  2.7,
  m15_dryerKw:      0.35,

  waterRate:          0.38,
  water10kg:          65,
  water15kg:          95,
  practicalLoad10kg:  8,
  practicalLoad15kg:  13,

  detergentRate: 6,

  pkgLaundryIronPct: 60,
  pkgLaundryFoldPct: 40,

  pkgWashIronBagCost:       5,
  pkgWashIronClothesPerBag: 12,
  pkgWashIronClothesPerKg:  4,

  pkgWashFoldBagCost:       5,
  pkgWashFoldKgPerBag:      6,

  pkgDcPolythene:     4.6,
  pkgDcCollar:        1.0,
  pkgDcCardboard:     4.0,
  pkgDcClipping:      1.0,
  pkgDcWhitePaper:    0.5,
  pkgDcGarmentsPerKg: 3,

  pkgShoePolythene:   4.6,
  pkgShoeCardboard:   4.0,
  pkgShoeWhitePaper:  1.0,

  rent: 20000,
  workers: [
    { id: 1, name: "Worker 1 – Washing",  salary: 20000 },
    { id: 2, name: "Worker 2 – Delivery", salary: 20000 },
    { id: 3, name: "Worker 3 – Ironing",  salary: 20000 },
  ],
  deliveryVehicleRent: 7000, maintenance: 2000, overtime: 0, misc: 2000,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt    = n => Math.round(n).toLocaleString("en-IN");
const fmtL   = n => (n / 100000).toFixed(2);
const fmtKg  = n => `${fmt(n)} kg`;
const fmtPct = n => `${n.toFixed(1)}%`;
const fmtR   = n => `₹ ${fmt(n)}`;
const fmtDec = (n, d = 3) => n.toFixed(d);

function machineDoesB2C(mode) { return mode === "b2c" || mode === "both"; }
function machineDoesB2B(mode) { return mode === "b2b" || mode === "both"; }
function getSpecKey(cap) { return cap <= 10 ? "10kg" : "15kg"; }

// ─── Derive specs from assumptions ────────────────────────────────────────────
function deriveSpecs(a) {
  const cycleHr = a.cycleMins / 60;
  const specs = {
    "10kg": {
      washerCold_kwh:  a.m10_washerColdKw * cycleHr,
      washerHot_kwh:   a.m10_washerHotKw  * cycleHr,
      dryer_kwh:       a.m10_dryerKw      * cycleHr,
      waterLitres:     a.water10kg,
      practicalLoad:   a.practicalLoad10kg,
      waterPerKg:      a.water10kg / a.practicalLoad10kg,
      waterCostPerKg:  (a.water10kg / a.practicalLoad10kg) * a.waterRate,
    },
    "15kg": {
      washerCold_kwh:  a.m15_washerColdKw * cycleHr,
      washerHot_kwh:   a.m15_washerHotKw  * cycleHr,
      dryer_kwh:       a.m15_dryerKw      * cycleHr,
      waterLitres:     a.water15kg,
      practicalLoad:   a.practicalLoad15kg,
      waterPerKg:      a.water15kg / a.practicalLoad15kg,
      waterCostPerKg:  (a.water15kg / a.practicalLoad15kg) * a.waterRate,
    },
  };
  const pkgDcPerGarment =
    a.pkgDcPolythene + a.pkgDcCollar + a.pkgDcCardboard + a.pkgDcClipping + a.pkgDcWhitePaper;
  const pkgShoePerOrder = a.pkgShoePolythene + a.pkgShoeCardboard + a.pkgShoeWhitePaper;
  return { specs, pkgDcPerGarment, pkgShoePerOrder, cycleHr };
}

// ─── Packaging breakdown (B2C only) ──────────────────────────────────────────
function calcPackagingBreakdown(laundryKg, dcKg, a, pkgDcPerGarment) {
  const ironPct = (a.pkgLaundryIronPct || 60) / 100;
  const foldPct = (a.pkgLaundryFoldPct || 40) / 100;

  const ironKg         = laundryKg * ironPct;
  const ironClothes    = ironKg * a.pkgWashIronClothesPerKg;
  const ironBagsNeeded = Math.ceil(ironClothes / a.pkgWashIronClothesPerBag);
  const ironCost       = ironBagsNeeded * a.pkgWashIronBagCost;
  const ironCostPerKg  = ironKg > 0 ? ironCost / ironKg : (a.pkgWashIronBagCost * a.pkgWashIronClothesPerKg) / a.pkgWashIronClothesPerBag;

  const foldKg         = laundryKg * foldPct;
  const foldBagsNeeded = Math.ceil(foldKg / (a.pkgWashFoldKgPerBag || 6));
  const foldCost       = foldBagsNeeded * (a.pkgWashFoldBagCost || 5);
  const foldCostPerKg  = foldKg > 0 ? foldCost / foldKg : (a.pkgWashFoldBagCost || 5) / (a.pkgWashFoldKgPerBag || 6);

  const dcGarments       = dcKg * a.pkgDcGarmentsPerKg;
  const dcCost           = dcGarments * pkgDcPerGarment;
  const dcKgEquivalent   = dcGarments / a.pkgDcGarmentsPerKg;
  const dcCostPerKgEquiv = dcKgEquivalent > 0 ? dcCost / dcKgEquivalent : pkgDcPerGarment * a.pkgDcGarmentsPerKg;

  return {
    ironKg:           Math.round(ironKg * 100) / 100,
    ironClothes:      Math.round(ironClothes),
    ironBagsNeeded,
    ironCost:         Math.round(ironCost),
    ironCostPerKg:    Math.round(ironCostPerKg * 100) / 100,
    foldKg:           Math.round(foldKg * 100) / 100,
    foldBagsNeeded,
    foldCost:         Math.round(foldCost),
    foldCostPerKg:    Math.round(foldCostPerKg * 100) / 100,
    dcGarments:       Math.round(dcGarments),
    dcCost:           Math.round(dcCost),
    dcCostPerKgEquiv: Math.round(dcCostPerKgEquiv * 100) / 100,
    total:            Math.round(ironCost + foldCost + dcCost),
    totalLaundryPkg:  Math.round(ironCost + foldCost),
    pkgDcPerGarment:  Math.round(pkgDcPerGarment * 10) / 10,
  };
}

// ─── Core calculation ─────────────────────────────────────────────────────────
function calcScenario(scenarioKey, a) {
  const seed = SCENARIO_SEEDS[scenarioKey];
  const { specs, pkgDcPerGarment, pkgShoePerOrder, cycleHr } = deriveSpecs(a);

  const hostelW      = (a.hostelPct || 0) / 100;
  const hotelW       = (a.hotelPct  || 0) / 100;
  const hostel       = B2B_CLIENTS.hostel;
  const hotel        = B2B_CLIENTS.hotel;
  const hostelCycles = Math.floor((hostelW * B2B_DAY_MINS) / hostel.cycleMins);
  const hotelCycles  = Math.floor((hotelW  * B2B_DAY_MINS) / hotel.cycleMins);
  const b2bCycles    = Math.round((hostelCycles + hotelCycles) * 2) / 2;
  const b2bRate      = hostel.rate * hostelW + hotel.rate * hotelW;
  const b2bClient = {
    label:        hostelW === 1 ? "Hostel" : hotelW === 1 ? "Hotel" : `Hostel ${a.hostelPct}% / Hotel ${a.hotelPct}%`,
    cycles:       b2bCycles,
    hostelCycles, hotelCycles,
    rate:         b2bRate,
    is_premium:   true,
  };

  const machines = [
    { cap: a.m1cap, mode: a.m1mode, enabled: true },
    { cap: a.m2cap, mode: a.m2mode, enabled: (a.machine_count || 2) >= 2 },
    { cap: a.m3cap, mode: a.m3mode, enabled: a.m3enabled },
    { cap: a.m4cap, mode: a.m4mode, enabled: a.m4enabled },
    { cap: a.m5cap, mode: a.m5mode, enabled: a.m5enabled },
  ];

  let b2cDailyKg = 0, b2bDailyKg = 0;
  let b2cDailyCycles = 0, b2bDailyCycles = 0;

  const mDetails = machines.map(m => {
    if (!m.enabled || m.cap <= 0) return { b2cKg: 0, b2bKg: 0, b2cCyc: 0, b2bCyc: 0 };
    const b2cKg  = machineDoesB2C(m.mode) ? m.cap * seed.cycles : 0;
    const b2bKg  = machineDoesB2B(m.mode) ? b2bCycles * m.cap   : 0;
    const b2cCyc = machineDoesB2C(m.mode) ? seed.cycles : 0;
    const b2bCyc = machineDoesB2B(m.mode) ? b2bCycles   : 0;
    b2cDailyKg    += b2cKg;  b2bDailyKg    += b2bKg;
    b2cDailyCycles += b2cCyc; b2bDailyCycles += b2bCyc;
    return { b2cKg, b2bKg, b2cCyc, b2bCyc };
  });

  const [m1daily, m2daily, m3daily, m4daily, m5daily] = mDetails.map(m => m.b2cKg + m.b2bKg);

  const b2cMonthly = b2cDailyKg * a.workdays;
  const b2bMonthly = b2bDailyKg * a.workdays;
  const b2cActive  = b2cDailyKg > 0;
  const b2bActive  = b2bDailyKg > 0;

  const totalB2BCycles = hostelCycles + hotelCycles;
  const hostelFrac     = totalB2BCycles > 0 ? hostelCycles / totalB2BCycles : 0;
  const hotelFrac      = totalB2BCycles > 0 ? hotelCycles  / totalB2BCycles : 0;
  const hostelDailyKg  = b2bDailyKg * hostelFrac;
  const hotelDailyKg   = b2bDailyKg * hotelFrac;
  const hostelMonthly  = hostelDailyKg * a.workdays;
  const hotelMonthly   = hotelDailyKg  * a.workdays;
  const hostelRev      = hostelMonthly * hostel.rate;
  const hotelRev       = hotelMonthly  * hotel.rate;

  const laundryKg  = b2cMonthly * (a.laundrySplit / 100);
  const dcKg       = b2cMonthly * (a.dcSplit / 100);
  const garments   = dcKg * a.gpkg;
  const laundryRev = laundryKg * a.b2cPrice;
  const dcRev      = dcKg * a.gpkg * a.dcPrice;
  const b2bRev     = hostelRev + hotelRev;
  const totalRev   = laundryRev + dcRev + b2bRev;
  const dailyRev   = a.workdays > 0 ? totalRev / a.workdays : 0;

  const b2cMonthlyCycles   = b2cDailyCycles * a.workdays;
  const b2bMonthlyCycles   = b2bDailyCycles * a.workdays;
  const totalMonthlyCycles = b2cMonthlyCycles + b2bMonthlyCycles;

  const coldPct = (a.heaterColdPct || 83.33) / 100;
  const hotPct  = (a.heaterHotPct  || 16.67) / 100;

  let elecCostTotal  = 0;
  let waterCostTotal = 0;
  const machineElecBreakdown = [];

  machines.forEach((m, i) => {
    if (!m.enabled || m.cap <= 0) { machineElecBreakdown.push(null); return; }

    const k    = getSpecKey(m.cap);
    const spec = specs[k];

    const b2cCyc   = mDetails[i].b2cCyc * a.workdays;
    const b2bCyc   = mDetails[i].b2bCyc * a.workdays;
    const totalCyc = b2cCyc + b2bCyc;

    const coldCycles  = totalCyc * coldPct;
    const hotCycles   = totalCyc * hotPct;
    const dryerCycles = totalCyc;

    const washerColdMonthlyKwh = coldCycles  * spec.washerCold_kwh;
    const washerHotMonthlyKwh  = hotCycles   * spec.washerHot_kwh;
    const dryerMonthlyKwh      = dryerCycles * spec.dryer_kwh;
    const totalMonthlyKwh      = washerColdMonthlyKwh + washerHotMonthlyKwh + dryerMonthlyKwh;

    const washerColdDailyKwh = a.workdays > 0 ? washerColdMonthlyKwh / a.workdays : 0;
    const washerHotDailyKwh  = a.workdays > 0 ? washerHotMonthlyKwh  / a.workdays : 0;
    const dryerDailyKwh      = a.workdays > 0 ? dryerMonthlyKwh      / a.workdays : 0;
    const totalDailyKwh      = a.workdays > 0 ? totalMonthlyKwh      / a.workdays : 0;

    const coldCyclesDay  = (mDetails[i].b2cCyc + mDetails[i].b2bCyc) * coldPct;
    const hotCyclesDay   = (mDetails[i].b2cCyc + mDetails[i].b2bCyc) * hotPct;
    const dryerCyclesDay = mDetails[i].b2cCyc + mDetails[i].b2bCyc;

    const washerColdMonthlyCost = washerColdMonthlyKwh * a.elecRate;
    const washerHotMonthlyCost  = washerHotMonthlyKwh  * a.elecRate;
    const dryerMonthlyCost      = dryerMonthlyKwh      * a.elecRate;
    const machineTotalCost      = totalMonthlyKwh      * a.elecRate;

    const costPerKg = spec.practicalLoad > 0 ? machineTotalCost / (totalCyc * spec.practicalLoad) : 0;

    const waterPerCycle    = spec.waterLitres;
    const waterPerKg       = spec.waterPerKg;
    const waterCostPerKg   = spec.waterCostPerKg;
    const dailyCycles      = mDetails[i].b2cCyc + mDetails[i].b2bCyc;
    const dailyWaterL      = waterPerCycle * dailyCycles;
    const dailyWaterCost   = dailyWaterL * a.waterRate;
    const monthlyWaterL    = waterPerCycle * totalCyc;
    const machineWaterCost = monthlyWaterL * a.waterRate;

    elecCostTotal  += machineTotalCost;
    waterCostTotal += machineWaterCost;

    machineElecBreakdown.push({
      cap: m.cap, mode: m.mode,
      specLabel:     m.cap <= 10 ? `10 KG spec (${spec.practicalLoad} kg load)` : `15 KG spec (${spec.practicalLoad} kg load)`,
      practicalLoad: spec.practicalLoad,
      washerColdKw:  m.cap <= 10 ? a.m10_washerColdKw : a.m15_washerColdKw,
      washerHotKw:   m.cap <= 10 ? a.m10_washerHotKw  : a.m15_washerHotKw,
      dryerKw:       m.cap <= 10 ? a.m10_dryerKw      : a.m15_dryerKw,
      washerCold_kwh: spec.washerCold_kwh,
      washerHot_kwh:  spec.washerHot_kwh,
      dryer_kwh:      spec.dryer_kwh,
      coldCyclesDay, hotCyclesDay, dryerCyclesDay,
      washerColdDailyKwh, washerHotDailyKwh, dryerDailyKwh, totalDailyKwh,
      washerColdMonthlyKwh, washerHotMonthlyKwh, dryerMonthlyKwh, totalMonthlyKwh,
      washerColdMonthlyCost, washerHotMonthlyCost, dryerMonthlyCost, machineTotalCost,
      costPerKg,
      waterPerCycle, waterPerKg, waterCostPerKg,
      dailyCycles, dailyWaterL, dailyWaterCost,
      monthlyWaterL, machineWaterCost,
      totalCyc, b2cCyc, b2bCyc,
      coldCycles, hotCycles, dryerCycles,
    });
  });

  const electricityCost  = Math.round(elecCostTotal);
  const waterCost        = Math.round(waterCostTotal);
  const detergentCost    = Math.round((b2cMonthly + b2bMonthly) * a.detergentRate);
  const pkgBreakdown     = b2cActive ? calcPackagingBreakdown(laundryKg, dcKg, a, pkgDcPerGarment) : null;
  const packagingCostVal = b2cActive ? (pkgBreakdown ? pkgBreakdown.total : 0) : 0;

  const totalSalaries = (a.workers || []).reduce((sum, w) => sum + (w.salary || 0), 0);
  const totalExp = a.rent + totalSalaries + electricityCost + waterCost +
                   packagingCostVal + detergentCost + a.deliveryVehicleRent + a.maintenance + a.overtime + a.misc;

  const totalKg  = b2cMonthly + b2bMonthly;
  const profit   = totalRev - totalExp;
  const margin   = totalRev > 0 ? (profit / totalRev) * 100 : 0;
  const revPerKg = totalKg  > 0 ? totalRev / totalKg : 0;
  const expPerKg = totalKg  > 0 ? totalExp / totalKg : 0;

  return {
    seed, b2bClient, is_premium: b2bClient.is_premium,
    m1daily, m2daily, m3daily, m4daily, m5daily,
    b2cDailyKg, b2bDailyKg, b2cDailyCycles, b2bDailyCycles,
    b2cMonthlyCycles, b2bMonthlyCycles, totalMonthlyCycles,
    b2cMonthly, b2bMonthly, b2cActive, b2bActive,
    laundryKg, dcKg, garments, laundryRev, dcRev, b2bRev, totalRev, dailyRev,
    hostelCycles, hotelCycles, hostelDailyKg, hotelDailyKg,
    hostelMonthly, hotelMonthly, hostelRev, hotelRev,
    electricityCost, machineElecBreakdown, waterCost, detergentCost,
    packagingCostVal, pkgBreakdown, pkgDcPerGarment, pkgShoePerOrder,
    totalExp, profit, margin, revPerKg, expPerKg,
  };
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const SS = {
  emerald: { hero:"bg-emerald-600", ring:"ring-emerald-400", border:"border-emerald-300", text:"text-emerald-600", light:"bg-emerald-50", badge:"bg-emerald-100 text-emerald-700" },
  blue:    { hero:"bg-blue-600",    ring:"ring-blue-400",    border:"border-blue-300",    text:"text-blue-600",    light:"bg-blue-50",    badge:"bg-blue-100 text-blue-700"       },
  amber:   { hero:"bg-amber-500",   ring:"ring-amber-400",   border:"border-amber-300",   text:"text-amber-600",   light:"bg-amber-50",   badge:"bg-amber-100 text-amber-700"     },
};

// ─── UI primitives ────────────────────────────────────────────────────────────
function SectionDivider({ children }) {
  return (
    <div className="flex items-center gap-2 mb-2 mt-5">
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">{children}</span>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
  );
}

function FieldRow({ label, unit, children, hint }) {
  return (
    <div className="grid grid-cols-2 gap-2 items-center mb-2.5">
      <div>
        <p className="text-xs text-slate-600 leading-tight">{label}</p>
        {unit && <p className="text-[10px] text-slate-400 font-mono">{unit}</p>}
        {hint && <p className="text-[9px] text-slate-300 italic">{hint}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
}

function NI({ value, onChange, min = 0, max, step = 1, prefix, suffix, disabled }) {
  const [local, setLocal] = useState(String(value));
  useEffect(() => { setLocal(String(value)); }, [value]);
  const commit = (raw) => {
    let n = parseFloat(raw);
    if (isNaN(n) || raw === "") n = (min !== undefined && min > 0) ? min : 0;
    if (min !== undefined) n = Math.max(min, n);
    if (max !== undefined) n = Math.min(max, n);
    setLocal(String(n));
    onChange(n);
  };
  return (
    <div className={`relative ${disabled ? "opacity-40 pointer-events-none" : ""}`}>
      {prefix && <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">{prefix}</span>}
      <input
        type="number" value={local} min={min} max={max} step={step}
        onChange={e => { setLocal(e.target.value); const n = parseFloat(e.target.value); if (!isNaN(n)) onChange(n); }}
        onBlur={e => commit(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter") commit(e.target.value); }}
        className={`w-full h-8 border border-slate-200 rounded-lg text-sm font-mono text-slate-800 bg-white
          focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-100 transition
          ${prefix ? "pl-6 pr-2" : suffix ? "pl-3 pr-8" : "px-3"}`}
      />
      {suffix && <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">{suffix}</span>}
    </div>
  );
}

function Toggle({ enabled, onToggle, labelOn = "Enabled", labelOff = "Disabled", colorOn = "bg-blue-600 border-blue-600 text-white" }) {
  return (
    <button onClick={onToggle}
      className={`w-full h-8 rounded-lg text-xs font-semibold border transition
        ${enabled ? colorOn : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"}`}>
      {enabled ? labelOn : labelOff}
    </button>
  );
}

function ModeToggle({ value, onChange }) {
  const opts = [
    { v: "b2c",  label: "B2C",  activeClass: "bg-emerald-500 border-emerald-500 text-white" },
    { v: "both", label: "Both", activeClass: "bg-violet-600 border-violet-600 text-white" },
    { v: "b2b",  label: "B2B",  activeClass: "bg-blue-600 border-blue-600 text-white" },
  ];
  return (
    <div className="flex rounded-lg overflow-hidden border border-slate-200 h-7">
      {opts.map(({ v, label, activeClass }) => (
        <button key={v} onClick={() => onChange(v)}
          className={`flex-1 text-[10px] font-bold uppercase tracking-wide transition border-r last:border-r-0 border-slate-200
            ${value === v ? activeClass : "bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-600"}`}>
          {label}
        </button>
      ))}
    </div>
  );
}

function AutoBadge() {
  return (
    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider
      bg-teal-50 text-teal-600 border border-teal-200 rounded px-1.5 py-0.5 ml-1.5">
      auto
    </span>
  );
}

function DerivedRow({ label, formula, value, highlight }) {
  return (
    <div className={`flex justify-between items-center py-1 border-b border-slate-100 last:border-0 ${highlight ? "bg-teal-50 -mx-1 px-1 rounded" : ""}`}>
      <div>
        <p className="text-[10px] text-slate-500">{label}</p>
        {formula && <p className="text-[9px] text-slate-300 font-mono">{formula}</p>}
      </div>
      <p className={`text-[10px] font-mono font-semibold ml-2 whitespace-nowrap ${highlight ? "text-teal-800" : "text-teal-700"}`}>{value}</p>
    </div>
  );
}

// ─── Packaging Detail Panel ───────────────────────────────────────────────────
function PackagingDetailPanel({ pkgBreakdown, pkgShoePerOrder, a }) {
  if (!pkgBreakdown) return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
      <p className="text-xs text-slate-400 italic">No B2C machines assigned — packaging cost is ₹0</p>
    </div>
  );
  const ironPct = a.pkgLaundryIronPct || 60;
  const foldPct = a.pkgLaundryFoldPct || 40;
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
        <FiPackage size={13} className="text-orange-500" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Packaging Cost Breakdown</p>
        <AutoBadge />
        <span className="ml-auto text-[9px] bg-orange-50 text-orange-500 border border-orange-100 rounded px-1.5 py-0.5 font-semibold">B2C Only</span>
      </div>
      <div className="p-4 space-y-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">👔 Wash & Iron ({ironPct}% of laundry)</p>
            <span className="text-[9px] bg-white text-emerald-700 border border-emerald-200 rounded px-2 py-0.5 font-mono font-bold">₹{pkgBreakdown.ironCostPerKg}/KG</span>
          </div>
          <div className="space-y-0">
            <DerivedRow label="Laundry kg allocated (W&I)" formula={`total laundry × ${ironPct}%`} value={`${pkgBreakdown.ironKg} kg`} />
            <DerivedRow label="Clothes count" formula={`${pkgBreakdown.ironKg} kg × ${a.pkgWashIronClothesPerKg} clothes/kg`} value={`${pkgBreakdown.ironClothes} clothes`} />
            <DerivedRow label="Bags needed" formula={`ceil(${pkgBreakdown.ironClothes} ÷ ${a.pkgWashIronClothesPerBag} clothes/bag)`} value={`${pkgBreakdown.ironBagsNeeded} bags`} />
            <DerivedRow label="Packaging cost" formula={`${pkgBreakdown.ironBagsNeeded} bags × ₹${a.pkgWashIronBagCost}/bag`} value={`₹${pkgBreakdown.ironCost}`} highlight />
            <DerivedRow label="Cost per KG" formula={`₹${pkgBreakdown.ironCost} ÷ ${pkgBreakdown.ironKg} kg`} value={`₹${pkgBreakdown.ironCostPerKg}/KG`} />
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-700">🧺 Wash & Fold ({foldPct}% of laundry)</p>
            <span className="text-[9px] bg-white text-blue-700 border border-blue-200 rounded px-2 py-0.5 font-mono font-bold">₹{pkgBreakdown.foldCostPerKg}/KG</span>
          </div>
          <div className="space-y-0">
            <DerivedRow label="Laundry kg allocated (W&F)" formula={`total laundry × ${foldPct}%`} value={`${pkgBreakdown.foldKg} kg`} />
            <DerivedRow label="Bags needed" formula={`ceil(${pkgBreakdown.foldKg} kg ÷ ${a.pkgWashFoldKgPerBag} kg/bag)`} value={`${pkgBreakdown.foldBagsNeeded} bags`} />
            <DerivedRow label="Packaging cost" formula={`${pkgBreakdown.foldBagsNeeded} bags × ₹${a.pkgWashFoldBagCost}/bag`} value={`₹${pkgBreakdown.foldCost}`} highlight />
            <DerivedRow label="Cost per KG" formula={`₹${pkgBreakdown.foldCost} ÷ ${pkgBreakdown.foldKg} kg`} value={`₹${pkgBreakdown.foldCostPerKg}/KG`} />
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700">🥼 Dry Clean (per garment)</p>
            <span className="text-[9px] bg-white text-amber-700 border border-amber-200 rounded px-2 py-0.5 font-mono font-bold">₹{pkgBreakdown.dcCostPerKgEquiv}/KG equiv</span>
          </div>
          <div className="bg-white border border-amber-100 rounded-lg p-2 mb-2">
            <p className="text-[9px] font-bold uppercase tracking-widest text-amber-600 mb-1.5">Material cost per garment</p>
            {[
              { l: "Printed Polythene", v: a.pkgDcPolythene  },
              { l: "Collar Support",    v: a.pkgDcCollar      },
              { l: "Printed Cardboard", v: a.pkgDcCardboard   },
              { l: "Clipping",          v: a.pkgDcClipping    },
              { l: "White Paper",       v: a.pkgDcWhitePaper  },
            ].map(({ l, v }) => (
              <div key={l} className="flex justify-between border-b border-amber-50 last:border-0 py-0.5">
                <span className="text-[10px] text-slate-500">{l}</span>
                <span className="text-[10px] font-mono text-slate-700">₹{v}</span>
              </div>
            ))}
            <div className="flex justify-between pt-1 mt-1 border-t border-amber-200">
              <span className="text-[10px] font-bold text-amber-700">Total per garment</span>
              <span className="text-[10px] font-mono font-bold text-amber-800">₹{pkgBreakdown.pkgDcPerGarment}</span>
            </div>
          </div>
          <div className="space-y-0">
            <DerivedRow label="DC garments this month" formula={`${pkgBreakdown.dcGarments / a.pkgDcGarmentsPerKg | 0} kg × ${a.pkgDcGarmentsPerKg} garments/kg`} value={`${pkgBreakdown.dcGarments} garments`} />
            <DerivedRow label="DC packaging cost" formula={`${pkgBreakdown.dcGarments} garments × ₹${pkgBreakdown.pkgDcPerGarment}/garment`} value={`₹${pkgBreakdown.dcCost}`} highlight />
            <DerivedRow label="Cost per KG equivalent" formula={`₹${pkgBreakdown.dcCost} ÷ ${(pkgBreakdown.dcGarments / a.pkgDcGarmentsPerKg).toFixed(2)} kg`} value={`₹${pkgBreakdown.dcCostPerKgEquiv}/KG`} />
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">👟 Shoe Dry Clean (piece-based · informational)</p>
          <div className="bg-white border border-slate-100 rounded-lg p-2 mb-2">
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Material cost per shoe order</p>
            {[
              { l: "Printed Polythene", v: a.pkgShoePolythene  },
              { l: "Printed Cardboard", v: a.pkgShoeCardboard  },
              { l: "White Paper",       v: a.pkgShoeWhitePaper },
            ].map(({ l, v }) => (
              <div key={l} className="flex justify-between border-b border-slate-50 last:border-0 py-0.5">
                <span className="text-[10px] text-slate-500">{l}</span>
                <span className="text-[10px] font-mono text-slate-700">₹{v}</span>
              </div>
            ))}
            <div className="flex justify-between pt-1 mt-1 border-t border-slate-200">
              <span className="text-[10px] font-bold text-slate-700">Total per shoe order</span>
              <span className="text-[10px] font-mono font-bold text-slate-800">₹{pkgShoePerOrder.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-[9px] text-slate-400 italic">Shoe packaging is piece-based — not included in monthly KG cost.</p>
        </div>
        <div className="bg-orange-50 border border-orange-300 rounded-xl p-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-orange-700 mb-2">📦 Monthly Packaging Cost Summary</p>
          <div className="space-y-1">
            {[
              { l: "Wash & Iron packaging", v: `₹${pkgBreakdown.ironCost}` },
              { l: "Wash & Fold packaging", v: `₹${pkgBreakdown.foldCost}` },
              { l: "Dry Clean packaging",   v: `₹${pkgBreakdown.dcCost}`   },
            ].map(({ l, v }) => (
              <div key={l} className="flex justify-between border-b border-orange-100 last:border-0 py-1">
                <span className="text-[10px] text-orange-700">{l}</span>
                <span className="text-[10px] font-mono font-semibold text-slate-700">{v}</span>
              </div>
            ))}
            <div className="flex justify-between pt-2 mt-1 border-t border-orange-300">
              <span className="text-sm font-bold text-orange-800">Total Monthly Packaging</span>
              <span className="text-sm font-mono font-bold text-orange-800">₹{pkgBreakdown.total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Machine Setup Panel ──────────────────────────────────────────────────────
function MachineSetupPanel({ assumptions, set }) {
  const a = assumptions;
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-1">
      <div className="px-3 py-2.5 bg-slate-50 border-b border-slate-100">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Machine setup</p>
      </div>
      <div className="px-3 py-3 space-y-3">
        <div className="space-y-1.5">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Machine 1</p>
          <FieldRow label="Capacity" unit="kg/cycle"><NI value={a.m1cap} min={0} max={50} step={0.5} onChange={v => set("m1cap", v)} /></FieldRow>
          <FieldRow label="Channel" unit="assign to"><ModeToggle value={a.m1mode} onChange={v => set("m1mode", v)} /></FieldRow>
        </div>
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Machine 2</p>
          <FieldRow label="Capacity" unit="kg/cycle"><NI value={a.m2cap} min={0} max={50} step={0.5} onChange={v => set("m2cap", v)} /></FieldRow>
          <FieldRow label="Channel" unit="assign to"><ModeToggle value={a.m2mode} onChange={v => set("m2mode", v)} /></FieldRow>
        </div>
        <div className="pt-2 border-t border-slate-100">
          <FieldRow label="Machine 3" unit="add new machine">
            <Toggle enabled={a.m3enabled} onToggle={() => set("m3enabled", !a.m3enabled)} labelOn="Added ✓" labelOff="+ Add Machine 3" colorOn="bg-violet-600 border-violet-600 text-white" />
          </FieldRow>
          {a.m3enabled && (
            <div className="space-y-1.5 mt-1">
              <FieldRow label="Capacity" unit="kg/cycle"><NI value={a.m3cap} min={0} max={50} step={0.5} onChange={v => set("m3cap", v)} /></FieldRow>
              <FieldRow label="Channel" unit="assign to"><ModeToggle value={a.m3mode} onChange={v => set("m3mode", v)} /></FieldRow>
            </div>
          )}
        </div>
        {a.m3enabled && (
          <div className="pt-2 border-t border-slate-100">
            <FieldRow label="Machine 4" unit="add new machine">
              <Toggle enabled={a.m4enabled} onToggle={() => set("m4enabled", !a.m4enabled)} labelOn="Added ✓" labelOff="+ Add Machine 4" colorOn="bg-violet-600 border-violet-600 text-white" />
            </FieldRow>
            {a.m4enabled && (
              <div className="space-y-1.5 mt-1">
                <FieldRow label="Capacity" unit="kg/cycle"><NI value={a.m4cap} min={0} max={50} step={0.5} onChange={v => set("m4cap", v)} /></FieldRow>
                <FieldRow label="Channel" unit="assign to"><ModeToggle value={a.m4mode} onChange={v => set("m4mode", v)} /></FieldRow>
              </div>
            )}
          </div>
        )}
        {a.m4enabled && (
          <div className="pt-2 border-t border-slate-100">
            <FieldRow label="Machine 5" unit="add new machine">
              <Toggle enabled={a.m5enabled} onToggle={() => set("m5enabled", !a.m5enabled)} labelOn="Added ✓" labelOff="+ Add Machine 5" colorOn="bg-violet-600 border-violet-600 text-white" />
            </FieldRow>
            {a.m5enabled && (
              <div className="space-y-1.5 mt-1">
                <FieldRow label="Capacity" unit="kg/cycle"><NI value={a.m5cap} min={0} max={50} step={0.5} onChange={v => set("m5cap", v)} /></FieldRow>
                <FieldRow label="Channel" unit="assign to"><ModeToggle value={a.m5mode} onChange={v => set("m5mode", v)} /></FieldRow>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Water Consumption Panel ──────────────────────────────────────────────────
function WaterConsumptionPanel({ machineElecBreakdown, workdays, waterRate }) {
  const enabledMachines = machineElecBreakdown.map((mb, i) => mb ? { ...mb, index: i } : null).filter(Boolean);
  const [selectedMachine, setSelectedMachine] = useState("all");
  if (enabledMachines.length === 0) return null;

  const viewMachines = selectedMachine === "all" ? enabledMachines : enabledMachines.filter(m => m.index === selectedMachine);
  const agg = viewMachines.reduce((acc, mb) => ({
    totalCyc:         acc.totalCyc         + mb.totalCyc,
    dailyCycles:      acc.dailyCycles      + mb.dailyCycles,
    dailyWaterL:      acc.dailyWaterL      + mb.dailyWaterL,
    dailyWaterCost:   acc.dailyWaterCost   + mb.dailyWaterCost,
    monthlyWaterL:    acc.monthlyWaterL    + mb.monthlyWaterL,
    machineWaterCost: acc.machineWaterCost + mb.machineWaterCost,
  }), { totalCyc: 0, dailyCycles: 0, dailyWaterL: 0, dailyWaterCost: 0, monthlyWaterL: 0, machineWaterCost: 0 });

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FiDroplet size={13} className="text-teal-500" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Water Consumption</p>
          <AutoBadge />
        </div>
        <div className="flex rounded-lg overflow-hidden border border-slate-200 h-7">
          <button onClick={() => setSelectedMachine("all")}
            className={`px-3 text-[10px] font-bold uppercase tracking-wide border-r border-slate-200 transition ${selectedMachine === "all" ? "bg-teal-500 text-white" : "bg-white text-slate-400 hover:bg-slate-50"}`}>
            All
          </button>
          {enabledMachines.map(mb => (
            <button key={mb.index} onClick={() => setSelectedMachine(mb.index)}
              className={`px-3 text-[10px] font-bold uppercase tracking-wide border-r last:border-r-0 border-slate-200 transition ${selectedMachine === mb.index ? "bg-teal-500 text-white" : "bg-white text-slate-400 hover:bg-slate-50"}`}>
              M{mb.index + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="px-4 pt-3 pb-1 space-y-3">
        {viewMachines.map(mb => (
          <div key={mb.index} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Machine {mb.index + 1} — {mb.specLabel}</p>
              <span className="text-[9px] bg-blue-50 text-blue-500 border border-blue-100 rounded px-1.5 py-0.5 font-semibold uppercase tracking-wide">{mb.waterPerCycle}L · {mb.practicalLoad}KG load</span>
            </div>
            <div className="space-y-0">
              <DerivedRow label="Step 1 · Water per cycle"  value={`${mb.waterPerCycle} L`} />
              <DerivedRow label="Step 2 · Water per KG"     formula={`${mb.waterPerCycle} ÷ ${mb.practicalLoad}`}              value={`${fmtDec(mb.waterPerKg, 3)} L/KG`} />
              <DerivedRow label="Step 3 · Water cost/KG"    formula={`${fmtDec(mb.waterPerKg,3)} × ₹${waterRate}`}            value={`₹${fmtDec(mb.waterCostPerKg, 2)}/KG`} />
              <DerivedRow label="Step 4 · Daily water"      formula={`${mb.waterPerCycle}L × ${mb.dailyCycles} cycles`}        value={`${fmtDec(mb.dailyWaterL,0)} L/day`} />
              <DerivedRow label="Step 5 · Daily cost"       formula={`${fmtDec(mb.dailyWaterL,0)} × ₹${waterRate}`}           value={`₹${fmtDec(mb.dailyWaterCost,2)}/day`} />
              <DerivedRow label="Step 6 · Monthly water"    formula={`${mb.waterPerCycle}L × ${mb.totalCyc} cycles`}           value={`${fmt(mb.monthlyWaterL)} L/mo`} />
              <DerivedRow label="Step 7 · Monthly cost"     formula={`${fmt(mb.monthlyWaterL)}L × ₹${waterRate}`}              value={fmtR(mb.machineWaterCost)} />
            </div>
          </div>
        ))}
      </div>
      {selectedMachine === "all" && viewMachines.length > 1 && (
        <div className="mx-4 mb-3 mt-1 bg-teal-50 border border-teal-200 rounded-xl p-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-teal-600 mb-2">Combined — All Machines</p>
          {[
            { l:"Total monthly cycles", v:`${fmt(agg.totalCyc)} cyc`             },
            { l:"Daily cycles",         v:`${fmt(agg.dailyCycles)} cyc/day`      },
            { l:"Daily water usage",    v:`${fmt(agg.dailyWaterL)} L/day`        },
            { l:"Daily water cost",     v:`₹${fmtDec(agg.dailyWaterCost,2)}/day` },
            { l:"Monthly water usage",  v:`${fmt(agg.monthlyWaterL)} L/mo`       },
            { l:"Monthly water cost",   v:fmtR(agg.machineWaterCost), bold: true },
          ].map(({ l, v, bold }) => (
            <div key={l} className="flex justify-between border-b border-teal-100 last:border-0 py-1">
              <span className="text-[10px] text-teal-600">{l}</span>
              <span className={`text-[10px] font-mono ${bold ? "font-bold text-teal-800" : "font-semibold text-slate-700"}`}>{v}</span>
            </div>
          ))}
        </div>
      )}
      {selectedMachine !== "all" && viewMachines.length === 1 && (() => {
        const mb = viewMachines[0];
        return (
          <div className="mx-4 mb-3 mt-1 grid grid-cols-3 gap-2">
            {[
              { l:"Water/KG",     v:`${fmtDec(mb.waterPerKg,3)} L`    },
              { l:"Cost/KG",      v:`₹${fmtDec(mb.waterCostPerKg,2)}` },
              { l:"Monthly cost", v:fmtR(mb.machineWaterCost)          },
            ].map(({ l, v }) => (
              <div key={l} className="bg-teal-50 border border-teal-100 rounded-lg p-2 text-center">
                <p className="text-[9px] uppercase tracking-widest text-teal-500 mb-0.5">{l}</p>
                <p className="text-xs font-mono font-bold text-teal-800">{v}</p>
              </div>
            ))}
          </div>
        );
      })()}
    </div>
  );
}

// ─── Electricity Consumption Panel ────────────────────────────────────────────
function ElectricityConsumptionPanel({ machineElecBreakdown, elecRate, heaterColdPct, heaterHotPct }) {
  const enabledMachines = machineElecBreakdown.map((mb, i) => mb ? { ...mb, index: i } : null).filter(Boolean);
  const [selectedMachine, setSelectedMachine] = useState("all");
  if (enabledMachines.length === 0) return null;

  const viewMachines = selectedMachine === "all" ? enabledMachines : enabledMachines.filter(m => m.index === selectedMachine);
  const agg = viewMachines.reduce((acc, mb) => ({
    totalCyc:              acc.totalCyc              + mb.totalCyc,
    washerColdMonthlyKwh:  acc.washerColdMonthlyKwh  + mb.washerColdMonthlyKwh,
    washerHotMonthlyKwh:   acc.washerHotMonthlyKwh   + mb.washerHotMonthlyKwh,
    dryerMonthlyKwh:       acc.dryerMonthlyKwh       + mb.dryerMonthlyKwh,
    totalMonthlyKwh:       acc.totalMonthlyKwh       + mb.totalMonthlyKwh,
    washerColdMonthlyCost: acc.washerColdMonthlyCost + mb.washerColdMonthlyCost,
    washerHotMonthlyCost:  acc.washerHotMonthlyCost  + mb.washerHotMonthlyCost,
    dryerMonthlyCost:      acc.dryerMonthlyCost      + mb.dryerMonthlyCost,
    machineTotalCost:      acc.machineTotalCost      + mb.machineTotalCost,
  }), { totalCyc:0, washerColdMonthlyKwh:0, washerHotMonthlyKwh:0, dryerMonthlyKwh:0, totalMonthlyKwh:0, washerColdMonthlyCost:0, washerHotMonthlyCost:0, dryerMonthlyCost:0, machineTotalCost:0 });

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FiZap size={13} className="text-amber-500" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Electricity Consumption</p>
          <AutoBadge />
        </div>
        <div className="flex rounded-lg overflow-hidden border border-slate-200 h-7">
          <button onClick={() => setSelectedMachine("all")}
            className={`px-3 text-[10px] font-bold uppercase tracking-wide border-r border-slate-200 transition ${selectedMachine === "all" ? "bg-amber-500 text-white" : "bg-white text-slate-400 hover:bg-slate-50"}`}>
            All
          </button>
          {enabledMachines.map(mb => (
            <button key={mb.index} onClick={() => setSelectedMachine(mb.index)}
              className={`px-3 text-[10px] font-bold uppercase tracking-wide border-r last:border-r-0 border-slate-200 transition ${selectedMachine === mb.index ? "bg-amber-500 text-white" : "bg-white text-slate-400 hover:bg-slate-50"}`}>
              M{mb.index + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="px-4 pt-3 pb-2 space-y-4">
        {viewMachines.map(mb => (
          <div key={mb.index}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Machine {mb.index + 1} — {mb.specLabel}</p>
              <span className="text-[9px] bg-amber-50 text-amber-600 border border-amber-100 rounded px-1.5 py-0.5 font-semibold uppercase tracking-wide">{mb.totalCyc} cyc/mo</span>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl overflow-hidden mb-2">
              <table className="w-full text-[10px]">
                <thead>
                  <tr className="bg-amber-100/60 border-b border-amber-200">
                    <th className="px-3 py-1.5 text-left text-[9px] uppercase tracking-widest text-amber-700 font-bold">Type</th>
                    <th className="px-3 py-1.5 text-right text-[9px] uppercase tracking-widest text-amber-700 font-bold">Cycles/day</th>
                    <th className="px-3 py-1.5 text-right text-[9px] uppercase tracking-widest text-amber-700 font-bold">Wattage</th>
                    <th className="px-3 py-1.5 text-right text-[9px] uppercase tracking-widest text-amber-700 font-bold">kWh/day</th>
                    <th className="px-3 py-1.5 text-right text-[9px] uppercase tracking-widest text-amber-700 font-bold">kWh/month</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-amber-100">
                    <td className="px-3 py-1.5 text-blue-700 font-semibold">🫧 Cold wash</td>
                    <td className="px-3 py-1.5 text-right font-mono text-slate-700">{mb.coldCyclesDay.toFixed(2)}</td>
                    <td className="px-3 py-1.5 text-right font-mono text-slate-700">{(mb.washerColdKw * 1000).toFixed(0)} W</td>
                    <td className="px-3 py-1.5 text-right font-mono text-slate-700">{fmtDec(mb.washerColdDailyKwh, 3)}</td>
                    <td className="px-3 py-1.5 text-right font-mono text-slate-700">{fmtDec(mb.washerColdMonthlyKwh, 2)}</td>
                  </tr>
                  <tr className="border-b border-amber-100">
                    <td className="px-3 py-1.5 text-orange-700 font-semibold">🔥 Hot wash</td>
                    <td className="px-3 py-1.5 text-right font-mono text-slate-700">{mb.hotCyclesDay.toFixed(2)}</td>
                    <td className="px-3 py-1.5 text-right font-mono text-slate-700">{(mb.washerHotKw * 1000).toFixed(0)} W</td>
                    <td className="px-3 py-1.5 text-right font-mono text-slate-700">{fmtDec(mb.washerHotDailyKwh, 3)}</td>
                    <td className="px-3 py-1.5 text-right font-mono text-slate-700">{fmtDec(mb.washerHotMonthlyKwh, 2)}</td>
                  </tr>
                  <tr className="border-b border-amber-100">
                    <td className="px-3 py-1.5 text-violet-700 font-semibold">🌀 Dryer</td>
                    <td className="px-3 py-1.5 text-right font-mono text-slate-700">{mb.dryerCyclesDay.toFixed(0)}</td>
                    <td className="px-3 py-1.5 text-right font-mono text-slate-700">{(mb.dryerKw * 1000).toFixed(0)} W</td>
                    <td className="px-3 py-1.5 text-right font-mono text-slate-700">{fmtDec(mb.dryerDailyKwh, 3)}</td>
                    <td className="px-3 py-1.5 text-right font-mono text-slate-700">{fmtDec(mb.dryerMonthlyKwh, 2)}</td>
                  </tr>
                  <tr className="bg-amber-100/60 font-bold">
                    <td className="px-3 py-1.5 text-amber-800">Total</td>
                    <td className="px-3 py-1.5 text-right font-mono text-amber-800">{mb.dryerCyclesDay.toFixed(0)}</td>
                    <td className="px-3 py-1.5 text-right font-mono text-amber-800">—</td>
                    <td className="px-3 py-1.5 text-right font-mono text-amber-800">{fmtDec(mb.totalDailyKwh, 3)}</td>
                    <td className="px-3 py-1.5 text-right font-mono text-amber-800">{fmtDec(mb.totalMonthlyKwh, 2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-2">
              <p className="text-[10px] font-mono text-amber-800 text-center font-semibold">
                {fmtDec(mb.totalMonthlyKwh, 2)} units × ₹{elecRate} = <strong>{fmtR(mb.machineTotalCost)}/month</strong>
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-2 text-center">
                <p className="text-[8px] uppercase tracking-widest text-blue-500 mb-0.5">Cold wash cost</p>
                <p className="text-[11px] font-mono font-bold text-blue-700">{fmtR(mb.washerColdMonthlyCost)}</p>
              </div>
              <div className="bg-orange-50 border border-orange-100 rounded-lg p-2 text-center">
                <p className="text-[8px] uppercase tracking-widest text-orange-500 mb-0.5">Hot wash cost</p>
                <p className="text-[11px] font-mono font-bold text-orange-600">{fmtR(mb.washerHotMonthlyCost)}</p>
              </div>
              <div className="bg-violet-50 border border-violet-100 rounded-lg p-2 text-center">
                <p className="text-[8px] uppercase tracking-widest text-violet-500 mb-0.5">Dryer cost</p>
                <p className="text-[11px] font-mono font-bold text-violet-600">{fmtR(mb.dryerMonthlyCost)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {viewMachines.length > 1 && (
        <div className="mx-4 mb-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-2">Combined — All Machines</p>
          <div className="space-y-1 mb-2">
            {[
              { l:"Cold wash total", v:`${fmtDec(agg.washerColdMonthlyKwh,2)} kWh → ${fmtR(agg.washerColdMonthlyCost)}` },
              { l:"Hot wash total",  v:`${fmtDec(agg.washerHotMonthlyKwh,2)} kWh → ${fmtR(agg.washerHotMonthlyCost)}`  },
              { l:"Dryer total",     v:`${fmtDec(agg.dryerMonthlyKwh,2)} kWh → ${fmtR(agg.dryerMonthlyCost)}`          },
            ].map(({ l, v }) => (
              <div key={l} className="flex justify-between border-b border-amber-100 last:border-0 py-1">
                <span className="text-[10px] text-amber-600">{l}</span>
                <span className="text-[10px] font-mono font-semibold text-slate-700">{v}</span>
              </div>
            ))}
          </div>
          <div className="bg-amber-100/60 rounded-lg px-3 py-2 text-center border border-amber-200">
            <p className="text-[10px] font-mono text-amber-800 font-semibold">
              {fmtDec(agg.totalMonthlyKwh, 2)} units × ₹{elecRate} = <strong>{fmtR(agg.machineTotalCost)}/month</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Machine Recommendation ───────────────────────────────────────────────────
function MachineRecommendation({ assumptions }) {
  const demand = assumptions.dailyKgDemand || 0;
  if (demand <= 0) return null;
  const hostelW       = (assumptions.hostelPct || 0) / 100;
  const hotelW        = (assumptions.hotelPct  || 0) / 100;
  const hostelDailyKg = demand * hostelW;
  const hotelDailyKg  = demand * hotelW;
  const hostelCycles  = (hostelW * B2B_DAY_MINS) / B2B_CLIENTS.hostel.cycleMins;
  const hotelCycles   = (hotelW  * B2B_DAY_MINS) / B2B_CLIENTS.hotel.cycleMins;
  const blendedCycles = hostelCycles + hotelCycles;
  const kgPerMachineDay = Math.round(blendedCycles * assumptions.m1cap);
  const machinesNeeded  = demand > 0 ? Math.ceil(demand / kgPerMachineDay) : 0;
  const canHandle = (() => {
    const modes = [assumptions.m1mode, assumptions.m2mode,
      ...(assumptions.m3enabled ? [assumptions.m3mode] : []),
      ...(assumptions.m4enabled ? [assumptions.m4mode] : []),
      ...(assumptions.m5enabled ? [assumptions.m5mode] : [])];
    return modes.filter(machineDoesB2B).length;
  })();
  const status = canHandle >= machinesNeeded ? "ok" : "warn";
  return (
    <div className={`rounded-xl border p-3 mt-1 ${status === "ok" ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
      <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${status === "ok" ? "text-emerald-600" : "text-amber-600"}`}>Machine Recommendation</p>
      <div className="space-y-1.5">
        <div className="flex justify-between"><span className="text-[11px] text-slate-500">Daily demand</span><span className="text-[11px] font-mono font-semibold text-slate-700">{demand} kg</span></div>
        {hostelDailyKg > 0 && <div className="flex justify-between"><span className="text-[11px] text-slate-500">↳ Hostel ({assumptions.hostelPct}%)</span><span className="text-[11px] font-mono text-blue-600">{hostelDailyKg.toFixed(0)} kg</span></div>}
        {hotelDailyKg  > 0 && <div className="flex justify-between"><span className="text-[11px] text-slate-500">↳ Hotel ({assumptions.hotelPct}%)</span><span className="text-[11px] font-mono text-violet-600">{hotelDailyKg.toFixed(0)} kg</span></div>}
        <div className="flex justify-between pt-1 border-t border-slate-200"><span className="text-[11px] text-slate-500">kg/machine/day (blended)</span><span className="text-[11px] font-mono text-slate-700">~{kgPerMachineDay} kg</span></div>
        <div className={`flex justify-between font-semibold ${status === "ok" ? "text-emerald-700" : "text-amber-700"}`}><span className="text-[11px]">Machines needed (B2B)</span><span className="text-[11px] font-mono">{machinesNeeded}</span></div>
        <div className="flex justify-between"><span className="text-[11px] text-slate-500">B2B machines assigned</span><span className="text-[11px] font-mono text-slate-700">{canHandle}</span></div>
      </div>
      <p className={`text-[10px] mt-2 font-medium ${status === "ok" ? "text-emerald-600" : "text-amber-600"}`}>
        {status === "ok" ? `✓ Current setup can handle ${demand} kg/day` : `⚠ Need ${machinesNeeded - canHandle} more B2B machine${machinesNeeded - canHandle > 1 ? "s" : ""} — set mode to B2B or Both`}
      </p>
    </div>
  );
}

// ─── Edit Configuration Modal ─────────────────────────────────────────────────
function ConfigModal({ assumptions, set, onClose, hasB2B }) {
  const a = assumptions;
  const splitTotal    = a.laundrySplit + a.dcSplit;
  const splitWarn     = Math.abs(splitTotal - 100) > 0.1;
  const ironFoldTotal = (a.pkgLaundryIronPct || 0) + (a.pkgLaundryFoldPct || 0);
  const ironFoldWarn  = Math.abs(ironFoldTotal - 100) > 0.1;

  const cycleHr        = a.cycleMins / 60;
  const m10_cold_kwh   = (a.m10_washerColdKw * cycleHr).toFixed(4);
  const m10_hot_kwh    = (a.m10_washerHotKw  * cycleHr).toFixed(4);
  const m10_dry_kwh    = (a.m10_dryerKw      * cycleHr).toFixed(4);
  const m15_cold_kwh   = (a.m15_washerColdKw * cycleHr).toFixed(4);
  const m15_hot_kwh    = (a.m15_washerHotKw  * cycleHr).toFixed(4);
  const m15_dry_kwh    = (a.m15_dryerKw      * cycleHr).toFixed(4);
  const m10_waterPerKg = (a.water10kg / a.practicalLoad10kg).toFixed(3);
  const m10_costPerKg  = (a.water10kg / a.practicalLoad10kg * a.waterRate).toFixed(2);
  const m15_waterPerKg = (a.water15kg / a.practicalLoad15kg).toFixed(3);
  const m15_costPerKg  = (a.water15kg / a.practicalLoad15kg * a.waterRate).toFixed(2);

  const dcPerGarment   = (a.pkgDcPolythene||0) + (a.pkgDcCollar||0) + (a.pkgDcCardboard||0) + (a.pkgDcClipping||0) + (a.pkgDcWhitePaper||0);
  const shoePerOrder   = (a.pkgShoePolythene||0) + (a.pkgShoeCardboard||0) + (a.pkgShoeWhitePaper||0);
  const ironCostPerKg  = ((a.pkgWashIronBagCost||5) * (a.pkgWashIronClothesPerKg||4)) / (a.pkgWashIronClothesPerBag||12);
  const foldCostPerKg  = (a.pkgWashFoldBagCost||5) / (a.pkgWashFoldKgPerBag||6);
  const dcCostPerKgEquiv = dcPerGarment * (a.pkgDcGarmentsPerKg||3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(15,23,42,0.55)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-shrink-0">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Pricing, rates & packaging</p>
            <p className="text-base font-semibold text-slate-800 mt-0.5">Edit Configuration</p>
          </div>
          <button onClick={onClose} className="h-8 w-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition"><FiX size={16} /></button>
        </div>
        <div className="overflow-y-auto flex-1 px-5 py-4">

          <SectionDivider>Operations</SectionDivider>
          <FieldRow label="Working days / month" unit="days"><NI value={a.workdays} min={1} max={31} onChange={v => set("workdays", v)} /></FieldRow>

          <SectionDivider>B2C pricing</SectionDivider>
          <FieldRow label="B2C laundry price" unit="₹ / kg"><NI value={a.b2cPrice} min={1} prefix="₹" onChange={v => set("b2cPrice", v)} /></FieldRow>
          <FieldRow label="Dry clean price" unit="₹ / kg"><NI value={a.dcPrice} min={1} prefix="₹" onChange={v => set("dcPrice", v)} /></FieldRow>
          <FieldRow label="Garments per kg" unit="pcs / kg"><NI value={a.gpkg} min={1} step={0.5} onChange={v => set("gpkg", v)} /></FieldRow>
          <div className="bg-slate-50 rounded-xl p-3 mb-2 border border-slate-100">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">B2C revenue split</p>
            <div className="grid grid-cols-2 gap-2 mb-1">
              <div>
                <p className="text-[10px] text-slate-500 mb-1">Laundry split %</p>
                <NI value={a.laundrySplit} min={0} max={100} step={0.01} onChange={v => set("laundrySplit", v)} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 mb-1">Dry clean split %</p>
                <NI value={a.dcSplit} min={0} max={100} step={0.01} onChange={v => set("dcSplit", v)} />
              </div>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-[10px] text-slate-400">Total: <span className={`font-mono font-semibold ${Math.abs(splitTotal-100)<0.1?"text-emerald-600":splitTotal>100?"text-red-500":"text-amber-500"}`}>{splitTotal.toFixed(2)}%</span></p>
              {splitWarn && <p className="text-[10px] text-amber-600 flex items-center gap-1"><FiAlertTriangle size={10}/>{splitTotal>100?"Over 100%":"Under 100% — unused capacity"}</p>}
            </div>
          </div>

          {hasB2B && (<>
            <SectionDivider>B2B pricing</SectionDivider>
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-3 mb-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-1.5">Rates by client type</p>
              {Object.entries(B2B_CLIENTS).map(([key, c]) => {
                const pct = key === "hostel" ? a.hostelPct : a.hotelPct;
                return (
                  <div key={key} className={`flex items-center justify-between py-1.5 border-b border-blue-100 last:border-0 ${pct > 0 ? "" : "opacity-40"}`}>
                    <span className="text-xs text-blue-700 font-semibold">{c.label} {pct}%</span>
                    <span className="text-xs font-mono text-blue-700">₹{c.rate}/kg · {c.cycles} cyc/day</span>
                  </div>
                );
              })}
            </div>
          </>)}

          <SectionDivider>Electricity spec</SectionDivider>
          <FieldRow label="Electricity rate" unit="₹ / unit (kWh)"><NI value={a.elecRate} min={1} step={0.1} prefix="₹" onChange={v => set("elecRate", v)} /></FieldRow>
          <div className="bg-slate-50 rounded-xl p-3 mb-2 border border-slate-100">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Washer heater usage split</p>
            <div className="grid grid-cols-2 gap-2 mb-1">
              <div>
                <p className="text-[10px] text-slate-500 mb-1">🧊 Cold water %</p>
                <NI value={a.heaterColdPct} min={0} max={100} step={0.01} onChange={v => set("heaterColdPct", v)} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 mb-1">🔥 Hot water %</p>
                <NI value={a.heaterHotPct} min={0} max={100} step={0.01} onChange={v => set("heaterHotPct", v)} />
              </div>
            </div>
            <div className="flex rounded-lg overflow-hidden h-5 mt-2 mb-1">
              {a.heaterColdPct > 0 && <div className="bg-blue-400 flex items-center justify-center transition-all" style={{width:`${a.heaterColdPct}%`}}><span className="text-[9px] font-bold text-white truncate px-1">Cold {a.heaterColdPct}%</span></div>}
              {a.heaterHotPct  > 0 && <div className="bg-orange-400 flex items-center justify-center transition-all" style={{width:`${a.heaterHotPct}%`}}><span className="text-[9px] font-bold text-white truncate px-1">Hot {a.heaterHotPct}%</span></div>}
            </div>
            <div className="flex gap-1.5 flex-wrap mt-2">
              {[[100,0],[83.33,16.67],[70,30],[50,50],[0,100]].map(([cold,hot]) => (
                <button key={cold} onClick={() => { set("heaterColdPct", cold); set("heaterHotPct", hot); }}
                  className={`text-[10px] font-semibold px-2 py-1 rounded-lg border transition ${Math.abs(a.heaterColdPct-cold)<0.1?"bg-slate-700 text-white border-slate-700":"bg-white text-slate-500 border-slate-200 hover:border-slate-300"}`}>
                  {cold}:{hot}
                </button>
              ))}
            </div>
          </div>
          <FieldRow label="Cycle duration" unit="minutes per cycle"><NI value={a.cycleMins} min={10} max={120} step={1} suffix="min" onChange={v => set("cycleMins", v)} /></FieldRow>
          <div className="grid grid-cols-2 gap-3 mb-1">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">10 KG Machine</p>
              <FieldRow label="Washer (cold)" unit="motor only · kW"><NI value={a.m10_washerColdKw} min={0.1} step={0.05} suffix="kW" onChange={v => set("m10_washerColdKw", v)} /></FieldRow>
              <FieldRow label="Washer (hot)" unit="motor+heater · kW"><NI value={a.m10_washerHotKw} min={0.1} step={0.05} suffix="kW" onChange={v => set("m10_washerHotKw", v)} /></FieldRow>
              <FieldRow label="Dryer" unit="kW"><NI value={a.m10_dryerKw} min={0.05} step={0.05} suffix="kW" onChange={v => set("m10_dryerKw", v)} /></FieldRow>
              <div className="mt-2 pt-2 border-t border-slate-200 text-[9px] text-slate-400 font-mono"><p>Cold: {m10_cold_kwh} · Hot: {m10_hot_kwh} · Dry: {m10_dry_kwh} kWh/cyc</p></div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">15 KG Machine</p>
              <FieldRow label="Washer (cold)" unit="motor only · kW"><NI value={a.m15_washerColdKw} min={0.1} step={0.05} suffix="kW" onChange={v => set("m15_washerColdKw", v)} /></FieldRow>
              <FieldRow label="Washer (hot)" unit="motor+heater · kW"><NI value={a.m15_washerHotKw} min={0.1} step={0.05} suffix="kW" onChange={v => set("m15_washerHotKw", v)} /></FieldRow>
              <FieldRow label="Dryer" unit="kW"><NI value={a.m15_dryerKw} min={0.05} step={0.05} suffix="kW" onChange={v => set("m15_dryerKw", v)} /></FieldRow>
              <div className="mt-2 pt-2 border-t border-slate-200 text-[9px] text-slate-400 font-mono"><p>Cold: {m15_cold_kwh} · Hot: {m15_hot_kwh} · Dry: {m15_dry_kwh} kWh/cyc</p></div>
            </div>
          </div>

          <SectionDivider>Water spec</SectionDivider>
          <FieldRow label="Water rate" unit="₹ / litre"><NI value={a.waterRate} min={0.01} step={0.01} prefix="₹" onChange={v => set("waterRate", v)} /></FieldRow>
          <div className="grid grid-cols-2 gap-3 mb-1">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">10 KG Machine</p>
              <FieldRow label="Water / cycle" unit="65 L full load"><NI value={a.water10kg} min={1} step={1} suffix="L" onChange={v => set("water10kg", v)} /></FieldRow>
              <FieldRow label="Practical load" unit="kg"><NI value={a.practicalLoad10kg} min={1} max={10} step={0.5} suffix="kg" onChange={v => set("practicalLoad10kg", v)} /></FieldRow>
              <div className="mt-2 pt-2 border-t border-slate-200 text-[9px] font-mono">
                <p className="text-slate-400">{a.water10kg} ÷ {a.practicalLoad10kg} = <span className="text-teal-600 font-semibold">{m10_waterPerKg} L/KG</span></p>
                <p className="text-slate-400">{m10_waterPerKg} × ₹{a.waterRate} = <span className="text-teal-600 font-semibold">₹{m10_costPerKg}/KG</span></p>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">15 KG Machine</p>
              <FieldRow label="Water / cycle" unit="95 L full load"><NI value={a.water15kg} min={1} step={1} suffix="L" onChange={v => set("water15kg", v)} /></FieldRow>
              <FieldRow label="Practical load" unit="kg"><NI value={a.practicalLoad15kg} min={1} max={15} step={0.5} suffix="kg" onChange={v => set("practicalLoad15kg", v)} /></FieldRow>
              <div className="mt-2 pt-2 border-t border-slate-200 text-[9px] font-mono">
                <p className="text-slate-400">{a.water15kg} ÷ {a.practicalLoad15kg} = <span className="text-teal-600 font-semibold">{m15_waterPerKg} L/KG</span></p>
                <p className="text-slate-400">{m15_waterPerKg} × ₹{a.waterRate} = <span className="text-teal-600 font-semibold">₹{m15_costPerKg}/KG</span></p>
              </div>
            </div>
          </div>

          <SectionDivider>Detergent</SectionDivider>
          <FieldRow label="Detergent cost" unit="₹ / kg of laundry"><NI value={a.detergentRate} min={0} step={0.5} prefix="₹" onChange={v => set("detergentRate", v)} /></FieldRow>

          <SectionDivider>Packaging — B2C only</SectionDivider>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-2.5 mb-3 flex items-start gap-2">
            <FiPackage size={12} className="text-orange-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-semibold text-orange-700">B2B clients bulk-package themselves — not charged here.</p>
              <p className="text-[9px] text-orange-500 mt-0.5">All packaging costs below apply to B2C orders only.</p>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Laundry service split</p>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <p className="text-[10px] font-semibold text-emerald-700 mb-1">👔 Wash & Iron %</p>
                <NI value={a.pkgLaundryIronPct||60} min={0} max={100} step={1} suffix="%" onChange={v => set("pkgLaundryIronPct", v)} />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-blue-700 mb-1">🧺 Wash & Fold %</p>
                <NI value={a.pkgLaundryFoldPct||40} min={0} max={100} step={1} suffix="%" onChange={v => set("pkgLaundryFoldPct", v)} />
              </div>
            </div>
            <div className="flex rounded-lg overflow-hidden h-5 mb-1">
              {(a.pkgLaundryIronPct||60) > 0 && <div className="bg-emerald-500 flex items-center justify-center transition-all" style={{width:`${a.pkgLaundryIronPct||60}%`}}><span className="text-[9px] font-bold text-white truncate px-1">Iron {a.pkgLaundryIronPct||60}%</span></div>}
              {(a.pkgLaundryFoldPct||40) > 0 && <div className="bg-blue-500 flex items-center justify-center transition-all" style={{width:`${a.pkgLaundryFoldPct||40}%`}}><span className="text-[9px] font-bold text-white truncate px-1">Fold {a.pkgLaundryFoldPct||40}%</span></div>}
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-[10px] text-slate-400">Total: <span className={`font-mono font-semibold ${ironFoldWarn?"text-amber-500":"text-emerald-600"}`}>{ironFoldTotal.toFixed(0)}%</span></p>
              {ironFoldWarn && <p className="text-[10px] text-amber-600 flex items-center gap-1"><FiAlertTriangle size={10}/>{ironFoldTotal>100?"Over 100%":"Should sum to 100%"}</p>}
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">👔 Wash & Iron packaging</p>
              <span className="text-[9px] bg-white text-emerald-700 border border-emerald-200 rounded px-2 py-0.5 font-mono font-bold">≈ ₹{ironCostPerKg.toFixed(2)}/KG</span>
            </div>
            <FieldRow label="Bag cost" unit="₹ per polythene bag" hint="printed medium polythene"><NI value={a.pkgWashIronBagCost} min={0} step={0.5} prefix="₹" onChange={v => set("pkgWashIronBagCost", v)} /></FieldRow>
            <FieldRow label="Max clothes per bag" unit="clothes / bag"><NI value={a.pkgWashIronClothesPerBag} min={1} max={50} step={1} onChange={v => set("pkgWashIronClothesPerBag", v)} /></FieldRow>
            <FieldRow label="Clothes per kg" unit="clothes / kg of laundry"><NI value={a.pkgWashIronClothesPerKg} min={1} max={20} step={0.5} onChange={v => set("pkgWashIronClothesPerKg", v)} /></FieldRow>
            <div className="bg-white border border-emerald-100 rounded-lg p-2 text-[9px] font-mono text-emerald-700 mt-1">₹{a.pkgWashIronBagCost} × {a.pkgWashIronClothesPerKg}/kg ÷ {a.pkgWashIronClothesPerBag}/bag = <strong>₹{ironCostPerKg.toFixed(2)}/KG</strong></div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-700">🧺 Wash & Fold packaging</p>
              <span className="text-[9px] bg-white text-blue-700 border border-blue-200 rounded px-2 py-0.5 font-mono font-bold">≈ ₹{foldCostPerKg.toFixed(2)}/KG</span>
            </div>
            <FieldRow label="Bag cost" unit="₹ per bag" hint="simpler plain bag"><NI value={a.pkgWashFoldBagCost||5} min={0} step={0.5} prefix="₹" onChange={v => set("pkgWashFoldBagCost", v)} /></FieldRow>
            <FieldRow label="KG per bag" unit="kg of clothes per bag"><NI value={a.pkgWashFoldKgPerBag||6} min={0.5} max={20} step={0.5} onChange={v => set("pkgWashFoldKgPerBag", v)} /></FieldRow>
            <div className="bg-white border border-blue-100 rounded-lg p-2 text-[9px] font-mono text-blue-700 mt-1">₹{a.pkgWashFoldBagCost||5} ÷ {a.pkgWashFoldKgPerBag||6} kg/bag = <strong>₹{foldCostPerKg.toFixed(2)}/KG</strong></div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700">🥼 Dry Clean packaging</p>
              <span className="text-[9px] bg-white text-amber-700 border border-amber-200 rounded px-2 py-0.5 font-mono font-bold">₹{dcPerGarment.toFixed(1)}/garment · ₹{dcCostPerKgEquiv.toFixed(1)}/KG</span>
            </div>
            <FieldRow label="Printed Polythene" unit="₹ per garment"><NI value={a.pkgDcPolythene} min={0} step={0.1} prefix="₹" onChange={v => set("pkgDcPolythene", v)} /></FieldRow>
            <FieldRow label="Collar Support" unit="₹ per garment"><NI value={a.pkgDcCollar} min={0} step={0.1} prefix="₹" onChange={v => set("pkgDcCollar", v)} /></FieldRow>
            <FieldRow label="Printed Cardboard" unit="₹ per garment"><NI value={a.pkgDcCardboard} min={0} step={0.1} prefix="₹" onChange={v => set("pkgDcCardboard", v)} /></FieldRow>
            <FieldRow label="Clipping" unit="₹ per garment"><NI value={a.pkgDcClipping} min={0} step={0.1} prefix="₹" onChange={v => set("pkgDcClipping", v)} /></FieldRow>
            <FieldRow label="White Paper" unit="₹ per garment"><NI value={a.pkgDcWhitePaper} min={0} step={0.1} prefix="₹" onChange={v => set("pkgDcWhitePaper", v)} /></FieldRow>
            <FieldRow label="Garments per KG" unit="pcs / kg"><NI value={a.pkgDcGarmentsPerKg} min={1} max={10} step={0.5} onChange={v => set("pkgDcGarmentsPerKg", v)} /></FieldRow>
            <div className="bg-white border border-amber-100 rounded-lg p-2 text-[9px] font-mono text-amber-800 mt-1 space-y-0.5">
              <p>Sum = <strong>₹{dcPerGarment.toFixed(1)}/garment</strong></p>
              <p className="text-amber-600">× {a.pkgDcGarmentsPerKg} garments/kg = <strong>₹{dcCostPerKgEquiv.toFixed(1)}/KG</strong></p>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">👟 Shoe Dry Clean packaging</p>
              <span className="text-[9px] bg-white text-slate-600 border border-slate-200 rounded px-2 py-0.5 font-mono font-bold">₹{shoePerOrder.toFixed(1)}/order</span>
            </div>
            <FieldRow label="Printed Polythene" unit="₹ per shoe order"><NI value={a.pkgShoePolythene||4.6} min={0} step={0.1} prefix="₹" onChange={v => set("pkgShoePolythene", v)} /></FieldRow>
            <FieldRow label="Printed Cardboard" unit="₹ per shoe order"><NI value={a.pkgShoeCardboard||4.0} min={0} step={0.1} prefix="₹" onChange={v => set("pkgShoeCardboard", v)} /></FieldRow>
            <FieldRow label="White Paper" unit="₹ per shoe order"><NI value={a.pkgShoeWhitePaper||1.0} min={0} step={0.1} prefix="₹" onChange={v => set("pkgShoeWhitePaper", v)} /></FieldRow>
            <div className="bg-white border border-slate-200 rounded-lg p-2 text-[9px] font-mono text-slate-600 mt-1">Total = <strong>₹{shoePerOrder.toFixed(1)} per shoe order</strong></div>
          </div>
        </div>
        <div className="px-5 py-4 border-t border-slate-100 flex gap-2 flex-shrink-0">
          <button onClick={onClose} className="flex-1 h-9 bg-slate-800 text-white rounded-xl text-xs font-semibold hover:bg-slate-700 transition">Done</button>
        </div>
      </div>
    </div>
  );
}

// ─── Scenario card ────────────────────────────────────────────────────────────
function ScenarioCard({ scenarioKey, out, active, onClick }) {
  const { seed, totalRev, totalExp, profit, margin, b2cDailyKg, b2cMonthly, dailyRev } = out;
  const st = SS[seed.color];
  const Icon = seed.icon === "up" ? FiTrendingUp : seed.icon === "down" ? FiTrendingDown : FiMinus;
  return (
    <button onClick={() => onClick(scenarioKey)}
      className={`w-full text-left rounded-2xl border-2 overflow-hidden transition-all ${active ? `ring-2 ${st.ring} ring-offset-1 border-transparent` : "border-slate-200 hover:border-slate-300"}`}>
      <div className={`${st.hero} px-4 py-3 flex items-center justify-between`}>
        <div>
          <p className="text-[9px] uppercase tracking-widest text-white/50 mb-0.5">{seed.desc}</p>
          <p className="text-sm font-semibold text-white flex items-center gap-1.5"><Icon size={14}/>{seed.label}</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] text-white/50 uppercase tracking-widest">Monthly revenue</p>
          <p className="text-lg font-mono font-semibold text-white">₹{fmtL(totalRev)} L</p>
        </div>
      </div>
      <div className="bg-white px-4 py-3 grid grid-cols-2 gap-x-4 gap-y-2">
        {[
          { l:"Daily B2C output", v: fmtKg(b2cDailyKg) },
          { l:"Monthly B2C kg",   v: fmtKg(b2cMonthly)  },
          { l:"Daily revenue",    v: fmtR(dailyRev)      },
          { l:"Monthly expenses", v: fmtR(totalExp)      },
          { l:"Net profit",       v: fmtR(profit),  cls: profit >= 0 ? "text-emerald-600" : "text-red-500" },
          { l:"Profit margin",    v: fmtPct(margin), cls: margin >= 20 ? "text-emerald-600" : margin >= 0 ? "text-amber-600" : "text-red-500" },
        ].map(({ l, v, cls }) => (
          <div key={l}><p className="text-[10px] text-slate-400">{l}</p><p className={`text-sm font-mono font-medium ${cls || "text-slate-800"}`}>{v}</p></div>
        ))}
      </div>
    </button>
  );
}

// ─── Detail panel ─────────────────────────────────────────────────────────────
function DetailPanel({ out, assumptions }) {
  const {
    seed, m1daily, m2daily, m3daily, m4daily, m5daily,
    b2cDailyKg, b2bDailyKg, b2cMonthlyCycles, b2bMonthlyCycles, totalMonthlyCycles,
    b2cMonthly, b2bMonthly, b2cActive, b2bActive,
    laundryKg, dcKg, garments, laundryRev, dcRev, b2bRev, totalRev, dailyRev,
    hostelCycles, hotelCycles, hostelMonthly, hotelMonthly, hostelRev, hotelRev,
    electricityCost, machineElecBreakdown, waterCost, detergentCost,
    packagingCostVal, pkgBreakdown, pkgDcPerGarment, pkgShoePerOrder,
    totalExp, profit, margin, revPerKg, expPerKg,
  } = out;
  const a  = assumptions;
  const st = SS[seed.color];
  const b2bCycles = out.b2bClient.cycles;

  const machineSub = (cap, mode) => {
    const parts = [];
    if (machineDoesB2C(mode)) parts.push(`${cap}kg × ${seed.cycles} cyc B2C`);
    if (machineDoesB2B(mode)) parts.push(`${cap}kg × ${b2bCycles} cyc B2B`);
    return parts.join(" + ");
  };
  const combinedSub = [b2cActive?`${seed.cycles} cyc B2C`:null, b2bActive?`${b2bCycles} cyc B2B`:null].filter(Boolean).join(" + ") || "no machines assigned";

  const mc = a.machine_count || 2;
  const enabledMachines = [
    { l:"Machine 1", v:fmtKg(m1daily), sub: machineSub(a.m1cap, a.m1mode) },
    ...(mc >= 2 ? [{ l:"Machine 2", v:fmtKg(m2daily), sub: machineSub(a.m2cap, a.m2mode) }] : []),
    ...(a.m3enabled ? [{ l:"Machine 3", v:fmtKg(m3daily), sub: machineSub(a.m3cap, a.m3mode) }] : []),
    ...(a.m4enabled ? [{ l:"Machine 4", v:fmtKg(m4daily), sub: machineSub(a.m4cap, a.m4mode) }] : []),
    ...(a.m5enabled ? [{ l:"Machine 5", v:fmtKg(m5daily), sub: machineSub(a.m5cap, a.m5mode) }] : []),
    { l:"Combined daily", v:fmtKg(b2cDailyKg+b2bDailyKg), sub: combinedSub },
  ];

  const fixedExpRows = [
    ["Rent", a.rent],
    ...(a.workers || []).map(w => [w.name, w.salary]),
    ["Delivery Vehicle Rent", a.deliveryVehicleRent],
    ["Maintenance",           a.maintenance],
    ["Petty Expenses",        a.misc],
    ["Overtime",              a.overtime],
  ];

  return (
    <div className="space-y-4">
      <div className={`${st.hero} rounded-2xl p-5 relative overflow-hidden`}>
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
        <p className="text-[10px] uppercase tracking-widest text-white/50 mb-2">Total monthly revenue — {seed.label}</p>
        <p className="text-4xl font-mono font-semibold text-white mb-3">₹{fmt(totalRev)}</p>
        <div className="flex flex-wrap gap-6">
          {[
            { l:"In Lakhs",      v:`₹ ${fmtL(totalRev)} L` },
            { l:"Daily revenue", v:fmtR(dailyRev)           },
            { l:"Net Profit",    v:fmtR(profit)             },
            { l:"Margin",        v:fmtPct(margin)           },
          ].map(({ l, v }) => (
            <div key={l}><p className="text-[9px] uppercase tracking-widest text-white/40 mb-0.5">{l}</p><p className="text-sm font-mono font-medium text-white/90">{v}</p></div>
          ))}
        </div>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${Math.min(enabledMachines.length,4)}, 1fr)` }}>
        {enabledMachines.map(({ l, v, sub }) => (
          <div key={l} className="bg-white border border-slate-200 rounded-xl p-3">
            <p className="text-[10px] text-slate-400 mb-1">{l}</p>
            <p className="text-base font-mono font-semibold text-slate-800">{v}</p>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      <WaterConsumptionPanel machineElecBreakdown={machineElecBreakdown} workdays={a.workdays} waterRate={a.waterRate} />
      <ElectricityConsumptionPanel machineElecBreakdown={machineElecBreakdown} elecRate={a.elecRate} heaterColdPct={a.heaterColdPct} heaterHotPct={a.heaterHotPct} />
      <PackagingDetailPanel pkgBreakdown={pkgBreakdown} pkgShoePerOrder={pkgShoePerOrder} a={a} />

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Revenue breakdown</p>
        </div>
        <table className="w-full text-sm">
          <tbody>
            {b2cActive && (<>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-2.5 text-slate-600"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400"/>B2C Laundry ({fmtPct(a.laundrySplit)})</span></td>
                <td className="px-4 py-2.5 text-slate-400 font-mono text-xs text-right">{fmtKg(laundryKg)}</td>
                <td className="px-4 py-2.5 font-mono font-medium text-right">₹ {fmt(laundryRev)}</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-2.5 text-slate-600"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-400"/>B2C Dry Clean ({fmtPct(a.dcSplit)})</span></td>
                <td className="px-4 py-2.5 text-slate-400 font-mono text-xs text-right">{fmt(garments)} garments</td>
                <td className="px-4 py-2.5 font-mono font-medium text-right">₹ {fmt(dcRev)}</td>
              </tr>
            </>)}
            {b2bActive && (<>
              {a.hostelPct > 0 && (
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-2.5 text-slate-600"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-400"/>B2B Hostel ({a.hostelPct}%) · ₹{B2B_CLIENTS.hostel.rate}/kg</span></td>
                  <td className="px-4 py-2.5 text-slate-400 font-mono text-xs text-right">{fmtKg(hostelMonthly)}</td>
                  <td className="px-4 py-2.5 font-mono font-medium text-right text-blue-700">₹ {fmt(hostelRev)}</td>
                </tr>
              )}
              {a.hotelPct > 0 && (
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-2.5 text-slate-600"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-500"/>B2B Hotel ({a.hotelPct}%) · ₹{B2B_CLIENTS.hotel.rate}/kg</span></td>
                  <td className="px-4 py-2.5 text-slate-400 font-mono text-xs text-right">{fmtKg(hotelMonthly)}</td>
                  <td className="px-4 py-2.5 font-mono font-medium text-right text-indigo-700">₹ {fmt(hotelRev)}</td>
                </tr>
              )}
              <tr className="border-b border-slate-100 bg-blue-50/40">
                <td className="px-4 py-2 text-slate-600 pl-8"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"/>B2B Total</span></td>
                <td className="px-4 py-2 text-slate-400 font-mono text-xs text-right">{fmtKg(b2bMonthly)}</td>
                <td className="px-4 py-2 font-mono font-semibold text-right text-blue-800">₹ {fmt(b2bRev)}</td>
              </tr>
            </>)}
            {!b2cActive && !b2bActive && (
              <tr><td colSpan={3} className="px-4 py-4 text-center text-slate-400 text-xs italic">Assign at least one machine to see revenue</td></tr>
            )}
            <tr className="bg-slate-50 font-semibold">
              <td className="px-4 py-2.5 text-slate-800">Total Revenue</td><td/>
              <td className={`px-4 py-2.5 font-mono text-right ${st.text}`}>₹ {fmt(totalRev)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Expense breakdown</p>
          <span className="text-[9px] bg-teal-50 text-teal-600 border border-teal-200 rounded px-1.5 py-0.5 font-bold uppercase tracking-wider">auto-calc</span>
        </div>
        <table className="w-full text-sm">
          <tbody>
            {fixedExpRows.map(([l, v]) => (
              <tr key={l} className="border-b border-slate-100">
                <td className="px-4 py-2.5 text-slate-500">{l}</td>
                <td className="px-4 py-2.5 font-mono text-right text-slate-700">₹ {fmt(v)}</td>
              </tr>
            ))}
            <tr className="border-b border-slate-100 bg-teal-50/40">
              <td className="px-4 py-2.5 text-slate-600">
                <span className="flex items-center gap-1.5"><FiZap size={11} className="text-teal-500"/>Electricity <AutoBadge/></span>
                <p className="text-[9px] text-slate-400 ml-4 mt-0.5">Blended ({fmtPct(a.heaterColdPct)} cold · {fmtPct(a.heaterHotPct)} hot) · {a.cycleMins} min/cycle</p>
              </td>
              <td className="px-4 py-2.5 font-mono font-semibold text-right text-teal-700">₹ {fmt(electricityCost)}</td>
            </tr>
            <tr className="border-b border-slate-100 bg-teal-50/40">
              <td className="px-4 py-2.5 text-slate-600"><span className="flex items-center gap-1.5"><FiDroplet size={11} className="text-teal-500"/>Water <AutoBadge/></span></td>
              <td className="px-4 py-2.5 font-mono font-semibold text-right text-teal-700">₹ {fmt(waterCost)}</td>
            </tr>
            <tr className="border-b border-slate-100 bg-teal-50/40">
              <td className="px-4 py-2.5 text-slate-600"><span className="flex items-center gap-1.5"><FiInfo size={11} className="text-teal-500"/>Detergent <AutoBadge/></span></td>
              <td className="px-4 py-2.5 font-mono font-semibold text-right text-teal-700">₹ {fmt(detergentCost)}</td>
            </tr>
            <tr className="border-b border-slate-100 bg-teal-50/40">
              <td className="px-4 py-2.5 text-slate-600">
                <span className="flex items-center gap-1.5"><FiPackage size={11} className="text-teal-500"/>Packaging <AutoBadge/></span>
                <p className="text-[9px] text-orange-500 font-semibold ml-4 mt-0.5">B2C only · W&I + W&F + DC</p>
                {pkgBreakdown && (
                  <p className="text-[9px] text-slate-300 ml-4 font-mono">Iron ₹{pkgBreakdown.ironCost} · Fold ₹{pkgBreakdown.foldCost} · DC ₹{pkgBreakdown.dcCost}</p>
                )}
              </td>
              <td className="px-4 py-2.5 font-mono font-semibold text-right text-teal-700">₹ {fmt(packagingCostVal)}</td>
            </tr>
            <tr className="bg-slate-50 font-semibold">
              <td className="px-4 py-2.5 text-slate-800">Total Expenses</td>
              <td className="px-4 py-2.5 font-mono text-right text-red-500">₹ {fmt(totalExp)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { l:"Net Profit",     v:fmtR(profit),   cls: profit>=0?"text-emerald-600":"text-red-500" },
          { l:"Profit Margin",  v:fmtPct(margin),  cls: margin>=20?"text-emerald-600":margin>=0?"text-amber-600":"text-red-500" },
          { l:"Revenue per kg", v:fmtR(revPerKg),  cls:"text-slate-800" },
          { l:"Expense per kg", v:fmtR(expPerKg),  cls:"text-slate-800" },
        ].map(({ l, v, cls }) => (
          <div key={l} className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="text-xs text-slate-400 mb-1">{l}</p>
            <p className={`text-xl font-mono font-semibold ${cls}`}>{v}</p>
          </div>
        ))}
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Intermediate calculations</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { l:"Monthly B2C processing",   v:fmtKg(b2cMonthly),               dim:!b2cActive },
            { l:"Monthly B2B processing",   v:fmtKg(b2bMonthly),               dim:!b2bActive },
            { l:"B2C monthly cycles",       v:`${fmt(b2cMonthlyCycles)} cyc`,   dim:!b2cActive },
            { l:"B2B monthly cycles",       v:`${fmt(b2bMonthlyCycles)} cyc`,   dim:!b2bActive },
            { l:"Total monthly cycles",     v:`${fmt(totalMonthlyCycles)} cyc`, dim:false },
            { l:"Electricity cost",         v:`₹ ${fmt(electricityCost)}`,      dim:false },
            { l:"Water cost",               v:`₹ ${fmt(waterCost)}`,            dim:false },
            { l:"Laundry qty (B2C)",        v:fmtKg(laundryKg),                 dim:!b2cActive },
            { l:"↳ Wash & Iron portion",    v:pkgBreakdown?fmtKg(pkgBreakdown.ironKg):"—", dim:!b2cActive },
            { l:"↳ Wash & Fold portion",    v:pkgBreakdown?fmtKg(pkgBreakdown.foldKg):"—", dim:!b2cActive },
            { l:"DC garments (B2C)",        v:`${fmt(garments)} pcs`,           dim:!b2cActive },
            { l:"Pkg: W&I bags",            v:pkgBreakdown?`${fmt(pkgBreakdown.ironBagsNeeded)} bags`:"—", dim:!b2cActive },
            { l:"Pkg: W&F bags",            v:pkgBreakdown?`${fmt(pkgBreakdown.foldBagsNeeded)} bags`:"—", dim:!b2cActive },
            { l:"Pkg: DC garments",         v:pkgBreakdown?`${fmt(pkgBreakdown.dcGarments)} pcs`:"—",     dim:!b2cActive },
          ].map(({ l, v, dim }) => (
            <div key={l} className={`bg-white border border-slate-200 rounded-xl p-3.5 ${dim?"opacity-30":""}`}>
              <p className="text-[10px] text-slate-400 mb-1">{l}</p>
              <p className="text-base font-mono font-semibold text-slate-800">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Calculator() {
  const navigate = useNavigate();
  const [activeScenario, setActiveScenario] = useState("mostlikely");
  const [assumptions,    setAssumptions]    = useState({ ...DEFAULT_ASSUMPTIONS });
  const [tab,            setTab]            = useState("detail");
  const [showConfig,     setShowConfig]     = useState(false);

  const set         = (key, val) => setAssumptions(prev => ({ ...prev, [key]: val }));
  const handleReset = () => setAssumptions({ ...DEFAULT_ASSUMPTIONS });

  const outputs   = Object.fromEntries(Object.keys(SCENARIO_SEEDS).map(k => [k, calcScenario(k, assumptions)]));
  const activeOut = outputs[activeScenario];
  const activeSt  = SS[SCENARIO_SEEDS[activeScenario].color];

  const expFields = [
    ["rent",                "Rent"],
    ["deliveryVehicleRent", "Delivery Vehicle Rent"],
    ["maintenance",         "Maintenance"],
    ["overtime",            "Overtime"],
    ["misc",                "Petty Expenses"],
  ];

  const mc    = assumptions.machine_count || 2;
  const modes = [
    assumptions.m1mode,
    ...(mc >= 2 ? [assumptions.m2mode] : []),
    ...(assumptions.m3enabled ? [assumptions.m3mode] : []),
    ...(assumptions.m4enabled ? [assumptions.m4mode] : []),
    ...(assumptions.m5enabled ? [assumptions.m5mode] : []),
  ];
  const hasB2C = modes.some(machineDoesB2C);
  const hasB2B = modes.some(machineDoesB2B);

  return (
    <div className="flex min-h-screen bg-slate-50" style={{ fontFamily: "DM Sans, sans-serif" }}>
      <main className="flex min-h-screen flex-1 flex-col">

        {/* Header */}
        <header className={`${activeSt.hero} px-6 py-5 relative overflow-hidden`}>
          <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-white/5 pointer-events-none" />
          <div className="relative z-10 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50 mb-0.5">Andes Services</p>
                <h1 className="text-xl font-light text-white"><strong className="font-semibold">Revenue</strong> Calculator</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleReset}
                className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-white/20 transition">
                <FiRefreshCw size={12} /> Reset
              </button>
              <button onClick={() => navigate("/")}
                className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-white/20 transition">
                <FiArrowLeft size={12} /> Back
              </button>
            </div>
          </div>
          <div className="relative z-10 flex flex-wrap gap-6 mt-4 pt-4 border-t border-white/10">
            {Object.entries(outputs).map(([k, o]) => (
              <button key={k} onClick={() => setActiveScenario(k)}
                className={`text-left transition ${activeScenario===k?"opacity-100":"opacity-50 hover:opacity-75"}`}>
                <p className="text-[9px] uppercase tracking-widest text-white/50">{SCENARIO_SEEDS[k].label}</p>
                <p className="text-base font-mono font-semibold text-white">₹ {fmtL(o.totalRev)} L</p>
              </button>
            ))}
          </div>
        </header>

        <div className="flex flex-col lg:flex-row flex-1 min-h-0">

          {/* ════ LEFT panel ════ */}
          <div className="w-full lg:w-[310px] xl:w-[350px] flex-shrink-0 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 overflow-y-auto">
            <div className="p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Editable assumptions</p>
              <p className="text-[11px] text-slate-400 mb-3">All values update all 3 scenarios live</p>

              <SectionDivider>Machine setup</SectionDivider>
              <MachineSetupPanel assumptions={assumptions} set={set} />

              {hasB2B && (<>
                <SectionDivider>B2B client mix</SectionDivider>
                <div className="mb-3">
                  <p className="text-[10px] text-slate-400 mb-2">What % of your B2B load is Hostel vs Hotel?</p>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <p className="text-[11px] font-semibold text-blue-700 mb-1">🏨 Hostel %</p>
                      <NI value={assumptions.hostelPct} min={0} max={100} step={1} onChange={v => { const c=Math.min(100,Math.max(0,v)); set("hostelPct",c); }} />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-violet-700 mb-1">🏩 Hotel %</p>
                      <NI value={assumptions.hotelPct} min={0} max={100} step={1} onChange={v => { const c=Math.min(100,Math.max(0,v)); set("hotelPct",c); }} />
                    </div>
                  </div>
                  <div className="flex rounded-xl overflow-hidden h-7 border border-slate-200 mb-1">
                    {assumptions.hostelPct>0 && <div className="bg-blue-500 flex items-center justify-center transition-all" style={{width:`${assumptions.hostelPct}%`}}><span className="text-[9px] font-bold text-white truncate px-1">Hostel {assumptions.hostelPct}%</span></div>}
                    {assumptions.hotelPct>0  && <div className="bg-violet-500 flex items-center justify-center transition-all" style={{width:`${assumptions.hotelPct}%`}}><span className="text-[9px] font-bold text-white truncate px-1">Hotel {assumptions.hotelPct}%</span></div>}
                    {assumptions.hostelPct===0&&assumptions.hotelPct===0 && <div className="flex-1 bg-slate-100 flex items-center justify-center"><span className="text-[9px] text-slate-400">0% / 0%</span></div>}
                  </div>
                </div>
              </>)}

              <SectionDivider>Pricing configuration</SectionDivider>
              <div className="flex gap-2 mb-2.5">
                <div className={`flex-1 rounded-lg px-2.5 py-2 border text-center ${hasB2C?"bg-emerald-50 border-emerald-200":"bg-slate-50 border-slate-200"}`}>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${hasB2C?"text-emerald-600":"text-slate-400"}`}>B2C</p>
                  <p className={`text-[10px] ${hasB2C?"text-emerald-500":"text-slate-400"}`}>{hasB2C?"Active":"No machines"}</p>
                </div>
                <div className={`flex-1 rounded-lg px-2.5 py-2 border text-center ${hasB2B?"bg-blue-50 border-blue-200":"bg-slate-50 border-slate-200"}`}>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${hasB2B?"text-blue-600":"text-slate-400"}`}>B2B</p>
                  <p className={`text-[10px] ${hasB2B?"text-blue-500":"text-slate-400"}`}>{hasB2B?"Active":"No machines"}</p>
                </div>
              </div>
              <button onClick={() => setShowConfig(true)}
                className="w-full h-9 bg-slate-800 text-white rounded-xl text-xs font-semibold hover:bg-slate-700 transition flex items-center justify-center gap-1.5 mb-1">
                <FiSettings size={13} /> Edit Pricing, Rates & Packaging
              </button>

              <SectionDivider>Auto-calculated costs</SectionDivider>
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 mb-2.5">
                <p className="text-[10px] font-bold text-teal-700 mb-1.5 flex items-center gap-1"><FiZap size={10} /> This month's auto-calculated costs</p>
                {[
                  { l:"Electricity (blended)", v:fmtR(activeOut.electricityCost) },
                  { l:"Water",                 v:fmtR(activeOut.waterCost) },
                  { l:"Detergent",             v:fmtR(activeOut.detergentCost) },
                ].map(({ l, v }) => (
                  <div key={l} className="flex items-center justify-between mb-1">
                    <p className="text-[10px] text-teal-600">{l}</p>
                    <p className="text-[10px] font-mono font-semibold text-teal-800">{v}</p>
                  </div>
                ))}
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-[10px] text-teal-600">Packaging <span className="text-[9px] text-orange-500 font-semibold">(B2C only)</span></p>
                  <p className="text-[10px] font-mono font-semibold text-teal-800">{fmtR(activeOut.packagingCostVal)}</p>
                </div>
                {activeOut.pkgBreakdown && (
                  <div className="ml-3 space-y-0.5">
                    {[
                      { l:"↳ W&I", v: `₹${activeOut.pkgBreakdown.ironCost.toLocaleString("en-IN")} (₹${activeOut.pkgBreakdown.ironCostPerKg}/KG)` },
                      { l:"↳ W&F", v: `₹${activeOut.pkgBreakdown.foldCost.toLocaleString("en-IN")} (₹${activeOut.pkgBreakdown.foldCostPerKg}/KG)` },
                      { l:"↳ DC",  v: `₹${activeOut.pkgBreakdown.dcCost.toLocaleString("en-IN")} (₹${activeOut.pkgBreakdown.dcCostPerKgEquiv}/KG)` },
                    ].map(({ l, v }) => (
                      <div key={l} className="flex justify-between">
                        <p className="text-[9px] text-orange-600">{l}</p>
                        <p className="text-[9px] font-mono text-orange-700">{v}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <SectionDivider>Fixed monthly expenses</SectionDivider>
              <div className="mb-2.5">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs text-slate-600">Workers</p>
                  <button
                    onClick={() => {
                      const workers = assumptions.workers || [];
                      set("workers", [...workers, { id: Date.now(), name: `Worker ${workers.length + 1}`, salary: 20000 }]);
                    }}
                    className="text-[10px] font-semibold text-teal-600 border border-teal-200 bg-teal-50 hover:bg-teal-100 rounded-lg px-2.5 py-1 transition">
                    + Add Worker
                  </button>
                </div>
                {(assumptions.workers || []).map((worker) => (
                  <div key={worker.id} className="grid grid-cols-[1fr_auto_auto] gap-1.5 items-center mb-1.5">
                    <input
                      type="text" value={worker.name}
                      onChange={e => {
                        const updated = assumptions.workers.map(w => w.id === worker.id ? { ...w, name: e.target.value } : w);
                        set("workers", updated);
                      }}
                      className="h-8 border border-slate-200 rounded-lg text-xs text-slate-700 px-2.5 bg-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-100 transition"
                      placeholder="Worker name"
                    />
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">₹</span>
                      <input
                        type="number" value={worker.salary} min={0}
                        onChange={e => {
                          const val = parseFloat(e.target.value) || 0;
                          set("workers", assumptions.workers.map(w => w.id === worker.id ? { ...w, salary: val } : w));
                        }}
                        className="w-28 h-8 pl-6 pr-2 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 bg-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-100 transition"
                      />
                    </div>
                    <button
                      onClick={() => set("workers", assumptions.workers.filter(w => w.id !== worker.id))}
                      className="h-8 w-8 flex items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition text-xs font-bold">
                      ×
                    </button>
                  </div>
                ))}
                {(assumptions.workers || []).length > 0 && (
                  <div className="flex justify-between items-center mt-1 pt-1 border-t border-slate-100">
                    <p className="text-[10px] text-slate-400">{(assumptions.workers||[]).length} worker{(assumptions.workers||[]).length!==1?"s":""}</p>
                    <p className="text-[10px] font-mono font-semibold text-slate-600">
                      Total: ₹{((assumptions.workers||[]).reduce((s,w)=>s+(w.salary||0),0)).toLocaleString("en-IN")}/mo
                    </p>
                  </div>
                )}
              </div>

              {expFields.map(([key, label]) => (
                <FieldRow key={key} label={label} unit="₹ / month">
                  <NI value={assumptions[key]} min={0} prefix="₹" onChange={v => set(key, v)} />
                </FieldRow>
              ))}

              <SectionDivider>Daily kg demand</SectionDivider>
              <FieldRow label="Total daily kg to process" unit="kg / day">
                <NI value={assumptions.dailyKgDemand} min={0} max={9999} step={10} onChange={v => set("dailyKgDemand", v)} />
              </FieldRow>
              <MachineRecommendation assumptions={assumptions} />

              <button onClick={handleReset}
                className="w-full mt-4 h-9 border border-slate-200 rounded-lg text-sm text-slate-500 font-medium hover:bg-slate-50 hover:text-slate-700 transition flex items-center justify-center gap-2">
                <FiRefreshCw size={13} /> Reset all to defaults
              </button>
            </div>
          </div>

          {/* ════ RIGHT: Output ════ */}
          <div className="flex-1 overflow-y-auto">
            <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-5 flex gap-1 pt-2">
              {[{ id:"overview", l:"Scenario Overview" }, { id:"detail", l:"Detailed Breakdown" }].map(({ id, l }) => (
                <button key={id} onClick={() => setTab(id)}
                  className={`px-4 py-2 text-xs font-semibold border-b-2 transition -mb-px
                    ${tab===id ? `${activeSt.text} border-current` : "border-transparent text-slate-400 hover:text-slate-600"}`}>
                  {l}
                </button>
              ))}
            </div>

            <div className="p-5">
              {tab === "overview" && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400 mb-2">All 3 scenarios use the same assumptions — only B2C cycles/day differs.</p>
                  {Object.keys(SCENARIO_SEEDS).map(k => (
                    <ScenarioCard key={k} scenarioKey={k} out={outputs[k]} active={activeScenario===k}
                      onClick={k => { setActiveScenario(k); setTab("detail"); }} />
                  ))}
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Side-by-side comparison</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-100">
                            <th className="px-4 py-2.5 text-left text-xs text-slate-400 font-medium">Metric</th>
                            {Object.entries(SCENARIO_SEEDS).map(([k,s]) => <th key={k} className="px-4 py-2.5 text-right text-xs font-semibold text-slate-600">{s.label}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { l:"B2C cycles/day",  fn: o => o.seed.cycles },
                            { l:"Daily B2C kg",    fn: o => fmtKg(o.b2cDailyKg) },
                            { l:"Monthly B2C",     fn: o => fmtKg(o.b2cMonthly) },
                            { l:"Electricity",     fn: o => fmtR(o.electricityCost) },
                            { l:"Water",           fn: o => fmtR(o.waterCost) },
                            { l:"Detergent",       fn: o => fmtR(o.detergentCost) },
                            { l:"Pkg W&I",         fn: o => o.pkgBreakdown?`₹${o.pkgBreakdown.ironCost.toLocaleString("en-IN")}`:"—" },
                            { l:"Pkg W&F",         fn: o => o.pkgBreakdown?`₹${o.pkgBreakdown.foldCost.toLocaleString("en-IN")}`:"—" },
                            { l:"Pkg DC",          fn: o => o.pkgBreakdown?`₹${o.pkgBreakdown.dcCost.toLocaleString("en-IN")}`:"—" },
                            { l:"Packaging total", fn: o => fmtR(o.packagingCostVal) },
                            { l:"Total revenue",   fn: o => fmtR(o.totalRev) },
                            { l:"Total expenses",  fn: o => fmtR(o.totalExp) },
                            { l:"Net profit",      fn: o => fmtR(o.profit) },
                            { l:"Profit margin",   fn: o => fmtPct(o.margin) },
                          ].map(({ l, fn }) => (
                            <tr key={l} className="border-b border-slate-100 last:border-0">
                              <td className="px-4 py-2.5 text-slate-500">{l}</td>
                              {Object.keys(SCENARIO_SEEDS).map(k => <td key={k} className="px-4 py-2.5 font-mono text-right text-slate-800">{fn(outputs[k])}</td>)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {tab === "detail" && (
                <div>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {Object.entries(SCENARIO_SEEDS).map(([k, s]) => {
                      const st2 = SS[s.color];
                      return (
                        <button key={k} onClick={() => setActiveScenario(k)}
                          className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition
                            ${activeScenario===k ? `${st2.hero} border-transparent text-white` : `bg-white ${st2.border} ${st2.text}`}`}>
                          {s.label}
                        </button>
                      );
                    })}
                  </div>
                  <DetailPanel out={activeOut} assumptions={assumptions} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {showConfig && <ConfigModal assumptions={assumptions} set={set} onClose={() => setShowConfig(false)} hasB2B={hasB2B} />}
    </div>
  );
}
