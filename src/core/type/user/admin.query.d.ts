import { Role, StaffType } from '@/core/type/user/admin.data'

type SearchAdminQuery = {
  shopId?: string
  nicknameLike?: string
  primaryRoles?: Role[]
  staffType?: StaffType
}

export { SearchAdminQuery }
