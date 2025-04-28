type Role = 'USER' | 'SHOP_OWNER' | 'SHOP_MANAGER' | 'SHOP_STAFF' | 'SYSTEM_ADMIN' | 'SUPER_ADMIN'

type StaffType = 'MAID' | 'BUTLER'

type StaffConcept =
  | 'STAFF_CONCEPT_DEMON'
  | 'STAFF_CONCEPT_ANGEL'
  | 'STAFF_CONCEPT_ANIMAL'
  | 'STAFF_CONCEPT_COOL'
  | 'STAFF_CONCEPT_SHY'
  | 'STAFF_CONCEPT_PURE'
  | 'STAFF_CONCEPT_GANG'
  | 'STAFF_CONCEPT_TSUNDERE'
  | 'STAFF_CONCEPT_YANDERE'
  | 'STAFF_CONCEPT_IDOL'
  | 'STAFF_CONCEPT_BIG'
  | 'STAFF_CONCEPT_SMALL'
  | 'STAFF_CONCEPT_MUSCLE'
  | 'STAFF_CONCEPT_OTHER'

type AdminDTO = {
  id: string
  accountId: string
  email: string
  nickname: string
  roles: Role[]
  primaryRole: Role
  profileImageUrl?: string
  shopId?: string
  staffType?: StaffType
  staffConcepts?: StaffConcept[]
}

type SignInResStatus = 'SIGN_UP_SUCCESS' | 'SIGN_IN_SUCCESS' | 'PROFILE_SELECT' | 'OAUTH_FAILED'

type AdminSignInResDTO = {
  status: SignInResStatus
  accessToken?: string
  admin?: AdminDTO
}

type AdminProfileDTO = {
  userId: string
  nickname: string
  profileImageUrl?: string
  staffType?: StaffType
  shopId: string
  shopName?: string
}

export { SignInResStatus, AdminSignInResDTO, AdminDTO, Role, AdminProfileDTO, StaffConcept, StaffType }
