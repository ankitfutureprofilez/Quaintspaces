/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack5: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};
module.exports = nextConfig;