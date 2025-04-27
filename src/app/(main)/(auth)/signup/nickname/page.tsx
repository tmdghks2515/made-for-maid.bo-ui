'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button, FormControl, FormLabel, Input } from '@mui/joy'
import { useState } from 'react'
import useApi from '@/hook/useApi'
import { CreateAdminCommand } from '@/core/type/user/admin.command'
import { AdminSignInResDTO } from '@/core/type/user/admin.data'
import useSnackbar from '@/hook/useSnackbar'
import useAuthorize from '@/hook/useAuthorize'
import { adminApi } from '@/core/api/user/admin.api'

export default function NicknamePage() {
  const searchParams = useSearchParams()
  const role = searchParams.get('role')
  const shopId = searchParams.get('shopId')

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

      signIn(resData.admin, resData.accessToken)
      router.push('/')
    },
  })

  const { execute: executeCreateManager, isLoading: isCreateManagerLoading } = useApi<CreateAdminCommand, string>({
    api: adminApi.createManager,
    onSuccess: () => {
      openSnackbar({
        title: '가입 성공!',
        message: '사장님에게 가입 승인을 요청해주세요!',
        variant: 'success',
      })
      router.push('/profile')
    },
  })

  const { execute: executeCreateStaff, isLoading: isCreateStaffLoading } = useApi<CreateAdminCommand, string>({
    api: adminApi.createStaff,
    onSuccess: () => {
      openSnackbar({
        title: '가입 성공!',
        message: '사장님에게 가입 승인을 요청해주세요!',
        variant: 'success',
      })
      router.push('/profile')
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

    const command: CreateAdminCommand = {
      nickname,
      shopId,
    }

    if (role === 'SHOP_OWNER') {
      executeCreateOwner(command)
    } else if (role === 'SHOP_MANAGER') {
      executeCreateManager(command)
    } else if (role === 'SHOP_STAFF') {
      executeCreateStaff(command)
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
