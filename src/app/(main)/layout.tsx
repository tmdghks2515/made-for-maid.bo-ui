import MainHeader from '@/component/layout/header/MainHeader'

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
