import React from 'react'
import Footer from './components/footer/footer'
import Header from './components/header/header'

import '../global.css'

export const metadata = {
  description: 'Anyanyelvi Kúltúránkért Alapítvány',
  title: 'Anyanyelvi Kúltúránkért',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <Header />
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
