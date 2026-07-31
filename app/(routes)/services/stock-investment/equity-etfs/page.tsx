"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Ticker tape data
const tickerData = [
  ["NIFTY 50", "24,812.40", "+0.62%", true],
  ["SENSEX", "81,540.10", "+0.58%", true],
  ["NIFTY MIDCAP 100", "58,210.75", "+0.91%", true],
  ["NIFTY SMALLCAP 100", "18,940.30", "-0.34%", false],
  ["NIFTY BANK", "52,118.60", "+0.21%", true],
  ["GOLD (MCX)", "₹71,240/10g", "+0.15%", true],
  ["INDIA VIX", "13.42", "-2.10%", false],
  ["NIFTY IT", "41,205.80", "+1.12%", true],
  ["FII FLOW", "+₹1,842 Cr", "NET BUY", true],
];

interface Option {
  label: string;
  sub?: string;
}

interface Question {
  key: string;
  title: string;
  sub: string;
  options: Option[];
}

// Quiz question data
const questions: Question[] = [
  {
    key: "goal",
    title: "What is your investment goal?",
    sub: "Purpose: tailors allocation to the objective.",
    options: [
      { label: "Wealth Creation", sub: "Long-term compounding" },
      { label: "Retirement", sub: "20+ year horizon" },
      { label: "Child Education", sub: "10–18 year horizon" },
      { label: "Buying a House", sub: "5–10 year horizon" },
      { label: "Buying a Car", sub: "2–5 year horizon" },
      { label: "Emergency Fund", sub: "Capital protection first" },
      { label: "Passive Income", sub: "Dividend / stable yield" },
    ],
  },
  {
    key: "risk",
    title: "What is your risk profile?",
    sub: "How much volatility can you sit through without flinching.",
    options: [
      { label: "Conservative", sub: "Prioritise capital safety" },
      { label: "Moderate", sub: "Balanced risk / reward" },
      { label: "Aggressive", sub: "Maximise long-term growth" },
    ],
  },
  {
    key: "capacity",
    title: "What is your monthly investment capacity?",
    sub: "Determines suggested diversification breadth.",
    options: [
      { label: "₹1,000–5,000" },
      { label: "₹5,000–10,000" },
      { label: "₹10,000–25,000" },
      { label: "₹25,000–50,000" },
      { label: "₹50,000+" },
    ],
  },
  {
    key: "style",
    title: "What is your investment style?",
    sub: "How you plan to deploy capital into the market.",
    options: [
      { label: "SIP Only", sub: "Disciplined monthly investing" },
      { label: "Lump Sum Only", sub: "One-time deployment" },
      { label: "SIP + Lump Sum", sub: "Hybrid deployment" },
    ],
  },
  {
    key: "returns",
    title: "What return are you targeting?",
    sub: "Sets the growth tilt of your allocation.",
    options: [
      { label: "Stable (8–10%)", sub: "Defensive tilt" },
      { label: "Balanced (10–12%)", sub: "Core equity tilt" },
      { label: "High Growth (12–15%)", sub: "Growth tilt" },
      { label: "Maximum Growth (15%+)", sub: "Aggressive tilt" },
    ],
  },
];

// Allocation Engine Segments
const SEGMENTS = [
  { key: "large", name: "Large Cap", color: "#2d6a4f", desc: "Top-100 bluechip stability anchor." },
  { key: "mid", name: "Mid Cap", color: "#52b788", desc: "Growth with moderate volatility." },
  { key: "small", name: "Small Cap", color: "#ef4444", desc: "High growth, high drawdown risk." },
  { key: "flexi", name: "Flexi Cap", color: "#29628c", desc: "Manager-driven cap-agnostic mix." },
  { key: "sectoral", name: "Sectoral / Thematic", color: "#9c6644", desc: "Concentrated tactical exposure." },
  { key: "index", name: "Index ETF", color: "#e9c46a", desc: "Low-cost broad market beta." },
  { key: "gold", name: "Gold ETF", color: "#d4af37", desc: "Non-equity hedge & ballast." },
];

const RISK_BASE: Record<string, Record<string, number>> = {
  Conservative: { large: 35, mid: 8, small: 3, flexi: 14, sectoral: 3, index: 22, gold: 15 },
  Moderate: { large: 26, mid: 18, small: 9, flexi: 19, sectoral: 8, index: 14, gold: 6 },
  Aggressive: { large: 16, mid: 25, small: 21, flexi: 19, sectoral: 14, index: 5, gold: 0 },
};

const RETURN_TILT: Record<string, number> = {
  "Stable (8–10%)": -2.0,
  "Balanced (10–12%)": -0.5,
  "High Growth (12–15%)": 1.2,
  "Maximum Growth (15%+)": 2.6,
};

const GOAL_DELTA: Record<string, Record<string, number>> = {
  "Wealth Creation": { mid: 3, small: 2, flexi: 1, large: -3, index: -1, gold: -2 },
  Retirement: { large: 4, index: 2, gold: 1, small: -3, sectoral: -2, mid: -2 },
  "Child Education": { flexi: 3, large: 2, index: 1, sectoral: -3, small: -2, gold: -1 },
  "Buying a House": { large: 3, index: 3, gold: 2, small: -4, sectoral: -3, mid: -1 },
  "Buying a Car": { large: 5, index: 4, gold: 3, small: -6, sectoral: -4, mid: -2 },
  "Emergency Fund": { gold: 8, index: 6, large: 3, small: -7, sectoral: -6, mid: -4 },
  "Passive Income": { large: 4, index: 3, flexi: 2, sectoral: -4, small: -3, mid: -2 },
};

export default function EquityETFsPage() {
  // State
  const [curQ, setCurQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [activeSlice, setActiveSlice] = useState<string | null>(null);
  const [isComparedVisible, setIsComparedVisible] = useState(false);
  const [isQuizVisible, setIsQuizVisible] = useState(false);

  // References for scrolling
  const quizRef = useRef<HTMLDivElement>(null);
  const compareRef = useRef<HTMLDivElement>(null);
  const vsTableRef = useRef<HTMLDivElement>(null);
  const quizPanelRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Trigger pop-in when user reaches the comparison section
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsComparedVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsComparedVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (vsTableRef.current) {
      observer.observe(vsTableRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Trigger pop-in when user reaches the quiz panel
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsQuizVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsQuizVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (quizPanelRef.current) {
      observer.observe(quizPanelRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Scroll Helpers
  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Compute allocation logic
  const getComputedAllocation = () => {
    const risk = answers["risk"] || "Moderate";
    const returns = answers["returns"] || "Balanced (10–12%)";
    const goal = answers["goal"] || "Wealth Creation";

    const base = { ...RISK_BASE[risk] };
    const tilt = RETURN_TILT[returns] || 0;

    const defensiveKeys = ["large", "index", "gold"];
    const growthKeys = ["mid", "small", "sectoral"];
    
    const working = { ...base };
    const tiltMagnitude = Math.abs(tilt);
    const perDefensive = tiltMagnitude / defensiveKeys.length;
    const perGrowth = tiltMagnitude / growthKeys.length;

    if (tilt > 0) {
      defensiveKeys.forEach((k) => { working[k] = Math.max(0, working[k] - perDefensive); });
      growthKeys.forEach((k) => { working[k] = working[k] + perGrowth; });
    } else if (tilt < 0) {
      defensiveKeys.forEach((k) => { working[k] = working[k] + perDefensive; });
      growthKeys.forEach((k) => { working[k] = Math.max(0, working[k] - perGrowth); });
    }

    const delta = GOAL_DELTA[goal] || {};
    for (const k in delta) {
      working[k] = Math.max(0, (working[k] || 0) + delta[k]);
    }

    // Normalize to 100
    const sum = Object.values(working).reduce((a, b) => a + b, 0);
    const normalized: Record<string, number> = {};
    for (const k in working) {
      normalized[k] = sum > 0 ? (working[k] / sum) * 100 : 0;
    }

    // Rounding that preserves sum = 100
    const keys = Object.keys(normalized);
    const floors = keys.map((k) => Math.floor(normalized[k]));
    const diff = 100 - floors.reduce((a, b) => a + b, 0);
    const remainders = keys.map((k, i) => ({ k, r: normalized[k] - floors[i] }));
    remainders.sort((a, b) => b.r - a.r);

    const result: Record<string, number> = {};
    keys.forEach((k, i) => { result[k] = floors[i]; });
    for (let i = 0; i < diff; i++) {
      result[remainders[i % remainders.length].k] += 1;
    }

    return result;
  };

  const allocation = showResults ? getComputedAllocation() : {};

  // Donut Arc Drawing Math
  const getDonutSlicePath = (cx: number, cy: number, rOuter: number, rInner: number, startAngle: number, endAngle: number) => {
    const toXY = (r: number, angle: number) => {
      const rad = ((angle - 90) * Math.PI) / 180;
      return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
    };
    const [x1, y1] = toXY(rOuter, startAngle);
    const [x2, y2] = toXY(rOuter, endAngle);
    const [x3, y3] = toXY(rInner, endAngle);
    const [x4, y4] = toXY(rInner, startAngle);
    const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
    return `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 ${largeArc} 0 ${x4} ${y4} Z`;
  };

  // Helper for monthly limits
  const capacityToAmountRange = (capacity: string) => {
    const map: Record<string, [number, number]> = {
      "₹1,000–5,000": [1000, 5000],
      "₹5,000–10,000": [5000, 10000],
      "₹10,000–25,000": [10000, 25000],
      "₹25,000–50,000": [25000, 50000],
      "₹50,000+": [50000, 75000],
    };
    return map[capacity] || [10000, 25000];
  };

  const styleNote = (style: string) => {
    const notes: Record<string, string> = {
      "SIP Only": "Deploy the full allocation via monthly SIPs across the chosen funds — this profile is built for rupee-cost averaging, so stay consistent through volatility rather than timing entries.",
      "Lump Sum Only": "Since you plan a one-time deployment, consider staggering entry over 3–4 tranches across 6–8 weeks to reduce single-point timing risk, especially into the Small Cap and Sectoral sleeves.",
      "SIP + Lump Sum": "Use the lump sum to seed the Large Cap, Flexi Cap and Index ETF sleeves immediately, and run SIPs into Mid Cap, Small Cap and Sectoral funds to average into the more volatile segments.",
    };
    return notes[style] || "";
  };

  const capacityNote = (capacity: string) => {
    const notes: Record<string, string> = {
      "₹1,000–5,000": "keep it simple — one Flexi Cap fund plus one Index ETF covers most of this allocation efficiently without over-fragmenting small ticket sizes.",
      "₹5,000–10,000": "three to four funds is enough to express this allocation without diluting any single position below a meaningful size.",
      "₹10,000–25,000": "four to five funds lets you express each segment distinctly while keeping the portfolio easy to track.",
      "₹25,000–50,000": "you can run a dedicated fund per segment, including a standalone Sectoral/Thematic sleeve, without any position becoming too thin.",
      "₹50,000+": "consider direct stock exposure for the Large Cap and Flexi Cap sleeves alongside funds for Mid/Small Cap, to reduce overlapping expense ratios.",
    };
    return notes[capacity] || "";
  };

  return (
    <div className="equityAllocatorTerminal pt-24 md:pt-32">

      {/* Hero Landing */}
      <div className="main-hero">
        <div className="main-hero-grid">
          <div className="main-hero-inner">
            <div className="main-eyebrow">
              <span className="dot"></span>India&apos;s Equity & ETF Desk
            </div>
            <h1>
              Grow your <em>wealth</em> with<br />Equity &amp; ETFs
            </h1>
            <p className="sub">
              Invest in India&apos;s leading companies or diversify instantly with ETFs.{" "}
              <b>Start with as little as ₹100</b> — then let the allocation engine below build the right mix for you.
            </p>
            <div className="hero-cta-row flex flex-wrap gap-4 mt-6">
              <button className="btn-hero-primary" onClick={() => scrollTo(quizRef)}>
                Build My Allocation →
              </button>
              <button className="btn-hero-secondary" onClick={() => scrollTo(compareRef)}>
                Equity vs ETF
              </button>
              <Link href="/services/stock-investment/equity-etfs/apply" className="btn-hero-secondary" style={{ display: "inline-flex", alignItems: "center" }}>
                Apply
              </Link>
              <Link href="/services/stock-investment/open-demat-account" className="btn-hero-secondary" style={{ display: "inline-flex", alignItems: "center" }}>
                Explore
              </Link>
            </div>
          </div>
          <div className="main-hero-visual">
            <div className="hero-glow"></div>
            <Image
              className="hero-img"
              src="/hero-advisor.png"
              alt="Advisor holding a phone showing the Fiscal Forum app with live market watchlist"
              width={480}
              height={480}
              priority
            />
          </div>
        </div>
      </div>

      {/* Comparison Section */}
      <div ref={compareRef} className="compare-section">
        <div className="compare-head">
          <h2>Equity vs ETF — quick comparison</h2>
        </div>
        <div ref={vsTableRef} className={`vs-table ${isComparedVisible ? "in-view" : ""}`}>
          <div className="vs-col equity">
            <div className="vs-col-head">
              <span className="icon">Eq</span>
              <span className="label">Equity</span>
            </div>
            <div className="vs-row-cell">
              Own individual stocks<span className="tag-mini">Direct ownership</span>
            </div>
            <div className="vs-row-cell">
              Higher return potential<span className="tag-mini">Stock-specific upside</span>
            </div>
            <div className="vs-row-cell">
              Requires research<span className="tag-mini">Active monitoring needed</span>
            </div>
          </div>
          <div className="vs-divider">
            <span className="vs-chip">VS</span>
          </div>
          <div className="vs-col etf">
            <div className="vs-col-head">
              <span className="icon">ETF</span>
              <span className="label">ETF</span>
            </div>
            <div className="vs-row-cell">
              Own a basket of stocks<span className="tag-mini">Instant diversification</span>
            </div>
            <div className="vs-row-cell">
              Lower risk through diversification<span className="tag-mini">Spread across holdings</span>
            </div>
            <div className="vs-row-cell">
              Beginner-friendly<span className="tag-mini">Passive, low maintenance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Shell */}
      <div className="shell">
        {/* Intro */}
        <div className="hero">
          <h1>
            Build your <em>allocation</em><br />in seven segments.
          </h1>
          <p>
            Answer five questions about your goals, risk appetite and capacity. The engine maps your profile to a precise
            equity allocation across Large Cap, Mid Cap, Small Cap, Flexi Cap, Sectoral, Index ETF and Gold ETF — then
            renders it as a live, hoverable terminal chart.
          </p>
          <div className="hero-stats">
            <div className="hstat">
              <span className="v mono">07</span>
              <span className="l">Segments tracked</span>
            </div>
            <div className="hstat">
              <span className="v mono">05</span>
              <span className="l">Inputs required</span>
            </div>
            <div className="hstat">
              <span className="v mono">&lt;1s</span>
              <span className="l">Engine compute time</span>
            </div>
          </div>
        </div>

        {/* Quiz Config Section */}
        {!showResults && (
          <div ref={quizRef} className="mt-16">
            <div className="section-title">
              <h2>Configure Profile</h2>
              <div className="progress-track">
                STEP <span className="cur">{curQ + 1}</span> / 5
              </div>
            </div>

            <div ref={quizPanelRef} className={`quiz-panel ${isQuizVisible ? "in-view" : ""}`}>
              <div className="qnum mono">QUESTION {String(curQ + 1).padStart(2, "0")}</div>
              <h3 className="qtitle">{questions[curQ].title}</h3>
              <p className="qsub">{questions[curQ].sub}</p>

              <div className="options">
                {questions[curQ].options.map((o, idx) => {
                  const isSelected = answers[questions[curQ].key] === o.label;
                  return (
                    <button
                      key={idx}
                      className={`opt ${isSelected ? "selected" : ""}`}
                      onClick={() => {
                        setAnswers((prev) => ({ ...prev, [questions[curQ].key]: o.label }));
                      }}
                    >
                      {o.label}
                      {o.sub && <span className="sub">{o.sub}</span>}
                    </button>
                  );
                })}
              </div>

              <div className="nav-buttons">
                <button
                  className="btn"
                  onClick={() => setCurQ((c) => Math.max(0, c - 1))}
                  disabled={curQ === 0}
                >
                  ← Back
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (curQ < questions.length - 1) {
                      setCurQ((c) => c + 1);
                    } else {
                      setShowResults(true);
                      setTimeout(() => {
                        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 100);
                    }
                  }}
                  disabled={!answers[questions[curQ].key]}
                >
                  {curQ === questions.length - 1 ? "Generate Allocation →" : "Next →"}
                </button>
              </div>

              <div className="dots">
                {questions.map((q, i) => (
                  <span
                    key={i}
                    className={i === curQ ? "active" : answers[q.key] !== undefined ? "done" : ""}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Screen */}
        {showResults && (
          <div ref={resultsRef} className="results show mt-16">
            <div className="section-title">
              <h2>Your Allocation</h2>
              <div className="progress-track">ENGINE OUTPUT</div>
            </div>

            <div className="profile-strip">
              {Object.entries(answers).map(([k, v]) => {
                const labelMap: Record<string, string> = {
                  goal: "Goal",
                  risk: "Risk",
                  capacity: "Capacity",
                  style: "Style",
                  returns: "Target",
                };
                return (
                  <div key={k} className="tag">
                    {labelMap[k]}: <b>{v}</b>
                  </div>
                );
              })}
            </div>

            <div className="dash">
              {/* SVG Donut Chart Card */}
              <div className="chart-card">
                <div className="chart-label">Allocation breakdown — hover a slice</div>
                <div id="donutWrap">
                  <svg id="donutSvg" viewBox="0 0 320 320">
                    {(() => {
                      const cx = 160;
                      const cy = 160;
                      const r = 140;
                      const inner = 82;
                      let angle = 0;
                      
                      return SEGMENTS.map((seg) => {
                        const pct = allocation[seg.key] || 0;
                        if (pct <= 0) return null;
                        const sweep = (pct / 100) * 360;
                        const start = angle;
                        const end = angle + sweep;
                        angle = end;

                        const mid = (start + end) / 2;
                        const rad = ((mid - 90) * Math.PI) / 180;
                        const ox = Math.cos(rad);
                        const oy = Math.sin(rad);

                        const d = getDonutSlicePath(cx, cy, r, inner, start, end);
                        const isHovered = activeSlice === seg.key;
                        const isDimmed = activeSlice !== null && activeSlice !== seg.key;

                        const transformStyle = isHovered
                          ? `translate(${(ox * 10).toFixed(2)}px, ${(oy * 10).toFixed(2)}px) scale(1.04)`
                          : "translate(0px, 0px) scale(1)";

                        return (
                          <path
                            key={seg.key}
                            className={`slice ${isHovered ? "active" : ""} ${isDimmed ? "dim" : ""}`}
                            d={d}
                            fill={seg.color}
                            style={{ transform: transformStyle }}
                            onMouseEnter={() => setActiveSlice(seg.key)}
                            onMouseLeave={() => setActiveSlice(null)}
                            onClick={() => setActiveSlice(seg.key)}
                          />
                        );
                      });
                    })()}
                  </svg>
                  <div className="donut-center">
                    {activeSlice ? (
                      <>
                        <div
                          className="pct"
                          style={{ color: SEGMENTS.find((s) => s.key === activeSlice)?.color }}
                        >
                          {allocation[activeSlice]}%
                        </div>
                        <div className="name">
                          {SEGMENTS.find((s) => s.key === activeSlice)?.name}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="pct">{100 - (allocation["gold"] || 0)}%</div>
                        <div className="name">Equity Exposure</div>
                        <div className="hint">HOVER TO INSPECT</div>
                      </>
                    )}
                  </div>
                </div>

                <div className="legend">
                  {SEGMENTS.map((seg) => {
                    const pct = allocation[seg.key] || 0;
                    if (pct <= 0) return null;
                    const isActive = activeSlice === seg.key;
                    return (
                      <div
                        key={seg.key}
                        className={`leg-row ${isActive ? "active" : ""}`}
                        onMouseEnter={() => setActiveSlice(seg.key)}
                        onMouseLeave={() => setActiveSlice(null)}
                      >
                        <div className="leg-left">
                          <span className="leg-dot" style={{ background: seg.color }}></span>
                          <span className="leg-name">{seg.name}</span>
                        </div>
                        <span className="leg-val">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Narratives & Deployment Card */}
              <div>
                <div className="insight-card">
                  <h3>Reading your profile</h3>
                  <p>
                    Based on a {answers["risk"]?.toLowerCase()} risk profile targeting{" "}
                    {answers["returns"]?.toLowerCase()} returns for {answers["goal"]?.toLowerCase()}, the
                    engine weights{" "}
                    {
                      SEGMENTS.slice().sort((a, b) => (allocation[b.key] || 0) - (allocation[a.key] || 0))[0]
                        ?.name
                    }{" "}
                    heaviest at {
                      allocation[
                        SEGMENTS.slice().sort((a, b) => (allocation[b.key] || 0) - (allocation[a.key] || 0))[0]
                          ?.key
                      ]
                    }%. Total equity exposure stands at {100 - (allocation["gold"] || 0)}%, with the
                    remainder held as a gold hedge for portfolio ballast.
                  </p>
                </div>

                <div className="insight-card">
                  <h3>Monthly deployment</h3>
                  <p>
                    {styleNote(answers["style"])} At a monthly capacity of {answers["capacity"]},{" "}
                    {capacityNote(answers["capacity"])}
                  </p>
                  <div id="amountTable" className="mt-6">
                    {(() => {
                      const [lo, hi] = capacityToAmountRange(answers["capacity"]);
                      const mid = Math.round((lo + hi) / 2);
                      const fmt = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
                      
                      const rows = SEGMENTS.map((seg) => {
                        const pct = allocation[seg.key] || 0;
                        if (pct <= 0) return null;
                        const amt = (mid * pct) / 100;
                        return (
                          <div key={seg.key} className="amount-row">
                            <span>{seg.name}</span>
                            <span>{fmt(amt)}/mo</span>
                          </div>
                        );
                      });

                      return (
                        <>
                          {rows}
                          <div className="amount-row">
                            <span>Total (at midpoint of range)</span>
                            <span>{fmt(mid)}/mo</span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                <div className="insight-card">
                  <h3>Segment notes</h3>
                  <div className="seg-grid">
                    {SEGMENTS.map((seg) => {
                      const pct = allocation[seg.key] || 0;
                      if (pct <= 0) return null;
                      return (
                        <div key={seg.key} className="seg-item">
                          <div className="top">
                            <span className="nm">{seg.name}</span>
                            <span className="pc">{pct}%</span>
                          </div>
                          <div className="desc">{seg.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="restart-row">
              <button
                className="btn"
                onClick={() => {
                  setAnswers({});
                  setCurQ(0);
                  setShowResults(false);
                }}
              >
                ↺ Reconfigure Profile
              </button>
            </div>
          </div>
        )}

        {/* Bottom CTA Section */}
        <div className="mt-6 border-t border-line/10 pt-6 pb-2 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-extrabold text-text mb-2">
            Ready to Invest?
          </h2>
          <p className="text-base text-muted mb-4 max-w-xl mx-auto">
            Apply for our custom portfolio assistance or open a Demat account to start executing your allocation.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/services/stock-investment/equity-etfs/apply"
              className="btn btn-primary"
            >
              Apply
            </Link>
            <Link
              href="/services/stock-investment/open-demat-account"
              className="btn"
            >
              Explore
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}