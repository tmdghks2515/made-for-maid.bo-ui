'use client'

import { memo } from 'react'
import IconButton from '@mui/joy/IconButton'
import ArrowBackIos from '@mui/icons-material/ArrowBackIosNew'
import { useRouter } from 'next/navigation'
import Header from '@/component/layout/header/Header'

type Props = {
  title?: string
}

const BackHeader = ({ title }: Props) => {
  const router = useRouter()

  return (
    <Header>
      <div className="flex-1">
        <IconButton onClick={router.back}>
          <ArrowBackIos fontSize="small" />
        </IconButton>
      </div>
      <div className="flex-3">{title && <h3 className="font-bold text-center">{title}</h3>}</div>
      <div className="flex-1">
        <div />
      </div>
    </Header>
  )
}

export default memo(BackHeader)
