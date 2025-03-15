import React from 'react'
import './main-body.css'
import Navbar from './navigation'
import Carousel from './carousel'
import LatestPosts from './latest-posts'

const MainBody = () => {
  return (
    <div className="main-body">
      <Navbar />
      <Carousel />
      <LatestPosts />
    </div>
  )
}

export default MainBody
