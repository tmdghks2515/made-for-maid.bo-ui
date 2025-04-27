import { AdminKakaoSignInCommand, CreateAdminCommand } from '@/core/type/user/admin.command'
import { AxiosResponse } from 'axios'
import { AdminSignInResDTO } from '@/core/type/user/admin.data'
import axiosInstance from '@/core/api/axios'

export const adminApi = {
  createOwner: (params: CreateAdminCommand): Promise<AxiosResponse<AdminSignInResDTO>> =>
    axiosInstance.post('/user/admin/owner', params),
  createManager: (params: CreateAdminCommand): Promise<AxiosResponse<string>> =>
    axiosInstance.post('/user/admin/manager', params),
  createStaff: (params: CreateAdminCommand): Promise<AxiosResponse<string>> =>
    axiosInstance.post('/user/admin/staff', params),
}
