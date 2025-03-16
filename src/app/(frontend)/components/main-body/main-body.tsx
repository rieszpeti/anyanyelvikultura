import './main-body.css'
import Navbar from './navigation'
import Carousel from './carousel'
import LatestPosts from './latest-posts'

export default async function MainBody() {
  return (
    <div className="main-body">
      <Navbar />
      <Carousel />
      <LatestPosts />
    </div>
  )
}
