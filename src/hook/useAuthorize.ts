import { AdminDTO } from '@/core/type/user/admin.data'
import useAdminStore from '@/store/useAdminStore'

const useAuthorize = () => {
  const setAccessToken = (accessToken: string) => {
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY &&
      localStorage.setItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY, accessToken)
  }
  const setAdmin = useAdminStore((state) => state.signIn)

  const signIn = (admin: AdminDTO, accessToken: string) => {
    setAdmin(admin)
    setAccessToken(accessToken)
  }

  return {
    setAccessToken,
    signIn,
  }
}

export default useAuthorize
