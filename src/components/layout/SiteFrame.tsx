import { type ReactNode, useEffect, useState } from 'react'
import Navigation from '../../sections/Navigation'
import Footer from '../../sections/Footer'

interface SiteFrameProps {
  currentPath: string
  children: ReactNode
}

export default function SiteFrame({ currentPath, children }: SiteFrameProps) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground cyber-grid">
      <Navigation currentPath={currentPath} scrollY={scrollY} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
