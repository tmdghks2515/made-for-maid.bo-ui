type Role = 'USER' | 'SHOP_OWNER' | 'SHOP_MANAGER' | 'SHOP_STAFF' | 'SYSTEM_ADMIN' | 'SUPER_ADMIN'

type AdminDTO = {
  id: string
  accountId: string
  email: string
  nickname: string
  roles: Role[]
  profileImageUrl?: string
  shopId?: string
}

type SignInResStatus = 'SIGN_UP_SUCCESS' | 'SIGN_IN_SUCCESS' | 'PROFILE_SELECT' | 'OAUTH_FAILED'

type AdminSignInResDTO = {
  status: SignInResStatus
  accessToken?: string
  admin?: AdminDTO
}

export { SignInResStatus, AdminSignInResDTO, AdminDTO, Role }
