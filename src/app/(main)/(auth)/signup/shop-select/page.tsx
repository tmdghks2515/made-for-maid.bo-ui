'use client'

import { Button, FormControl, FormLabel } from '@mui/joy'
import { useState } from 'react'
import ShopSelect from '@/component/input/ShopSelect'
import { useRouter, useSearchParams } from 'next/navigation'
import useSnackbar from '@/hook/useSnackbar'

export default function ShopSelectPage() {
  const [shopId, setShopId] = useState<string>()

  const searchParams = useSearchParams()
  const role = searchParams.get('role')

  const router = useRouter()
  const { openSnackbar } = useSnackbar()

  const handleNext = () => {
    if (!role) {
      openSnackbar({
        message: '가입하실 권한을 선택해주세요.',
      })
      router.push('/signup/role')
      return
    }

    if (!shopId) {
      openSnackbar({
        message: '소속하신 업체를 선택해주세요.',
      })
      return
    }

    router.push(`/signup/nickname?role=${role}&shopId=${shopId}`)
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
