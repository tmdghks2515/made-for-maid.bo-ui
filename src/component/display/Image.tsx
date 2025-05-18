import { ImageType } from '@/core/type/common/image.data'
import { getResizedImageUrl } from '@/util/image.util'
import Close from '@mui/icons-material/Close'
import { memo, useState } from 'react'

const baseUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_URL

type Props = {
  imageUrl: string
  alt: string
  imageType: ImageType
}

function Image({ imageUrl, alt, imageType }: Props) {
  const [isImageViewOpen, setIsImageViewOpen] = useState(false)

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget
    target.onerror = null // 무한 루프 방지
    target.src = `${baseUrl}/${imageUrl}` // 리사이징 실패 시 원본 이미지로 대체
  }

  return (
    <>
      <img
        src={getResizedImageUrl(`${baseUrl}/${imageUrl}`, imageType)}
        alt={alt}
        className={`absolute top-0 left-0 w-full h-full object-cover`}
        onError={handleError}
        onClick={() => {
          setIsImageViewOpen(true)
        }}
      />

      {isImageViewOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="absolute top-4 right-4 text-white cursor-pointer" onClick={() => setIsImageViewOpen(false)}>
            <Close />
          </div>
          <img src={`${baseUrl}/${imageUrl}`} alt={alt} className={`max-w-full max-h-full object-contain`} />
        </div>
      )}
    </>
  )
}

export default memo(Image)
