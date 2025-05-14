import MainWrapper from '@/component/layout/wrapper/MainWrapper'
import BackHeader from '@/component/layout/header/BackHeader'

export default function DetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <BackHeader />
      <MainWrapper>{children}</MainWrapper>
    </>
  )
}
