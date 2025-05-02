import MainContainer from '@/component/layout/container/MainContainer'
import BackHeader from '@/component/layout/header/BackHeader'

export default function DetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <BackHeader />
      <MainContainer>{children}</MainContainer>
    </>
  )
}
