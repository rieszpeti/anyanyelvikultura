import { notFound } from 'next/navigation'
import React from 'react'
import { getPagesSlugs } from '@/repository/query-repository'
import ContentLayout from '../../components/content-layout/content-layout'
import { getPayload } from 'payload'
import type { Post } from '../../../../payload-types'

import config from '../../../../payload.config'

interface PageParams {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: PageParams) {
  const { slug = 'home' } = await paramsPromise
  const payload = await getPayload({ config })

  const pageRes = await payload.find({
    collection: 'posts',
    draft: true,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const post = pageRes?.docs?.[0] as null | Post

  if (post === null) {
    return notFound()
  }

  return <ContentLayout title={post?.title} content={post?.content} />
}

export async function generateStaticParams() {
  return getPagesSlugs('posts')
}
