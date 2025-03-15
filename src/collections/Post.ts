import type { CollectionConfig, PayloadRequest } from 'payload'

export const Post: CollectionConfig = {
  slug: 'post',
  access: {
    read: () => true,
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
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: false,
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
            collection: 'post',
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
