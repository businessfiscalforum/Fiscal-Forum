export default function sitemap() {
  const base = "https://fiscalforum.in";

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/news`, lastModified: new Date() },
    { url: `${base}/newsletter`, lastModified: new Date() },
    { url: `${base}/work-with-us`, lastModified: new Date() },
    { url: `${base}/reports`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
    { url: `${base}/privacy`, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/referrals`, lastModified: new Date() },
    { url: `${base}/refunds`, lastModified: new Date() },
    { url: `${base}/terms-&amp;-conditions`, lastModified: new Date() },
    { url: `${base}/services/stock-investment`, lastModified: new Date() },
    { url: `${base}/services/mutual-funds`, lastModified: new Date() },
    { url: `${base}/services/insurance`, lastModified: new Date() },
    { url: `${base}/services/loan`, lastModified: new Date() },
    { url: `${base}/services/credit-card`, lastModified: new Date() },
    { url: `${base}/services/govt-bonds-&amp;-fd`, lastModified: new Date() },
    { url: `${base}/work-with-us`, lastModified: new Date() },
    { url: `${base}/work-with-us/business-development-partnership`, lastModified: new Date() },
    { url: `${base}/work-with-us/remisorship`, lastModified: new Date() },
    { url: `${base}/work-with-us/b2b-partnership`, lastModified: new Date() },
    { url: `${base}/reports/join`, lastModified: new Date() },
    { url: `${base}/services/stock-investment/equity-etfs`, lastModified: new Date() },
    { url: `${base}/services/stock-investment/futures-options`, lastModified: new Date() },
    { url: `${base}/services/stock-investment/ipo`, lastModified: new Date() },
    { url: `${base}/services/stock-investment/mtf`, lastModified: new Date() },
    { url: `${base}/services/stock-investment/commodities`, lastModified: new Date() },
    { url: `${base}/services/stock-investment/unlisted-shares`, lastModified: new Date() }
  ];
}
