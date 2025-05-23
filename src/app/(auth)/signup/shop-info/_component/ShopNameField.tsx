'use client'

import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import { memo, useState } from 'react'

type Props = {
  name: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ShopNameField = ({ name, handleChange }: Props) => {
  return (
    <FormControl>
      <FormLabel required>업체명</FormLabel>
      <Input name="name" value={name} onChange={handleChange} placeholder="업체명을 입력해주세요." />
    </FormControl>
  )
}

export default memo(ShopNameField)
