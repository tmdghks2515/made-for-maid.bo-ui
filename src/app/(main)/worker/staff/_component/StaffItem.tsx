'use client'

import { AdminDTO } from '@/core/type/user/admin.data'
import { memo } from 'react'
import ProfileAvatar from '@/component/display/ProfileAvatar'
import Button from '@mui/joy/Button'

type Props = {
  staff: AdminDTO
  onApprove: (staff: AdminDTO) => void
  onReject: (staff: AdminDTO) => void
  onClick: (staff: AdminDTO) => void
}

// 츄르 수, 가입일, 승인버튼
const StaffItem = ({ staff, onApprove, onReject, onClick }: Props) => {
  return (
    <div
      className="bg-background py-3 px-4 rounded-lg shadow-sm flex flex-col gap-1 items-center cursor-pointer hover:bg-background/50"
      onClick={() => onClick(staff)}
    >
      <ProfileAvatar staffType={staff.staffType} profileImageUrl={staff.profileImageUrl} />
      <span className="font-bold text-md line-clamp-2 break-all whitespace-normal">{staff.nickname}</span>

      {!staff.approvedAt && (
        <>
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onApprove(staff)
            }}
            fullWidth
          >
            가입승인
          </Button>
          <Button
            size="sm"
            variant="soft"
            color="neutral"
            onClick={(e) => {
              e.stopPropagation()
              onReject(staff)
            }}
            fullWidth
          >
            삭제
          </Button>
        </>
      )}
    </div>
  )
}

export default memo(StaffItem)
