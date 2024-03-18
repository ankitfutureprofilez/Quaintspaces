/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["a0.muscache.com"],
  },
  webpack5: false,
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  
  eslint: {
    ignoreDuringBuilds: true,
  },
};
module.exports = nextConfig;
