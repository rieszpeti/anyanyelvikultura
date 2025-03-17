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
  serverURL: process.env.PAYLOAD_URL || 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  onInit: async (payload) => {
    const email = process.env.PAYLOAD_ADMIN_EMAIL
    const userName = process.env.PAYLOAD_ADMIN_USERNAME
    const password = process.env.PAYLOAD_ADMIN_PASSWORD

    if (!email || !userName || !password) {
      throw new Error(
        'Missing required environment variables: PAYLOAD_ADMIN_EMAIL, PAYLOAD_ADMIN_USERNAME, or PAYLOAD_ADMIN_PASSWORD',
      )
    }

    const existingAdmin = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
    })

    if (!existingAdmin.docs.length) {
      await payload.create({
        collection: 'users',
        data: {
          email: email,
          name: userName,
          password: password,
          role: 'admin',
        },
      })
    }

    // Define the pages to seed
    const pagesToSeed = [
      { title: 'Blankó Miklós', slug: 'blanko-miklos' },
      { title: 'Az alapítványról', slug: 'alapitvanyrol' },
      { title: 'Grétsy László-díj', slug: 'gretsy-laszlo-dij' },
    ]

    for (const page of pagesToSeed) {
      const existingPage = await payload.find({
        collection: 'pages',
        where: { slug: { equals: page.slug } },
      })

      if (!existingPage.docs.length) {
        await payload.create({
          collection: 'pages',
          data: {
            title: page.title,
            slug: page.slug,
            content: {
              root: {
                type: 'root',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    type: 'paragraph',
                    format: '',
                    indent: 0,
                    version: 1,
                    children: [
                      {
                        mode: 'normal',
                        text: 'asd',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    textStyle: '',
                    textFormat: 0,
                  },
                ],
                direction: 'ltr',
              },
            },
          },
        })
      }
    }
  },
})
