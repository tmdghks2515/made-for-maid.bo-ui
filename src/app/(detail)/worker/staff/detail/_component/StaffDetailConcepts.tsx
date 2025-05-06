'use client'

import { memo, useState } from 'react'
import Chip from '@mui/joy/Chip'
import { StaffConcept } from '@/core/type/user/admin.data'
import useCode from '@/hook/useCode'
import Box from '@mui/joy/Box'
import Option from '@mui/joy/Option'
import Select from '@mui/joy/Select'
import IconButton from '@mui/joy/IconButton'
import Edit from '@mui/icons-material/Edit'
import Button from '@mui/joy/Button'
import useApi from '@/hook/useApi'
import { adminApi } from '@/core/api/user/admin.api'

type Props = {
  staffId: string
  staffConcepts: StaffConcept[] | undefined
  onChange: (staffConcepts: StaffConcept[] | undefined) => void
}

function StaffDetailConcepts({ staffId, staffConcepts, onChange }: Props) {
  const [staffConceptsState, setStaffConceptsState] = useState(staffConcepts)
  const [isEditMode, setIsEditMode] = useState(false)
  const { getDisplayName, makeOptions } = useCode()

  const { execute, isLoading } = useApi({
    api: adminApi.updateStaffConcepts,
    onSuccess: (_) => {
      onChange(staffConceptsState)
      setIsEditMode(false)
    },
  })

  const handleSave = () => {
    execute({
      userId: staffId,
      staffConcepts: staffConceptsState,
    })
  }

  const handleCancel = () => {
    setStaffConceptsState(staffConcepts)
    setIsEditMode(false)
  }

  return (
    <div className="flex gap-2">
      <span className="w-20">컨셉</span>
      {isEditMode ? (
        <>
          <div className="flex-1">
            <Select
              onChange={(_, value) => {
                setStaffConceptsState(value)
              }}
              value={staffConceptsState}
              name='staffConcepts"'
              placeholder="컨셉을 선택해주세요."
              multiple
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', gap: '0.25rem' }} className="flex-wrap">
                  {selected.map((selectedOption) => (
                    <Chip variant="soft" color="primary" key={selectedOption.id}>
                      {selectedOption.label}
                    </Chip>
                  ))}
                </Box>
              )}
            >
              {makeOptions('STAFF_CONCEPT').map(({ value, label }) => (
                <Option value={value} key={value}>
                  {label}
                </Option>
              ))}
            </Select>
          </div>
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
          <div className="flex flex-1 gap-1 flex-wrap">
            {staffConceptsState?.map((concept) => (
              <Chip variant="soft" color="primary" key={concept}>
                {getDisplayName(concept)}
              </Chip>
            ))}
          </div>
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

export default memo(StaffDetailConcepts)
