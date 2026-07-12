"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Space_Grotesk, Archivo_Black, JetBrains_Mono } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-archivo-black",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const stages = [
  { t: "Cash", cls: "", d: "You bring the initial margin — a fraction of the trade value, decided by your broker within SEBI norms." },
  { t: "Margin", cls: "", d: "This margin absorbs early losses. Depending on the stock, it typically runs 20%–50% of the trade value." },
  { t: "Broker Funds", cls: "pos", d: "The broker funds the rest from their own capital, charging daily interest only on this borrowed portion." },
  { t: "Stock Purchased", cls: "pos", d: "You now hold the full quantity of shares in your demat — not just the portion you paid for." },
  { t: "Hold Position", cls: "", d: "MTF positions can usually be carried for extended periods, unlike pure intraday leverage — limits vary by broker." },
  { t: "Pay Interest", cls: "risk", d: "Interest accrues daily on the borrowed amount alone, whether the stock is moving in your favour or not." },
  { t: "Sell", cls: "", d: "When you exit, the sale proceeds first repay the broker's funded amount plus any accrued interest." },
  { t: "Profit / Loss", cls: "risk", d: "Whatever remains is yours. Gains are amplified — but so are losses, since the loan is repaid first either way." }
];

export default function MTFPage() {
  const router = useRouter();

  // Scroll Progress Rail
  const [scrollPercent, setScrollPercent] = useState(0);

  // Desktop Cursor Glow
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showGlow, setShowGlow] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);

  // Hero BG Parallax
  const [heroParallax, setHeroParallax] = useState({ x: 0, y: 0 });

  // Hero Scroll-linked Buying Power Counter
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroCounter, setHeroCounter] = useState(25000);

  // Side Scrollspy Nav & Back to Top states
  const [showSideNav, setShowSideNav] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isDarkSection, setIsDarkSection] = useState(true);

  // Comic Explainer scrollspy & active panel
  const [activePanel, setActivePanel] = useState<string | null>(null);

  // Simulator Calculator State
  const [amount, setAmount] = useState(75000);
  const [days, setDays] = useState(30);
  const [rate, setRate] = useState(14);

  // Stepper Timeline Auto-Advance State
  const [vtIndex, setVtIndex] = useState(-1);
  const [vtFinished, setVtFinished] = useState(false);
  const [vtRunning, setVtRunning] = useState(false);
  const vtTrackRef = useRef<HTMLDivElement>(null);

  // Global Page Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const scrolled = window.scrollY;
      const height = h.scrollHeight - h.clientHeight;
      const pct = height > 0 ? (scrolled / height) * 100 : 0;
      setScrollPercent(pct);

      // Hero scroll linked counter
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        let progress = 1 - rect.bottom / (rect.height + vh);
        progress = Math.min(Math.max(progress, 0), 1);
        const amtVal = 25000 + (100000 - 25000) * progress;
        setHeroCounter(amtVal);
      }

      // Side nav and back to top visibility
      const vh = window.innerHeight;
      setShowSideNav(scrolled > vh * 0.5);
      setShowBackToTop(scrolled > vh * 1.2);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set up reveal animation intersection observer
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add("in"), i * 70);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Section visibility Scrollspy
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const targets = ["hero", "comic", "simulator", "mechanics"];
    const darkSections = new Set(["hero", "simulator"]);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActiveSection(e.target.id);
            setIsDarkSection(darkSections.has(e.target.id));
          }
        });
      },
      { threshold: 0.4 }
    );

    targets.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Comic Explainer panels scrollspy
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const panels = ["p0", "p1", "p2", "p3"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActivePanel(e.target.id);
          }
        });
      },
      { threshold: 0.55 }
    );

    panels.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Stepper auto-advance interval
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const vtAdvance = () => {
      setVtIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= stages.length) {
          setVtFinished(true);
          setVtRunning(false);
          return stages.length - 1;
        }
        return nextIndex;
      });
    };

    if (vtRunning && !vtFinished) {
      intervalId = setInterval(vtAdvance, 2400);
    }

    return () => clearInterval(intervalId);
  }, [vtRunning, vtFinished]);

  // Stepper intersection trigger
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setVtIndex(stages.length - 1);
      setVtFinished(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVtRunning(true);
            setVtIndex((prev) => (prev === -1 ? 0 : prev));
          } else {
            setVtRunning(false);
          }
        });
      },
      { threshold: 0.25 }
    );

    if (vtTrackRef.current) {
      observer.observe(vtTrackRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Desktop Pointer Glow
  useEffect(() => {
    const media = window.matchMedia("(hover:hover) and (pointer:fine)");
    setHasFinePointer(media.matches);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setShowGlow(true);
    };
    const handleMouseLeave = () => {
      setShowGlow(false);
    };

    if (media.matches) {
      window.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Mouse Parallax for Hero Background Charts
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width - 0.5;
    const my = (e.clientY - rect.top) / rect.height - 0.5;
    setHeroParallax({ x: mx * 14, y: my * 10 });
  };

  const handleHeroMouseLeave = () => {
    setHeroParallax({ x: 0, y: 0 });
  };

  // Comic Explainer Panel Tilt
  const handlePanelMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const panel = e.currentTarget;
    const r = panel.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    panel.style.transform = `perspective(700px) rotateX(${py * -2.5}deg) rotateY(${px * 2.5}deg) translateY(-2px)`;
  };

  const handlePanelMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "";
  };

  // Button Magnetic Hover Effect
  const handleBtnMouseMove = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const r = btn.getBoundingClientRect();
    const mx = (e.clientX - r.left) / r.width - 0.5;
    const my = (e.clientY - r.top) / r.height - 0.5;
    btn.style.transform = `translate(${mx * 10}px, ${my * 8 - 2}px)`;
  };

  const handleBtnMouseLeave = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.currentTarget.style.transform = "";
  };

  // Live Interest Calculator math
  const fmtINR = (n: number) => {
    return "₹" + Math.round(n).toLocaleString("en-IN");
  };

  const interest = amount * (rate / 100) * (days / 365);
  const ownMargin = amount / 3;
  const totalPosition = ownMargin + amount;
  const cmpWithoutWidth = (ownMargin / totalPosition) * 100;

  // Scroll to targeted ID smoothly
  const scrollToTarget = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={`${spaceGrotesk.variable} ${archivoBlack.variable} ${jetbrainsMono.variable} mtf-page-container min-h-screen pt-20`}>
      
      {/* Scope page styles only inside this container to avoid leaking into other pages */}
      <style dangerouslySetInnerHTML={{ __html: `
        .mtf-page-container {
          --cream: #F1ECDE;
          --cream-dim: #E5DEC9;
          --ink: #12140E;
          --forest: #183B29;
          --forest-deep: #0C2318;
          --forest-mid: #1F4732;
          --mint: #8FEFA0;
          --mint-dim: #5FC97A;
          --mint-pale: #DDF7E1;
          --rust: #C4491D;
          --line: #12140E;
          --radius: 16px;
          --radius-lg: 22px;
          --shadow-off: 8px 8px 0 var(--ink);
          --shadow-off-sm: 4px 4px 0 var(--ink);
          --shadow-off-cream: 6px 6px 0 var(--cream);
          --border: 3px solid var(--ink);
          --border-thick: 4px solid var(--ink);

          background: var(--cream);
          color: var(--ink);
          font-family: var(--font-space-grotesk), sans-serif;
          overflow-x: hidden;
          position: relative;
          zoom: 0.8;
        }

        .mtf-page-container ::selection {
          background: var(--mint);
          color: var(--ink);
        }

        .mtf-page-container .mono {
          font-family: var(--font-jetbrains-mono), monospace;
        }

        .mtf-page-container .eyebrow {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: .75rem;
          letter-spacing: .18em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: .5em;
        }

        .mtf-page-container .eyebrow::before {
          content: '';
          width: 8px;
          height: 8px;
          background: currentColor;
          border-radius: 50%;
          display: inline-block;
        }

        .mtf-page-container h1,
        .mtf-page-container h2,
        .mtf-page-container h3 {
          font-family: var(--font-archivo-black), var(--font-space-grotesk), sans-serif;
          text-transform: uppercase;
          line-height: 1.05;
          letter-spacing: -.01em;
        }

        .mtf-page-container a {
          color: inherit;
          text-decoration: none;
        }

        .mtf-page-container button {
          font-family: inherit;
          cursor: pointer;
          border: none;
          background: none;
        }

        .mtf-page-container .badge {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: .72rem;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          padding: .4rem 1rem;
          background: var(--mint-pale);
          color: var(--forest);
          border: 2.5px solid var(--ink);
          border-radius: 100px;
        }

        .mtf-page-container .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1);
        }

        .mtf-page-container .reveal.in {
          opacity: 1;
          transform: translateY(0);
        }

        .mtf-page-container .page-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 4px;
          background: var(--mint);
          z-index: 200;
          transition: width .08s linear;
        }

        /* Hero Section */
        .mtf-page-container .hero {
          position: relative;
          min-height: 100vh;
          background: radial-gradient(120% 140% at 15% -10%, var(--forest-mid) 0%, var(--forest) 42%, var(--forest-deep) 100%);
          color: var(--cream);
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 0 2rem;
        }

        .mtf-page-container .hero-bg-charts {
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: .35;
          pointer-events: none;
          will-change: transform;
          transition: transform 0.1s ease-out;
        }

        .mtf-page-container .hero-inner {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: .85fr 1.15fr;
          gap: 3.5rem;
          align-items: center;
          padding-top: 5rem;
          padding-bottom: 5rem;
        }

        .mtf-page-container .hero h1 {
          font-size: clamp(2.6rem, 6vw, 5.2rem);
          font-weight: 700;
        }

        .mtf-page-container .hero h1 .dim {
          color: var(--cream-dim);
          opacity: .55;
          font-weight: 500;
        }

        .mtf-page-container .hero-ctas {
          margin-top: 2.6rem;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .mtf-page-container .btn {
          font-family: var(--font-jetbrains-mono), monospace;
          font-weight: 700;
          font-size: .85rem;
          letter-spacing: .06em;
          text-transform: uppercase;
          padding: .95rem 1.7rem;
          border: 3px solid var(--ink);
          border-radius: 100px;
          background: var(--cream);
          color: var(--ink);
          box-shadow: 5px 5px 0 var(--ink);
          transition: transform .15s ease, box-shadow .15s ease, background .15s ease;
          display: inline-flex;
          align-items: center;
          gap: .6rem;
          text-decoration: none;
        }

        .mtf-page-container .btn.primary {
          background: var(--mint);
          border-color: var(--ink);
          color: var(--ink);
          font-weight: 700;
        }

        .mtf-page-container .btn:hover {
          transform: translate(2px, 2px);
          box-shadow: 3px 3px 0 var(--ink);
        }

        .mtf-page-container .btn:active {
          transform: translate(5px, 5px);
          box-shadow: 0 0 0 var(--ink);
        }

        .mtf-page-container .btn.primary:hover {
          background: var(--mint-dim);
        }

        .mtf-page-container .hero-counter {
          margin-top: 2.2rem;
          display: inline-flex;
          align-items: baseline;
          gap: 1.1rem;
          font-family: var(--font-jetbrains-mono), monospace;
          padding: 1.2rem 1.8rem;
          background: var(--cream);
          color: var(--ink);
          border: 3px solid var(--ink);
          border-radius: 18px;
          box-shadow: 6px 6px 0 var(--ink);
        }

        .mtf-page-container .hero-counter .lbl {
          font-size: .9rem;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--ink);
          opacity: .6;
        }

        .mtf-page-container .hero-counter .num {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--forest);
          min-width: 9ch;
          display: inline-block;
        }

        .mtf-page-container .mtf-diagram {
          background: var(--cream);
          border: 3px solid var(--ink);
          border-radius: var(--radius-lg);
          padding: 2.8rem 3rem 2.6rem;
          box-shadow: 10px 10px 0 var(--mint);
          max-width: 640px;
        }

        .mtf-page-container .mtf-diagram-head {
          margin-bottom: 2.2rem;
        }

        .mtf-page-container .mtf-diagram-head .badge {
          margin-bottom: 1.2rem;
          font-size: .85rem;
          padding: .5rem 1.2rem;
        }

        .mtf-page-container .mtf-diagram-head h3 {
          font-size: 2rem;
          color: var(--ink);
          text-transform: none;
          font-family: var(--font-space-grotesk), sans-serif;
          font-weight: 700;
          letter-spacing: 0;
        }

        .mtf-page-container .mtf-step {
          display: flex;
          align-items: center;
          gap: 1.4rem;
        }

        .mtf-page-container .mtf-icon {
          width: 72px;
          height: 72px;
          flex-shrink: 0;
          border-radius: 50%;
          border: 3px solid var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--cream);
          box-shadow: 4px 4px 0 var(--ink);
        }

        .mtf-page-container .mtf-icon svg {
          width: 34px;
          height: 34px;
        }

        .mtf-page-container .mtf-icon.broker {
          background: var(--forest);
        }

        .mtf-page-container .mtf-icon.power {
          background: var(--mint);
        }

        .mtf-page-container .mtf-step-label {
          font-family: var(--font-jetbrains-mono), monospace;
          font-weight: 700;
          font-size: 1.5rem;
          letter-spacing: .04em;
          text-transform: uppercase;
          color: var(--ink);
        }

        .mtf-page-container .mtf-step-sub {
          font-size: 1.32rem;
          font-weight: 600;
          color: var(--ink);
          opacity: .75;
          margin-top: .3rem;
        }

        .mtf-page-container .mtf-step.highlight .mtf-step-sub {
          color: var(--forest);
          opacity: 1;
          font-weight: 700;
        }

        .mtf-page-container .mtf-connector {
          display: flex;
          align-items: center;
          gap: .9rem;
          padding: .75rem 0 .75rem 35px;
          margin-left: 1px;
          border-left: 3px dashed var(--ink);
        }

        .mtf-page-container .mtf-connector span {
          font-family: var(--font-jetbrains-mono), monospace;
          font-weight: 700;
          font-size: 1.02rem;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: var(--ink);
          opacity: .65;
        }

        .mtf-page-container .mtf-notes {
          margin-top: 2.2rem;
          padding-top: 2rem;
          border-top: 2px dashed rgba(18,20,14,.25);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mtf-page-container .mtf-note {
          display: flex;
          align-items: center;
          gap: .8rem;
          font-family: var(--font-jetbrains-mono), monospace;
          font-weight: 600;
          font-size: 1.18rem;
          letter-spacing: .02em;
          color: var(--ink);
        }

        .mtf-page-container .mtf-note .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
          background: var(--forest);
        }

        .mtf-page-container .mtf-note.risk .dot {
          background: var(--rust);
        }

        .mtf-page-container .mtf-note b {
          font-weight: 800;
        }

        .mtf-page-container .scroll-cue {
          position: absolute;
          bottom: 2.2rem;
          left: 2rem;
          z-index: 2;
          color: var(--cream-dim);
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: .72rem;
          letter-spacing: .15em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: .6rem;
        }

        .mtf-page-container .scroll-cue .bar {
          width: 1px;
          height: 26px;
          background: var(--cream-dim);
          position: relative;
          overflow: hidden;
        }

        .mtf-page-container .scroll-cue .bar::after {
          content: '';
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--mint);
          animation: scrolldown 1.8s ease-in-out infinite;
        }

        @keyframes scrolldown {
          0% { top: -100%; }
          50% { top: 0; }
          100% { top: 100%; }
        }

        /* Sections */
        .mtf-page-container section {
          position: relative;
          padding: 7rem 2rem;
          scroll-margin-top: 90px;
        }

        .mtf-page-container .section-inner {
          max-width: 1180px;
          margin: 0 auto;
        }

        .mtf-page-container .section-head {
          margin-bottom: 3.2rem;
          max-width: 56ch;
        }

        .mtf-page-container .section-tag {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: .72rem;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          margin-bottom: 1.2rem;
          display: inline-flex;
          align-items: center;
          background: var(--mint-pale);
          color: var(--forest);
          border: 2.5px solid var(--ink);
          border-radius: 100px;
          padding: .4rem 1rem;
        }

        .mtf-page-container .section-head h2 {
          font-size: clamp(1.8rem, 3.6vw, 2.9rem);
        }

        /* Comic Section */
        .mtf-page-container .comic-section {
          background: var(--cream);
        }

        .mtf-page-container .comic-layout {
          display: grid;
          grid-template-columns: 36px 1fr;
          gap: 2rem;
        }

        .mtf-page-container .comic-dots {
          position: sticky;
          top: 44%;
          height: fit-content;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          align-items: center;
        }

        .mtf-page-container .comic-dots button {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          border: 2px solid var(--ink);
          background: transparent;
          transition: background .25s ease, transform .25s ease;
        }

        .mtf-page-container .comic-dots button.active {
          background: var(--forest);
          transform: scale(1.35);
        }

        .mtf-page-container .comic-strip {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }

        .mtf-page-container .panel {
          border: 3px solid var(--ink);
          border-radius: 18px;
          background: var(--cream);
          box-shadow: var(--shadow-off);
          padding: 1.6rem 1.8rem;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 1.4rem;
          background-image: radial-gradient(circle, rgba(18,20,14,.06) 1px, transparent 1px);
          background-size: 14px 14px;
          transition: transform .18s ease, box-shadow .18s ease;
          will-change: transform;
        }

        .mtf-page-container .panel:hover {
          box-shadow: 10px 10px 0 var(--ink);
        }

        .mtf-page-container .panel .icon {
          width: 56px;
          height: 56px;
          flex-shrink: 0;
          border: 3px solid var(--ink);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--mint-pale);
          box-shadow: 3px 3px 0 var(--ink);
        }

        .mtf-page-container .panel .icon svg {
          width: 30px;
          height: 30px;
        }

        .mtf-page-container .panel-text .who {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: .72rem;
          letter-spacing: .1em;
          text-transform: uppercase;
          opacity: .55;
          margin-bottom: .3rem;
        }

        .mtf-page-container .panel-text .line {
          font-size: 1.15rem;
          font-weight: 600;
          line-height: 1.35;
        }

        .mtf-page-container .panel-text .line b {
          color: var(--forest);
        }

        .mtf-page-container .panel .amount {
          font-family: var(--font-jetbrains-mono), monospace;
          font-weight: 700;
          font-size: 1.3rem;
          color: var(--forest);
          white-space: nowrap;
        }

        .mtf-page-container .panel.broker {
          background: var(--forest);
          color: var(--cream);
        }

        .mtf-page-container .panel.broker .icon {
          background: var(--forest-deep);
          border-color: var(--cream);
        }

        .mtf-page-container .panel.broker .panel-text .line b {
          color: var(--mint);
        }

        .mtf-page-container .panel.broker .amount {
          color: var(--mint);
        }

        .mtf-page-container .panel.broker .panel-text .who {
          opacity: .7;
        }

        .mtf-page-container .strip-arrow {
          align-self: center;
          margin-left: calc(28px);
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 1.2rem;
          opacity: .4;
        }

        /* Risk / Simulator Section */
        .mtf-page-container .risk-section {
          background: var(--forest-deep);
          color: var(--cream);
        }

        .mtf-page-container .risk-section .section-tag {
          background: var(--forest);
          color: var(--mint);
          border-color: var(--cream);
        }

        .mtf-page-container .risk-grid {
          display: grid;
          grid-template-columns: .9fr 1.1fr;
          gap: 2.6rem;
          align-items: center;
        }

        .mtf-page-container .checklist {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mtf-page-container .checklist li {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 1.22rem;
          line-height: 1.6;
          color: var(--cream);
          padding-bottom: 1.2rem;
          border-bottom: 1px solid rgba(241,236,222,.15);
        }

        .mtf-page-container .checklist li::before {
          content: '→';
          color: var(--mint);
          flex-shrink: 0;
        }

        .mtf-page-container .compare-card {
          border: 3px solid var(--cream);
          border-radius: 20px;
          padding: 1.8rem 2rem 2.2rem;
          margin-bottom: 1.6rem;
          box-shadow: 6px 6px 0 rgba(241,236,222,.18);
        }

        .mtf-page-container .compare-card h4 {
          font-size: 1.15rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .06em;
          font-family: var(--font-jetbrains-mono), monospace;
          color: var(--cream);
          margin-bottom: 1.3rem;
        }

        .mtf-page-container .compare-row {
          margin-bottom: 1.1rem;
        }

        .mtf-page-container .compare-row .crow-label {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-jetbrains-mono), monospace;
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: .5rem;
          color: var(--cream);
        }

        .mtf-page-container .compare-row .crow-label b {
          color: var(--cream);
          font-size: 1.15rem;
          font-weight: 800;
        }

        .mtf-page-container .cbar-track {
          height: 14px;
          border-radius: 8px;
          background: rgba(241,236,222,.12);
          overflow: hidden;
        }

        .mtf-page-container .cbar-fill {
          height: 100%;
          border-radius: 8px;
          transition: width .35s cubic-bezier(.2,.7,.2,1);
        }

        .mtf-page-container .cbar-fill.without {
          background: var(--cream-dim);
        }

        .mtf-page-container .cbar-fill.with {
          background: var(--mint);
        }

        .mtf-page-container .compare-note {
          font-family: var(--font-jetbrains-mono), monospace;
          font-weight: 600;
          font-size: .9rem;
          color: var(--cream-dim);
          opacity: .85;
          margin-top: .6rem;
        }

        .mtf-page-container .calc-card {
          border: 3px solid var(--mint);
          border-radius: 20px;
          padding: 2rem;
          background: rgba(143,239,160,.05);
          box-shadow: 6px 6px 0 rgba(143,239,160,.18);
        }

        .mtf-page-container .calc-card h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 1.6rem;
          color: var(--cream);
        }

        .mtf-page-container .calc-row {
          margin-bottom: 1.6rem;
        }

        .mtf-page-container .calc-row label {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-jetbrains-mono), monospace;
          font-weight: 700;
          font-size: .95rem;
          letter-spacing: .04em;
          text-transform: uppercase;
          color: var(--cream);
          margin-bottom: .6rem;
        }

        .mtf-page-container .calc-row label b {
          color: var(--mint);
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: 0;
          text-transform: none;
        }

        .mtf-page-container input[type=range] {
          -webkit-appearance: none;
          width: 100%;
          height: 3px;
          background: rgba(241,236,222,.25);
          border-radius: 3px;
        }

        .mtf-page-container input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--mint);
          border: 3px solid var(--ink);
          cursor: pointer;
          box-shadow: 2px 2px 0 var(--ink);
        }

        .mtf-page-container .calc-result {
          margin-top: 1.8rem;
          padding-top: 1.6rem;
          border-top: 1px dashed rgba(241,236,222,.3);
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: .6rem;
        }

        .mtf-page-container .calc-result .label {
          font-family: var(--font-jetbrains-mono), monospace;
          font-weight: 700;
          font-size: .95rem;
          text-transform: uppercase;
          letter-spacing: .06em;
          color: var(--cream);
        }

        .mtf-page-container .calc-result .value {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 2.1rem;
          font-weight: 800;
          color: var(--rust);
        }

        .mtf-page-container .disclaimer {
          margin-top: 1.2rem;
          font-size: .85rem;
          font-weight: 500;
          color: var(--cream-dim);
          opacity: .8;
          font-family: var(--font-jetbrains-mono), monospace;
          line-height: 1.55;
        }

        /* Timeline Section */
        .mtf-page-container .timeline-section {
          background: var(--cream);
          padding: 7rem 0;
        }

        .mtf-page-container .ht-intro {
          padding: 0 2rem 3.5rem;
        }

        .mtf-page-container .vt-wrap {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .mtf-page-container .vt-step {
          display: flex;
          gap: 1.6rem;
        }

        .mtf-page-container .vt-line-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
        }

        .mtf-page-container .vt-dot {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 3px solid var(--ink);
          background: var(--cream);
          color: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-jetbrains-mono), monospace;
          font-weight: 700;
          font-size: 1rem;
          transition: background .4s ease, color .4s ease, transform .4s ease, box-shadow .4s ease;
          box-shadow: 3px 3px 0 var(--ink);
        }

        .mtf-page-container .vt-line {
          width: 3px;
          flex: 1;
          min-height: 2.4rem;
          background: var(--ink);
          opacity: .15;
          margin: .4rem 0;
          transition: opacity .5s ease, background .5s ease;
        }

        .mtf-page-container .vt-step:last-child .vt-line {
          display: none;
        }

        .mtf-page-container .vt-content {
          padding-bottom: 2.6rem;
          flex: 1;
        }

        .mtf-page-container .vt-content h4 {
          font-family: var(--font-archivo-black), var(--font-space-grotesk), sans-serif;
          font-size: 1.3rem;
          opacity: .32;
          transform: translateY(6px);
          transition: opacity .45s ease, transform .45s ease, color .45s ease;
          margin-bottom: .2rem;
        }

        .mtf-page-container .vt-content p {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 1.28rem;
          line-height: 1.65;
          color: var(--ink);
          transition: max-height .55s ease, opacity .4s ease .05s, margin-top .4s ease;
        }

        .mtf-page-container .vt-step.active .vt-dot {
          background: var(--mint);
          transform: scale(1.08);
          box-shadow: 4px 4px 0 var(--ink);
        }

        .mtf-page-container .vt-step.active .vt-content h4 {
          opacity: 1;
          transform: translateY(0);
          color: var(--ink);
        }

        .mtf-page-container .vt-step.active .vt-content p {
          max-height: 220px;
          opacity: .8;
          margin-top: .6rem;
        }

        .mtf-page-container .vt-step.done .vt-dot {
          background: var(--forest);
          border-color: var(--forest);
          color: var(--cream);
        }

        .mtf-page-container .vt-step.done .vt-line {
          opacity: 1;
          background: var(--forest);
        }

        .mtf-page-container .vt-step.done .vt-content h4 {
          opacity: .6;
        }

        .mtf-page-container .vt-step.done .vt-content p {
          max-height: 220px;
          opacity: .55;
          margin-top: .6rem;
        }

        .mtf-page-container .vt-step.risk.active .vt-dot {
          background: var(--rust);
          border-color: var(--rust);
          color: #fff;
        }

        /* Cursor Glow */
        .mtf-page-container .cursor-glow {
          position: fixed;
          top: 0;
          left: 0;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 5;
          background: radial-gradient(circle, rgba(143,239,160,.14) 0%, transparent 70%);
          transform: translate(-50%,-50%);
          opacity: 0;
          transition: opacity .3s ease;
          will-change: transform;
        }

        .mtf-page-container .cursor-glow.on {
          opacity: 1;
        }

        /* Side Scrollspy Nav */
        .mtf-page-container .side-nav {
          position: fixed;
          right: 1.6rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 150;
          display: flex;
          flex-direction: column;
          gap: 1.3rem;
          opacity: 0;
          pointer-events: none;
          transition: opacity .4s ease;
        }

        .mtf-page-container .side-nav.show {
          opacity: 1;
          pointer-events: auto;
        }

        .mtf-page-container .side-nav button {
          display: flex;
          align-items: center;
          gap: .7rem;
          justify-content: flex-end;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: .68rem;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--ink);
          opacity: .55;
        }

        .mtf-page-container .side-nav button .snav-label {
          opacity: 0;
          transform: translateX(6px);
          transition: opacity .2s ease, transform .2s ease;
          background: var(--cream);
          padding: .25rem .55rem;
          border: 1.5px solid var(--ink);
          border-radius: 6px;
          box-shadow: 3px 3px 0 var(--ink);
          white-space: nowrap;
        }

        .mtf-page-container .side-nav button:hover .snav-label,
        .mtf-page-container .side-nav button.active .snav-label {
          opacity: 1;
          transform: translateX(0);
        }

        .mtf-page-container .side-nav button .snav-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          border: 2px solid var(--ink);
          background: transparent;
          flex-shrink: 0;
          transition: background .25s ease, transform .25s ease;
        }

        .mtf-page-container .side-nav button.active {
          opacity: 1;
        }

        .mtf-page-container .side-nav button.active .snav-dot {
          background: var(--forest);
          transform: scale(1.3);
        }

        .mtf-page-container .side-nav.on-dark button {
          color: var(--cream);
        }

        .mtf-page-container .side-nav.on-dark button .snav-dot {
          border-color: var(--cream);
        }

        .mtf-page-container .side-nav.on-dark button.active .snav-dot {
          background: var(--mint);
          border-color: var(--mint);
        }

        .mtf-page-container .side-nav.on-dark button .snav-label {
          background: var(--ink);
          color: var(--cream);
          border-color: var(--cream);
        }

        /* Back to Top */
        .mtf-page-container .back-to-top {
          position: fixed;
          right: 1.6rem;
          bottom: 1.6rem;
          z-index: 150;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--mint);
          border: 2.5px solid var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-off-sm);
          opacity: 0;
          transform: translateY(12px) scale(.85);
          pointer-events: none;
          transition: opacity .3s ease, transform .3s ease;
        }

        .mtf-page-container .back-to-top.show {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        .mtf-page-container .back-to-top:hover {
          transform: translateY(-3px) scale(1.05);
        }

        .mtf-page-container .back-to-top svg {
          width: 20px;
          height: 20px;
        }

        /* Back Button styled inside container */
        .mtf-page-container .back-btn {
          font-family: var(--font-jetbrains-mono), monospace;
          font-weight: 700;
          font-size: .85rem;
          letter-spacing: .06em;
          text-transform: uppercase;
          padding: .6rem 1.2rem;
          border: 3px solid var(--ink);
          border-radius: 100px;
          background: var(--cream);
          color: var(--ink);
          box-shadow: 4px 4px 0 var(--ink);
          transition: transform .15s ease, box-shadow .15s ease, background .15s ease;
          display: inline-flex;
          align-items: center;
          gap: .6rem;
        }

        .mtf-page-container .back-btn:hover {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0 var(--ink);
        }

        .mtf-page-container .back-btn:active {
          transform: translate(4px, 4px);
          box-shadow: 0px 0px 0 var(--ink);
        }

        /* Bottom Apply Section */
        .mtf-page-container .apply-section {
          text-align: center;
          padding: 5rem 2rem;
          background: var(--mint-pale);
          border-top: 5px solid var(--ink);
          border-bottom: 5px solid var(--ink);
          color: var(--ink);
        }

        .mtf-page-container .apply-section h3 {
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          margin-bottom: 1.2rem;
          color: var(--ink);
        }

        .mtf-page-container .apply-section p {
          font-family: var(--font-space-grotesk), sans-serif;
          font-size: 1.25rem;
          font-weight: 500;
          margin-bottom: 2.2rem;
          color: var(--forest-deep);
          max-width: 60ch;
          margin-left: auto;
          margin-right: auto;
          opacity: 0.85;
        }

        /* Footer mark */
        .mtf-page-container footer {
          background: var(--forest-deep);
          color: var(--cream-dim);
          padding: 3rem 2rem 2.2rem;
          text-align: center;
          border-top: 5px solid var(--mint);
        }

        .mtf-page-container footer .mark {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: .75rem;
          letter-spacing: .14em;
          text-transform: uppercase;
          opacity: .55;
        }

        .mtf-page-container footer .mark b {
          color: var(--mint);
          opacity: 1;
        }

        /* Media Queries */
        @media(max-width:900px) {
          .mtf-page-container .hero-inner {
            grid-template-columns: 1fr;
            padding-top: 6.5rem;
            gap: 2.4rem;
          }
          .mtf-page-container section {
            padding: 4.5rem 1.2rem;
          }
          .mtf-page-container .panel {
            grid-template-columns: auto 1fr;
          }
          .mtf-page-container .panel .amount {
            grid-column: 1/-1;
            justify-self: start;
          }
          .mtf-page-container .comic-layout {
            grid-template-columns: 1fr;
          }
          .mtf-page-container .comic-dots {
            display: none;
          }
          .mtf-page-container .cursor-glow {
            display: none;
          }
          .mtf-page-container .side-nav {
            display: none;
          }
          .mtf-page-container .mtf-diagram {
            box-shadow: 6px 6px 0 var(--mint);
            padding: 2.2rem 2rem;
          }
          .mtf-page-container .mtf-diagram-head h3 {
            font-size: 1.6rem;
          }
          .mtf-page-container .mtf-step-label {
            font-size: 1.2rem;
          }
          .mtf-page-container .mtf-step-sub {
            font-size: 1.05rem;
          }
          .mtf-page-container .mtf-icon {
            width: 58px;
            height: 58px;
          }
          .mtf-page-container .mtf-icon svg {
            width: 26px;
            height: 26px;
          }
          .mtf-page-container .risk-grid {
            grid-template-columns: 1fr;
          }
        }
        @media(max-width:600px) {
          .mtf-page-container .hero-counter {
            padding: 1rem 1.4rem;
            gap: .8rem;
          }
          .mtf-page-container .hero-counter .lbl {
            font-size: .7rem;
          }
          .mtf-page-container .hero-counter .num {
            font-size: 1.4rem;
          }
          .mtf-page-container .vt-dot {
            width: 38px;
            height: 38px;
            font-size: .9rem;
          }
          .mtf-page-container .vt-content h4 {
            font-size: 1.12rem;
          }
          .mtf-page-container .vt-content p {
            font-size: 1.05rem;
          }
          .mtf-page-container .vt-step.active .vt-content p,
          .mtf-page-container .vt-step.done .vt-content p {
            max-height: 260px;
          }
        }
      `}} />

      {/* Global Scroll Progress Rail */}
      <div className="page-progress" style={{ width: `${scrollPercent}%` }} />

      {/* Cursor Glow effect */}
      {hasFinePointer && (
        <div className={`cursor-glow ${showGlow ? "on" : ""}`} style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px) translate(-50%,-50%)` }} />
      )}

      {/* Side Scrollspy Navigation */}
      <nav className={`side-nav ${showSideNav ? "show" : ""} ${isDarkSection ? "on-dark" : ""}`}>
        <button className={activeSection === "hero" ? "active" : ""} onClick={() => scrollToTarget("hero")}>
          <span className="snav-label">Hero</span>
          <span className="snav-dot"></span>
        </button>
        <button className={activeSection === "comic" ? "active" : ""} onClick={() => scrollToTarget("comic")}>
          <span className="snav-label">Explainer</span>
          <span className="snav-dot"></span>
        </button>
        <button className={activeSection === "simulator" ? "active" : ""} onClick={() => scrollToTarget("simulator")}>
          <span className="snav-label">Simulator</span>
          <span className="snav-dot"></span>
        </button>
        <button className={activeSection === "mechanics" ? "active" : ""} onClick={() => scrollToTarget("mechanics")}>
          <span className="snav-label">Mechanics</span>
          <span className="snav-dot"></span>
        </button>
      </nav>

      {/* Back to Top button */}
      <button className={`back-to-top ${showBackToTop ? "show" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
        <svg viewBox="0 0 24 24" fill="none" stroke="#12140E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>

      {/* ============ SECTION 1 : HERO ============ */}
      <section className="hero" id="hero" onMouseMove={handleHeroMouseMove} onMouseLeave={handleHeroMouseLeave} ref={heroRef}>
        
        {/* Parallax chart lines background */}
        <svg className="hero-bg-charts" style={{ transform: `translate(${heroParallax.x}px, ${heroParallax.y}px)` }} viewBox="0 0 1440 900" preserveAspectRatio="none">
          <polyline points="0,780 120,740 240,760 360,690 480,720 600,650 720,680 840,600 960,630 1080,560 1200,590 1320,520 1440,550" fill="none" stroke="#8FEFA0" strokeWidth="2" />
          <polyline points="0,880 150,850 300,860 450,810 600,830 750,790 900,805 1050,760 1200,780 1350,740 1440,750" fill="none" stroke="#F1ECDE" strokeWidth="1.4" opacity=".5" />
        </svg>



        <div className="hero-inner">
          <div>
            <h1 className="reveal in">Trade Bigger.<br /><span className="dim">Without Paying<br />the Full Amount.</span></h1>
            <div className="hero-ctas">
              <a href="#comic" className="btn primary" onMouseMove={handleBtnMouseMove} onMouseLeave={handleBtnMouseLeave} onClick={(e) => { e.preventDefault(); scrollToTarget("comic"); }}>Explore MTF ↓</a>
              <a href="#simulator" className="btn" onMouseMove={handleBtnMouseMove} onMouseLeave={handleBtnMouseLeave} onClick={(e) => { e.preventDefault(); scrollToTarget("simulator"); }}>Try Simulator ↓</a>
            </div>
            <div className="hero-counter">
              <span className="lbl">Your Buying Power</span>
              <span className="num mono">{fmtINR(heroCounter)}</span>
            </div>
          </div>

          <div className="mtf-diagram">
            <div className="mtf-diagram-head">
              <span className="badge">MTF Concept</span>
              <h3>How the money flows</h3>
            </div>

            <div className="mtf-step">
              <div className="mtf-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#12140E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="3.4" />
                  <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
                </svg>
              </div>
              <div>
                <div className="mtf-step-label">Trader</div>
                <div className="mtf-step-sub">Your funds — ₹25,000 margin</div>
              </div>
            </div>

            <div className="mtf-connector"><span>Provides margin →</span></div>

            <div className="mtf-step">
              <div className="mtf-icon broker">
                <svg viewBox="0 0 24 24" fill="none" stroke="#F1ECDE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 10l9-6 9 6" />
                  <path d="M5 10v9M10 10v9M14 10v9M19 10v9" />
                  <path d="M3 19h18" />
                </svg>
              </div>
              <div>
                <div className="mtf-step-label">Broker</div>
                <div className="mtf-step-sub">Funds the rest — ₹75,000 loan</div>
              </div>
            </div>

            <div className="mtf-connector"><span>Combined buying power →</span></div>

            <div className="mtf-step highlight">
              <div className="mtf-icon power">
                <svg viewBox="0 0 24 24" fill="none" stroke="#12140E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5" />
                  <path d="M6 11l6-6 6 6" />
                </svg>
              </div>
              <div>
                <div className="mtf-step-label">Trading Power</div>
                <div className="mtf-step-sub">₹1,00,000 total — buy 4× more stock</div>
              </div>
            </div>

            <div className="mtf-notes">
              <div className="mtf-note">
                <span className="dot"></span>
                <span><b>Cost</b> — interest paid to the broker</span>
              </div>
              <div className="mtf-note risk">
                <span className="dot"></span>
                <span><b>Risk</b> — losses are amplified too</span>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-cue"><span className="bar"></span>Scroll to explore</div>
      </section>

      {/* ============ SECTION 2 : COMIC EXPLAINER ============ */}
      <section className="comic-section" id="comic">
        <div className="section-inner">
          <div className="section-head reveal">
            <h2>One trade.<br />Two people&apos;s money.</h2>
          </div>

          <div className="comic-layout">
            
            {/* Scrollspy dot indicators */}
            <div className="comic-dots">
              <button className={activePanel === "p0" ? "active" : ""} onClick={() => scrollToTarget("p0")} aria-label="Panel 1"></button>
              <button className={activePanel === "p1" ? "active" : ""} onClick={() => scrollToTarget("p1")} aria-label="Panel 2"></button>
              <button className={activePanel === "p2" ? "active" : ""} onClick={() => scrollToTarget("p2")} aria-label="Panel 3"></button>
              <button className={activePanel === "p3" ? "active" : ""} onClick={() => scrollToTarget("p3")} aria-label="Panel 4"></button>
            </div>

            <div className="comic-strip">
              
              {/* Rohan panel */}
              <div className="panel reveal" id="p0" onMouseMove={handlePanelMouseMove} onMouseLeave={handlePanelMouseLeave}>
                <div className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#12140E" strokeWidth="1.6">
                    <rect x="3" y="7" width="18" height="12" rx="2" />
                    <path d="M3 10h18" />
                    <circle cx="16" cy="14" r="1.2" fill="#12140E" />
                  </svg>
                </div>
                <div className="panel-text">
                  <div className="who">Rohan</div>
                  <div className="line">Rohan has <b>₹25,000</b> in his account.</div>
                </div>
                <div className="amount">₹25,000</div>
              </div>
              
              <div className="strip-arrow">↓</div>

              {/* His Plan panel */}
              <div className="panel reveal" id="p1" onMouseMove={handlePanelMouseMove} onMouseLeave={handlePanelMouseLeave}>
                <div className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#12140E" strokeWidth="1.6">
                    <path d="M3 21h18M6 21V9l6-5 6 5v12M10 21v-6h4v6" />
                  </svg>
                </div>
                <div className="panel-text">
                  <div className="who">His plan</div>
                  <div className="line">He wants to buy <b>₹1,00,000</b> worth of Infosys.</div>
                </div>
                <div className="amount">₹1,00,000</div>
              </div>
              
              <div className="strip-arrow">↓</div>

              {/* Broker Says panel */}
              <div className="panel broker reveal" id="p2" onMouseMove={handlePanelMouseMove} onMouseLeave={handlePanelMouseLeave}>
                <div className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#F1ECDE" strokeWidth="1.6">
                    <path d="M12 2l3 3-3 3-3-3z" />
                    <path d="M4 21v-6a2 2 0 012-2h12a2 2 0 012 2v6" />
                    <path d="M9 21v-4h6v4" />
                  </svg>
                </div>
                <div className="panel-text">
                  <div className="who">Broker says</div>
                  <div className="line">&quot;I&apos;ll fund <b>₹75,000</b>.&quot;</div>
                </div>
                <div className="amount">₹75,000</div>
              </div>
              
              <div className="strip-arrow">↓</div>

              {/* Result panel */}
              <div className="panel reveal" id="p3" onMouseMove={handlePanelMouseMove} onMouseLeave={handlePanelMouseLeave}>
                <div className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#12140E" strokeWidth="1.6">
                    <path d="M3 3v18h18" />
                    <path d="M7 15l4-4 3 3 5-6" />
                  </svg>
                </div>
                <div className="panel-text">
                  <div className="who">Result</div>
                  <div className="line">Rohan now owns a <b>₹1,00,000 position</b> — and pays interest only on the ₹75,000 he borrowed.</div>
                </div>
                <div className="amount">₹1,00,000</div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 3 : IS IT FOR YOU + CALCULATOR ============ */}
      <section className="risk-section" id="simulator">
        <div className="section-inner">
          <div className="section-head reveal">
            <span className="section-tag">Before You Use It</span>
            <h2>Is MTF right for you?</h2>
          </div>

          <div className="risk-grid">
            <ul className="checklist reveal">
              <li>You&apos;re okay holding the stock for a few days or weeks — MTF is meant for that, not quick same-day trades.</li>
              <li>You&apos;re fine paying daily interest — it adds up every single day, whether the stock goes up or down.</li>
              <li>You can arrange extra money fast — if the stock falls too much, the broker will ask you to add funds or sell your shares.</li>
              <li>You&apos;ve checked with your broker first — not every stock qualifies for MTF, and how much they lend changes stock to stock.</li>
            </ul>

            <div className="reveal sim-cards">
              <div className="compare-card">
                <h4>Buying power — drag the slider below</h4>
                <div className="compare-row">
                  <div className="crow-label"><span>Without MTF · your cash only</span><b>{fmtINR(ownMargin)}</b></div>
                  <div className="cbar-track">
                    <div className="cbar-fill without" style={{ width: `${cmpWithoutWidth}%` }} />
                  </div>
                </div>
                <div className="compare-row">
                  <div className="crow-label"><span>With MTF · total position size</span><b>{fmtINR(totalPosition)}</b></div>
                  <div className="cbar-track">
                    <div className="cbar-fill with" style={{ width: "100%" }} />
                  </div>
                </div>
                <p className="compare-note">Assumes a typical ~25% margin requirement — your own cash funds a quarter, the broker funds the rest.</p>
              </div>

              <div className="calc-card">
                <h3>What would the interest actually cost?</h3>

                <div className="calc-row">
                  <label>Borrowed from broker <b className="mono">{fmtINR(amount)}</b></label>
                  <input type="range" min="10000" max="500000" step="5000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                </div>
                <div className="calc-row">
                  <label>Days held <b className="mono">{days}</b></label>
                  <input type="range" min="1" max="180" step="1" value={days} onChange={(e) => setDays(Number(e.target.value))} />
                </div>
                <div className="calc-row">
                  <label>Broker&apos;s annual interest rate <b className="mono">{rate}%</b></label>
                  <input type="range" min="8" max="24" step="0.5" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
                </div>

                <div className="calc-result">
                  <span className="label">Interest owed</span>
                  <span className="value">{fmtINR(interest)}</span>
                </div>
                <p className="disclaimer">Illustrative only — actual broker rates, slabs, and compounding vary. This is not investment or tax advice.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 4 : HOW IT ACTUALLY WORKS — AUTO-SCROLLING TIMELINE ============ */}
      <section className="timeline-section" id="mechanics">
        <div className="ht-intro section-inner">
          <div className="section-head reveal">
            <span className="section-tag">Step By Step · Auto-Playing Timeline</span>
            <h2>How MTF actually works</h2>
          </div>
        </div>

        <div className="vt-wrap" ref={vtTrackRef}>
          {stages.map((s, i) => {
            const isDone = i < vtIndex || vtFinished;
            const isActive = i === vtIndex && !vtFinished;
            let classNames = "vt-step";
            if (s.cls) classNames += ` ${s.cls}`;
            if (isDone) classNames += " done";
            if (isActive) classNames += " active";

            return (
              <div key={i} className={classNames}>
                <div className="vt-line-col">
                  <div className="vt-dot">{i + 1}</div>
                  <div className="vt-line" />
                </div>
                <div className="vt-content">
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ SECTION 5: CALL TO ACTION ============ */}
      <div className="apply-section">
        <h3>Ready to Trade with Leverage?</h3>
        <p>
          Get up to 4x buying power on stock trades with Fiscal Forum. Apply for Margin Trading Facility in under 5 minutes.
        </p>
        <button onClick={() => router.push("/services/stock-investment/mtf/apply")} className="btn primary" onMouseMove={handleBtnMouseMove} onMouseLeave={handleBtnMouseLeave} style={{ fontSize: "1.05rem", padding: "1.1rem 2.2rem" }}>
          Apply for MTF Now →
        </button>
      </div>

      {/* Footer education mark */}
      <footer>
        <div className="mark">A <b>Fiscal Forum</b> explainer on Margin Trading Facility · Educational content, not investment advice</div>
      </footer>
    </div>
  );
}