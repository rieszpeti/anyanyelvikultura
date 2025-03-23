import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.PUBLIC_IMAGE_DOMAIN || 'localhost',
      },
      {
        protocol: 'https',
        hostname: process.env.PUBLIC_IMAGE_DOMAIN || 'localhost',
      },
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
