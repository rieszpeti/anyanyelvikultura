import React from 'react'
import Link from 'next/link'

interface NavbarProps {
  className?: string
}

const navLinks = [
  { href: '/', label: 'Főoldal' },
  { href: '/blanko-miklos', label: 'Blankó Miklós' },
  { href: '/alapitvanyrol', label: 'Az alapítványról' },
  { href: '/gretsy-laszlo-dij', label: 'Grétsy László-díj' },
  { href: '/contact', label: 'Kapcsolat' },
]

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <nav className={`${className || ''}`.trim()}>
      <ul className="list-none flex flex-col justify-end md:flex md:flex-row">
        {navLinks.map(({ href, label }) => (
          <li key={href} className="rounded-lg hover:bg-slate-200 p-2 pointer">
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
