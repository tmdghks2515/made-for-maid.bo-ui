import { AxiosError, AxiosResponse } from 'axios'

type UseApiProps = {
  api: (params?: any) => Promise<AxiosResponse>
  params?: any
  onSuccess?: (data: any) => void
  onError?: (error: AxiosError) => void
  onComplete?: () => void
}

export default function useApi({ api, params, onSuccess, onError, onComplete }: UseApiProps) {
  const execute = async () => {
    api(params)
      .then((res) => {
        onSuccess?.(res.data)
      })
      .catch((error) => {
        onError?.(error)
      })
      .finally(() => {
        onComplete?.()
      })
  }

  return {
    execute,
  }
}
