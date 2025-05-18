'use client'

import { memo, useEffect, useState } from 'react'
import useApi from '@/hook/useApi'
import { shopService } from '@/core/service/affiliate/shop.service'
import Autocomplete from '@mui/joy/Autocomplete'
import { ValueLabel } from '@/core/type/shared/shared.data'
import useDebounce from '@/hook/useDebounce'

type Props = {
  onChange: (value: string | undefined) => void
}

const ShopSelect = ({ onChange }: Props) => {
  const [keyword, setKeyword] = useState('')
  const [selected, setSelected] = useState<ValueLabel | null>(null)

  const debouncedKeyword = useDebounce(keyword, 500)

  const { execute, data: shops = [] } = useApi<string, ValueLabel[]>({
    api: shopService.autoCompleteSearch,
  })

  useEffect(() => {
    debouncedKeyword && execute(debouncedKeyword)
  }, [debouncedKeyword])

  useEffect(() => {
    onChange(selected?.value)
  }, [selected])

  return (
    <Autocomplete
      value={selected}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      onChange={(_, newValue) => setSelected(newValue)}
      placeholder="업체명을 입력해주세요."
      options={shops}
      inputValue={keyword}
      onInputChange={(_, value) => setKeyword(value)}
      noOptionsText="검색된 업체가 없습니다."
    />
  )
}

export default memo(ShopSelect)
