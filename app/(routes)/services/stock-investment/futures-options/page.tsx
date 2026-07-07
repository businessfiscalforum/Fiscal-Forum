"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function FuturesOptionsPage() {
  // ── Playground State ──
  const [price, setPrice] = useState(100);
  const [expiry, setExpiry] = useState(30); // 1 to 30 days
  const [lot, setLot] = useState(50);
  const [position, setPosition] = useState("long-future"); // long-future, long-call, long-put, short-call, short-put

  // Canvas Refs
  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const futCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const optCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ── Constants ──
  const BASE_STRIKE = 100;
  const BASE_ENTRY = 100;
  const PREMIUM = 8;

  // ── Hero Candlestick Canvas Animation ──
  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GREEN = "#52B788";
    const RED = "#FF6B6B";
    const WICK = "#bbbbbb";
    const NUM = 28;

    const pattern = [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0];
    const candleData = Array.from({ length: NUM }, (_, i) => {
      const bull = pattern[i % pattern.length] === 1;
      const bodyPct = bull ? 0.38 + Math.random() * 0.28 : 0.55 + Math.random() * 0.3;
      const wickTop = 0.1 + Math.random() * 0.22;
      const wickBot = 0.08 + Math.random() * 0.18;
      return { bull, bodyPct, wickTop, wickBot };
    });

    const phases = candleData.map((_, i) => i * ((Math.PI * 2) / NUM));
    const speeds = candleData.map(() => 0.01 + Math.random() * 0.008);
    const phases2 = candleData.map(() => Math.random() * Math.PI * 2);
    const speeds2 = candleData.map(() => 0.014 + Math.random() * 0.01);
    let tick = 0;
    let animFrameId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth || 500;
        canvas.height = parent.clientHeight || 440;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const padL = W * 0.03;
      const padR = W * 0.03;
      const usableW = W - padL - padR;
      const gap = usableW / NUM;
      const candleW = Math.max(Math.floor(gap * 0.58), 8);
      const yStart = H * 0.82;
      const yEnd = H * 0.12;

      for (let i = 0; i < NUM; i++) {
        const d = candleData[i];
        const cx = padL + gap * i + gap / 2;
        const floatY =
          Math.sin(phases[i] + tick * speeds[i]) * 18 +
          Math.sin(phases2[i] + tick * speeds2[i]) * 9;
        const trendY = yStart + (yEnd - yStart) * (i / (NUM - 1)) + floatY;
        const baseH = d.bull
          ? 52 + i * 3.2 + Math.sin(i * 1.1) * 10
          : 72 + i * 3.8 + Math.sin(i * 0.9) * 14;
        const bodyH = Math.max(baseH * d.bodyPct, 12);
        const wickTopH = baseH * d.wickTop;
        const wickBotH = baseH * d.wickBot;
        const bodyTop = trendY - bodyH / 2;

        ctx.beginPath();
        ctx.strokeStyle = WICK;
        ctx.lineWidth = 2;
        ctx.moveTo(cx, bodyTop);
        ctx.lineTo(cx, bodyTop - wickTopH);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx, bodyTop + bodyH);
        ctx.lineTo(cx, bodyTop + bodyH + wickBotH);
        ctx.stroke();

        const r = Math.min(6, candleW / 4);
        ctx.beginPath();
        ctx.roundRect(cx - candleW / 2, bodyTop, candleW, bodyH, r);
        ctx.fillStyle = d.bull ? GREEN : RED;
        ctx.fill();
      }
      tick++;
      animFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  // ── Parallax effect on hero ──
  const handleMouseMove = (e: React.MouseEvent) => {
    const stage = document.querySelector(".candle-stage") as HTMLElement;
    if (!stage) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 6;
    stage.style.transform = `translate(${x}px, ${y}px)`;
  };

  // ── P&L Computations ──
  const calcFutures = (price: number, lot: number) => {
    const buyerPL = (price - BASE_ENTRY) * lot;
    const sellerPL = -(price - BASE_ENTRY) * lot;
    return { buyerPL, sellerPL, breakeven: BASE_ENTRY };
  };

  const calcOptions = (price: number, lot: number, expiry: number, pos: string) => {
    const timeRatio = (expiry - 1) / 29;
    const timeValue = PREMIUM * timeRatio;
    const isCall = pos === "long-call" || pos === "short-call";
    const isLong = pos === "long-call" || pos === "long-put";

    const intrinsic = isCall ? Math.max(price - BASE_STRIKE, 0) : Math.max(BASE_STRIKE - price, 0);
    const optionValue = intrinsic + timeValue;

    const buyerRawPL = (optionValue - PREMIUM) * lot;
    const sellerRawPL = -buyerRawPL;

    let buyerPL, sellerPL;
    if (isLong) {
      buyerPL = buyerRawPL;
      sellerPL = sellerRawPL;
    } else {
      buyerPL = sellerRawPL;
      sellerPL = buyerRawPL;
    }

    const breakeven = isCall ? BASE_STRIKE + PREMIUM : BASE_STRIKE - PREMIUM;
    return { buyerPL, sellerPL, breakeven: +breakeven.toFixed(1) };
  };

  // ── Drawing P&L charts ──
  const drawPLChart = (
    canvas: HTMLCanvasElement,
    priceRange: [number, number],
    plFn: (p: number) => number,
    currentPrice: number
  ) => {
    const cx = canvas.getContext("2d");
    if (!cx) return;

    canvas.width = canvas.parentElement?.clientWidth || 250;
    canvas.height = 120;
    const W = canvas.width;
    const H = canvas.height;

    cx.fillStyle = "#ffffff";
    cx.fillRect(0, 0, W, H);

    const prices: number[] = [];
    const pls: number[] = [];
    for (let p = priceRange[0]; p <= priceRange[1]; p++) {
      prices.push(p);
      pls.push(plFn(p));
    }

    const minPL = Math.min(...pls);
    const maxPL = Math.max(...pls);
    const range = maxPL - minPL || 1;

    const PAD = 12;
    const toX = (p: number) => ((p - priceRange[0]) / (priceRange[1] - priceRange[0])) * (W - PAD * 2) + PAD;
    const toY = (pl: number) => H - PAD - ((pl - minPL) / range) * (H - PAD * 2 - 8);

    // Zero Line
    if (minPL < 0 && maxPL > 0) {
      const zeroY = toY(0);
      cx.beginPath();
      cx.setLineDash([4, 4]);
      cx.strokeStyle = "#ddd";
      cx.lineWidth = 1;
      cx.moveTo(PAD, zeroY);
      cx.lineTo(W - PAD, zeroY);
      cx.stroke();
      cx.setLineDash([]);

      cx.font = "9px Space Mono, monospace";
      cx.fillStyle = "#1E5C3A";
      cx.fillText("PROFIT", PAD + 4, zeroY - 5);
      cx.fillStyle = "#B5181E";
      cx.fillText("LOSS", PAD + 4, zeroY + 13);
    }

    // Fill P&L area
    cx.beginPath();
    cx.moveTo(toX(prices[0]), toY(0));
    prices.forEach((p, i) => cx.lineTo(toX(p), toY(pls[i])));
    cx.lineTo(toX(prices[prices.length - 1]), toY(0));
    cx.closePath();

    const grad = cx.createLinearGradient(0, 0, 0, H);
    if (maxPL > 0) {
      grad.addColorStop(0, "rgba(30,92,58,0.15)");
      grad.addColorStop(0.5, "rgba(30,92,58,0.05)");
    }
    if (minPL < 0) {
      grad.addColorStop(maxPL > 0 ? 0.5 : 0, "rgba(181,24,30,0.08)");
      grad.addColorStop(1, "rgba(181,24,30,0.14)");
    }
    cx.fillStyle = grad;
    cx.fill();

    // Draw line segments
    for (let i = 1; i < prices.length; i++) {
      const x1 = toX(prices[i - 1]);
      const y1 = toY(pls[i - 1]);
      const x2 = toX(prices[i]);
      const y2 = toY(pls[i]);
      cx.beginPath();
      cx.moveTo(x1, y1);
      cx.lineTo(x2, y2);
      cx.strokeStyle = pls[i] >= 0 ? "#1E5C3A" : "#B5181E";
      cx.lineWidth = 2.5;
      cx.stroke();
    }

    // Current Price Indicator Line
    const cpX = toX(currentPrice);
    cx.beginPath();
    cx.setLineDash([3, 3]);
    cx.strokeStyle = "#E8924A";
    cx.lineWidth = 1.5;
    cx.moveTo(cpX, PAD);
    cx.lineTo(cpX, H - PAD);
    cx.stroke();
    cx.setLineDash([]);

    // Current Price Dot
    const cpY = toY(plFn(currentPrice));
    cx.beginPath();
    cx.arc(cpX, cpY, 5, 0, Math.PI * 2);
    cx.fillStyle = "#E8924A";
    cx.fill();
    cx.strokeStyle = "#0D0D0D";
    cx.lineWidth = 1.5;
    cx.stroke();

    // P&L Label Pill
    const curPL = plFn(currentPrice);
    const label = (curPL >= 0 ? "+₹" : "−₹") + Math.abs(Math.round(curPL)).toLocaleString("en-IN");
    cx.font = "bold 11px Space Mono, monospace";
    const textW = cx.measureText(label).width;
    const pillH = 18;
    const pillPad = 6;
    let lx = cpX + 10;
    if (lx + textW + pillPad * 2 > W) lx = cpX - textW - pillPad * 2 - 10;
    const ly = Math.max(cpY - 10, 4);

    cx.fillStyle = "#ffffff";
    cx.strokeStyle = "#0D0D0D";
    cx.lineWidth = 1.5;
    cx.beginPath();
    cx.roundRect(lx - pillPad, ly, textW + pillPad * 2, pillH, 4);
    cx.fill();
    cx.stroke();

    cx.fillStyle = "#0D0D0D";
    cx.fillText(label, lx, ly + 12);

    // X-axis Tick Labels
    cx.font = "9px Space Mono, monospace";
    cx.fillStyle = "#aaa";
    cx.fillText("₹" + priceRange[0], PAD, H - 2);
    const midP = Math.round((priceRange[0] + priceRange[1]) / 2);
    cx.fillText("₹" + midP, toX(midP) - 12, H - 2);
    cx.fillText("₹" + priceRange[1], W - 36, H - 2);
  };

  // Re-draw charts when state variables change
  useEffect(() => {
    if (futCanvasRef.current) {
      drawPLChart(futCanvasRef.current, [60, 160], (p) => (p - BASE_ENTRY) * lot, price);
    }
    if (optCanvasRef.current) {
      const optPos = position === "long-future" ? "long-call" : position;
      const isCall = optPos === "long-call" || optPos === "short-call";
      const isLongOpt = optPos === "long-call" || optPos === "long-put";

      drawPLChart(
        optCanvasRef.current,
        [60, 160],
        (p) => {
          const intr = isCall ? Math.max(p - BASE_STRIKE, 0) : Math.max(BASE_STRIKE - p, 0);
          const timeRatio = (expiry - 1) / 29;
          const tVal = PREMIUM * timeRatio;
          const optVal = intr + tVal;
          const raw = (optVal - PREMIUM) * lot;
          return isLongOpt ? raw : -raw;
        },
        price
      );
    }
  }, [price, expiry, lot, position]);

  // Derived calculations
  const fut = calcFutures(price, lot);
  const optPos = position === "long-future" ? "long-call" : position;
  const opt = calcOptions(price, lot, expiry, optPos);

  const getPositionExplanation = () => {
    const maxLossStr = (PREMIUM * lot).toLocaleString("en-IN");
    const marginStr = (BASE_ENTRY * lot * 0.1).toLocaleString("en-IN");
    const map: Record<string, string> = {
      "long-future": `<strong>Long Future:</strong> You are obligated to BUY at ₹${BASE_ENTRY}. Every ₹1 rise = <strong>+₹${lot}</strong> profit; every ₹1 fall = <strong>−₹${lot}</strong> loss. Margin required: ₹${marginStr}. No premium paid — unlimited upside AND downside.`,
      "long-call": `<strong>Long Call (CE):</strong> You paid ₹${PREMIUM.toFixed(1)} premium × ${lot} units = ₹${maxLossStr} max loss. Break-even at ₹${(
        BASE_STRIKE + PREMIUM
      ).toFixed(1)}. If price rises above break-even, profits are unlimited. If it stays below strike, you simply lose the premium.`,
      "long-put": `<strong>Long Put (PE):</strong> You paid ₹${PREMIUM.toFixed(1)} premium × ${lot} units = ₹${maxLossStr} max loss. Break-even at ₹${(
        BASE_STRIKE - PREMIUM
      ).toFixed(1)}. Profits grow as price falls below break-even. Max profit if stock goes to ₹0.`,
      "short-call": `<strong>Short Call:</strong> You collected ₹${PREMIUM.toFixed(1)} premium × ${lot} units = ₹${maxLossStr} max gain. Profit if price stays BELOW ₹${(
        BASE_STRIKE + PREMIUM
      ).toFixed(1)} at expiry. Risk is unlimited above break-even — price can rise forever.`,
      "short-put": `<strong>Short Put:</strong> You collected ₹${PREMIUM.toFixed(1)} premium × ${lot} units = ₹${maxLossStr} max gain. Profit if price stays ABOVE ₹${(
        BASE_STRIKE - PREMIUM
      ).toFixed(1)} at expiry. Risk below break-even — you must buy at ₹${BASE_STRIKE} even if it falls to ₹0.`,
    };
    return map[position] || "";
  };

  const formatPL = (n: number) => {
    return (n >= 0 ? "+₹" : "−₹") + Math.abs(Math.round(n)).toLocaleString("en-IN");
  };

  const getPLColorClass = (n: number) => (n > 0 ? "green" : n < 0 ? "red" : "");

  return (
    <div className="foDecodedTerminal" onMouseMove={handleMouseMove}>
      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-tag">F&amp;O Decoded</div>
          <h1>
            Futures &amp; Options,<br />
            <em>finally explained.</em>
          </h1>
          <p className="hero-sub">
            No jargon. No complicated formulas. Just clear explanations of how India&apos;s most powerful financial
            instruments actually work — and how you can use them.
          </p>
          <div className="hero-btns">
            <button
              className="btn-primary"
              onClick={() => {
                document.getElementById("playground")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Start Journey →
            </button>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-grid-overlay"></div>
          <div className="bull-bear">
            <div className="badge-bull">▲ BULL</div>
            <div className="badge-bear">▼ BEAR</div>
          </div>
          <div className="candle-stage">
            <canvas ref={heroCanvasRef} id="hero-candle-canvas"></canvas>
          </div>
          <div className="hero-label">MARKET SIMULATION</div>
        </div>
      </section>

      {/* WHAT IS F&O */}
      <section>
        <div className="section-eyebrow">The Basics</div>
        <h2 className="section-title">What exactly are Futures &amp; Options?</h2>
        <p className="section-sub">
          Think of them as financial contracts — agreements to buy or sell something at a specific price, on a specific
          date. Here&apos;s the key difference.
        </p>
        <div className="fo-grid">
          <div className="fo-card">
            <div className="fo-card-accent"></div>
            <div className="fo-card-top-row">
              <div>
                <div className="fo-card-icon">📅</div>
                <h3>Futures Contract</h3>
              </div>
              <Image
                src="/futures-icon.png"
                alt="Futures growth chart"
                className="fo-card-img futures-img"
                width={56}
                height={56}
              />
            </div>
            <p>
              A binding agreement to buy or sell a stock or index at a{" "}
              <strong>fixed price on a fixed future date</strong> — regardless of where the market goes. Both buyer and
              seller are obligated to honour it.
            </p>
            <p className="mt-3 text-[14px] text-[#333]">
              <strong>Example:</strong> You agree today to buy 50 shares of Reliance at ₹2,900 one month from now. Even if
              the price rises to ₹3,200, the seller must sell at ₹2,900.
            </p>
            <span className="tag">OBLIGATION TO EXECUTE</span>
          </div>

          <div className="fo-card red">
            <div className="fo-card-accent"></div>
            <div className="fo-card-top-row">
              <div>
                <div className="fo-card-icon">🔑</div>
                <h3>Options Contract</h3>
              </div>
              <Image
                src="/options-icon.png"
                alt="Options contract document"
                className="fo-card-img options-img"
                width={56}
                height={56}
              />
            </div>
            <p>
              The <strong>right, but not the obligation</strong>, to buy or sell at a set price before expiry. You pay a
              small fee (premium) for this right — and if things go south, you can simply walk away.
            </p>
            <p className="mt-3 text-[14px] text-[#333]">
              <strong>Example:</strong> You pay ₹150 for the right to buy Infosys at ₹1,600. If it falls to ₹1,400, you
              simply don&apos;t exercise — losing only ₹150, not the full fall.
            </p>
            <span className="tag">RIGHT WITHOUT OBLIGATION</span>
          </div>
        </div>
      </section>

      {/* ANALOGY SECTION */}
      <section className="bg-[#0A0A0A] border-b-2 border-[#222]">
        <div className="analogy-box border-2 border-[#333]">
          <div className="analogy-left">
            <h2>
              Think of it like a <span>house booking.</span>
            </h2>
            <p>Derivatives aren&apos;t exotic — we use similar logic every day. Here&apos;s an analogy that makes it click.</p>
            <div className="analogy-steps">
              <div className="analogy-step">
                <div className="step-num">1</div>
                <div className="step-text">
                  You find a flat you want at <strong>₹80 lakh</strong> but can&apos;t buy it right now.
                </div>
              </div>
              <div className="analogy-step">
                <div className="step-num">2</div>
                <div className="step-text">
                  <strong>Options:</strong> You pay ₹50,000 to &quot;lock in&quot; the price for 3 months. If prices
                  rise, you buy. If they fall, you walk away — losing only ₹50,000.
                </div>
              </div>
              <div className="analogy-step">
                <div className="step-num">3</div>
                <div className="step-text">
                  <strong>Futures:</strong> You sign a binding deal to buy at ₹80L in 3 months. No backing out — price
                  goes up or down, the deal is done.
                </div>
              </div>
              <div className="analogy-step">
                <div className="step-num">4</div>
                <div className="step-text">
                  In markets, instead of a flat, you&apos;re locking in the price of <strong>stocks or indices</strong> like
                  Nifty or Sensex.
                </div>
              </div>
            </div>
          </div>
          <div className="analogy-visual">
            <div className="contract-row">
              <span className="contract-key">Instrument</span>
              <span className="contract-val">NIFTY 50 Call Option</span>
            </div>
            <div className="contract-row">
              <span className="contract-key">Type</span>
              <span className="contract-val green">CE (Call)</span>
            </div>
            <div className="contract-row">
              <span className="contract-key">Strike Price</span>
              <span className="contract-val">₹24,500</span>
            </div>
            <div className="contract-row">
              <span className="contract-key">Expiry</span>
              <span className="contract-val">29 Jun 2026</span>
            </div>
            <div className="contract-row">
              <span className="contract-key">Premium Paid</span>
              <span className="contract-val">₹3,200</span>
            </div>
            <div className="contract-row">
              <span className="contract-key">Lot Size</span>
              <span className="contract-val">75 units</span>
            </div>
            <div className="contract-row">
              <span className="contract-key">Current P&amp;L</span>
              <span className="contract-val green">+₹8,250</span>
            </div>
            <div className="contract-row">
              <span className="contract-key">Max Loss</span>
              <span className="contract-val red">−₹3,200 (premium)</span>
            </div>
          </div>
        </div>
      </section>

      {/* GLOSSARY */}
      <section>
        <div className="section-eyebrow">Key Terms</div>
        <h2 className="section-title">Words you&apos;ll hear. Explained.</h2>
        <p className="section-sub font-semibold">Hover any term for a quick breakdown. No textbook language — just plain English.</p>
        <div className="glossary-grid">
          {[
            {
              term: "Strike Price",
              def: "The agreed price at which you can buy (Call) or sell (Put) the underlying asset. Think of it as the 'deal price' locked in your contract.",
            },
            {
              term: "Premium",
              def: "The fee you pay to enter an options contract. It's your maximum loss if the trade goes wrong. Small cost, big leverage.",
            },
            {
              term: "Expiry Date",
              def: "The last day you can exercise your contract. In India, most equity options expire on the last Thursday of each month.",
            },
            {
              term: "Call Option (CE)",
              def: "Gives you the right to BUY an asset at the strike price. You buy a Call when you expect the price to go UP.",
            },
            {
              term: "Put Option (PE)",
              def: "Gives you the right to SELL an asset at the strike price. You buy a Put when you expect the price to go DOWN — it's like insurance.",
            },
            {
              term: "Lot Size",
              def: "F&O contracts are traded in fixed bundles. NIFTY has a lot size of 75. You can't trade just 1 unit — you trade in lots.",
            },
            {
              term: "In The Money (ITM)",
              def: "When your option has real value right now. A Call is ITM if the market price is above your strike price — you're already in profit.",
            },
            {
              term: "Theta (Time Decay)",
              def: "Options lose value as expiry approaches — this is Theta. Every day that passes without price movement costs option buyers money.",
            },
            {
              term: "Open Interest (OI)",
              def: "The total number of active contracts in the market. Rising OI with rising prices = strong trend. Use it to gauge market sentiment.",
            },
          ].map((item, idx) => (
            <div key={idx} className="glossary-card">
              <div className="term">{item.term}</div>
              <div className="def">{item.def}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PLAYGROUND SIMULATOR */}
      <section id="playground" className="playground-section">
        <div className="section-eyebrow">Interactive Simulator</div>
        <h2 className="section-title">
          Futures vs Options <em className="text-[var(--green)] italic font-serif font-black">Playground</em>
        </h2>
        <p className="section-sub font-semibold">
          Instead of explaining differences — interact with them. Move the sliders, switch positions, and watch your
          P&amp;L update live.
        </p>

        <div className="playground-wrap">
          {/* Panel split */}
          <div className="playground-split">
            {/* FUTURES PANEL */}
            <div className="playground-panel futures-panel">
              <div className="panel-header">
                <span className="panel-badge futures-badge">FUTURES</span>
                <span className="panel-tag">OBLIGATION TO EXECUTE</span>
              </div>
              <div className="panel-stat-row">
                <div className="pstat">
                  <div className="pstat-label">Entry Price</div>
                  <div className="pstat-val">₹{BASE_ENTRY}</div>
                </div>
                <div className="pstat">
                  <div className="pstat-label">Lot Size</div>
                  <div className="pstat-val">{lot}</div>
                </div>
                <div className="pstat">
                  <div className="pstat-label">Margin Required</div>
                  <div className="pstat-val">₹{(BASE_ENTRY * lot * 0.1).toLocaleString("en-IN")}</div>
                </div>
              </div>
              <div
                className={`panel-pl-box ${
                  fut.buyerPL > 0 ? "profit" : fut.buyerPL < 0 ? "loss" : ""
                }`}
              >
                <div className="pl-label">Buyer P&amp;L</div>
                <div className={`pl-value ${getPLColorClass(fut.buyerPL)}`}>{formatPL(fut.buyerPL)}</div>
                <div className="pl-label mt-3">Seller P&amp;L</div>
                <div className={`pl-value ${getPLColorClass(fut.sellerPL)}`}>{formatPL(fut.sellerPL)}</div>
                <div className="pl-breakeven">
                  Break-even: <span>₹{fut.breakeven}</span>
                </div>
              </div>
              <div className="panel-chart-wrap">
                <canvas ref={futCanvasRef} id="fut-chart"></canvas>
              </div>
            </div>

            {/* OPTIONS PANEL */}
            <div className="playground-panel options-panel">
              <div className="panel-header">
                <span className="panel-badge options-badge">OPTIONS</span>
                <span className="panel-tag">RIGHT WITHOUT OBLIGATION</span>
              </div>
              <div className="panel-stat-row">
                <div className="pstat">
                  <div className="pstat-label">Strike Price</div>
                  <div className="pstat-val">₹{BASE_STRIKE}</div>
                </div>
                <div className="pstat">
                  <div className="pstat-label">Premium</div>
                  <div className="pstat-val">₹{PREMIUM.toFixed(1)}</div>
                </div>
                <div className="pstat">
                  <div className="pstat-label">Max Loss</div>
                  <div className="pstat-val loss-val">−₹{(PREMIUM * lot).toLocaleString("en-IN")}</div>
                </div>
              </div>
              <div
                className={`panel-pl-box ${
                  opt.buyerPL > 0 ? "profit" : opt.buyerPL < 0 ? "loss" : ""
                }`}
              >
                <div className="pl-label">Buyer P&amp;L</div>
                <div className={`pl-value ${getPLColorClass(opt.buyerPL)}`}>{formatPL(opt.buyerPL)}</div>
                <div className="pl-label mt-3">Seller P&amp;L</div>
                <div className={`pl-value ${getPLColorClass(opt.sellerPL)}`}>{formatPL(opt.sellerPL)}</div>
                <div className="pl-breakeven">
                  Break-even: <span>₹{opt.breakeven}</span>
                </div>
              </div>
              <div className="panel-chart-wrap">
                <canvas ref={optCanvasRef} id="opt-chart"></canvas>
              </div>
            </div>
          </div>

          {/* Sliders group */}
          <div className="playground-sliders">
            <div className="slider-group">
              <div className="slider-head">
                <span className="slider-label">📈 Stock Price</span>
                <span className="slider-val">₹{price}</span>
              </div>
              <input
                type="range"
                min="60"
                max="160"
                value={price}
                className="pg-slider"
                onChange={(e) => setPrice(+e.target.value)}
              />
              <div className="slider-ticks">
                <span>₹60</span>
                <span>₹100</span>
                <span>₹160</span>
              </div>
            </div>

            <div className="slider-group">
              <div className="slider-head">
                <span className="slider-label">⏳ Days to Expiry</span>
                <span className="slider-val">{expiry} days</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={expiry}
                className="pg-slider"
                onChange={(e) => setExpiry(+e.target.value)}
              />
              <div className="slider-ticks">
                <span>Expiry</span>
                <span>15 days</span>
                <span>30 days</span>
              </div>
            </div>

            <div className="slider-group">
              <div className="slider-head">
                <span className="slider-label">📦 Lot Size</span>
                <span className="slider-val">{lot} units</span>
              </div>
              <input
                type="range"
                min="25"
                max="150"
                step="25"
                value={lot}
                className="pg-slider"
                onChange={(e) => setLot(+e.target.value)}
              />
              <div className="slider-ticks">
                <span>25</span>
                <span>75</span>
                <span>150</span>
              </div>
            </div>
          </div>

          {/* Positions switcher */}
          <div className="playground-positions">
            <div className="pos-label">Your Position</div>
            <div className="pos-tabs">
              {[
                { pos: "long-future", label: "📈 Long Future" },
                { pos: "long-call", label: "📗 Long Call" },
                { pos: "long-put", label: "📕 Long Put" },
                { pos: "short-call", label: "🔻 Short Call" },
                { pos: "short-put", label: "🔺 Short Put" },
              ].map((btn) => (
                <button
                  key={btn.pos}
                  className={`pos-btn ${position === btn.pos ? "active" : ""}`}
                  onClick={() => setPosition(btn.pos)}
                >
                  {btn.label}
                </button>
              ))}
            </div>
            <div className="pos-explain" dangerouslySetInnerHTML={{ __html: getPositionExplanation() }}></div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="logo">
          Research<span>Edge</span>
        </div>
        <p>© 2026 ResearchEdge. For educational purposes only. Not SEBI registered investment advice.</p>
      </footer>
    </div>
  );
}