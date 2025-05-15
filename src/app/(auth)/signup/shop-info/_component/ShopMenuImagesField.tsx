'use client'

import { memo, useRef } from 'react'
import FormLabel from '@mui/joy/FormLabel'
import IconButton from '@mui/joy/IconButton'
import Add from '@mui/icons-material/Add'
import Close from '@mui/icons-material/Close'
import useApi from '@/hook/useApi'
import { imageApi } from '@/core/api/common/image.api'
import { ShopMenuImageDTO } from '@/core/type/affiliation/shop.data'

type Props = {
  menuImages: ShopMenuImageDTO[]
  setFieldValue: (field: string, value: ShopMenuImageDTO[]) => void
}

const ShopMenuImagesField = ({ setFieldValue, menuImages }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { execute: executeUploadFile } = useApi({
    api: imageApi.uploadImage,
    onSuccess: (uploadedImage) => {
      setFieldValue('menuImages', [
        ...menuImages,
        {
          imageId: uploadedImage.id,
          imageUrl: uploadedImage.path + uploadedImage.fileName,
          displayOrder: menuImages.length,
        },
      ])
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
      <FormLabel>메뉴 이미지</FormLabel>
      {/* 가로로 꽉찰시 다음 라인에서 노출 */}
      <div className="flex flex-wrap gap-2">
        <IconButton className="w-18 h-18" onClick={handleClickAddImage}>
          <Add fontSize="large" />
        </IconButton>

        {/* Display existing menu images */}
        {menuImages.map((menuImage, index) => (
          <div key={index} className="relative w-18 h-18">
            <img
              src={process.env.NEXT_PUBLIC_CLOUDFRONT_URL + '/' + menuImage.imageUrl}
              alt={`Menu Image ${index}`}
              className={'w-full h-full object-cover'}
            />
            <IconButton
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: 'white',
                borderRadius: '50%',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
              size="sm"
              onClick={() => {
                setFieldValue(
                  'menuImages',
                  menuImages.filter((_, i) => i !== index),
                )
              }}
            >
              <Close fontSize="small" />
            </IconButton>
          </div>
        ))}
      </div>

      {/* Hidden file input */}
      <input hidden={true} ref={inputRef} type="file" accept="image/*" onChange={handleChangeFile} />
    </>
  )
}

export default memo(ShopMenuImagesField)
