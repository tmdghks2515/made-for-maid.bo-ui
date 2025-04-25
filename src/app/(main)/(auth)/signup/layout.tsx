import BackHeader from '@/component/layout/header/BackHeader'

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <BackHeader />
      <div className="pt-12 px-4 flex-1 flex flex-col justify-between">{children}</div>
    </>
  )
}
