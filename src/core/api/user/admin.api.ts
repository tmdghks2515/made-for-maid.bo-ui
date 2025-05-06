import {
  AdminKakaoSignInCommand,
  CreateAdminCommand,
  CreateStaffCommand,
  UpdateProfileCommand,
} from '@/core/type/user/admin.command'
import { AxiosResponse } from 'axios'
import { AdminDTO, AdminProfileDTO, AdminSignInResDTO, StaffConcept, StaffDetailDTO } from '@/core/type/user/admin.data'
import axiosInstance from '@/core/api/axios'
import { SearchAdminQuery } from '@/core/type/user/admin.query'
import { Page, PageableParams } from '@/core/type/shared/shared.data'

export const adminApi = {
  createOwner: (params: CreateAdminCommand): Promise<AxiosResponse<AdminSignInResDTO>> =>
    axiosInstance.post('/user/admin/owner', params),
  createManager: (params: CreateAdminCommand): Promise<AxiosResponse<string>> =>
    axiosInstance.post('/user/admin/manager', params),
  createStaff: (params: CreateStaffCommand): Promise<AxiosResponse<string>> =>
    axiosInstance.post('/user/admin/staff', params),
  getProfiles: (): Promise<AxiosResponse<AdminProfileDTO[]>> => axiosInstance.get('/user/admin/profiles'),
  selectProfile: (userId: string): Promise<AxiosResponse<AdminSignInResDTO>> =>
    axiosInstance.post(`/user/admin/profile/${userId}`),
  searchAdmins: (params: SearchAdminQuery & PageableParams): Promise<AxiosResponse<Page<AdminDTO>>> =>
    axiosInstance.get(`/user/admin/search`, { params }),
  approveAdmin: (userId: string): Promise<AxiosResponse<void>> => axiosInstance.post(`/user/admin/approve/${userId}`),
  rejectAdmin: (userId: string): Promise<AxiosResponse<void>> => axiosInstance.post(`/user/admin/reject/${userId}`),
  getStaffDetail: (id: string): Promise<AxiosResponse<StaffDetailDTO>> => axiosInstance.get(`/user/admin/staff/${id}`),
  updateStaffintroduction: (params: { userId: string; introduction: string | undefined }): Promise<AxiosResponse> =>
    axiosInstance.post(`/user/admin/staff/introduction`, params),
  updateStaffConcepts: (params: {
    userId: string
    staffConcepts: StaffConcept[] | undefined
  }): Promise<AxiosResponse> => axiosInstance.post(`/user/admin/staff/concepts`, params),
  updateProfile: (params: UpdateProfileCommand): Promise<AxiosResponse> =>
    axiosInstance.post(`/user/admin/profile`, params),
}
