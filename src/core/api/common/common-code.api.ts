import { AxiosResponse } from 'axios'
import axiosInstance from '@/core/api/axios'
import { CommonCodeDTO } from '@/core/type/common/common-code.data'

export const commonCodeApi = {
  getCodeTree: (): Promise<AxiosResponse<CommonCodeDTO[]>> => axiosInstance.get('/common/code/tree'),
}
