import path from 'path'
import { fileURLToPath } from 'url'

import type { CollectionConfig } from 'payload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: ({ req: { user } }) => {
      // Logged in users can read anything
      if (user) return true

      // If not logged in, you can only read published pages
      // This is called "query constraint"
      return {
        _status: {
          equals: 'published',
        },
      }
    },
    create: ({ req: { user } }) => {
      // Allow both admins and regular users to modify pages
      return Boolean(user)
    },
    update: async ({ req: { user } }) => {
      // Allow both admins and regular users to modify pages
      return Boolean(user)
    },
    delete: ({ req: { user } }) => {
      // Allow both admins and regular users to modify pages
      return Boolean(user)
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        return {
          ...data,
          url: `/media/${data.filename}`,
        }
      },
    ],
  },
}
