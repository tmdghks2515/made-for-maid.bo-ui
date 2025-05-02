import React from 'react'

const MainContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <main className={`flex-1 flex flex-col w-full pb-4 px-2 ${className || ''}`}>{children}</main>
}

export default MainContainer
