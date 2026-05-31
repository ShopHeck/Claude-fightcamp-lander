/** @type {import('next').NextConfig} */
const nextConfig = {
  caching: {
    // Disable cache for Cloudflare Pages
    staticRegeneratedTTL: 0,
  },
  onDemandEntries: {
    maxInactiveAge: 0,
    pagesBufferLength: 0,
  },
  experimental: {
    // Disable build cache
    disableStaticImages: false,
  },
};

module.exports = nextConfig;
