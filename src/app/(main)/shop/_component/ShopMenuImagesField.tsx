import { ShopMenuImageDTO } from '@/core/type/affiliation/shop.data'
import useApi from '@/hook/useApi'
import Edit from '@mui/icons-material/Edit'
import { Button, FormLabel, IconButton } from '@mui/joy'
import { memo, useRef, useState } from 'react'
import { shopApi } from '@/core/api/affiliate/shop.api'
import ImagesUpload from '@/component/input/ImagesUpload'
import { ImageDTO } from '@/core/type/common/image.data'
import { splitImageUrl } from '@/util/image.util'
import Images from '@/component/display/Images'

type Props = {
  shopId: string
  menuImages: ShopMenuImageDTO[]
  onChange: (newMenuImages: ShopMenuImageDTO[]) => void
}

function ShopMenuImagesField({ shopId, menuImages: menuImagesProp, onChange }: Props) {
  const [menuImages, setMenuImages] = useState(menuImagesProp)
  const [isEditMode, setIsEditMode] = useState(false)

  const handleChange = (newMenuImages: ShopMenuImageDTO[]) => {
    onChange(newMenuImages)
  }

  const { execute: executeUpdateMenuImages, isLoading } = useApi({
    api: shopApi.updateShopMenuImages,
    onSuccess: (resData) => {
      handleChange(resData.menuImages)
      setIsEditMode(false)
    },
  })

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
      shopId,
      imageId: image.id,
      imageUrl: image.path + image.fileName,
      displayOrder: index,
    }))
    setMenuImages(newMenuImages)
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <FormLabel>메뉴 이미지</FormLabel>
        {!isEditMode && (
          <IconButton
            size="sm"
            onClick={() => {
              setIsEditMode(true)
            }}
          >
            <Edit sx={{ fontSize: 12 }} />
          </IconButton>
        )}
      </div>

      {isEditMode ? <ImagesUpload images={images} onChange={handleChangeImages} /> : <Images images={images} />}

      {isEditMode && (
        <div className="flex justify-end mt-2 gap-1">
          <Button
            variant="plain"
            color="neutral"
            size="sm"
            onClick={() => {
              setMenuImages(menuImagesProp)
              setIsEditMode(false)
            }}
          >
            취소
          </Button>
          <Button
            size="sm"
            loading={isLoading}
            onClick={() => {
              executeUpdateMenuImages({
                shopId,
                newMenuImages: menuImages,
              })
            }}
          >
            저장
          </Button>
        </div>
      )}
    </>
  )
}

export default memo(ShopMenuImagesField)
