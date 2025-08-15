import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'akm-img-a-in.tosshub.com',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "img.etimg.com", 
      },
      {
        protocol: "https",
        hostname: "economictimes.indiatimes.com", 
      },
    ],
  },
};

export default nextConfig;
