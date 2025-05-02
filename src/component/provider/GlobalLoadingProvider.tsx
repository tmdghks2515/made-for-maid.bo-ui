import useGloabalLoading from '@/store/useGloabalLoading'
import LinearProgress from '@mui/joy/LinearProgress'

export default function GlobalLoadingProvider() {
  const loading = useGloabalLoading((state) => state.loading)

  return loading && <LinearProgress />
}
