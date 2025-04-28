export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="min-h-screen flex flex-col w-full lg:max-w-5xl">{children}</div>
    </div>
  )
}
