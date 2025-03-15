import React from 'react'
import './footer.css'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
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
      </div>
      <div className="copyright">
        <p>© {new Date().getFullYear()} Anyanyelvi Kultúránkért Alapítvány</p>
      </div>
    </footer>
  )
}

export default Footer
