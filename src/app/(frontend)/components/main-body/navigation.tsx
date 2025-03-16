import React from 'react'
import './navigation.css'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__item">
          <Link className="navbar__link" href="/blanko-miklos">
            Blankó Miklós
          </Link>
        </div>
        <div className="navbar__item">
          <Link className="navbar__link" href="/alapitvanyrol">
            Az alapítványról
          </Link>
        </div>
        <div className="navbar__item">
          <Link className="navbar__link" href="/gretsy-laszlo-dij">
            Grétsy László-díj
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
