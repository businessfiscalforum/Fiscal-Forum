"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface RawBond {
  SYMBOL: string;
  SERIES: string;
  ISIN: string;
  "COUPON RATE": string;
  "FACE VALUE": string;
  LTP: string;
  "%CHNG": string;
  "VOLUME  (Shares)": string;
  "VALUE   (₹ Crores)": string;
  "CREDIT RATING AGENCY": string;
  "CREDIT RATING": string;
  "MATURITY DATE": string;
}

interface ProcessedBond extends RawBond {
  _id: string;
  _coupon: number | null;
  _ltp: number | null;
  _chng: number | null;
  _maturity: Date | null;
  _ratingBucket: "AAA" | "AA" | "A" | "BBB" | "unrated";
  _ratingRank: number;
}

/* ---------- Helper functions ---------- */
function toNumber(str: string | undefined | null): number | null {
  if (str === undefined || str === null) return null;
  const s = String(str).replace(/,/g, "").replace("₹", "").trim();
  if (s === "" || s === "-") return null;
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
}

function parseMaturity(str: string | undefined | null): Date | null {
  if (!str) return null;
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}

function ratingBucket(ratingStr: string | undefined | null): "AAA" | "AA" | "A" | "BBB" | "unrated" {
  if (!ratingStr || ratingStr.trim() === "") return "unrated";
  const r = ratingStr.toUpperCase();
  if (r.includes("AAA")) return "AAA";
  if (r.includes("AA")) return "AA";
  if (/(?:^|[^A])A(?:[^A]|$)/.test(r) || r.includes("A/") || r.startsWith("A")) {
    if (r.includes("AA")) return "AA";
    return "A";
  }
  return "BBB";
}

function ratingRank(bucket: "AAA" | "AA" | "A" | "BBB" | "unrated"): number {
  const ranks = { AAA: 4, AA: 3, A: 2, BBB: 1, unrated: 0 };
  return ranks[bucket] ?? 0;
}

function fmtMoney(n: number | null): string {
  return n === null
    ? "—"
    : "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

function fmtMaturity(d: Date | null): string {
  if (!d) return "—";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function ratingPillClass(bucket: "AAA" | "AA" | "A" | "BBB" | "unrated"): string {
  if (bucket === "AAA" || bucket === "AA") return "rating-pill";
  if (bucket === "unrated") return "rating-pill unrated";
  return "rating-pill weak";
}

const RISK_COPY = {
  aaa: "AAA is the safest rating there is — like lending money to the most reliable friend you have. The chance they don't pay you back is very low, so these bonds usually offer a lower coupon in return.",
  aa: "AA is still very safe, just one small notch below AAA. A touch more risk than AAA, so it usually pays a slightly higher coupon to make up for it.",
  a: "A is decently safe but not bulletproof. There's a bit more chance the borrower runs into trouble, so you're paid a bit more coupon for taking that on.",
  bbb: "BBB and below is riskier territory. The borrower is more likely to struggle or delay payments — that's exactly why these bonds often dangle a juicy coupon. Higher reward always comes with higher risk.",
};

const PAGE_SIZE = 6;

export default function IndianBondsHero() {
  const [bonds, setBonds] = useState<ProcessedBond[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Search & Filter State
  const [search, setSearch] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [couponMin, setCouponMin] = useState<string>("");
  const [priceMax, setPriceMax] = useState<string>("");
  const [maturityBefore, setMaturityBefore] = useState<string>("");
  const [watchOnly, setWatchOnly] = useState<boolean>(false);

  // Sorting
  const [sortField, setSortField] = useState<string>("_coupon");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Watchlist State
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());

  // Interactive widgets state
  const [labAmount, setLabAmount] = useState<number>(10000);
  const [labRate, setLabRate] = useState<number>(8.0);
  const [labYears, setLabYears] = useState<number>(5);
  const [activeRisk, setActiveRisk] = useState<"aaa" | "aa" | "a" | "bbb" | null>(null);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedBond, setSelectedBond] = useState<ProcessedBond | null>(null);

  // Scroll ref
  const boardRef = useRef<HTMLDivElement>(null);

  // Load bonds data on mount
  useEffect(() => {
    fetch("/bonds.json")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load bonds");
        return r.json() as Promise<RawBond[]>;
      })
      .then((data) => {
        const processed = data.map((b, i) => {
          const coupon = toNumber(b["COUPON RATE"]);
          const ltp = toNumber(b["LTP"]);
          const chng = toNumber(b["%CHNG"]);
          const maturity = parseMaturity(b["MATURITY DATE"]);
          const bucket = ratingBucket(b["CREDIT RATING"]);
          return {
            ...b,
            _id: b["ISIN"] || "row" + i,
            _coupon: coupon,
            _ltp: ltp,
            _chng: chng,
            _maturity: maturity,
            _ratingBucket: bucket,
            _ratingRank: ratingRank(bucket),
          };
        });
        setBonds(processed);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Could not load bonds data", err);
        setErrorMsg(
          "Could not load bond data. Make sure bonds.json sits inside the public/ folder."
        );
        setLoading(false);
      });

    // Load watchlist from local storage
    try {
      const stored = localStorage.getItem("bondwise_watchlist");
      if (stored) {
        setWatchlist(new Set(JSON.parse(stored)));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save watchlist to local storage
  const saveWatchlist = (newWatchlist: Set<string>) => {
    setWatchlist(newWatchlist);
    try {
      localStorage.setItem("bondwise_watchlist", JSON.stringify(Array.from(newWatchlist)));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleWatch = (id: string, event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    const updated = new Set(watchlist);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    saveWatchlist(updated);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearch("");
    setRating("");
    setCouponMin("");
    setPriceMax("");
    setMaturityBefore("");
    setWatchOnly(false);
    setCurrentPage(1);
  };

  // Ticker sample data
  const tickerBonds = useMemo(() => {
    if (bonds.length === 0) return [];
    return bonds.filter((b) => b._coupon != null && b._ltp != null).slice(0, 60);
  }, [bonds]);

  // Filtered & Sorted Bonds
  const filteredBonds = useMemo(() => {
    const q = search.trim().toLowerCase();
    const cMin = parseFloat(couponMin) || null;
    const pMax = parseFloat(priceMax) || null;
    const matBefore = parseInt(maturityBefore) || null;

    const res = bonds.filter((b) => {
      if (watchOnly && !watchlist.has(b._id)) return false;
      if (q) {
        const hay = `${b.SYMBOL || ""} ${b.ISIN || ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (rating) {
        if (rating === "BBB") {
          if (b._ratingBucket !== "BBB") return false;
        } else if (b._ratingBucket !== rating) {
          return false;
        }
      }
      if (cMin !== null && (b._coupon === null || b._coupon < cMin)) return false;
      if (pMax !== null && (b._ltp === null || b._ltp > pMax)) return false;
      if (matBefore !== null && (!b._maturity || b._maturity.getFullYear() > matBefore)) return false;
      return true;
    });

    // Sort
    res.sort((a, b) => {
      const av = a[sortField as keyof ProcessedBond];
      const bv = b[sortField as keyof ProcessedBond];

      let avVal: string | number = "";
      let bvVal: string | number = "";

      if (av instanceof Date) {
        avVal = av.getTime();
      } else if (av !== null && av !== undefined) {
        avVal = typeof av === "number" ? av : String(av).toLowerCase();
      } else {
        avVal = sortDir === "asc" ? Infinity : -Infinity;
      }

      if (bv instanceof Date) {
        bvVal = bv.getTime();
      } else if (bv !== null && bv !== undefined) {
        bvVal = typeof bv === "number" ? bv : String(bv).toLowerCase();
      } else {
        bvVal = sortDir === "asc" ? Infinity : -Infinity;
      }

      if (avVal < bvVal) return sortDir === "asc" ? -1 : 1;
      if (avVal > bvVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return res;
  }, [bonds, search, rating, couponMin, priceMax, maturityBefore, watchOnly, watchlist, sortField, sortDir]);

  // Calculate pages
  const totalPages = Math.max(1, Math.ceil(filteredBonds.length / PAGE_SIZE));

  useEffect(() => {
    setCurrentPage(1);
  }, [search, rating, couponMin, priceMax, maturityBefore, watchOnly, sortField, sortDir]);

  const pagedBonds = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredBonds.slice(start, start + PAGE_SIZE);
  }, [filteredBonds, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      if (boardRef.current) {
        window.scrollTo({
          top: boardRef.current.offsetTop - 80,
          behavior: "smooth",
        });
      }
    }
  };

  // Stats Calculations
  const stats = useMemo(() => {
    const coupons = filteredBonds.map((b) => b._coupon).filter((v) => v !== null) as number[];
    const avgCoupon = coupons.length
      ? (coupons.reduce((a, c) => a + c, 0) / coupons.length).toFixed(2) + "%"
      : "–";

    const safeBonds = filteredBonds.filter((b) => b._ratingRank >= 3).length;
    const safePercent = filteredBonds.length
      ? Math.round((safeBonds / filteredBonds.length) * 100) + "%"
      : "–";

    return {
      count: filteredBonds.length,
      avgCoupon,
      safePercent,
      watchlistSize: watchlist.size,
    };
  }, [filteredBonds, watchlist]);

  // Interactive Bond Lab calculator
  const bondLabCalculations = useMemo(() => {
    const annualInterest = labAmount * (labRate / 100);
    const totalInterest = annualInterest * labYears;
    const totalBack = labAmount + totalInterest;
    return {
      annual: fmtMoney(annualInterest),
      totalInterest: fmtMoney(totalInterest),
      totalBack: fmtMoney(totalBack),
    };
  }, [labAmount, labRate, labYears]);

  // Open Drawer
  const openDrawer = (bond: ProcessedBond) => {
    setSelectedBond(bond);
    setDrawerOpen(true);
  };

  const handleSortChange = (val: string) => {
    const [field, dir] = val.split("-");
    setSortField(field);
    setSortDir(dir as "asc" | "desc");
  };

  // Estimated yield for drawer
  const drawerYield = useMemo(() => {
    if (!selectedBond || selectedBond._coupon === null || !selectedBond._ltp) return "—";
    return ((selectedBond._coupon / selectedBond._ltp) * 100).toFixed(2) + "%";
  }, [selectedBond]);

  // Years to maturity for drawer
  const drawerYearsToMaturity = useMemo(() => {
    if (!selectedBond || !selectedBond._maturity) return "—";
    const yrs = (selectedBond._maturity.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    return yrs > 0 ? yrs.toFixed(1) + " yrs" : "Matured";
  }, [selectedBond]);

  return (
    <div className="bondWiseTerminal">
      {/* Hero Header */}
      <header className="hero">
        <div className="hero-flex">
          <div className="hero-inner">
            <p className="eyebrow">NSE / BSE listed corporate &amp; PSU bonds</p>
            <h1>
              BondWise <span>Terminal</span>
            </h1>
          </div>
          <div className="hero-art">
            <Image
              src="/indian-bond-certificate.jpg"
              alt="Government of India Indian Bond Certificate"
              width={300}
              height={300}
              priority
            />
          </div>
        </div>
      </header>

      {/* How bonds work explainer section */}
      <section className="panel explainer" aria-label="How bonds work">
        <div className="panel-head">
          <h2>How bonds work</h2>
          <span className="explainer-badge">60-second guide</span>
        </div>

        <p className="explainer-intro">
          Think of a bond as a friendly loan, just flipped around — instead of you borrowing from a bank, a company or the government borrows from <strong>you</strong>. They need cash now, you have some to spare, so you hand it over on one condition: they pay you back later, plus a little something extra for trusting them with your money. That&apos;s really all a bond is. Here&apos;s how it plays out in four steps.
        </p>

        <div className="explain-steps">
          <div className="step-card">
            <span className="step-num">01</span>
            <span className="step-emoji" aria-hidden="true">💸</span>
            <h3>You lend money</h3>
            <p>Buy a bond and you&apos;re lending your cash to a company or the government for a set amount of time.</p>
          </div>
          <div className="step-card">
            <span className="step-num">02</span>
            <span className="step-emoji" aria-hidden="true">📅</span>
            <h3>You get paid to wait</h3>
            <p>Every year they hand you back a slice called the <em>coupon</em> — like rent, but for your money.</p>
          </div>
          <div className="step-card">
            <span className="step-num">03</span>
            <span className="step-emoji" aria-hidden="true">🏁</span>
            <h3>You get it all back</h3>
            <p>On the <em>maturity date</em>, the full amount you lent — the face value — lands back in your pocket.</p>
          </div>
          <div className="step-card">
            <span className="step-num">04</span>
            <span className="step-emoji" aria-hidden="true">⚠️</span>
            <h3>...if they can pay</h3>
            <p>Some borrowers are safer bets than others. That&apos;s exactly what the credit rating below tells you.</p>
          </div>
        </div>

        {/* Bond lab calculator widget */}
        <div className="bond-lab">
          <div className="lab-head">
            <h3>🧪 Try it yourself</h3>
            <p>Slide the numbers and watch what your money actually does.</p>
          </div>
          <div className="lab-controls">
            <div className="field">
              <label htmlFor="labAmount">
                Amount you invest <span className="lab-out">₹{labAmount.toLocaleString("en-IN")}</span>
              </label>
              <input
                type="range"
                id="labAmount"
                min="1000"
                max="100000"
                step="1000"
                value={labAmount}
                onChange={(e) => setLabAmount(parseInt(e.target.value))}
              />
            </div>
            <div className="field">
              <label htmlFor="labRate">
                Coupon rate <span className="lab-out">{labRate.toFixed(1)}%</span>
              </label>
              <input
                type="range"
                id="labRate"
                min="1"
                max="15"
                step="0.5"
                value={labRate}
                onChange={(e) => setLabRate(parseFloat(e.target.value))}
              />
            </div>
            <div className="field">
              <label htmlFor="labYears">
                Years you hold it <span className="lab-out">{labYears} {labYears === 1 ? "yr" : "yrs"}</span>
              </label>
              <input
                type="range"
                id="labYears"
                min="1"
                max="20"
                step="1"
                value={labYears}
                onChange={(e) => setLabYears(parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="lab-result">
            <div className="lab-result-row">
              <span>Interest paid to you, every single year</span>
              <strong>{bondLabCalculations.annual}</strong>
            </div>
            <div className="lab-result-row">
              <span>Total interest over the whole period</span>
              <strong>{bondLabCalculations.totalInterest}</strong>
            </div>
            <div className="lab-result-row highlight">
              <span>Total cash back at the end (interest + your original amount)</span>
              <strong>{bondLabCalculations.totalBack}</strong>
            </div>
          </div>
        </div>

        {/* Credit rating explainer widget */}
        <div className="risk-picker">
          <h3>🛡️ Pick a credit rating</h3>
          <p>A rating is a report card for how likely the borrower is to actually pay you back. Tap one to see what it means for your money.</p>
          <div className="risk-chips">
            {(["aaa", "aa", "a", "bbb"] as const).map((chip) => (
              <button
                key={chip}
                className={`risk-chip ${chip} ${activeRisk === chip ? "active" : ""}`}
                type="button"
                onClick={() => setActiveRisk(chip)}
                onMouseEnter={() => setActiveRisk(chip)}
              >
                {chip === "bbb" ? "BBB & below" : chip.toUpperCase()}
              </button>
            ))}
          </div>
          <p className="risk-explain">
            {activeRisk ? RISK_COPY[activeRisk] : "Tap a rating above to see what it actually means."}
          </p>
        </div>
      </section>

      {/* Build your screen filters */}
      <section className="panel filters" aria-label="Filters">
        <div className="panel-head">
          <h2>Build your screen</h2>
          <button onClick={resetFilters} className="ghost-btn" type="button">
            Reset all
          </button>
        </div>

        <div className="filter-grid">
          <div className="field">
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="text"
              placeholder="Symbol or ISIN, e.g. IRFC, HUDCO…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="rating">Credit rating</label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="">Any rating</option>
              <option value="AAA">AAA</option>
              <option value="AA">AA</option>
              <option value="A">A</option>
              <option value="BBB">BBB and below</option>
              <option value="unrated">Unrated</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="couponMin">
              Min coupon <span className="unit">%</span>
            </label>
            <input
              id="couponMin"
              type="number"
              step="0.1"
              placeholder="e.g. 8"
              value={couponMin}
              onChange={(e) => setCouponMin(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="priceMax">
              Max price <span className="unit">₹</span>
            </label>
            <input
              id="priceMax"
              type="number"
              step="1"
              placeholder="e.g. 1100"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="maturityBefore">Maturing before</label>
            <input
              id="maturityBefore"
              type="number"
              min="2024"
              max="2060"
              placeholder="Year, e.g. 2030"
              value={maturityBefore}
              onChange={(e) => setMaturityBefore(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Summary stats row */}
      <section className="stats" aria-label="Summary">
        <div className="card">
          <h3>{stats.count.toLocaleString("en-IN")}</h3>
          <p>Bonds matching screen</p>
        </div>
        <div className="card accent">
          <h3>{stats.avgCoupon}</h3>
          <p>Average coupon</p>
        </div>
        <div className="card">
          <h3>{stats.safePercent}</h3>
          <p>Rated AA or higher</p>
        </div>
        <div className="card">
          <h3>{stats.watchlistSize}</h3>
          <p>In your watchlist</p>
        </div>
      </section>

      {/* Main Card Grid and Sorting */}
      <section className="panel board" ref={boardRef} aria-label="Bond board">
        <div className="panel-head">
          <h2>Bond board</h2>
          <div className="board-tools">
            <span className="hint">Tap a card to inspect · tap ★ to watch</span>
            <label className="watch-toggle">
              <input
                type="checkbox"
                checked={watchOnly}
                onChange={(e) => setWatchOnly(e.target.checked)}
              />
              Watchlist only
            </label>
          </div>
        </div>

        <div className="sort-row">
          <label htmlFor="sortSelect">Sort by</label>
          <select
            id="sortSelect"
            value={`${sortField}-${sortDir}`}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="_coupon-desc">Coupon — high to low</option>
            <option value="_coupon-asc">Coupon — low to high</option>
            <option value="_ltp-asc">Price — low to high</option>
            <option value="_ltp-desc">Price — high to low</option>
            <option value="_chng-desc">% Change — gainers first</option>
            <option value="_chng-asc">% Change — losers first</option>
            <option value="_ratingRank-desc">Rating — safest first</option>
            <option value="_maturity-asc">Maturity — soonest first</option>
            <option value="SYMBOL-asc">Symbol — A to Z</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl font-bold">Loading bonds data...</div>
          </div>
        ) : errorMsg ? (
          <p className="empty-state">{errorMsg}</p>
        ) : pagedBonds.length === 0 ? (
          <p className="empty-state">No bonds match this screen. Try loosening a filter.</p>
        ) : (
          <div className="card-grid">
            {pagedBonds.map((b) => {
              const chngClass = b._chng == null ? "" : b._chng >= 0 ? "chng-up" : "chng-down";
              const chngTxt = b._chng == null ? "—" : (b._chng >= 0 ? "+" : "") + b._chng.toFixed(2) + "%";
              const isWatched = watchlist.has(b._id);
              return (
                <div key={b._id} className="bond-card" onClick={() => openDrawer(b)}>
                  <div className="card-top">
                    <div>
                      <span className="symbol">{b.SYMBOL || "—"}</span>
                      <span className="isin">{b.ISIN || "—"}</span>
                    </div>
                    <button
                      className={`card-star ${isWatched ? "active" : ""}`}
                      onClick={(e) => toggleWatch(b._id, e)}
                      aria-label="Toggle watchlist"
                    >
                      {isWatched ? "★" : "☆"}
                    </button>
                  </div>
                  <div className="card-metrics">
                    <div className="metric">
                      <span className="m-label">Coupon</span>
                      <span className="m-value">{b._coupon != null ? b._coupon.toFixed(2) + "%" : "—"}</span>
                    </div>
                    <div className="metric">
                      <span className="m-label">LTP</span>
                      <span className="m-value">{fmtMoney(b._ltp)}</span>
                    </div>
                    <div className="metric">
                      <span className="m-label">% Chg</span>
                      <span className={`m-value ${chngClass}`}>{chngTxt}</span>
                    </div>
                    <div className="metric">
                      <span className="m-label">Rating</span>
                      <span className="m-value">
                        <span className={ratingPillClass(b._ratingBucket)}>
                          {b._ratingBucket === "unrated" ? "Unrated" : b["CREDIT RATING"] || b._ratingBucket}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="card-bottom">
                    <span className="maturity-txt">Matures {fmtMaturity(b._maturity)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination controls */}
        {!loading && !errorMsg && filteredBonds.length > 0 && (
          <div className="pager">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="ghost-btn"
              type="button"
            >
              ← Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="ghost-btn"
              type="button"
            >
              Next →
            </button>
          </div>
        )}
      </section>

      {/* Detail drawer aside */}
      <aside className={`drawer ${drawerOpen ? "open" : ""}`} aria-hidden={!drawerOpen}>
        <div className="drawer-backdrop" onClick={() => setDrawerOpen(false)} />
        <div className="drawer-panel">
          <button
            className="drawer-close"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>
          {selectedBond && (
            <>
              <p className="eyebrow">{selectedBond.SERIES ? `Series ${selectedBond.SERIES}` : "Listed bond"}</p>
              <h2>{selectedBond.SYMBOL || "—"}</h2>
              <p className="drawer-isin">{selectedBond.ISIN || "—"}</p>

              <div className="drawer-grid">
                <div>
                  <span className="label">Coupon rate</span>
                  <span className="value">{selectedBond._coupon != null ? selectedBond._coupon.toFixed(2) + "%" : "—"}</span>
                </div>
                <div>
                  <span className="label">Last traded price</span>
                  <span className="value">{fmtMoney(selectedBond._ltp)}</span>
                </div>
                <div>
                  <span className="label">Face value</span>
                  <span className="value">{selectedBond["FACE VALUE"] ? "₹" + selectedBond["FACE VALUE"] : "—"}</span>
                </div>
                <div>
                  <span className="label">Day change</span>
                  <span
                    className="value"
                    style={{
                      color:
                        selectedBond._chng == null
                          ? ""
                          : selectedBond._chng >= 0
                            ? "var(--teal)"
                            : "var(--red)",
                    }}
                  >
                    {selectedBond._chng == null ? "—" : (selectedBond._chng >= 0 ? "+" : "") + selectedBond._chng.toFixed(2) + "%"}
                  </span>
                </div>
                <div>
                  <span className="label">Volume</span>
                  <span className="value">{selectedBond["VOLUME  (Shares)"] || "—"}</span>
                </div>
                <div>
                  <span className="label">Traded value</span>
                  <span className="value">{selectedBond["VALUE   (₹ Crores)"] ? "₹" + selectedBond["VALUE   (₹ Crores)"] + " Cr" : "—"}</span>
                </div>
                <div>
                  <span className="label">Maturity date</span>
                  <span className="value">{fmtMaturity(selectedBond._maturity)}</span>
                </div>
                <div>
                  <span className="label">Years to maturity</span>
                  <span className="value">{drawerYearsToMaturity}</span>
                </div>
              </div>

              <div className="drawer-callout">
                <span className="label">Estimated current yield</span>
                <span className="value-lg">{drawerYield}</span>
                <p className="footnote">
                  Current yield = annual coupon ÷ last traded price. It ignores accrued interest and price-to-redemption — not the same as yield-to-maturity. Use it as a rough compass, not a quote.
                </p>
              </div>

              <div className="drawer-rating">
                <span className="label">Credit rating</span>
                <p>{selectedBond["CREDIT RATING"] && selectedBond["CREDIT RATING"].trim() ? selectedBond["CREDIT RATING"] : "Not rated by the agencies in this dataset"}</p>
                <p className="footnote">
                  {selectedBond["CREDIT RATING AGENCY"] ? "Rated by " + selectedBond["CREDIT RATING AGENCY"] : ""}
                </p>
              </div>

              <button
                className={`watch-btn ${watchlist.has(selectedBond._id) ? "active" : ""}`}
                type="button"
                onClick={() => toggleWatch(selectedBond._id)}
              >
                {watchlist.has(selectedBond._id) ? "★ In your watchlist" : "☆ Add to watchlist"}
              </button>
            </>
          )}
        </div>
      </aside>

    </div>
  );
}
