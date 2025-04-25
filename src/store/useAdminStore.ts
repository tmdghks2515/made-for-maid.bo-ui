import { create } from 'zustand'
import { AdminDTO } from '@/core/type/user/user.data'

type AdminStore = {
  admin: AdminDTO | undefined
  signIn: (admin: AdminDTO) => void
  signOut: () => void
}

const useAdminStore = create<AdminStore>((set) => {
  return {
    admin: undefined,
    signIn: (admin: AdminDTO) => {
      set(() => ({
        admin,
      }))
    },
    signOut: () => {
      set(() => ({
        admin: undefined,
      }))
    },
  }
})

export default useAdminStore
