const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["a0.muscache.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
