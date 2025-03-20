import React from 'react'
import Image from 'next/image'
import { CarouselImage, Media } from '@/payload-types'

export interface BaseApiResponse<T> {
  docs: T[]
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
  nextPage: string | null
  page: number
  pagingCounter: number
  prevPage: string | null
  totalDocs: number
  totalPages: number
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CarouselResponse extends BaseApiResponse<CarouselImage> {}

export default async function Carousel() {
  const response = await fetch(`${process.env.PAYLOAD_URL}/api/carousel_images`)
  const carouselResponse: CarouselResponse = await response.json()

  if (!carouselResponse || !carouselResponse.docs || carouselResponse.docs.length === 0) {
    return <></>
  }

  return (
    <div className="carousel">
      <ul className="carousel-list">
        {carouselResponse?.docs?.map((docs, index) => (
          <li key={index} className="carousel-item">
            <div className="carousel-images">
              {docs?.media && (
                <Image
                  priority={true}
                  src={(docs.media as Media).url!}
                  alt={docs.title || 'Image'}
                  width={(docs.media as Media).width || 400}
                  height={(docs.media as Media).height || 600}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
