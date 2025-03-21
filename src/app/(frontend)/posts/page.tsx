'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Post } from '../../../payload-types'

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchPosts(1).then((initialPosts) => {
      setPosts(initialPosts)
      setHasMore(initialPosts?.length > 0)
    })
  }, [])

  const loadMorePosts = async () => {
    setLoading(true)
    const newPosts = await fetchPosts(currentPage + 1)

    if (newPosts.length === 0) {
      setHasMore(false)
    } else {
      setPosts((prev) => [...prev, ...newPosts])
      setCurrentPage((prev) => prev + 1)
    }
    setLoading(false)
  }

  return (
    <main className="p-4">
      <h1 className="text-3xl font-semibold text-center my-6">Hírek</h1>
      <div className="space-y-6 px-4">
        {posts?.map((post) => (
          <Link key={post.id} href={`/posts/${post.slug}`} passHref>
            <Card className="max-w-md w-full mx-auto cursor-pointer min-h-24 mb-4">
              <CardContent className="flex flex-col justify-between h-full">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <Button onClick={loadMorePosts} disabled={loading}>
            {loading ? 'Töltés...' : 'További hírek betöltése'}
          </Button>
        </div>
      )}
    </main>
  )
}

async function fetchPosts(page: number, limit = 5) {
  const res = await fetch(`/api/posts?page=${page}&limit=${limit}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json()
  return data.docs as Post[]
}
