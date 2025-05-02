'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import { useState } from 'react'
import useApi from '@/hook/useApi'
import { CreateAdminCommand, CreateStaffCommand } from '@/core/type/user/admin.command'
import { AdminSignInResDTO, StaffConcept, StaffType } from '@/core/type/user/admin.data'
import useSnackbar from '@/hook/useSnackbar'
import useAuthorize from '@/hook/useAuthorize'
import { adminApi } from '@/core/api/user/admin.api'

export default function NicknamePage() {
  const searchParams = useSearchParams()
  const role = searchParams.get('role')
  const shopId = searchParams.get('shopId')
  const staffType = searchParams.get('staffType')
  const staffConcepts = searchParams.getAll('staffConcepts')

  const router = useRouter()
  const { openSnackbar } = useSnackbar()
  const { signIn } = useAuthorize()

  const [nickname, setNickname] = useState('')

  const { execute: executeCreateOwner, isLoading: isCreateOwnerLoading } = useApi<
    CreateAdminCommand,
    AdminSignInResDTO
  >({
    api: adminApi.createOwner,
    onSuccess: (resData) => {
      if (resData.status !== 'SIGN_IN_SUCCESS' || !resData.admin || !resData.accessToken) {
        openSnackbar({
          message: '가입에 실패했습니다. 관리자에게 문의해주세요.',
          variant: 'danger',
        })
        return
      }

      openSnackbar({
        title: '가입 성공!',
        message: '가입이 완료되었습니다.',
        variant: 'success',
      })

      signIn(resData.admin, resData.accessToken)
      router.push('/')
    },
  })

  const { execute: executeCreateManager, isLoading: isCreateManagerLoading } = useApi<CreateAdminCommand, string>({
    api: adminApi.createManager,
    onSuccess: () => {
      router.push('/signup/complete')
    },
  })

  const { execute: executeCreateStaff, isLoading: isCreateStaffLoading } = useApi<CreateStaffCommand, string>({
    api: adminApi.createStaff,
    onSuccess: () => {
      router.push('/signup/complete')
    },
  })

  const handleSubmit = () => {
    if (!nickname) {
      openSnackbar({
        message: '닉네임을 입력해주세요.',
        variant: 'danger',
      })
      return
    }

    if (!shopId) {
      openSnackbar({
        message: '업체가 선택되지 않았습니다.',
        variant: 'danger',
      })
      return
    }

    if (role === 'SHOP_OWNER') {
      executeCreateOwner({
        nickname,
        shopId,
      })
    } else if (role === 'SHOP_MANAGER') {
      executeCreateManager({
        nickname,
        shopId,
      })
    } else if (role === 'SHOP_STAFF') {
      executeCreateStaff({
        nickname,
        shopId,
        staffType: staffType as StaffType,
        staffConcepts: staffConcepts as StaffConcept[],
      })
    }
  }

  return (
    <>
      <div>
        <p className="text-2xl font-bold mb-8">사용하실 닉네임을 입력해주세요.</p>

        <div>
          <FormControl required>
            <FormLabel>닉네임</FormLabel>
            <Input
              name="nickname"
              placeholder="닉네임을 입력해주세요."
              slotProps={{ input: { maxLength: 30 } }}
              value={nickname}
              onChange={(e) => setNickname(e.target.value || '')}
            />
          </FormControl>
        </div>
      </div>
      <Button
        disabled={!nickname}
        onClick={() => handleSubmit()}
        loading={isCreateOwnerLoading || isCreateManagerLoading || isCreateStaffLoading}
      >
        가입하기
      </Button>
    </>
  )
}
