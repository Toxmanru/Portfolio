import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Prefer modern, smaller formats; Vercel serves AVIF/WebP where supported.
    formats: ['image/avif', 'image/webp'],
    // Keep optimized variants cached for a year so Vercel doesn't re-optimize
    // heavy source PNGs on-demand after the edge cache goes cold.
    minimumCacheTTL: 31536000,
    // Next 16 rejects any `quality` that is not listed here (HTTP 400).
    // 75 is the default (home page); 90 is used by case study images, where
    // small UI details and text must stay crisp on retina screens.
    // Note: Next encodes AVIF at `quality - 20`, so 75 -> AVIF 55 is too soft.
    qualities: [75, 90],
  },
};

export default nextConfig;
