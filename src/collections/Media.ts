import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
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
  fields: [],
  upload: true,
}
