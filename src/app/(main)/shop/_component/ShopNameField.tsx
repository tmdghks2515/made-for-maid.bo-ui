'use client'

import { shopService } from '@/core/service/affiliate/shop.service'
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
    api: shopService.updateShopName,
    onSuccess: (resData) => {
      onChange(resData.name)
      setIsEditMode(false)
    },
  })

  return (
    <FormControl required={isEditMode}>
      <div className="flex items-center justify-between">
        <FormLabel>업체명</FormLabel>
        {!isEditMode && (
          <IconButton onClick={() => setIsEditMode(true)} size="sm">
            <Edit sx={{ fontSize: 12 }} />
          </IconButton>
        )}
      </div>

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
            size="sm"
            loading={isLoading}
            disabled={!name || name === nameProp}
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
        </div>
      )}
    </FormControl>
  )
}

export default memo(ShopNameField)
