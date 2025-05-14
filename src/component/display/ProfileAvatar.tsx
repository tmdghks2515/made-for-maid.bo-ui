'use client'

import { memo } from 'react'
import Avatar from '@mui/joy/Avatar'
import { StaffType } from '@/core/type/user/admin.data'

type Props = {
  profileImageUrl: string | undefined
  staffType: StaffType | undefined
  size?: 'sm' | 'md' | 'lg' | 'xl'
  useOriginal?: boolean
}
const cloudFrontUrl = `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}`
const defaultMaidProfileUrl = {
  xl: 'common/profile-img/churr_default_profile_maid_120.png',
  lg: 'common/profile-img/churr_default_profile_maid_120.png',
  md: 'common/profile-img/churr_default_profile_maid_60.png',
  sm: 'common/profile-img/churr_default_profile_maid_60.png',
}
const defaultButlerProfileUrl = {
  xl: 'common/profile-img/churr_default_profile_butler_120.png',
  lg: 'common/profile-img/churr_default_profile_butler_120.png',
  md: 'common/profile-img/churr_default_profile_butler_60.png',
  sm: 'common/profile-img/churr_default_profile_butler_60.png',
}
const defaultProfileUrl = {
  xl: 'common/profile-img/churr_default_profile_120.png',
  lg: 'common/profile-img/churr_default_profile_120.png',
  md: 'common/profile-img/churr_default_profile_60.png',
  sm: 'common/profile-img/churr_default_profile_60.png',
}
const width = {
  xl: 120,
  lg: 80,
  md: 50,
  sm: 30,
}
const ORIGINAL_SIZE_PATH_PREFIX = 'upload/original/'
const RESIZED_SIZE_PATH_PREFIX = {
  xl: 'upload/resized/200/',
  lg: 'upload/resized/200/',
  md: 'upload/resized/100/',
  sm: 'upload/resized/100/',
}

const ProfileAvatar = ({ profileImageUrl, staffType, size = 'md', useOriginal = false }: Props) => {
  const defaultUrl =
    staffType === 'MAID'
      ? defaultMaidProfileUrl[size]
      : staffType === 'BUTLER'
        ? defaultButlerProfileUrl[size]
        : defaultProfileUrl[size]

  const resizedUrl = useOriginal
    ? profileImageUrl
    : profileImageUrl?.replace(ORIGINAL_SIZE_PATH_PREFIX, RESIZED_SIZE_PATH_PREFIX[size])

  const src = `${cloudFrontUrl}/${resizedUrl || defaultUrl}`

  return <Avatar alt="프로필 이미지" src={src} variant="outlined" sx={{ width: width[size], height: width[size] }} />
}

export default memo(ProfileAvatar)
