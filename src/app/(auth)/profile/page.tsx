'use client'

import BackHeader from '@/component/layout/header/BackHeader'
import useApi from '@/hook/useApi'
import { AdminProfileDTO, AdminSignInResDTO } from '@/core/type/user/admin.data'
import { adminApi } from '@/core/api/user/admin.api'
import { useRouter } from 'next/navigation'
import IconButton from '@mui/joy/IconButton'
import ProfileItem from '@/app/(auth)/profile/_component/ProfileItem'
import Add from '@mui/icons-material/Add'
import useSnackbar from '@/hook/useSnackbar'
import useAuthorize from '@/hook/useAuthorize'
import MainWrapper from '@/component/layout/wrapper/MainWrapper'

export default function ProfilePage() {
  const router = useRouter()
  const { signIn } = useAuthorize()
  const { openSnackbar } = useSnackbar()

  const { data: profiles = [] } = useApi<void, AdminProfileDTO[]>({
    api: adminApi.getProfiles,
    executeImmediately: true,
    globalLoading: true,
    onError: () => {
      router.push('/signin')
    },
  })

  const { execute } = useApi<string, AdminSignInResDTO>({
    api: adminApi.selectProfile,
    onSuccess: (resData) => {
      if (!resData.admin || !resData.accessToken) {
        openSnackbar({
          message: '프로필 선택에 실패했습니다.',
          variant: 'danger',
        })
        return
      }
      signIn(resData.admin, resData.accessToken)
      router.push('/')
    },
  })

  return (
    <>
      <BackHeader title="프로필 선택" />

      <MainWrapper>
        <div className="pt-30 pb-20">
          <p className="text-md font-bold mb-8 text-center">사용하실 프로필을 선택해 주세요</p>
          <div className="grid grid-cols-3 gap-2 items-baseline px-8 max-w-screen-sm mx-auto">
            {profiles.map((profile) => (
              <div className="mx-auto" key={profile.userId}>
                <ProfileItem profile={profile} onClick={() => execute(profile.userId)} />
              </div>
            ))}
            <div className="mx-auto">
              <IconButton variant="plain" className="w-28 h-32" onClick={() => router.push('/signup/role')}>
                <Add />
              </IconButton>
            </div>
          </div>
        </div>
      </MainWrapper>
    </>
  )
}
