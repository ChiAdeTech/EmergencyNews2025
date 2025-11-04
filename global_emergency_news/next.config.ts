import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "a3.espncdn.com",
      "i.cbc.ca",
    ],
  },

  eslint: {
    // ✅ Prevent lint errors from failing your production Docker build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
