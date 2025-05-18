'use client'

import { memo, useState } from 'react'
import IconButton from '@mui/joy/IconButton'
import Edit from '@mui/icons-material/Edit'
import { Textarea } from '@mui/joy'
import Button from '@mui/joy/Button'
import useApi from '@/hook/useApi'
import { adminService } from '@/core/service/user/admin.service'

type Props = {
  staffId: string
  introduction: string | undefined
  onChange: (introduction: string | undefined) => void
}

function StaffDetailIntroduction({ staffId, introduction, onChange }: Props) {
  const [introductionState, setIntroductionState] = useState(introduction)
  const [isEditMode, setIsEditMode] = useState(false)

  const { execute, isLoading } = useApi({
    api: adminService.updateStaffintroduction,
    onSuccess: (_) => {
      onChange(introductionState)
      setIsEditMode(false)
    },
  })

  const handleSave = () => {
    if (introductionState !== introduction) {
      execute({ userId: staffId, introduction: introductionState })
    } else {
      setIsEditMode(false)
    }
  }

  const handleCancel = () => {
    setIsEditMode(false)
    setIntroductionState(introduction)
  }

  return (
    <div className="flex gap-2">
      <span className="w-20">간략소개</span>
      {isEditMode ? (
        <>
          <Textarea
            className="flex-1"
            name="introduction"
            placeholder="간략소개..."
            value={introductionState || ''}
            onChange={(e) => setIntroductionState(e.target.value)}
          />
          <div className="flex flex-col gap-1">
            <Button size="sm" variant="soft" fullWidth onClick={handleSave} loading={isLoading}>
              저장
            </Button>
            <Button size="sm" color="neutral" variant="soft" fullWidth onClick={handleCancel}>
              취소
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="text-sm flex-1 break-all">{introductionState}</p>
          <div>
            <IconButton size="sm" onClick={() => setIsEditMode(true)}>
              <Edit className="text-muted" sx={{ fontSize: 16 }} />
            </IconButton>
          </div>
        </>
      )}
    </div>
  )
}

export default memo(StaffDetailIntroduction)
