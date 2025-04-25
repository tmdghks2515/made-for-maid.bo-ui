'use client'

import { memo } from 'react'
import { FormLabel, IconButton } from '@mui/joy'
import { Add } from '@mui/icons-material'

type Props = {
  setFieldValue: (field: string, value: string[]) => void
  menuImageUrls: string[]
}

const ShopMenuImagesField = ({ setFieldValue, menuImageUrls }: Props) => {
  return (
    <>
      <FormLabel>업체 메뉴</FormLabel>
      <div>
        <IconButton className="w-20 h-20">
          <Add fontSize="large" />
        </IconButton>
      </div>
    </>
  )
}

export default memo(ShopMenuImagesField)
