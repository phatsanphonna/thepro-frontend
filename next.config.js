/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'http://localhost:7801/:path*'
      },
      {
        source: '/api/:path*',
        destination: 'http://localhost:7802/api/:path*'
      },
    ]
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
