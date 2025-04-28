'use client'

import { memo } from 'react'
import { AdminProfileDTO, AdminSignInResDTO } from '@/core/type/user/admin.data'
import ProfileAvatar from '@/component/display/ProfileAvatar'
import useApi from '@/hook/useApi'
import { adminApi } from '@/core/api/user/admin.api'
import useAuthorize from '@/hook/useAuthorize'
import useSnackbar from '@/hook/useSnackbar'
import { Button } from '@mui/joy'
import { useRouter } from 'next/navigation'

type Props = {
  profile: AdminProfileDTO
}

const ProfileItem = ({ profile }: Props) => {
  const { signIn } = useAuthorize()
  const { openSnackbar } = useSnackbar()
  const router = useRouter()

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
    <Button className="flex flex-col w-28" variant="plain" onClick={() => execute(profile.userId)}>
      <ProfileAvatar profileImageUrl={profile.profileImageUrl} />
      <span className="text-sm line-clamp-2 text-foreground">{profile.nickname}</span>
      <span className="text-xs line-clamp-2 text-subtle">@{profile.shopName}</span>
    </Button>
  )
}

export default memo(ProfileItem)
