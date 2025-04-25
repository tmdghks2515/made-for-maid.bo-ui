'use client'

import { FormControl, FormLabel, Input } from '@mui/joy'
import { memo } from 'react'

type Props = {
  contactNumber: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ShopContactNumberField = ({ contactNumber, handleChange }: Props) => {
  return (
    <FormControl>
      <FormLabel required>업체 연락처</FormLabel>
      <Input name="contactNumber" value={contactNumber} placeholder="숫자만 입력해주세요." onChange={handleChange} />
    </FormControl>
  )
}

export default memo(ShopContactNumberField)
