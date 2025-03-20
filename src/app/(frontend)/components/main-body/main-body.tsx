import Carousel from './carousel'
import LatestPosts from './latest-posts'

export default async function MainBody() {
  return (
    <>
      <LatestPosts />
      <Carousel />
    </>
  )
}
