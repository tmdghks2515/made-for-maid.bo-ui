import { AxiosError, AxiosResponse } from 'axios'
import { useState } from 'react'
import useSnackbar from '@/hook/useSnackbar'

type UseApiProps<T, D> = {
  api: (params: T) => Promise<AxiosResponse<D>>
  onSuccess?: (data: D) => void
  onError?: (error: AxiosError) => void
  onComplete?: () => void
}

export default function useApi<T = any, D = any>({ api, onSuccess, onError, onComplete }: UseApiProps<T, D>) {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<D>()
  const { openSnackbar } = useSnackbar()

  const execute = async (params?: T) => {
    setIsLoading(true)
    return api(params as T)
      .then((res) => {
        onSuccess?.(res.data)
        setData(res.data)
        return res.data
      })
      .catch((error) => {
        onError?.(error)
        console.log('error >>>', error)
        openSnackbar({
          message: error?.response?.data?.message,
          variant: 'danger',
        })
        return error
      })
      .finally(() => {
        onComplete?.()
        setIsLoading(false)
      })
  }

  return {
    execute,
    isLoading,
    data,
  }
}
