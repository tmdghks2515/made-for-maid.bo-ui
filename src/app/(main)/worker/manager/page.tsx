'use client'

import { useEffect, useState } from 'react'
import { SearchAdminQuery } from '@/core/type/user/admin.query'
import { PageableParams } from '@/core/type/shared/shared.data'
import { AdminDTO } from '@/core/type/user/admin.data'
import useHeaderStore from '@/store/useHeaderStore'
import { useRouter } from 'next/navigation'
import useApi from '@/hook/useApi'
import { adminService } from '@/core/service/user/admin.service'
import dayjs from 'dayjs'
import StaffItem from '@/app/(main)/worker/staff/_component/StaffItem'
import NoResultsText from '@/component/ui/NoResultsText'
import MainWrapper from '@/component/layout/wrapper/MainWrapper'

export default function ManagerListPage() {
  const [query, setQuery] = useState<SearchAdminQuery & PageableParams>({
    page: 0,
    size: Infinity,
    primaryRoles: ['SHOP_MANAGER'],
    sort: 'createdAt,desc',
  })
  const [managers, setManagers] = useState<AdminDTO[]>([])

  const setHederTitle = useHeaderStore((state) => state.setHeaderTitle)
  const router = useRouter()

  const {
    execute: executeSearchAdmins,
    completed,
    data: managerPage,
  } = useApi({
    api: adminService.searchAdmins,
    globalLoading: true,
    onSuccess: (resData) => {
      setManagers(resData.content)
    },
  })

  const { execute: executeApprovalAdmin } = useApi({
    api: adminService.approveAdmin,
    onSuccess: (_, id) => {
      setManagers((prevState) =>
        prevState.map((manager) => (manager.id === id ? { ...manager, approvedAt: dayjs().toString() } : manager)),
      )
    },
  })

  const { execute: executeRejectAdmin } = useApi({
    api: adminService.rejectAdmin,
    onSuccess: (_, id) => {
      setManagers((prevState) => prevState.filter((manager) => manager.id !== id))
    },
  })

  const handleClick = (staff: AdminDTO) => {
    router.push(`/worker/staff/${staff.id}`)
  }

  const handleApprove = (staff: AdminDTO) => {
    executeApprovalAdmin(staff.id)
  }

  const handleReject = (staff: AdminDTO) => {
    executeRejectAdmin(staff.id)
  }

  useEffect(() => {
    setHederTitle('매니저')
    executeSearchAdmins(query)
  }, [])

  return (
    completed && (
      <MainWrapper className="bg-border pt-4">
        {managers?.length ? (
          <>
            <span className="text-sm text-muted mb-2">총 {managerPage?.totalElements || 0}명</span>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] gap-2">
              {managers.map((manager) => (
                <StaffItem
                  key={manager.id}
                  staff={manager}
                  onClick={handleClick}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
            </div>
          </>
        ) : (
          <NoResultsText>조회된 매니저가 없습니다.</NoResultsText>
        )}
      </MainWrapper>
    )
  )
}
