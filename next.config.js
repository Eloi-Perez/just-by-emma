/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: `${process.env.BACKEND}/:path*`
      }
    ]
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
}

module.exports = nextConfig
