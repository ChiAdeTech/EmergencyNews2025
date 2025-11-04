import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // ✅ Allow images from any remote source (wildcard pattern)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    // Optional: Disable static import domain restrictions too
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
  },

  eslint: {
    // ✅ Prevent lint errors from failing your production Docker build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
