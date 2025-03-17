import React from 'react'
import './styles.css'
import Footer from './components/footer/footer'
import Header from './components/header/header'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
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
