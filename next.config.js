/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: [
      'wildanazz.azureedge.net',
      'mosaic.scdn.co',
      'i.scdn.co',
      'res.cloudinary.com',
      'wildanazz.github.io',
      'raw.githubusercontent.com'
    ],
  },
  async rewrites() {
    return [
      {
        source: '/comments',
        destination:
          'https://wildanazz-comment-api-ccs6o.ondigitalocean.app/api/comments',
      },
    ]
  },
}

module.exports = nextConfig
