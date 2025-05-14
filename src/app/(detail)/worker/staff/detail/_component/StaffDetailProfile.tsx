'use client'

import { memo, useRef, useState } from 'react'
import { StaffType } from '@/core/type/user/admin.data'
import ProfileAvatar from '@/component/display/ProfileAvatar'
import Edit from '@mui/icons-material/Edit'
import Camera from '@mui/icons-material/CameraAlt'
import Input from '@mui/joy/Input'
import Button from '@mui/joy/Button'
import useApi from '@/hook/useApi'
import { adminApi } from '@/core/api/user/admin.api'
import { imageApi } from '@/core/api/common/image.api'

type Props = {
  staffId: string
  nickname: string
  profileImageId: string | undefined
  profileImageUrl: string | undefined
  staffType: StaffType
  onChange: (nickname: string, profileImageUrl: string | undefined) => void
}

function StaffDetailProfile({
  staffId,
  nickname: nicknameProp,
  profileImageId: profileImageIdProp,
  profileImageUrl: profileImageUrlProp,
  staffType,
  onChange,
}: Props) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [updateProfileParams, setUpdateProfileParams] = useState({
    userId: staffId,
    nickname: nicknameProp,
    profileImageUrl: profileImageUrlProp,
    profileImageId: profileImageIdProp,
  })

  const { nickname, profileImageUrl, profileImageId } = updateProfileParams

  const saveDisabled = !nickname.trim() || (nickname === nicknameProp && profileImageUrl === profileImageUrlProp)

  const { execute: executeUpdateProfile, isLoading } = useApi({
    api: adminApi.updateProfile,
    onSuccess: () => {
      onChange(nickname, profileImageUrl)
      setIsEditMode(false)
    },
  })

  const { execute: executeUploadImage } = useApi({
    api: imageApi.uploadImage,
    onSuccess: (uploadedImage) => {
      setUpdateProfileParams((prev) => ({
        ...prev,
        profileImageId: uploadedImage.id,
        profileImageUrl: uploadedImage.path + uploadedImage.fileName,
      }))
    },
  })

  const handleCancel = () => {
    setIsEditMode(false)
    setUpdateProfileParams({
      userId: staffId,
      nickname: nicknameProp,
      profileImageUrl: profileImageUrlProp,
      profileImageId: profileImageIdProp,
    })
  }

  const fileInputRef = useRef<HTMLInputElement>(null)

  // 클릭 시 실행되는 함수
  const handleUploadClick = () => {
    fileInputRef.current?.click() // input[type=file] 클릭 트리거
  }

  // 파일이 선택되었을 때 실행되는 함수
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    executeUploadImage({
      file,
      imageType: 'PROFILE',
    })
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
                onClick={handleUploadClick}
              >
                <Camera sx={{ fontSize: 16 }} />
              </span>
            </div>
            <div>
              <Input
                value={nickname}
                onChange={(e) =>
                  setUpdateProfileParams((prev) => ({
                    ...prev,
                    nickname: e.target.value,
                  }))
                }
                name="nickname"
              />
            </div>

            <div className="flex gap-2">
              <Button variant="soft" color="neutral" onClick={handleCancel}>
                취소
              </Button>
              <Button
                variant="soft"
                disabled={saveDisabled}
                loading={isLoading}
                onClick={() => executeUpdateProfile(updateProfileParams)}
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

      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
    </>
  )
}

export default memo(StaffDetailProfile)
