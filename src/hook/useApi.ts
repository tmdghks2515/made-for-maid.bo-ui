import { AxiosError, AxiosResponse } from 'axios'

type UseApiProps<T, D> = {
  api: (params: T) => Promise<AxiosResponse<D>>
  params?: T
  onSuccess?: (data: D) => T
  onError?: (error: AxiosError) => void
  onComplete?: () => void
}

export default function useApi<T = any, D = any>({ api, params, onSuccess, onError, onComplete }: UseApiProps<T, D>) {
  const execute = async () =>
    api(params as T)
      .then((res) => {
        onSuccess?.(res.data)
        return res.data
      })
      .catch((error) => {
        onError?.(error)
        return error
      })
      .finally(() => {
        onComplete?.()
      })

  return {
    execute,
  }
}
