'use client'

import { memo } from 'react'
import { AdminProfileDTO } from '@/core/type/user/admin.data'
import ProfileAvatar from '@/component/display/ProfileAvatar'
import { Button } from '@mui/joy'

type Props = {
  profile: AdminProfileDTO
  onClick: () => void
}

const ProfileItem = ({ profile, onClick }: Props) => {
  return (
    <Button className="flex flex-col w-28" variant="plain" onClick={onClick}>
      <ProfileAvatar profileImageUrl={profile.profileImageUrl} staffType={profile.staffType} />
      <span className="text-sm line-clamp-2 text-foreground">{profile.nickname}</span>
      <span className="text-xs line-clamp-2 text-subtle">@{profile.shopName}</span>
    </Button>
  )
}

export default memo(ProfileItem)
