import BackHeader from '@/component/layout/header/BackHeader'
import MainContainer from '@/component/layout/container/MainContainer'

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <BackHeader />
      <MainContainer>
        <div className="pt-12 px-4 flex-1 flex flex-col justify-between">{children}</div>
      </MainContainer>
    </>
  )
}
