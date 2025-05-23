'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Button from '@mui/joy/Button'
import { StaffType } from '@/core/type/user/admin.data'
import StaffTypeRadioGroup from '@/app/(auth)/signup/staff-type/_component/StaffTypeRadioGroup'

export default function StaffTypePage() {
  const router = useRouter()

  const searchParams = useSearchParams()
  const role = searchParams.get('role')

  const [staffType, setStaffType] = useState<StaffType>()

  const handleNext = () => {
    if (!role) {
      router.push('/signup/role')
      return
    }
    if (!staffType) return

    router.push(`/signup/staff-concept?role=${role}&staffType=${staffType}`)
  }

  return (
    <>
      <div>
        <p className="text-2xl font-bold mb-8">메이드/집사를 선택해주세요.</p>
        <StaffTypeRadioGroup staffType={staffType} setStaffType={setStaffType} />
      </div>

      <Button variant="soft" disabled={!staffType} fullWidth onClick={handleNext}>
        다음
      </Button>
    </>
  )
}
