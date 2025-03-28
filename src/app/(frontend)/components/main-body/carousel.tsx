import React from 'react'
import Image from 'next/image'
import { CarouselImage, Media } from '@/payload-types'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { getEnvVar } from '@/getEnvVar'

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

export default async function MyCarousel() {
  const baseUrl = getEnvVar('PAYLOAD_URL')

  try {
    const response = await fetch(`${baseUrl}/api/carousel_images`)
    const carouselResponse: CarouselResponse = await response.json()

    if (!carouselResponse || !carouselResponse.docs || carouselResponse.docs.length === 0) {
      return <></>
    }

    return (
      <Carousel className="m-auto w-full max-w-xs mt-6">
        <CarouselContent>
          {carouselResponse.docs.map((doc, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    {doc.media && (
                      <Image
                        priority={true}
                        src={(doc.media as Media).url!}
                        alt={doc.title || 'Image'}
                        width={(doc.media as Media).width || 400}
                        height={(doc.media as Media).height || 600}
                      />
                    )}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 hidden sm:block">
          <CarouselPrevious />
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 hidden sm:block">
          <CarouselNext />
        </div>
      </Carousel>
    )
  } catch {
    return <></>
  }
}
