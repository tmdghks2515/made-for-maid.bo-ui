'use client'

import { JSX, memo } from 'react'
import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import ListItemDecorator from '@mui/joy/ListItemDecorator'
import ListItemContent from '@mui/joy/ListItemContent'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'

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
  isActive?: boolean
}

const MenuListItem = ({ menuItem, onClick, isOpen, isActive }: Props) => {
  return (
    <ListItem>
      <ListItemButton sx={{ borderRadius: 'md' }} onClick={onClick} selected={isActive}>
        {menuItem.icon && <ListItemDecorator>{menuItem.icon}</ListItemDecorator>}
        <ListItemContent className="text-sm">{menuItem.label}</ListItemContent>
        {menuItem.children && (isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />)}
      </ListItemButton>
    </ListItem>
  )
}

export default memo(MenuListItem)
