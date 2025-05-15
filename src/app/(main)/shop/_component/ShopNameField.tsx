'use client'

import { shopApi } from '@/core/api/affiliate/shop.api'
import useApi from '@/hook/useApi'
import { Button, FormControl, FormLabel, IconButton, Input } from '@mui/joy'
import { memo, useState } from 'react'
import Edit from '@mui/icons-material/Edit'

type Props = {
  shopId: string
  name: string
  onChange: (name: string) => void
}

function ShopNameField({ shopId, name: nameProp, onChange }: Props) {
  const [name, setName] = useState(nameProp)
  const [isEditMode, setIsEditMode] = useState(false)

  const { execute, isLoading } = useApi({
    api: shopApi.updateShopName,
    onSuccess: (resData) => {
      onChange(resData.name)
      setIsEditMode(false)
    },
  })

  return (
    <FormControl required={isEditMode}>
      <FormLabel htmlFor="name">업체명</FormLabel>

      {isEditMode ? (
        <div className="flex gap-1">
          <Input className={'flex-1'} name="name" value={name} onChange={(e) => setName(e.target.value)} />
          <Button
            variant="plain"
            color="neutral"
            size="sm"
            onClick={() => {
              setName(nameProp)
              setIsEditMode(false)
            }}
          >
            취소
          </Button>
          <Button
            variant="solid"
            color="primary"
            size="sm"
            loading={isLoading}
            onClick={() => {
              execute({ shopId, newName: name })
            }}
          >
            저장
          </Button>
        </div>
      ) : (
        <div className={'text-center'}>
          <span className="mr-2">{name}</span>
          <IconButton onClick={() => setIsEditMode(true)} size="sm">
            <Edit sx={{ fontSize: 12 }} />
          </IconButton>
        </div>
      )}
    </FormControl>
  )
}

export default memo(ShopNameField)
