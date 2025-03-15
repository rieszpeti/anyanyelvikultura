'use client'

import React, { useEffect, useState } from 'react'
import './carousel.css'
import Image from 'next/image'
import { CarouselImage } from '@/payload-types'
import { BaseApiResponse } from '@/requests/base-api-request'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CarouselResponse extends BaseApiResponse<CarouselImage> {}

const Carousel: React.FC = () => {
  const [images, setImages] = useState<CarouselImage[]>()

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response: CarouselResponse = await fetch('/api/carousel_images').then((res) =>
          res.json(),
        )
        if (response && response.docs) {
          setImages(response.docs)
        }
      } catch {}
    }

    fetchImages()
  }, [])

  if (images === undefined || images === null) {
    return <></>
  }

  return (
    <div className="carousel">
      <ul className="carousel-list">
        {images.map((image, index) => (
          <li key={index} className="carousel-item">
            <div className="carousel-images">
              <Image
                priority={true}
                src={image.url!}
                alt={image.title || 'Image'}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zY2hlbWFzL3NvY2lhbC9zdmcvMS4wL3JlY3QyQnBGRnBhT1h6cHhGQGhFfUwOBcE5hbWZmYXVmUyIHf2pOhtlFkwkOA+oMJlhYM6uZblmDsc4pycFSawQWmNEp7zsd44uYfaSYDbLO9MjV1tqFgCHMw8dvh4vKPEE63zml7wYB1meY2fm8u"
                width={-1}
                height={-1}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Carousel
