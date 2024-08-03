/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = {
  ...nextConfig,
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" }, 
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Adjust Webpack configuration for faster builds and improved performance
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        default: false,
      };
    }
    return config;
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors in development
  },
};
