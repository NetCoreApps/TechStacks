import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // Production build output to C# wwwroot
  output: isProd ? 'export' : undefined,
  distDir: '.next',

  // Image optimization configuration
  images: {
    unoptimized: isProd // Required for static export
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false
  },

  // Experimental features for middleware
  experimental: {
    // Enable middleware to handle API proxying
  }
};

export default nextConfig;
