import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  trailingSlash: false,
  allowedDevOrigins: ["192.168.1.9"],
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
        hostname: "www.canva.com",
      },
      {
        protocol: "https",
        hostname: "canva.com",
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
      {
        protocol: "https",
        hostname: "images.moneycontrol.com",
      },
      {
        protocol: "https",
        hostname: "th-i.thgim.com",
      },
      {
        protocol: "https",
        hostname: "www.livemint.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "nakul-prajapat.imgbb.com",
      },
      {
        protocol: "https",
        hostname: "ibb.co",
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "www.chittorgarh.net",
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "m.economictimes.com",
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "substackcdn.com",
        pathname: '/**',
      }
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