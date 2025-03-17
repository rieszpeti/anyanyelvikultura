import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'role'],
    group: 'Users',
  },
  access: {
    admin: ({ req: { user } }) => {
      // Only allow admins to create user
      return user?.role === 'admin'
    },
    create: ({ req: { user } }) => {
      // Only allow admins to create user
      return user?.role === 'admin'
    },
    delete: ({ req: { user } }) => {
      // Only allow admins to create user
      return user?.role === 'admin'
    },
    read: ({ req: { user } }) => {
      // Only allow admins to create user
      return user?.role === 'admin'
    },
    update: ({ req: { user } }) => {
      // Only allow admins to create user
      return user?.role === 'admin'
    },
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: false,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      options: ['admin', 'user'],
      defaultValue: 'user',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
