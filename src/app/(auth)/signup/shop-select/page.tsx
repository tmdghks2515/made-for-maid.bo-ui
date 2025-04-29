'use client'

import { Button, FormControl, FormLabel } from '@mui/joy'
import { useState } from 'react'
import ShopSelect from '@/component/input/ShopSelect'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ShopSelectPage() {
  const [shopId, setShopId] = useState<string>()

  const searchParams = useSearchParams()
  const role = searchParams.get('role')

  const router = useRouter()

  const handleNext = () => {
    if (!role) {
      router.push('/signup/role')
      return
    }

    if (role === 'SHOP_STAFF') {
      if (!searchParams.get('staffType')) {
        router.push(`/signup/staff-type?${new URLSearchParams(searchParams).toString()}`)
        return
      }
      if (!searchParams.has('staffConcepts')) {
        router.push(`/signup/staff-concept?${new URLSearchParams(searchParams).toString()}`)
        return
      }
    }

    if (!shopId) {
      return
    }

    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('shopId', shopId)
    router.push(`/signup/nickname?${newSearchParams.toString()}`)
  }

  return (
    <>
      <div>
        <p className="text-2xl font-bold mb-8">소속하신 업체를 입력해주세요.</p>

        <div>
          <FormControl required>
            <FormLabel>업체</FormLabel>
            <ShopSelect onChange={setShopId} />
          </FormControl>
        </div>
      </div>
      <Button variant="soft" disabled={!shopId} onClick={() => handleNext()}>
        다음
      </Button>
    </>
  )
}
