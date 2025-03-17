import type { CollectionConfig } from 'payload'

export const CarouselImages: CollectionConfig = {
  slug: 'carousel_images',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
