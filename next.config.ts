// next.config.ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "pub-5080dc5a6739471db0d03a2c2b4f8381.r2.dev",
      },
      {
        protocol: "https",
        hostname: "assets.uiwomeninbusiness.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};
export default nextConfig;