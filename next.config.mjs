import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // only for S3 images
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'http',
  //       hostname: process.env.PUBLIC_IMAGE_DOMAIN,
  //     },
  //   ],
  // },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
