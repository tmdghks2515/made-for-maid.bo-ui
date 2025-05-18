import { imageApi } from '@/core/api/common/image.api'
import { ImageDTO } from '@/core/type/common/image.data'
import useApi from '@/hook/useApi'
import Close from '@mui/icons-material/Close'
import Add from '@mui/icons-material/Add'
import { IconButton } from '@mui/joy'
import { memo, useRef } from 'react'
import Image from '../display/Image'

type Props = {
  images: ImageDTO[]
  onChange: (newImages: ImageDTO[]) => void
  countInRow?: number
}

const baseUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_URL

function ImagesUpload({ images, onChange, countInRow = 4 }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const { execute: executeUploadFile } = useApi({
    api: imageApi.uploadImage,
    onSuccess: (uploadedImage) => {
      onChange([...images, uploadedImage])
    },
  })

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      executeUploadFile({
        file,
        imageType: 'SHOP_MENU',
      })
    }
  }

  const handleClickAddImage = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <>
      <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${countInRow}, minmax(0, 1fr))` }}>
        <div className="w-full aspect-square">
          <IconButton className="w-18 h-18" onClick={handleClickAddImage}>
            <Add fontSize="large" />
          </IconButton>
        </div>

        {images.map((image, index) => (
          <div key={index} className="relative w-full aspect-square">
            <Image imageType={image.imageType} imageUrl={`${image.path}${image.fileName}`} alt={`image-${index}`} />
            <IconButton
              sx={{
                position: 'absolute',
                top: 4,
                right: 4,
                backgroundColor: 'white',
                borderRadius: '50%',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
              size="sm"
              onClick={() => {
                onChange(images.filter((_, i) => i !== index))
              }}
            >
              <Close fontSize="small" />
            </IconButton>
          </div>
        ))}
      </div>

      <input hidden={true} ref={inputRef} type="file" accept="image/*" onChange={handleChangeFile} />
    </>
  )
}

export default memo(ImagesUpload)
