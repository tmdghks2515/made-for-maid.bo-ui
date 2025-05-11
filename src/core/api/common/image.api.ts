import { ImageDTO, UploadImageCommand } from '@/core/type/common/image.data'
import { AxiosResponse } from 'axios'
import axiosInstance from '../axios'

export const imageApi = {
  uploadImage: (params: UploadImageCommand): Promise<AxiosResponse<ImageDTO>> => {
    const formData = new FormData()
    formData.append('file', params.file)
    formData.append('imageType', params.imageType)
    return axiosInstance.post('/common/image/upload', formData, {
      headers: {
        'Content-Type': undefined,
      },
    })
  },
}
