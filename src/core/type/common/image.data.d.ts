type ImageType = 'PROFILE' | 'SHOP_MENU'

type UploadImageCommand = {
  file: File
  imageType: ImageType
}

type ImageDTO = {
  id: string
  imageType: ImageType
  fileName: string
  path: string
}

export { ImageType, UploadImageCommand, ImageDTO }
