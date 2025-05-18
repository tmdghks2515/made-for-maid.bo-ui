import { ImageDTO } from '@/core/type/common/image.data'
import { memo } from 'react'
import Image from './Image'

export type ImagesProps = {
  images: ImageDTO[]
  countInRow?: number
  totalCount?: number
}

function Images({ images, countInRow = 4 }: ImagesProps) {
  const wrapperClassName = `grid grid-cols-${countInRow} gap-1`

  return (
    <>
      <div className={wrapperClassName}>
        {images.map((image, index) => (
          <div key={image.id} className={`relative w-full h-0 pb-[100%] overflow-hidden rounded-lg bg-gray-200`}>
            <Image imageType={image.imageType} imageUrl={`${image.path}${image.fileName}`} alt={`image-${index}`} />
          </div>
        ))}
      </div>
    </>
  )
}

export default memo(Images)
