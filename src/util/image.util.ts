import { ImageType } from '@/core/type/common/image.data'
import { Size } from '@/core/type/shared/shared.data'

export function splitImageUrl(url: string): string[] {
  const urlParts = url.split('/')
  const fileName = urlParts.pop() || ''
  const path = urlParts.join('/') + '/'
  return [path, fileName]
}

const originalImagePath = 'upload/original/'

const resizeImagePathMap: { [key in ImageType]: { [key in Size]: string } } = {
  SHOP_MENU: {
    xs: 'upload/resized/300/',
    sm: 'upload/resized/300/',
    md: 'upload/resized/300/',
    lg: 'upload/resized/300/',
    xl: 'upload/resized/300/',
  },
  PROFILE: {
    xs: 'upload/resized/100/',
    sm: 'upload/resized/100/',
    md: 'upload/resized/100/',
    lg: 'upload/resized/200/',
    xl: 'upload/resized/200/',
  },
}

export function getResizedImageUrl(url: string, imageType: ImageType, size: Size = 'md'): string {
  return url.replace(originalImagePath, resizeImagePathMap[imageType][size])
}
