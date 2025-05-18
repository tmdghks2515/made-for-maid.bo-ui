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
  snsTypeOptions: ValueLabel[]
  onChange: (snsLink: SnsLinkDTO) => void
  onRemove: () => void
  getDisplayName?: (code: string) => string
  isEditMode?: boolean
}

const SnsLinkItem = ({ snsLink, onChange, snsTypeOptions, onRemove, isEditMode, getDisplayName }: Props) => {
  return (
    <div className="flex gap-1">
      {isEditMode ? (
        <>
          <Select<SnsType>
            className="flex-1"
            placeholder="SNS 종류"
            value={snsLink.snsType}
            onChange={(_, value) => onChange({ ...snsLink, snsType: value || 'INSTAGRAM' })}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...snsLink, linkUrl: e.target.value })}
          />
          <IconButton onClick={onRemove}>
            <Remove />
          </IconButton>
        </>
      ) : (
        <div className="flex gap-4">
          {/* <img src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/common/logo/instagram_logo.svg`} alt="sns 로고" /> */}
          <span>{getDisplayName?.(snsLink.snsType) || snsLink.snsType}</span>
          <span>{snsLink.linkUrl}</span>
        </div>
      )}
    </div>
  )
}

export default memo(SnsLinkItem)
