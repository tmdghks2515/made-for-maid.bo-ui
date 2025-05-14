'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import useApi from '@/hook/useApi'
import { adminApi } from '@/core/api/user/admin.api'
import { StaffConcept, StaffDetailDTO } from '@/core/type/user/admin.data'
import ProfileAvatar from '@/component/display/ProfileAvatar'
import Divider from '@mui/joy/Divider'
import Edit from '@mui/icons-material/Edit'
import { formatDate } from '@/util/date.util'
import StaffDetailIntroduction from '@/app/(detail)/worker/staff/detail/_component/StaffDetailIntroduction'
import StaffDetailConcepts from '@/app/(detail)/worker/staff/detail/_component/StaffDetailConcepts'
import StaffDetailProfile from '@/app/(detail)/worker/staff/detail/_component/StaffDetailProfile'

export default function StaffDetailPage() {
  const searchParams = useSearchParams()
  const staffId = searchParams.get('id')
  const router = useRouter()

  const [staff, setStaff] = useState<StaffDetailDTO>()

  const { execute } = useApi({
    api: adminApi.getStaffDetail,
    globalLoading: true,
    onSuccess: (resData) => {
      setStaff(resData)
    },
    onError: () => {
      router.back()
    },
  })

  const handleChangeProfile = (nickname: string, profileImageUrl: string | undefined) => {
    setStaff(
      (prevState) =>
        prevState && {
          ...prevState,
          nickname,
          profileImageUrl,
        },
    )
  }

  const handleChangeIntroduction = (newIntro: string | undefined) => {
    setStaff(
      (prevState) =>
        prevState && {
          ...prevState,
          introduction: newIntro,
        },
    )
  }

  const handleChangeConcepts = (newConcepts: StaffConcept[] | undefined) => {
    setStaff(
      (prevState) =>
        prevState && {
          ...prevState,
          staffConcepts: newConcepts,
        },
    )
  }

  useEffect(() => {
    if (!staffId) {
      router.back()
      return
    }
    execute(staffId)
  }, [staffId])

  if (!staff) return null
  return (
    <>
      {/* 프로필 영역 */}
      <StaffDetailProfile
        nickname={staff.nickname}
        profileImageId={staff.profileImageId}
        profileImageUrl={staff.profileImageUrl}
        staffId={staff.userId}
        staffType={staff.staffType}
        onChange={handleChangeProfile}
      />

      <Divider />
      {/* 상세 영역 */}
      <div className="p-2 mt-4 flex flex-col gap-6">
        <StaffDetailConcepts
          staffConcepts={staff.staffConcepts}
          staffId={staff.userId}
          onChange={handleChangeConcepts}
        />

        <StaffDetailIntroduction
          introduction={staff.introduction}
          staffId={staff.userId}
          onChange={handleChangeIntroduction}
        />

        <div className="flex gap-2">
          <span className="w-20">승인일자</span>
          <p className="text-sm">{staff.approvedAt ? formatDate(staff.approvedAt) : '미승인'}</p>
        </div>
      </div>
    </>
  )
}
