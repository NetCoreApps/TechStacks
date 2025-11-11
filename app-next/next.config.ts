import type { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,

  // API proxy to backend
  async rewrites() {
    const apiUrl = process.env.API_URL || 'http://localhost:5000'
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
      {
        source: '/auth/:path*',
        destination: `${apiUrl}/auth/:path*`,
      },
      {
        source: '/users/:userId/avatar',
        destination: `${apiUrl}/users/:userId/avatar`,
      },
    ]
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'techstacks.io',
      },
      {
        protocol: 'https',
        hostname: 'cdn.techstacks.io',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.API_URL || 'http://localhost:5000',
  },
}

export default config
