type AdminKakaoSignInCommand = {
  oauthCode: string
  email: string // to be deleted
  oauthId: string // to be deleted
}

type CreateAdminCommand = {
  nickname: string
  shopId: string
}

type StaffType = 'MAID' | 'BUTTLER'

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

type CreateStaffCommand = {
  nickname: string
  shopId: string
  staffType: StaffType
  staffConcepts: StaffConcept[]
}

export { AdminKakaoSignInCommand, CreateAdminCommand, CreateStaffCommand, StaffConcept, StaffType }
