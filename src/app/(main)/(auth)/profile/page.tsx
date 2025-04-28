'use client'

import BackHeader from '@/component/layout/header/BackHeader'
import useApi from '@/hook/useApi'
import { AdminProfileDTO } from '@/core/type/user/admin.data'
import { adminApi } from '@/core/api/user/admin.api'
import { useRouter } from 'next/navigation'
import Main from '@/component/layout/main/Main'
import { IconButton } from '@mui/joy'
import ProfileItem from '@/app/(main)/(auth)/profile/_component/ProfileItem'
import Add from '@mui/icons-material/Add'

export default function ProfilePage() {
  const router = useRouter()

  const { data: profiles = [] } = useApi<void, AdminProfileDTO[]>({
    api: adminApi.getProfiles,
    executeImmediately: true,
    onError: () => {
      router.push('/signin')
    },
  })

  return (
    <>
      <BackHeader title="프로필 선택" />

      <Main>
        <div className="pt-30 pb-20">
          <p className="text-md font-bold mb-8 text-center">사용하실 프로필을 선택해 주세요</p>
          <div className="grid grid-cols-3 gap-2 items-baseline px-8 max-w-screen-sm mx-auto">
            {profiles.map((profile) => (
              <div className="mx-auto" key={profile.userId}>
                <ProfileItem profile={profile} />
              </div>
            ))}
            <div className="mx-auto">
              <IconButton variant="plain" className="w-28 h-36" onClick={() => router.push('/signup/role')}>
                <Add />
              </IconButton>
            </div>
          </div>
        </div>
      </Main>
    </>
  )
}
