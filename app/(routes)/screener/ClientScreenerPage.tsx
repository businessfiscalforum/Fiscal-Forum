"use client";

import { useState, useEffect, useMemo } from "react";
import {
  FaChevronDown,
  FaInfoCircle,
} from "react-icons/fa";
import Link from "next/link";

export default function ClientScreenerPage() {

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
  const [activeScreenerFaq, setActiveScreenerFaq] = useState<number | null>(null);

  const SCREENER_PAGE_SIZE = 15;

  /* ============ LOAD SCREENER DATA DYNAMICALLY ============ */
  useEffect(() => {
    import("../reports/screener-data.js")
      .then((mod) => {
        setStocksData(mod.STOCKS_DATA || []);
      })
      .catch((err) => console.error("Failed to load screener data", err));

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

  return (
    <div className="min-h-screen bg-transparent text-[#111411] pt-24 pb-16 px-4 md:px-8">
      {/* ================= PAGE HEADER ================= */}
      <section className="section screener-embed-section max-w-7xl mx-auto" id="equity-screener">
        <div className="wrap" style={{ paddingBottom: '0' }}>
          <div className="section-head" style={{ marginBottom: '20px' }}>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#111411]">NSE Equity Screener</h1>
              <p className="text-gray-600 mt-2 text-sm md:text-base">Screen the NSE equity market smarter, compare opportunities, and make more informed investment decisions</p>
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

                <div id="screener-table-section" className="table-wrap in-view" style={{ border: '1px solid #111411' }}>
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Symbol</th>
                        <th>Company</th>
                        <th>Tier</th>
                        <th className="num-col">Market Cap (Cr)</th>
                        <th className="num-col">P/E</th>
                        <th className="num-col">ROE (%)</th>
                        <th className="num-col">ROCE (%)</th>
                        <th className="num-col">OPM (%)</th>
                        <th className="date-col">Listed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageItems.map(s => {
                        const isStarred = watchlist.has(s.sym);
                        const tierBadgeClass = `tier-${s.tier?.split(" ")[0] || "Micro"}`;
                        return (
                          <tr key={s.sym} className={highlightedStockSym === s.sym ? "highlighted-row" : ""} onClick={() => setScreenerSelectedStock(s)}>
                            <td onClick={(e) => e.stopPropagation()}>
                              <button className={`star-btn ${isStarred ? "active" : ""}`} onClick={() => toggleStar(s.sym)}>
                                {isStarred ? "★" : "☆"}
                              </button>
                            </td>
                            <td className="sym">
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
                            <td className="name">{s.name}</td>
                            <td>
                              <span className={`tier-badge ${tierBadgeClass}`}>{s.tier}</span>
                            </td>
                            <td className="num">{s.mcap !== null && s.mcap !== undefined ? s.mcap.toLocaleString("en-IN") : "—"}</td>
                            <td className="num">{s.pe !== null && s.pe !== undefined ? s.pe.toFixed(2) : "—"}</td>
                            <td className="num">{s.roe !== null && s.roe !== undefined ? s.roe.toFixed(2) + "%" : "—"}</td>
                            <td className="num">{s.roce !== null && s.roce !== undefined ? s.roce.toFixed(2) + "%" : "—"}</td>
                            <td className="num">{s.opm !== null && s.opm !== undefined ? s.opm.toFixed(2) + "%" : "—"}</td>
                            <td className="date">{s.listdt || "—"}</td>
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

                <div className="table-wrap in-view" style={{ border: '1px solid #111411' }}>
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Symbol</th>
                        <th>Company</th>
                        <th>Tier</th>
                        <th className="num-col">Market Cap (Cr)</th>
                        <th className="num-col">P/E</th>
                        <th className="num-col">ROE (%)</th>
                        <th className="num-col">ROCE (%)</th>
                        <th className="num-col">OPM (%)</th>
                        <th className="date-col">Listed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {watchlistStocks.map(s => {
                        const tierBadgeClass = `tier-${s.tier?.split(" ")[0] || "Micro"}`;
                        return (
                          <tr key={s.sym} onClick={() => setScreenerSelectedStock(s)}>
                            <td onClick={(e) => e.stopPropagation()}>
                              <button className="star-btn active" onClick={() => toggleStar(s.sym)}>
                                ★
                              </button>
                            </td>
                            <td className="sym">
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
                            <td className="name">{s.name}</td>
                            <td>
                              <span className={`tier-badge ${tierBadgeClass}`}>{s.tier}</span>
                            </td>
                            <td className="num">{s.mcap !== null && s.mcap !== undefined ? s.mcap.toLocaleString("en-IN") : "—"}</td>
                            <td className="num">{s.pe !== null && s.pe !== undefined ? s.pe.toFixed(2) : "—"}</td>
                            <td className="num">{s.roe !== null && s.roe !== undefined ? s.roe.toFixed(2) + "%" : "—"}</td>
                            <td className="num">{s.roce !== null && s.roce !== undefined ? s.roce.toFixed(2) + "%" : "—"}</td>
                            <td className="num">{s.opm !== null && s.opm !== undefined ? s.opm.toFixed(2) + "%" : "—"}</td>
                            <td className="date">{s.listdt || "—"}</td>
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
            <div
              className="screener-modal-overlay modal-overlay open"
              onClick={() => setScreenerSelectedStock(null)}
              style={{ zIndex: 200, paddingTop: '100px', paddingBottom: '40px', alignItems: 'flex-start', overflowY: 'auto' }}
            >
              <div className="modal" onClick={(e) => e.stopPropagation()} style={{ border: '1px solid #111411', marginTop: '20px' }}>
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
                  <div className="chip-row">
                    {screenerSelectedStock.indices?.length > 0 ? (
                      screenerSelectedStock.indices.map((ix: string) => (
                        <span key={ix} className="chip active">
                          {ix.replace("NIFTY", "NIFTY ")}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">Broad market list / Micro cap</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Link
                    href={`https://www.nseindia.com/get-quotes/equity?symbol=${encodeURIComponent(screenerSelectedStock.sym)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-3 text-center font-bold bg-white text-black border border-[#111411] rounded-xl hover:bg-gray-100 transition-colors text-xs sm:text-sm flex items-center justify-center gap-1"
                  >
                    View on NSE ↗
                  </Link>
                  <Link
                    href={`https://www.screener.in/company/${encodeURIComponent(screenerSelectedStock.sym)}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-3 text-center font-bold bg-white text-black border border-[#111411] rounded-xl hover:bg-gray-100 transition-colors text-xs sm:text-sm flex items-center justify-center gap-1"
                  >
                    View on Screener ↗
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleStar(screenerSelectedStock.sym)}
                    className={`px-3 py-3 border border-[#111411] rounded-xl font-bold text-xs sm:text-sm transition-all ${
                      watchlist.has(screenerSelectedStock.sym)
                        ? "bg-amber-100 text-amber-900 border-amber-400"
                        : "bg-white text-black hover:bg-gray-100"
                    }`}
                  >
                    {watchlist.has(screenerSelectedStock.sym) ? "★ Starred" : "☆ Watchlist"}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ================= SECTION: FREQUENTLY ASKED QUESTIONS ================= */}
      <section className="section screener-faq-section max-w-7xl mx-auto" style={{ borderTop: '1px solid rgba(17,20,17,0.1)', paddingTop: '40px', paddingBottom: '60px' }}>
        <div className="wrap">
          <div className="theme-faq-container" style={{ marginTop: '0px', paddingTop: '0px', borderTop: 'none' }}>
            <div className="theme-faq-kicker">
              <span className="theme-faq-kicker-line"></span>
              FAQS
            </div>
            <div className="theme-faq-heading">
              <h2>Frequently Asked <em>Questions</em></h2>
              <p>Everything you need to know about using the NSE Stock Screener.</p>
            </div>

            <div className="theme-faq-accordion">
              {[
                {
                  q: "What is a Stock Screener?",
                  a: "A stock screener helps you filter and discover stocks based on market data, financial ratios, and performance indicators."
                },
                {
                  q: "How can I filter stocks by market cap?",
                  a: "Choose Large Cap, Mid Cap, Small Cap, or Micro Cap to narrow your search by company size."
                },
                {
                  q: "Can I filter stocks using financial ratios?",
                  a: "Yes. Use P/E Ratio, ROE, and ROCE minimum and maximum values to find stocks matching your preferred criteria."
                },
                {
                  q: "What other filters are available?",
                  a: "You can filter by market capitalization, quarterly operating profit margin (OPM), broad market indices, and sectoral indices."
                },
                {
                  q: "How can I quickly find a particular stock?",
                  a: "Search by stock symbol, company name, or ISIN. You can also sort results by name and clear all filters to start again."
                }
              ].map((faq, idx) => {
                const isOpen = activeScreenerFaq === idx;
                return (
                  <div key={idx} className={`theme-faq-item ${isOpen ? "open" : ""}`}>
                    <button
                      className="theme-faq-trigger"
                      onClick={() => setActiveScreenerFaq(isOpen ? null : idx)}
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
