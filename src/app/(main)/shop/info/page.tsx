'use client'

import MainWrapper from '@/component/layout/wrapper/MainWrapper'
import useHeaderStore from '@/store/useHeaderStore'
import { useEffect } from 'react'

export default function ShopInfoPage() {
  const setHederTitle = useHeaderStore((state) => state.setHeaderTitle)

  useEffect(() => {
    setHederTitle('업체 정보')
  }, [])

  return <MainWrapper className="">업체명</MainWrapper>
}
