import type { CollectionConfig, PayloadRequest } from 'payload'

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

      // If not logged in, you can oinly read published pages
      // This is called "query constraint"
      return {
        _status: {
          equals: 'published',
        },
      }
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
  endpoints: [
    {
      path: '/getLatestPosts/:maxPostsToReturn',
      method: 'get',
      handler: async (req: PayloadRequest) => {
        const routeParameters = req.routeParams
        const maxPostsToReturn = routeParameters?.maxPostsToReturn
        const maxPosts = parseInt(typeof maxPostsToReturn === 'string' ? maxPostsToReturn : '3', 10)

        try {
          const latestPosts = await req.payload.find({
            collection: 'posts',
            limit: maxPosts,
            sort: '-createdAt',
          })

          return Response.json(latestPosts)
        } catch (error) {
          return Response.json(
            {
              message: 'An error occurred while fetching the posts.',
              error: error || 'Unknown error',
            },
            { status: 500 },
          )
        }
      },
    },
  ],
}
