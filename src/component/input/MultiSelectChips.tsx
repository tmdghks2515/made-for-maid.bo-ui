import { ValueLabel } from '@/core/type/shared/shared.data'
import { Box, Chip, Select, Option } from '@mui/joy'
import { memo } from 'react'

type Props<T> = {
  options: ValueLabel<T>[]
  value: T[]
  onChange: (newValue: T[]) => void
  className?: string
}

function MultiSelectChips<T>({ options, value, onChange, className }: Props<T>) {
  return (
    <Select
      className={className}
      onChange={(_, value) => {
        onChange(value as T[])
      }}
      value={value as any[]}
      name="shopConcepts"
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
      {options.map(({ value, label }) => (
        <Option value={value} key={value as any}>
          {label}
        </Option>
      ))}
    </Select>
  )
}

export default memo(MultiSelectChips) as typeof MultiSelectChips
