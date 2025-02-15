import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co', // Replace with the actual image host
        pathname: '/mFdvYSPP/g-satsang.jpg', // Replace with the actual image path
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co', // Replace with the actual image host
        pathname: '/YBzfQgsL/aolf-logo-1.png', // Replace with the actual image path
      }
    ],
  },
};


export default nextConfig;
