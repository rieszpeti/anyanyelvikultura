import React from 'react'
import { fileURLToPath } from 'url'

import './styles.css'
import MainBody from './components/main-body/main-body'

export default async function HomePage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return <MainBody />
}
