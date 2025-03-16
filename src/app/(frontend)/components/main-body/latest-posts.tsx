'use client'

import React, { useEffect, useState } from 'react'
import './latest-posts.css'
import { Post } from '@/payload-types'
import { BaseApiResponse } from '@/requests/base-api-request'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LatestPostsResponse extends BaseApiResponse<Post> {}

const LatestPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[] | undefined>(undefined)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response: LatestPostsResponse = await fetch('/api/posts/getLatestPosts/3').then(
          (res) => res.json(),
        )
        if (response && response.docs) {
          setPosts(response.docs)
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchPosts()
  }, [])

  if (posts === undefined || posts.length === 0) {
    return <></>
  }

  const formatDate = (date: string) => {
    const newDate = new Date(date)
    const year = newDate.getFullYear()
    const month = String(newDate.getMonth() + 1).padStart(2, '0')
    const day = String(newDate.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return (
    <div className="latestposts">
      <h2 className="latestposts-header">Hírek</h2>
      <ul className="latestposts-list">
        {posts.map((post, index) => (
          <li key={index} className="latestposts-item">
            <div className="latestposts-content">
              <h3 className="latestposts-title">{post.title}</h3>
              <p className="latestposts-date">{formatDate(post.updatedAt)}</p>
            </div>
          </li>
        ))}
      </ul>
      <a className="latestposts-more" href="/hirek">
        További hírek…
      </a>
    </div>
  )
}

export default LatestPosts
