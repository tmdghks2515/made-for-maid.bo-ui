import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/component/provider/Providers'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: '츄르르 관리자',
  description: '메이드 카페의 수익을 다양하게',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <div className="w-full flex justify-center items-center">
            <div className="min-h-screen flex flex-col w-full lg:max-w-5xl">
              <Suspense>{children}</Suspense>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
