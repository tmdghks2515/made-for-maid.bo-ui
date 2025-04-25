import { useQuery } from '@tanstack/react-query'
import { CommonCodeDTO } from '@/core/type/common/common-code.data'
import { ValueLabel } from '@/core/type/shared/shared.data'
import { useCallback } from 'react'
import useApi from '@/hook/useApi'
import { commonCodeApi } from '@/core/api/common/common-code.api'

export default function useCode() {
  const { execute: executeGetCodeTree } = useApi<void, CommonCodeDTO[]>({
    api: commonCodeApi.getCodeTree,
  })

  const { data: codeTree = [] } = useQuery({
    queryFn: executeGetCodeTree,
    queryKey: ['/common/code/tree'],
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const makeOptions = useCallback(
    (parentCode: string, deep = false): ValueLabel[] => {
      const result: ValueLabel[] = []
      const queue: CommonCodeDTO[] = [...codeTree]

      let targetNode: CommonCodeDTO | undefined = undefined

      // 1. BFS로 트리에서 targetParentCode에 해당하는 노드를 찾는다
      while (queue.length > 0) {
        const current = queue.shift()!

        if (current.code === parentCode) {
          targetNode = current
          break
        }

        if (current.childCodes) {
          queue.push(...current.childCodes)
        }
      }

      // 2. 찾은 노드의 자식들에 대해 BFS
      if (targetNode?.childCodes) {
        const childQueue = [...targetNode?.childCodes]

        while (childQueue.length > 0) {
          const current = childQueue.shift()!
          result.push({ value: current.code, label: current.displayName })

          if (deep && current.childCodes) {
            childQueue.push(...current.childCodes)
          }
        }
      }

      return result
    },
    [codeTree],
  )

  const getDisplayName = useCallback(
    (code: string): string => {
      const queue: CommonCodeDTO[] = [...codeTree]
      let displayName = ''

      while (queue.length > 0) {
        const current = queue.shift()!

        if (current.code === code) {
          displayName = current.displayName
          break
        }

        if (current.childCodes) {
          queue.push(...current.childCodes)
        }
      }

      return displayName || '알수 없읍'
    },
    [codeTree],
  )

  return {
    makeOptions,
    getDisplayName,
  }
}
