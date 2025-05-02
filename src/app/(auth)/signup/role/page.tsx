'use client'

import RoleRadioGroup from '@/app/(auth)/signup/role/_component/RoleRadioGroup'
import Button from '@mui/joy/Button'
import { useState } from 'react'
import { Role } from '@/core/type/user/admin.data'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const [role, setRole] = useState<Role>()

  const router = useRouter()

  const handleNext = () => {
    if (!role) return
    if (role === 'SHOP_OWNER') router.push(`/signup/shop-info?role=${role}`)
    else if (role === 'SHOP_STAFF') router.push(`/signup/staff-type?role=${role}`)
    else if (role === 'SHOP_MANAGER') router.push(`/signup/shop-select?role=${role}`)
  }

  return (
    <>
      <div>
        <p className="text-2xl font-bold mb-8">가입하실 역할을 선택해주세요.</p>
        <RoleRadioGroup role={role} setRole={setRole} />
      </div>

      <Button variant="soft" disabled={!role} fullWidth onClick={handleNext}>
        다음
      </Button>
    </>
  )
}
