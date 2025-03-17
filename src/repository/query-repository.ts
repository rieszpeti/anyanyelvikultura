import { CollectionSlug, getPayload } from 'payload'
import config from '../payload.config'

export async function getPagesSlugs(collectionName: 'pages' | 'posts') {
  const payload = await getPayload({ config })

  const pagesRes = await payload.find({
    collection: collectionName,
    depth: 0,
    draft: false,
    limit: 100,
  })

  const pages = pagesRes?.docs

  return pages.map(({ slug }) => ({
    slug,
  }))
}

export async function queryPageBySlug<T>(
  collectionName: CollectionSlug,
  paramsPromise: Promise<{
    slug?: string
  }>,
) {
  const { slug } = await paramsPromise
  const payload = await getPayload({ config })

  const pageRes = await payload.find({
    collection: collectionName,
    draft: true,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return pageRes?.docs?.[0] as null | T
}
