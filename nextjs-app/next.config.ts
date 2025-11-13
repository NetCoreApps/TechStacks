import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // Rewrite API requests to C# backend during development
  async rewrites() {
    if (isProd) return [];

    return [
      {
        source: '/api/:path*',
        destination: 'https://localhost:5001/api/:path*'
      },
      {
        source: '/auth/:path*',
        destination: 'https://localhost:5001/auth/:path*'
      },
      {
        source: '/users/:id/avatar',
        destination: 'https://localhost:5001/users/:id/avatar'
      },
      {
        source: '/login/:path*',
        destination: 'https://localhost:5001/login/:path*'
      }
    ];
  },

  // Production build output to C# wwwroot
  output: isProd ? 'export' : undefined,
  distDir: isProd ? '../TechStacks/wwwroot' : '.next',

  // Image optimization configuration
  images: {
    unoptimized: isProd // Required for static export
  },

  // Trailing slashes for compatibility
  trailingSlash: true,

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false
  }
};

export default nextConfig;
