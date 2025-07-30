// Financial News Dataset
// Import this into your NewsPage component as the newsData prop

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image?: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  views: string;
  link: string;
  featured?: boolean;
  tags?: string[];
}

export const financialNewsData: NewsItem[] = [
  {
    id: 1,
    title: "Goldman Sachs and BNY Join Forces to Tokenize $7.1 Trillion Money Market Industry",
    description: "Major financial institutions partner to bring blockchain technology to traditional money markets, potentially revolutionizing how institutional investors access short-term investments.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
    category: "blockchain",
    author: "Sarah Chen",
    publishDate: "2025-07-23",
    readTime: "6 min read",
    views: "15.2K",
    link: "https://example.com/goldman-bny-tokenize-money-market",
    featured: true,
    tags: ["blockchain", "tokenization", "money-market", "goldman-sachs"]
  },
  {
    id: 2,
    title: "Major Banks Announce Dividend Hikes Following Fed Stress Test Results",
    description: "JPMorgan Chase, Bank of America, Wells Fargo, and other major banks plan to increase dividends after successfully passing Federal Reserve stress tests, signaling strong financial health.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop",
    category: "banking",
    author: "Michael Rodriguez",
    publishDate: "2025-07-02",
    readTime: "4 min read",
    views: "12.8K",
    link: "https://example.com/banks-dividend-hikes-stress-test",
    featured: true,
    tags: ["banking", "dividends", "federal-reserve", "stress-test"]
  },
  {
    id: 3,
    title: "Federal Reserve Holds Interest Rates Steady Amid Mixed Economic Signals",
    description: "The Fed maintains current interest rate levels as policymakers weigh inflation concerns against employment data, keeping markets in anticipation of future policy moves.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
    category: "monetary-policy",
    author: "Janet Thompson",
    publishDate: "2025-07-28",
    readTime: "5 min read",
    views: "18.7K",
    link: "https://example.com/fed-holds-rates-steady",
    featured: false,
    tags: ["federal-reserve", "interest-rates", "monetary-policy", "inflation"]
  },
  {
    id: 4,
    title: "AI and Big Tech Investments Surge as Ark Invest Reveals New Strategy",
    description: "Cathie Wood's Ark Invest doubles down on artificial intelligence and big tech plays, outlining their investment thesis for the next wave of technological innovation.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    category: "technology",
    author: "David Park",
    publishDate: "2025-07-23",
    readTime: "7 min read",
    views: "9.4K",
    link: "https://example.com/ark-invest-ai-big-tech-strategy",
    featured: false,
    tags: ["artificial-intelligence", "big-tech", "ark-invest", "innovation"]
  },
  {
    id: 5,
    title: "Coffee Prices Soar as Trump Announces 50% Tariff on Brazilian Imports",
    description: "The coffee industry faces significant disruption as new tariff threats impact 30% of U.S. coffee imports, potentially driving consumer prices higher across the nation.",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=400&fit=crop",
    category: "commodities",
    author: "Lisa Martinez",
    publishDate: "2025-07-21",
    readTime: "4 min read",
    views: "11.6K",
    link: "https://example.com/coffee-prices-brazil-tariff",
    featured: false,
    tags: ["commodities", "tariffs", "coffee", "trade-policy"]
  },
  {
    id: 6,
    title: "United Airlines Revises 2025 Forecast Despite Strong Q2 Earnings Beat",
    description: "United Airlines exceeds second-quarter expectations but adjusts full-year guidance, citing competitive pressures and operational challenges in the aviation sector.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=400&fit=crop",
    category: "aviation",
    author: "Robert Kim",
    publishDate: "2025-07-17",
    readTime: "5 min read",
    views: "7.8K",
    link: "https://example.com/united-airlines-forecast-revision",
    featured: false,
    tags: ["aviation", "earnings", "united-airlines", "forecast"]
  },
  {
    id: 7,
    title: "PCE Inflation Slows to 2.3% as Fed Target Comes Within Reach",
    description: "Consumer price inflation continues its downward trend, bringing the Federal Reserve closer to its 2% target and potentially influencing future monetary policy decisions.",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=400&fit=crop",
    category: "economics",
    author: "Amanda Foster",
    publishDate: "2025-07-29",
    readTime: "6 min read",
    views: "13.5K",
    link: "https://example.com/pce-inflation-slows-fed-target",
    featured: true,
    tags: ["inflation", "pce", "federal-reserve", "economics"]
  },
  {
    id: 8,
    title: "Global Economic Growth Projected at 3.3% for 2025-2026 Period",
    description: "The International Monetary Fund maintains its growth forecast despite regional variations, with the United States showing upward revisions while other regions face challenges.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
    category: "global-economy",
    author: "Thomas Weber",
    publishDate: "2025-07-25",
    readTime: "8 min read",
    views: "10.2K",
    link: "https://example.com/imf-global-growth-projection",
    featured: false,
    tags: ["imf", "global-economy", "gdp", "economic-growth"]
  },
  {
    id: 9,
    title: "Emerging Markets Seek Regional Solutions to Combat Tariff Pressures",
    description: "Developing economies explore alternative trade arrangements and regional partnerships as global tariff tensions threaten traditional international commerce patterns.",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
    category: "emerging-markets",
    author: "Priya Sharma",
    publishDate: "2025-07-26",
    readTime: "7 min read",
    views: "8.9K",
    link: "https://example.com/emerging-markets-tariff-solutions",
    featured: false,
    tags: ["emerging-markets", "tariffs", "trade", "regional-cooperation"]
  },
  {
    id: 10,
    title: "Cryptocurrency Adoption Accelerates as US Takes More Friendly Stance",
    description: "Digital asset markets experience renewed optimism following signals of a more accommodating regulatory environment from Washington policymakers.",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=400&fit=crop",
    category: "cryptocurrency",
    author: "Alex Johnson",
    publishDate: "2025-07-24",
    readTime: "5 min read",
    views: "16.3K",
    link: "https://example.com/crypto-us-friendly-stance",
    featured: false,
    tags: ["cryptocurrency", "regulation", "digital-assets", "policy"]
  },
  {
    id: 11,
    title: "Stock Market Volatility Continues as Major Indices Face Third Weekly Decline",
    description: "Equity markets struggle with persistent selling pressure as investors grapple with mixed economic data and shifting expectations for future monetary policy.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=400&fit=crop",
    category: "stock-market",
    author: "Jennifer Walsh",
    publishDate: "2025-07-20",
    readTime: "4 min read",
    views: "14.1K",
    link: "https://example.com/stock-market-volatility-continues",
    featured: false,
    tags: ["stock-market", "volatility", "equity-indices", "market-trends"]
  },
  {
    id: 12,
    title: "ESG Investing Reaches New Milestone with $50 Trillion in Assets",
    description: "Environmental, social, and governance focused investments continue their rapid growth trajectory, reshaping how institutional and retail investors approach portfolio construction.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
    category: "sustainable-investing",
    author: "Dr. Emily Chen",
    publishDate: "2025-07-27",
    readTime: "6 min read",
    views: "9.7K",
    link: "https://example.com/esg-investing-milestone",
    featured: false,
    tags: ["esg", "sustainable-investing", "portfolio-construction", "institutional-investing"]
  },
  {
    id: 13,
    title: "Central Bank Digital Currencies Gain Momentum Across Europe",
    description: "European nations accelerate CBDC development programs as digital payment systems become increasingly critical to modern financial infrastructure.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
    category: "fintech",
    author: "Marco Rossi",
    publishDate: "2025-07-22",
    readTime: "7 min read",
    views: "12.4K",
    link: "https://example.com/cbdc-momentum-europe",
    featured: false,
    tags: ["cbdc", "digital-currency", "fintech", "european-banking"]
  },
  {
    id: 14,
    title: "Real Estate Investment Trusts See Renewed Interest Amid Rate Speculation",
    description: "REIT sectors experience capital inflows as investors position for potential interest rate changes and seek income-generating assets in uncertain times.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    category: "real-estate",
    author: "Sandra Mitchell",
    publishDate: "2025-07-19",
    readTime: "5 min read",
    views: "8.6K",
    link: "https://example.com/reit-renewed-interest",
    featured: false,
    tags: ["reit", "real-estate", "interest-rates", "income-investing"]
  },
  {
    id: 15,
    title: "Supply Chain Finance Solutions Evolve with Blockchain Integration",
    description: "Traditional trade finance undergoes digital transformation as blockchain technology promises to streamline international commerce and reduce settlement times.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop",
    category: "trade-finance",
    author: "Hassan Al-Rashid",
    publishDate: "2025-07-18",
    readTime: "8 min read",
    views: "6.9K",
    link: "https://example.com/supply-chain-blockchain-finance",
    featured: false,
    tags: ["supply-chain", "blockchain", "trade-finance", "digital-transformation"]
  },
  {
    id: 16,
    title: "Private Equity Firms Target Healthcare Technology Investments",
    description: "Investment firms increase allocations to health-tech startups and established companies, betting on continued innovation in medical technology and digital health solutions.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
    category: "private-equity",
    author: "Dr. Rachel Green",
    publishDate: "2025-07-16",
    readTime: "6 min read",
    views: "7.3K",
    link: "https://example.com/private-equity-healthcare-tech",
    featured: false,
    tags: ["private-equity", "healthcare", "technology", "venture-capital"]
  },
  {
    id: 17,
    title: "Insurance Industry Adapts to Climate Risk Assessment Challenges",
    description: "Insurance companies develop new models and partnerships to better evaluate and price climate-related risks as extreme weather events become more frequent.",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop",
    category: "insurance",
    author: "William Anderson",
    publishDate: "2025-07-15",
    readTime: "7 min read",
    views: "5.8K",
    link: "https://example.com/insurance-climate-risk-assessment",
    featured: false,
    tags: ["insurance", "climate-risk", "risk-assessment", "sustainability"]
  },
  {
    id: 18,
    title: "Quantum Computing Investments Surge as Financial Applications Emerge",
    description: "Financial institutions and technology companies pour resources into quantum computing research, anticipating revolutionary applications in risk modeling and optimization.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop",
    category: "technology",
    author: "Dr. Kevin Liu",
    publishDate: "2025-07-14",
    readTime: "9 min read",
    views: "11.8K",
    link: "https://example.com/quantum-computing-finance-investments",
    featured: false,
    tags: ["quantum-computing", "technology", "risk-modeling", "innovation"]
  }
];
