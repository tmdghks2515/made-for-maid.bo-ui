import { AxiosResponse } from 'axios'
import axiosInstance from '@/core/service/axios'
import { CommonCodeDTO } from '@/core/type/common/common-code.data'

export const commonCodeService = {
  getCodeTree: (): Promise<AxiosResponse<CommonCodeDTO[]>> => axiosInstance.get('/common/code/tree'),
}
