import { getPayload } from 'payload'
import Link from 'next/link'
import React from 'react'
import config from '../../../payload.config'

import type { Post } from '../../../payload-types'

export default async function PostsPage() {
  const payload = await getPayload({ config })

  const postsRes = await payload.find({
    collection: 'posts',
    draft: true,
    limit: 100,
  })

  const posts = postsRes?.docs as Post[]

  if (!posts || posts.length === 0) {
    return <div>No posts found</div>
  }

  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
