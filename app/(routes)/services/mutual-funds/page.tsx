"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import "./Screener.css";

import { FUNDS_DB, FundItem } from "./funds_data";

const categoryScores: Record<string, Record<string, number>> = {
  low: {
    "Debt Scheme - Liquid Fund": 10,
    "Debt Scheme - Overnight Fund": 10,
    "Debt Scheme - Ultra Short Duration Fund": 9,
    "Debt Scheme - Short Duration Fund": 8,
    "Debt Scheme - Gilt Fund": 8,
    "Debt Scheme - Corporate Bond Fund": 7,
    "Debt Scheme - Banking and PSU Fund": 7,
    "Debt Scheme - Money Market Fund": 8,
    "Debt Scheme - Low Duration Fund": 8,
    "Hybrid Scheme - Conservative Hybrid Fund": 6,
    "Other Scheme - Index Funds": 5,
  },
  medium: {
    "Equity Scheme - Large Cap Fund": 10,
    "Equity Scheme - Large & Mid Cap Fund": 9,
    "Equity Scheme - Flexi Cap Fund": 9,
    "Other Scheme - Index Funds": 9,
    "Hybrid Scheme - Aggressive Hybrid Fund": 8,
    "Hybrid Scheme - Balanced Hybrid Fund": 8,
    "Hybrid Scheme - Dynamic Asset Allocation or Balanced Advantage": 8,
    "Equity Scheme - Multi Cap Fund": 7,
    "Equity Scheme - ELSS": 7,
    "Hybrid Scheme - Multi Asset Allocation": 7,
  },
  high: {
    "Equity Scheme - Small Cap Fund": 10,
    "Equity Scheme - Mid Cap Fund": 10,
    "Equity Scheme - Sectoral/ Thematic": 9,
    "Equity Scheme - Multi Cap Fund": 8,
    "Equity Scheme - Large & Mid Cap Fund": 8,
    "Equity Scheme - Flexi Cap Fund": 7,
    "Equity Scheme - Contra Fund": 7,
    "Equity Scheme - Focused Fund": 7,
    "Other Scheme - FoF Domestic": 5,
  },
};

const goalCategoryBoost: Record<string, string[]> = {
  tax: ["Equity Scheme - ELSS", "ELSS"],
  emergency: [
    "Debt Scheme - Liquid Fund",
    "Debt Scheme - Overnight Fund",
    "Debt Scheme - Ultra Short Duration Fund",
  ],
  income: [
    "Debt Scheme - Corporate Bond Fund",
    "Debt Scheme - Banking and PSU Fund",
    "Hybrid Scheme - Conservative Hybrid Fund",
  ],
  retirement: [
    "Solution Oriented Scheme - Retirement Fund",
    "Equity Scheme - Flexi Cap Fund",
    "Other Scheme - Index Funds",
  ],
  education: [
    "Solution Oriented Scheme - Children s Fund",
    "Equity Scheme - Large Cap Fund",
    "Hybrid Scheme - Aggressive Hybrid Fund",
  ],
  wealth: ["Equity Scheme - Mid Cap Fund", "Equity Scheme - Small Cap Fund", "Equity Scheme - Flexi Cap Fund", "Other Scheme - Index Funds"],
};

const keyCategories = [
  { label: "Large Cap", color: "#3b82f6" },
  { label: "Mid Cap", color: "#38a169" },
  { label: "Small Cap", color: "#e53e3e" },
  { label: "ELSS", color: "#d4a84b" },
  { label: "Liquid Fund", color: "#0bc5ea" },
  { label: "Flexi Cap", color: "#805ad5" },
  { label: "Index Funds", color: "#3b82f6" },
  { label: "Gilt Fund", color: "#38a169" },
  { label: "Hybrid", color: "#e53e3e" },
  { label: "Sectoral", color: "#f6ad55" },
  { label: "Overnight", color: "#0bc5ea" },
  { label: "Debt - Short", color: "#9f7aea" },
  { label: "Multi Cap", color: "#d4a84b" },
  { label: "FoF", color: "#667eea" },
  { label: "Retirement", color: "#38a169" },
  { label: "Gold ETF", color: "#f6e05e" },
  { label: "Corporate Bond", color: "#0bc5ea" },
  { label: "Balanced", color: "#3b82f6" },
];

export default function MutualFundScreenerPage() {
  const router = useRouter();

  // Categories & AMCs list sorted
  const categories = useMemo(() => {
    return Array.from(new Set(FUNDS_DB.map((f: FundItem) => f.category)))
      .filter(Boolean)
      .sort();
  }, []);

  const amcs = useMemo(() => {
    return Array.from(new Set(FUNDS_DB.map((f: FundItem) => f.amc)))
      .filter(Boolean)
      .sort();
  }, []);

  // Stats Counters
  const [schemesCount, setSchemesCount] = useState(0);
  const [amcsCount, setAmcsCount] = useState(0);
  const [catsCount, setCatsCount] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress);

      setSchemesCount(Math.round(ease * FUNDS_DB.length));
      setAmcsCount(Math.round(ease * amcs.length));
      setCatsCount(Math.round(ease * categories.length));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [amcs.length, categories.length]);

  // Advisor States
  const [currentStep, setCurrentStep] = useState(1);
  const [profileName, setProfileName] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [monthlyAmount, setMonthlyAmount] = useState<number | null>(null);
  const [experience, setExperience] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [horizon, setHorizon] = useState("");
  const [riskAppetite, setRiskAppetite] = useState("");
  const [preferredAMC, setPreferredAMC] = useState("");

  const [recommendations, setRecommendations] = useState<FundItem[]>([]);
  const [isMatchingLoading, setIsMatchingLoading] = useState(false);

  // Explore Database States
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterAMC, setFilterAMC] = useState("");
  const [explorePage, setExplorePage] = useState(1);
  const [exploreView, setExploreView] = useState<"grid" | "list">("grid");
  const itemsPerPage = 24;

  // Selected Fund for details Modal
  const [selectedFund, setSelectedFund] = useState<FundItem | null>(null);

  // Helper Toast
  const [toastMessage, setToastMessage] = useState("");
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Scroll Helper
  const scrollToTarget = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Step Navigation Handlers
  const handleNextStep = (from: number) => {
    if (from === 1) {
      if (!ageGroup || monthlyAmount === null || !experience) {
        triggerToast("Please fill in all profile fields to continue.");
        return;
      }
    }
    if (from === 2) {
      if (!horizon) {
        triggerToast("Please select your investment horizon.");
        return;
      }
    }
    const next = from + 1;
    setCurrentStep(next);
    scrollToTarget("advisor");
  };

  const handlePrevStep = (from: number) => {
    setCurrentStep(from - 1);
    scrollToTarget("advisor");
  };

  const handleGoalToggle = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  // Recommendations Matching Algorithm
  const handleGetRecommendations = () => {
    if (!riskAppetite) {
      triggerToast("Please select your risk appetite.");
      return;
    }
    setCurrentStep(4);
    setIsMatchingLoading(true);

    setTimeout(() => {
      const scored = FUNDS_DB.map((fund: FundItem) => {
        let score = 0;
        const cat = fund.category || "";

        // Base category score
        const catMap = categoryScores[riskAppetite] || {};
        score += (catMap[cat] || 0) * 8;

        // Goal boosts
        selectedGoals.forEach((goal) => {
          const boostCats = goalCategoryBoost[goal] || [];
          if (boostCats.some((c) => cat.includes(c))) score += 20;
        });

        // Horizon adjustments
        if (horizon === "short") {
          if (
            cat.includes("Liquid") ||
            cat.includes("Overnight") ||
            cat.includes("Ultra Short") ||
            cat.includes("Money Market")
          ) {
            score += 25;
          }
          if (cat.includes("Equity") && !cat.includes("ELSS")) {
            score -= 15;
          }
        }
        if (horizon === "medium") {
          if (
            cat.includes("Short Duration") ||
            cat.includes("Low Duration") ||
            cat.includes("Hybrid")
          ) {
            score += 15;
          }
        }
        if (horizon === "long" || horizon === "verylong") {
          if (
            cat.includes("Equity") ||
            cat.includes("Index") ||
            cat.includes("ELSS")
          ) {
            score += 20;
          }
          if (cat.includes("Liquid") || cat.includes("Overnight")) {
            score -= 10;
          }
        }

        // AMC preference
        if (preferredAMC && fund.amc === preferredAMC) {
          score += 15;
        }

        // Prefer open ended for liquidity
        if (fund.type === "Open Ended") {
          score += 5;
        }

        // Prefer established AMCs
        const topAMCs = [
          "HDFC Asset Management",
          "SBI Funds Management",
          "ICICI Prudential",
          "Axis Asset Management",
          "Kotak Mahindra",
          "Nippon Life",
          "Mirae Asset",
          "UTI Asset",
          "Aditya Birla",
          "Franklin Templeton",
          "DSP Asset",
          "PPFAS",
        ];
        if (topAMCs.some((t) => fund.amc && fund.amc.includes(t))) {
          score += 8;
        }

        // Experience bonus for complex categories
        if (
          experience === "beginner" &&
          (cat.includes("Sectoral") || cat.includes("Small Cap"))
        ) {
          score -= 10;
        }
        if (
          experience === "experienced" &&
          (cat.includes("Sectoral") || cat.includes("Contra"))
        ) {
          score += 5;
        }

        // Random jitter for natural ranking variation
        score += Math.random() * 5;

        return { ...fund, score };
      });

      scored.sort((a: FundItem & { score?: number }, b: FundItem & { score?: number }) => (b.score || 0) - (a.score || 0));
      setRecommendations(scored.slice(0, 12));
      setIsMatchingLoading(false);
    }, 1200);
  };

  const handleResetAdvisor = () => {
    setProfileName("");
    setAgeGroup("");
    setMonthlyAmount(null);
    setExperience("");
    setSelectedGoals([]);
    setHorizon("");
    setRiskAppetite("");
    setPreferredAMC("");
    setRecommendations([]);
    setCurrentStep(1);
  };

  // Filter explore database
  const filteredFunds = useMemo(() => {
    const search = searchQuery.toLowerCase().trim();
    return FUNDS_DB.filter((f: FundItem) => {
      if (filterType && f.type !== filterType) return false;
      if (filterCategory && f.category !== filterCategory) return false;
      if (filterAMC && f.amc !== filterAMC) return false;
      if (search) {
        return (
          (f.name && f.name.toLowerCase().includes(search)) ||
          (f.amc && f.amc.toLowerCase().includes(search)) ||
          (f.category && f.category.toLowerCase().includes(search)) ||
          (f.isin && f.isin.toLowerCase().includes(search)) ||
          (f.code && f.code.includes(search))
        );
      }
      return true;
    });
  }, [searchQuery, filterType, filterCategory, filterAMC]);

  // Paginated explore funds
  const paginatedFunds = useMemo(() => {
    const startIndex = (explorePage - 1) * itemsPerPage;
    return filteredFunds.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredFunds, explorePage]);

  const totalPages = Math.ceil(filteredFunds.length / itemsPerPage);

  const exploreRange = useMemo(() => {
    const current = explorePage;
    const total = totalPages;
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
    if (current >= total - 3) {
      return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    }
    return [1, "...", current - 1, current, current + 1, "...", total];
  }, [explorePage, totalPages]);

  // Clear filters
  const handleClearFilters = () => {
    setFilterType("");
    setFilterCategory("");
    setFilterAMC("");
    setExplorePage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setExplorePage(1);
  };

  // CSS class helpers
  const getBadgeClass = (category: string) => {
    if (!category) return "badge-other";
    const c = category.toLowerCase();
    if (c.includes("equity") || c.includes("elss")) return "badge-equity";
    if (
      c.includes("debt") ||
      c.includes("liquid") ||
      c.includes("gilt") ||
      c.includes("money market")
    ) {
      return "badge-debt";
    }
    if (c.includes("hybrid")) return "badge-hybrid";
    return "badge-other";
  };

  const getCategoryLabel = (category: string) => {
    if (!category) return "Other";
    const map: Record<string, string> = {
      "Equity Scheme - Large Cap Fund": "Large Cap",
      "Equity Scheme - Large & Mid Cap Fund": "Large & Mid Cap",
      "Equity Scheme - Mid Cap Fund": "Mid Cap",
      "Equity Scheme - Small Cap Fund": "Small Cap",
      "Equity Scheme - Flexi Cap Fund": "Flexi Cap",
      "Equity Scheme - Multi Cap Fund": "Multi Cap",
      "Equity Scheme - ELSS": "ELSS",
      "Equity Scheme - Sectoral/ Thematic": "Sectoral",
      "Equity Scheme - Focused Fund": "Focused",
      "Equity Scheme - Contra Fund": "Contra",
      "Equity Scheme - Value Fund": "Value",
      "Equity Scheme - Dividend Yield Fund": "Dividend Yield",
      "Debt Scheme - Liquid Fund": "Liquid",
      "Debt Scheme - Overnight Fund": "Overnight",
      "Debt Scheme - Ultra Short Duration Fund": "Ultra Short",
      "Debt Scheme - Short Duration Fund": "Short Duration",
      "Debt Scheme - Medium Duration Fund": "Med Duration",
      "Debt Scheme - Medium to Long Duration Fund": "Med-Long Duration",
      "Debt Scheme - Long Duration Fund": "Long Duration",
      "Debt Scheme - Gilt Fund": "Gilt",
      "Debt Scheme - Corporate Bond Fund": "Corp Bond",
      "Debt Scheme - Banking and PSU Fund": "Banking & PSU",
      "Debt Scheme - Credit Risk Fund": "Credit Risk",
      "Debt Scheme - Money Market Fund": "Money Market",
      "Debt Scheme - Dynamic Bond": "Dynamic Bond",
      "Hybrid Scheme - Aggressive Hybrid Fund": "Aggressive Hybrid",
      "Hybrid Scheme - Conservative Hybrid Fund": "Consv. Hybrid",
      "Hybrid Scheme - Balanced Hybrid Fund": "Balanced Hybrid",
      "Hybrid Scheme - Dynamic Asset Allocation or Balanced Advantage": "BAF",
      "Hybrid Scheme - Arbitrage Fund": "Arbitrage",
      "Hybrid Scheme - Multi Asset Allocation": "Multi Asset",
      "Hybrid Scheme - Equity Savings": "Equity Savings",
      "Other Scheme - Index Funds": "Index Fund",
      "Other Scheme - Gold ETF": "Gold ETF",
      "Other Scheme - Other  ETFs": "ETF",
      "Other Scheme - FoF Domestic": "FoF",
      "Other Scheme - FoF Overseas": "FoF Overseas",
      "Solution Oriented Scheme - Retirement Fund": "Retirement",
      "Solution Oriented Scheme - Children s Fund": "Children's",
      ELSS: "ELSS",
    };
    return (
      map[category] ||
      category
        .replace(/^(Equity|Debt|Hybrid|Other|Solution Oriented) Scheme - /, "")
        .substring(0, 18)
    );
  };

  const formatAmount = (amount: string | number | undefined) => {
    if (!amount) return "—";
    const num = parseInt(amount.toString().replace(/[^0-9]/g, ""));
    if (isNaN(num)) return amount.replace("Rs.", "₹").substring(0, 20);
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `₹${(num / 1000).toFixed(0)}K`;
    return `₹${num}`;
  };

  return (
    <div className="mf-screener-container pt-16 min-h-screen bg-[#faf9f7] text-[#0d1f3c]">
      {/* Toast popup */}
      {toastMessage && (
        <div className="toast-message" style={{ display: "block" }}>
          {toastMessage}
        </div>
      )}

      {/* HERO SECTION */}
      <section className="hero" id="hero">
        <div className="hero-canvas">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
          <div className="ticker-wrap">
            <div className="ticker-track">
              <span className="ticker-item ticker-up">HDFC Mid Cap Opportunities ▲ 2.1%</span>
              <span className="ticker-item ticker-up">SBI Nifty Index ▲ 1.4%</span>
              <span className="ticker-item ticker-up">Axis ELSS Tax Saver ▲ 3.2%</span>
              <span className="ticker-item ticker-up">ICICI Bluechip ▲ 0.8%</span>
              <span className="ticker-item ticker-down">Nippon Liquid ▼ 0.1%</span>
              <span className="ticker-item ticker-up">Kotak Small Cap ▲ 4.1%</span>
              <span className="ticker-item ticker-up">Mirae Asset Large Cap ▲ 1.9%</span>
              <span className="ticker-item ticker-up">DSP Flexi Cap ▲ 2.5%</span>
              <span className="ticker-item ticker-up">UTI Gilt Fund ▲ 0.6%</span>
              <span className="ticker-item ticker-up">HDFC Mid Cap Opportunities ▲ 2.1%</span>
              <span className="ticker-item ticker-up">SBI Nifty Index ▲ 1.4%</span>
              <span className="ticker-item ticker-up">Axis ELSS Tax Saver ▲ 3.2%</span>
            </div>
          </div>
        </div>

        <div className="hero-content">
          <div className="creator-badge">
            <span className="creator-tag">MFS SmartMatch v2.1</span>
          </div>

          <div className="hero-eyebrow">
            <span className="eyebrow-line"></span>
            <span className="eyebrow-text">India&apos;s Complete Fund Database</span>
          </div>

          <h1 className="hero-title">
            MUTUAL FUND<br />
            <em>SCREENER</em>
          </h1>

          <p className="hero-sub">
            Screen, filter, and discover from {FUNDS_DB.length.toLocaleString()} live schemes across {amcs.length} AMCs &mdash; matched to your goals, risk, and investment horizon.
          </p>

          <div className="hero-counter-bar">
            <div className="counter-item">
              <span className="counter-val">{schemesCount.toLocaleString()}</span>
              <span className="counter-lbl">Live Schemes</span>
            </div>
            <div className="counter-divider"></div>
            <div className="counter-item">
              <span className="counter-val">{amcsCount}</span>
              <span className="counter-lbl">AMCs</span>
            </div>
            <div className="counter-divider"></div>
            <div className="counter-item">
              <span className="counter-val">{catsCount}</span>
              <span className="counter-lbl">Categories</span>
            </div>
          </div>

          <div className="hero-actions">
            <button onClick={() => scrollToTarget("advisor")} className="btn-primary btn-lg">
              Find My Best Funds &rarr;
            </button>
            <button onClick={() => scrollToTarget("explore")} className="btn-ghost btn-lg">
              Browse All Funds
            </button>
          </div>

          <div className="hero-quicksearch">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Quick search — try 'HDFC Mid Cap' or 'Index Fund'..."
              className="hero-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") scrollToTarget("explore");
              }}
            />
            <span className="hero-search-hint" onClick={() => scrollToTarget("explore")}>
              &#9166; Go
            </span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-container">
            <div className="float-card float-card-1">
              <div className="fc1-icon">&#127919;</div>
              <div className="fc1-text">
                <strong>Personalised Picks</strong>
                <span>Matched to your profile</span>
              </div>
            </div>

            <div className="dash-card">
              <div className="dash-header">
                <span className="dash-title">Top Recommendations</span>
                <div className="dash-ai-badge">
                  <span className="ai-dot"></span>
                  Smart Match
                </div>
              </div>

              <div className="fund-row">
                <div className="fr-rank gold-rank">1</div>
                <div className="fr-info">
                  <div className="fr-name">HDFC Mid Cap Opportunities</div>
                  <div className="fr-cat">Equity &middot; Mid Cap</div>
                </div>
                <div className="fr-match">
                  <span className="fr-pct">94%</span>
                  <div className="fr-bar"><div className="fr-fill" style={{ width: "94%" }}></div></div>
                </div>
              </div>

              <div className="fund-row">
                <div className="fr-rank silver-rank">2</div>
                <div className="fr-info">
                  <div className="fr-name">SBI Nifty Index Fund</div>
                  <div className="fr-cat">Other &middot; Index Fund</div>
                </div>
                <div className="fr-match">
                  <span className="fr-pct">87%</span>
                  <div className="fr-bar"><div className="fr-fill" style={{ width: "87%" }}></div></div>
                </div>
              </div>

              <div className="fund-row">
                <div className="fr-rank bronze-rank">3</div>
                <div className="fr-info">
                  <div className="fr-name">Axis Long Term Equity</div>
                  <div className="fr-cat">Equity &middot; ELSS</div>
                </div>
                <div className="fr-match">
                  <span className="fr-pct">81%</span>
                  <div className="fr-bar"><div className="fr-fill" style={{ width: "81%" }}></div></div>
                </div>
              </div>
            </div>

            <div className="float-card float-card-2">
              <div className="fc2-label">Top AMCs in our database</div>
              <div className="fc2-amcs">
                <span className="fc2-amc">HDFC</span>
                <span className="fc2-amc">SBI</span>
                <span className="fc2-amc">ICICI</span>
                <span className="fc2-amc">Axis</span>
                <span className="fc2-amc">Kotak</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADVISOR / SCREENER */}
      <section className="advisor-section" id="advisor">
        <div className="section-header">
          <span className="section-tag">Smart Questionnaire</span>
          <h2>Find Your Perfect Fund</h2>
          <p>Our matching engine scores and filters the {FUNDS_DB.length.toLocaleString()} funds to find options aligned to your age, goal, and risk tolerance.</p>
        </div>

        <div className="advisor-inner">
          <div className="steps-bar">
            <div className={`step ${currentStep === 1 ? "active" : currentStep > 1 ? "done" : ""}`}>
              <div className="step-circle">1</div>
              <span>Profile</span>
            </div>
            <div className={`step-line ${currentStep > 1 ? "done" : ""}`}></div>
            <div className={`step ${currentStep === 2 ? "active" : currentStep > 2 ? "done" : ""}`}>
              <div className="step-circle">2</div>
              <span>Goals</span>
            </div>
            <div className={`step-line ${currentStep > 2 ? "done" : ""}`}></div>
            <div className={`step ${currentStep === 3 ? "active" : currentStep > 3 ? "done" : ""}`}>
              <div className="step-circle">3</div>
              <span>Risk</span>
            </div>
            <div className={`step-line ${currentStep > 3 ? "done" : ""}`}></div>
            <div className={`step ${currentStep === 4 ? "active" : ""}`}>
              <div className="step-circle">4</div>
              <span>Results</span>
            </div>
          </div>

          <div className="form-panels">
            {/* STEP 1: Profile */}
            {currentStep === 1 && (
              <div className="form-panel active">
                <h3>Tell us about yourself</h3>
                <p className="panel-sub">Help us understand your investment context</p>

                <div className="form-group">
                  <label htmlFor="inp-name">Your Name</label>
                  <input
                    type="text"
                    id="inp-name"
                    placeholder="e.g., Rahul Sharma"
                    className="form-input"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Age Group</label>
                  <div className="chip-group">
                    {["18-25", "26-35", "36-45", "46-55", "55+"].map((age) => (
                      <div
                        key={age}
                        className={`chip ${ageGroup === age ? "selected" : ""}`}
                        onClick={() => setAgeGroup(age)}
                      >
                        {age}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Monthly Investment Amount</label>
                  <div className="chip-group">
                    {[500, 1000, 5000, 10000, 50000].map((amt) => (
                      <div
                        key={amt}
                        className={`chip ${monthlyAmount === amt ? "selected" : ""}`}
                        onClick={() => setMonthlyAmount(amt)}
                      >
                        ₹{amt.toLocaleString()}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Investment Experience</label>
                  <div className="chip-group">
                    {[
                      { val: "beginner", label: "Beginner" },
                      { val: "intermediate", label: "Intermediate" },
                      { val: "experienced", label: "Experienced" },
                    ].map((exp) => (
                      <div
                        key={exp.val}
                        className={`chip ${experience === exp.val ? "selected" : ""}`}
                        onClick={() => setExperience(exp.val)}
                      >
                        {exp.label}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="btn-row">
                  <button className="btn-primary" onClick={() => handleNextStep(1)}>
                    Continue &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Goals */}
            {currentStep === 2 && (
              <div className="form-panel active">
                <h3>What are your goals?</h3>
                <p className="panel-sub">Select multiple goals &mdash; we will match categories that support them</p>

                <div className="goal-cards">
                  {[
                    { val: "wealth", icon: "📈", title: "Wealth Creation", desc: "Long-term capital appreciation" },
                    { val: "retirement", icon: "🌴", title: "Retirement Plan", desc: "Build a comfortable post-job corpus" },
                    { val: "tax", icon: "📄", title: "Tax Saving", desc: "Save tax under Section 80C via ELSS" },
                    { val: "emergency", icon: "🛡️", title: "Emergency Fund", desc: "Highly stable, accessible savings" },
                    { val: "income", icon: "💰", title: "Regular Income", desc: "Dividend payouts or periodic SWP" },
                    { val: "education", icon: "🎓", title: "Education", desc: "Build higher education fund for children" },
                  ].map((goal) => (
                    <div
                      key={goal.val}
                      className={`goal-card ${selectedGoals.includes(goal.val) ? "selected" : ""}`}
                      onClick={() => handleGoalToggle(goal.val)}
                    >
                      <span className="goal-icon">{goal.icon}</span>
                      <strong>{goal.title}</strong>
                      <p>{goal.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="form-group" style={{ marginTop: "28px" }}>
                  <label>Investment Horizon</label>
                  <div className="chip-group">
                    {[
                      { val: "short", label: "Under 1 Year" },
                      { val: "medium", label: "1–3 Years" },
                      { val: "long", label: "3–7 Years" },
                      { val: "vlong", label: "7+ Years" },
                    ].map((hz) => (
                      <div
                        key={hz.val}
                        className={`chip ${horizon === hz.val ? "selected" : ""}`}
                        onClick={() => setHorizon(hz.val)}
                      >
                        {hz.label}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="btn-row">
                  <button className="btn-ghost" onClick={() => handlePrevStep(2)}>
                    &larr; Back
                  </button>
                  <button className="btn-primary" onClick={() => handleNextStep(2)}>
                    Continue &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Risk */}
            {currentStep === 3 && (
              <div className="form-panel active">
                <h3>What is your risk tolerance?</h3>
                <p className="panel-sub">This is the critical input that sets your core asset allocation mix</p>

                <div className="risk-cards">
                  <div
                    className={`risk-card ${riskAppetite === "low" ? "selected" : ""}`}
                    onClick={() => setRiskAppetite("low")}
                  >
                    <div className="risk-header">
                      <span className="risk-icon">&#128994;</span>
                      <strong>Conservative</strong>
                    </div>
                    <div className="risk-card-inner">
                      <p>Prioritises capital protection. Accepts lower returns for steady stability.</p>
                      <ul>
                        <li>Liquid &amp; Overnight Funds</li>
                        <li>Gilt &amp; Corporate Debt</li>
                        <li>Short Duration Funds</li>
                      </ul>
                    </div>
                  </div>

                  <div
                    className={`risk-card ${riskAppetite === "medium" ? "selected" : ""}`}
                    onClick={() => setRiskAppetite("medium")}
                  >
                    <div className="risk-header">
                      <span className="risk-icon">&#128993;</span>
                      <strong>Moderate</strong>
                    </div>
                    <div className="risk-card-inner">
                      <p>Wants balanced growth. Accepts moderate volatility over a medium timeline.</p>
                      <ul>
                        <li>Large &amp; Flexi Cap Funds</li>
                        <li>Balanced Advantage (BAFs)</li>
                        <li>Index Funds &amp; ETFs</li>
                      </ul>
                    </div>
                  </div>

                  <div
                    className={`risk-card ${riskAppetite === "high" ? "selected" : ""}`}
                    onClick={() => setRiskAppetite("high")}
                  >
                    <div className="risk-header">
                      <span className="risk-icon">&#128308;</span>
                      <strong>Aggressive</strong>
                    </div>
                    <div className="risk-card-inner">
                      <p>Tolerates heavy market swings to chase high long-term growth.</p>
                      <ul>
                        <li>Small &amp; Mid Cap Equity</li>
                        <li>Sectoral &amp; Thematic</li>
                        <li>Contra &amp; Multi Cap Funds</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: "28px" }}>
                  <label htmlFor="inp-amc">Preferred Asset Management Company (optional)</label>
                  <select
                    className="form-input"
                    id="inp-amc"
                    value={preferredAMC}
                    onChange={(e) => setPreferredAMC(e.target.value)}
                  >
                    <option value="">Any AMC &mdash; recommend best options across all companies</option>
                    {amcs.map((a: string) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="btn-row">
                  <button className="btn-ghost" onClick={() => handlePrevStep(3)}>
                    &larr; Back
                  </button>
                  <button className="btn-primary" onClick={handleGetRecommendations}>
                    Get My Recommendations &#10022;
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Results */}
            {currentStep === 4 && (
              <div className="form-panel active">
                <div className="results-header">
                  <div className="results-intro">
                    <h3>{profileName ? `${profileName}'s ` : ""}Top Fund Recommendations</h3>
                    <p>Based on your profile &mdash; {riskAppetite} risk, {horizon} horizon</p>
                  </div>
                  <button className="btn-ghost btn-sm" onClick={handleResetAdvisor}>
                    &#8634; Start Over
                  </button>
                </div>

                {isMatchingLoading ? (
                  <div className="loading-state" style={{ display: "block" }}>
                    <div className="spinner"></div>
                    <p>Screening {FUNDS_DB.length.toLocaleString()} active schemes for your matches...</p>
                  </div>
                ) : (
                  <>
                    <div className="results-list">
                      {recommendations.map((fund, i) => {
                        const maxScore = recommendations[0]?.score || 1;
                        const matchPct = Math.round((fund.score / maxScore) * 100);
                        const badgeClass = getBadgeClass(fund.category);
                        const badgeLabel = getCategoryLabel(fund.category);

                        return (
                          <div
                            key={fund.code || i}
                            className="result-card"
                            style={{ animationDelay: `${i * 0.06}s` }}
                            onClick={() => setSelectedFund(fund)}
                          >
                            <div className={`result-rank ${i === 0 ? "gold-r" : ""}`}>{i + 1}</div>
                            <div className="result-info">
                              <div className="result-name">{fund.name}</div>
                              <div className="result-meta">
                                {fund.amc} &middot; {fund.type} &middot; Min: {formatAmount(fund.minAmount)}
                              </div>
                            </div>
                            <div className="result-badges">
                              <span className={`badge ${badgeClass}`}>{badgeLabel}</span>
                              <span className="match-pill">{matchPct}% match</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="results-footer" style={{ display: "block" }}>
                      <p className="disclaimer">
                        &#9888;&#65039; Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing. Past performance is not a guarantee of future returns. This tool is for educational purposes only.
                      </p>
                      <button className="btn-primary" onClick={() => scrollToTarget("explore")}>
                        Explore Complete Database &rarr;
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* EXPLORE SECTION */}
      <section className="explore-section" id="explore">
        <div className="section-header">
          <span className="section-tag">Full Database</span>
          <h2>Explore All Schemes</h2>
          <p>Query, filter, and inspect the entire AMFI-registered mutual fund master list.</p>
        </div>

        <div className="explore-controls">
          <div className="search-box">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search funds by name, AMC, category, ISIN or scheme code..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setExplorePage(1);
              }}
            />
            {searchQuery && (
              <button className="search-clear" onClick={handleClearSearch} style={{ display: "flex" }}>
                &#10005;
              </button>
            )}
          </div>

          <div className="filter-row">
            <select
              className="filter-select"
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setExplorePage(1);
              }}
            >
              <option value="">All Types</option>
              <option value="Open Ended">Open Ended</option>
              <option value="Close Ended">Close Ended</option>
              <option value="Interval Fund">Interval Fund</option>
            </select>

            <select
              className="filter-select"
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(e.target.value);
                setExplorePage(1);
              }}
            >
              <option value="">All Categories</option>
              {categories.map((c: string) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              className="filter-select"
              value={filterAMC}
              onChange={(e) => {
                setFilterAMC(e.target.value);
                setExplorePage(1);
              }}
            >
              <option value="">All AMCs</option>
              {amcs.map((a: string) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>

            <button className="btn-ghost btn-sm" onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>
        </div>

        <div className="table-meta">
          <span>
            Showing {paginatedFunds.length} of {filteredFunds.length.toLocaleString()} schemes
          </span>
          <div className="view-toggle">
            <button
              className={`view-btn ${exploreView === "grid" ? "active" : ""}`}
              onClick={() => setExploreView("grid")}
              title="Grid view"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </button>
            <button
              className={`view-btn ${exploreView === "list" ? "active" : ""}`}
              onClick={() => setExploreView("list")}
              title="List view"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {paginatedFunds.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", color: "#7d8fa8" }}>
            No funds match your filters. Try adjusting your search query.
          </div>
        ) : (
          <div className={exploreView === "grid" ? "funds-grid" : "funds-list"}>
            {paginatedFunds.map((fund: FundItem, idx) => {
              const badgeClass = getBadgeClass(fund.category);
              const badgeLabel = getCategoryLabel(fund.category);

              if (exploreView === "list") {
                return (
                  <div key={fund.code || idx} className="fund-card" onClick={() => setSelectedFund(fund)}>
                    <div className="fc-header">
                      <div>
                        <div className="fc-amc">{fund.amc}</div>
                        <div className="fc-name">{fund.name}</div>
                      </div>
                    </div>
                    <div className="fc-footer">
                      <span className={`badge ${badgeClass}`}>{badgeLabel}</span>
                      <span
                        className="badge"
                        style={{
                          background: "rgba(125,143,168,0.1)",
                          borderColor: "rgba(125,143,168,0.2)",
                          color: "#7d8fa8",
                        }}
                      >
                        {fund.type}
                      </span>
                      <span className="fc-min">Min: {formatAmount(fund.minAmount)}</span>
                    </div>
                  </div>
                );
              }

              return (
                <div key={fund.code || idx} className="fund-card" onClick={() => setSelectedFund(fund)}>
                  <div className="fc-header">
                    <div className="fc-amc">{fund.amc ? fund.amc.substring(0, 30) + (fund.amc.length > 30 ? "..." : "") : ""}</div>
                    <span className={`badge ${badgeClass}`} style={{ flexShrink: 0 }}>
                      {badgeLabel}
                    </span>
                  </div>
                  <div className="fc-name">{fund.name}</div>
                  <div className="fc-footer">
                    <span
                      className="badge"
                      style={{
                        background: "rgba(125,143,168,0.1)",
                        borderColor: "rgba(125,143,168,0.2)",
                        color: "#7d8fa8",
                        fontSize: "10px",
                      }}
                    >
                      {fund.type}
                    </span>
                    <span className="fc-min">Min: {formatAmount(fund.minAmount)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            <button className="page-btn" disabled={explorePage === 1} onClick={() => setExplorePage((p) => Math.max(p - 1, 1))}>
              &larr;
            </button>
            {exploreRange.map((p, index) => {
              if (p === "...") {
                return (
                  <span
                    key={`dots-${index}`}
                    style={{ padding: "0 4px", color: "#4a5568", display: "flex", alignItems: "center" }}
                  >
                    &hellip;
                  </span>
                );
              }
              return (
                <button
                  key={p}
                  className={`page-btn ${explorePage === p ? "active" : ""}`}
                  onClick={() => {
                    setExplorePage(Number(p));
                    scrollToTarget("explore");
                  }}
                >
                  {p}
                </button>
              );
            })}
            <button
              className="page-btn"
              disabled={explorePage === totalPages}
              onClick={() => setExplorePage((p) => Math.min(p + 1, totalPages))}
            >
              &rarr;
            </button>
          </div>
        )}
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section" id="about">
        <div className="about-grid">
          <div className="about-text">
            <span className="section-tag">Unbiased Data Aggregator</span>
            <h2>Investing, made simple for every Indian.</h2>
            <p>Our screener consolidates information directly from the Association of Mutual Funds in India (AMFI) database to present fee-transparent, conflict-free recommendations.</p>

            <div className="about-features">
              <div className="about-feat">
                <span className="feat-icon">&#127919;</span>
                <div>
                  <strong>Personalised Matching</strong>
                  <p>Our algorithm balances your goals, timelines, and profile preferences to find your investment matches.</p>
                </div>
              </div>

              <div className="about-feat">
                <span className="feat-icon">&#128202;</span>
                <div>
                  <strong>Live Scheme Database</strong>
                  <p>Aggregated directly from AMFI updates &mdash; featuring {FUNDS_DB.length.toLocaleString()} active schemes from 53 registered AMCs.</p>
                </div>
              </div>

              <div className="about-feat">
                <span className="feat-icon">&#128274;</span>
                <div>
                  <strong>Zero-Commission Diligence</strong>
                  <p>No sponsored rankings or payout incentives. Unbiased metrics sorted purely by quantitative matching metrics.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-visual">
            <div className="category-cloud">
              {keyCategories.map((item, idx) => (
                <div
                  key={idx}
                  className="cat-tag"
                  style={{
                    borderColor: `${item.color}44`,
                    color: item.color,
                    background: `${item.color}11`,
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* DETAILED MODAL POPUP */}
      {selectedFund && (
        <>
          <div className="modal-overlay open" onClick={() => setSelectedFund(null)}></div>
          <div className="fund-modal open">
            <button className="modal-close" onClick={() => setSelectedFund(null)}>
              &#10005;
            </button>
            <div id="modal-content">
              <div className="modal-fund-name">{selectedFund.name}</div>
              <div className="modal-amc">{selectedFund.amc}</div>
              <div className="modal-grid">
                <div className="modal-item">
                  <label>Scheme Type</label>
                  <strong>{selectedFund.type}</strong>
                </div>
                <div className="modal-item">
                  <label>Category</label>
                  <strong>
                    <span className={`badge ${getBadgeClass(selectedFund.category)}`} style={{ display: "inline-block" }}>
                      {getCategoryLabel(selectedFund.category)}
                    </span>
                  </strong>
                </div>
                <div className="modal-item">
                  <label>Minimum Investment</label>
                  <strong>{formatAmount(selectedFund.minAmount)}</strong>
                </div>
                <div className="modal-item">
                  <label>Scheme Code</label>
                  <strong style={{ fontFamily: "'JetBrains Mono', monospace" }}>{selectedFund.code}</strong>
                </div>
                <div className="modal-item">
                  <label>Launch Date</label>
                  <strong>{selectedFund.launch || "—"}</strong>
                </div>
                <div className="modal-item">
                  <label>Full AMFI Category</label>
                  <strong style={{ fontSize: "12px" }}>{selectedFund.category}</strong>
                </div>
              </div>
              {selectedFund.navName && (
                <div style={{ marginBottom: "12px" }}>
                  <span className="modal-isin-label">NAV Plan Name</span>
                  <div className="modal-nav-name">{selectedFund.navName}</div>
                </div>
              )}
              {selectedFund.isin && (
                <div>
                  <span className="modal-isin-label">ISIN Identifier</span>
                  <div className="modal-isin">{selectedFund.isin}</div>
                </div>
              )}
              <p style={{ fontSize: "11px", color: "#6b7c95", lineHeight: "1.7", marginTop: "16px" }}>
                ⚠️ This data is educational and sourced directly from AMFI master feeds. Always perform independent diligence before allocating capital. Mutual fund investing carries market risks.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
