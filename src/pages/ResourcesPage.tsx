import { ExternalLink, Github, Linkedin, Mail, Server, Shield, Twitter } from 'lucide-react'
import SiteFrame from '../components/layout/SiteFrame'
import { footerResources, socialLinks } from '../data/site'

const projectLinks = [
  {
    title: 'Live Render Deployment',
    description: 'Open the production deployment served from Render.',
    href: 'https://agent-zero-trust-digital-supply-chain.onrender.com',
  },
  {
    title: 'Project Repository',
    description: 'Review the GitHub source, deployment history, and collaboration surface.',
    href: 'https://github.com/JLearning5/Agent_Zero-Trust-Digital-Supply-Chain',
  },
  {
    title: 'Supabase Project URL',
    description: 'Open the connected Supabase project used for Implementation Lab audit persistence.',
    href: 'https://vxtswbochhlrpvsdhrlf.supabase.co',
  },
]

const socialIcons = {
  GitHub: Github,
  X: Twitter,
  LinkedIn: Linkedin,
  Gmail: Mail,
}

const socialMeta = {
  GitHub: 'github.com/JLearning5/Agent_Zero-Trust-Digital-Supply-Chain',
  X: 'x.com/Austico7',
  LinkedIn: 'linkedin.com/in/augustine-chidubem-b0457837a',
  Gmail: 'chidubema28@gmail.com',
}

export default function ResourcesPage() {
  return (
    <SiteFrame currentPath="resources.html">
      <section className="relative overflow-hidden pb-24 pt-28">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-amber-500/5 to-background" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2">
              <Shield className="h-4 w-4 text-amber-300" />
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber-200">Reference hub</span>
            </div>
            <h1 className="mb-4 text-3xl text-white sm:text-4xl lg:text-5xl">
              Project Links and <span className="text-gradient">Official Resources</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-slate-400">
              Use this page for the live deployment, repository, official guidance, and direct contact channels.
            </p>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {projectLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-card rounded-[28px] border-white/10 p-6 hover:border-amber-500/30"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10">
                    <Server className="h-6 w-6 text-amber-300" />
                  </div>
                  <ExternalLink className="h-4 w-4 text-amber-200 transition-transform group-hover:translate-x-0.5" />
                </div>
                <h2 className="mb-2 text-2xl text-white">{link.title}</h2>
                <p className="text-sm leading-relaxed text-slate-400">{link.description}</p>
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="glass-card rounded-[32px] border-white/10 p-8">
              <h2 className="mb-5 text-2xl text-white">Official Guidance</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {footerResources.map((resource) => (
                  <a
                    key={resource.href}
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[22px] border border-white/10 bg-slate-900/60 p-4 hover:border-amber-500/20"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-semibold text-white">{resource.label}</h3>
                        <p className="mt-2 text-sm text-slate-400">
                          Primary source material for Zero Trust architecture, maturity, and federal cybersecurity guidance.
                        </p>
                      </div>
                      <ExternalLink className="h-4 w-4 flex-shrink-0 text-amber-200" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-[32px] border-white/10 p-8">
              <h2 className="mb-5 text-2xl text-white">Contact and Profiles</h2>
              <div className="space-y-4">
                {socialLinks.map((link) => {
                  const Icon = socialIcons[link.label as keyof typeof socialIcons]
                  const meta = socialMeta[link.label as keyof typeof socialMeta]

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-4 rounded-[22px] border border-white/10 bg-slate-900/60 p-4 hover:border-amber-500/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10">
                          <Icon className="h-5 w-5 text-amber-300" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{link.label}</div>
                          <div className="text-xs text-slate-500">{meta}</div>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 flex-shrink-0 text-amber-200" />
                    </a>
                  )
                })}
              </div>

              <div className="mt-6 rounded-[22px] border border-amber-500/20 bg-amber-500/10 p-4">
                <p className="text-sm leading-relaxed text-amber-100/90">
                  Sensitive infrastructure credentials are intentionally not published on this page. The frontend only exposes the
                  public Render URL, GitHub repository, Supabase project endpoint, and a Gmail compose shortcut.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteFrame>
  )
}
