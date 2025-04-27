import { AdminKakaoSignInCommand, CreateAdminCommand } from '@/core/type/user/admin.command'
import { AxiosResponse } from 'axios'
import { AdminSignInResDTO } from '@/core/type/user/admin.data'
import axiosInstance from '@/core/api/axios'

export const adminAuthApi = {
  adminKakaoSignIn: (params: AdminKakaoSignInCommand): Promise<AxiosResponse<AdminSignInResDTO>> =>
    axiosInstance.post('/user/auth/admin/signin/kakao', params),
}
