'use client'

import { memo } from 'react'
import FormLabel from '@mui/joy/FormLabel'
import IconButton from '@mui/joy/IconButton'
import { Add } from '@mui/icons-material'

type Props = {
  setFieldValue: (field: string, value: string[]) => void
  menuImageUrls: string[]
}

const ShopMenuImagesField = ({ setFieldValue, menuImageUrls }: Props) => {
  return (
    <>
      <FormLabel>메뉴 이미지</FormLabel>
      <div>
        <IconButton className="w-20 h-20">
          <Add fontSize="large" />
        </IconButton>
      </div>
    </>
  )
}

export default memo(ShopMenuImagesField)
