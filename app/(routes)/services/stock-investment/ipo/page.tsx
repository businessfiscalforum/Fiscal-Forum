"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Ticker tape data
const tickerData = [
  { t: "BHARATTHREADS", p: 412, d: "+18.2%", up: true },
  { t: "NSE", p: 24812, d: "+0.6%", up: true },
  { t: "SENSEX", p: 81230, d: "-0.3%", up: false },
  { t: "GREENWAVE ENERGY", p: 88, d: "-4.1%", up: false },
  { t: "QUANTLOGIX", p: 765, d: "+27.5%", up: true },
  { t: "NIFTY BANK", p: 53410, d: "+0.9%", up: true },
  { t: "URBANCRAFT IPO", p: 0, d: "OPENS TOMORROW", up: true },
  { t: "PORTSIDE LOGISTICS", p: 241, d: "+2.2%", up: true },
];

const stageMeta = [
  { caption: "Startup", img: "/01-startup.png" },
  { caption: "Growing Company", img: "/02-growing-company.png" },
  { caption: "Needs Capital", img: "/03-needs-capital.png" },
  { caption: "IPO Opens", img: "/04-ipo-opens.png" },
  { caption: "NSE/BSE Listing", img: "/05-nse-bse-listing.png" },
  { caption: "Investors Become Shareholders", img: "/06-investors-shareholders.png" },
];

const whyCaptions = [
  "A founder turns an idea into a registered company. No outside capital yet — just sweat equity.",
  "Revenue is real, the team is growing, but expansion needs more cash than profits provide.",
  "Loans only stretch so far. The company decides external equity capital is the next step.",
  "The IPO opens — bankers, regulators, and investors all converge on one price band.",
  "Shares list on NSE/BSE. A private balance sheet becomes a publicly quoted one, instantly.",
  "Anyone who bid and got allotted is now a part-owner — watching the same ticker you are.",
];

export default function IPOPage() {
  // ── States ──
  const [currentStage, setCurrentStage] = useState(0);
  const [autoplayActive, setAutoplayActive] = useState(true);
  const [openGlossaryIdx, setOpenGlossaryIdx] = useState<number | null>(null);

  // Simulator state
  const [rngLots, setRngLots] = useState(240); // 50 to 500
  const [rngDemand, setRngDemand] = useState(72); // 10 to 600
  const [rngMood, setRngMood] = useState(65); // 0 to 100

  // ── Autoplay for stage image explorer ──
  useEffect(() => {
    if (!autoplayActive) return;
    const interval = setInterval(() => {
      setCurrentStage((c) => (c + 1) % 6);
    }, 2600);
    return () => clearInterval(interval);
  }, [autoplayActive]);

  // Scroll Helpers
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Simulator computations
  const lots = rngLots * 1000;
  const demandMult = rngDemand / 10;
  const moodSentiment = rngMood < 33 ? "Bearish" : rngMood < 66 ? "Neutral" : "Bullish";
  const odds = Math.max(1, Math.min(100, Math.round(100 / demandMult)));
  const pop = Math.round((rngMood - 40) * 0.8 + (demandMult > 5 ? 6 : 0));

  const getVerdictText = () => {
    if (demandMult > 40) return "Massively oversubscribed — allotment is close to a long-shot lottery.";
    if (demandMult > 10) return "Heavily oversubscribed — most lots get scaled down sharply.";
    if (demandMult > 3) return "Moderately oversubscribed — a coin-flip-adjacent shot at allotment.";
    return "Under or lightly subscribed — most applicants likely get allotted in full.";
  };

  const getVerdictBg = () => {
    if (demandMult > 40) return "rgba(239,138,138,.16)";
    if (demandMult > 10) return "rgba(212,175,90,.18)";
    if (demandMult > 3) return "rgba(95,217,154,.12)";
    return "rgba(95,217,154,.16)";
  };

  return (
    <div className="ipoTerminal pt-24 md:pt-32">

      {/* HERO */}
      <section className="hero" id="s-hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">What is an IPO</div>
            <h1>
              Future <em>wealth</em> starts here.
            </h1>
            <p className="lede">
              An Initial Public Offering is the moment a private company sells its first shares to the public — trading
              founder control for founder capital, and a quiet balance sheet for a quoted one. Scroll to watch it happen.
            </p>
            <div className="hero-cta">
              <button className="btn primary" onClick={() => scrollTo("s-journey")}>
                Begin the journey →
              </button>
              <button className="btn" onClick={() => scrollTo("s-sim")}>
                Try the allotment simulator
              </button>
              <Link href="/services/stock-investment/ipo/apply" className="btn" style={{ display: "inline-block", textDecoration: "none", textAlign: "center" }}>
                Apply for IPO
              </Link>
              <Link href="/services/stock-investment/open-demat-account" className="btn" style={{ display: "inline-block", textDecoration: "none", textAlign: "center" }}>
                Open Demat Account
              </Link>
            </div>
          </div>
          <div className="hero-frame">
            <div className="stage-chrome">
              <i></i>
              <i></i>
              <i></i>
              <span className="url">nseindia.com/listing-ceremony</span>
            </div>
            <div className="hero-imgwrap">
              <Image
                src="/07-listing-ceremony.png"
                alt="NSE listing ceremony — company goes public"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="stage-caption">
              <span className="lbl">🔔 Listing day</span>
              <span className="step-pill">Day 1 on NSE</span>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNEY TIMELINE */}
      <section className="journey" id="s-journey">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">The journey · 01</div>
            <h2>Six steps from private to public.</h2>
            <p>
              Each company takes the same staircase — only the timing and the noise around it differ. Watch each step.
            </p>
          </div>
          <div className="stepper">
            <div className="stepper-rail" id="flowList">
              <div className="stepper-track"></div>
              {[
                { num: "01", title: "Private company", desc: "Owned by founders, family, and early backers. Value is whatever the last private round agreed on." },
                { num: "02", title: "Needs growth capital", desc: "New factories, new markets, or debt that needs clearing — beyond what founders and VCs can keep funding." },
                { num: "03", title: "Bankers step in", desc: "Merchant bankers value the company, write the DRHP, and build the book of institutional demand." },
                { num: "04", title: "IPO launches", desc: "The issue opens. Retail, HNI, and institutional investors bid within a price band over 3–5 days." },
                { num: "05", title: "Shares are allotted", desc: "Demand is tallied, the cut-off price is fixed, and shares are allotted — often on a lottery basis." },
                { num: "06", title: "Company gets listed", desc: "Shares begin trading on NSE/BSE. The company now answers to shareholders and a live stock price." },
              ].map((step, idx) => (
                <div key={idx} className="step in">
                  <div className="step-num">{step.num}</div>
                  <h3>
                    {step.title}
                  </h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY EXPLORER */}
      <section className="why" id="s-why">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Why companies launch IPOs · 02</div>
            <h2>Watch the skyline explain it.</h2>
          </div>
          <div className="why-grid">
            <div className="stage-frame">
              <div className="stage-imgwrap stage-imgwrap-top">
                {stageMeta.map((item, idx) => (
                  <Image
                    key={idx}
                    src={item.img}
                    alt={item.caption}
                    fill
                    className={currentStage === idx ? "active object-cover" : "object-cover"}
                  />
                ))}
              </div>
              <div className="stage-caption">
                <span className="lbl" id="stageCaption">
                  {stageMeta[currentStage].caption}
                </span>
                <span className="step-pill" id="stagePill">
                  Step {currentStage + 1} of 6
                </span>
              </div>
            </div>
            <div>
              <div className="why-steps" id="whySteps" onClick={() => setAutoplayActive(false)}>
                {stageMeta.map((item, idx) => (
                  <div
                    key={idx}
                    className={`why-step ${currentStage === idx ? "active" : ""}`}
                    onClick={() => setCurrentStage(idx)}
                  >
                    <span className="n">0{idx + 1}</span>
                    <span className="t">{item.caption}</span>
                  </div>
                ))}
              </div>
              <div className="why-caption" id="whyCaption">
                <b>Step {currentStage + 1}/6 —</b> {whyCaptions[currentStage]}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLAYERS */}
      <section className="players" id="s-players">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Who&apos;s in the room · 03</div>
            <h2>Every IPO has the same cast.</h2>
          </div>
          <div className="cardgrid">
            <div className="pcard">
              <div className="ic">🏦</div>
              <h4>Merchant Banker (BRLM)</h4>
              <p>Lead manager who prices the issue, drafts the DRHP, and runs the roadshow with institutional investors.</p>
            </div>
            <div className="pcard">
              <div className="ic">🏛️</div>
              <h4>SEBI</h4>
              <p>The regulator that vets disclosures, approves the prospectus, and protects retail investors from misleading claims.</p>
            </div>
            <div className="pcard">
              <div className="ic">🧮</div>
              <h4>Registrar</h4>
              <p>Processes applications, runs the allotment lottery when oversubscribed, and handles refunds.</p>
            </div>
            <div className="pcard">
              <div className="ic">🏢</div>
              <h4>Anchor Investors</h4>
              <p>Large institutions allotted shares a day before the issue opens, signalling confidence to the broader market.</p>
            </div>
            <div className="pcard">
              <div className="ic">📰</div>
              <h4>Underwriters</h4>
              <p>Commit to buying unsold shares, guaranteeing the company gets its target capital regardless of demand.</p>
            </div>
            <div className="pcard">
              <div className="ic">🧑‍💻</div>
              <h4>Retail Investors</h4>
              <p>You — bidding within the price band through UPI/ASBA, hoping the lottery and the listing both go your way.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SIMULATOR */}
      <section className="sim" id="s-sim">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Try it yourself · 04</div>
            <h2>The allotment lottery, simulated.</h2>
            <p>
              Oversubscription decides who actually gets shares. Move the sliders and see your odds change in real time
              — exactly how the registrar&apos;s draw behaves.
            </p>
          </div>
          <div className="sim-grid">
            <div className="sim-panel">
              <div className="sim-row">
                <label>
                  <span>Issue size</span>
                  <span className="val" id="lotsOut">
                    {lots.toLocaleString("en-IN")} lots
                  </span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="500"
                  value={rngLots}
                  step="10"
                  onChange={(e) => setRngLots(+e.target.value)}
                />
              </div>
              <div className="sim-row">
                <label>
                  <span>Total applications received</span>
                  <span className="val" id="demandOut">
                    ×{demandMult.toFixed(1)} oversubscribed
                  </span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="600"
                  value={rngDemand}
                  step="2"
                  onChange={(e) => setRngDemand(+e.target.value)}
                />
              </div>
              <div className="sim-row">
                <label>
                  <span>Listing-day sentiment</span>
                  <span className="val" id="moodOut">
                    {moodSentiment}
                  </span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rngMood}
                  step="1"
                  onChange={(e) => setRngMood(+e.target.value)}
                />
              </div>
              <p className="sim-note">
                This is an illustrative model for learning, not financial advice or a guarantee of real allotment odds.
              </p>
            </div>
            <div className="sim-result">
              <div className="top">
                <div>
                  <div className="ticker-name">YOUR APPLICATION</div>
                  <div className="ticker-val">1 lot · Retail category</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="ticker-name">EST. LISTING POP</div>
                  <div
                    id="popVal"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "20px",
                      color: pop >= 0 ? "#5fd99a" : "#ef8a8a",
                      marginTop: "6px",
                      fontWeight: "600",
                    }}
                  >
                    {pop >= 0 ? "+" : ""}
                    {pop}%
                  </div>
                </div>
              </div>
              <div className="alloc" id="oddsVal">
                {odds}% <small className="inline text-[#8b97aa]">chance of allotment</small>
              </div>
              <div className="sim-listbar" id="simBars">
                {Array.from({ length: 24 }).map((_, i) => {
                  const base = 20 + Math.sin(i * 0.7) * 15 + Math.sin(i * 0.3) * 5;
                  const scaled = Math.max(8, base * (rngMood / 60));
                  return (
                    <i
                      key={i}
                      style={{
                        height: `${scaled}%`,
                        background: rngMood > 55 ? "#5fd99a" : rngMood > 30 ? "#d4af5a" : "#ef8a8a",
                      }}
                    ></i>
                  );
                })}
              </div>
              <div
                className="sim-verdict"
                id="simVerdict"
                style={{ background: getVerdictBg(), color: "#fff" }}
              >
                {getVerdictText()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RISKS */}
      <section className="risk" id="s-risk">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Read before you bid · 05</div>
            <h2>What an IPO doesn&apos;t promise you.</h2>
          </div>
          <div className="risk-grid">
            <div className="rcard">
              <div className="dot" style={{ background: "var(--fall)" }}></div>
              <div>
                <h4>Listing gains aren&apos;t guaranteed</h4>
                <p>Grey market premium is sentiment, not a contract. Plenty of &quot;hot&quot; IPOs have listed below issue price.</p>
              </div>
            </div>
            <div className="rcard">
              <div className="dot" style={{ background: "var(--gold)" }}></div>
              <div>
                <h4>Allotment is a lottery, not a queue</h4>
                <p>Applying early doesn&apos;t help. In an oversubscribed issue, the registrar draws lots — full stop.</p>
              </div>
            </div>
            <div className="rcard">
              <div className="dot" style={{ background: "#6e5bb5" }}></div>
              <div>
                <h4>Read the DRHP, not just the hype</h4>
                <p>The draft prospectus discloses use of funds, litigation, and risk factors — the parts roadshows skip.</p>
              </div>
            </div>
            <div className="rcard">
              <div className="dot" style={{ background: "#2a8fa6" }}></div>
              <div>
                <h4>Lock-ins create later supply</h4>
                <p>Anchor and promoter shares unlock on schedule — often pressuring price months after listing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GLOSSARY */}
      <section className="glossary" id="s-glossary">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Speak the language · 06</div>
            <h2>IPO terms, decoded.</h2>
          </div>
          <div className="gl-grid" id="glList">
            {[
              {
                q: "DRHP — Draft Red Herring Prospectus",
                a: "The document filed with SEBI containing the company's financials, risks, and business model before the issue opens. 'Red herring' because the price isn't final yet.",
              },
              {
                q: "Price band",
                a: "The range within which investors bid — e.g. ₹340–₹360. The final cut-off price is set after the book-building process closes.",
              },
              {
                q: "Lot size",
                a: "The minimum number of shares you must apply for as one unit — set by the company so a minimum bid stays within a target rupee range.",
              },
              {
                q: "Grey market premium (GMP)",
                a: "An unofficial, unregulated price at which IPO shares trade before listing — a sentiment gauge, not a guarantee of listing-day gains.",
              },
              {
                q: "ASBA",
                a: "Application Supported by Blocked Amount — your bid amount is blocked, not debited, in your bank account until allotment is finalised.",
              },
            ].map((item, idx) => {
              const isOpen = openGlossaryIdx === idx;
              return (
                <div key={idx} className={`gl-item ${isOpen ? "open" : ""}`}>
                  <div
                    className="gl-q"
                    onClick={() => setOpenGlossaryIdx(isOpen ? null : idx)}
                  >
                    <span>{item.q}</span>
                    <span className="plus">+</span>
                  </div>
                  <div
                    className="gl-a"
                    style={{
                      maxHeight: isOpen ? "150px" : "0px",
                      transition: "max-height 0.35s ease",
                    }}
                  >
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* APPLY CTA */}
      <section className="apply-cta" style={{ textAlign: "center", borderTop: "var(--bw) solid var(--ink)", padding: "80px 6vw" }}>
        <div className="wrap">
          <h2 style={{ fontSize: "clamp(26px, 4.4vw, 44px)", marginBottom: "14px" }}>Ready to invest?</h2>
          <p style={{ color: "var(--ink-soft)", marginTop: "14px", marginBottom: "28px", maxWidth: "480px", marginLeft: "auto", marginRight: "auto", fontSize: "15px", lineHeight: "1.6" }}>
            Submit your IPO application form online and start your investment journey today.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/services/stock-investment/ipo/apply" className="btn primary" style={{ display: "inline-block", textDecoration: "none" }}>
              Apply for IPO now
            </Link>
            <Link href="/services/stock-investment/open-demat-account" className="btn" style={{ display: "inline-block", textDecoration: "none" }}>
              Open Demat Account
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}