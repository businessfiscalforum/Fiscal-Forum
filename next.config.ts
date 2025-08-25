import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'akm-img-a-in.tosshub.io',
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
       {
        protocol: "https",
        hostname: "images.news18.com", 
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
  
  // Serve uploaded files from the uploads directory
  async headers() {
    return [
      {
        source: '/uploads/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;