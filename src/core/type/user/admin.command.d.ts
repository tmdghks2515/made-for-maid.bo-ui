import { StaffConcept, StaffType } from '@/core/type/user/admin.data'

type AdminKakaoSignInCommand = {
  oauthCode: string
  email: string // to be deleted
  oauthId: string // to be deleted
}

type CreateAdminCommand = {
  nickname: string
  shopId: string
}

type CreateStaffCommand = {
  nickname: string
  shopId: string
  staffType: StaffType
  staffConcepts: StaffConcept[]
}

type UpdateProfileCommand = {
  userId: string
  nickname: string
  profileImageUrl?: string
}

export { AdminKakaoSignInCommand, CreateAdminCommand, CreateStaffCommand, UpdateProfileCommand }
