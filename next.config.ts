// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        // For placeholder images during development
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
