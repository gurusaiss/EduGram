/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/edugram-app' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/edugram-app' : '',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
