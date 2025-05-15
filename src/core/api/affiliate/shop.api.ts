import { ShopConcept, ShopDTO, ShopMenuImageDTO } from '@/core/type/affiliation/shop.data'
import { AxiosResponse } from 'axios'
import axiosInstance from '@/core/api/axios'
import { ValueLabel } from '@/core/type/shared/shared.data'

export const shopApi = {
  createShop: (params: ShopDTO): Promise<AxiosResponse<ShopDTO>> => axiosInstance.post('/affiliation/shop', params),
  autoCompleteSearch: (keyword: string): Promise<AxiosResponse<ValueLabel[]>> =>
    axiosInstance.get(`/affiliation/shop/autocomplete?keyword=${keyword}`),
  updateShopName: (params: { shopId: string; newName: string }): Promise<AxiosResponse<ShopDTO>> =>
    axiosInstance.put(`/affiliation/shop/update/name`, params),
  updateShopConcepts: (params: { shopId: string; newShopConcepts: ShopConcept[] }): Promise<AxiosResponse<ShopDTO>> =>
    axiosInstance.put(`/affiliation/shop/update/concepts`, params),
  updateShopMenuImages: (params: {
    shopId: string
    newMenuImages: ShopMenuImageDTO[]
  }): Promise<AxiosResponse<ShopDTO>> => axiosInstance.put(`/affiliation/shop/update/menu/images`, params),
  getShopDetail: (): Promise<AxiosResponse<ShopDTO>> => axiosInstance.get(`/affiliation/shop`),
}
