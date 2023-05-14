/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => ([
    {
      source: '/api/auth/:path*',
      destination: 'http://auth.theprotutor.net/:path*'
    },
    {
      source: '/api/:path*',
      destination: 'http://apiv2.theprotutor.net/api/:path*'
    },
  ])
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
