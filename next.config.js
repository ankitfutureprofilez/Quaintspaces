/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["quaintstays.laraveldevelopmentcompany.com"],
  },
  webpack5: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};
module.exports = nextConfig;