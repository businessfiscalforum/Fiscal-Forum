"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Constant annual return rate for illustrative purposes
const RATE = 0.12;

interface VersusDetails {
  title: string;
  points: string[];
}

interface Jewel {
  name: string;
  mapsTo: string;
  img: string;
  budget: number;
  left: VersusDetails;
  right: VersusDetails;
  routes: string[];
}

const JEWELS: Jewel[] = [
  {
    name: "Gold Necklace",
    mapsTo: "Gold Investing",
    img: "/jewel-gold.jpg",
    budget: 100000,
    left: {
      title: "Jewellery",
      points: [
        "12–25% making charges, non-refundable",
        "3% GST on purchase",
        "Resale value often below market price",
        "Storage & insurance to worry about",
      ],
    },
    right: {
      title: "Investment Exposure to Gold",
      points: [
        "Near-zero making charges",
        "Buy in fractions — start from as little as ₹1",
        "24K purity, insured & vaulted on your behalf",
        "Fully liquid, sellable on exchange anytime",
        "No locker needed — held entirely digitally",
      ],
    },
    routes: ["Gold"],
  },
  {
    name: "Silver Jewellery",
    mapsTo: "Silver Investing",
    img: "/jewel-silver.jpg",
    budget: 50000,
    left: {
      title: "Jewellery",
      points: [
        "High making charges relative to metal value",
        "Tarnishes, needs upkeep",
        "Illiquid — hard to sell at fair price",
        "Purely aesthetic return",
      ],
    },
    right: {
      title: "Investment Exposure to Silver",
      points: [
        "Silver ETFs track spot price directly",
        "Traded on exchange like a stock",
        "No storage or purity concerns",
        "Used in industry too — solar, electronics demand",
      ],
    },
    routes: ["Silver"],
  },
  {
    name: "Diamond Jewellery",
    mapsTo: "Luxury / Consumer Industry",
    img: "/jewel-diamond.jpg",
    budget: 150000,
    left: {
      title: "Jewellery",
      points: [
        "Value driven by cut, clarity, brand — hard to price",
        "Resale typically well below retail",
        "No income or yield while you own it",
        "Emotional, not financial, asset",
      ],
    },
    right: {
      title: "The Businesses Behind It",
      points: [
        "Listed jewellery & luxury retail companies",
        "Revenue from design, retail margin, branding",
        "You can own a slice of the business, not just the stone",
        "Dividends possible, unlike a diamond in a locker",
      ],
    },
    routes: ["Diamond"],
  },
];

interface StorePair {
  brand: string;
  stock: string;
  domain: string;
}

interface Store {
  title: string;
  category: string;
  img: string;
  pairs: StorePair[];
}

const STORES: Store[] = [
  {
    title: "Beauty Store",
    category: "Beauty & Personal Care",
    img: "/beauty.jpg",
    pairs: [
      { brand: "Nykaa", stock: "FSN E-Commerce Ventures", domain: "nykaa.com" },
      { brand: "Lakmé", stock: "Hindustan Unilever", domain: "lakmeindia.com" },
      { brand: "Mamaearth", stock: "Honasa Consumer", domain: "mamaearth.in" },
      { brand: "Lotus", stock: "Marico", domain: "lotusherbals.com" },
      { brand: "Colorbar", stock: "Godrej Consumer Products", domain: "colorbarcosmetics.com" },
      { brand: "VLCC", stock: "Dabur India", domain: "vlccwellness.com" },
      { brand: "Biotique", stock: "Colgate-Palmolive India", domain: "biotique.com" },
    ],
  },
  {
    title: "Fashion Store",
    category: "Retail & Textiles",
    img: "/fashion.jpg",
    pairs: [
      { brand: "Zara", stock: "Trent Ltd", domain: "zara.com" },
      { brand: "H&M", stock: "KPR Mill", domain: "hm.com" },
      { brand: "Manyavar", stock: "Vedant Fashions", domain: "manyavar.com" },
      { brand: "Biba", stock: "Arvind Ltd", domain: "biba.in" },
      { brand: "Pantaloons", stock: "Aditya Birla Fashion & Retail", domain: "pantaloons.com" },
      { brand: "Louis Philippe", stock: "Aditya Birla Fashion & Retail", domain: "louisphilippe.com" },
      { brand: "Allen Solly", stock: "Aditya Birla Fashion & Retail", domain: "allensolly.com" },
    ],
  },
  {
    title: "Jewellery Store",
    category: "Gold & Jewellery Businesses",
    img: "/jewellery.jpg",
    pairs: [
      { brand: "Tanishq", stock: "Titan Company", domain: "tanishq.co.in" },
      { brand: "Malabar", stock: "Thangamayil Jewellery", domain: "malabargoldanddiamonds.com" },
      { brand: "Kalyan", stock: "Kalyan Jewellers", domain: "kalyanjewellers.net" },
      { brand: "Senco", stock: "Senco Gold", domain: "sencogoldanddiamonds.com" },
      { brand: "Tribhovandas Bhimji Zaveri", stock: "TBZ Ltd", domain: "tbztheoriginal.com" },
    ],
  },
  {
    title: "Coffee / Food",
    category: "FMCG & Consumer",
    img: "/coffee.jpg",
    pairs: [
      { brand: "Starbucks", stock: "Tata Consumer Products", domain: "starbucks.in" },
      { brand: "Café Coffee Day", stock: "Coffee Day Enterprises", domain: "cafecoffeeday.com" },
      { brand: "Domino's", stock: "Jubilant FoodWorks", domain: "dominos.co.in" },
      { brand: "McDonald's", stock: "Westlife Foodworld", domain: "mcdonaldsindia.com" },
      { brand: "Britannia", stock: "Britannia Industries", domain: "britannia.co.in" },
      { brand: "Amul", stock: "Varun Beverages", domain: "amul.com" },
      { brand: "Nestlé", stock: "Nestlé India", domain: "nestle.in" },
    ],
  },
  {
    title: "Electronics Store",
    category: "Technology & Manufacturing",
    img: "/electronics.jpg",
    pairs: [
      { brand: "Dixon", stock: "Dixon Technologies", domain: "dixoninfo.com" },
      { brand: "Voltas", stock: "Voltas Ltd", domain: "voltas.com" },
      { brand: "Havells", stock: "Havells India", domain: "havells.com" },
      { brand: "Apple", stock: "Kaynes Technology", domain: "apple.com" },
      { brand: "Samsung", stock: "Amber Enterprises", domain: "samsung.com" },
      { brand: "Dell", stock: "Syrma SGS", domain: "dell.com" },
      { brand: "HP", stock: "PG Electroplast", domain: "hp.com" },
    ],
  },
  {
    title: "Travel Counter",
    category: "Aviation & Travel",
    img: "/travel.jpg",
    pairs: [
      { brand: "IndiGo", stock: "InterGlobe Aviation", domain: "goindigo.in" },
      { brand: "Air India", stock: "TAAL Enterprises", domain: "airindia.com" },
      { brand: "IRCTC", stock: "IRCTC", domain: "irctc.co.in" },
      { brand: "MakeMyTrip", stock: "Thomas Cook India", domain: "makemytrip.com" },
      { brand: "EaseMyTrip", stock: "Easy Trip Planners", domain: "easemytrip.com" },
      { brand: "SpiceJet", stock: "SpiceJet Ltd", domain: "spicejet.com" },
    ],
  },
];

interface Dream {
  label: string;
  amount: number;
  years: number;
  img: string;
}

const DREAMS: Dream[] = [
  { label: "Home", amount: 3000000, years: 10, img: "/dream-home.jpg" },
  { label: "Car", amount: 1000000, years: 4, img: "/dream-car.jpg" },
  { label: "Travel", amount: 500000, years: 3, img: "/dream-travel.jpg" },
  { label: "Jewellery", amount: 200000, years: 2, img: "/dream-jewellery.jpg" },
  { label: "Education", amount: 1500000, years: 6, img: "/dream-education.jpg" },
  { label: "Business / Career", amount: 1000000, years: 5, img: "/dream-business.jpg" },
];

interface CartCategory {
  label: string;
  sector: string;
  route: string;
  stocks: string[];
}

const CART_CATEGORIES: CartCategory[] = [
  {
    label: "Beauty",
    sector: "Consumer / Beauty Industry",
    route: "Consumer Stocks",
    stocks: ["Hindustan Unilever", "FSN E-Commerce (Nykaa)", "Godrej Consumer Products", "Marico", "Emami"],
  },
  {
    label: "Fashion",
    sector: "Retail / Textiles",
    route: "Consumer Stocks",
    stocks: ["Trent Ltd", "Aditya Birla Fashion & Retail", "Page Industries", "Raymond", "Vedant Fashions"],
  },
  {
    label: "Electronics",
    sector: "Technology Manufacturing",
    route: "Stocks",
    stocks: ["Dixon Technologies", "Havells India", "Voltas", "Amber Enterprises", "Blue Star"],
  },
  {
    label: "FMCG",
    sector: "FMCG Companies",
    route: "Consumer Stocks",
    stocks: ["Hindustan Unilever", "ITC", "Nestle India", "Britannia Industries", "Dabur India"],
  },
  {
    label: "Jewellery",
    sector: "Jewellery Companies + Gold",
    route: "Commodities",
    stocks: ["Titan Company", "Kalyan Jewellers", "Rajesh Exports", "Senco Gold", "PC Jeweller"],
  },
  {
    label: "Travel",
    sector: "Aviation & Travel",
    route: "Stocks",
    stocks: ["InterGlobe Aviation (IndiGo)", "IRCTC", "Thomas Cook India", "Easy Trip Planners", "SpiceJet"],
  },
  {
    label: "Food & Cafés",
    sector: "QSR & Food Companies",
    route: "Consumer Stocks",
    stocks: ["Jubilant FoodWorks", "Devyani International", "Westlife Foodworld", "Sapphire Foods", "Varun Beverages"],
  },
  {
    label: "Home Décor",
    sector: "Home & Building Materials",
    route: "Consumer Stocks",
    stocks: ["Asian Paints", "Pidilite Industries", "Century Plyboards", "Greenpanel Industries", "Cera Sanitaryware"],
  },
];

interface ClosetGroup {
  industry: string;
  companies: string[];
}

interface ClosetItem {
  name: string;
  maps: string;
  img: string;
  tagline: string;
  body: string;
  tags: string[];
  routes: string[];
  groups: ClosetGroup[];
}

const CLOSET_ITEMS: ClosetItem[] = [
  {
    name: "Gold Ring",
    maps: "Gold / Commodities",
    img: "/gold-ring.jpg",
    tagline: "Your ring finger has a portfolio on it.",
    body: "Gold jewellery ties up money in metal plus making charges. Digital gold and Gold ETFs give the same price exposure — fully liquid, no locker required.",
    tags: ["Digital Gold", "Gold ETFs"],
    routes: ["Gold"],
    groups: [
      { industry: "Gems & Jewellery Retail / Luxury Retail", companies: ["Titan", "Kalyan Jewellers", "Senco Gold", "PC Jeweller"] },
      { industry: "Bullion & Precious Metals", companies: ["Rajesh Exports"] },
      { industry: "Banking (Gold Loans)", companies: ["Muthoot Finance", "Manappuram Finance"] },
    ],
  },
  {
    name: "Handbag",
    maps: "Consumer / Luxury Stocks",
    img: "/handbag.jpg",
    tagline: "Carry the brand. Consider owning it.",
    body: "The retail and luxury companies behind the bags you buy are listed on Indian and global exchanges — with real revenue from the margin on every sale.",
    tags: ["Retail", "Luxury Consumer"],
    routes: ["Consumer Stocks"],
    groups: [
      { industry: "Leather & Footwear", companies: ["Bata India", "Metro Brands", "Relaxo"] },
      { industry: "Retail & Luxury Goods", companies: ["Aditya Birla Fashion", "Trent"] },
      { industry: "Textiles", companies: ["Page Industries"] },
      { industry: "Travel Goods (crossover)", companies: ["Safari Industries"] },
    ],
  },
  {
    name: "Cosmetics",
    maps: "Beauty / FMCG Stocks",
    img: "/cosmetics.jpg",
    tagline: "Your makeup shelf has an investment story.",
    body: "Discover the companies, industries and economics behind the beauty products you buy every month — from FMCG majors to fast-growing beauty retailers.",
    tags: ["FMCG", "Beauty & Personal Care"],
    routes: ["Consumer Stocks"],
    groups: [
      { industry: "FMCG & Personal Care", companies: ["Hindustan Unilever", "Dabur", "Emami", "Godrej Consumer", "Marico", "Colgate-Palmolive India"] },
      { industry: "Retail / E-commerce", companies: ["Nykaa (FSN E-Commerce)"] },
    ],
  },
  {
    name: "Dress",
    maps: "Textile / Retail Stocks",
    img: "/dress.jpg",
    tagline: "The fabric of the fashion industry.",
    body: "Apparel brands sit on top of listed textile manufacturers and retail chains — from sourcing fabric to selling it on the rail.",
    tags: ["Textiles", "Apparel Retail"],
    routes: ["Consumer Stocks"],
    groups: [
      { industry: "Textile, Cotton & Synthetic Fibres", companies: ["Arvind Ltd", "Raymond", "Vardhman Textiles", "KPR Mill", "Page Industries"] },
      { industry: "Retail & Fashion Brands", companies: ["Trent", "Aditya Birla Fashion"] },
    ],
  },
  {
    name: "Smartphone",
    maps: "Technology / Electronics Stocks",
    img: "/smartphone.jpg",
    tagline: "The device in your hand, the industry in your portfolio.",
    body: "Component makers, contract manufacturers and electronics retailers form a whole investable ecosystem behind every phone upgrade.",
    tags: ["Electronics Manufacturing", "Technology"],
    routes: ["Stocks"],
    groups: [
      { industry: "EMS & Semiconductors", companies: ["Dixon Technologies", "Kaynes Technology", "Syrma SGS", "Amber Enterprises"] },
      { industry: "Software & Design Services", companies: ["Tata Elxsi"] },
      { industry: "Telecom & Internet Services", companies: ["Bharti Airtel", "Reliance Industries (Jio)"] },
    ],
  },
  {
    name: "Suitcase",
    maps: "Travel / Aviation Stocks",
    img: "/suitcase.jpg",
    tagline: "Pack for the trip. Track the industry.",
    body: "Airlines, travel platforms and hospitality companies move with the same wanderlust that fills your suitcase.",
    tags: ["Aviation", "Travel Platforms"],
    routes: ["Stocks"],
    groups: [
      { industry: "Luggage Manufacturing (Plastics/Retail)", companies: ["VIP Industries", "Safari Industries"] },
      { industry: "Aviation & Travel Platforms", companies: ["InterGlobe Aviation (IndiGo)", "EaseMyTrip", "Thomas Cook India"] },
      { industry: "Hospitality", companies: ["Indian Hotels"] },
    ],
  },
  {
    name: "Home Key",
    maps: "Real Estate / REITs",
    img: "/home-key.jpg",
    tagline: "You don't need to buy a building to own real estate.",
    body: "Real Estate Investment Trusts (REITs) let you hold a slice of rent-generating commercial property — without a home loan.",
    tags: ["REITs", "Real Estate Education"],
    routes: ["ETFs"],
    groups: [
      { industry: "Real Estate & Construction", companies: ["DLF", "Godrej Properties", "Oberoi Realty", "Prestige Estates"] },
      { industry: "Cement & Building Materials", companies: ["Ultratech Cement", "Asian Paints"] },
      { industry: "Home Loans", companies: ["HDFC Bank"] },
    ],
  },
  {
    name: "Credit Card",
    maps: "Credit & Card Comparison",
    img: "/credit-card.jpg",
    tagline: "Know the cost of convenience.",
    body: "Understanding interest rates, reward structures and repayment cycles is its own financial skill — before it becomes a debt to manage.",
    tags: ["Interest Rates", "Rewards", "Repayment Cycles"],
    routes: ["Mutual Funds"],
    groups: [
      { industry: "Banks / Payment Networks / Digital Payments", companies: ["HDFC Bank", "ICICI Bank", "Axis Bank", "IndusInd Bank", "Kotak Mahindra Bank"] },
      { industry: "NBFCs & Consumer Lending", companies: ["SBI Cards", "Bajaj Finance"] },
    ],
  },
];

const ROUTE_INFO: Record<string, { body: string; tags: string[] }> = {
  "Mutual Funds": {
    body: "Pooled funds run by professional managers, spread across many companies. A common way to start investing in equity or debt without picking individual stocks.",
    tags: ["Equity MF", "Debt MF", "Hybrid MF", "ELSS (tax-saving)"],
  },
  "Stocks": {
    body: "Buying a stock makes you a part-owner of that company. Higher potential reward, higher volatility — best suited to money you won't need for several years.",
    tags: ["Direct Equity", "Index Funds", "Blue-chip stocks"],
  },
  "Gold": {
    body: "Digital Gold, Gold ETFs and Gold Mutual Funds all give you gold's price movement without locker keys or making charges.",
    tags: ["Gold ETFs", "Gold Mutual Funds", "Digital Gold"],
  },
  "Goal Portfolio": {
    body: "A goal portfolio blends equity, debt and gold in a ratio that matches how many years you have — more growth-focused for long goals, more stable for near-term ones.",
    tags: ["Equity", "Debt", "Gold"],
  },
  "Consumer Stocks": {
    body: "Publicly listed companies behind everyday brands you already shop from — FMCG, retail, beauty and fashion majors.",
    tags: ["FMCG", "Retail", "Beauty & Personal Care"],
  },
  "ETFs": {
    body: "Exchange-Traded Funds trade like a stock but hold a basket of assets — a low-cost way to get broad exposure in one purchase.",
    tags: ["Index ETFs", "Sector ETFs", "Gold ETFs"],
  },
  "Commodities": {
    body: "Raw materials like gold and silver, tradeable through ETFs, bonds or futures — used mainly for diversification, not core growth.",
    tags: ["Gold", "Silver", "Commodity ETFs"],
  },
};

const ROUTE_LABELS: Record<string, string> = {
  "Goal Portfolio": "Equity & Stock Market",
};

const GOLD_OPTIONS = [
  {
    title: "Gold ETFs",
    body: "Units traded on the stock exchange that track the domestic price of gold. You need a demat account to buy and sell them easily, just like regular company shares.",
  },
  {
    title: "Gold Mutual Funds",
    body: "Funds managed by asset companies that invest in Gold ETFs on your behalf. Great for setting up small, regular monthly investments (SIPs) without needing a trading account.",
  },
  {
    title: "Digital Gold",
    body: "Offered by various apps and platforms, letting you buy tiny fractions of 24K gold that stay stored in insured vaults — start with as little as ₹1.",
  },
  {
    title: "Electronic Gold Receipts (EGRs)",
    body: "Electronic units traded on stock exchanges representing physical gold, with the option to convert them back into real gold whenever you like.",
  },
];

const SILVER_OPTIONS = [
  {
    title: "Silver Exchange-Traded Funds (ETFs)",
    points: [
      "Traded like stocks on the NSE and BSE during market hours.",
      "Each unit represents high-purity physical silver (99.9%) stored in secure vaults by a custodian.",
      "Requires an active demat and trading account.",
    ],
  },
  {
    title: "Silver Fund of Funds (FoFs)",
    points: [
      "Mutual funds that invest directly in Silver ETFs.",
      "Allows you to set up regular Systematic Investment Plans (SIPs) without needing a demat account.",
    ],
  },
  {
    title: "Silver Futures Contracts",
    points: [
      "Traded on the Multi Commodity Exchange (MCX).",
      "High-risk, leveraged contracts where you bet on the future price movement of silver.",
      "Suited for active, experienced commodity traders rather than long-term buy-and-hold investors.",
    ],
  },
  {
    title: "Silver Mining & Producer Stocks",
    points: [
      "Buying shares of domestic companies that extract silver or produce it as a byproduct, such as Hindustan Zinc or Vedanta Limited.",
      "Gives indirect business exposure to metal pricing and company performance.",
    ],
  },
];

const DIAMOND_OPTIONS = [
  {
    title: "Equity and Company Stocks",
    points: [
      "<b>Jewelry Retailers:</b> Invest in major consumer brands with heavy diamond segments like Titan Company or Kalyan Jewellers.",
      "<b>Processing &amp; Exports:</b> Buy shares of B2B diamond processing and lab-grown manufacturing firms like Goldiam International or Asian Star Company.",
    ],
  },
];

function monthlySIP(fv: number, years: number, rate: number): number {
  const i = rate / 12;
  const n = years * 12;
  if (n <= 0) return 0;
  const factor = ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  return fv / factor;
}

function inr(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

function allocationFor(years: number) {
  if (years < 3) {
    return [
      { l: "Debt / Liquid Funds", v: 60 },
      { l: "Gold", v: 20 },
      { l: "Equity Mutual Funds", v: 20 },
    ];
  }
  if (years <= 7) {
    return [
      { l: "Equity Mutual Funds", v: 50 },
      { l: "Debt Funds", v: 30 },
      { l: "Gold", v: 20 },
    ];
  }
  return [
    { l: "Stocks & Equity Funds", v: 65 },
    { l: "Mutual Funds", v: 25 },
    { l: "Gold", v: 10 },
  ];
}

export default function ForWomenClientPage() {
  // --- State Hooks ---
  const [selectedJewel, setSelectedJewel] = useState<number | null>(null);
  const [selectedDream, setSelectedDream] = useState<number>(2); // Default to Travel (index 2)
  const [dreamAmount, setDreamAmount] = useState<number>(DREAMS[2].amount);
  const [dreamYears, setDreamYears] = useState<number>(DREAMS[2].years);

  const [selectedCart, setSelectedCart] = useState<Set<number>>(new Set());
  const [cartSpend, setCartSpend] = useState<string>("");

  const [flippedCloset, setFlippedCloset] = useState<number | null>(null);

  // Modal Control States
  const [activeModal, setActiveModal] = useState<
    "route" | "gold" | "silver" | "diamond" | "store" | null
  >(null);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalTags, setModalTags] = useState<string[]>([]);
  const [selectedStoreIdx, setSelectedStoreIdx] = useState<number>(0);

  // --- Scroll Reveal Effect ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    const revealElements = document.querySelectorAll(".reveal-pop");
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selectedJewel, selectedDream, selectedCart, flippedCloset]);

  // Handle route detail clicks
  const triggerRoute = (name: string) => {
    if (name === "Gold") {
      setActiveModal("gold");
    } else if (name === "Silver") {
      setActiveModal("silver");
    } else if (name === "Diamond") {
      setActiveModal("diamond");
    } else {
      const info = ROUTE_INFO[name] || { body: "", tags: [] };
      setModalTitle(name);
      setModalBody(info.body);
      setModalTags(info.tags);
      setActiveModal("route");
    }
  };

  // Helper to generate Explore route CTA buttons
  const renderRouteButtons = (names: string[]) => {
    return names.map((n) => {
      const isPrimary = n === "Stocks" || n === "Consumer Stocks";
      return (
        <button
          key={n}
          type="button"
          className={`btn ${isPrimary ? "btn-primary" : "btn-gold"}`}
          onClick={() => triggerRoute(n)}
        >
          Explore {ROUTE_LABELS[n] || n} →
        </button>
      );
    });
  };

  // Handle Dream Goal Click presets
  const handleSelectDream = (idx: number) => {
    setSelectedDream(idx);
    setDreamAmount(DREAMS[idx].amount);
    setDreamYears(DREAMS[idx].years);
  };

  // Handle Shopping Cart portfolio categories toggles
  const handleCartCategoryToggle = (idx: number, checked: boolean) => {
    const next = new Set(selectedCart);
    if (checked) {
      next.add(idx);
    } else {
      next.delete(idx);
    }
    setSelectedCart(next);
  };

  // Handle Closet cubby click flips
  const handleClosetClick = (idx: number) => {
    if (flippedCloset === idx) {
      setFlippedCloset(null);
    } else {
      setFlippedCloset(idx);
    }
  };

  // Calculations for Dream Life Portfolio
  const sipValue = monthlySIP(dreamAmount, dreamYears, RATE);
  const dreamAllocation = allocationFor(dreamYears);

  // Calculations for Shopping Cart Portfolio
  const spendNum = parseFloat(cartSpend) || 0;
  const tenPctSpend = spendNum * 0.1;

  return (
    <>
      {/* ============ HERO SECTION ============ */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-top">
            <span className="eyebrow">NIVESH SAKHI</span>
            <h1>
              Invest India, <em>Her Way</em>.
            </h1>
            <p className="lede">
              Welcome to your personal financial sandbox. Every asset you wear, brand you shop, and dream you plan rests on top of a massive financial ecosystem. Let&apos;s make it work for you.
            </p>
          </div>

          <div className="goal-question">SELECT A GOAL TO PLAN YOUR ROUTE:</div>
          <div className="goal-grid">
            {DREAMS.map((d, idx) => (
              <button
                key={d.label}
                type="button"
                className={`goal-card ${selectedDream === idx ? "active" : ""}`}
                onClick={() => handleSelectDream(idx)}
              >
                <span className="goal-emoji">
                  {idx === 0 && "🏠"}
                  {idx === 1 && "🚗"}
                  {idx === 2 && "✈️"}
                  {idx === 3 && "💍"}
                  {idx === 4 && "🎓"}
                  {idx === 5 && "💼"}
                </span>
                <span className="goal-label">{d.label}</span>
              </button>
            ))}
          </div>

          <div className={`goal-result ${selectedDream !== null ? "show" : ""}`}>
            <div className="goal-result-head">
              <div>
                <span className="eyebrow" style={{ color: "var(--yellow-200)" }}>
                  ESTIMATED MONTHLY INVESTMENT
                </span>
                <div className="goal-result-figure">{inr(sipValue)}</div>
              </div>
              <div className="goal-inputs">
                <div className="field">
                  <label>Goal Amount (₹)</label>
                  <input
                    type="number"
                    value={dreamAmount}
                    onChange={(e) => setDreamAmount(parseFloat(e.target.value) || 0)}
                    step="10000"
                  />
                </div>
                <div className="field">
                  <label>Time (Years)</label>
                  <input
                    type="number"
                    value={dreamYears}
                    onChange={(e) => setDreamYears(Math.max(1, parseFloat(e.target.value) || 1))}
                    min="1"
                    max="30"
                  />
                </div>
              </div>
            </div>

            <div className="allocation">
              {dreamAllocation.map((alloc) => (
                <span className="chip" key={alloc.l}>
                  {alloc.l} <b>{alloc.v}%</b>
                </span>
              ))}
            </div>

            <div className="route-buttons">
              {renderRouteButtons(["Mutual Funds", "Goal Portfolio"])}
            </div>

            <p className="assumption">
              *Calculated assuming an illustrative return of 12% p.a. Compounded monthly. Actual returns will vary.
            </p>
          </div>
        </div>
      </section>

      {/* ============ JEWELLERY BOX ============ */}
      <section className="jewel-section" id="jewellery">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">01. JEWELLERY BOX</span>
            <h2>You already own gold. Now make it work.</h2>
            <p>
              Every piece in your box has a financial twin. Tap one to see what it means as an investment, not just an heirloom.
            </p>
          </div>

          <div className="jewel-picker" id="jewelPicker">
            {JEWELS.map((j, idx) => (
              <div
                key={j.name}
                className={`jewel-item reveal-pop ${selectedJewel === idx ? "active" : ""}`}
              >
                <div className="jewel-photo" style={{ position: "relative", height: "150px" }}>
                  <Image
                    src={j.img}
                    alt={j.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="name">{j.name}</div>
                <div className="maps-to">→ {j.mapsTo}</div>
                <button
                  type="button"
                  className="open-it-btn"
                  onClick={() => setSelectedJewel(idx)}
                >
                  Open it →
                </button>
              </div>
            ))}
          </div>

          {selectedJewel !== null && (
            <div className="jewel-panel show">
              <span className="eyebrow" id="jewelBudgetLabel">
                {inr(JEWELS[selectedJewel].budget)} TO SPEND ON{" "}
                {JEWELS[selectedJewel].name.toUpperCase()}
              </span>
              <div className="jewel-panel-amount">
                {inr(JEWELS[selectedJewel].budget)}
              </div>
              <div className="versus">
                <div className="versus-card" id="jewelLeft">
                  <h4>{JEWELS[selectedJewel].left.title}</h4>
                  <ul>
                    {JEWELS[selectedJewel].left.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div className="vs">vs.</div>
                <div className="versus-card gold-side" id="jewelRight">
                  <h4>{JEWELS[selectedJewel].right.title}</h4>
                  <ul>
                    {JEWELS[selectedJewel].right.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="jewel-cta">
                {renderRouteButtons(JEWELS[selectedJewel].routes)}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============ SHOPPING STREET ============ */}
      <section className="street-section" id="street">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">02. SHOPPING STREET</span>
            <h2>The mall you shop in is also a market you can invest in.</h2>
            <p>
              Every storefront sits on top of a listed business. Tap a store to see the real brands you shop from — and the actual stocks listed on the NSE/BSE behind them.
            </p>
          </div>

          <div className="street-grid" id="streetGrid">
            {STORES.map((s, idx) => (
              <div key={s.title} className="store-card reveal-pop">
                <div className="store-photo" style={{ position: "relative" }}>
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                    priority={idx < 3}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setSelectedStoreIdx(idx);
                    setActiveModal("store");
                  }}
                >
                  Explore {s.title} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DREAM LIFE PORTFOLIO ============ */}
      <section className="dream-section" id="dream">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">03. DREAM LIFE PORTFOLIO</span>
            <h2>Pick what you want. We&apos;ll price the monthly cost of getting there.</h2>
            <p>This isn&apos;t a wishlist — it&apos;s a plan with a number attached.</p>
          </div>

          <div className="dream-grid" id="dreamGrid">
            {DREAMS.map((d, idx) => (
              <button
                key={d.label}
                type="button"
                className={`dream-item reveal-pop ${selectedDream === idx ? "active" : ""}`}
                onClick={() => handleSelectDream(idx)}
              >
                <div className="dream-photo" style={{ position: "relative" }}>
                  <Image
                    src={d.img}
                    alt={d.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="label">{d.label}</div>
              </button>
            ))}
          </div>

          <div className="dream-panel show">
            <div className="dream-panel-grid">
              <div>
                <span className="eyebrow">GOAL: {DREAMS[selectedDream].label.toUpperCase()}</span>
                <div className="goal-inputs" style={{ marginTop: "12px" }}>
                  <div className="field">
                    <label style={{ color: "var(--gold-deep)" }}>Goal amount (₹)</label>
                    <input
                      type="number"
                      value={dreamAmount}
                      onChange={(e) => setDreamAmount(parseFloat(e.target.value) || 0)}
                      step="10000"
                      style={{
                        color: "var(--plum)",
                        background: "var(--pink-50)",
                        borderColor: "var(--line)",
                      }}
                    />
                  </div>
                  <div className="field">
                    <label style={{ color: "var(--gold-deep)" }}>Time (years)</label>
                    <input
                      type="number"
                      value={dreamYears}
                      onChange={(e) => setDreamYears(Math.max(1, parseFloat(e.target.value) || 1))}
                      min="1"
                      max="30"
                      style={{
                        color: "var(--plum)",
                        background: "var(--pink-50)",
                        borderColor: "var(--line)",
                      }}
                    />
                  </div>
                </div>
                <div style={{ marginTop: "18px" }}>
                  <div className="dream-calc-line">
                    <span>Goal</span>
                    <b>{inr(dreamAmount)}</b>
                  </div>
                  <div className="dream-calc-line">
                    <span>Time</span>
                    <b>{dreamYears} years</b>
                  </div>
                  <div className="dream-calc-line">
                    <span>Assumed return</span>
                    <b>12% p.a.</b>
                  </div>
                </div>
                <div className="route-buttons" style={{ marginTop: "20px" }}>
                  {renderRouteButtons(["Mutual Funds", "Goal Portfolio"])}
                </div>
              </div>
              <div className="dream-result-box">
                <span className="small result-label">YOUR ESTIMATED MONTHLY INVESTMENT</span>
                <div className="amount">{inr(sipValue)}</div>
                <span className="small" style={{ marginTop: "14px" }}>
                  Suggested mix:{" "}
                  {dreamAllocation.map((a) => `${a.l} ${a.v}%`).join(" · ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SHOPPING CART PORTFOLIO ============ */}
      <section className="cart-section" id="cart">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">04. SHOPPING CART</span>
            <h2>What&apos;s usually in your cart?</h2>
            <p>Select the categories you actually spend on. We&apos;ll map them to the industries behind them.</p>
          </div>

          <div className="cart-layout">
            <div className="cart-options" id="cartOptions">
              {CART_CATEGORIES.map((c, idx) => (
                <label
                  key={c.label}
                  className={`cart-check reveal-pop ${selectedCart.has(idx) ? "checked" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCart.has(idx)}
                    onChange={(e) => handleCartCategoryToggle(idx, e.target.checked)}
                  />
                  <span>{c.label}</span>
                </label>
              ))}
            </div>

            <div className="cart-preview">
              <h3>Your Shopping Cart Portfolio</h3>
              <div className="cart-rows" id="cartRows">
                {selectedCart.size === 0 ? (
                  <div className="cart-empty">Select a category to build your portfolio →</div>
                ) : (
                  Array.from(selectedCart).map((i) => {
                    const c = CART_CATEGORIES[i];
                    return (
                      <div className="cart-row" key={c.label}>
                        <span className="cat-name">{c.label}</span>
                        <span className="to">→ {c.sector}</span>
                        <select className="stock-select" aria-label={`Top 5 ${c.label} stocks`}>
                          <option value="" disabled defaultValue="">
                            Top 5 stocks (India)
                          </option>
                          {c.stocks.map((st) => (
                            <option value={st} key={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="spend-box">
                <label htmlFor="cartSpendInput">Roughly, how much do these categories cost you monthly (₹)?</label>
                <input
                  id="cartSpendInput"
                  type="number"
                  value={cartSpend}
                  placeholder="e.g. 32000"
                  onChange={(e) => setCartSpend(e.target.value)}
                  step="500"
                />
                {spendNum > 0 && selectedCart.size > 0 && (
                  <div className="spend-result" id="cartSpendResult">
                    <div className="spend-line">
                      You spent <b>{inr(spendNum)}</b> on these categories last month.
                    </div>
                    <div className="spend-line">
                      What if <b>{inr(tenPctSpend)}</b> (10%) went toward your goals instead?
                    </div>
                    <div style={{ marginTop: "16px" }}>
                      <button
                        type="button"
                        className="btn btn-gold"
                        onClick={() => triggerRoute("Goal Portfolio")}
                      >
                        Invest My 10% →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CLOSET TO CAPITAL (SIGNATURE) ============ */}
      <section className="closet-section" id="closet">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">05. CLOSET TO CAPITAL</span>
            <h2>Your closet, mapped to the market.</h2>
            <p>
              Every object you reach for each morning sits on top of a real, investable industry. Tap anything on the rail to open its financial world.
            </p>
          </div>

          <div className="closet-frame">
            <div className="closet-rail"></div>
            <div className="wardrobe" id="wardrobe">
              {CLOSET_ITEMS.map((item, idx) => (
                <div
                  key={item.name}
                  className={`cubby reveal-pop ${flippedCloset === idx ? "flipped" : ""}`}
                  onClick={() => handleClosetClick(idx)}
                >
                  <div className="cubby-inner">
                    <div className="cubby-face cubby-front">
                      <div style={{ position: "absolute", inset: 0 }}>
                        <Image
                          src={item.img}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="obj-name">{item.name}</div>
                    </div>
                    <div className="cubby-face cubby-back">
                      <div className="maps">{item.maps}</div>
                      <div className="see-below">SEE BELOW TO UNDERSTAND MORE...</div>
                      <div className="undo-hint">Tap again to UNDO</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {flippedCloset !== null && (
            <div className="closet-detail show" id="closetDetail">
              <div className="closet-detail-head">
                <div>
                  <h3>
                    {CLOSET_ITEMS[flippedCloset].name} → {CLOSET_ITEMS[flippedCloset].maps}
                  </h3>
                  <p className="tagline">&quot;{CLOSET_ITEMS[flippedCloset].tagline}&quot;</p>
                </div>
              </div>
              <p style={{ marginTop: "12px" }}>{CLOSET_ITEMS[flippedCloset].body}</p>

              <div className="closet-flow" id="closetFlow">
                {CLOSET_ITEMS[flippedCloset].groups.map((g, i) => (
                  <div className="flow-group" key={i}>
                    <div className="flow-stage industry">
                      <div className="flow-stage-label">Industry</div>
                      <div className="flow-chips">
                        <span className="flow-chip">{g.industry}</span>
                      </div>
                    </div>
                    <div className="flow-arrow">
                      <svg width="24" height="26" viewBox="0 0 24 26">
                        <circle cx="12" cy="13" r="11" />
                        <path d="M12 7v12M8 15l4 4 4-4" />
                      </svg>
                    </div>
                    <div className="flow-stage companies">
                      <div className="flow-stage-label">Stocks in this industry</div>
                      <div className="flow-chips">
                        {g.companies.map((c) => (
                          <span className="flow-chip" key={c}>
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="route-buttons" id="closetDetailButtons" style={{ marginTop: "20px" }}>
                {renderRouteButtons(CLOSET_ITEMS[flippedCloset].routes)}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============ MODAL SYSTEM ============ */}
      {/* 1. Exploration/Route Modal */}
      <div className={`modal-backdrop ${activeModal === "route" ? "show" : ""}`}>
        <div className="modal">
          <h3>{modalTitle}</h3>
          <p>{modalBody}</p>
          <div className="closet-companies" style={{ marginTop: "14px" }}>
            {modalTags.map((t) => (
              <span className="co-tag" key={t}>
                {t}
              </span>
            ))}
          </div>
          <button
            type="button"
            className="btn btn-outline modal-close"
            onClick={() => setActiveModal(null)}
          >
            Close
          </button>
        </div>
      </div>

      {/* 2. Gold Invest Modal */}
      <div className={`modal-backdrop ${activeModal === "gold" ? "show" : ""}`}>
        <div className="modal gold-modal">
          <span className="eyebrow" style={{ color: "var(--yellow-200)" }}>
            Ways to hold gold, digitally
          </span>
          <h3 style={{ color: "#fff", marginTop: "8px" }}>Skip the locker. Still own the gold.</h3>
          <div className="gold-modal-list">
            {GOLD_OPTIONS.map((g, i) => (
              <div
                className="gold-option"
                key={g.title}
                style={{ animationDelay: `${(i * 0.07).toFixed(2)}s` }}
              >
                <div className="gold-option-text">
                  <div className="gold-option-title">{g.title}</div>
                  <div className="gold-option-body">{g.body}</div>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="btn btn-gold modal-close"
            onClick={() => setActiveModal(null)}
          >
            Close
          </button>
        </div>
      </div>

      {/* 3. Silver Invest Modal */}
      <div className={`modal-backdrop ${activeModal === "silver" ? "show" : ""}`}>
        <div className="modal gold-modal">
          <span className="eyebrow" style={{ color: "var(--yellow-200)" }}>
            Ways to hold silver, digitally
          </span>
          <h3 style={{ color: "#fff", marginTop: "8px" }}>Beyond the jewellery box.</h3>
          <div className="gold-modal-list">
            {SILVER_OPTIONS.map((s, i) => (
              <div
                className="gold-option"
                key={s.title}
                style={{ animationDelay: `${(i * 0.07).toFixed(2)}s` }}
              >
                <div className="gold-option-text">
                  <div className="gold-option-title">{s.title}</div>
                  <ul className="gold-option-subpoints">
                    {s.points.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="btn btn-gold modal-close"
            onClick={() => setActiveModal(null)}
          >
            Close
          </button>
        </div>
      </div>

      {/* 4. Diamond Invest Modal */}
      <div className={`modal-backdrop ${activeModal === "diamond" ? "show" : ""}`}>
        <div className="modal gold-modal">
          <span className="eyebrow" style={{ color: "var(--yellow-200)" }}>
            Ways to invest in diamonds
          </span>
          <h3 style={{ color: "#fff", marginTop: "8px" }}>Own the sparkle, not just the stone.</h3>
          <div className="gold-modal-list">
            {DIAMOND_OPTIONS.map((d, i) => (
              <div
                className="gold-option"
                key={d.title}
                style={{ animationDelay: `${(i * 0.07).toFixed(2)}s` }}
              >
                <div className="gold-option-text">
                  <div className="gold-option-title">{d.title}</div>
                  <ul className="gold-option-subpoints">
                    {d.points.map((p, idx) => (
                      <li key={idx} dangerouslySetInnerHTML={{ __html: p }}></li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="btn btn-gold modal-close"
            onClick={() => setActiveModal(null)}
          >
            Close
          </button>
        </div>
      </div>

      {/* 5. Store / Mall Modal */}
      <div className={`modal-backdrop ${activeModal === "store" ? "show" : ""}`}>
        <div className="modal gold-modal store-modal">
          <span className="eyebrow" style={{ color: "var(--yellow-200)" }}>
            {STORES[selectedStoreIdx]?.category}
          </span>
          <h3 style={{ color: "#fff", marginTop: "8px" }}>
            {STORES[selectedStoreIdx]?.title}
          </h3>
          <div className="store-modal-col-title">Brand → Listed stock (NSE / BSE)</div>
          <div className="pair-list">
            {STORES[selectedStoreIdx]?.pairs.map((p) => (
              <div className="pair-row" key={p.brand}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="pair-logo"
                  src={`https://www.google.com/s2/favicons?domain=${p.domain}&sz=64`}
                  alt={p.brand}
                  loading="lazy"
                />
                <span className="pair-brand">{p.brand}</span>
                <span className="pair-arrow">→</span>
                <span className="pair-stock">{p.stock}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="btn btn-gold modal-close"
            onClick={() => setActiveModal(null)}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
