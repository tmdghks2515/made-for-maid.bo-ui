'use client'

import Header from '@/component/layout/header/Header'
import { IconButton } from '@mui/joy'
import { Menu } from '@mui/icons-material'
import { useState } from 'react'
import GNB from '@/component/navigation/GNB'

export default function MainHeader() {
  const [isGNBOpen, setGNBOpen] = useState(false)

  return (
    <Header>
      <IconButton variant="outlined" onClick={() => setGNBOpen(true)}>
        <Menu />
      </IconButton>
      <GNB open={isGNBOpen} onClose={() => setGNBOpen(false)} />
    </Header>
  )
}
