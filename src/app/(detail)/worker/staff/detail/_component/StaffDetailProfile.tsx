'use client'

import { memo, useState } from 'react'
import { StaffType } from '@/core/type/user/admin.data'
import ProfileAvatar from '@/component/display/ProfileAvatar'
import Edit from '@mui/icons-material/Edit'
import Camera from '@mui/icons-material/CameraAlt'
import Input from '@mui/joy/Input'
import Button from '@mui/joy/Button'
import useApi from '@/hook/useApi'
import { adminApi } from '@/core/api/user/admin.api'

type Props = {
  staffId: string
  nickname: string
  profileImageUrl: string | undefined
  staffType: StaffType
  onChange: (nickname: string, profileImageUrl: string | undefined) => void
}

function StaffDetailProfile({
  staffId,
  nickname: nicknameProp,
  profileImageUrl: profileImageUrlProp,
  staffType,
  onChange,
}: Props) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [nickname, setNickname] = useState(nicknameProp)
  const [profileImageUrl, setProfileImageUrl] = useState(profileImageUrlProp)

  const saveDisabled = !nickname.trim() || (nickname === nicknameProp && profileImageUrl === profileImageUrlProp)

  const { execute, isLoading } = useApi({
    api: adminApi.updateProfile,
    onSuccess: () => {
      onChange(nickname, profileImageUrl)
      setIsEditMode(false)
    },
  })

  const handleCancel = () => {
    setIsEditMode(false)
    setNickname(nicknameProp)
    setProfileImageUrl(profileImageUrlProp)
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 mb-8">
        {isEditMode ? (
          <>
            <div className="relative">
              <ProfileAvatar profileImageUrl={profileImageUrl} size="xl" staffType={staffType} />
              <span
                className="absolute bottom-0 right-0 bg-primary rounded-full text-primary-foreground border-2 border-primary-foreground w-8 h-8 flex items-center justify-center cursor-pointer"
                onClick={() => {
                  setIsEditMode(true)
                }}
              >
                <Camera sx={{ fontSize: 16 }} />
              </span>
            </div>
            <div>
              <Input value={nickname} onChange={(e) => setNickname(e.target.value)} name="nickname" />
            </div>

            <div className="flex gap-2">
              <Button variant="soft" color="neutral" onClick={handleCancel}>
                취소
              </Button>
              <Button
                variant="soft"
                disabled={saveDisabled}
                loading={isLoading}
                onClick={() =>
                  execute({
                    userId: staffId,
                    nickname,
                    profileImageUrl,
                  })
                }
              >
                저장
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="relative">
              <ProfileAvatar profileImageUrl={profileImageUrl} size="xl" staffType={staffType} />
              <span
                className="absolute bottom-0 right-0 bg-primary rounded-full text-primary-foreground border-2 border-primary-foreground w-8 h-8 flex items-center justify-center cursor-pointer"
                onClick={() => {
                  setIsEditMode(true)
                }}
              >
                <Edit sx={{ fontSize: 16 }} />
              </span>
            </div>
            <div>
              <span className="text-xl font-bold">{nickname}</span>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default memo(StaffDetailProfile)
