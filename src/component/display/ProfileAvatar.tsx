'use client'

import { memo } from 'react'
import Avatar from '@mui/joy/Avatar'
import { StaffType } from '@/core/type/user/admin.data'

type Props = {
  profileImageUrl: string | undefined
  staffType: StaffType | undefined
  size?: 'sm' | 'md' | 'lg'
}
const cloudFrontUrl = `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}`
const defaultMaidProfileUrl = {
  lg: '/common/profile-img/churr_default_profile_maid_120.png',
  md: '/common/profile-img/churr_default_profile_maid_60.png',
  sm: '/common/profile-img/churr_default_profile_maid_60.png',
}
const defaultButlerProfileUrl = {
  lg: '/common/profile-img/churr_default_profile_butler_120.png',
  md: '/common/profile-img/churr_default_profile_butler_60.png',
  sm: '/common/profile-img/churr_default_profile_butler_60.png',
}
const defaultProfileUrl = {
  lg: '/common/profile-img/churr_default_profile_120.png',
  md: '/common/profile-img/churr_default_profile_60.png',
  sm: '/common/profile-img/churr_default_profile_60.png',
}
const width = {
  lg: 80,
  md: 50,
  sm: 30,
}

const ProfileAvatar = ({ profileImageUrl, staffType, size = 'md' }: Props) => {
  const defaultUrl =
    staffType === 'MAID'
      ? defaultMaidProfileUrl[size]
      : staffType === 'BUTLER'
        ? defaultButlerProfileUrl[size]
        : defaultProfileUrl[size]

  const src = `${cloudFrontUrl}${profileImageUrl || defaultUrl}`

  return <Avatar alt="프로필 이미지" src={src} variant="outlined" sx={{ width: width[size], height: width[size] }} />
}

export default memo(ProfileAvatar)
