'use client'

import { useQuery } from '@tanstack/react-query'
import useApi from '@/hook/useApi'
import { commonCodeApi } from '@/core/api/common/common-code.api'
import { ReactNode } from 'react'

export default function GlobalServerStatesProvider({ children }: { children: ReactNode }) {
  const { execute: executeGetCodeTree } = useApi({
    api: commonCodeApi.getCodeTree,
  })

  useQuery({
    queryFn: executeGetCodeTree,
    queryKey: ['/common/code/tree'],
    staleTime: 1000 * 60 * 60,
  })

  return <>{children}</>
}
