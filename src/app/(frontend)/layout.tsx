import React from 'react'
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
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4" async />
        </head>
        <Header />
        <div className="content-layout">
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
