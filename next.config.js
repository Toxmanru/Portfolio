/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  poweredByHeader: false,
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [16, 32, 64, 128],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizeCss: false,
    forceSwcTransforms: false,
  }
}

module.exports = nextConfig
