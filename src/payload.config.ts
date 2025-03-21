// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { CarouselImages } from './collections/CarouselImages'
import { Pages } from './collections/Pages'
import { seedAdminUser } from './seeds/seed-admin'
import { seedPages } from './seeds/seed-pages'
import { getEnvVar } from './getEnvVar'
// import { s3Storage } from '@payloadcms/storage-s3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, CarouselImages, Pages],
  editor: lexicalEditor(),
  serverURL: getEnvVar('PAYLOAD_URL'),
  secret: getEnvVar('PAYLOAD_SECRET'),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: getEnvVar('DATABASE_URI'),
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // TODO: add S3 storage
    // s3Storage({
    //   collections: {
    //     media: {
    //       prefix: 'media',
    //     },
    //   },
    //   bucket: getEnvVar('S3_BUCKET'),
    //   config: {
    //     forcePathStyle: true,
    //     credentials: {
    //       accessKeyId: getEnvVar('S3_ACCESS_KEY_ID'),
    //       secretAccessKey: getEnvVar('S3_SECRET_ACCESS_KEY'),
    //     },
    //     region: getEnvVar('S3_REGION'),
    //     endpoint: getEnvVar('S3_ENDPOINT'),
    //   },
    // }),
  ],
  onInit: async (payload) => {
    await seedAdminUser(payload)
    await seedPages(payload)
  },
})
