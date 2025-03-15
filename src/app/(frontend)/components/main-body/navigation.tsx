import React from 'react'
import './navigation.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__item">
          <a className="navbar__link" href="/blanko-miklos">
            Blankó Miklós
          </a>
        </div>
        <div className="navbar__item">
          <a className="navbar__link" href="/alapitvanyrol">
            Az alapítványról
          </a>
        </div>
        <div className="navbar__item">
          <a className="navbar__link" href="/gretsy-laszlo-dij">
            Grétsy László-díj
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
