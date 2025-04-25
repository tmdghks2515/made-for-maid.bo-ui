'use client'

import { SnsLinkDTO } from '@/core/type/affiliate/shop.data'
import { memo } from 'react'
import { FormLabel, IconButton, Select, Input, Option } from '@mui/joy'
import Add from '@mui/icons-material/Add'

type Props = {
  snsLinks: SnsLinkDTO[]
  setFieldValue: (field: string, value: SnsLinkDTO[]) => void
}

const ShopSnsLinksField = ({ snsLinks, setFieldValue }: Props) => {
  return (
    <>
      <div className="flex justify-between items-baseline">
        <FormLabel>업체 SNS 링크</FormLabel>
        <IconButton size="sm">
          <Add fontSize="small" />
        </IconButton>
      </div>
      <div className="flex gap-1">
        <Select className="flex-1" placeholder="SNS 종류" defaultValue="instagram">
          <Option value="instagram">인스타그램</Option>
          <Option value="kakao">카카오톡</Option>
          <Option value="facebook">페이스북</Option>
        </Select>
        <Input className="flex-4" placeholder="링크를 입력해주세요." />
      </div>
    </>
  )
}

export default memo(ShopSnsLinksField)
