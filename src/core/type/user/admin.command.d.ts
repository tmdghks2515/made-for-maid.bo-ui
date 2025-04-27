type AdminKakaoSignInCommand = {
  oauthCode: string
  email: string // to be deleted
  oauthId: string // to be deleted
}

type CreateAdminCommand = {
  nickname: string
  shopId: string
}

export { AdminKakaoSignInCommand, CreateAdminCommand }
