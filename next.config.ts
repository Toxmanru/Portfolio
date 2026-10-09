import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Prefer modern, smaller formats; Vercel serves AVIF/WebP where supported.
    formats: ['image/avif', 'image/webp'],
    // Keep optimized variants cached for a year so Vercel doesn't re-optimize
    // heavy source PNGs on-demand after the edge cache goes cold.
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
