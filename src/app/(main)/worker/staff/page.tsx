'use client'

import useHeaderStore from '@/store/useHeaderStore'
import { useEffect, useState } from 'react'
import useApi from '@/hook/useApi'
import { SearchAdminQuery } from '@/core/type/user/admin.query'
import { adminService } from '@/core/service/user/admin.service'
import { PageableParams } from '@/core/type/shared/shared.data'
import { AdminDTO } from '@/core/type/user/admin.data'
import StaffItem from '@/app/(main)/worker/staff/_component/StaffItem'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import NoResultsText from '@/component/ui/NoResultsText'
import MainWrapper from '@/component/layout/wrapper/MainWrapper'

export default function StaffListPage() {
  const [query, setQuery] = useState<SearchAdminQuery & PageableParams>({
    page: 0,
    size: Infinity,
    primaryRoles: ['SHOP_STAFF'],
    sort: 'createdAt,desc',
  })
  const [staffList, setStaffList] = useState<AdminDTO[]>([])

  const setHederTitle = useHeaderStore((state) => state.setHeaderTitle)
  const router = useRouter()

  const {
    execute: executeSearchAdmins,
    completed,
    data: staffPage,
  } = useApi({
    api: adminService.searchAdmins,
    globalLoading: true,
    onSuccess: (resData) => {
      setStaffList(resData.content)
    },
  })

  const { execute: executeApprovalAdmin } = useApi({
    api: adminService.approveAdmin,
    onSuccess: (_, id) => {
      setStaffList((prevState) =>
        prevState.map((staff) => (staff.id === id ? { ...staff, approvedAt: dayjs().toString() } : staff)),
      )
    },
  })

  const { execute: executeRejectAdmin } = useApi({
    api: adminService.rejectAdmin,
    onSuccess: (_, id) => {
      setStaffList((prevState) => prevState.filter((staff) => staff.id !== id))
    },
  })

  const handleClick = (staff: AdminDTO) => {
    router.push(`/worker/staff/detail?id=${staff.id}`)
  }

  const handleApprove = (staff: AdminDTO) => {
    executeApprovalAdmin(staff.id)
  }

  const handleReject = (staff: AdminDTO) => {
    executeRejectAdmin(staff.id)
  }

  useEffect(() => {
    setHederTitle('메이드/집사')
    executeSearchAdmins(query)
  }, [])

  return (
    completed && (
      <MainWrapper className="bg-border pt-4">
        {staffList?.length ? (
          <>
            <span className="text-sm text-muted mb-2">총 {staffPage?.totalElements || 0}명</span>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] gap-2">
              {staffList.map((staff) => (
                <StaffItem
                  key={staff.id}
                  staff={staff}
                  onClick={handleClick}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
            </div>
          </>
        ) : (
          <NoResultsText>조회된 메이드/집사가 없습니다.</NoResultsText>
        )}
      </MainWrapper>
    )
  )
}
