import { AdminKakaoSignInCommand } from '@/core/type/user/user.command'
import { AxiosResponse } from 'axios'
import { AdminSignInResDTO } from '@/core/type/user/user.data'
import axios from '@/core/api/axios'

export const adminAuthApi = {
  adminKakaoSignIn: (params: AdminKakaoSignInCommand): Promise<AxiosResponse<AdminSignInResDTO>> =>
    axios.post('/user/auth/admin/signin/kakao', params),
}
