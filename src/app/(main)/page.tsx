'use client'

import { useEffect } from 'react'
import useAdminStore from '@/store/useAdminStore'
import { useRouter } from 'next/navigation'

export default function MainPage() {
  const admin = useAdminStore((state) => state.admin)
  const router = useRouter()

  useEffect(() => {
    if (!admin) router.push('/signin')
  }, [admin])

  return admin && <div>메인화면</div>
}
