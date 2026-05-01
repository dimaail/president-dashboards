// president-data.jsx — fixtures for the President dashboard
// All numbers are realistic-looking made-up data in UGX. Place names are real.

const fmt = (n, opts = {}) => {
  const { dp = 0, suffix = "" } = opts;
  if (typeof n !== "number") return n;
  return n.toLocaleString("en-US", { maximumFractionDigits: dp, minimumFractionDigits: dp }) + suffix;
};
const fmtShort = (n) => {
  if (n >= 1e12) return (n / 1e12).toFixed(2) + "T";
  if (n >= 1e9)  return (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6)  return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3)  return (n / 1e3).toFixed(1) + "K";
  return String(n);
};

// Generate a deterministic spark series
const spark = (seed, n = 24, base = 50, amp = 30) => {
  const out = [];
  let v = base;
  for (let i = 0; i < n; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    const r = seed / 233280;
    v += (r - 0.45) * amp * 0.4;
    v = Math.max(base * 0.4, Math.min(base * 1.6, v));
    out.push(v);
  }
  return out;
};

// Uganda regions (rough centroids, normalized 0..100)
const REGIONS = [
  { id: "central",  name: "Central",  cx: 60, cy: 60, alloc: 1840, disb: 1490, activity: 92 }, // Kampala, Wakiso, Mukono
  { id: "western",  name: "Western",  cx: 25, cy: 60, alloc: 1240, disb:  890, activity: 68 }, // Mbarara, Kasese
  { id: "eastern",  name: "Eastern",  cx: 80, cy: 50, alloc: 1380, disb: 1020, activity: 74 }, // Mbale, Jinja
  { id: "northern", name: "Northern", cx: 55, cy: 25, alloc:  980, disb:  640, activity: 51 }, // Gulu, Lira
  { id: "westnile", name: "West Nile",cx: 25, cy: 18, alloc:  610, disb:  390, activity: 42 }, // Arua
  { id: "karamoja", name: "Karamoja", cx: 85, cy: 22, alloc:  430, disb:  240, activity: 31 }, // Moroto
];

const PRES_DATA = {
  asOf: "21 Nov 2023 · 14:38:02 EAT",
  fxRate: "USD/UGX 3,742.50",
  // ============ OVERVIEW KPIs ============
  overview: {
    kpis: [
      { id: "gdp",   label: "Real-time activity index",  value: 128.4, unit: "pts",  delta: +2.3, spark: spark(11, 28, 80, 40) },
      { id: "vol",   label: "Switch volume · today",     value: 8.91,  unit: "T UGX", delta: +5.7, spark: spark(22, 28, 60, 50), tnum: true },
      { id: "tx",    label: "Switch transactions · today", value: 23.18, unit: "M",   delta: +3.1, spark: spark(33, 28, 70, 30), tnum: true },
      { id: "tax",   label: "URA tax collected · MTD",   value: 2.14,  unit: "T UGX", delta: +1.4, spark: spark(44, 28, 50, 40), tnum: true },
      { id: "fraud", label: "FIA blocks · today",         value: 250,   unit: "tx",   delta: -8.2, spark: spark(55, 28, 80, 60), tnum: false, good: true },
      { id: "pdm",   label: "PDM disbursed · YTD",        value: 4.67,  unit: "T UGX", delta: +0.9, spark: spark(66, 28, 50, 30), tnum: true },
    ],
    typeMix: [
      { name: "P2P",       value: 9.2, pct: 41 },
      { name: "C2B retail",value: 5.3, pct: 24 },
      { name: "B2B",       value: 4.1, pct: 18 },
      { name: "G2P / P2G", value: 2.7, pct: 12 },
      { name: "Cross-border", value: 1.0, pct: 5 },
    ],
    channelMix: [
      { name: "Mobile money", pct: 58, color: "var(--pres-accent)" },
      { name: "Bank",         pct: 31, color: "var(--pres-accent-2)" },
      { name: "Card",         pct:  8, color: "var(--pres-good)" },
      { name: "Crypto / fiat ramp", pct:  3, color: "var(--pres-warn)" },
    ],
  },
  // ============ BoU ============
  bou: {
    kpis: [
      { id: "liq", label: "Aggregate participant liquidity", value: 14.3, unit: "T UGX", delta: +1.2, spark: spark(101, 24, 60, 25) },
      { id: "dig", label: "Digital share of payments",       value: 78.4, unit: "%",     delta: +2.6, spark: spark(102, 24, 70, 30) },
      { id: "avg", label: "Avg payment size",                 value: 384,  unit: "K UGX", delta: -1.8, spark: spark(103, 24, 50, 30) },
      { id: "act", label: "Active merchants",                 value: 218,  unit: "K",     delta: +4.4, spark: spark(104, 24, 60, 30) },
    ],
    rails: [
      { name: "Mobile money", pct: 58, vol: 5.16, tx: 13.4 },
      { name: "Bank-to-bank", pct: 31, vol: 2.76, tx: 5.1 },
      { name: "Card",         pct:  8, vol: 0.71, tx: 2.0 },
      { name: "Cross-border", pct:  2, vol: 0.18, tx: 0.4 },
      { name: "Crypto / VASP",pct:  1, vol: 0.10, tx: 0.3 },
    ],
    consumption: [
      { name: "Retail spend (C2B)",   delta: +6.2, value: "5.31T", spark: spark(201, 16, 60, 30) },
      { name: "Avg merchant turnover",delta: +2.4, value: "24.4M", spark: spark(202, 16, 60, 30) },
      { name: "Active merchants",     delta: +4.4, value: "218K",  spark: spark(203, 16, 60, 30) },
      { name: "% C2B share",          delta: +1.1, value: "47%",   spark: spark(204, 16, 60, 30) },
      { name: "Avg payment ticket",   delta: -1.8, value: "UGX 384K", spark: spark(205, 16, 60, 30) },
      { name: "Cross-region flow",    delta: +0.6, value: "0.92T", spark: spark(206, 16, 60, 30) },
    ],
    participants: [
      { name: "Stanbic Bank Uganda", liq: 2.34, share: 16.4, status: "ok" },
      { name: "Centenary Bank",      liq: 1.82, share: 12.7, status: "ok" },
      { name: "MTN MoMo",            liq: 1.66, share: 11.6, status: "ok" },
      { name: "Airtel Money",        liq: 1.41, share:  9.9, status: "ok" },
      { name: "Absa Uganda",         liq: 1.18, share:  8.2, status: "warn" },
      { name: "DFCU Bank",           liq: 0.98, share:  6.9, status: "ok" },
      { name: "Equity Bank Uganda",  liq: 0.87, share:  6.1, status: "ok" },
      { name: "KCB Bank Uganda",     liq: 0.74, share:  5.2, status: "ok" },
      { name: "Bank of India",       liq: 0.46, share:  3.2, status: "warn" },
      { name: "Crane Bank (resolution)", liq: 0.12, share: 0.8, status: "bad" },
    ],
  },
  // ============ FIA ============
  fia: {
    kpis: [
      { id: "tot",  label: "Total transactions, today", value: 8600, unit: "K", delta: +3.1, spark: spark(301, 24, 60, 30), valueText: "8,600" },
      { id: "fr",   label: "Fraud transactions, today", value: 250,  unit: "tx", delta: -8.2, spark: spark(302, 24, 60, 30), valueText: "250", good: true },
      { id: "amt",  label: "Total tx amount, today",    value: "8.60", unit: "T UGX", delta: +2.4, spark: spark(303, 24, 60, 30) },
      { id: "blk",  label: "Blocked tx amount, today",  value: "2.50", unit: "B UGX", delta: +1.7, spark: spark(304, 24, 60, 30) },
    ],
    cases: [
      { name: "Card fraud",          q: 84, vol: "612 M" },
      { name: "Mobile money scam",   q: 67, vol: "488 M" },
      { name: "Account takeover",    q: 41, vol: "316 M" },
      { name: "Money laundering",    q: 28, vol: "742 M" },
      { name: "Sanctions hit",       q: 17, vol: "188 M" },
      { name: "PEP threshold breach",q: 13, vol: "154 M" },
    ],
    highRisk: [
      { name: "Online gambling operators", q: 38, vol: 124.6, trend: +12.4 },
      { name: "Crypto / VASP exchanges",   q: 22, vol:  88.1, trend: +18.7 },
      { name: "FX bureaus (unlicensed)",   q: 14, vol:  41.3, trend:  +4.1 },
      { name: "Shell companies",            q: 19, vol:  57.0, trend:  +7.6 },
      { name: "Cross-border MoMo agents",   q: 31, vol:  72.8, trend:  -2.2 },
    ],
    blocked: [
      { idx: 1, debtor: "KCBLUGKA9655886677", debFI: "MOMO",         creditor: "ACC1165694448", crFI: "Airtel Uganda",   amt: 386102.83, type: "p2p", date: "21.11.23 14:32" },
      { idx: 2, debtor: "KCBLUGKA9655886677", debFI: "Crane Bank",   creditor: "ACC0981556488", crFI: "Global Trust",    amt: 129809.60, type: "p2p", date: "21.11.23 14:31" },
      { idx: 3, debtor: "KCBLUGKA9655886677", debFI: "Bank of India",creditor: "ACC8509670541", crFI: "MOMO",            amt: 304222.92, type: "p2p", date: "21.11.23 14:31" },
      { idx: 4, debtor: "ACC6222260602",       debFI: "Crane Bank",   creditor: "KCBLUGKA…6677", crFI: "MyUGPay",         amt: 518745.90, type: "p2p", date: "21.11.23 14:28" },
      { idx: 5, debtor: "KCBLUGKA9655886677", debFI: "Airtel Uganda",creditor: "ACC7158724665", crFI: "Bank of India",   amt: 631174.58, type: "p2p", date: "21.11.23 14:25" },
      { idx: 6, debtor: "ACC3717792711",       debFI: "Bank of Africa",creditor: "KCBLUGKA…6677", crFI: "Bank of India",  amt: 306137.09, type: "p2p", date: "21.11.23 14:22" },
      { idx: 7, debtor: "ACC3561047924",       debFI: "Airtel Uganda",creditor: "KCBLUGKA…6677", crFI: "MOMO",           amt: 579002.84, type: "p2p", date: "21.11.23 14:18" },
      { idx: 8, debtor: "KCBLUGKA9655886677", debFI: "MyUGPay",      creditor: "ACC7427916244", crFI: "MOMO",            amt: 433090.51, type: "p2p", date: "21.11.23 14:11" },
    ],
  },
  // ============ URA ============
  ura: {
    kpis: [
      { id: "ytd", label: "Tax collected · YTD",  value: 24.7, unit: "T UGX", delta: +6.1, spark: spark(401, 24, 60, 30) },
      { id: "mtd", label: "Tax collected · MTD",  value: 2.14, unit: "T UGX", delta: +1.4, spark: spark(402, 24, 60, 30) },
      { id: "gap", label: "Declared vs cashflow gap", value: 11.8, unit: "%",  delta: +0.6, spark: spark(403, 24, 60, 30), bad: true },
      { id: "unr", label: "Unregistered taxpayers (est.)", value: 318, unit: "K", delta: -2.4, spark: spark(404, 24, 60, 30), good: true },
    ],
    monthly: [
      { m: "Jan", v: 1.82 }, { m: "Feb", v: 1.91 }, { m: "Mar", v: 2.04 },
      { m: "Apr", v: 1.97 }, { m: "May", v: 2.18 }, { m: "Jun", v: 2.27 },
      { m: "Jul", v: 2.31 }, { m: "Aug", v: 2.18 }, { m: "Sep", v: 2.09 },
      { m: "Oct", v: 2.41 }, { m: "Nov", v: 2.14 }, { m: "Dec", v: null },
    ],
    regional: [
      { name: "Central (Kampala)", target: 14.2, actual: 12.84 },
      { name: "Eastern (Jinja, Mbale)", target:  3.6, actual:  3.14 },
      { name: "Western (Mbarara)", target:  3.1, actual:  2.69 },
      { name: "Northern (Gulu, Lira)", target: 1.4, actual:  1.02 },
      { name: "West Nile (Arua)",      target: 0.8, actual:  0.51 },
      { name: "Karamoja (Moroto)",     target: 0.4, actual:  0.21 },
    ],
    crossCheck: [
      { tin: "1000487231", name: "Kampala Metro Trading Ltd", declared: "184 M", cashflow: "612 M", gap: "+228%", risk: "high" },
      { tin: "1004471028", name: "Nile Logistics Cooperative", declared: " 92 M", cashflow: "248 M", gap: "+170%", risk: "high" },
      { tin: "1009920441", name: "Mbarara FreshFoods Ltd",    declared: " 41 M", cashflow:  "98 M", gap: "+139%", risk: "med"  },
      { tin: "1011023556", name: "Jinja Industrial Holdings", declared: "228 M", cashflow: "412 M", gap:  "+81%", risk: "med"  },
      { tin: "1018991204", name: "Arua Border Traders",       declared: " 18 M", cashflow:  "76 M", gap: "+322%", risk: "high" },
      { tin: "1023118664", name: "Gulu Agro Solutions",        declared: " 64 M", cashflow: "111 M", gap:  "+73%", risk: "med"  },
    ],
    unregisteredVAT: { count: 12480, taxAmount: 488.4 }, // billions UGX est.
    unregistered:    { count: 318000, taxAmount: 124.7 }, // unregistered taxpayers
  },
  // ============ PDM ============
  pdm: {
    kpis: [
      { id: "alloc", label: "Allocated · YTD",   value: 6.91, unit: "T UGX", delta: +0.0, spark: spark(501, 24, 60, 20) },
      { id: "disb",  label: "Disbursed · YTD",   value: 4.67, unit: "T UGX", delta: +0.9, spark: spark(502, 24, 60, 25) },
      { id: "ratio", label: "Disbursement rate", value: 67.6, unit: "%",     delta: +1.2, spark: spark(503, 24, 60, 20) },
      { id: "saccos",label: "Active SACCOs",     value: 10.42, unit: "K",     delta: +0.4, spark: spark(504, 24, 60, 20) },
    ],
    pillars: [
      { name: "Production, Storage, Processing & Marketing", alloc: 4.20, disb: 3.04 },
      { name: "Infrastructure & Economic Services",           alloc: 1.10, disb: 0.71 },
      { name: "Financial Inclusion",                          alloc: 0.84, disb: 0.49 },
      { name: "Social Services",                              alloc: 0.42, disb: 0.27 },
      { name: "Mindset Change",                               alloc: 0.21, disb: 0.11 },
      { name: "Parish-Based Information",                     alloc: 0.14, disb: 0.05 },
    ],
    districts: [
      { d: "Kampala",   alloc: 412, disb: 388 },
      { d: "Wakiso",    alloc: 388, disb: 311 },
      { d: "Mukono",    alloc: 218, disb: 184 },
      { d: "Mbarara",   alloc: 196, disb: 142 },
      { d: "Mbale",     alloc: 178, disb: 132 },
      { d: "Jinja",     alloc: 164, disb: 124 },
      { d: "Gulu",      alloc: 142, disb:  82 },
      { d: "Lira",      alloc: 121, disb:  68 },
      { d: "Kasese",    alloc: 118, disb:  79 },
      { d: "Arua",      alloc: 108, disb:  61 },
      { d: "Moroto",    alloc:  88, disb:  39 },
      { d: "Hoima",     alloc:  96, disb:  64 },
    ],
  },
  // ============ ALERTS ============
  alerts: [
    { sev: "crit", t: "14:36", title: "Sanctions hit · UGX 18.4M",  body: "MoMo wallet 25677*** flagged on UN-1267; auto-blocked, FIA notified.", meta: "FIA · auto" },
    { sev: "warn", t: "14:31", title: "Liquidity below 5% floor",   body: "Crane Bank intraday liquidity 4.2% — sustained 38 min.", meta: "BoU · monitor" },
    { sev: "warn", t: "14:22", title: "Tax declaration mismatch",   body: "TIN 1018991204 — Arua Border Traders, gap +322% MTD.", meta: "URA · cross-check" },
    { sev: "info", t: "14:14", title: "PDM disbursement spike",     body: "Karamoja sub-region: +UGX 12.4B disbursed today (+38% vs avg).", meta: "PDM · daily" },
    { sev: "crit", t: "13:58", title: "Fraud cluster · 41 wallets", body: "Account-takeover ring across MTN/Airtel; auto-frozen pending review.", meta: "FIA · cluster" },
    { sev: "good", t: "13:42", title: "Switch uptime 99.997%",      body: "All 28 participants healthy; no settlement breaches in last 24h.", meta: "BoU · ops" },
    { sev: "warn", t: "13:21", title: "VASP onboarding outside policy", body: "New crypto operator Ridgeline OÜ flagged — domicile not on FIA list.", meta: "FIA · onboarding" },
    { sev: "info", t: "12:55", title: "URA target 92% achieved",    body: "MTD target tracking +1.4% above plan, driven by VAT.", meta: "URA · target" },
  ],
};

window.PRES_DATA = PRES_DATA;
window.fmt = fmt;
window.fmtShort = fmtShort;
window.REGIONS = REGIONS;
