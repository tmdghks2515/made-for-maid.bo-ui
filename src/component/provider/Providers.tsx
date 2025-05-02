'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MuiThemeProvider from '@/component/provider/MuiThemeProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import SnackbarProvider from '@/component/provider/SnackbarProvider'
import GlobalLoadingProvider from '@/component/provider/GlobalLoadingProvider'

export const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MuiThemeProvider />
      <GlobalLoadingProvider />
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <SnackbarProvider />
    </>
  )
}
