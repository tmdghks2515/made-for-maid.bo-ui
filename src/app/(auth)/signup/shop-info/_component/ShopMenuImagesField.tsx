'use client'

import { memo } from 'react'
import FormLabel from '@mui/joy/FormLabel'
import { ShopMenuImageDTO } from '@/core/type/affiliation/shop.data'
import ImagesUpload from '@/component/input/ImagesUpload'
import { splitImageUrl } from '@/util/image.util'
import { ImageDTO } from '@/core/type/common/image.data'

type Props = {
  menuImages: ShopMenuImageDTO[]
  setFieldValue: (field: string, value: ShopMenuImageDTO[]) => void
}

const ShopMenuImagesField = ({ setFieldValue, menuImages }: Props) => {
  const images: ImageDTO[] = menuImages.map((image) => {
    const [path, fileName] = splitImageUrl(image.imageUrl)
    return {
      id: image.imageId,
      imageType: 'SHOP_MENU',
      path,
      fileName,
    }
  })

  const handleChangeImages = (newImages: ImageDTO[]) => {
    const newMenuImages = newImages.map((image, index) => ({
      imageId: image.id,
      imageUrl: image.path + image.fileName,
      displayOrder: index,
    }))
    setFieldValue('menuImages', newMenuImages)
  }

  return (
    <>
      <FormLabel>메뉴 이미지</FormLabel>

      <ImagesUpload images={images} onChange={handleChangeImages} />
    </>
  )
}

export default memo(ShopMenuImagesField)
