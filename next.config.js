/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["a0.muscache.com"],
  },
  webpack5: false,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  
  eslint: {
    ignoreDuringBuilds: true,
  },
};
module.exports = nextConfig;
