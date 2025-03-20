import Link from 'next/link'
import { getPayload } from 'payload'
import config from '../../../../payload.config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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
    return newDate.toISOString().split('T')[0] // YYYY-MM-DD
  }

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-2xl font-semibold text-center">Hírek</h2>
      <div className="grid gap-4">
        {posts.map((post, index) => (
          <Link href={`/posts/${post.id}`} key={index} passHref>
            <Card className="max-w-md m-auto w-1/2 cursor-pointer">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-500">
                {formatDate(post.updatedAt)}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div className="flex justify-center">
        <Button asChild variant="outline" className="max-w-md m-auto w-1/2">
          <Link href="/posts">További hírek…</Link>
        </Button>
      </div>
    </div>
  )
}
