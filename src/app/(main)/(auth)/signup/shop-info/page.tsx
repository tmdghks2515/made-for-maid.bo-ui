'use client'

import { Button, FormControl, FormLabel, Input } from '@mui/joy'

export default function ShopInfoPage() {
  return (
    <>
      <div>
        <p className="text-2xl font-bold mb-8">업체 정보를 입력해주세요.</p>

        <FormControl>
          <FormLabel required>업체명</FormLabel>
          <Input placeholder="업체명을 입력해주세요." />
        </FormControl>
      </div>

      <Button variant="outlined">다음</Button>
    </>
  )
}
