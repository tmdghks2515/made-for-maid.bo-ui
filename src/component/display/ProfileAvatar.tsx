'use client'

import { memo } from 'react'
import { Avatar } from '@mui/joy'

type Props = {
  profileImageUrl: string | undefined
}
const cloudFrontUrl = `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}`
const defaultProfileUrl = '/common/profile-img/churr_default_profile.png'

const ProfileAvatar = ({ profileImageUrl }: Props) => {
  const src = `${cloudFrontUrl}${profileImageUrl || defaultProfileUrl}`

  return <Avatar alt="프로필 이미지" src={src} variant="outlined" sx={{ width: 80, height: 80 }} />
}

export default memo(ProfileAvatar)
