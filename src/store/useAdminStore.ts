import { create } from 'zustand'
import { AdminDTO } from '@/core/type/user/admin.data'
import { persist } from 'zustand/middleware'

type AdminStore = {
  admin: AdminDTO | undefined
  signIn: (admin: AdminDTO) => void
  signOut: () => void
}

const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      admin: undefined,
      signIn: (admin) => set({ admin }),
      signOut: () => set({ admin: undefined }),
    }),
    {
      name: 'admin', // localStorage key
    },
  ),
)

export default useAdminStore
