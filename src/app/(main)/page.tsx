'use client'

import useAdminStore from '@/store/useAdminStore'

export default function MainPage() {
  const admin = useAdminStore((state) => state.admin)

  return <>메인화면</>
}
