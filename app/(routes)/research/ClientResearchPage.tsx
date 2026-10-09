"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import PortfolioSplitStudio from "./PortfolioSplitStudio";

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
        break;
      }
      
      placed.push({ ...item, x, y });
    }
    
    if (!failed) {
      success = true;
      break;
    }
    
    scaleFactor *= 0.94;
    currentItems = items.map(item => ({
      ...item,
      r: Math.max(16, item.r * scaleFactor)
    }));
  }
  
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

export default function ClientResearchPage() {
  const [activeThemeFaq, setActiveThemeFaq] = useState<number | null>(null);

  /* ============ BUBBLE CHART REFS & MEASUREMENT ============ */
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [bubbleDimensions, setBubbleDimensions] = useState({ width: 800, height: 620 });
  const [bubbleRevealed, setBubbleRevealed] = useState(false);

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
    
    const timer = setTimeout(() => setBubbleRevealed(true), 300);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const packedBubbles = useMemo(() => {
    const isMobile = bubbleDimensions.width < 640;
    const padding = isMobile ? 5 : 8;

    const absVals = sectorUniverse.map(s => Math.abs(s.ytd));
    const minAbs = Math.min(...absVals), maxAbs = Math.max(...absVals);

    const baseMinR = isMobile ? 32 : 40;
    const minR = Math.max(baseMinR, bubbleDimensions.width * 0.08);
    const maxR = Math.max(minR + (isMobile ? 24 : 30), bubbleDimensions.width * 0.14);

    let items = sectorUniverse.map(s => ({
      ...s,
      r: minR + ((Math.abs(s.ytd) - minAbs) / ((maxAbs - minAbs) || 1)) * (maxR - minR)
    }));

    const totalArea = items.reduce((sum, item) => sum + Math.PI * Math.pow(item.r + padding / 2, 2), 0);
    const containerArea = bubbleDimensions.width * bubbleDimensions.height;
    
    const targetRatio = isMobile ? 0.65 : 0.48;
    if (totalArea > containerArea * targetRatio) {
      const scale = Math.sqrt((containerArea * targetRatio) / totalArea);
      items = items.map(item => {
        const newR = Math.max(isMobile ? 20 : 30, item.r * scale);
        return { ...item, r: newR };
      });
    }

    return packSectorBubbles(items, bubbleDimensions.width, bubbleDimensions.height, padding);
  }, [bubbleDimensions]);

  const maxAbsYtdGlobal = useMemo(() => {
    return Math.max(...sectorUniverse.map(s => Math.abs(s.ytd)));
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-[#111411] pt-24 pb-16 px-4 md:px-8">
      {/* ================= PAGE HEADER ================= */}
      <section className="section research-embed-section max-w-7xl mx-auto" id="sector-research">
        <div className="wrap" style={{ paddingBottom: '0' }}>
          <div className="section-head" style={{ marginBottom: '20px' }}>
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111411]">Your one stop Research &amp; Analysis at one single place !</h1>
              <p className="text-gray-700 mt-4 text-lg sm:text-xl md:text-2xl font-medium leading-relaxed max-w-4xl">Comprehensive sectoral overviews, interactive heatmaps, and theme-based index performance metrics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION: PORTFOLIO PRODUCT MIX STUDIO ================= */}
      <section className="section portfolio-studio-section max-w-7xl mx-auto" id="portfolio-studio" style={{ borderTop: '1px solid rgba(17,20,17,0.1)', paddingTop: '40px' }}>
        <PortfolioSplitStudio />
      </section>

      {/* ================= SECTION: ONE STOP SECTORAL OVERVIEW ================= */}
      <section className="section sectoral-overview-section max-w-7xl mx-auto" id="sectoral-overview" style={{ borderTop: '1px solid rgba(17,20,17,0.1)', paddingTop: '40px' }}>
        <div className="wrap">
          <div className="section-head" style={{ display: 'block', marginBottom: "28px" }}>
            <h2 className="text-3xl font-bold uppercase text-black" style={{ marginBottom: '8px' }}>One Stop Sectoral Overview</h2>
            <p className="text-gray-600 text-sm md:text-base" style={{ margin: '0', maxWidth: 'none' }}>Select a sector below, then click through to open its full performance report PDF.</p>
          </div>

          <div className="sector-picker">
            {[
              { name: "Auto", img: "/sector-auto.png", pdf: "nifty-auto-report.pdf" },
              { name: "Banking", img: "/sector-banking.png", pdf: "nifty-bank-report.pdf" },
              { name: "Capital Goods", img: "/sector-capital-goods.png", pdf: "nifty-capital-goods-report.pdf" },
              { name: "Chemicals", img: "/sector-chemicals.png", pdf: "nifty-chemicals-report.pdf" },
              { name: "FMCG", img: "/sector-fmcg.png", pdf: "nifty-fmcg-report.pdf" },
              { name: "Healthcare", img: "/sector-healthcare.png", pdf: "nifty-healthcare-report.pdf" },
              { name: "IT", img: "/sector-it.png", pdf: "nifty-it-report.pdf" },
              { name: "Metal", img: "/sector-metal.png", pdf: "nifty-metal-report.pdf" },
              { name: "NBFC", img: "/sector-nbfc.png", pdf: "nifty-nbfc-report.pdf" },
              { name: "Oil & Gas", img: "/sector-oil-gas.png", pdf: "nifty-oil-gas-report.pdf" },
              { name: "Financial Services", img: "/sector-financial-services.png", pdf: "nifty-financial-services-report.pdf" },
              { name: "Pharma", img: "/sector-pharma.png", pdf: "nifty-pharma-report.pdf" },
              { name: "Power", img: "/sector-power.png", pdf: "nifty-power-report.pdf" },
              { name: "Realty", img: "/sector-realty.png", pdf: "nifty-realty-report.pdf" },
              { name: "Retail", img: "/sector-retail.png", pdf: "nifty-retail-report.pdf" }
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
                <Image src={sector.img} alt={sector.name} width={28} height={28} />
                <span>{sector.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION: SECTOR UNIVERSE BUBBLE MAP ================= */}
      <section id="sectoral-heatmap" className="section sector-universe-section max-w-7xl mx-auto" style={{ borderTop: '1px solid rgba(17,20,17,0.1)', paddingTop: '40px' }}>
        <div className="wrap">
          <div className="section-head" style={{ display: 'block', marginBottom: "28px" }}>
            <h2 className="text-3xl font-bold uppercase text-black" style={{ marginBottom: '8px' }}>Single Heatmap for All Sectors</h2>
            <p className="text-gray-600 text-sm md:text-base" style={{ margin: '0', maxWidth: 'none' }}>Bubble size reflects the size of the YTD return, color shows direction. Click a sector bubble to open its full report.</p>
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

      {/* ================= SECTION: THEME BASED SECTORS ================= */}
      <section className="section theme-based-sectors-section max-w-7xl mx-auto" id="theme-based-sectors" style={{ borderTop: '1px solid rgba(17,20,17,0.1)', paddingTop: '40px' }}>
        <div className="wrap">
          <div className="section-head" style={{ display: 'block', marginBottom: "28px" }}>
            <h2 className="text-3xl font-bold uppercase text-black" style={{ marginBottom: '8px' }}>Theme Based Sectors at One Place</h2>
            <p className="text-gray-600 text-sm md:text-base" style={{ margin: '0', maxWidth: 'none' }}>Click on any index box below to open its official performance report PDF.</p>
          </div>

          <div className="theme-bars">
            {themeSectorBars.map((s) => {
              const isGain = s.ytd >= 0;
              const maxAbs = Math.max(...themeSectorBars.map(bar => Math.abs(bar.ytd)));
              const widthPct = Math.max(6, (Math.abs(s.ytd) / maxAbs) * 64).toFixed(1);
              const valueText = `${s.ytd > 0 ? '+' : ''}${s.ytd.toFixed(2)}%`;

              return (
                <div
                  key={s.name}
                  className="theme-bar-row"
                  onClick={() => {
                    if (s.pdf) window.open(`/${s.pdf}`, '_blank', 'noopener,noreferrer');
                  }}
                >
                  <Image className="theme-bar-icon" src={`/${s.icon}`} alt={s.name} width={32} height={32} />
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

          {/* ================= THEME BASED SECTORS FAQ ================= */}
          <div className="theme-faq-container" style={{ marginTop: "72px", paddingTop: "56px", borderTop: "1px solid rgba(17,20,17,0.12)" }}>
            <div className="theme-faq-kicker">
              <span className="theme-faq-kicker-line"></span>
              FAQS
            </div>
            <div className="theme-faq-heading">
              <h2>Frequently Asked <em>Questions</em></h2>
              <p>Everything you need to know about theme-based sectors and market heatmaps.</p>
            </div>

            <div className="theme-faq-accordion">
              {[
                {
                  q: "What theme-based sector indices are covered on the page?",
                  a: "The page covers theme-based indices including Nifty India Defence, Nifty IPO, Nifty Sugar & Ethanol, Nifty Commodities, Nifty EV & New Age Automotive, Nifty India New Age Consumption, Nifty100 ESG, Nifty500 Ahimsa, Nifty India Tourism, Nifty50 Shariah, and Nifty India Digital."
                },
                {
                  q: "How do I read and interpret the Sector Heatmap?",
                  a: "The heatmap visualizes sector momentum at a glance. The bubble size corresponds to the magnitude of the Year-to-Date (YTD) return, while the color indicates direction (green for positive gains, yellow/orange for moderate drops, and red for steep corrections)."
                },
                {
                  q: "How frequently are the sector returns and heatmaps updated?",
                  a: "All market indices and thematic performances are synced daily with official NSE end-of-day market closing data."
                },
                {
                  q: "Can I download full sector performance reports?",
                  a: "Yes! Simply click on any sector bubble in the heatmap or any theme-based sector bar to open and view the full performance report PDF."
                }
              ].map((faq, idx) => {
                const isOpen = activeThemeFaq === idx;
                return (
                  <div key={idx} className={`theme-faq-item ${isOpen ? "open" : ""}`}>
                    <button
                      className="theme-faq-trigger"
                      onClick={() => setActiveThemeFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                    >
                      <span className="theme-faq-q-number">{String(idx + 1).padStart(2, "0")}.</span>
                      <span className="theme-faq-question">{faq.q}</span>
                      <span className="theme-faq-icon-arrow">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                          <path d="M1 1L6 6L11 1" stroke="#101512" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                    <div className="theme-faq-answer-wrap">
                      <div className="theme-faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
