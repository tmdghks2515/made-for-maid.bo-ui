import MainHeader from '@/component/layout/header/MainHeader'
import MainContainer from '@/component/layout/container/MainContainer'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <MainHeader />
      <MainContainer className="bg-border pt-4">{children}</MainContainer>
    </>
  )
}
