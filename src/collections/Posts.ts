import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => `${process.env.PAYLOAD_URL}/${process.env.PAYLOAD_URL_POSTS}/${data.slug}`,
    },
  },
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
