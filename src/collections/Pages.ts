import { getEnvVar } from '@/payload.config'
import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => `${getEnvVar('PAYLOAD_URL')}/${data.slug}`,
    },
  },
  access: {
    read: ({ req: { user } }) => {
      // Logged in users can read anything
      if (user) return true

      // If not logged in, you can oinly read published pages
      // This is called "query constraint"
      return {
        _status: {
          equals: 'published',
        },
      }
    },
    create: ({ req: { user } }) => {
      // Only allow admins to create pages
      return user?.role === 'admin'
    },
    update: async ({ req: { user } }) => {
      // Allow both admins and regular users to modify pages
      return Boolean(user)
    },
    delete: ({ req: { user } }) => {
      // Only allow admins to delete pages
      return user?.role === 'admin'
    },
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}
