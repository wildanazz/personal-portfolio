/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['wildanazz.azureedge.net'],
  },
}

module.exports = nextConfig
