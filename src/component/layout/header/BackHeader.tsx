'use client'

import { memo } from 'react'
import { IconButton } from '@mui/joy'
import ArrowBackIos from '@mui/icons-material/ArrowBackIosNew'
import { useRouter } from 'next/navigation'

const BackHeader = () => {
  const router = useRouter()

  return (
    <header className="flex items-center justify-between py-2">
      <IconButton onClick={router.back}>
        <ArrowBackIos fontSize="small" />
      </IconButton>
    </header>
  )
}

export default memo(BackHeader)
