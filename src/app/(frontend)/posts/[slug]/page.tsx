import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React, { Fragment } from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

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

  return (
    <Fragment>
      <main>
        <RichText data={post.content} />
      </main>
    </Fragment>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const pagesRes = await payload.find({
    collection: 'posts',
    depth: 0,
    draft: true,
    limit: 100,
  })

  const pages = pagesRes?.docs

  return pages.map(({ slug }) =>
    slug !== 'home'
      ? {
          slug,
        }
      : {},
  )
}
