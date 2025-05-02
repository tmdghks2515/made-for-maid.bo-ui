import { Role } from '@/core/type/user/admin.data'

type StaffType = 'MAID' | 'BUTLER'

type SearchAdminQuery = {
  shopId?: string
  nicknameLike?: string
  primaryRoles?: Role[]
  staffType?: StaffType
}

export { SearchAdminQuery, StaffType }
