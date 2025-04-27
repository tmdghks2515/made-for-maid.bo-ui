'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MuiThemeProvider from '@/component/provider/MuiThemeProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import SnackbarProvider from '@/component/provider/SnackbarProvider'

export const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MuiThemeProvider />
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
        <SnackbarProvider />
      </QueryClientProvider>
    </>
  )
}
