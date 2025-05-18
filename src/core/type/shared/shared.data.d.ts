type ValueLabel<T = any> = {
  value: T
  label: string
}

type Role = 'SUPER_ADMIN' | 'SYSTEM_ADMIN' | 'SHOP_OWNER' | 'SHOP_MANAGER' | 'SHOP_STAFF' | 'USER'

type PageableParams = {
  page?: number
  size?: number
  sort?: string | string[] // ['nickname,asc', 'createdAt,desc']
}

type Page<T> = {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number // 현재 페이지 (0-based)
  first: boolean
  last: boolean
  numberOfElements: number
  empty: boolean
}

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export { ValueLabel, Role, PageableParams, Page, Size }
