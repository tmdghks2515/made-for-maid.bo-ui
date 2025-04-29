'use client'

import { Button } from '@mui/joy'
import { useRouter } from 'next/navigation'

export default function SignUpCompletePage() {
  const router = useRouter()

  return (
    <>
      <div>
        <p className="text-2xl font-bold mb-8">가입 신청이 완료되었어요!</p>

        <p className="text-lg mb-8">사장님에게 가입 승인을 요청해주세요!</p>
      </div>

      <Button onClick={() => router.push('/profile')}>확인</Button>
    </>
  )
}
