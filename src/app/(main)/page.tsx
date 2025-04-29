'use client'

import useAdminStore from '@/store/useAdminStore'
import Main from '@/component/layout/main/Main'

export default function MainPage() {
  const admin = useAdminStore((state) => state.admin)

  return <Main>메인화면</Main>
}
