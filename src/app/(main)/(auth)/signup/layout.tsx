import BackHeader from '@/component/layout/header/BackHeader'
import Main from '@/component/layout/main/Main'

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <BackHeader />
      <Main>
        <div className="pt-12 px-4 flex-1 flex flex-col justify-between">{children}</div>
      </Main>
    </>
  )
}
