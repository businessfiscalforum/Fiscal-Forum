"use client";

import { useState, useEffect, useRef, useContext, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
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
const insuranceCoverMap: Record<string, { id: string; label: string; placeholder: string }> = {
  'Employer health insurance': {id:'insCoverEmployerHealth', label:'Employer Health Cover (₹)', placeholder:'e.g. 300000'},
  'Personal health insurance': {id:'insCoverPersonalHealth', label:'Health Insurance Cover (₹)', placeholder:'e.g. 500000'},
  'Family floater': {id:'insCoverFamilyFloater', label:'Family Floater Cover (₹)', placeholder:'e.g. 1000000'},
  'Term life insurance': {id:'insCoverTermLife', label:'Term Insurance Cover (₹)', placeholder:'e.g. 5000000'},
  'Personal accident insurance': {id:'insCoverPersonalAccident', label:'Personal Accident Cover (₹)', placeholder:'e.g. 1000000'},
  'Critical illness cover': {id:'insCoverCriticalIllness', label:'Critical Illness Cover (₹)', placeholder:'e.g. 1000000'},
  'Motor insurance': {id:'insCoverMotor', label:'Motor Insurance IDV (₹)', placeholder:'e.g. 500000'}
};

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
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in?redirect_url=" + encodeURIComponent("/reports"));
    }
  }, [isLoaded, isSignedIn, router]);
  /* ============ PAGE TABS ============ */
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);



  /* ============ RADIAL BOX VIEWPORT OBSERVER ============ */
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  /* ============ HERO VIDEO AUTOPLAY ON LOOP ============ */
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  const startVideoPlayback = (node: HTMLVideoElement | null) => {
    if (!node) return;
    node.defaultMuted = true;
    node.muted = true;
    node.volume = 0;
    node.loop = true;
    node.playsInline = true;
    node.setAttribute("muted", "");
    node.setAttribute("playsinline", "");

    const playPromise = node.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.log("Autoplay waiting for interaction:", err);
      });
    }
  };

  /* Global Unmute / Autoplay Unlocker for Logged-Out Guests */
  useEffect(() => {
    const unlockMedia = () => {
      if (heroVideoRef.current && heroVideoRef.current.paused) {
        startVideoPlayback(heroVideoRef.current);
      }
    };

    window.addEventListener("scroll", unlockMedia, { passive: true });
    window.addEventListener("touchstart", unlockMedia, { passive: true });
    window.addEventListener("pointerdown", unlockMedia, { passive: true });
    window.addEventListener("click", unlockMedia, { passive: true });
    window.addEventListener("mousemove", unlockMedia, { passive: true });
    window.addEventListener("keydown", unlockMedia, { passive: true });

    return () => {
      window.removeEventListener("scroll", unlockMedia);
      window.removeEventListener("touchstart", unlockMedia);
      window.removeEventListener("pointerdown", unlockMedia);
      window.removeEventListener("click", unlockMedia);
      window.removeEventListener("mousemove", unlockMedia);
      window.removeEventListener("keydown", unlockMedia);
    };
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    startVideoPlayback(video);

    const handleCanPlay = () => startVideoPlayback(video);

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("canplaythrough", handleCanPlay);
    video.addEventListener("loadeddata", handleCanPlay);
    video.addEventListener("loadedmetadata", handleCanPlay);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && video) {
            startVideoPlayback(video);
          }
        });
      },
      { threshold: 0.01 }
    );
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("canplaythrough", handleCanPlay);
      video.removeEventListener("loadeddata", handleCanPlay);
      video.removeEventListener("loadedmetadata", handleCanPlay);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsBoxVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    const currentBox = boxRef.current;
    if (currentBox) {
      observer.observe(currentBox);
    }

    return () => {
      if (currentBox) {
        observer.unobserve(currentBox);
      }
    };
  }, []);

  /* ============ WIZARD STATE ============ */
  const [wizardStep, setWizardStep] = useState<number | "done">(1);
  const [wizardCategory, setWizardCategory] = useState<string>("");

  useEffect(() => {
    if (wizardCategory) {
      const element = document.getElementById("customReport");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [wizardStep, wizardCategory]);
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



  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
  }, []);



  /* ============ WIZARD HANDLERS ============ */

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

  const isStep1FormValid = () => {
    if (!wizardCategory) return false;

    const isMf = wizardCategory === "Mutual Fund";
    const isStocks = wizardCategory === "Stocks";
    const isCc = wizardCategory === "Credit Card";
    const isIns = wizardCategory === "Insurance";
    const isLoan = wizardCategory === "Loan" || wizardCategory === "Loans";

    if (isMf) {
      return (
        !!wizardAnswers.mfAge &&
        parseInt(wizardAnswers.mfAge) > 0 &&
        !!wizardAnswers.mfOccupation?.trim() &&
        !!wizardAnswers.mfMonthlySavings &&
        parseInt(wizardAnswers.mfMonthlySavings) > 0 &&
        !!wizardAnswers.mfGoal?.trim() &&
        !!wizardAnswers.mfRisk &&
        !!wizardAnswers.mfPreference
      );
    }

    if (isStocks) {
      return (
        !!wizardAnswers.stAge &&
        parseInt(wizardAnswers.stAge) > 0 &&
        !!wizardAnswers.stMonthlySavings &&
        parseInt(wizardAnswers.stMonthlySavings) > 0 &&
        !!wizardAnswers.stReturns?.trim() &&
        !!wizardAnswers.stGoal?.trim() &&
        !!wizardAnswers.stRisk &&
        !!wizardAnswers.stStyle?.trim()
      );
    }

    if (isCc) {
      const basicValid =
        !!wizardAnswers.ccAge &&
        parseInt(wizardAnswers.ccAge) > 0 &&
        !!wizardAnswers.ccMonthlySpending &&
        parseInt(wizardAnswers.ccMonthlySpending) > 0 &&
        !!wizardAnswers.ccOccupation?.trim() &&
        Array.isArray(wizardAnswers.ccSpending) &&
        wizardAnswers.ccSpending.length > 0 &&
        !!wizardAnswers.ccFee;

      if (!basicValid) return false;

      const hasTravelOrHotel =
        wizardAnswers.ccSpending.includes("Travel") ||
        wizardAnswers.ccSpending.includes("Hotels");
      if (hasTravelOrHotel) {
        return !!wizardAnswers.ccFlyFrequency && !!wizardAnswers.ccTravelType;
      }

      return true;
    }

    if (isIns) {
      const basicValid =
        !!wizardAnswers.insAnnualIncome &&
        parseInt(wizardAnswers.insAnnualIncome) > 0 &&
        !!wizardAnswers.insMonthlySavings &&
        parseInt(wizardAnswers.insMonthlySavings) > 0 &&
        !!wizardAnswers.insDependents &&
        parseInt(wizardAnswers.insDependents) >= 0 &&
        !!wizardAnswers.insMarital &&
        Array.isArray(wizardAnswers.insExisting) &&
        wizardAnswers.insExisting.length > 0 &&
        !!wizardAnswers.insLoansLiabilities?.trim();

      if (!basicValid) return false;

      const selectedCovers = wizardAnswers.insExisting || [];
      for (const cover of selectedCovers) {
        const amt = wizardAnswers.insuranceCovers?.[cover];
        if (!amt || parseInt(amt) <= 0) {
          return false;
        }
      }

      return true;
    }

    if (isLoan) {
      const basicValid =
        !!wizardAnswers.loanPurpose &&
        !!wizardAnswers.loanAge &&
        parseInt(wizardAnswers.loanAge) > 0 &&
        !!wizardAnswers.loanEmployment &&
        !!wizardAnswers.loanMonthlyIncome &&
        parseInt(wizardAnswers.loanMonthlyIncome) > 0 &&
        !!wizardAnswers.loanIncomeStability &&
        !!wizardAnswers.loanAmount &&
        parseInt(wizardAnswers.loanAmount) > 0 &&
        !!wizardAnswers.loanHasCollateral;

      if (!basicValid) return false;

      if (wizardAnswers.loanHasCollateral === "Yes") {
        return !!wizardAnswers.loanCollateralType;
      }

      return true;
    }

    return false;
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


  return (
    <div className="reports-portal-container min-h-screen pt-24 pb-20">
      
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
              
              {/* Get Customised Report Button */}
              <div className="relative mt-4 flex justify-start select-none">
                <button
                  type="button"
                  className="hero-customised-report-btn"
                  onClick={() => scrollToSection("customReport")}
                >
                  {/* SVG Animated Border Overlay */}
                  <div className="absolute inset-0 pointer-events-none rounded-full overflow-hidden z-20">
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <rect
                        rx="26"
                        ry="26"
                        fill="none"
                        stroke="white"
                        strokeWidth="2.5"
                        style={{
                          x: 1.25,
                          y: 1.25,
                          width: "calc(100% - 2.5px)",
                          height: "calc(100% - 2.5px)",
                        }}
                        className="button-border-line"
                      />
                    </svg>
                  </div>
                  GET CUSTOMISED REPORT
                </button>
              </div>

            </div>

            <div className="report-mock-stage flex justify-center lg:justify-end items-center w-full">
              <div className="relative z-10 w-full max-w-[920px] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_30px_70px_-15px_rgba(16,21,18,0.35)] border border-black/15 bg-black aspect-video">
                <video
                  ref={heroVideoRef}
                  src="/ff_clear_text_slow.mp4"
                  poster="/ff_clear_text_slow_poster.png"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls={false}
                  preload="auto"
                  onCanPlay={(e) => startVideoPlayback(e.currentTarget)}
                  onLoadedData={(e) => startVideoPlayback(e.currentTarget)}
                  onLoadedMetadata={(e) => startVideoPlayback(e.currentTarget)}
                  className="w-full h-full object-cover rounded-2xl md:rounded-3xl block"
                  style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", borderRadius: "1.5rem" }}
                />
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
                  <Link href="/reports/pre-market" className="btn btn-primary" style={{ display: 'block', textDecoration: 'none', color: '#FFFFFF' }}>CLICK HERE</Link>
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
                  <Link href="/reports/weekly" className="btn btn-primary" style={{ display: 'block', textDecoration: 'none', color: '#FFFFFF' }}>CLICK HERE</Link>
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
                    <div className="report-center-hero mb-6 md:mb-8 text-center">
                      <div className="flex flex-col items-center justify-center text-center space-y-2 md:space-y-3">
                        <div className="flex items-center justify-center gap-2 text-amber-600 font-extrabold text-xs md:text-sm uppercase tracking-wider">
                          <span>✦</span> Welcome to your
                        </div>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl report-center-title text-center">
                          Personalized Report Center
                        </h2>

                        <div className="w-16 md:w-24 h-1 bg-amber-400 rounded-full mt-2 mb-3 md:mb-4 mx-auto"></div>

                        <p className="text-xs sm:text-sm md:text-base text-gray-600 font-bold max-w-xl mx-auto text-center">
                          Curated insights and recommendations, designed for your financial growth.
                        </p>
                      </div>
                    </div>

                    {/* Squarish Box with Pop-up Radial Entities */}
                    <div className="report-center-single-box-container">
                      <div className={`report-center-squarish-box ${isBoxVisible ? "animate-in" : ""}`} ref={boxRef}>
                        {/* Background Grid Lines inside the squarish box */}
                        <div className="squarish-box-grid-bg"></div>

                        {/* Card 1: Mutual Fund */}
                        <div className="squarish-box-entity entity-1">
                          <div className="entity-image-wrap">
                            <Image
                              src="/images/wizard_mutual_fund.png"
                              alt="Mutual Fund"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="entity-label">Mutual Fund</span>
                        </div>

                        {/* Card 2: Stocks */}
                        <div className="squarish-box-entity entity-2">
                          <div className="entity-image-wrap">
                            <Image
                              src="/images/wizard_stocks.png"
                              alt="Stocks"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="entity-label">Stocks</span>
                        </div>

                        {/* Card 3: Credit Card */}
                        <div className="squarish-box-entity entity-3">
                          <div className="entity-image-wrap">
                            <Image
                              src="/images/wizard_credit_card.png"
                              alt="Credit Card"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="entity-label">Credit Card</span>
                        </div>

                        {/* Card 4: Insurance */}
                        <div className="squarish-box-entity entity-4">
                          <div className="entity-image-wrap">
                            <Image
                              src="/images/wizard_insurance.png"
                              alt="Insurance"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="entity-label">Insurance</span>
                        </div>

                        {/* Card 5: Loans */}
                        <div className="squarish-box-entity entity-5">
                          <div className="entity-image-wrap">
                            <Image
                              src="/images/wizard_loans.png"
                              alt="Loans"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="entity-label">Loans</span>
                        </div>
                      </div>

                      {/* Single Common Get Yours Button */}
                      <div className="report-center-get-yours-btn-wrap">
                        <Link href="/reports/customised" className="report-center-common-btn">
                          Get Yours
                        </Link>
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
                        disabled={!isStep1FormValid()}
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
                  <button type="button" className="wizard-btn primary" disabled={!wizardAnswers.details?.trim()} onClick={() => setWizardStep(4)}>Next →</button>
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
                    disabled={
                      wizardLoading ||
                      !wizardAnswers.name?.trim() ||
                      !wizardAnswers.email?.trim() ||
                      !wizardAnswers.mobile?.trim() ||
                      wizardAnswers.mobile.trim().length !== 10
                    }
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
    </div>
  );
}
