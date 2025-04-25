export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="w-full flex justify-center items-center">
      <main className="min-h-screen flex flex-col w-full lg:max-w-5xl px-2 pb-4">{children}</main>
    </div>
  )
}
