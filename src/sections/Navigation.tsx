import { Shield, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { primaryNavLinks } from '../data/site'

interface NavigationProps {
  currentPath: string
  scrollY: number
}

const normalizePath = (value: string) => value.replace(/^\.\//, '')

export default function Navigation({ currentPath, scrollY }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isScrolled = scrollY > 50
  const activePath = normalizePath(currentPath)

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass border-b border-white/10 shadow-[0_10px_40px_rgba(8,6,4,0.32)]' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="./index.html" className="group flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10">
              <Shield className="h-5 w-5 text-amber-300 transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 rounded-full bg-amber-300/10 blur-xl" />
            </div>
            <span className="hidden text-xl text-white sm:block">
              <span className="font-serif">Zero Trust</span>
              <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.32em] text-amber-300/75">Guide</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 xl:flex">
            {primaryNavLinks.map((item) => {
              const isActive = normalizePath(item.href) === activePath

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${
                    isActive
                      ? 'border border-amber-500/20 bg-amber-500/10 text-amber-200'
                      : 'text-slate-300 hover:bg-white/5 hover:text-amber-200'
                  }`}
                >
                  {item.label}
                </a>
              )
            })}
          </div>

          <div className="hidden lg:block">
            <a
              href="./implementation-lab.html"
              className="rounded-full border border-amber-500/30 bg-amber-500/15 px-5 py-2 text-sm font-medium text-amber-200 hover:-translate-y-0.5 hover:bg-amber-500/25"
            >
              Launch Lab
            </a>
          </div>

          <button className="p-2 text-slate-300 hover:text-amber-200 lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="glass border-t border-white/10 lg:hidden">
          <div className="space-y-2 px-4 py-4">
            {primaryNavLinks.map((item) => {
              const isActive = normalizePath(item.href) === activePath

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`block rounded-md px-3 py-2 transition-colors ${
                    isActive
                      ? 'border border-amber-500/20 bg-amber-500/10 text-amber-200'
                      : 'text-slate-300 hover:bg-white/5 hover:text-amber-200'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              )
            })}

            <a
              href="./implementation-lab.html"
              className="mt-4 block w-full rounded-full border border-amber-500/30 bg-amber-500/15 px-4 py-2 text-center text-amber-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Launch Lab
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
