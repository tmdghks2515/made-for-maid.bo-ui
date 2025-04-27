import { ShopDTO } from '@/core/type/affiliation/shop.data'
import { AxiosResponse } from 'axios'
import axiosInstance from '@/core/api/axios'
import { ValueLabel } from '@/core/type/shared/shared.data'

export const shopApi = {
  createShop: (params: ShopDTO): Promise<AxiosResponse<ShopDTO>> => axiosInstance.post('/affiliation/shop', params),
  autoCompleteSearch: (keyword: string): Promise<AxiosResponse<ValueLabel[]>> =>
    axiosInstance.get(`/affiliation/shop/autocomplete?keyword=${keyword}`),
}
