import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "g3wlvawphh1gdavi.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "vz-9b35a891-b60.b-cdn.net",
      },
    ],
  },
};

export default nextConfig;
