'use client'

import { JSX, memo } from 'react'
import { ListItem, ListItemButton, ListItemDecorator, ListItemContent } from '@mui/joy'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { usePathname } from 'next/navigation'

export type MenuItem = {
  icon?: JSX.Element
  label: string
  pathname?: string
  children?: MenuItem[]
}

type Props = {
  menuItem: MenuItem
  onClick: () => void
  isOpen?: boolean
}

const MenuListItem = ({ menuItem, onClick, isOpen }: Props) => {
  const pathname = usePathname()

  return (
    <ListItem>
      <ListItemButton
        sx={{ borderRadius: 'md' }}
        onClick={onClick}
        selected={pathname === menuItem.pathname}
        color={pathname === menuItem.pathname ? 'primary' : undefined}
      >
        {menuItem.icon && <ListItemDecorator>{menuItem.icon}</ListItemDecorator>}
        <ListItemContent className="text-sm">{menuItem.label}</ListItemContent>
        {menuItem.children && (isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />)}
      </ListItemButton>
    </ListItem>
  )
}

export default memo(MenuListItem)
