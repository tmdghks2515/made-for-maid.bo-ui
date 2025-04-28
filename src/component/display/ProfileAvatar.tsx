'use client'

import { memo } from 'react'
import { Avatar } from '@mui/joy'
import { StaffType } from '@/core/type/user/admin.data'

type Props = {
  profileImageUrl: string | undefined
  staffType: StaffType | undefined
}
const cloudFrontUrl = `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}`
const defaultMaidProfileUrl = '/common/profile-img/churr_default_profile_maid_120.png'
const defaultButlerProfileUrl = '/common/profile-img/churr_default_profile_butler_120.png'
const defaultProfileUrl = '/common/profile-img/churr_default_profile_120.png'

const ProfileAvatar = ({ profileImageUrl, staffType }: Props) => {
  const defaultUrl =
    staffType === 'MAID' ? defaultMaidProfileUrl : staffType === 'BUTLER' ? defaultButlerProfileUrl : defaultProfileUrl

  const src = `${cloudFrontUrl}${profileImageUrl || defaultUrl}`

  return <Avatar alt="프로필 이미지" src={src} variant="outlined" sx={{ width: 80, height: 80 }} />
}

export default memo(ProfileAvatar)
