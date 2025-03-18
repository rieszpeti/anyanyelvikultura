import React from 'react'
import './styles.css'
import Footer from './components/footer/footer'
import Header from './components/header/header'

export const metadata = {
  description: 'Anyanyelvi Kúltúránkért Alapítvány',
  title: 'Anyanyelvi Kúltúránkért',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Header />
        <div className="content-layout">
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
