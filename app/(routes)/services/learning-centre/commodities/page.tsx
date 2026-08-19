"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

// SVG Icons matching original site
const ICONS: Record<string, React.ReactNode> = {
  gold: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="10" y="18" width="28" height="20" rx="1.5" />
      <path d="M14 18 L24 8 L34 18" />
      <line x1="24" y1="24" x2="24" y2="32" />
      <line x1="18" y1="24" x2="18" y2="32" />
      <line x1="30" y1="24" x2="30" y2="32" />
    </svg>
  ),
  silver: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="24" cy="24" r="14" />
      <path d="M24 10 V38 M10 24 H38" strokeDasharray="2 3" />
    </svg>
  ),
  crude: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M24 8 C24 8 14 22 14 30 a10 10 0 0 0 20 0 C34 22 24 8 24 8 Z" />
    </svg>
  ),
  gas: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6 C20 6 12 16 12 24 a12 12 0 0 0 24 0 c0-4-3-7-5-9 1 5-2 8-4 6 1-4-1-9-7-15z" />
    </svg>
  ),
  wheat: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="24" y1="6" x2="24" y2="42" />
      <path d="M24 10 L18 14 M24 10 L30 14 M24 16 L18 20 M24 16 L30 20 M24 22 L18 26 M24 22 L30 26 M24 28 L18 32 M24 28 L30 32" />
    </svg>
  ),
  cotton: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="18" r="7" />
      <circle cx="30" cy="16" r="6" />
      <circle cx="24" cy="27" r="7.5" />
      <line x1="24" y1="34" x2="24" y2="42" />
    </svg>
  ),
  copper: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 10 H34 V20 H24 V38 H14 Z" />
      <line x1="14" y1="10" x2="14" y2="38" />
    </svg>
  ),
  origin: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 34 L18 34 L24 22 L30 34 L42 34" />
      <line x1="6" y1="40" x2="42" y2="40" />
    </svg>
  ),
  storage: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="8" y="18" width="32" height="20" />
      <path d="M8 18 L24 6 L40 18" />
      <line x1="24" y1="22" x2="24" y2="38" />
    </svg>
  ),
  exchange: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8">
      <line x1="10" y1="38" x2="10" y2="22" />
      <line x1="19" y1="38" x2="19" y2="14" />
      <line x1="28" y1="38" x2="28" y2="26" />
      <line x1="37" y1="38" x2="37" y2="10" />
      <line x1="6" y1="38" x2="42" y2="38" />
    </svg>
  ),
  trader: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 30 L18 18 L26 24 L40 10" />
      <path d="M32 10 H40 V18" />
    </svg>
  ),
  processor: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="18" cy="24" r="8" />
      <circle cx="30" cy="24" r="8" />
      <circle cx="18" cy="24" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="30" cy="24" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  consumer: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="24" cy="14" r="6" />
      <path d="M12 40 C12 28 36 28 36 40" />
    </svg>
  ),
};

const STAGE_KEYS = ["origin", "storage", "exchange", "trader", "processor", "consumer"];

const STAGE_LABEL_MAP: Record<string, string> = {
  origin: "Origin",
  storage: "Storage",
  exchange: "Exchange",
  trader: "Trader",
  processor: "Processor",
  consumer: "Consumer",
};

interface StageDetail {
  title: string;
  sub: string;
  body: string;
  who: string;
  priceWhy: string;
  risks: string;
  opportunity: string;
}

interface CommodityData {
  label: string;
  icon: string;
  accent: string;
  image: string;
  tagline: string;
  stages: Record<string, StageDetail>;
}

const COMMODITIES: Record<string, CommodityData> = {
  wheat: {
    label: "Wheat",
    icon: "wheat",
    accent: "#C9A646",
    image: "/scene-wheat.jpg",
    tagline: "From a Punjab field to your roti.",
    stages: {
      origin: {
        title: "Harvested",
        sub: "Farm, Punjab / Madhya Pradesh",
        body: "A farmer cuts the crop in April, once the grain has dried in the field. What he's paid depends on yield this season, and on a price the government has already announced months earlier.",
        who: "Farmers, agricultural labourers, local commission agents (arthiyas).",
        priceWhy: "Monsoon timing and rainfall decide yield. A weak crop year tightens supply before a single grain reaches a market.",
        risks: "Unseasonal rain at harvest can spoil grain overnight. Pest attacks and storage losses eat into what's sellable.",
        opportunity: "Minimum Support Price (MSP) gives farmers a price floor, a rare guarantee in commodity markets.",
      },
      storage: {
        title: "Stored",
        sub: "FCI godown / private warehouse",
        body: "Grain moves into government and private warehouses, where it's graded, fumigated, and held, sometimes for months, before it's released into the market.",
        who: "Food Corporation of India (FCI), private warehousing companies, grain merchants.",
        priceWhy: "How much grain sits in reserve changes everything downstream. Large buffer stocks calm prices; thin stocks make every rumour of shortage matter more.",
        risks: "Poor storage means rot, rodents, and moisture damage, India loses a meaningful share of grain this way every year.",
        opportunity: "Better cold-chain and silo infrastructure is one of the few upgrades that lowers prices for everyone at once.",
      },
      exchange: {
        title: "Priced on the exchange",
        sub: "NCDEX wheat futures",
        body: "Traders quote a price for wheat to be delivered months from now. That number becomes the reference everyone else, millers, exporters, even your local grocer, negotiates around.",
        who: "Commodity exchanges (NCDEX), brokers, institutional traders, hedgers.",
        priceWhy: "Futures prices react to global wheat news instantly, a drought in another country can move the Indian price the same afternoon.",
        risks: "Speculative buying can push prices away from what physical supply actually justifies, at least temporarily.",
        opportunity: "Millers use futures to lock in a price now, protecting themselves from a spike later in the year.",
      },
      trader: {
        title: "Bought and moved",
        sub: "Mandi trader / wholesaler",
        body: "A trader buys lots at the local mandi auction, then trucks them toward whichever city or mill is paying the best price that week.",
        who: "Mandi traders, transport operators, wholesale grain merchants.",
        priceWhy: "Diesel cost, distance, and how many middlemen the grain passes through each add their own margin to the final price.",
        risks: "Transport strikes or fuel price spikes can strand grain mid-route and delay delivery for weeks.",
        opportunity: "Direct farm-to-mill contracts are starting to cut out a layer of middlemen, leaving more value at both ends.",
      },
      processor: {
        title: "Milled into flour",
        sub: "Flour mill",
        body: "Wheat is cleaned, conditioned, and ground into atta or maida. The mill's margin depends on running close to full capacity, since machinery costs are fixed either way.",
        who: "Flour mills, from large branded players to small local chakkis.",
        priceWhy: "Energy costs (running the mills) and the price the mill paid for raw wheat both get baked into the final flour price.",
        risks: "A mill that bought wheat high and now faces falling flour demand absorbs the loss directly.",
        opportunity: "Branded, fortified atta lets mills charge a premium over commodity flour, turning a raw material into a product.",
      },
      consumer: {
        title: "On your table",
        sub: "Kitchen, India",
        body: "The flour becomes roti, naan, biscuits, bread, the most basic calorie source for a huge share of Indian households.",
        who: "You. Retailers, kirana stores, and the family meal at the end of the road.",
        priceWhy: "By the time it reaches you, the price reflects every stop before it, weather, storage, exchange sentiment, transport, and milling, stacked one on top of the other.",
        risks: "Because wheat is so central to diets, a price spike here is felt immediately as food inflation.",
        opportunity: "Understanding this chain is the difference between blaming 'the market' and knowing exactly where a price rise actually started.",
      },
    },
  },
  gold: {
    label: "Gold",
    icon: "gold",
    accent: "#D4A537",
    image: "/scene-gold.jpg",
    tagline: "From a mine to a wedding box.",
    stages: {
      origin: {
        title: "Mined",
        sub: "Mine, South Africa / Australia / India",
        body: "Ore is blasted and crushed deep underground, then chemically treated to extract gold that often makes up only a few grams per tonne of rock.",
        who: "Mining companies, miners, geologists, heavy-equipment operators.",
        priceWhy: "Mining is slow to scale up or down, new mines take years to open, so supply barely reacts to short-term price moves.",
        risks: "Mine accidents, labour disputes, and environmental restrictions can shut production overnight.",
        opportunity: "Recycled gold, old jewellery melted down, is a growing share of supply that needs no new mining at all.",
      },
      storage: {
        title: "Refined and vaulted",
        sub: "Refinery / central bank vault",
        body: "Raw gold is melted, purified to 99.5%+ purity, and cast into bars. A portion goes straight into central bank reserve vaults.",
        who: "Refineries, central banks (including the RBI), bullion banks.",
        priceWhy: "When central banks buy gold for reserves, they remove it from the tradeable market entirely, a quiet but powerful demand source.",
        risks: "Vault security and insurance costs are real overheads that get priced into every bar.",
        opportunity: "India's own gold reserves with the RBI act as a buffer that can support the rupee in a crisis.",
      },
      exchange: {
        title: "Priced globally",
        sub: "MCX & international gold futures",
        body: "Gold trades almost around the clock across London, New York, and Mumbai. The price you see quoted is really a single global number, adjusted for the rupee.",
        who: "MCX, COMEX, LBMA, bullion traders, institutional funds.",
        priceWhy: "Gold rises when people are nervous, about inflation, war, or a weakening rupee, because it's seen as a safe place to park money.",
        risks: "A sudden rate hike by a major central bank can pull money out of gold fast, since gold itself pays no interest.",
        opportunity: "Gold ETFs let ordinary investors hold exchange-traded gold without ever touching a physical bar.",
      },
      trader: {
        title: "Imported and distributed",
        sub: "Bullion importer, India",
        body: "India mines very little of its own gold, so most of it arrives by import, clearing customs duty before reaching wholesale bullion dealers.",
        who: "Bullion dealers, import houses, customs authorities.",
        priceWhy: "Import duty is a direct, government-set addition to the price, when it changes in the Budget, gold prices move immediately.",
        risks: "A weaker rupee makes dollar-priced gold imports more expensive even if the global price hasn't moved at all.",
        opportunity: "Gold loan and gold-backed lending businesses turn idle household gold into usable credit.",
      },
      processor: {
        title: "Crafted into jewellery",
        sub: "Jeweller's workshop",
        body: "Bullion is alloyed, cast, and hand-finished into the necklaces, bangles, and coins sold across India's jewellery markets, work still largely done by skilled artisans.",
        who: "Jewellers, goldsmiths (karigars), jewellery brands.",
        priceWhy: "'Making charges' on top of the gold rate cover the artisan's skill, intricate designs cost more in labour, not just metal.",
        risks: "A jeweller holding finished stock when gold prices fall sees the value of that inventory drop overnight.",
        opportunity: "Hallmarking and BIS certification let buyers trust purity without needing to test it themselves.",
      },
      consumer: {
        title: "Worn and held",
        sub: "Weddings, festivals, savings",
        body: "Gold in India isn't only jewellery, it's a savings instrument, a wedding gift, and a festival purchase (Akshaya Tritiya, Dhanteras) all at once.",
        who: "You, and roughly every Indian household, which collectively holds one of the largest private gold stockpiles on earth.",
        priceWhy: "Festive and wedding-season demand is so large and predictable that jewellers and traders plan their buying around the calendar.",
        risks: "Treating gold purely as decoration ignores resale value, purity and making charges both affect what you'll get back later.",
        opportunity: "Sovereign Gold Bonds and gold ETFs let you hold the same asset without storage risk or making charges.",
      },
    },
  },
  crude: {
    label: "Crude Oil",
    icon: "crude",
    accent: "#7A8B99",
    image: "/scene-crude.jpg",
    tagline: "From an offshore rig to your fuel tank.",
    stages: {
      origin: {
        title: "Extracted",
        sub: "Oil field, Gulf / Russia / offshore India",
        body: "Crude is pumped from reservoirs thousands of metres underground or beneath the seabed, then piped to a collection terminal.",
        who: "National oil companies, OPEC+ members, drilling operators.",
        priceWhy: "OPEC+ decides how much to pump as a bloc, a single meeting where they agree to cut output can move global prices within hours.",
        risks: "Geopolitical conflict near key fields or shipping routes (the Strait of Hormuz, for instance) threatens supply instantly.",
        opportunity: "Renewable energy growth is slowly capping how much long-term demand crude can count on.",
      },
      storage: {
        title: "Stored in terminals",
        sub: "Strategic petroleum reserve / tank farm",
        body: "Crude sits in massive tank farms at ports and refineries, including strategic reserves governments hold for emergencies.",
        who: "National strategic reserves, refinery-owned storage, terminal operators.",
        priceWhy: "When inventories climb unexpectedly, it signals more supply than the market needs, and prices usually soften.",
        risks: "Storage capacity itself is limited; when tanks run full, as happened briefly in 2020, prices can even turn negative.",
        opportunity: "India has been steadily expanding its own strategic reserves to cushion against supply shocks.",
      },
      exchange: {
        title: "Priced on benchmarks",
        sub: "Brent & WTI crude futures",
        body: "Almost all crude globally is priced relative to two benchmarks, Brent (international) and WTI (US), traded as futures contracts.",
        who: "ICE, NYMEX, MCX, oil trading desks, hedge funds.",
        priceWhy: "Traders price in expectations, not just today's supply, a forecast of a cold winter or a slowing economy moves the price before it actually happens.",
        risks: "Crude is one of the most actively speculated commodities; price swings can outrun what physical fundamentals justify.",
        opportunity: "Airlines, transport firms, and refiners use futures to hedge fuel costs months in advance.",
      },
      trader: {
        title: "Refined into products",
        sub: "Refinery, India",
        body: "Crude arrives by tanker and is processed in a refinery into petrol, diesel, jet fuel, and LPG, each product priced separately from here on.",
        who: "Refiners (IOC, BPCL, Reliance), shipping companies, port authorities.",
        priceWhy: "The 'crack spread', the gap between crude cost and refined product price, is the refiner's real profit margin, and it moves independently of crude itself.",
        risks: "Refinery outages or maintenance shutdowns can create local fuel shortages even when crude supply is fine.",
        opportunity: "India's large refining capacity lets it export surplus refined fuel, turning crude imports into a value-added business.",
      },
      processor: {
        title: "Distributed",
        sub: "Fuel distribution network",
        body: "Refined products move by pipeline, rail, and tanker truck to depots and then to the petrol pump near you.",
        who: "Oil marketing companies, transport and logistics operators, fuel station owners.",
        priceWhy: "Excise duty and state VAT, added at this stage, are often a bigger share of the pump price than the crude oil itself.",
        risks: "Transport disruptions (strikes, fuel theft, accidents) can cause local shortages even when national supply is healthy.",
        opportunity: "Daily dynamic pricing means pump prices can adjust to global crude moves within a day, rather than lagging for weeks.",
      },
      consumer: {
        title: "At the pump",
        sub: "Petrol station, India",
        body: "You fill a tank, and that price reflects global crude, the rupee's exchange rate, refining costs, and a substantial layer of taxes.",
        who: "You. Every vehicle owner, every transport business, every product that was shipped to reach a shelf.",
        priceWhy: "Because almost everything is transported using fuel, a crude price move quietly raises the cost of nearly everything else too.",
        risks: "Fuel price spikes hit lower-income households hardest, since transport and cooking fuel are a larger share of their spending.",
        opportunity: "Tracking crude benchmarks, not just the pump price, tells you whether a price hike is global or a local tax decision.",
      },
    },
  },
  cotton: {
    label: "Cotton",
    icon: "cotton",
    accent: "#9A9684",
    image: "/scene-cotton.jpg",
    tagline: "From a Gujarat field to the shirt on your back.",
    stages: {
      origin: {
        title: "Picked",
        sub: "Farm, Gujarat / Maharashtra",
        body: "Cotton bolls are hand-picked once they burst open, usually across several pickings per season as the plant matures unevenly.",
        who: "Cotton farmers, mostly smallholders, and seasonal pickers.",
        priceWhy: "Pest pressure (notably the pink bollworm) and rainfall timing both swing yield significantly from year to year.",
        risks: "Erratic rainfall, too little or a sudden flood, can wipe out a season's crop with little warning.",
        opportunity: "MSP support and crop insurance schemes give farmers some protection against a bad year.",
      },
      storage: {
        title: "Ginned and baled",
        sub: "Ginning factory",
        body: "Raw cotton is separated from its seeds at a ginning unit, then pressed into standard bales for transport and sale.",
        who: "Ginning factory owners, cotton corporations (like CCI), bale traders.",
        priceWhy: "The ginning output ratio, how much usable fibre comes from raw cotton, directly affects how much a ginner can sell onward.",
        risks: "Fire is a real and recurring risk at ginning units, given how flammable raw cotton fibre is.",
        opportunity: "Cottonseed, a by-product, is sold separately for oil and animal feed, extra revenue from the same harvest.",
      },
      exchange: {
        title: "Priced on the exchange",
        sub: "ICE & MCX cotton futures",
        body: "Cotton bales are priced against global benchmarks, with US futures (ICE) setting the international tone and Indian futures (MCX) tracking it closely.",
        who: "ICE, MCX, textile mills, commodity trading houses.",
        priceWhy: "Global demand from major textile-exporting countries (China, Bangladesh, Vietnam) heavily influences how much Indian cotton is worth.",
        risks: "A slowdown in global apparel demand reduces cotton demand with a noticeable lag, hitting farmers a season later.",
        opportunity: "India is one of the largest cotton producers globally, giving it real pricing influence rather than just being a price-taker.",
      },
      trader: {
        title: "Bought by mills",
        sub: "Cotton trader / textile mill buyer",
        body: "Traders and mill procurement teams buy baled cotton at auction, often securing supply months ahead through forward contracts.",
        who: "Cotton traders, textile mill buyers, export houses.",
        priceWhy: "Mills competing for limited high-quality cotton in a tight season can bid prices up well above the exchange benchmark.",
        risks: "Quality variation between bales (fibre length, strength) means prices aren't uniform even within the same season.",
        opportunity: "Branded, traceable cotton (organic, BCI-certified) is increasingly commanding a price premium from global buyers.",
      },
      processor: {
        title: "Spun and woven",
        sub: "Spinning & textile mill",
        body: "Cotton fibre is spun into yarn, then woven or knitted into fabric, the stage where raw material genuinely becomes a textile product.",
        who: "Spinning mills, weaving units, garment manufacturers.",
        priceWhy: "Energy and labour costs at the mill stage are now often a bigger factor in fabric price than the raw cotton itself.",
        risks: "Power cuts and labour shortages can stall production lines that run on tight margins.",
        opportunity: "India's large textile and garment export industry adds significant value to raw cotton before it ever leaves the country.",
      },
      consumer: {
        title: "Worn",
        sub: "Wardrobe, India and abroad",
        body: "The fabric becomes the shirt, the saree, the bedsheet, one of the most physically present commodities in daily life.",
        who: "You. Domestic shoppers and international buyers of Indian-made textiles alike.",
        priceWhy: "By the time cotton reaches a garment, the price has compounded across farming, ginning, milling, weaving, and stitching, raw material is often a small fraction of the final tag.",
        risks: "Fast fashion's demand for cheap, frequent turnover puts continuous pressure back down the chain on farmers and mills.",
        opportunity: "Choosing durable, well-made cotton goods is a small way to reward the parts of this chain that aren't squeezed on price.",
      },
    },
  },
  copper: {
    label: "Copper",
    icon: "copper",
    accent: "#B5651D",
    image: "/scene-copper.jpg",
    tagline: "From an ore body to India's power grid.",
    stages: {
      origin: {
        title: "Mined",
        sub: "Mine, Chile / Zambia / Rajasthan",
        body: "Copper ore is blasted from open-pit or underground mines, often containing less than 1% actual copper by weight.",
        who: "Mining companies (including Hindustan Copper in India), miners, equipment operators.",
        priceWhy: "Chile alone supplies roughly a quarter of world copper, a strike or drought there, mines need huge water volumes, moves global prices.",
        risks: "Ore grades are declining at ageing mines, meaning more rock must be processed for the same copper output.",
        opportunity: "Copper recycling from scrap and old wiring is a growing, lower-cost source of supply.",
      },
      storage: {
        title: "Refined and warehoused",
        sub: "Smelter / LME-bonded warehouse",
        body: "Ore is smelted and refined into 99.99% pure copper cathodes, which are stored in exchange-certified warehouses worldwide before sale.",
        who: "Smelters, refiners, London Metal Exchange (LME) warehouse operators.",
        priceWhy: "LME warehouse stock levels are watched closely, falling stocks are read as a sign of tightening supply.",
        risks: "Smelting is energy-intensive; rising power costs can squeeze refiner margins independent of the copper price itself.",
        opportunity: "Custom smelting deals let a country process imported ore even without large domestic mines.",
      },
      exchange: {
        title: "Priced on the exchange",
        sub: "LME & MCX copper futures",
        body: "Copper is traded as a benchmark industrial metal, often called 'Dr. Copper' because its price is seen as a barometer for global economic health.",
        who: "London Metal Exchange, MCX, industrial buyers, metal trading funds.",
        priceWhy: "Because copper goes into construction, wiring, and EVs, its price tends to rise and fall with expectations for industrial growth.",
        risks: "A sharp economic slowdown anywhere with major manufacturing, especially China, can drag copper prices down quickly.",
        opportunity: "Demand from electric vehicles and renewable power grids, both copper-intensive, is a long-term structural tailwind.",
      },
      trader: {
        title: "Imported and distributed",
        sub: "Metal trader, India",
        body: "India imports a large share of refined copper and ore, with traders distributing it to wire, cable, and component manufacturers nationwide.",
        who: "Metal trading houses, importers, wholesale distributors.",
        priceWhy: "Import duty changes and rupee movements both shift the landed cost of copper before any domestic processing even begins.",
        risks: "Holding large unsold inventory when global prices fall is a direct, immediate loss for a trader.",
        opportunity: "Domestic smelting capacity expansion is gradually reducing India's reliance on imported refined copper.",
      },
      processor: {
        title: "Drawn into wire and components",
        sub: "Wire-drawing & component plant",
        body: "Copper cathodes are melted and drawn into wire, then used to manufacture cables, transformers, motors, and electronics.",
        who: "Wire and cable manufacturers, electrical component makers, EV and electronics suppliers.",
        priceWhy: "Manufacturers often hedge copper purchases on the exchange so a sudden price spike doesn't derail a fixed-price contract they've already signed with a customer.",
        risks: "A manufacturer who hasn't hedged can see margins disappear if copper jumps mid-contract.",
        opportunity: "India's push to expand its power grid and EV manufacturing is a direct, growing source of copper demand.",
      },
      consumer: {
        title: "Powering daily life",
        sub: "Homes, grids, vehicles",
        body: "Copper ends up in the wiring behind your walls, the motor in your fan, the transformer on your street, and the battery pack of an EV.",
        who: "You. Every household, every building, every vehicle with a motor or a wire.",
        priceWhy: "Because copper is in nearly all infrastructure, its price quietly shows up in the cost of housing, appliances, and electricity infrastructure.",
        risks: "Copper theft from infrastructure (cables, transformers) is a real and costly problem precisely because the metal holds resale value.",
        opportunity: "Copper is almost infinitely recyclable without losing quality, making it one of the more circular materials in modern life.",
      },
    },
  },
};

interface FactorChainStep {
  label: string;
  dir: "up" | "down";
}

interface FactorData {
  id: string;
  icon: string;
  label: string;
  commodity: string;
  chain: FactorChainStep[];
  note: string;
}

const FACTORS: FactorData[] = [
  {
    id: "rates",
    icon: "🏦",
    label: "Interest Rates",
    commodity: "gold",
    chain: [
      { label: "Interest Rates", dir: "up" },
      { label: "Gold Demand", dir: "down" },
      { label: "Gold Price", dir: "down" },
    ],
    note: "When rates climb, holding gold — which pays no interest — costs more in what you give up elsewhere. Investors drift toward bonds, and gold cools off.",
  },
  {
    id: "dollar",
    icon: "💵",
    label: "Dollar Strength",
    commodity: "gold",
    chain: [
      { label: "Dollar Strength", dir: "up" },
      { label: "Gold Demand", dir: "down" },
      { label: "Gold Price", dir: "down" },
    ],
    note: "Gold is priced in dollars worldwide. A stronger dollar makes it costlier for anyone holding a different currency, so demand softens.",
  },
  {
    id: "geo",
    icon: "🌍",
    label: "Geopolitical Events",
    commodity: "crude",
    chain: [
      { label: "War / Sanctions", dir: "up" },
      { label: "Shipping Routes", dir: "down" },
      { label: "Oil Supply Risk", dir: "up" },
      { label: "Oil Price", dir: "up" },
    ],
    note: "War, trade restrictions, sanctions and shipping-route disruptions all threaten supply long before a single barrel is actually lost — traders price in the risk immediately.",
  },
  {
    id: "currency",
    icon: "💱",
    label: "Currency Exchange",
    commodity: "crude",
    chain: [
      { label: "Rupee Weakens", dir: "up" },
      { label: "Imports Cost More", dir: "up" },
      { label: "Oil Price (INR)", dir: "up" },
      { label: "Fuel Price", dir: "up" },
    ],
    note: "Crude is priced in dollars. When the rupee slides from ₹75 to ₹90 against the dollar, the same barrel costs an Indian importer more — and that gets passed straight to the pump.",
  },
  {
    id: "inflation",
    icon: "📈",
    label: "Inflation",
    commodity: "wheat",
    chain: [
      { label: "Inflation", dir: "up" },
      { label: "Input Costs", dir: "up" },
      { label: "Wheat Price", dir: "up" },
    ],
    note: "Costlier diesel, fertiliser and transport all get folded into what a farmer needs to charge just to break even next season.",
  },
  {
    id: "demand",
    icon: "🏭",
    label: "Demand",
    commodity: "copper",
    chain: [
      { label: "Industrial Demand", dir: "up" },
      { label: "Copper Stockpiles", dir: "down" },
      { label: "Copper Price", dir: "up" },
    ],
    note: "EVs, power grids and construction all compete for the same copper. As stockpiles thin out, every buyer ends up paying more.",
  },
  {
    id: "supply",
    icon: "⛏️",
    label: "Supply",
    commodity: "cotton",
    chain: [
      { label: "Crop Damage", dir: "up" },
      { label: "Cotton Supply", dir: "down" },
      { label: "Cotton Price", dir: "up" },
    ],
    note: "A bad pest season or unseasonal rain at harvest shrinks the crop — and every mill downstream feels the squeeze.",
  },
];

export default function CommoditiesPage() {
  const router = useRouter();

  // Selected state
  const [activeCommodity, setActiveCommodity] = useState<string>("wheat");
  const [activeStageIndex, setActiveStageIndex] = useState<number | null>(null);
  const [activeFactorId, setActiveFactorId] = useState<string>("rates");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Scroll reveals
  const introStmtRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const [visibleStmts, setVisibleStmts] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = introStmtRefs.findIndex((ref) => ref.current === entry.target);
            if (index !== -1) {
              setVisibleStmts((prev) => {
                const copy = [...prev];
                copy[index] = true;
                return copy;
              });
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    introStmtRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Compute active objects
  const commodity = useMemo(() => COMMODITIES[activeCommodity], [activeCommodity]);
  const activeStageKey = activeStageIndex !== null ? STAGE_KEYS[activeStageIndex] : null;
  const stageData = activeStageKey ? commodity.stages[activeStageKey] : null;

  const activeFactor = useMemo(() => FACTORS.find((f) => f.id === activeFactorId) || FACTORS[0], [
    activeFactorId,
  ]);
  const factorCommodity = useMemo(() => COMMODITIES[activeFactor.commodity], [activeFactor]);

  // Set CSS variables for colors
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", commodity.accent);
    document.documentElement.style.setProperty("--accent-soft", commodity.accent + "29");
  }, [commodity]);

  // Render
  return (
    <div className="mandiTerminal">
      {/* NAV */}
      <nav className="nav">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white bg-transparent border-0 cursor-pointer font-mono text-[0.8rem] tracking-wider hover:text-[#5E9C7C] transition-colors"
        >
          <FaArrowLeft /> BACK TO SERVICES
        </button>
        <div className="nav-links">
          <a href="#hero">Start</a>
          <a href="#journey">The Journey</a>
          <a href="#factors">Factors</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">A field guide to the things that move markets</p>
            <h1 className="hero-title">
              Everything around you
              <br />
              is a <span className="hero-emph">commodity.</span>
            </h1>
            <p className="hero-sub">
              Gold, oil, wheat, cotton, copper — the raw materials behind every price tag.
            </p>
          </div>
          <div className="hero-visual">
            <div className="hero-glow"></div>
            <img
              className="hero-person"
              src="/hero-person-rounded.png"
              alt="Commodities market app preview"
            />
          </div>
        </div>
      </section>

      {/* INTRO STRIP */}
      <section className="intro" id="intro">
        <div className="intro-statements">
          <div
            ref={introStmtRefs[0]}
            className={`intro-stmt ${visibleStmts[0] ? "visible" : ""}`}
            style={{ "--stmt-color": "#D4A537" } as React.CSSProperties}
          >
            <span className="intro-stmt-chip">Gold</span>
            <span className="intro-stmt-text">
              {"isn't a chart. It's a "}<em>wedding box on your shelf.</em>
            </span>
            <span className="intro-stmt-img-wrap">
              <Image src="/scene-gold.jpg" alt="Gold" className="intro-stmt-img" width={200} height={100} />
            </span>
          </div>

          <div
            ref={introStmtRefs[1]}
            className={`intro-stmt ${visibleStmts[1] ? "visible" : ""}`}
            style={{ "--stmt-color": "#6B8C5A" } as React.CSSProperties}
          >
            <span className="intro-stmt-chip">Crude</span>
            <span className="intro-stmt-text">
              {"isn't a barrel count. It's the "}<em>bike outside.</em>
            </span>
            <span className="intro-stmt-img-wrap">
              <Image src="/scene-crude.jpg" alt="Crude Oil" className="intro-stmt-img" width={200} height={100} />
            </span>
          </div>

          <div
            ref={introStmtRefs[2]}
            className={`intro-stmt ${visibleStmts[2] ? "visible" : ""}`}
            style={{ "--stmt-color": "#C9A646" } as React.CSSProperties}
          >
            <span className="intro-stmt-chip">Wheat</span>
            <span className="intro-stmt-text">
              {"isn't a futures contract. It's the "}<em>roti on your plate.</em>
            </span>
            <span className="intro-stmt-img-wrap">
              <Image src="/scene-wheat.jpg" alt="Wheat" className="intro-stmt-img" width={200} height={100} />
            </span>
          </div>
        </div>
        <div className="intro-sub-wrap">
          <p className="intro-sub">Before any of that, every commodity travels the same six-stop road.</p>
          <a href="#journey" className="intro-cta">
            Walk the road <span className="intro-cta-arrow">→</span>
          </a>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="journey" id="journey">
        <div className="journey-head">
          <span className="eyebrow">The Commodity Journey</span>
          <h2>Six stops. One story, every time.</h2>
        </div>

        <div className="journey-layout">
          {/* Visual card */}
          <div className="journey-visual">
            <div className="journey-scene">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCommodity}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full relative"
                >
                  <Image
                    src={commodity.image}
                    alt={commodity.label}
                    fill
                    className="object-cover"
                  />
                  <div className="journey-scene-overlay">
                    <span className="journey-scene-tag">{commodity.tagline}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Main timeline */}
          <div className="journey-main">
            {/* Commodity picker chips */}
            <div className="commodity-picker" role="tablist">
              {Object.keys(COMMODITIES).map((key) => {
                const c = COMMODITIES[key];
                return (
                  <button
                    key={key}
                    className={`commodity-chip ${activeCommodity === key ? "active" : ""}`}
                    onClick={() => {
                      setActiveCommodity(key);
                      setActiveStageIndex(null);
                    }}
                    role="tab"
                  >
                    {ICONS[c.icon]}
                    <span>{c.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Stage stops rail */}
            <div className="journey-rail">
              {STAGE_KEYS.map((key, i) => (
                <button
                  key={key}
                  className={`rail-stop ${activeStageIndex === i ? "active" : ""}`}
                  onClick={() => setActiveStageIndex(i)}
                >
                  <span className="rail-stop-icon">{ICONS[key]}</span>
                  <span className="rail-stop-label">{STAGE_LABEL_MAP[key]}</span>
                </button>
              ))}
            </div>

            {/* Stage details warm card */}
            <div className="stage-detail">
              <AnimatePresence mode="wait">
                {stageData ? (
                  <motion.div
                    key={`${activeCommodity}-${activeStageIndex}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="stage-content"
                  >
                    <div className="stage-top">
                      <h3 className="stage-title">{stageData.title}</h3>
                      <span className="stage-sub">{stageData.sub}</span>
                    </div>
                    <p className="stage-body">{stageData.body}</p>
                    <div className="stage-meta">
                      <div className="meta-block">
                        <span className="meta-label">Who participates</span>
                        <p>{stageData.who}</p>
                      </div>
                      <div className="meta-block">
                        <span className="meta-label">Why prices change</span>
                        <p>{stageData.priceWhy}</p>
                      </div>
                      <div className="meta-block">
                        <span className="meta-label">Risks</span>
                        <p>{stageData.risks}</p>
                      </div>
                    </div>
                    <div className="meta-block" style={{ marginTop: "1.4rem" }}>
                      <span className="meta-label">Opportunity</span>
                      <p>{stageData.opportunity}</p>
                    </div>

                    <div className="stage-nav">
                      <button
                        className="stage-nav-btn"
                        disabled={activeStageIndex === 0}
                        onClick={() => setActiveStageIndex((prev) => (prev !== null ? prev - 1 : null))}
                      >
                        ← Previous stop
                      </button>
                      <button
                        className="stage-nav-btn"
                        disabled={activeStageIndex === STAGE_KEYS.length - 1}
                        onClick={() => setActiveStageIndex((prev) => (prev !== null ? prev + 1 : null))}
                      >
                        Next stop →
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="stage-detail-empty">
                    <p>
                      {commodity.tagline}
                      <br />
                      <br />
                      Click a stop on the road above to open it up.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* FACTORS DASHBOARD */}
      <section className="factors" id="factors">
        <div className="factors-head">
          <span className="eyebrow">What Moves Commodity Prices?</span>
          <h2>Seven forces. One ripple, every time.</h2>
          <p className="factors-sub">hover a force below to watch it reach the price</p>
        </div>

        <div className="factors-container">
          <div className="factors-left">
            {/* Category Filter Pills */}
            <div className="factor-category-picker">
              {["all", "gold", "crude", "wheat", "cotton", "copper"].map((cat) => (
                <button
                  key={cat}
                  className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    const firstFactor = cat === "all" 
                      ? FACTORS[0] 
                      : FACTORS.find(f => f.commodity === cat);
                    if (firstFactor) {
                      setActiveFactorId(firstFactor.id);
                    }
                  }}
                >
                  {cat === "all" ? "All Forces" : COMMODITIES[cat].label}
                </button>
              ))}
            </div>

            <div className="factors-board" style={{ "--factor-accent": factorCommodity.accent } as React.CSSProperties}>
              {FACTORS.map((f, idx) => {
                const isMatch = selectedCategory === "all" || f.commodity === selectedCategory;
                return (
                  <button
                    key={f.id}
                    type="button"
                    className={`factor-node ${activeFactorId === f.id ? "active" : ""} ${!isMatch ? "dimmed" : ""}`}
                    style={{ gridArea: `c${idx + 1}` }}
                    onMouseEnter={() => isMatch && setActiveFactorId(f.id)}
                    onFocus={() => isMatch && setActiveFactorId(f.id)}
                    onClick={() => isMatch && setActiveFactorId(f.id)}
                  >
                    <span className="factor-node-label">{f.label}</span>
                  </button>
                );
              })}

              {/* Center Graphic */}
              <div className="factors-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFactorId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full relative"
                  >
                    <img
                      src={factorCommodity.image}
                      alt={factorCommodity.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="factors-center-overlay">
                      <span className="factors-center-tag">{factorCommodity.label.toUpperCase()}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="factors-right">
            {/* Dynamic Chain Panel */}
            <div className="factors-chain">
              <span className="chain-factor-tag">
                {activeFactor.label}
              </span>
              <div className="chain-steps flex-wrap">
                {activeFactor.chain.map((step, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.15 }}
                        className="chain-connector mx-1"
                      >
                        →
                      </motion.span>
                    )}
                    <motion.span
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className={`chain-step ${i === activeFactor.chain.length - 1 ? "chain-step-result" : ""}`}
                    >
                      <span className="chain-step-text">{step.label}</span>
                      <span className={`chain-arrow ${step.dir}`}>
                        {step.dir === "up" ? "▲" : "▼"}
                      </span>
                    </motion.span>
                  </React.Fragment>
                ))}
              </div>
              <p className="chain-note">{activeFactor.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="cta-section">
        <h3>Ready to start trading commodities?</h3>
        <Link href="/services/stock-investment/commodities/apply" className="intro-cta">
          Explore Commodities <span className="intro-cta-arrow">→</span>
        </Link>
      </section>
    </div>
  );
}