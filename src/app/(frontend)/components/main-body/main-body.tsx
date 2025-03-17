import './main-body.css'
import Navbar from './navigation'
import Carousel from './carousel'
import LatestPosts from './latest-posts'

export default async function MainBody() {
  return (
    <>
      <Navbar />
      <Carousel />
      <LatestPosts />
    </>
  )
}
