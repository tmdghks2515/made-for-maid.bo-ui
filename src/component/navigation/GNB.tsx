'use client'

import DialogContent from '@mui/joy/DialogContent'
import Drawer from '@mui/joy/Drawer'
import Sheet from '@mui/joy/Sheet'
import List from '@mui/joy/List'
import DialogTitle from '@mui/joy/DialogTitle'
import Divider from '@mui/joy/Divider'
import IconButton from '@mui/joy/IconButton'
import Store from '@mui/icons-material/Store'
import Payment from '@mui/icons-material/Payment'
import ChatBubbleOutlineOutlined from '@mui/icons-material/ChatBubbleOutlineOutlined'
import MicNone from '@mui/icons-material/MicNone'
import DashboardOutlined from '@mui/icons-material/DashboardOutlined'
import EmojiEventsOutlined from '@mui/icons-material/EmojiEventsOutlined'
import Pets from '@mui/icons-material/Pets'
import ConfirmationNumberOutlined from '@mui/icons-material/ConfirmationNumberOutlined'
import AccountBalanceWalletOutlined from '@mui/icons-material/AccountBalanceWalletOutlined'
import GroupOutlined from '@mui/icons-material/GroupOutlined'
import SupervisorAccountOutlined from '@mui/icons-material/SupervisorAccountOutlined'
import Close from '@mui/icons-material/Close'

import { useEffect, useMemo, useState } from 'react'
import MenuListItem, { MenuItem } from '@/component/navigation/MenuListItem'
import { usePathname, useRouter } from 'next/navigation'
import useAdminStore from '@/store/useAdminStore'
import Logo from '@/component/display/Logo'

type Props = {
  open: boolean
  onClose: () => void
}

const GNB = ({ open, onClose }: Props) => {
  const [openedMenuIndexes, setOpenedMenuIndexes] = useState<number[]>([])

  const pathname = usePathname()
  const router = useRouter()
  const admin = useAdminStore((state) => state.admin)

  const menu = useMemo(() => {
    switch (admin?.primaryRole) {
      case 'SHOP_OWNER':
        return ownerMenu
      case 'SHOP_MANAGER':
        return managerMenu
      case 'SHOP_STAFF':
        return staffMenu
      default:
        return []
    }
  }, [admin?.primaryRole])

  const handleClickMenuItem = (item: MenuItem, index: number) => {
    if (item.pathname) {
      pathname !== item.pathname && router.push(item.pathname || '/')
      onClose()
    } else if (item.children) {
      setOpenedMenuIndexes((prev) => {
        const isOpen = prev.includes(index)
        if (isOpen) {
          return prev.filter((i) => i !== index)
        } else {
          return [...prev, index]
        }
      })
    }
  }

  useEffect(() => {
    menu.forEach((item, index) => {
      if (item.pathname === pathname) {
        setOpenedMenuIndexes([index])
      } else if (item.children) {
        item.children.forEach((child) => {
          if (child.pathname === pathname) {
            setOpenedMenuIndexes([index])
          }
        })
      }
    })
  }, [menu])

  return (
    <Drawer
      size="sm"
      variant="plain"
      open={open}
      onClose={onClose}
      slotProps={{
        content: {
          sx: {
            bgcolor: 'transparent',
            p: { md: 3, sm: 2, xs: 1 },
            boxShadow: 'none',
          },
        },
      }}
    >
      <Sheet
        sx={{
          borderRadius: 'md',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'auto',
        }}
      >
        <div className="flex items-center justify-between py-1">
          <DialogTitle className="">
            <Logo />
          </DialogTitle>
          {/*<ModalClose />*/}
          <IconButton size="sm" onClick={onClose}>
            <Close fontSize="small" />
          </IconButton>
        </div>
        <Divider sx={{ mt: 'auto' }} />
        <DialogContent>
          <List className="flex flex-col gap-2">
            {menu.map((item, index) => (
              <div key={`menu-item-${index}`}>
                <MenuListItem
                  menuItem={item}
                  isOpen={openedMenuIndexes.includes(index)}
                  isActive={pathname === item.pathname}
                  onClick={() => handleClickMenuItem(item, index)}
                />
                <div className="pl-2">
                  {item.children && openedMenuIndexes.includes(index) && (
                    <List className="flex flex-col gap-1">
                      {item.children.map((child, index) => (
                        <MenuListItem
                          key={`menu-${child.label}-${index}`}
                          menuItem={child}
                          isOpen={false}
                          isActive={pathname === child.pathname}
                          onClick={() => handleClickMenuItem(child, index)}
                        />
                      ))}
                    </List>
                  )}
                </div>
              </div>
            ))}
          </List>
        </DialogContent>
      </Sheet>
    </Drawer>
  )
}

export default GNB

const ownerMenu: MenuItem[] = [
  {
    label: '대시보드',
    icon: <DashboardOutlined />,
    pathname: '/',
  },
  {
    label: '업체관리',
    icon: <Store />,
    children: [
      {
        label: '업체 정보',
        pathname: '/shop/info/',
      },
      {
        label: '공지사항',
        pathname: '/shop/notice/',
      },
    ],
  },
  {
    label: '직원관리',
    icon: <SupervisorAccountOutlined />,
    children: [
      {
        label: '메이드/집사',
        pathname: '/worker/staff/',
      },
      {
        label: '매니저',
        pathname: '/worker/manager/',
      },
    ],
  },
  {
    label: '패스관리',
    icon: <EmojiEventsOutlined />,
    children: [
      {
        label: '패스',
        pathname: '/pass/pass-info',
      },
      {
        label: '패스 구독 이력',
        pathname: '/pass/pass-product',
      },
    ],
  },
  {
    label: '녹음관리',
    icon: <MicNone />,
    children: [
      {
        label: '공개 녹음',
        pathname: '/pass/pass-info',
      },
      {
        label: '비공개 녹음',
        pathname: '/pass/pass-product',
      },
    ],
  },
  {
    label: '츄르관리',
    icon: <Pets />,
    children: [
      {
        label: '츄르 현황',
        pathname: '/pass/pass-info',
      },
    ],
  },
  {
    label: '쿠폰관리',
    icon: <ConfirmationNumberOutlined />,
    children: [
      {
        label: '쿠폰',
        pathname: '/pass/pass-info',
      },
      {
        label: '쿠폰 지급이력',
        pathname: '/pass/pass-product',
      },
    ],
  },
  {
    label: '결제관리',
    icon: <Payment />,
    children: [
      {
        label: '결제 수단',
        pathname: '/pass/pass-info',
      },
      {
        label: '결제 이력',
        pathname: '/pass/pass-product',
      },
    ],
  },
  {
    label: '정산관리',
    icon: <AccountBalanceWalletOutlined />,
    children: [
      {
        label: '정산 계좌',
        pathname: '/pass/pass-info',
      },
      {
        label: '정산 내역',
        pathname: '/pass/pass-product',
      },
    ],
  },
  {
    label: '손님관리',
    icon: <GroupOutlined />,
    children: [
      {
        label: '손님 랭킹',
        pathname: '/pass/pass-info',
      },
    ],
  },
  {
    label: '채팅',
    icon: <ChatBubbleOutlineOutlined />,
    pathname: '/pass/pass-info',
  },
]

const managerMenu: MenuItem[] = [
  {
    label: '대시보드',
    icon: <DashboardOutlined />,
    pathname: '/',
  },
  {
    label: '업체',
    icon: <Store />,
    children: [
      {
        label: '업체 정보',
        pathname: '/shop/info/',
      },
      {
        label: '메이드/집사',
        pathname: '/shop/shop-info',
      },
      {
        label: '공지사항',
        pathname: '/shop/notice',
      },
    ],
  },
  {
    label: '패스',
    icon: <EmojiEventsOutlined />,
    children: [
      {
        label: '패스 관리',
        pathname: '/pass/pass-info',
      },
      {
        label: '패스 구독 이력',
        pathname: '/pass/pass-product',
      },
    ],
  },
  {
    label: '녹음',
    icon: <MicNone />,
    children: [
      {
        label: '공개 녹음',
        pathname: '/pass/pass-info',
      },
      {
        label: '비공개 녹음',
        pathname: '/pass/pass-product',
      },
    ],
  },
  {
    label: '츄르',
    icon: <Pets />,
    children: [
      {
        label: '츄르 현황',
        pathname: '/pass/pass-info',
      },
    ],
  },
  {
    label: '쿠폰',
    icon: <ConfirmationNumberOutlined />,
    children: [
      {
        label: '쿠폰 관리',
        pathname: '/pass/pass-info',
      },
      {
        label: '쿠폰 지급이력',
        pathname: '/pass/pass-product',
      },
    ],
  },
  {
    label: '손님',
    icon: <GroupOutlined />,
    children: [
      {
        label: '손님 랭킹',
        pathname: '/pass/pass-info',
      },
    ],
  },
  {
    label: '채팅',
    icon: <ChatBubbleOutlineOutlined />,
    pathname: '/pass/pass-info',
  },
]

const staffMenu: MenuItem[] = [
  {
    label: '녹음',
    icon: <MicNone />,
    children: [
      {
        label: '공개 녹음',
        pathname: '/pass/pass-info',
      },
      {
        label: '비공개 녹음',
        pathname: '/pass/pass-product',
      },
    ],
  },
  {
    label: '츄르',
    icon: <Pets />,
    children: [
      {
        label: '츄르 현황',
        pathname: '/pass/pass-info',
      },
    ],
  },
  {
    label: '손님',
    icon: <GroupOutlined />,
    children: [
      {
        label: '손님 랭킹',
        pathname: '/pass/pass-info',
      },
    ],
  },
  {
    label: '채팅',
    icon: <ChatBubbleOutlineOutlined />,
    pathname: '/pass/pass-info',
  },
]
