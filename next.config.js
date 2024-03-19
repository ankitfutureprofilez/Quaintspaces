// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ["quaintstays.laraveldevelopmentcompany.com"],
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
            {
              key: "Access-Control-Allow-Methods",
              value: "GET, POST, PUT, DELETE",
            },
            { key: "Access-Control-Allow-Headers", value: "Content-Type" },
          ],
        },
      ];
    },
  };
  