import Link from 'next/link'
import './latest-posts.css'
import { getPayload } from 'payload'
import config from '../../../../payload.config'

export default async function LatestPosts() {
  const payload = await getPayload({ config })

  const response = await payload.find({
    collection: 'posts',
    limit: 3,
    sort: '-updatedAt',
  })

  const posts = response?.docs ?? []

  if (posts.length === 0) return null

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
      <Link href="/posts" className="latestposts-more">
        További hírek…
      </Link>
    </div>
  )
}
