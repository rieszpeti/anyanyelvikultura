import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="flex justify-center bg-slate-100 border-t border-slate mt-6 py-4">
        <p className="text-center">
          © {new Date().getFullYear()} Anyanyelvi Kultúránkért Alapítvány. Minden jog fenntartva.
        </p>
      </div>
    </footer>
  )
}

export default Footer
