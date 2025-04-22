export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="w-full flex justify-center items-center bg-background text-foreground">
      <main className="min-h-screen flex flex-col w-full max-w-md md:max-w-lg lg:max-w-xl px-4 sm:px-6 md:px-8 py-6">
        {children}
      </main>
    </div>
  )
}
