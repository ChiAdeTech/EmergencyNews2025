import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**", // your fallback images
      },
      {
        protocol: "https",
        hostname: "i.guim.co.uk", // The Guardian images
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "static01.nyt.com", // NYTimes
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "ichef.bbci.co.uk", // BBC
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "emergencynews2025.onrender.com", // if your Django API serves images
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
