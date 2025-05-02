'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { StaffType } from '@/core/type/user/admin.data'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Chip from '@mui/joy/Chip'
import Option from '@mui/joy/Option'
import Select from '@mui/joy/Select'
import useCode from '@/hook/useCode'

export default function StaffConceptPage() {
  const router = useRouter()
  const { makeOptions } = useCode()
  const searchParams = useSearchParams()

  const [staffConcepts, setStaffConcepts] = useState<StaffType[]>([])

  const handleNext = () => {
    if (!searchParams.get('role')) {
      router.push('/signup/role')
      return
    }
    if (!searchParams.get('staffType')) {
      router.push('/signup/staff-type')
      return
    }
    if (!staffConcepts.length) {
      return
    }

    const newSearchParams = new URLSearchParams(searchParams)
    staffConcepts.forEach((concept) => {
      newSearchParams.append('staffConcepts', concept)
    })

    router.push(`/signup/shop-select?${newSearchParams.toString()}`)
  }

  return (
    <>
      <div>
        <p className="text-2xl font-bold mb-8">컨셉을 선택해주세요.</p>

        <Select
          onChange={(_, value) => {
            setStaffConcepts(value)
          }}
          value={staffConcepts}
          name='staffConcepts"'
          placeholder="컨셉을 선택해주세요."
          multiple
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', gap: '0.25rem' }}>
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

      <Button variant="soft" disabled={!staffConcepts.length} fullWidth onClick={handleNext}>
        다음
      </Button>
    </>
  )
}
