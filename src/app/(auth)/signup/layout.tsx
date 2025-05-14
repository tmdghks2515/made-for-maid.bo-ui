import BackHeader from '@/component/layout/header/BackHeader'
import MainWrapper from '@/component/layout/wrapper/MainWrapper'

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <BackHeader />
      <MainWrapper>
        <div className="pt-12 px-4 flex-1 flex flex-col justify-between">{children}</div>
      </MainWrapper>
    </>
  )
}
