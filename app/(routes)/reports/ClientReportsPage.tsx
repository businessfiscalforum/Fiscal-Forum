"use client";

import { useState, useEffect, useMemo, useRef, useContext, useCallback } from "react";
import {
  FaFilePdf,
  FaCalendarAlt,
  FaUser,
  FaTimes,
  FaPaperPlane,
  FaCheck,
  FaChevronDown,
  FaInfoCircle,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { UserDetailContext } from "../../../context/UserDetailContext";
import useEmblaCarousel from "embla-carousel-react";



interface ResearchReport {
  id: string;
  title: string | null;
  stock: string | null;
  company: string | null;
  author: string | null;
  authorFirm: string | null;
  publishDate: string | null;
  sector: string | null;
  reportType: string | null;
  rating: "BUY" | "HOLD" | "SELL" | null;
  targetPrice: string | null;
  currentPrice: string | null;
  upside: string | null;
  pages: number | null;
  recommendation: string | null;
  summary: string | null;
  pdfUrl: string | null;
  tags: string[];
}

interface ClientReportsPageProps {
  initialReports: ResearchReport[];
}

const tabs = [
  { id: "all", label: "All" },
  { id: "pre-market-research-report", label: "Pre-Market Research Report" },
  { id: "thematic-research-report", label: "Thematic Report" },
  { id: "equity-research-report", label: "Equity Research Report" },
  { id: "weekly-research-report", label: "Weekly Report" },
];

const faqData = [
  {
    question: "How will I receive the daily PDF?",
    answer:
      "The PDF will be sent to your WhatsApp number every Monday to Friday around 8:00 AM morning. You'll receive it directly in your chat, ready to read and analyze before the market opens.",
  },
  {
    question: "Can we request a refund if we change our minds?",
    answer:
      "Yes, you have 3 days after purchase to request a refund. You will receive a 100% refund, no questions asked. Our goal is to ensure you're completely satisfied with your investment in our service.",
  },
  {
    question: "Will my subscription auto-renew after the plan ends?",
    answer:
      "No, we do not auto-renew subscriptions. We will remind you 3 days before your plan ends, and you can choose to purchase again. There will be no automatic deductions - you're always in control of your subscription.",
  },
  {
    question: "Can I get a FREE 2-3 days Demo?",
    answer:
      "Buy any plan and try it for 3 days. If it is not useful for you after the 3rd day, ask for a refund. You will get 100% of your money back with no questions asked. This risk-free trial lets you experience our service firsthand.",
  },
  {
    question: "Is this worth the money?",
    answer:
      "Absolutely! You get daily market updates on WhatsApp for less than the cost of a 🍕 pizza for a YEAR, plus a 100% refund policy and extra FREE Bonuses with every purchase worth more than your payment. It's an incredible value for serious traders who want to stay ahead of the market.",
  },
  {
    question: "What happens if I miss a report?",
    answer:
      "All reports are archived and available for download from your account dashboard. You can access any previous report at any time, so you never miss out on valuable insights.",
  },
  {
    question: "How accurate are your predictions?",
    answer:
      "Our analysts use advanced technical analysis and fundamental research to provide accurate market insights. While no prediction is guaranteed, our track record shows consistent accuracy in identifying key market movements.",
  },
  {
    question: "Can I share the reports with others?",
    answer:
      "Reports are intended for personal use only. Sharing with others violates our terms of service. However, we offer team plans for organizations that need multiple access points.",
  },
];

/* ============ STATIC DATA FOR CHARTS & LISTS ============ */

const candleData = [
  { isGreen: false, height: 14.6, bodyHeight: 3.0 },
  { isGreen: false, height: 26.2, bodyHeight: 8.3 },
  { isGreen: true,  height: 21.7, bodyHeight: 9.0 },
  { isGreen: false, height: 28.2, bodyHeight: 11.1 },
  { isGreen: true,  height: 19.2, bodyHeight: 5.0 },
  { isGreen: false, height: 15.7, bodyHeight: 3.0 },
  { isGreen: false, height: 27.0, bodyHeight: 11.6 },
  { isGreen: true,  height: 15.4, bodyHeight: 4.0 },
  { isGreen: false, height: 24.1, bodyHeight: 12.3 },
  { isGreen: true,  height: 18.1, bodyHeight: 3.0 },
  { isGreen: false, height: 26.7, bodyHeight: 11.2 },
  { isGreen: false, height: 26.7, bodyHeight: 10.4 },
  { isGreen: true,  height: 15.5, bodyHeight: 3.0 },
  { isGreen: true,  height: 35.1, bodyHeight: 15.1 },
  { isGreen: false, height: 24.4, bodyHeight: 9.3 },
  { isGreen: false, height: 18.1, bodyHeight: 5.8 },
  { isGreen: true,  height: 27.1, bodyHeight: 8.2 },
  { isGreen: true,  height: 34.2, bodyHeight: 19.3 },
  { isGreen: true,  height: 20.9, bodyHeight: 6.4 },
  { isGreen: true,  height: 10.4, bodyHeight: 3.0 },
  { isGreen: true,  height: 29.0, bodyHeight: 20.3 },
  { isGreen: false, height: 24.7, bodyHeight: 12.0 },
  { isGreen: true,  height: 25.6, bodyHeight: 16.2 },
  { isGreen: false, height: 19.6, bodyHeight: 3.5 },
  { isGreen: false, height: 19.1, bodyHeight: 8.6 },
  { isGreen: false, height: 26.9, bodyHeight: 9.5 },
  { isGreen: false, height: 22.2, bodyHeight: 3.0 },
  { isGreen: true,  height: 26.5, bodyHeight: 14.7 },
  { isGreen: false, height: 23.2, bodyHeight: 7.3 },
  { isGreen: true,  height: 21.5, bodyHeight: 6.6 },
  { isGreen: true,  height: 18.2, bodyHeight: 8.6 },
  { isGreen: false, height: 12.6, bodyHeight: 3.0 },
  { isGreen: true,  height: 18.4, bodyHeight: 5.4 },
  { isGreen: false, height: 21.1, bodyHeight: 11.4 },
  { isGreen: false, height: 25.1, bodyHeight: 11.5 },
  { isGreen: false, height: 25.4, bodyHeight: 6.4 },
  { isGreen: true,  height: 25.1, bodyHeight: 10.0 },
  { isGreen: true,  height: 13.3, bodyHeight: 3.0 },
  { isGreen: false, height: 21.9, bodyHeight: 3.0 },
  { isGreen: true,  height: 25.9, bodyHeight: 6.7 }
];

const themeSectorBars = [
  { name: 'Nifty India Defence',              icon: 'sector-icon-defence.png',       pdf: 'nifty-india-defence-report.pdf', ytd: 21.06 },
  { name: 'Nifty IPO',                        icon: 'sector-icon-ipo.png',            pdf: 'nifty-ipo-report.pdf',           ytd: 11.93 },
  { name: 'Nifty Sugar & Ethanol',             icon: 'sector-icon-sugar.png',          pdf: 'nifty-sugar-report.pdf',         ytd: 4.25 },
  { name: 'Nifty Commodities',                 icon: 'sector-icon-commodities.png',    pdf: 'nifty-commodities-report.pdf',   ytd: 1.88 },
  { name: 'Nifty EV & New Age Automotive',     icon: 'sector-icon-ev-automotive.png',  pdf: 'nifty-ev-automotive-report.pdf', ytd: -0.39 },
  { name: 'Nifty India New Age Consumption',   icon: 'sector-icon-consumption.png',    pdf: 'nifty-consumption-report.pdf',   ytd: -2.81 },
  { name: 'Nifty100 ESG',                      icon: 'sector-icon-esg.png',            pdf: 'nifty-esg-report.pdf',           ytd: -5.53 },
  { name: 'Nifty500 Ahimsa',                   icon: 'sector-icon-ahimsa.png',         pdf: 'nifty-ahimsa-report.pdf',        ytd: -7.48 },
  { name: 'Nifty India Tourism',               icon: 'sector-icon-tourism.png',        pdf: 'nifty-tourism-report.pdf',       ytd: -10.09 },
  { name: 'Nifty50 Shariah',                   icon: 'sector-icon-shariah.png',        pdf: 'nifty-shariah-report.pdf',       ytd: -12.71 },
  { name: 'Nifty India Digital',               icon: 'sector-icon-digital.png',        pdf: 'nifty-digital-report.pdf',       ytd: -14.73 },
];

const sectorUniverse = [
  {name:"NIFTY POWER",              ytd:13.47, pdf:"nifty-power-report.pdf"},
  {name:"NIFTY PHARMA",             ytd:12.88, pdf:"nifty-pharma-report.pdf"},
  {name:"NIFTY CAPITAL GOODS",      ytd:11.42, pdf:"nifty-capital-goods-report.pdf"},
  {name:"NIFTY HEALTHCARE",         ytd:11.12, pdf:"nifty-healthcare-report.pdf"},
  {name:"NIFTY METAL",              ytd:10.18, pdf:"nifty-metal-report.pdf"},
  {name:"NIFTY CHEMICALS",          ytd:3.82,  pdf:"nifty-chemicals-report.pdf"},
  {name:"NIFTY REALTY",             ytd:-0.40, pdf:"nifty-realty-report.pdf"},
  {name:"NIFTY AUTO",               ytd:-4.43, pdf:"nifty-auto-report.pdf"},
  {name:"NIFTY NBFC",               ytd:-4.72, pdf:"nifty-nbfc-report.pdf"},
  {name:"NIFTY BANK",               ytd:-5.05, pdf:"nifty-bank-report.pdf"},
  {name:"NIFTY RETAIL",             ytd:-5.85, pdf:"nifty-retail-report.pdf"},
  {name:"NIFTY FINANCIAL SERVICES", ytd:-6.35, pdf:"nifty-financial-services-report.pdf"},
  {name:"NIFTY FMCG",               ytd:-8.68, pdf:"nifty-fmcg-report.pdf"},
  {name:"NIFTY OIL & GAS",          ytd:-9.45, pdf:"nifty-oil-gas-report.pdf"},
  {name:"NIFTY IT",                 ytd:-24.64,pdf:"nifty-it-report.pdf"},
];

const coverGradients: Record<string, string> = {
  "Automotive":"linear-gradient(135deg,#0e2419,#1B4332)",
  "Energy":"linear-gradient(135deg,#1a2e0e,#3d6b1f)",
  "Retail":"linear-gradient(135deg,#2b1a0e,#8a4a1f)",
  "Diversified":"linear-gradient(135deg,#1a1a2e,#2f2f5c)",
  "BFSI":"linear-gradient(135deg,#0e1c2b,#1f4a6b)",
  "Electronics":"linear-gradient(135deg,#22102b,#5c2f7a)",
  "Textiles":"linear-gradient(135deg,#2b1010,#6b1f2f)",
  "Travel & Tourism":"linear-gradient(135deg,#0e2b26,#1f6b5a)",
  "Mining":"linear-gradient(135deg,#2b230e,#6b551f)",
};

const insuranceCoverMap: Record<string, { id: string; label: string; placeholder: string }> = {
  'Employer health insurance': {id:'insCoverEmployerHealth', label:'Employer Health Cover (₹)', placeholder:'e.g. 300000'},
  'Personal health insurance': {id:'insCoverPersonalHealth', label:'Health Insurance Cover (₹)', placeholder:'e.g. 500000'},
  'Family floater': {id:'insCoverFamilyFloater', label:'Family Floater Cover (₹)', placeholder:'e.g. 1000000'},
  'Term life insurance': {id:'insCoverTermLife', label:'Term Insurance Cover (₹)', placeholder:'e.g. 5000000'},
  'Personal accident insurance': {id:'insCoverPersonalAccident', label:'Personal Accident Cover (₹)', placeholder:'e.g. 1000000'},
  'Critical illness cover': {id:'insCoverCriticalIllness', label:'Critical Illness Cover (₹)', placeholder:'e.g. 1000000'},
  'Motor insurance': {id:'insCoverMotor', label:'Motor Insurance IDV (₹)', placeholder:'e.g. 500000'}
};

/* ---- heatmap colour scale: bold cartoon bands, each step clearly distinct ---- */
const HEAT_POSITIVE = ['#C6FFDD', '#6EEBA0', '#2ED47A', '#00B86B', '#007A45'];
const HEAT_NEGATIVE = ['#FFE79A', '#FFB347', '#FF7A3C', '#FF3B30', '#B0140A'];

function hexToRgb(hex: string) {
  const h = hex.replace('#','');
  return {
    r: parseInt(h.substring(0,2),16),
    g: parseInt(h.substring(2,4),16),
    b: parseInt(h.substring(4,6),16)
  };
}

function bandColor(stops: string[], t: number) {
  const idx = Math.min(stops.length - 1, Math.floor(t * stops.length));
  return hexToRgb(stops[idx]);
}

function rgbToCss({r,g,b}: {r:number; g:number; b:number}) {
  return `rgb(${r},${g},${b})`;
}

function lighten({r,g,b}: {r:number; g:number; b:number}, amt: number) {
  return {
    r: Math.round(r + (255 - r) * amt),
    g: Math.round(g + (255 - g) * amt),
    b: Math.round(b + (255 - b) * amt)
  };
}

function darken({r,g,b}: {r:number; g:number; b:number}, amt: number) {
  return {
    r: Math.round(r * (1 - amt)),
    g: Math.round(g * (1 - amt)),
    b: Math.round(b * (1 - amt))
  };
}

function relativeLuminance({r,g,b}: {r:number; g:number; b:number}) {
  const lin = (v: number) => { v/=255; return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); };
  return 0.2126*lin(r) + 0.7152*lin(g) + 0.0722*lin(b);
}

function heatColor(ytd: number, maxAbs: number) {
  const t = maxAbs > 0 ? Math.min(1, Math.abs(ytd) / maxAbs) : 0;
  const stops = ytd >= 0 ? HEAT_POSITIVE : HEAT_NEGATIVE;
  const rgb = bandColor(stops, t);
  const hi = lighten(rgb, 0.45);
  const lo = darken(rgb, 0.28);
  const gradient = `radial-gradient(circle at 32% 26%, ${rgbToCss(hi)} 0%, ${rgbToCss(rgb)} 55%, ${rgbToCss(lo)} 100%)`;
  const glow = `rgba(${rgb.r},${rgb.g},${rgb.b},0.55)`;
  const textColor = relativeLuminance(rgb) > 0.42 ? '#111411' : '#ffffff';
  return { bg: gradient, flat: rgbToCss(rgb), glow, text: textColor };
}

interface PlacedBubble {
  name: string;
  ytd: number;
  pdf: string;
  r: number;
  x: number;
  y: number;
}

function packSectorBubbles(
  items: { name: string; ytd: number; pdf: string; r: number }[],
  width: number,
  height: number,
  padding: number = 8
): PlacedBubble[] {
  let placed: PlacedBubble[] = [];
  let success = false;
  let currentItems = items.map(item => ({ ...item }));
  let scaleFactor = 1.0;
  
  const aspect = height / (width || 1);
  const edgeMargin = 6;

  // Attempt to pack bubbles iteratively. If any fail to pack without overlap,
  // scale down all bubble radii by 6% and retry (up to 8 iterations).
  for (let iter = 0; iter < 8; iter++) {
    placed = [];
    let failed = false;
    const sorted = [...currentItems].sort((a, b) => b.r - a.r);
    
    for (const item of sorted) {
      let angle = Math.random() * Math.PI * 2;
      let radius = 0;
      let x = width / 2;
      let y = height / 2;
      let attempts = 0;
      
      while (attempts < 2000) {
        const withinBounds = (x - item.r) >= edgeMargin && (x + item.r) <= width - edgeMargin &&
                              (y - item.r) >= edgeMargin && (y + item.r) <= height - edgeMargin;
        let collide = false;
        for (const p of placed) {
          const dx = x - p.x;
          const dy = y - p.y;
          const minDist = p.r + item.r + padding;
          if (dx * dx + dy * dy < minDist * minDist) { collide = true; break; }
        }
        if (withinBounds && !collide) break;
        angle += 0.36;
        radius += 2.2;
        x = width / 2 + radius * Math.cos(angle);
        y = height / 2 + radius * Math.sin(angle) * aspect;
        attempts++;
      }
      
      if (attempts >= 2000) {
        failed = true;
        break; // Stop placing this set and trigger scale-down
      }
      
      placed.push({ ...item, x, y });
    }
    
    if (!failed) {
      success = true;
      break; // Successfully packed all with no overlap
    }
    
    // Scale down all radii by 6% and try again
    scaleFactor *= 0.94;
    currentItems = items.map(item => ({
      ...item,
      r: Math.max(16, item.r * scaleFactor)
    }));
  }
  
  // Fallback Clamp Run: If we still failed to pack successfully after all scaling iterations,
  // run once more with clamping fallback (so bubbles at worst overlap slightly rather than disappear)
  if (!success) {
    placed = [];
    const sorted = [...currentItems].sort((a, b) => b.r - a.r);
    sorted.forEach(item => {
      let angle = Math.random() * Math.PI * 2;
      let radius = 0;
      let x = width / 2;
      let y = height / 2;
      let attempts = 0;
      
      while (attempts < 2000) {
        const withinBounds = (x - item.r) >= edgeMargin && (x + item.r) <= width - edgeMargin &&
                              (y - item.r) >= edgeMargin && (y + item.r) <= height - edgeMargin;
        let collide = false;
        for (const p of placed) {
          const dx = x - p.x;
          const dy = y - p.y;
          const minDist = p.r + item.r + padding;
          if (dx * dx + dy * dy < minDist * minDist) { collide = true; break; }
        }
        if (withinBounds && !collide) break;
        angle += 0.36;
        radius += 2.2;
        x = width / 2 + radius * Math.cos(angle);
        y = height / 2 + radius * Math.sin(angle) * aspect;
        attempts++;
      }
      
      if (attempts >= 2000) {
        x = Math.max(item.r + edgeMargin, Math.min(width - item.r - edgeMargin, x));
        y = Math.max(item.r + edgeMargin, Math.min(height - item.r - edgeMargin, y));
      }
      placed.push({ ...item, x, y });
    });
  }
  
  return placed;
}

const METRICS_ITEMS = [
  { src: "/most-active-equities-volume.png", alt: "Most Active Equities by Volume" },
  { src: "/price-band-hitters.png", alt: "Price Band Hitters — upper and lower circuit stocks" },
  { src: "/top-25-volume-gainers.png", alt: "Top 25 Volume Gainers" },
  { src: "/top-20-gainers-losers.png", alt: "Top 20 Gainers and Losers" },
  { src: "/nifty-index-performance.png", alt: "Nifty Index Performance" },
  { src: "/nifty-sector-performance.png", alt: "Nifty Sector Performance" },
];

export default function ClientReportsPage({
  initialReports,
}: ClientReportsPageProps) {
  const { userDetail } = useContext(UserDetailContext);
  /* ============ PAGE TABS ============ */
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  /* ============ SEARCH / FILTER REPORTS (DB DATA) ============ */
  const [dbReports, setDbReports] = useState<ResearchReport[]>(initialReports);
  const [reportsSearch, setReportsSearch] = useState("");
  const [reportsFilter, setReportsFilter] = useState("all");
  const [reportsPage, setReportsPage] = useState(1);

  useEffect(() => {
    setReportsPage(1);
  }, [reportsFilter, reportsSearch]);



  /* ============ WIZARD STATE ============ */
  const [wizardStep, setWizardStep] = useState<number | "done">(1);
  const [wizardCategory, setWizardCategory] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [wizardAnswers, setWizardAnswers] = useState<Record<string, any>>({
    capital: "",
    details: "",
    name: "",
    email: "",
    mobile: "",
    // Category Specifics
    age: "30",
    occupation: "",
    monthlySavings: "",
    goal: "",
    risk: "Medium",
    preference: "SIP",
    returnsExpectation: "",
    investmentStyle: "",
    annualIncome: "",
    dependents: "",
    maritalStatus: "Single",
    existingInsurance: [] as string[],
    insuranceCovers: {} as Record<string, string>,
    loansLiabilities: "",
    monthlySpending: "",
    spendingCategories: [] as string[],
    cardPreferences: [] as string[],
    flyFrequency: "Never",
    travelType: "Domestic",
    loungeImportance: "3",
    hotelFrequency: "Rarely",
    abroadSpend: "Never",
    feeComfort: "₹0 — Lifetime-free preferred",
    payHigherFee: "No",
    usageGoals: [] as string[],
    loanPurpose: "Home Purchase",
    loanEmployment: "Salaried",
    loanMonthlyIncome: "",
    loanIncomeStability: "Stable",
    loanEarningYears: "1–3 years",
    loanAmount: "500000",
    loanOwnContribution: "",
    loanHasCollateral: "No",
    loanCollateralType: "Property",
    loanHasCoApplicant: "No",
    loanCoApplicantRelation: "Spouse",
    loanKnowsScore: "No",
    loanScoreRange: "700–749",
    loanMissedEmi: "No",
    loanTenure: "Balanced EMI + tenure"
  });

  const [wizardLoading, setWizardLoading] = useState(false);
  const [wizardMessage, setWizardMessage] = useState<string | null>(null);

  /* ============ SCREENER STATE ============ */
  const [screenerTab, setScreenerTab] = useState<"screener" | "watchlist" | "about">("screener");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stocksData, setStocksData] = useState<any[]>([]);
  const [screenerSearch, setScreenerSearch] = useState("");
  const [screenerSort, setScreenerSort] = useState("name-asc");
  const [screenerPage, setScreenerPage] = useState(1);
  const [screenerTierFilter, setScreenerTierFilter] = useState<Set<string>>(new Set());
  const [screenerIndexFilter, setScreenerIndexFilter] = useState<Set<string>>(new Set());
  const [screenerMcapFilter, setScreenerMcapFilter] = useState<Set<string>>(new Set());
  const [screenerOpmFilter, setScreenerOpmFilter] = useState<Set<string>>(new Set());
  
  const [peMin, setPeMin] = useState("");
  const [peMax, setPeMax] = useState("");
  const [roeMin, setRoeMin] = useState("");
  const [roeMax, setRoeMax] = useState("");
  const [roceMin, setRoceMin] = useState("");
  const [roceMax, setRoceMax] = useState("");
  const [onlyWithData, setOnlyWithData] = useState(false);

  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [screenerSelectedStock, setScreenerSelectedStock] = useState<any>(null);
  const [highlightedStockSym, setHighlightedStockSym] = useState<string | null>(null);
  const [showScreenerSuggestions, setShowScreenerSuggestions] = useState(false);
  const [showScreenerIndexWarn, setShowScreenerIndexWarn] = useState(false);

  const SCREENER_PAGE_SIZE = 15;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  /* ============ BUBBLE CHART REFS & MEASUREMENT ============ */
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [bubbleDimensions, setBubbleDimensions] = useState({ width: 800, height: 620 });
  const [bubbleRevealed, setBubbleRevealed] = useState(false);

  /* ============ MARKET METRICS SLIDER (MOBILE ONLY) ============ */
  const [metricsEmblaRef, metricsEmblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false
  });
  const [metricsSelectedIndex, setMetricsSelectedIndex] = useState(0);
  const [metricsScrollSnaps, setMetricsScrollSnaps] = useState<number[]>([]);
  const [metricsAutoScrollActive, setMetricsAutoScrollActive] = useState(true);

  const updateMetricsSelectedIndex = useCallback(() => {
    if (!metricsEmblaApi) return;
    setMetricsSelectedIndex(metricsEmblaApi.selectedScrollSnap());
  }, [metricsEmblaApi]);

  const onMetricsInit = useCallback(() => {
    if (!metricsEmblaApi) return;
    setMetricsScrollSnaps(metricsEmblaApi.scrollSnapList());
    setMetricsSelectedIndex(metricsEmblaApi.selectedScrollSnap());
  }, [metricsEmblaApi]);

  useEffect(() => {
    if (!metricsEmblaApi) return;
    metricsEmblaApi.on("select", updateMetricsSelectedIndex);
    metricsEmblaApi.on("init", onMetricsInit);
    metricsEmblaApi.on("reInit", onMetricsInit);

    // Pause autoplay on interaction
    metricsEmblaApi.on("pointerDown", () => setMetricsAutoScrollActive(false));
    metricsEmblaApi.on("pointerUp", () => setMetricsAutoScrollActive(true));

    return () => {
      metricsEmblaApi.off("select", updateMetricsSelectedIndex);
      metricsEmblaApi.off("init", onMetricsInit);
      metricsEmblaApi.off("reInit", onMetricsInit);
      metricsEmblaApi.off("pointerDown", () => setMetricsAutoScrollActive(false));
      metricsEmblaApi.off("pointerUp", () => setMetricsAutoScrollActive(true));
    };
  }, [metricsEmblaApi, updateMetricsSelectedIndex, onMetricsInit]);

  useEffect(() => {
    if (!metricsEmblaApi || !metricsAutoScrollActive) return;
    const interval = setInterval(() => {
      metricsEmblaApi.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [metricsEmblaApi, metricsAutoScrollActive]);

  /* ============ LOAD SCREENER DATA DYNAMICALLY ============ */
  useEffect(() => {
    // Load stocks data only when component mounts on client side to prevent bundle bloating
    import("./screener-data.js")
      .then((mod) => {
        setStocksData(mod.STOCKS_DATA || []);
      })
      .catch((err) => console.error("Failed to load screener data", err));

    // Load watchlist from localStorage
    try {
      const stored = localStorage.getItem("ff_nse_screener_watchlist_v1");
      if (stored) {
        setWatchlist(new Set(JSON.parse(stored)));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  /* ============ UPDATE WATCHLIST ============ */
  const toggleStar = (sym: string) => {
    const next = new Set(watchlist);
    if (next.has(sym)) {
      next.delete(sym);
    } else {
      next.add(sym);
    }
    setWatchlist(next);
    localStorage.setItem("ff_nse_screener_watchlist_v1", JSON.stringify([...next]));
  };

  /* ============ MEASURE BUBBLE CONTAINER ============ */
  useEffect(() => {
    if (!bubbleRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setBubbleDimensions({
          width: width || 800,
          height: height || 620
        });
      }
    });
    observer.observe(bubbleRef.current);
    
    // Trigger bubble reveal animation after a short delay
    const timer = setTimeout(() => setBubbleRevealed(true), 300);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  /* ============ REVEAL ON SCROLL INTERSECTION OBSERVER ============ */
  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal-panel, .reveal-item");
    if (!revealEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add("in-view");
            observer.unobserve(target);

            // Clean up the animation classes after the transition completes (0.9s duration in CSS)
            setTimeout(() => {
              target.classList.remove(
                "reveal-panel",
                "reveal-item",
                "reveal-left",
                "reveal-right",
                "reveal-top",
                "in-view"
              );
            }, 1000);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [screenerTab]);

  /* ============ BUBBLE PACKING DATA ============ */
  const packedBubbles = useMemo(() => {
    const isMobile = bubbleDimensions.width < 640;
    const padding = isMobile ? 5 : 8;

    const absVals = sectorUniverse.map(s => Math.abs(s.ytd));
    const minAbs = Math.min(...absVals), maxAbs = Math.max(...absVals);

    // Initial radii calculation (tuned to pack as large as possible)
    const baseMinR = isMobile ? 32 : 40;
    const minR = Math.max(baseMinR, bubbleDimensions.width * 0.08);
    const maxR = Math.max(minR + (isMobile ? 24 : 30), bubbleDimensions.width * 0.14);

    let items = sectorUniverse.map(s => ({
      ...s,
      r: minR + ((Math.abs(s.ytd) - minAbs) / ((maxAbs - minAbs) || 1)) * (maxR - minR)
    }));

    // Prevent cropping: calculate the combined area of all bubbles (with padding)
    // and make sure it doesn't exceed a target ratio of the container area.
    // If it does, dynamically scale down all radii.
    const totalArea = items.reduce((sum, item) => sum + Math.PI * Math.pow(item.r + padding / 2, 2), 0);
    const containerArea = bubbleDimensions.width * bubbleDimensions.height;
    
    // We target about 65% area fill on mobile to fill white spaces, 48% on desktop
    const targetRatio = isMobile ? 0.65 : 0.48;
    if (totalArea > containerArea * targetRatio) {
      const scale = Math.sqrt((containerArea * targetRatio) / totalArea);
      items = items.map(item => {
        // Keep an absolute minimum radius so text remains readable
        const newR = Math.max(isMobile ? 20 : 30, item.r * scale);
        return { ...item, r: newR };
      });
    }

    return packSectorBubbles(items, bubbleDimensions.width, bubbleDimensions.height, padding);
  }, [bubbleDimensions]);

  const maxAbsYtdGlobal = useMemo(() => {
    return Math.max(...sectorUniverse.map(s => Math.abs(s.ytd)));
  }, []);

  /* ============ FILTER & SORT RESEARCH REPORTS (DATABASE DATA) ============ */
  const filteredDbReports = useMemo(() => {
    return dbReports.filter(r => {
      const titleMatches = (r.title || "").toLowerCase().includes(reportsSearch.toLowerCase()) ||
                            (r.company || "").toLowerCase().includes(reportsSearch.toLowerCase()) ||
                            (r.stock || "").toLowerCase().includes(reportsSearch.toLowerCase());
      
      let typeMatches = true;
      if (reportsFilter !== "all") {
        typeMatches = (r.reportType || "").toLowerCase().replace(/ /g, "-") === reportsFilter;
      }
      return titleMatches && typeMatches;
    });
  }, [dbReports, reportsSearch, reportsFilter]);

  const ITEMS_PER_PAGE = 3;
  const totalReportsPages = Math.ceil(filteredDbReports.length / ITEMS_PER_PAGE);
  const displayedDbReports = useMemo(() => {
    const start = (reportsPage - 1) * ITEMS_PER_PAGE;
    return filteredDbReports.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredDbReports, reportsPage]);

  /* ============ SCREENER FILTER LOGIC ============ */
  const filteredStocks = useMemo(() => {
    return stocksData.filter(s => {
      // 1. Search Query
      if (screenerSearch) {
        const q = screenerSearch.toLowerCase();
        const matchesQuery = s.sym.toLowerCase().includes(q) || s.name.toLowerCase().includes(q) || s.isin.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }
      // 2. Cap Tier
      if (screenerTierFilter.size && !screenerTierFilter.has(s.tier)) return false;
      // 3. Mcap Slots
      if (screenerMcapFilter.size) {
        if (s.mcap === null || s.mcap === undefined) return false;
        const matched = Array.from(screenerMcapFilter).some(slot => {
          const parts = slot.split('-');
          const min = parseFloat(parts[0]);
          const max = parts[1] === 'inf' ? Infinity : parseFloat(parts[1]);
          return s.mcap >= min && s.mcap < max;
        });
        if (!matched) return false;
      }
      // 4. OPM Slots
      if (screenerOpmFilter.size) {
        if (s.opm === null || s.opm === undefined) return false;
        const matched = Array.from(screenerOpmFilter).some(slot => {
          const parts = slot.split('-');
          const min = parts[0] === '-inf' ? -Infinity : parseFloat(parts[0]);
          const max = parts[1] === 'inf' ? Infinity : parseFloat(parts[1]);
          return s.opm >= min && s.opm < max;
        });
        if (!matched) return false;
      }
      // 5. Index Filters
      if (screenerIndexFilter.size) {
        const hit = s.indices.some((ix: string) => screenerIndexFilter.has(ix));
        if (!hit) return false;
      }
      // 6. Only With Data
      if (onlyWithData) {
        if (s.pe === null && s.roe === null && s.roce === null) return false;
      }
      // 7. P/E Range
      if (peMin !== '') {
        const minVal = parseFloat(peMin);
        if (isNaN(minVal) || s.pe === null || s.pe < minVal) return false;
      }
      if (peMax !== '') {
        const maxVal = parseFloat(peMax);
        if (isNaN(maxVal) || s.pe === null || s.pe > maxVal) return false;
      }
      // 8. ROE Range
      if (roeMin !== '') {
        const minVal = parseFloat(roeMin);
        if (isNaN(minVal) || s.roe === null || s.roe < minVal) return false;
      }
      if (roeMax !== '') {
        const maxVal = parseFloat(roeMax);
        if (isNaN(maxVal) || s.roe === null || s.roe > maxVal) return false;
      }
      // 9. ROCE Range
      if (roceMin !== '') {
        const minVal = parseFloat(roceMin);
        if (isNaN(minVal) || s.roce === null || s.roce < minVal) return false;
      }
      if (roceMax !== '') {
        const maxVal = parseFloat(roceMax);
        if (isNaN(maxVal) || s.roce === null || s.roce > maxVal) return false;
      }

      return true;
    }).sort((a, b) => {
      switch(screenerSort){
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'sym-asc': return a.sym.localeCompare(b.sym);
        case 'listyear-desc': return (b.listyear||0)-(a.listyear||0);
        case 'listyear-asc': return (a.listyear||9999)-(b.listyear||9999);
        case 'pe-asc':
          if (a.pe === null) return 1;
          if (b.pe === null) return -1;
          return a.pe - b.pe;
        case 'pe-desc':
          if (a.pe === null) return 1;
          if (b.pe === null) return -1;
          return b.pe - a.pe;
        case 'roe-desc':
          if (a.roe === null) return 1;
          if (b.roe === null) return -1;
          return b.roe - a.roe;
        case 'roe-asc':
          if (a.roe === null) return 1;
          if (b.roe === null) return -1;
          return a.roe - b.roe;
        case 'roce-desc':
          if (a.roce === null) return 1;
          if (b.roce === null) return -1;
          return b.roce - a.roce;
        case 'roce-asc':
          if (a.roce === null) return 1;
          if (b.roce === null) return -1;
          return a.roce - b.roce;
        case 'mcap-desc':
          if (a.mcap === null || a.mcap === undefined) return 1;
          if (b.mcap === null || b.mcap === undefined) return -1;
          return b.mcap - a.mcap;
        case 'mcap-asc':
          if (a.mcap === null || a.mcap === undefined) return 1;
          if (b.mcap === null || b.mcap === undefined) return -1;
          return a.mcap - b.mcap;
        case 'opm-desc':
          if (a.opm === null || a.opm === undefined) return 1;
          if (b.opm === null || b.opm === undefined) return -1;
          return b.opm - a.opm;
        case 'opm-asc':
          if (a.opm === null || a.opm === undefined) return 1;
          if (b.opm === null || b.opm === undefined) return -1;
          return a.opm - b.opm;
        default: return 0;
      }
    });
  }, [stocksData, screenerSearch, screenerSort, screenerTierFilter, screenerIndexFilter, screenerMcapFilter, screenerOpmFilter, onlyWithData, peMin, peMax, roeMin, roeMax, roceMin, roceMax]);

  const screenerPageCount = Math.max(1, Math.ceil(filteredStocks.length / SCREENER_PAGE_SIZE));

  const pageItems = useMemo(() => {
    const start = (screenerPage - 1) * SCREENER_PAGE_SIZE;
    return filteredStocks.slice(start, start + SCREENER_PAGE_SIZE);
  }, [filteredStocks, screenerPage]);

  const screenerSuggestions = useMemo(() => {
    if (!screenerSearch.trim()) return [];
    const q = screenerSearch.toLowerCase();
    return stocksData
      .filter(s => s.sym.toLowerCase().includes(q) || s.name.toLowerCase().includes(q))
      .slice(0, 8);
  }, [stocksData, screenerSearch]);

  const watchlistStocks = useMemo(() => {
    return stocksData.filter(s => watchlist.has(s.sym)).sort((a, b) => a.name.localeCompare(b.name));
  }, [stocksData, watchlist]);

  /* ============ HANDLE SCREENER CHIPS ============ */
  const toggleScreenerChip = (filterName: string, value: string) => {
    let set: Set<string>;
    let setter: (s: Set<string>) => void;
    
    if (filterName === 'tier') { set = screenerTierFilter; setter = setScreenerTierFilter; }
    else if (filterName === 'index') { set = screenerIndexFilter; setter = setScreenerIndexFilter; }
    else if (filterName === 'mcapSlot') { set = screenerMcapFilter; setter = setScreenerMcapFilter; }
    else { set = screenerOpmFilter; setter = setScreenerOpmFilter; }

    const next = new Set(set);
    
    if (filterName === 'index') {
      const isSensex = value === 'SENSEX30';
      const hasSensex = next.has('SENSEX30');
      const hasOtherIndex = [...next].some(v => v !== 'SENSEX30');

      if (isSensex && hasOtherIndex) {
        triggerIndexWarning();
        return;
      }
      if (!isSensex && hasSensex) {
        triggerIndexWarning();
        return;
      }
    }

    if (next.has(value)) {
      next.delete(value);
    } else {
      next.add(value);
    }

    setter(next);
    setScreenerPage(1);
  };

  const triggerIndexWarning = () => {
    setShowScreenerIndexWarn(true);
    setTimeout(() => {
      setShowScreenerIndexWarn(false);
    }, 3500);
  };

  const clearAllScreenerFilters = () => {
    setScreenerSearch("");
    screenerTierFilter.clear();
    screenerIndexFilter.clear();
    screenerMcapFilter.clear();
    screenerOpmFilter.clear();
    setPeMin("");
    setPeMax("");
    setRoeMin("");
    setRoeMax("");
    setRoceMin("");
    setRoceMax("");
    setOnlyWithData(false);
    setScreenerPage(1);
    setScreenerTierFilter(new Set());
    setScreenerIndexFilter(new Set());
    setScreenerMcapFilter(new Set());
    setScreenerOpmFilter(new Set());
  };

  /* ============ WIZARD HANDLERS ============ */
  const handleWizardOptionToggle = (key: string, value: string, isMulti = false, maxSelect = 99) => {
    if (isMulti) {
      const prev = (wizardAnswers[key] || []) as string[];
      if (prev.includes(value)) {
        setWizardAnswers({ ...wizardAnswers, [key]: prev.filter(v => v !== value) });
      } else {
        if (prev.length < maxSelect) {
          setWizardAnswers({ ...wizardAnswers, [key]: [...prev, value] });
        }
      }
    } else {
      setWizardAnswers({ ...wizardAnswers, [key]: value });
    }
  };

  const handleInsuranceCoverInput = (coverName: string, amount: string) => {
    const prev = { ...(wizardAnswers.insuranceCovers || {}) };
    prev[coverName] = amount;
    setWizardAnswers({ ...wizardAnswers, insuranceCovers: prev });
  };

  const handleWizardSubmit = async () => {
    setWizardLoading(true);
    setWizardMessage(null);

    // Format wizard answers into details block
    const isCc = wizardCategory === 'Credit Card';
    const isLoan = wizardCategory === 'Loan' || wizardCategory === 'Loans';
    const isMf = wizardCategory === 'Mutual Fund';
    const isStocks = wizardCategory === 'Stocks';
    const isIns = wizardCategory === 'Insurance';

    let customDetails = `Category: ${wizardCategory}\n`;
    customDetails += `Capital/Limit/Requirement: ₹${wizardAnswers.capital || "N/A"}\n`;
    customDetails += `Requirements Details: ${wizardAnswers.details || "None"}\n`;
    customDetails += `Email: ${wizardAnswers.email || "N/A"}\n\n`;
    customDetails += `--- Personal Profile ---\n`;

    if (isMf || isStocks || isCc || isLoan) {
      customDetails += `Age: ${isLoan ? wizardAnswers.loanAge : (isCc ? wizardAnswers.ccAge : (isMf ? wizardAnswers.mfAge : wizardAnswers.stAge))}\n`;
    }
    if (isMf || isCc) {
      customDetails += `Occupation: ${isCc ? wizardAnswers.ccOccupation : wizardAnswers.mfOccupation}\n`;
    }
    if (isMf || isStocks || isIns) {
      customDetails += `Monthly Savings: ₹${isIns ? wizardAnswers.insMonthlySavings : (isMf ? wizardAnswers.mfMonthlySavings : wizardAnswers.stMonthlySavings)}\n`;
    }
    if (isMf || isStocks) {
      customDetails += `Goal: ${isMf ? wizardAnswers.mfGoal : wizardAnswers.stGoal}\n`;
      customDetails += `Risk Tolerance: ${isMf ? wizardAnswers.mfRisk : wizardAnswers.stRisk}\n`;
    }

    if (isMf) customDetails += `MF Preference: ${wizardAnswers.mfPreference}\n`;
    if (isStocks) {
      customDetails += `Expectations: ${wizardAnswers.stReturns}\n`;
      customDetails += `Investment Style: ${wizardAnswers.stStyle}\n`;
    }

    if (isIns) {
      customDetails += `Annual Income: ₹${wizardAnswers.insAnnualIncome}\n`;
      customDetails += `Dependents: ${wizardAnswers.insDependents}\n`;
      customDetails += `Marital Status: ${wizardAnswers.insMarital}\n`;
      customDetails += `Existing Insurance: ${(wizardAnswers.insExisting || []).join(", ") || "None"}\n`;
      customDetails += `Cover Amounts Details:\n`;
      Object.keys(wizardAnswers.insuranceCovers || {}).forEach(k => {
        customDetails += `- ${k}: ₹${wizardAnswers.insuranceCovers[k]}\n`;
      });
      customDetails += `Liabilities: ${wizardAnswers.insLoansLiabilities || "None"}\n`;
    }

    if (isCc) {
      customDetails += `Annual Salary: ₹${wizardAnswers.ccMonthlySpending}\n`;
      customDetails += `Major Categories: ${(wizardAnswers.ccSpending || []).join(", ") || "None"}\n`;
      customDetails += `Card Preferences: ${(wizardAnswers.ccPreference || []).join(", ") || "None"}\n`;
      if ((wizardAnswers.ccSpending || []).includes("Travel") || (wizardAnswers.ccPreference || []).includes("Airport Lounge Access") || (wizardAnswers.ccPreference || []).includes("Air Miles")) {
        customDetails += `- Fly Frequency: ${wizardAnswers.ccFlyFrequency}\n`;
        customDetails += `- Travel Type: ${wizardAnswers.ccTravelType}\n`;
        customDetails += `- Lounge Importance: ${wizardAnswers.ccLoungeImportance}/5\n`;
        customDetails += `- Hotel Frequency: ${wizardAnswers.ccHotelFrequency}\n`;
        customDetails += `- Spend Abroad: ${wizardAnswers.ccAbroadSpend}\n`;
      }
      customDetails += `Comfort Fee: ${wizardAnswers.ccFee}\n`;
      customDetails += `Pay Higher: ${wizardAnswers.ccHigherFee}\n`;
      customDetails += `Usage Goals: ${(wizardAnswers.ccUsageGoal || []).join(", ") || "None"}\n`;
    }

    if (isLoan) {
      customDetails += `Loan Purpose: ${wizardAnswers.loanPurpose}\n`;
      customDetails += `Employment: ${wizardAnswers.loanEmployment}\n`;
      customDetails += `Monthly Takehome: ₹${wizardAnswers.loanMonthlyIncome}\n`;
      customDetails += `Income Stability: ${wizardAnswers.loanIncomeStability}\n`;
      customDetails += `Earning Experience: ${wizardAnswers.loanEarningYears}\n`;
      customDetails += `Required Loan Amt: ₹${wizardAnswers.loanAmount}\n`;
      customDetails += `Own Contribution: ₹${wizardAnswers.loanOwnContribution}\n`;
      customDetails += `Collateral Offered: ${wizardAnswers.loanHasCollateral === "Yes" ? wizardAnswers.loanCollateralType : "No"}\n`;
      customDetails += `Co-Applicant Relationship: ${wizardAnswers.loanHasCoApplicant === "Yes" ? wizardAnswers.loanCoApplicantRelation : "No"}\n`;
      customDetails += `Credit Score Range: ${wizardAnswers.loanKnowsScore === "Yes" ? wizardAnswers.loanScoreRange : "Doesn\t know"}\n`;
      customDetails += `Missed EMIs: ${wizardAnswers.loanMissedEmi}\n`;
      customDetails += `Tenure Preference: ${wizardAnswers.loanTenure}\n`;
    }

    const payload = {
      name: wizardAnswers.name,
      email: wizardAnswers.email,
      mobile: wizardAnswers.mobile,
      category: wizardCategory,
      capitalInvestBorrow: wizardAnswers.capital || null,
      age: isLoan ? wizardAnswers.loanAge : (isCc ? wizardAnswers.ccAge : (isMf ? wizardAnswers.mfAge : (isStocks ? wizardAnswers.stAge : null))),
      occupation: isCc ? wizardAnswers.ccOccupation : (isMf ? wizardAnswers.mfOccupation : null),
      monthlySavings: isIns ? wizardAnswers.insMonthlySavings : (isMf ? wizardAnswers.mfMonthlySavings : (isStocks ? wizardAnswers.stMonthlySavings : null)),
      investmentGoal: isMf ? wizardAnswers.mfGoal : (isStocks ? wizardAnswers.stGoal : null),
      riskTolerance: isMf ? wizardAnswers.mfRisk : (isStocks ? wizardAnswers.stRisk : null),
      investmentStyle: isStocks ? wizardAnswers.stStyle : null,
      returnExpected: isStocks ? wizardAnswers.stReturns : null,
      addDetails: customDetails,
      investmentPreference: isMf ? wizardAnswers.mfPreference : null,
      annualIncome: isIns ? wizardAnswers.insAnnualIncome : null,
      dependents: isIns ? wizardAnswers.insDependents : null,
      maritalStatus: isIns ? wizardAnswers.insMarital : null,
      existingInsurance: isIns ? JSON.stringify(wizardAnswers.insExisting || []) : null,
      insuranceCovers: isIns ? JSON.stringify(wizardAnswers.insuranceCovers || {}) : null,
      loansLiabilities: isIns ? wizardAnswers.insLoansLiabilities : null,
      monthlySpending: isCc ? wizardAnswers.ccMonthlySpending : null,
      spendingCategories: isCc ? JSON.stringify(wizardAnswers.ccSpending || []) : null,
      flyFrequency: isCc ? wizardAnswers.ccFlyFrequency : null,
      travelType: isCc ? wizardAnswers.ccTravelType : null,
      loungeImportance: isCc ? wizardAnswers.ccLoungeImportance : null,
      feeComfort: isCc ? wizardAnswers.ccFee : null,
      loanPurpose: isLoan ? wizardAnswers.loanPurpose : null,
      loanEmployment: isLoan ? wizardAnswers.loanEmployment : null,
      loanMonthlyIncome: isLoan ? wizardAnswers.loanMonthlyIncome : null,
      loanIncomeStability: isLoan ? wizardAnswers.loanIncomeStability : null,
      loanAmount: isLoan ? wizardAnswers.loanAmount : null,
      loanHasCollateral: isLoan ? wizardAnswers.loanHasCollateral : null,
      loanCollateralType: isLoan ? (wizardAnswers.loanHasCollateral === "Yes" ? wizardAnswers.loanCollateralType : null) : null,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/custom-reports`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setWizardStep("done");
    } catch (err) {
      console.error("Failed to submit form:", err);
      setWizardMessage("❌ Failed to submit. Please try again.");
    } finally {
      setWizardLoading(false);
    }
  };

  /* ============ CORE UTILITY RATING COLORS ============ */
  const getRatingClass = (rating: string | null) => {
    switch (rating) {
      case "BUY": return "buy";
      case "HOLD": return "hold";
      case "SELL": return "sell";
      default: return "";
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F1E6] pt-24 pb-20">
      
      {/* ================= SECTION 1: HERO ================= */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">
                <span className="dot"></span>
                Research Reports Portal
              </span>
              <h1>Institutional-grade<br />research,<br /><em>made readable.</em></h1>
              <p className="sub">
                <span className="hero-line-mask">
                  <span className="hero-line hero-line-ltr" style={{ animationDelay: "0ms" }}>
                    Understand the market
                  </span>
                </span>
                <span className="hero-line-mask">
                  <span className="hero-line hero-line-rtl" style={{ animationDelay: "280ms" }}>
                    before you invest your
                  </span>
                </span>
                <span className="hero-line-mask">
                  <span className="hero-line hero-line-ltr" style={{ animationDelay: "460ms" }}>
                    money.
                  </span>
                </span>
              </p>
              
              <div className="hero-ctas">
                <button
                  type="button"
                  className="hero-cta-btn"
                  onClick={() => scrollToSection("equity-screener")}
                >
                  TRY NSE SCREENER
                </button>
                <button
                  type="button"
                  className="hero-cta-btn"
                  onClick={() => scrollToSection("sectoral-overview")}
                >
                  One Stop Sectoral Overview
                </button>
                <button
                  type="button"
                  className="hero-cta-btn"
                  onClick={() => scrollToSection("theme-based-sectors")}
                >
                  Theme Based Sectoral Overview
                </button>
                <button
                  type="button"
                  className="hero-cta-btn"
                  onClick={() => scrollToSection("sectoral-heatmap")}
                >
                  SEE SECTORAL HEATMAP
                </button>
              </div>
              

            </div>

            <div className="report-mock-stage">
              <div className="phone-frame">
                <div className="phone-notch"></div>
                <span className="phone-btn phone-btn-power"></span>
                <span className="phone-btn phone-btn-vol1"></span>
                <span className="phone-btn phone-btn-vol2"></span>
                <div className="phone-screen">
                  <div className="report-mock in-phone" style={{ cursor: "default" }}>
                    <div className="report-cover-img has-photo">
                      <img className="cover-photo" src="research-report-cover.png" alt="Fiscal Forum Research Report cover" />
                    </div>
                    <div className="report-mock-footer">
                      <div className="mock-meta"><span>44 Pages</span><span>12 min read</span><span>May 2026</span></div>
                      <div className="mock-tags">
                        <span className="tag" style={{ background: "#DCF3E7" }}>Business Overview</span>
                        <span className="tag" style={{ background: "#DCF3E7" }}>Financial Highlights</span>
                        <span className="tag" style={{ background: "#DCF3E7" }}>Valuation</span>
                      </div>
                      <div className="mock-rating" style={{ color: "#E8A33D", fontWeight: "bold" }}>★★★★★ 4.9</div>
                    </div>
                  </div>
                  <div className="phone-glare"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CANDLESTICK TICKER STRIP ================= */}
      <div className="candle-strip">
        <div className="candle-track">
          <div className="candle-group">
            {candleData.map((c, i) => (
              <div key={i} className={`candle ${c.isGreen ? "green" : "red"}`}>
                <span className="wick" style={{ height: `${c.height}px` }}></span>
                <span className="body" style={{ height: `${c.bodyHeight}px` }}></span>
              </div>
            ))}
          </div>
          <div className="candle-group">
            {candleData.map((c, i) => (
              <div key={`dup-${i}`} className={`candle ${c.isGreen ? "green" : "red"}`}>
                <span className="wick" style={{ height: `${c.height}px` }}></span>
                <span className="body" style={{ height: `${c.bodyHeight}px` }}></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= SECTION 3: PRE-MARKET & WEEKLY REPORT SHOWCASE ================= */}
      <section className="section report-showcase-section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2 className="showcase-heading">Only research you need before investing</h2>
            </div>
          </div>
          <div className="showcase-grid">
            
            {/* Pre-Market Showcase */}
            <div className="showcase-col reveal-panel reveal-left" style={{ border: '1px solid #111411' }}>
              <div className="showcase-top">
                <div className="showcase-copy">
                  <span className="section-num">Daily · Before the bell</span>
                  <h2>Pre-Market Report</h2>
                  <p>Your early edge in the market. Global cues, key indicators and stocks in focus — delivered before the opening bell so you&apos;re never reacting, always ready.</p>
                </div>
                <div className="showcase-img-stage">
                  <img className="showcase-img" src="pre-market-report-cover.png" alt="Pre-Market Cover" />
                </div>
              </div>

              <div className="whats-inside">
                <h3>What&apos;s inside our pre-market report?</h3>
                <ul className="inside-list">
                  <li><img src="stocks.png" alt="Watch icon" /><span>Stocks to Watch</span></li>
                  <li><img src="market-summary.png" alt="Summary icon" /><span>Market Summary</span></li>
                  <li><img src="current-ipo.png" alt="IPO icon" /><span>Current IPO</span></li>
                  <li><img src="indian-market-snapshot.png" alt="Snapshot icon" /><span>Indian Market Snapshot</span></li>
                  <li><img src="sectoral-overview.png" alt="Sectoral icon" /><span>Sectoral Overview</span></li>
                  <li><img src="global-market-sentiment.png" alt="Sentiment icon" /><span>Global Market Sentiment</span></li>
                </ul>
                <div className="showcase-cta">
                  <p className="showcase-cta-label">To Get Latest Report</p>
                  <Link href="#table" className="btn btn-primary" style={{ display: 'block', textDecoration: 'none', color: '#FFFFFF' }}>CLICK HERE</Link>
                </div>
              </div>
            </div>

            {/* Weekly Showcase */}
            <div className="showcase-col reveal-panel reveal-right" style={{ border: '1px solid #111411' }}>
              <div className="showcase-top">
                <div className="showcase-copy">
                  <span className="section-num">Weekly · Every Monday</span>
                  <h2>Weekly Report</h2>
                  <p>Your weekly compass for smarter decisions. Market summary, top movers, sector insights and the week&apos;s economic calendar, all in one read.</p>
                </div>
                <div className="showcase-img-stage">
                  <img className="showcase-img" src="weekly-report-cover.png" alt="Weekly Cover" />
                </div>
              </div>

              <div className="whats-inside">
                <h3>What&apos;s inside our Weekly report?</h3>
                <ul className="inside-list">
                  <li><img src="weekly-market-snapshot.png" alt="Snapshot icon" /><span>Weekly Market Snapshot</span></li>
                  <li><img src="global-market-performance.png" alt="Global icon" /><span>Global Performance</span></li>
                  <li><img src="commodities.png" alt="Commodities icon" /><span>Commodities</span></li>
                  <li><img src="top-news-of-week.png" alt="News icon" /><span>Top News of the Week</span></li>
                  <li><img src="fii-dii-activity.png" alt="FII icon" /><span>FIIs & DIIs Activity</span></li>
                  <li><img src="upcoming-events.png" alt="Events icon" /><span>Upcoming Events</span></li>
                  <li><img src="stocks-in-focus.png" alt="Focus icon" /><span>Stocks in Focus</span></li>
                </ul>
                <div className="showcase-cta">
                  <p className="showcase-cta-label">To Get Latest Report</p>
                  <Link href="#table" className="btn btn-primary" style={{ display: 'block', textDecoration: 'none', color: '#FFFFFF' }}>CLICK HERE</Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECTION 3B: CUSTOM REPORT REQUEST WIZARD ================= */}
      <section className="section custom-report-section" id="customReport">
        <div className="wrap">
          {/* Section Head: Show only when wizard is active/progressing beyond category selection */}
          {!(wizardStep === 1 && !wizardCategory) && (
            <div className="section-head text-center mx-auto max-w-xl">
              <h2 className="text-3xl font-bold uppercase text-black text-center" style={{ margin: '0 auto 10px' }}>Want a customized report?</h2>
              <p className="text-center" style={{ margin: '0 auto' }}>Answer a few quick questions and we&apos;ll tailor a report to exactly what you need.</p>
            </div>
          )}

          <div className={`wizard-card ${wizardStep === 1 && !wizardCategory ? "landing-mode" : ""}`}>
            
            {/* PROGRESS DOTS */}
            {!(wizardStep === 1 && !wizardCategory) && (
              <div className="wizard-progress">
                <span className={`wizard-step-dot ${wizardStep === 1 ? "active" : (((typeof wizardStep === "number" && wizardStep > 1) || wizardStep === "done") ? "done" : "")}`} data-dot="1">1</span>
                <span className={`wizard-step-line ${((typeof wizardStep === "number" && wizardStep > 1) || wizardStep === "done") ? "filled" : ""}`}></span>
                <span className={`wizard-step-dot ${wizardStep === 3 ? "active" : (((typeof wizardStep === "number" && wizardStep > 3) || wizardStep === "done") ? "done" : "")}`} data-dot="2">2</span>
                <span className={`wizard-step-line ${((typeof wizardStep === "number" && wizardStep > 3) || wizardStep === "done") ? "filled" : ""}`}></span>
                <span className={`wizard-step-dot ${wizardStep === 4 ? "active" : (wizardStep === "done" ? "done" : "")}`} data-dot="3">3</span>
              </div>
            )}

            {/* STEP 1: CATEGORY SELECTION & SCOPED FIELDS */}
            {wizardStep === 1 && (
              <div className="wizard-step active" data-step="1">
                
                {/* Landing View: Welcome & 5 Cards */}
                {!wizardCategory ? (
                  <div className="personalized-report-center-landing">
                    {/* Hero Section */}
                    <div className="report-center-hero flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                      <div className="flex-1 text-left space-y-4">
                        <div className="flex items-center gap-2 text-amber-600 font-extrabold text-sm uppercase tracking-wider">
                          <span>✦</span> Welcome to your
                        </div>
                        <h2 className="text-4xl md:text-5xl report-center-title">
                          Personalized
                          <br />
                          Report Center
                        </h2>
                        <div className="w-24 h-1 bg-amber-400 rounded-full mt-2 mb-4"></div>
                        <p className="text-base text-gray-600 font-bold">
                          Curated insights and recommendations, designed for your financial growth.
                        </p>
                      </div>
                      <div className="w-64 h-64 md:w-80 md:h-80 shrink-0 relative rounded-2xl overflow-hidden bg-transparent">
                        <Image
                          src="/images/report_hero.png"
                          alt="Personalized Report Center Illustration"
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    </div>

                    {/* 5 Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 text-left report-center-grid-container">
                      {/* Mutual Fund Card */}
                      <div className="report-center-card" style={{
                        "--border-color": "#A7F3D0",
                        "--bg-gradient": "linear-gradient(to bottom, #F0FDF4, #FFFFFF)",
                        "--title-color": "#065F46",
                        "--btn-bg": "#ECFDF5",
                        "--btn-border": "#A7F3D0",
                        "--btn-text": "#065F46",
                        "--btn-hover-bg": "#D1FAE5",
                        "--arrow-bg": "#065F46",
                        "--arrow-border": "#065F46",
                        "--hover-shadow-color": "rgba(16, 185, 129, 0.12)"
                      } as React.CSSProperties}>
                        <div>
                          <div className="report-center-card-image-wrapper w-full h-32 relative rounded-[6px] overflow-hidden mb-4 border border-black/15 bg-gray-50 shadow-sm">
                            <Image
                              src="/images/wizard_mutual_fund.png"
                              alt="Mutual Fund"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3 className="report-center-card-title">Mutual Fund</h3>
                          <p className="report-center-card-desc">
                            Detailed analysis and top performing mutual funds curated for you.
                          </p>
                        </div>
                        <div className="report-center-card-btn-row flex items-center gap-2 mt-4 pt-4 border-t border-emerald-50">
                          <button
                            type="button"
                            onClick={() => setWizardCategory("Mutual Fund")}
                            className="report-center-card-btn"
                          >
                            Get Yours
                          </button>
                        </div>
                      </div>

                      {/* Stocks Card */}
                      <div className="report-center-card" style={{
                        "--border-color": "#BFDBFE",
                        "--bg-gradient": "linear-gradient(to bottom, #EFF6FF, #FFFFFF)",
                        "--title-color": "#1E40AF",
                        "--btn-bg": "#EFF6FF",
                        "--btn-border": "#BFDBFE",
                        "--btn-text": "#1E40AF",
                        "--btn-hover-bg": "#DBEAFE",
                        "--arrow-bg": "#1E40AF",
                        "--arrow-border": "#1E40AF",
                        "--hover-shadow-color": "rgba(59, 130, 246, 0.12)"
                      } as React.CSSProperties}>
                        <div>
                          <div className="report-center-card-image-wrapper w-full h-32 relative rounded-[6px] overflow-hidden mb-4 border border-black/15 bg-gray-50 shadow-sm">
                            <Image
                              src="/images/wizard_stocks.png"
                              alt="Stocks"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3 className="report-center-card-title">Stocks</h3>
                          <p className="report-center-card-desc">
                            In-depth stock research, expert picks and market outlook.
                          </p>
                        </div>
                        <div className="report-center-card-btn-row flex items-center gap-2 mt-4 pt-4 border-t border-blue-50">
                          <button
                            type="button"
                            onClick={() => setWizardCategory("Stocks")}
                            className="report-center-card-btn"
                          >
                            Get Yours
                          </button>
                        </div>
                      </div>

                      {/* Credit Card Card */}
                      <div className="report-center-card" style={{
                        "--border-color": "#DDD6FE",
                        "--bg-gradient": "linear-gradient(to bottom, #F5F3FF, #FFFFFF)",
                        "--title-color": "#5B21B6",
                        "--btn-bg": "#F5F3FF",
                        "--btn-border": "#DDD6FE",
                        "--btn-text": "#5B21B6",
                        "--btn-hover-bg": "#EDE9FE",
                        "--arrow-bg": "#5B21B6",
                        "--arrow-border": "#5B21B6",
                        "--hover-shadow-color": "rgba(139, 92, 246, 0.12)"
                      } as React.CSSProperties}>
                        <div>
                          <div className="report-center-card-image-wrapper w-full h-32 relative rounded-[6px] overflow-hidden mb-4 border border-black/15 bg-gray-50 shadow-sm">
                            <Image
                              src="/images/wizard_credit_card.png"
                              alt="Credit Card"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3 className="report-center-card-title">Credit Card</h3>
                          <p className="report-center-card-desc">
                            Best credit card recommendations tailored to your lifestyle.
                          </p>
                        </div>
                        <div className="report-center-card-btn-row flex items-center gap-2 mt-4 pt-4 border-t border-purple-50">
                          <button
                            type="button"
                            onClick={() => setWizardCategory("Credit Card")}
                            className="report-center-card-btn"
                          >
                            Get Yours
                          </button>
                        </div>
                      </div>

                      {/* Insurance Card */}
                      <div className="report-center-card" style={{
                        "--border-color": "#FDE68A",
                        "--bg-gradient": "linear-gradient(to bottom, #FEF3C7, #FFFFFF)",
                        "--title-color": "#92400E",
                        "--btn-bg": "#FEF3C7",
                        "--btn-border": "#FDE68A",
                        "--btn-text": "#92400E",
                        "--btn-hover-bg": "#FDE68A",
                        "--arrow-bg": "#92400E",
                        "--arrow-border": "#92400E",
                        "--hover-shadow-color": "rgba(245, 158, 11, 0.12)"
                      } as React.CSSProperties}>
                        <div>
                          <div className="report-center-card-image-wrapper w-full h-32 relative rounded-[6px] overflow-hidden mb-4 border border-black/15 bg-gray-50 shadow-sm">
                            <Image
                              src="/images/wizard_insurance.png"
                              alt="Insurance"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3 className="report-center-card-title">Insurance</h3>
                          <p className="report-center-card-desc">
                            Smart insurance recommendations for a secure future.
                          </p>
                        </div>
                        <div className="report-center-card-btn-row flex items-center gap-2 mt-4 pt-4 border-t border-amber-50">
                          <button
                            type="button"
                            onClick={() => setWizardCategory("Insurance")}
                            className="report-center-card-btn"
                          >
                            Get Yours
                          </button>
                        </div>
                      </div>

                      {/* Loans Card */}
                      <div className="report-center-card" style={{
                        "--border-color": "#C7D2FE",
                        "--bg-gradient": "linear-gradient(to bottom, #EEF2FF, #FFFFFF)",
                        "--title-color": "#3730A3",
                        "--btn-bg": "#EEF2FF",
                        "--btn-border": "#C7D2FE",
                        "--btn-text": "#3730A3",
                        "--btn-hover-bg": "#C7D2FE",
                        "--arrow-bg": "#3730A3",
                        "--arrow-border": "#3730A3",
                        "--hover-shadow-color": "rgba(99, 102, 241, 0.12)"
                      } as React.CSSProperties}>
                        <div>
                          <div className="report-center-card-image-wrapper w-full h-32 relative rounded-[6px] overflow-hidden mb-4 border border-black/15 bg-gray-50 shadow-sm">
                            <Image
                              src="/images/wizard_loans.png"
                              alt="Loans"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3 className="report-center-card-title">Loans</h3>
                          <p className="report-center-card-desc">
                            Compare and choose the best loan options for your needs.
                          </p>
                        </div>
                        <div className="report-center-card-btn-row flex items-center gap-2 mt-4 pt-4 border-t border-indigo-50">
                          <button
                            type="button"
                            onClick={() => setWizardCategory("Loans")}
                            className="report-center-card-btn"
                          >
                            Get Yours
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Active Questionnaire view: Active category block at the top as banner, and show the questions below it */
                  <div className="wizard-category-questions-container">
                    
                    {/* Active Block Header banner */}
                    <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-[#F4FBF7] border border-black rounded-2xl shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0 shadow-sm border border-black/10 bg-white">
                          <Image
                            src={
                              wizardCategory === "Mutual Fund" ? "/images/wizard_mutual_fund.png" :
                              wizardCategory === "Stocks" ? "/images/wizard_stocks.png" :
                              wizardCategory === "Credit Card" ? "/images/wizard_credit_card.png" :
                              wizardCategory === "Insurance" ? "/images/wizard_insurance.png" :
                              "/images/wizard_loans.png"
                            }
                            alt={wizardCategory}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <h4 className="text-lg font-black text-black uppercase tracking-tight">Customized {wizardCategory} Report</h4>
                          <p className="text-xs text-gray-500 font-semibold">Please answer the questions below to customize your report.</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setWizardCategory("")}
                        className="px-4 py-2 bg-white hover:bg-gray-50 text-black border border-black rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                      >
                        ← Change Category
                      </button>
                    </div>

                    <div className="wizard-category-details">
                  
                  {/* Stocks Scoped Fields */}
                  {wizardCategory === "Stocks" && (
                    <div className="wizard-category-fields">
                      <div className="wizard-field-grid">
                        <div className="wizard-field">
                          <label>Age</label>
                          <input type="number" className="wizard-input-plain" placeholder="e.g. 28" value={wizardAnswers.stAge || ""} onChange={(e) => handleWizardOptionToggle("stAge", e.target.value)} />
                        </div>
                        <div className="wizard-field">
                          <label>Monthly Savings (₹)</label>
                          <input type="number" className="wizard-input-plain" placeholder="e.g. 20000" value={wizardAnswers.stMonthlySavings || ""} onChange={(e) => handleWizardOptionToggle("stMonthlySavings", e.target.value)} />
                        </div>
                        <div className="wizard-field">
                          <label>Returns Expectation</label>
                          <input type="text" className="wizard-input-plain" placeholder="e.g. 15% annually" value={wizardAnswers.stReturns || ""} onChange={(e) => handleWizardOptionToggle("stReturns", e.target.value)} />
                        </div>
                        <div className="wizard-field">
                          <label>Investment Goal</label>
                          <input type="text" className="wizard-input-plain" placeholder="e.g. Wealth creation" value={wizardAnswers.stGoal || ""} onChange={(e) => handleWizardOptionToggle("stGoal", e.target.value)} />
                        </div>
                      </div>
                      <div className="wizard-field">
                        <label>Risk Tolerance</label>
                        <div className="wizard-options wizard-options-sm">
                          {["Low", "Medium", "High"].map(risk => (
                            <button
                              key={risk}
                              type="button"
                              className={`wizard-option ${wizardAnswers.stRisk === risk ? "selected" : ""}`}
                              onClick={() => handleWizardOptionToggle("stRisk", risk)}
                            >
                              {risk}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="wizard-field mt-4">
                        <label>Investment Style</label>
                        <input type="text" className="wizard-input-plain" placeholder="e.g. Swing trading, Value investing" value={wizardAnswers.stStyle || ""} onChange={(e) => handleWizardOptionToggle("stStyle", e.target.value)} />
                      </div>
                    </div>
                  )}

                  {/* Mutual Fund Scoped Fields */}
                  {wizardCategory === "Mutual Fund" && (
                    <div className="wizard-category-fields">
                      <div className="wizard-field-grid">
                        <div className="wizard-field">
                          <label>Age</label>
                          <input type="number" className="wizard-input-plain" placeholder="e.g. 32" value={wizardAnswers.mfAge || ""} onChange={(e) => handleWizardOptionToggle("mfAge", e.target.value)} />
                        </div>
                        <div className="wizard-field">
                          <label>Occupation</label>
                          <input type="text" className="wizard-input-plain" placeholder="e.g. IT Professional" value={wizardAnswers.mfOccupation || ""} onChange={(e) => handleWizardOptionToggle("mfOccupation", e.target.value)} />
                        </div>
                        <div className="wizard-field">
                          <label>Monthly Savings (₹)</label>
                          <input type="number" className="wizard-input-plain" placeholder="e.g. 15000" value={wizardAnswers.mfMonthlySavings || ""} onChange={(e) => handleWizardOptionToggle("mfMonthlySavings", e.target.value)} />
                        </div>
                        <div className="wizard-field">
                          <label>Goal</label>
                          <input type="text" className="wizard-input-plain" placeholder="e.g. Child education" value={wizardAnswers.mfGoal || ""} onChange={(e) => handleWizardOptionToggle("mfGoal", e.target.value)} />
                        </div>
                      </div>
                      <div className="wizard-field">
                        <label>Risk</label>
                        <div className="wizard-options wizard-options-sm">
                          {["Low", "Medium", "High"].map(risk => (
                            <button
                              key={risk}
                              type="button"
                              className={`wizard-option ${wizardAnswers.mfRisk === risk ? "selected" : ""}`}
                              onClick={() => handleWizardOptionToggle("mfRisk", risk)}
                            >
                              {risk}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="wizard-field mt-4">
                        <label>Investment Preference</label>
                        <div className="wizard-options wizard-options-sm">
                          {["Lump Sum", "SIP", "Lump Sum + SIP"].map(pref => (
                            <button
                              key={pref}
                              type="button"
                              className={`wizard-option ${wizardAnswers.mfPreference === pref ? "selected" : ""}`}
                              onClick={() => handleWizardOptionToggle("mfPreference", pref)}
                            >
                              {pref}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Insurance Scoped Fields */}
                  {wizardCategory === "Insurance" && (
                    <div className="wizard-category-fields">
                      <div className="wizard-field-grid">
                        <div className="wizard-field">
                          <label>Annual Income (₹)</label>
                          <input type="number" className="wizard-input-plain" placeholder="e.g. 900000" value={wizardAnswers.insAnnualIncome || ""} onChange={(e) => handleWizardOptionToggle("insAnnualIncome", e.target.value)} />
                        </div>
                        <div className="wizard-field">
                          <label>Monthly Savings (₹)</label>
                          <input type="number" className="wizard-input-plain" placeholder="e.g. 15000" value={wizardAnswers.insMonthlySavings || ""} onChange={(e) => handleWizardOptionToggle("insMonthlySavings", e.target.value)} />
                        </div>
                        <div className="wizard-field">
                          <label>Dependents</label>
                          <input type="number" className="wizard-input-plain" placeholder="e.g. 3" value={wizardAnswers.insDependents || ""} onChange={(e) => handleWizardOptionToggle("insDependents", e.target.value)} />
                        </div>
                      </div>
                      <div className="wizard-field">
                        <label>Marital Status</label>
                        <div className="wizard-options wizard-options-sm">
                          {["Single", "Married"].map(status => (
                            <button
                              key={status}
                              type="button"
                              className={`wizard-option ${wizardAnswers.insMarital === status ? "selected" : ""}`}
                              onClick={() => handleWizardOptionToggle("insMarital", status)}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="wizard-field mt-4">
                        <label>Do you currently have insurance? (Select multiple)</label>
                        <div className="wizard-options wizard-options-sm">
                          {Object.keys(insuranceCoverMap).map(cover => (
                            <button
                              key={cover}
                              type="button"
                              className={`wizard-option ${wizardAnswers.insExisting?.includes(cover) ? "selected" : ""}`}
                              onClick={() => handleWizardOptionToggle("insExisting", cover, true)}
                            >
                              {cover}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Cover Details dynamically generated */}
                      {wizardAnswers.insExisting?.length > 0 && (
                        <div className="wizard-subsection">
                          <h4 className="wizard-subheading">Active Cover Details</h4>
                          <div className="wizard-field-grid">
                            {wizardAnswers.insExisting.map((c: string) => {
                              const details = insuranceCoverMap[c];
                              if (!details) return null;
                              return (
                                <div className="wizard-field" key={c}>
                                  <label>{details.label}</label>
                                  <input
                                    type="number"
                                    className="wizard-input-plain"
                                    placeholder={details.placeholder}
                                    value={wizardAnswers.insuranceCovers?.[c] || ""}
                                    onChange={(e) => handleInsuranceCoverInput(c, e.target.value)}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className="wizard-field mt-4">
                        <label>Loans and Liabilities</label>
                        <textarea className="wizard-textarea" rows={3} placeholder="e.g. Home loan ₹15L, Credit card outstanding ₹30k" value={wizardAnswers.insLoansLiabilities || ""} onChange={(e) => handleWizardOptionToggle("insLoansLiabilities", e.target.value)} />
                      </div>
                    </div>
                  )}

                  {/* Credit Card Scoped Fields */}
                  {wizardCategory === "Credit Card" && (
                    <div className="wizard-category-fields">
                      <div className="wizard-field-grid">
                        <div className="wizard-field">
                          <label>Age</label>
                          <input type="number" className="wizard-input-plain" placeholder="e.g. 27" value={wizardAnswers.ccAge || ""} onChange={(e) => handleWizardOptionToggle("ccAge", e.target.value)} />
                        </div>
                        <div className="wizard-field">
                          <label>Annual Salary (₹)</label>
                          <input type="number" className="wizard-input-plain" placeholder="e.g. 600000" value={wizardAnswers.ccMonthlySpending || ""} onChange={(e) => handleWizardOptionToggle("ccMonthlySpending", e.target.value)} />
                        </div>
                        <div className="wizard-field">
                          <label>Occupation</label>
                          <input type="text" className="wizard-input-plain" placeholder="e.g. Salaried" value={wizardAnswers.ccOccupation || ""} onChange={(e) => handleWizardOptionToggle("ccOccupation", e.target.value)} />
                        </div>
                      </div>
                      <div className="wizard-field">
                        <label>Where does your major spending go?</label>
                        <div className="wizard-options wizard-options-sm">
                          {["Groceries", "Dining / Food Delivery", "Online Shopping", "Fuel", "Travel", "Hotels", "Entertainment", "Utilities / Bills"].map(cat => (
                            <button
                              key={cat}
                              type="button"
                              className={`wizard-option ${wizardAnswers.ccSpending?.includes(cat) ? "selected" : ""}`}
                              onClick={() => handleWizardOptionToggle("ccSpending", cat, true)}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Travel Behaviour Sub-section (Dynamic) */}
                      {(wizardAnswers.ccSpending?.includes("Travel") || wizardAnswers.ccSpending?.includes("Hotels")) && (
                        <div className="wizard-subsection">
                          <h4 className="wizard-subheading">Travel Behaviour</h4>
                          <div className="wizard-field">
                            <label>How often do you fly?</label>
                            <div className="wizard-options wizard-options-sm">
                              {["Never", "1–2/year", "3–5/year", "6–10/year", "10+/year"].map(fly => (
                                <button
                                  key={fly}
                                  type="button"
                                  className={`wizard-option ${wizardAnswers.ccFlyFrequency === fly ? "selected" : ""}`}
                                  onClick={() => handleWizardOptionToggle("ccFlyFrequency", fly)}
                                >
                                  {fly}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="wizard-field mt-4">
                            <label>Where do you usually travel?</label>
                            <div className="wizard-options wizard-options-sm">
                              {["Domestic", "International", "Both"].map(type => (
                                <button
                                  key={type}
                                  type="button"
                                  className={`wizard-option ${wizardAnswers.ccTravelType === type ? "selected" : ""}`}
                                  onClick={() => handleWizardOptionToggle("ccTravelType", type)}
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="wizard-field mt-4">
                            <label>How important is airport lounge access? (1=None, 5=Essential)</label>
                            <div className="wizard-slider-row">
                              <span className="wizard-slider-label">Not Important</span>
                              <input type="range" className="wizard-slider" min="1" max="5" step="1" value={wizardAnswers.ccLoungeImportance} onChange={(e) => handleWizardOptionToggle("ccLoungeImportance", e.target.value)} />
                              <span className="wizard-slider-label">Essential</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="wizard-field mt-4">
                        <label>How much annual fee are you comfortable paying?</label>
                        <div className="wizard-options-stack">
                          {["₹0 — Lifetime-free preferred", "Up to ₹500 — Basic benefits", "₹500–₹2,000 — Better rewards", "₹2,000–₹5,000 — Premium benefits"].map(fee => (
                            <button
                              key={fee}
                              type="button"
                              className={`wizard-option wizard-option-stack ${wizardAnswers.ccFee === fee ? "selected" : ""}`}
                              onClick={() => handleWizardOptionToggle("ccFee", fee)}
                            >
                              <span className="wizard-option-title">{fee.split(" — ")[0]}</span>
                              <span className="wizard-option-sub">{fee.split(" — ")[1]}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Loan Scoped Fields */}
                  {(wizardCategory === "Loan" || wizardCategory === "Loans") && (
                    <div className="wizard-category-fields">
                      <h4 className="wizard-subheading" style={{ marginTop: 0 }}>What do you need the loan for?</h4>
                      <div className="wizard-visual-cards">
                        {["Home Purchase", "Car / Vehicle", "Education", "Business", "Personal Expenses", "Medical Emergency", "Home Renovation"].map(purpose => (
                          <button
                            key={purpose}
                            type="button"
                            className={`wizard-option ${wizardAnswers.loanPurpose === purpose ? "selected" : ""}`}
                            onClick={() => handleWizardOptionToggle("loanPurpose", purpose)}
                          >
                            {purpose}
                          </button>
                        ))}
                      </div>

                      <div className="wizard-subsection">
                        <h4 className="wizard-subheading">Financial Profile & Requirements</h4>
                        <div className="wizard-field">
                          <label>What&apos;s your age? ({wizardAnswers.loanAge})</label>
                          <div className="wizard-slider-row">
                            <span className="wizard-slider-label">18</span>
                            <input type="range" className="wizard-slider" min="18" max="70" step="1" value={wizardAnswers.loanAge} onChange={(e) => handleWizardOptionToggle("loanAge", e.target.value)} />
                            <span className="wizard-slider-label">70+</span>
                          </div>
                        </div>

                        <div className="wizard-field mt-4">
                          <label>Employment Type</label>
                          <div className="wizard-options wizard-options-sm">
                            {["Salaried", "Self-employed", "Business", "Professional"].map(emp => (
                              <button
                                key={emp}
                                type="button"
                                className={`wizard-option ${wizardAnswers.loanEmployment === emp ? "selected" : ""}`}
                                onClick={() => handleWizardOptionToggle("loanEmployment", emp)}
                              >
                                {emp}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="wizard-field mt-4">
                          <label>Monthly Take-home Income (₹)</label>
                          <input type="number" className="wizard-input-plain" placeholder="e.g. 60000" value={wizardAnswers.loanMonthlyIncome || ""} onChange={(e) => handleWizardOptionToggle("loanMonthlyIncome", e.target.value)} />
                        </div>

                        <div className="wizard-field mt-4">
                          <label>Stability of Income</label>
                          <div className="wizard-options wizard-options-sm">
                            {["Stable", "Somewhat variable", "Highly variable"].map(stab => (
                              <button
                                key={stab}
                                type="button"
                                className={`wizard-option ${wizardAnswers.loanIncomeStability === stab ? "selected" : ""}`}
                                onClick={() => handleWizardOptionToggle("loanIncomeStability", stab)}
                              >
                                {stab}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="wizard-field mt-4">
                          <label>How much do you want to borrow? (₹{Number(wizardAnswers.loanAmount).toLocaleString()})</label>
                          <div className="wizard-slider-row">
                            <span className="wizard-slider-label">₹50K</span>
                            <input type="range" className="wizard-slider" min="50000" max="10000000" step="50000" value={wizardAnswers.loanAmount} onChange={(e) => handleWizardOptionToggle("loanAmount", e.target.value)} />
                            <span className="wizard-slider-label">₹1Cr+</span>
                          </div>
                        </div>

                        <div className="wizard-field mt-4">
                          <label>Do you have collateral to offer?</label>
                          <div className="wizard-options wizard-options-sm">
                            {["Yes", "No"].map(col => (
                              <button
                                key={col}
                                type="button"
                                className={`wizard-option ${wizardAnswers.loanHasCollateral === col ? "selected" : ""}`}
                                onClick={() => handleWizardOptionToggle("loanHasCollateral", col)}
                              >
                                {col}
                              </button>
                            ))}
                          </div>
                        </div>

                        {wizardAnswers.loanHasCollateral === "Yes" && (
                          <div className="wizard-field mt-4">
                            <label>Collateral Type</label>
                            <div className="wizard-options wizard-options-sm">
                              {["Property", "Vehicle", "Fixed Deposit", "Gold"].map(type => (
                                <button
                                  key={type}
                                  type="button"
                                  className={`wizard-option ${wizardAnswers.loanCollateralType === type ? "selected" : ""}`}
                                  onClick={() => handleWizardOptionToggle("loanCollateralType", type)}
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>

                    {/* Navigation Buttons for Step 1 Questions */}
                    <div className="wizard-nav flex justify-between mt-8">
                      <button
                        type="button"
                        className="wizard-btn"
                        onClick={() => setWizardCategory("")}
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        className="wizard-btn primary"
                        disabled={!wizardCategory}
                        onClick={() => setWizardStep(3)}
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: OPEN REQUIREMENTS */}
            {wizardStep === 3 && (
              <div className="wizard-step active" data-step="3">
                <h3>Give specific details about your requirements</h3>
                <textarea
                  className="wizard-textarea"
                  rows={5}
                  placeholder="Tell us anything specific you'd like this report to cover..."
                  value={wizardAnswers.details || ""}
                  onChange={(e) => handleWizardOptionToggle("details", e.target.value)}
                />
                <div className="wizard-nav">
                  <button type="button" className="wizard-btn" onClick={() => setWizardStep(1)}>← Back</button>
                  <button type="button" className="wizard-btn primary" onClick={() => setWizardStep(4)}>Next →</button>
                </div>
              </div>
            )}

            {/* STEP 4: CONTACT DETAILS */}
            {wizardStep === 4 && (
              <div className="wizard-step active" data-step="4">
                <h3>Give your details, we will get back to you ASAP</h3>
                <div className="wizard-field">
                  <label>Name</label>
                  <input
                    type="text"
                    className="wizard-input-plain"
                    placeholder="Your full name"
                    value={wizardAnswers.name || ""}
                    onChange={(e) => handleWizardOptionToggle("name", e.target.value)}
                  />
                </div>
                <div className="wizard-field">
                  <label>Gmail</label>
                  <input
                    type="email"
                    className="wizard-input-plain"
                    placeholder="you@gmail.com"
                    value={wizardAnswers.email || ""}
                    onChange={(e) => handleWizardOptionToggle("email", e.target.value)}
                  />
                </div>
                <div className="wizard-field">
                  <label>Mobile no.</label>
                  <input
                    type="tel"
                    className="wizard-input-plain"
                    placeholder="10-digit WhatsApp mobile number"
                    maxLength={10}
                    value={wizardAnswers.mobile || ""}
                    onChange={(e) => handleWizardOptionToggle("mobile", e.target.value)}
                  />
                </div>

                {wizardMessage && (
                  <div className="p-3 mb-4 rounded-xl border border-[#C4432B] text-sm text-[#C4432B] bg-[#fdeceb] font-bold">
                    {wizardMessage}
                  </div>
                )}

                <div className="wizard-nav">
                  <button type="button" className="wizard-btn" onClick={() => setWizardStep(3)}>← Back</button>
                  <button
                    type="button"
                    className="wizard-btn primary"
                    disabled={wizardLoading}
                    onClick={handleWizardSubmit}
                  >
                    {wizardLoading ? "Submitting..." : "Submit request"}
                  </button>
                </div>
              </div>
            )}

            {/* SUCCESS PANEL */}
            {wizardStep === "done" && (
              <div className="wizard-step wizard-success active" data-step="done">
                <h3>Thanks — your custom report request is in!</h3>
                <p>We are processing your details and will send your customized report on your WhatsApp number shortly.</p>
                <button
                  type="button"
                  className="wizard-btn"
                  onClick={() => {
                    setWizardStep(1);
                    setWizardAnswers({
                      ...wizardAnswers,
                      capital: "",
                      details: "",
                      name: "",
                      email: "",
                      mobile: ""
                    });
                  }}
                >
                  Start another request
                </button>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ================= SECTION 4: REPORTS TABLE ================= */}
      <section className="section reports-table-section" id="table" style={{ borderTop: '1px solid rgba(17,20,17,0.1)' }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>Research Reports Database</h2>
              <p>Explore full institutional-grade analysis from our research desk.</p>
            </div>
          </div>

          <div className="filter-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`filter-tab ${reportsFilter === (tab.id === 'all' ? 'all' : tab.id) ? "active" : ""}`}
                onClick={() => setReportsFilter(tab.id === 'all' ? 'all' : tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* REPORTS ROW LIST */}
          <div className="reports-table">
            <div className="reports-table-head">
              <div>Report Info</div>
              <div>Stock</div>
              <div>Author</div>
              <div>Date</div>
              <div>Rating</div>
              <div style={{ textAlign: "center" }}>Action</div>
            </div>

            {displayedDbReports.length === 0 ? (
              <div className="p-12 text-center text-gray-500 font-bold bg-[#FFFFFF]">
                No reports found matching your selection.
              </div>
            ) : (
              displayedDbReports.map((report) => (
                <div className="reports-row" key={report.id} onClick={() => { if (report.pdfUrl) window.open(report.pdfUrl, '_blank', 'noopener,noreferrer'); }}>
                  <div className="col-info">
                    <div className="row-title">{report.title}</div>
                    <div className="row-tags">
                      {(report.tags || []).map((t, idx) => (
                        <span className="row-tag" key={idx}>{t}</span>
                      ))}
                      {report.reportType && <span className="row-tag">{report.reportType}</span>}
                    </div>
                  </div>

                  <div className="col-stock">
                    <span className="stock-main">{report.stock || "N/A"}</span>
                    {report.company && <span className="stock-sub">{report.company}</span>}
                  </div>

                  <div className="col-author">
                    <span className="author-avatar">
                      <FaUser />
                    </span>
                    <div>
                      <div className="author-name">{report.author || "Fiscal Forum"}</div>
                      <div className="author-sub">{report.authorFirm || "Research Desk"}</div>
                    </div>
                  </div>

                  <div className="col-date">
                    <FaCalendarAlt style={{ opacity: 0.6 }} />
                    {formatDate(report.publishDate)}
                  </div>

                  <div className="col-rating">
                    <span className={`rating-pill ${getRatingClass(report.rating)}`}>
                      {report.rating || "HOLD"}
                    </span>
                  </div>

                  <div className="col-action" onClick={(e) => e.stopPropagation()}>
                    <button className="view-report-btn" onClick={() => { if (report.pdfUrl) window.open(report.pdfUrl, '_blank', 'noopener,noreferrer'); }}>
                      View Report
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* PAGINATION CONTROLS */}
          {totalReportsPages > 1 && (
            <div className="pagination-wrap">
              <button
                type="button"
                className="pagination-btn"
                onClick={() => setReportsPage(prev => Math.max(prev - 1, 1))}
                disabled={reportsPage === 1}
              >
                Previous
              </button>
              
              {Array.from({ length: totalReportsPages }, (_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    className={`pagination-btn ${reportsPage === pageNum ? "active" : ""}`}
                    onClick={() => setReportsPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                type="button"
                className="pagination-btn"
                onClick={() => setReportsPage(prev => Math.min(prev + 1, totalReportsPages))}
                disabled={reportsPage === totalReportsPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
      {/* ================= SECTION 6B: NSE EQUITY SCREENER ================= */}
      <section className="section screener-embed-section" id="equity-screener" style={{ borderTop: '1px solid rgba(17,20,17,0.1)' }}>
        <div className="wrap" style={{ paddingBottom: '0' }}>
          <div className="section-head" style={{ marginBottom: '10px' }}>
            <div>
              <h2>NSE Equity Screener</h2>
              <p>Search, filter and rank every live NSE-listed equity by valuation, profitability, market-cap tier and index membership — right on this page.</p>
            </div>
          </div>
        </div>

        <div id="screener-app">
          <div className="grain"></div>
          <main>
            
            <div className="view-tabs">
              <div className="view-tabs-btns">
                <button className={`nav-btn ${screenerTab === 'screener' ? 'active' : ''}`} onClick={() => setScreenerTab('screener')}>
                  Screener
                </button>
                <button className={`nav-btn ${screenerTab === 'watchlist' ? 'active' : ''}`} onClick={() => setScreenerTab('watchlist')}>
                  Watchlist <span className="count-pill">{watchlist.size}</span>
                </button>
                <button className={`nav-btn ${screenerTab === 'about' ? 'active' : ''}`} onClick={() => setScreenerTab('about')}>
                  About the data
                </button>
              </div>
            </div>

            {/* SCREENER TABLE VIEW */}
            {screenerTab === "screener" && (
              <section className="view active">
                <div className="control-deck" style={{ border: '1px solid #111411' }}>
                  
                  <div className="search-row">
                    <div className="search-input-wrapper" style={{ position: 'relative', flex: '1 1 320px' }}>
                      <input
                        type="text"
                        placeholder="Search symbol, company name or ISIN…"
                        value={screenerSearch}
                        onChange={(e) => {
                          setScreenerSearch(e.target.value);
                          setScreenerPage(1);
                          setShowScreenerSuggestions(true);
                        }}
                        onFocus={() => setShowScreenerSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowScreenerSuggestions(false), 200)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setShowScreenerSuggestions(false);
                            if (filteredStocks.length > 0) {
                              const targetStock = filteredStocks[0];
                              setHighlightedStockSym(targetStock.sym);
                              setTimeout(() => {
                                const element = document.getElementById("screener-table-section");
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }
                              }, 100);
                              setTimeout(() => {
                                setHighlightedStockSym(null);
                              }, 2500);
                            }
                          }
                        }}
                        style={{ border: '1px solid rgba(17,20,17,0.4)', width: '100%', boxSizing: 'border-box' }}
                      />

                      {showScreenerSuggestions && screenerSuggestions.length > 0 && (
                        <div className="screener-suggestions-dropdown">
                          {screenerSuggestions.map(s => (
                            <button
                              key={s.sym}
                              type="button"
                              className="dropdown-item"
                              onClick={() => {
                                setScreenerSearch(s.sym);
                                setScreenerPage(1);
                                setHighlightedStockSym(s.sym);
                                setShowScreenerSuggestions(false);
                                setTimeout(() => {
                                  const element = document.getElementById("screener-table-section");
                                  if (element) {
                                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                  }
                                }, 100);
                                setTimeout(() => {
                                  setHighlightedStockSym(null);
                                }, 2500);
                              }}
                            >
                              <span className="sym">{s.sym}</span>
                              <span className="name">{s.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <select
                      value={screenerSort}
                      onChange={(e) => setScreenerSort(e.target.value)}
                      style={{ border: '1px solid rgba(17,20,17,0.4)' }}
                    >
                      <option value="name-asc">Name A→Z</option>
                      <option value="name-desc">Name Z→A</option>
                      <option value="sym-asc">Symbol A→Z</option>
                      <option value="listyear-desc">Newest listing</option>
                      <option value="listyear-asc">Oldest listing</option>
                      <option value="pe-asc">P/E low→high</option>
                      <option value="pe-desc">P/E high→low</option>
                      <option value="roe-desc">ROE% high→low</option>
                      <option value="roce-desc">ROCE% high→low</option>
                      <option value="mcap-desc">Market Cap high→low</option>
                      <option value="mcap-asc">Market Cap low→high</option>
                    </select>
                  </div>

                  <div className="filter-groups">
                    {/* Cap Tier Filter */}
                    <details className="filter-group filter-dropdown" open>
                      <summary className="fg-label">
                        Market cap tier
                        <span className="fg-caret"><FaChevronDown className="w-3 h-3 inline" /></span>
                      </summary>
                      <div className="chip-row">
                        {["Large Cap", "Mid Cap", "Small Cap", "Micro Cap"].map(tier => (
                          <button
                            key={tier}
                            type="button"
                            className={`chip ${screenerTierFilter.has(tier) ? "active" : ""}`}
                            onClick={() => toggleScreenerChip('tier', tier)}
                          >
                            {tier}
                          </button>
                        ))}
                      </div>
                    </details>

                    {/* Mcap Slots */}
                    <details className="filter-group filter-dropdown">
                      <summary className="fg-label">
                        Market capitalization (Cr)
                        <span className="fg-caret"><FaChevronDown className="w-3 h-3 inline" /></span>
                      </summary>
                      <div className="chip-row">
                        {[
                          { val: "0-50", label: "Under 50" },
                          { val: "50-100", label: "50 - 100" },
                          { val: "100-500", label: "100 - 500" },
                          { val: "500-1000", label: "500 - 1,000" },
                          { val: "1000-2000", label: "1,000 - 2,000" },
                          { val: "2000-5000", label: "2,000 - 5,000" },
                          { val: "5000-10000", label: "5,000 - 10,000" },
                          { val: "10000-25000", label: "10,000 - 25,000" },
                          { val: "25000-50000", label: "25,000 - 50,000" },
                          { val: "50000-inf", label: "Above 50,000" }
                        ].map(slot => (
                          <button
                            key={slot.val}
                            type="button"
                            className={`chip ${screenerMcapFilter.has(slot.val) ? "active" : ""}`}
                            onClick={() => toggleScreenerChip('mcapSlot', slot.val)}
                          >
                            {slot.label}
                          </button>
                        ))}
                      </div>
                      {screenerTierFilter.has("Large Cap") && screenerMcapFilter.size > 0 && Array.from(screenerMcapFilter).some(val => val !== "50000-inf") && (
                        <div className="screener-note-inline">
                          <FaInfoCircle className="info-icon" style={{ flexShrink: 0 }} />
                          <span>All Large Caps are above 50,000</span>
                        </div>
                      )}
                      {screenerTierFilter.has("Mid Cap") && screenerMcapFilter.size > 0 && Array.from(screenerMcapFilter).some(val => ["0-50", "50-100", "100-500", "500-1000", "1000-2000", "2000-5000", "5000-10000"].includes(val)) && (
                        <div className="screener-note-inline">
                          <FaInfoCircle className="info-icon" style={{ flexShrink: 0 }} />
                          <span>All Mid Caps are above 10,000 Cr.</span>
                        </div>
                      )}
                      {screenerTierFilter.has("Small Cap") && screenerMcapFilter.size > 0 && Array.from(screenerMcapFilter).some(val => ["0-50", "50-100", "100-500", "500-1000", "1000-2000", "2000-5000"].includes(val)) && (
                        <div className="screener-note-inline">
                          <FaInfoCircle className="info-icon" style={{ flexShrink: 0 }} />
                          <span>All Small Caps above 5000 Crs.</span>
                        </div>
                      )}
                      {screenerTierFilter.has("Micro Cap") && screenerMcapFilter.size > 0 && Array.from(screenerMcapFilter).some(val => ["5000-10000", "10000-25000", "25000-50000", "50000-inf"].includes(val)) && (
                        <div className="screener-note-inline">
                          <FaInfoCircle className="info-icon" style={{ flexShrink: 0 }} />
                          <span>All Micro Caps are below 5000 Crs.</span>
                        </div>
                      )}
                    </details>

                    {/* OPM Slots */}
                    <details className="filter-group filter-dropdown">
                      <summary className="fg-label">
                        Quarterly OPM %
                        <span className="fg-caret"><FaChevronDown className="w-3 h-3 inline" /></span>
                      </summary>
                      <div className="chip-row">
                        {[
                          { val: "-inf-0", label: "Negative" },
                          { val: "0-5", label: "0% - 5%" },
                          { val: "5-10", label: "5% - 10%" },
                          { val: "10-15", label: "10% - 15%" },
                          { val: "15-20", label: "15% - 20%" },
                          { val: "20-25", label: "20% - 25%" },
                          { val: "25-30", label: "25% - 30%" },
                          { val: "30-40", label: "30% - 40%" },
                          { val: "40-50", label: "40% - 50%" },
                          { val: "50-inf", label: "Above 50%" }
                        ].map(slot => (
                          <button
                            key={slot.val}
                            type="button"
                            className={`chip ${screenerOpmFilter.has(slot.val) ? "active" : ""}`}
                            onClick={() => toggleScreenerChip('opmSlot', slot.val)}
                          >
                            {slot.label}
                          </button>
                        ))}
                      </div>
                    </details>

                    {/* Broad Market Indices */}
                    <details className="filter-group filter-dropdown">
                      <summary className="fg-label">
                        Broad market indices
                        <span className="fg-caret"><FaChevronDown className="w-3 h-3 inline" /></span>
                      </summary>
                      <div className="chip-row">
                        {["NIFTY50", "NIFTYNEXT50", "SENSEX30"].map(idx => (
                          <button
                            key={idx}
                            type="button"
                            className={`chip ${screenerIndexFilter.has(idx) ? "active" : ""}`}
                            onClick={() => toggleScreenerChip('index', idx)}
                          >
                            {idx.replace("NIFTY", "NIFTY ")}
                          </button>
                        ))}
                      </div>
                    </details>

                    {/* Sectoral Indices */}
                    <details className="filter-group filter-dropdown">
                      <summary className="fg-label">
                        Sectoral indices
                        <span className="fg-caret"><FaChevronDown className="w-3 h-3 inline" /></span>
                      </summary>
                      <div className="chip-row">
                        {[
                          { val: "NIFTYBANK", label: "NIFTY BANK" },
                          { val: "NIFTYFINANCE", label: "NIFTY FINANCIAL SERVICES" },
                          { val: "NIFTYNBFC", label: "NIFTY NBFC" },
                          { val: "NIFTYIT", label: "NIFTY IT" },
                          { val: "NIFTYPHARMA", label: "NIFTY PHARMA" },
                          { val: "NIFTYHEALTHCARE", label: "NIFTY HEALTHCARE" },
                          { val: "NIFTYFMCG", label: "NIFTY FMCG" },
                          { val: "NIFTYAUTO", label: "NIFTY AUTO" },
                          { val: "NIFTYMETAL", label: "NIFTY METAL" },
                          { val: "NIFTYENERGY", label: "NIFTY ENERGY" },
                          { val: "NIFTYOILGAS", label: "NIFTY OIL & GAS" },
                          { val: "NIFTYPOWER", label: "NIFTY POWER" },
                          { val: "NIFTYREALTY", label: "NIFTY REALTY" },
                          { val: "NIFTYTELECOM", label: "NIFTY TELECOM" },
                          { val: "NIFTYCHEMICALS", label: "NIFTY CHEMICALS" },
                          { val: "NIFTYCEMENT", label: "NIFTY CEMENT" },
                          { val: "NIFTYCAPGOODS", label: "NIFTY CAPITAL GOODS" }
                        ].map(sector => (
                          <button
                            key={sector.val}
                            type="button"
                            className={`chip ${screenerIndexFilter.has(sector.val) ? "active" : ""}`}
                            onClick={() => toggleScreenerChip('index', sector.val)}
                          >
                            {sector.label}
                          </button>
                        ))}
                      </div>
                    </details>

                    {showScreenerIndexWarn && (
                      <div className="index-warning">
                        ⚠ You cannot select Nifty Indices alongside SENSEX-30
                      </div>
                    )}

                    {screenerTierFilter.has("Large Cap") && screenerMcapFilter.size > 0 && Array.from(screenerMcapFilter).some(val => val !== "50000-inf") && (
                      <div className="screener-note">
                        <FaInfoCircle className="info-icon" style={{ flexShrink: 0 }} />
                        <span>All Large Caps are above 50,000</span>
                      </div>
                    )}

                    {screenerTierFilter.has("Mid Cap") && screenerMcapFilter.size > 0 && Array.from(screenerMcapFilter).some(val => ["0-50", "50-100", "100-500", "500-1000", "1000-2000", "2000-5000", "5000-10000"].includes(val)) && (
                      <div className="screener-note">
                        <FaInfoCircle className="info-icon" style={{ flexShrink: 0 }} />
                        <span>All Mid Caps are above 10,000 Cr.</span>
                      </div>
                    )}

                    {screenerTierFilter.has("Small Cap") && screenerMcapFilter.size > 0 && Array.from(screenerMcapFilter).some(val => ["0-50", "50-100", "100-500", "500-1000", "1000-2000", "2000-5000"].includes(val)) && (
                      <div className="screener-note">
                        <FaInfoCircle className="info-icon" style={{ flexShrink: 0 }} />
                        <span>All Small Caps above 5000 Crs.</span>
                      </div>
                    )}

                    {screenerTierFilter.has("Micro Cap") && screenerMcapFilter.size > 0 && Array.from(screenerMcapFilter).some(val => ["5000-10000", "10000-25000", "25000-50000", "50000-inf"].includes(val)) && (
                      <div className="screener-note">
                        <FaInfoCircle className="info-icon" style={{ flexShrink: 0 }} />
                        <span>All Micro Caps are below 5000 Crs.</span>
                      </div>
                    )}

                    {/* Numeric Range Inputs */}
                    <div className="filter-group">
                      <span className="fg-label">Ratio Filters <span className="fg-hint">(Leave blank for no limit)</span></span>
                      <div className="only-data-toggle">
                        <input
                          type="checkbox"
                          id="onlyWithDataCheckbox"
                          checked={onlyWithData}
                          onChange={(e) => {
                            setOnlyWithData(e.target.checked);
                            setScreenerPage(1);
                          }}
                        />
                        <label htmlFor="onlyWithDataCheckbox">Only show stocks with ratio data available</label>
                      </div>

                      <div className="range-filters">
                        <div className="range-field">
                          <label>P/E Ratio</label>
                          <div className="range-inputs">
                            <input type="number" placeholder="Min" value={peMin} onChange={(e) => { setPeMin(e.target.value); setScreenerPage(1); }} />
                            <span>to</span>
                            <input type="number" placeholder="Max" value={peMax} onChange={(e) => { setPeMax(e.target.value); setScreenerPage(1); }} />
                          </div>
                        </div>

                        <div className="range-field">
                          <label>ROE (%)</label>
                          <div className="range-inputs">
                            <input type="number" placeholder="Min" value={roeMin} onChange={(e) => { setRoeMin(e.target.value); setScreenerPage(1); }} />
                            <span>to</span>
                            <input type="number" placeholder="Max" value={roeMax} onChange={(e) => { setRoeMax(e.target.value); setScreenerPage(1); }} />
                          </div>
                        </div>

                        <div className="range-field">
                          <label>ROCE (%)</label>
                          <div className="range-inputs">
                            <input type="number" placeholder="Min" value={roceMin} onChange={(e) => { setRoceMin(e.target.value); setScreenerPage(1); }} />
                            <span>to</span>
                            <input type="number" placeholder="Max" value={roceMax} onChange={(e) => { setRoceMax(e.target.value); setScreenerPage(1); }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <button type="button" className="clear-btn" onClick={clearAllScreenerFilters}>
                      Clear all filters ✕
                    </button>
                  </div>
                </div>

                <div className="screener-callout" style={{ border: '1px solid #111411' }}>
                  CLICK ON THE EQUITIES TO KNOW MORE …
                </div>

                <div className="result-bar">
                  <span>{filteredStocks.length.toLocaleString()} stocks matched</span>
                  <span className="result-bar-note">Click a row for full detail. Star to add to watchlist.</span>
                </div>

                <div id="screener-table-section" className="table-wrap reveal-panel" style={{ border: '1px solid #111411' }}>
                  <table>
                    <thead>
                      <tr>
                        <th className="reveal-left"></th>
                        <th className="reveal-left">Symbol</th>
                        <th className="reveal-left">Company</th>
                        <th className="reveal-left">Tier</th>
                        <th className="num-col reveal-left">Market Cap (Cr)</th>
                        <th className="num-col reveal-right">P/E</th>
                        <th className="num-col reveal-right">ROE (%)</th>
                        <th className="num-col reveal-right">ROCE (%)</th>
                        <th className="num-col reveal-right">OPM (%)</th>
                        <th className="date-col reveal-right">Listed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageItems.map(s => {
                        const isStarred = watchlist.has(s.sym);
                        const tierBadgeClass = `tier-${s.tier?.split(" ")[0] || "Micro"}`;
                        return (
                          <tr key={s.sym} className={highlightedStockSym === s.sym ? "highlighted-row" : ""} onClick={() => setScreenerSelectedStock(s)}>
                            <td className="reveal-left" onClick={(e) => e.stopPropagation()}>
                              <button className={`star-btn ${isStarred ? "active" : ""}`} onClick={() => toggleStar(s.sym)}>
                                {isStarred ? "★" : "☆"}
                              </button>
                            </td>
                            <td className="sym reveal-left">
                              <Link
                                href={`https://www.screener.in/company/${encodeURIComponent(s.sym)}/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="sym-link"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {s.sym} ↗
                              </Link>
                            </td>
                            <td className="name reveal-left">{s.name}</td>
                            <td className="reveal-left">
                              <span className={`tier-badge ${tierBadgeClass}`}>{s.tier}</span>
                            </td>
                            <td className="num reveal-left">{s.mcap !== null && s.mcap !== undefined ? s.mcap.toLocaleString("en-IN") : "—"}</td>
                            <td className="num reveal-right">{s.pe !== null && s.pe !== undefined ? s.pe.toFixed(2) : "—"}</td>
                            <td className="num reveal-right">{s.roe !== null && s.roe !== undefined ? s.roe.toFixed(2) + "%" : "—"}</td>
                            <td className="num reveal-right">{s.roce !== null && s.roce !== undefined ? s.roce.toFixed(2) + "%" : "—"}</td>
                            <td className="num reveal-right">{s.opm !== null && s.opm !== undefined ? s.opm.toFixed(2) + "%" : "—"}</td>
                            <td className="date reveal-right">{s.listdt || "—"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  
                  {filteredStocks.length === 0 && (
                    <div className="empty-state">
                      <p>No stocks match this combination of filters.</p>
                      <button type="button" className="clear-btn" onClick={clearAllScreenerFilters} style={{ margin: "0 auto" }}>
                        Clear filters
                      </button>
                    </div>
                  )}
                </div>

                {screenerPageCount > 1 && (
                  <div className="pager">
                    <button className="page-btn" disabled={screenerPage === 1} onClick={() => setScreenerPage(screenerPage - 1)}>
                      ← Prev
                    </button>
                    {[...Array(Math.min(5, screenerPageCount))].map((_, i) => {
                      const start = Math.max(1, screenerPage - 2);
                      const current = Math.min(screenerPageCount, start + i);
                      if (current < 1 || current > screenerPageCount) return null;
                      return (
                        <button
                          key={current}
                          className={`page-btn ${screenerPage === current ? "active" : ""}`}
                          onClick={() => setScreenerPage(current)}
                        >
                          {current}
                        </button>
                      );
                    })}
                    <button className="page-btn" disabled={screenerPage === screenerPageCount} onClick={() => setScreenerPage(screenerPage + 1)}>
                      Next →
                    </button>
                  </div>
                )}

              </section>
            )}

            {/* WATCHLIST VIEW */}
            {screenerTab === "watchlist" && (
              <section className="view active">
                <div className="result-bar">
                  <span>Your watchlist ({watchlist.size} starred)</span>
                  <span className="result-bar-note">Stored locally in this browser.</span>
                </div>

                <div className="table-wrap reveal-panel" style={{ border: '1px solid #111411' }}>
                  <table>
                    <thead>
                      <tr>
                        <th className="reveal-left"></th>
                        <th className="reveal-left">Symbol</th>
                        <th className="reveal-left">Company</th>
                        <th className="reveal-left">Tier</th>
                        <th className="num-col reveal-left">Market Cap (Cr)</th>
                        <th className="num-col reveal-right">P/E</th>
                        <th className="num-col reveal-right">ROE (%)</th>
                        <th className="num-col reveal-right">ROCE (%)</th>
                        <th className="num-col reveal-right">OPM (%)</th>
                        <th className="date-col reveal-right">Listed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {watchlistStocks.map(s => {
                        const tierBadgeClass = `tier-${s.tier?.split(" ")[0] || "Micro"}`;
                        return (
                          <tr key={s.sym} onClick={() => setScreenerSelectedStock(s)}>
                            <td className="reveal-left" onClick={(e) => e.stopPropagation()}>
                              <button className="star-btn active" onClick={() => toggleStar(s.sym)}>
                                ★
                              </button>
                            </td>
                            <td className="sym reveal-left">
                              <Link
                                href={`https://www.screener.in/company/${encodeURIComponent(s.sym)}/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="sym-link"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {s.sym} ↗
                              </Link>
                            </td>
                            <td className="name reveal-left">{s.name}</td>
                            <td className="reveal-left">
                              <span className={`tier-badge ${tierBadgeClass}`}>{s.tier}</span>
                            </td>
                            <td className="num reveal-left">{s.mcap !== null && s.mcap !== undefined ? s.mcap.toLocaleString("en-IN") : "—"}</td>
                            <td className="num reveal-right">{s.pe !== null && s.pe !== undefined ? s.pe.toFixed(2) : "—"}</td>
                            <td className="num reveal-right">{s.roe !== null && s.roe !== undefined ? s.roe.toFixed(2) + "%" : "—"}</td>
                            <td className="num reveal-right">{s.roce !== null && s.roce !== undefined ? s.roce.toFixed(2) + "%" : "—"}</td>
                            <td className="num reveal-right">{s.opm !== null && s.opm !== undefined ? s.opm.toFixed(2) + "%" : "—"}</td>
                            <td className="date reveal-right">{s.listdt || "—"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  {watchlist.size === 0 && (
                    <div className="empty-state">
                      <p>Nothing starred yet. Head to the Screener tab and tap the star on any row.</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* ABOUT DATA VIEW */}
            {screenerTab === "about" && (
              <section className="view active">
                <div className="about-card" style={{ border: '1px solid #111411' }}>
                  <h2>About this data</h2>
                  <p><strong>Source:</strong> NSE Capital Market EQ-series security master, dated 21 Jul 2026. Every placeholder or deleted instrument has been dropped, leaving 3,746 live equity securities.</p>
                  <p><strong>What&apos;s genuinely in the source file:</strong> symbol, company name, ISIN, face value, market lot, listing date, and NSE index-participation flags, plus corporate action indicators.</p>
                  <p><strong>What&apos;s added from public knowledge:</strong> Market tier ranking —</p>
                  <ul>
                    <li><strong>Large Cap</strong> — constituents of NIFTY 100</li>
                    <li><strong>Mid Cap</strong> — constituents of NIFTY Midcap 150</li>
                    <li><strong>Small Cap</strong> — constituents of NIFTY Smallcap 250</li>
                    <li><strong>Micro Cap</strong> — all other listings</li>
                  </ul>
                  <p className="disclaimer">This tool is for educational and research purposes only and does not constitute investment advice.</p>
                </div>
              </section>
            )}

          </main>

          {/* ================= SCREENER DETAILS MODAL ================= */}
          {screenerSelectedStock && (
            <div className="screener-modal-overlay modal-overlay open" onClick={() => setScreenerSelectedStock(null)}>
              <div className="modal" onClick={(e) => e.stopPropagation()} style={{ border: '1px solid #111411' }}>
                <button className="modal-close" onClick={() => setScreenerSelectedStock(null)}>✕</button>
                <span className="modal-sym">{screenerSelectedStock.sym}</span>
                <h3>{screenerSelectedStock.name}</h3>
                
                <div className="modal-grid mt-4">
                  <div className="modal-field">
                    <span className="k">ISIN</span>
                    <span className="v">{screenerSelectedStock.isin}</span>
                  </div>
                  <div className="modal-field">
                    <span className="k">Market cap tier</span>
                    <span className="v">{screenerSelectedStock.tier}</span>
                  </div>
                  <div className="modal-field">
                    <span className="k">Market cap (Cr)</span>
                    <span className="v">
                      {screenerSelectedStock.mcap !== null && screenerSelectedStock.mcap !== undefined ? `₹${screenerSelectedStock.mcap.toLocaleString("en-IN")} Cr` : "—"}
                    </span>
                  </div>
                  <div className="modal-field">
                    <span className="k">Face value</span>
                    <span className="v">₹{screenerSelectedStock.face}</span>
                  </div>
                  <div className="modal-field">
                    <span className="k">Market lot</span>
                    <span className="v">{screenerSelectedStock.lot} share{screenerSelectedStock.lot === 1 ? "" : "s"}</span>
                  </div>
                  <div className="modal-field">
                    <span className="k">Listing date</span>
                    <span className="v">{screenerSelectedStock.listdt || "Not recorded"}</span>
                  </div>
                  <div className="modal-field">
                    <span className="k">Corporate actions</span>
                    <span className="v">
                      {(() => {
                        const actions: string[] = [];
                        if (screenerSelectedStock.div) actions.push("Dividend");
                        if (screenerSelectedStock.rights) actions.push("Rights");
                        if (screenerSelectedStock.bonus) actions.push("Bonus");
                        return actions.length > 0 ? actions.join(", ") : "None";
                      })()}
                    </span>
                  </div>
                  <div className="modal-field">
                    <span className="k">Stock P/E</span>
                    <span className="v">{screenerSelectedStock.pe !== null && screenerSelectedStock.pe !== undefined ? screenerSelectedStock.pe.toFixed(2) : "—"}</span>
                  </div>
                  <div className="modal-field">
                    <span className="k">ROE</span>
                    <span className="v">{screenerSelectedStock.roe !== null && screenerSelectedStock.roe !== undefined ? screenerSelectedStock.roe.toFixed(2) + "%" : "—"}</span>
                  </div>
                  <div className="modal-field">
                    <span className="k">ROCE</span>
                    <span className="v">{screenerSelectedStock.roce !== null && screenerSelectedStock.roce !== undefined ? screenerSelectedStock.roce.toFixed(2) + "%" : "—"}</span>
                  </div>
                  <div className="modal-field">
                    <span className="k">Quarterly OPM</span>
                    <span className="v">{screenerSelectedStock.opm !== null && screenerSelectedStock.opm !== undefined ? screenerSelectedStock.opm.toFixed(2) + "%" : "—"}</span>
                  </div>
                </div>

                <div className="filter-group mb-6">
                  <span className="fg-label block mb-2">Index membership</span>
                  <div className="idx-tags">
                    {screenerSelectedStock.indices?.length ? (
                      screenerSelectedStock.indices.map((ix: string) => (
                        <span className="idx-tag" key={ix}>{ix}</span>
                      ))
                    ) : (
                      <span className="idx-tag text-gray-400">Not in a tracked index</span>
                    )}
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="primary" onClick={() => toggleStar(screenerSelectedStock.sym)}>
                    {watchlist.has(screenerSelectedStock.sym) ? "★ Remove from watchlist" : "☆ Add to watchlist"}
                  </button>
                  <a href={`https://www.nseindia.com/get-quotes/equity?symbol=${encodeURIComponent(screenerSelectedStock.sym)}`} target="_blank" rel="noopener noreferrer">
                    View on NSE ↗
                  </a>
                  <a href={`https://www.screener.in/company/${encodeURIComponent(screenerSelectedStock.sym)}/`} target="_blank" rel="noopener noreferrer">
                    View on Screener.in ↗
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= SECTION 5: MARKET METRICS MATRIX ================= */}
      <section className="section market-metrics-section" style={{ borderTop: '1px solid rgba(17,20,17,0.1)' }}>
        <div className="wrap">
          <div className="section-head text-center mx-auto" style={{ marginBottom: '28px' }}>
            <div>
              <h2 className="text-3xl font-bold uppercase text-black text-center" style={{ margin: '0 auto 10px' }}>“All the market metrics that matter—decoded, analyzed, and delivered inside our research reports”</h2>
            </div>
          </div>
          
          {/* Desktop Grid Layout */}
          <div className="metrics-grid">
            {METRICS_ITEMS.map((item, idx) => (
              <div className="metrics-item" key={idx}>
                <img src={item.src} alt={item.alt} />
              </div>
            ))}
          </div>

          {/* Mobile Carousel Slider */}
          <div className="mobile-metrics-slider-wrapper">
            <div className="metrics-slider-viewport" ref={metricsEmblaRef}>
              <div className="metrics-slider-container">
                {METRICS_ITEMS.map((item, idx) => (
                  <div className="metrics-slider-slide" key={idx}>
                    <div className="metrics-item">
                      <img src={item.src} alt={item.alt} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Dots and Slide Position indicator */}
            {metricsScrollSnaps.length > 0 && (
              <div className="metrics-slider-controls">
                <div className="metrics-slider-dots">
                  {metricsScrollSnaps.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => metricsEmblaApi?.scrollTo(idx)}
                      className={`metrics-slider-dot ${
                        metricsSelectedIndex === idx ? 'active' : ''
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= SECTION 7: ONE STOP SECTORAL OVERVIEW ================= */}
      <section className="section sectoral-overview-section" id="sectoral-overview" style={{ borderTop: '1px solid rgba(17,20,17,0.1)' }}>
        <div className="wrap">
          <div className="section-head text-center mx-auto" style={{ marginBottom: "28px" }}>
            <h2 className="text-3xl font-bold uppercase text-black text-center" style={{ margin: '0 auto 10px' }}>One Stop Sectoral Overview</h2>
            <p className="text-center" style={{ margin: '0 auto' }}>Select a sector below, then click through to open its full performance report PDF.</p>
          </div>

          <div className="sector-picker">
            {[
              { name: "Auto", img: "sector-auto.png", pdf: "nifty-auto-report.pdf" },
              { name: "Banking", img: "sector-banking.png", pdf: "nifty-bank-report.pdf" },
              { name: "Capital Goods", img: "sector-capital-goods.png", pdf: "nifty-capital-goods-report.pdf" },
              { name: "Chemicals", img: "sector-chemicals.png", pdf: "nifty-chemicals-report.pdf" },
              { name: "FMCG", img: "sector-fmcg.png", pdf: "nifty-fmcg-report.pdf" },
              { name: "Healthcare", img: "sector-healthcare.png", pdf: "nifty-healthcare-report.pdf" },
              { name: "IT", img: "sector-it.png", pdf: "nifty-it-report.pdf" },
              { name: "Metal", img: "sector-metal.png", pdf: "nifty-metal-report.pdf" },
              { name: "NBFC", img: "sector-nbfc.png", pdf: "nifty-nbfc-report.pdf" },
              { name: "Oil & Gas", img: "sector-oil-gas.png", pdf: "nifty-oil-gas-report.pdf" },
              { name: "Financial Services", img: "sector-financial-services.png", pdf: "nifty-financial-services-report.pdf" },
              { name: "Pharma", img: "sector-pharma.png", pdf: "nifty-pharma-report.pdf" },
              { name: "Power", img: "sector-power.png", pdf: "nifty-power-report.pdf" },
              { name: "Realty", img: "sector-realty.png", pdf: "nifty-realty-report.pdf" },
              { name: "Retail", img: "sector-retail.png", pdf: "nifty-retail-report.pdf" }
            ].map(sector => (
              <button
                key={sector.name}
                type="button"
                className="sector-pick-item"
                style={{ border: '1px solid #111411' }}
                onClick={() => {
                  if (sector.pdf) window.open(`/${sector.pdf}`, '_blank', 'noopener,noreferrer');
                }}
              >
                <img src={sector.img} alt={sector.name} />
                <span>{sector.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 8: SECTOR UNIVERSE BUBBLE MAP ================= */}
      <section id="sectoral-heatmap" className="section sector-universe-section" style={{ borderTop: '1px solid rgba(17,20,17,0.1)' }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>Single Heatmap for All Sectors</h2>
              <p>Bubble size reflects the size of the YTD return, color shows direction. Click a sector bubble to open its full report.</p>
            </div>
          </div>

          <div className="universe-layout">
            <div className="universe-stage" ref={bubbleRef}>
              {packedBubbles.map((item, idx) => {
                const heat = heatColor(item.ytd, maxAbsYtdGlobal);
                const isMobile = bubbleDimensions.width < 640;
                const nameFontSize = Math.max(isMobile ? 10 : 11, Math.round(item.r * (isMobile ? 0.25 : 0.19)));
                const changeFontSize = Math.max(isMobile ? 9 : 10, Math.round(item.r * (isMobile ? 0.20 : 0.15)));
                const delay = Math.min(idx * 0.05, 0.5).toFixed(2);

                const bubbleStyle = {
                  left: `${(item.x - item.r).toFixed(1)}px`,
                  top: `${(item.y - item.r).toFixed(1)}px`,
                  width: `${(item.r * 2).toFixed(1)}px`,
                  height: `${(item.r * 2).toFixed(1)}px`,
                  background: heat.bg,
                  color: heat.text,
                  boxShadow: `0 6px 18px ${heat.glow}, inset 0 2px 6px rgba(255,255,255,0.35)`,
                  opacity: bubbleRevealed ? 1 : 0,
                  transform: bubbleRevealed ? "scale(1)" : "scale(0.3)",
                  transition: `transform .85s cubic-bezier(.16,1,.3,1) ${delay}s, opacity .5s ease ${delay}s`,
                  padding: isMobile ? '2px' : '6px'
                };

                return (
                  <div
                    key={item.name}
                    className="universe-bubble"
                    style={bubbleStyle}
                    onClick={() => {
                      if (item.pdf) window.open(`/${item.pdf}`, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    <div className="universe-bubble-name" style={{ fontSize: `${nameFontSize}px` }}>
                      {item.name.replace("NIFTY ", "")}
                    </div>
                    <div className="universe-bubble-change" style={{ fontSize: `${changeFontSize}px`, color: heat.text }}>
                      {item.ytd > 0 ? "+" : ""}{item.ytd.toFixed(2)}%
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="universe-list-panel">
              <div className="universe-list-head">All Sectors</div>
              <div className="universe-list">
                {sectorUniverse.map(s => {
                  const isBullish = s.ytd >= 0;
                  const heat = heatColor(s.ytd, maxAbsYtdGlobal);
                  return (
                    <div
                      key={s.name}
                      className="universe-list-row"
                      onClick={() => {
                        if (s.pdf) window.open(`/${s.pdf}`, '_blank', 'noopener,noreferrer');
                      }}
                    >
                      <div className="universe-list-row-left">
                        <span className="universe-swatch" style={{ background: heat.flat }}></span>
                        <span>{s.name}</span>
                      </div>
                      <span className={`universe-list-change ${isBullish ? "bullish" : "bearish"}`}>
                        {s.ytd > 0 ? "+" : ""}{s.ytd.toFixed(2)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 9: THEME BASED SECTORS ================= */}
      <section className="section theme-based-sectors-section" id="theme-based-sectors" style={{ borderTop: '1px solid rgba(17,20,17,0.1)' }}>
        <div className="wrap">
          <div className="section-head text-center mx-auto" style={{ marginBottom: "28px" }}>
            <h2 className="text-3xl font-bold uppercase text-black text-center" style={{ margin: '0 auto 10px' }}>Theme Based Sectors at One Place</h2>
            <p className="text-center" style={{ margin: '0 auto' }}>Click on any index box below to open its official performance report PDF.</p>
          </div>

          <div className="theme-bars">
            {themeSectorBars.map((s, idx) => {
              const isGain = s.ytd >= 0;
              const maxAbs = Math.max(...themeSectorBars.map(bar => Math.abs(bar.ytd)));
              const widthPct = Math.max(6, (Math.abs(s.ytd) / maxAbs) * 84).toFixed(1);
              const valueText = `${s.ytd > 0 ? '+' : ''}${s.ytd.toFixed(2)}%`;

              return (
                <div
                  key={s.name}
                  className="theme-bar-row"
                  onClick={() => {
                    if (s.pdf) window.open(`/${s.pdf}`, '_blank', 'noopener,noreferrer');
                  }}
                >
                  <img className="theme-bar-icon" src={s.icon} alt={s.name} />
                  <span className="theme-bar-name">{s.name}</span>
                  <div className="theme-bar-track">
                    <div className={`theme-bar-fill ${isGain ? "gain" : "loss"}`} style={{ width: `${widthPct}%` }}></div>
                    <span className={`theme-bar-value-outside ${isGain ? "gain" : "loss"}`} style={{ left: `${widthPct}%` }}>
                      {valueText}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>







    </div>
  );
}
