// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // ❌ Don't block production builds on TypeScript errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // ❌ Don't block production builds on ESLint errors
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
