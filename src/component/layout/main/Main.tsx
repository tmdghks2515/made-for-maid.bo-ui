import React from 'react'

const Main = ({ children }: { children: React.ReactNode }) => {
  return <main className="flex-1 flex flex-col w-full pb-4 px-2">{children}</main>
}

export default Main
