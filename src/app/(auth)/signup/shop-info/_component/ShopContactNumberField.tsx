'use client'

import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import { memo } from 'react'

type Props = {
  contactNumber: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ShopContactNumberField = ({ contactNumber, handleChange }: Props) => {
  return (
    <FormControl>
      <FormLabel required>업체 연락처</FormLabel>
      <Input
        name="contactNumber"
        value={contactNumber}
        placeholder="숫자만 입력해주세요."
        onChange={handleChange}
        slotProps={{
          input: {
            maxLength: 11,
          },
        }}
      />
    </FormControl>
  )
}

export default memo(ShopContactNumberField)
