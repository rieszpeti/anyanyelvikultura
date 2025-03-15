import React from 'react'
import Image from 'next/image'
import './header.css'

const Header = () => {
  return (
    <header className="header">
      <Image
        src="/images/main_logo.png"
        alt="Anyanyelvi Kultúránkért"
        className="header__logo"
        width={300}
        height={200}
      />
      <h1 className="header__title">Anyanyelvi Kultúránkért Alapítvány</h1>
    </header>
  )
}

export default Header
