import React from 'react'
import Image from 'next/image'
import Navbar from './navigation'

const Header = () => {
  return (
    <header className="flex items-center bg-slate-100 border-b border-slate p-3">
      <div className="flex items-center">
        <Image
          className="w-28 h-28 "
          priority={true}
          src="/images/main_logo.png"
          alt="Anyanyelvi Kultúránkért"
          width={-1}
          height={-1}
        />
        <h1 className="">Anyanyelvi Kultúránkért Alapítvány</h1>
      </div>
      <div className="m-auto">
        <Navbar className="gap-2 w-full" />
      </div>
    </header>
  )
}

export default Header
