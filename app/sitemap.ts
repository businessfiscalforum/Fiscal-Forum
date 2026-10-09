/** @type {import('next').MetadataRoute.Sitemap} */
export default function sitemap() {
  const base = "https://www.fiscalforum.in";

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/news`, lastModified: new Date() },
    { url: `${base}/newsletter`, lastModified: new Date() },
    { url: `${base}/work-with-us`, lastModified: new Date() },
    { url: `${base}/reports`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
    { url: `${base}/privacy`, lastModified: new Date() },
    { url: `${base}/about-us`, lastModified: new Date() },
    { url: `${base}/referrals`, lastModified: new Date() },
    { url: `${base}/refund`, lastModified: new Date() },
    { url: `${base}/shipping-policy`, lastModified: new Date() },
    { url: `${base}/terms-and-conditions`, lastModified: new Date() },
    { url: `${base}/shipping-policy`, lastModified: new Date() },

    { url: `${base}/services/financial-services`, lastModified: new Date() },
    { url: `${base}/services/mutual-funds`, lastModified: new Date() },
    { url: `${base}/services/insurance`, lastModified: new Date() },
    { url: `${base}/services/loan`, lastModified: new Date() },
    { url: `${base}/services/credit-card`, lastModified: new Date() },
    { url: `${base}/services/govt-bonds-and-fd`, lastModified: new Date() },

    { url: `${base}/work-with-us/business-development-partnership`, lastModified: new Date() },
    { url: `${base}/work-with-us/remisorship`, lastModified: new Date() },
    { url: `${base}/work-with-us/b2b-partnership`, lastModified: new Date() },

    { url: `${base}/reports/join`, lastModified: new Date() },

    { url: `${base}/services/financial-services/equity-etfs`, lastModified: new Date() },
    { url: `${base}/services/financial-services/futures-options`, lastModified: new Date() },
    { url: `${base}/services/financial-services/ipo`, lastModified: new Date() },
    { url: `${base}/services/financial-services/mtf`, lastModified: new Date() },
    { url: `${base}/services/financial-services/commodities`, lastModified: new Date() },
    { url: `${base}/services/financial-services/unlisted-shares`, lastModified: new Date() },
  ];
}