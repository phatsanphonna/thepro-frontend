/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => ([
    {
      source: '/api/auth/:path*',
      destination: 'http://localhost:7801/:path*'
    },
    {
      source: '/api/:path*',
      destination: 'http://localhost:7802/api/:path*'
    },
  ]),
  images: {
    domains: ['lh3.googleusercontent.com']
  }
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
