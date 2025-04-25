'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MuiThemeProvider from '@/component/provider/MuiThemeProvider'
import GlobalServerStatesProvider from '@/component/provider/GlobalServerStatesProvider'

export const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MuiThemeProvider />
      <QueryClientProvider client={queryClient}>
        <GlobalServerStatesProvider>{children}</GlobalServerStatesProvider>
      </QueryClientProvider>
    </>
  )
}
