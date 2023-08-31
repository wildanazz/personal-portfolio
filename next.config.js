/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['wildanazz.azureedge.net', 'mosaic.scdn.co', 'i.scdn.co'],
  },
}

module.exports = nextConfig
