'use client'

import { memo } from 'react'
import { SnsLinkDTO, SnsType } from '@/core/type/affiliation/shop.data'
import IconButton from '@mui/joy/IconButton'
import Input from '@mui/joy/Input'
import Option from '@mui/joy/Option'
import Select from '@mui/joy/Select'
import { ValueLabel } from '@/core/type/shared/shared.data'
import { Remove } from '@mui/icons-material'

type Props = {
  snsLink: SnsLinkDTO
  index: number
  snsTypeOptions: ValueLabel[]
  onChangeSnsType: (snsType: SnsType | null, index: number) => void
  onChangeLinkUrl: (linkUrl: string, index: number) => void
  onRemove: (index: number) => void
}

const SnsLinkItem = ({ snsLink, index, onChangeLinkUrl, onChangeSnsType, snsTypeOptions, onRemove }: Props) => {
  return (
    <div className="flex gap-1">
      <Select<SnsType>
        className="flex-1"
        placeholder="SNS 종류"
        value={snsLink.snsType}
        onChange={(_, value) => onChangeSnsType(value, index)}
      >
        {snsTypeOptions.map(({ value, label }) => (
          <Option value={value} key={value}>
            {label}
          </Option>
        ))}
      </Select>
      <Input
        className="flex-4"
        placeholder="링크를 입력해주세요."
        name="linkuUrl"
        value={snsLink.linkUrl}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeLinkUrl(e.target.value, index)}
      />
      <IconButton onClick={() => onRemove(index)}>
        <Remove />
      </IconButton>
    </div>
  )
}

export default memo(SnsLinkItem)
