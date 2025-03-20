import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="contact-info">
        <span>Névjegy:</span>
        <a href="https://linktr.ee/blanko.miklos" className="link">
          linktr.ee/blanko.miklos
        </a>
      </div>
      <div className="contact-info">
        <span>Email:</span>
        <a href="mailto:anyanyelvi.kulturankert@gmail.com" className="link">
          anyanyelvi.kulturankert@gmail.com
        </a>
      </div>
      <div className="copyright">
        <p>© {new Date().getFullYear()} Anyanyelvi Kultúránkért Alapítvány</p>
        <p> Minden jog fenntartva.</p>
      </div>
    </footer>
  )
}

export default Footer
