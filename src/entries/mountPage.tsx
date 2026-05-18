import { StrictMode, type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import '../App.css'

export function mountPage(page: ReactElement) {
  createRoot(document.getElementById('root')!).render(<StrictMode>{page}</StrictMode>)
}
