'use client'

import { Box, Chip, FormControl, FormLabel, Option, Select } from '@mui/joy'
import { ShopConcept } from '@/core/type/affiliation/shop.data'
import useCode from '@/hook/useCode'
import { memo } from 'react'

type Props = {
  shopConcepts: ShopConcept[]
  setFieldValue: (field: string, value: any) => void
}

const ShopConceptsField = ({ shopConcepts, setFieldValue }: Props) => {
  const { makeOptions } = useCode()

  return (
    <FormControl>
      <FormLabel required>업체 컨셉</FormLabel>
      <Select
        onChange={(_, value) => {
          setFieldValue('shopConcepts', value)
        }}
        value={shopConcepts}
        name='shopConcepts"'
        placeholder="업체 컨셉을 선택해주세요."
        multiple
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', gap: '0.25rem' }}>
            {selected.map((selectedOption) => (
              <Chip variant="soft" color="primary" key={selectedOption.id}>
                {selectedOption.label}
              </Chip>
            ))}
          </Box>
        )}
      >
        {makeOptions('SHOP_CONCEPT').map(({ value, label }) => (
          <Option value={value} key={value}>
            {label}
          </Option>
        ))}
      </Select>
    </FormControl>
  )
}

export default memo(ShopConceptsField)
