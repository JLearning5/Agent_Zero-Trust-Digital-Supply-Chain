import { Shield, Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react'
import { footerResources, primaryNavLinks, socialLinks } from '../data/site'

const socialMap = [
  { icon: Github, href: socialLinks[0]?.href, label: socialLinks[0]?.label },
  { icon: Twitter, href: socialLinks[1]?.href, label: socialLinks[1]?.label },
  { icon: Linkedin, href: socialLinks[2]?.href, label: socialLinks[2]?.label },
  { icon: Mail, href: socialLinks[3]?.href, label: socialLinks[3]?.label },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="./index.html" className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10">
                <Shield className="h-5 w-5 text-amber-300" />
              </div>
              <span className="text-2xl font-serif text-white">
                Zero Trust <span className="italic text-gradient">Guide</span>
              </span>
            </a>

            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.28em] text-amber-300/80">
              Reference-driven / deployment-ready
            </p>
            <p className="mb-6 max-w-md text-sm leading-relaxed text-slate-400">
              A focused learning and implementation resource for Zero Trust Architecture in digital supply chains, grounded in
              NIST SP 800-207 and adapted for practical rollout.
            </p>

            <div className="flex items-center gap-4">
              {socialMap.map((entry) => {
                const Icon = entry.icon

                return (
                  <a
                    key={entry.label}
                    href={entry.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={entry.label}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 text-slate-400 hover:-translate-y-0.5 hover:border-amber-500/30 hover:text-amber-300"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-amber-300/80">Quick Links</h4>
            <ul className="space-y-2">
              {primaryNavLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-slate-400 hover:text-amber-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-amber-300/80">External Resources</h4>
            <ul className="space-y-2">
              {footerResources.map((resource) => (
                <li key={resource.href}>
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-slate-400 hover:text-amber-200"
                  >
                    {resource.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-slate-500">Based on NIST SP 800-207 and CISA Zero Trust Maturity Model</p>
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Zero Trust Architecture Guide. Educational resource.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
          <p className="text-center text-xs text-slate-500">
            <strong>Disclaimer:</strong> This resource is for educational purposes only. Implementation of Zero Trust Architecture
            should be tailored to your organization's specific requirements, risk profile, and compliance obligations. Consult with
            professionals for production deployments.
          </p>
        </div>
      </div>
    </footer>
  )
}
