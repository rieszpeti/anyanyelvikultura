import './carousel.css'
import Image from 'next/image'
import config from '../../../../payload.config'
import { getPayload } from 'payload'

export default async function Carousel() {
  const payload = await getPayload({ config })

  const pageRes = await payload.find({
    collection: 'carousel_images',
    draft: true,
  })

  const images = pageRes?.docs ?? []

  if (images.length === 0) return null

  return (
    <div className="carousel">
      <ul className="carousel-list">
        {images.map((image, index) => (
          <li key={index} className="carousel-item">
            <div className="carousel-images">
              <Image
                priority
                src={image.url!}
                alt={image.title || 'Image'}
                width={500}
                height={300}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0i..."
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
