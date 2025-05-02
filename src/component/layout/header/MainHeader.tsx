'use client'

import Header from '@/component/layout/header/Header'
import IconButton from '@mui/joy/IconButton'
import { Menu } from '@mui/icons-material'
import { useState } from 'react'
import GNB from '@/component/navigation/GNB'
import useHeaderStore from '@/store/useHeaderStore'
import useAdminStore from '@/store/useAdminStore'
import ProfileAvatar from '@/component/display/ProfileAvatar'
import Logo from '@/component/display/Logo'

export default function MainHeader() {
  const [isGNBOpen, setGNBOpen] = useState(false)

  const headerTitle = useHeaderStore((state) => state.headerTitle)
  const admin = useAdminStore((state) => state.admin)

  return (
    <>
      <Header>
        <div className="flex-3 flex gap-3 items-center">
          <IconButton variant="outlined" onClick={() => setGNBOpen(true)}>
            <Menu />
          </IconButton>
          <Logo size="sm" />
          {headerTitle && <h3 className="font-bold">{headerTitle}</h3>}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-end gap-2">
            {admin && <ProfileAvatar staffType={admin.staffType} profileImageUrl={admin.profileImageUrl} size="sm" />}
          </div>
        </div>
      </Header>
      <GNB open={isGNBOpen} onClose={() => setGNBOpen(false)} />
    </>
  )
}
