import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

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
      {/*<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>*/}
      <body className="bg-background text-foreground">{children}</body>
    </html>
  )
}
