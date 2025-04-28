import React from 'react'

const Header = ({ children }: { children: React.ReactNode }) => {
  return <header className="flex items-center justify-between p-2">{children}</header>
}

export default Header
