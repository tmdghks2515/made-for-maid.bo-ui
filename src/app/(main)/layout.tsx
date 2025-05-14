import MainHeader from '@/component/layout/header/MainHeader'
import MainWrapper from '@/component/layout/wrapper/MainWrapper'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <MainHeader />
      {children}
    </>
  )
}
