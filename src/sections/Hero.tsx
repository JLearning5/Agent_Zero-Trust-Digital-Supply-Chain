import { ArrowRight, Shield, Lock, Eye, Fingerprint } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 z-0">
        <img src="/hero-zta.jpg" alt="Zero Trust Architecture" className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-background/55 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/85" />
      </div>

      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-[12%] top-[18%] h-72 w-72 rounded-full bg-amber-500/10 blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-[14%] right-[10%] h-72 w-72 rounded-full bg-orange-500/10 blur-3xl animate-pulse-slow"
          style={{ animationDelay: '1.8s' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-amber-500/20 bg-amber-500/10 px-5 py-2">
            <Shield className="h-4 w-4 text-amber-300" />
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-amber-200">
              NIST SP 800-207 / Digital supply chain
            </span>
          </div>

          <h1 className="mb-6 text-5xl leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-[5.6rem]">
            Designing a <span className="italic text-gradient">Zero Trust</span> operating model for modern digital supply chains
          </h1>

          <p className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-slate-400 sm:text-lg md:text-xl">
            A practical, evidence-backed guide to securing vendor ecosystems, CI/CD pipelines, and high-value workloads with
            continuous verification, segmented trust boundaries, and measurable enforcement decisions.
          </p>

          <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="./principles.html"
              className="group flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/15 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-amber-100 hover:-translate-y-0.5 hover:bg-amber-500/25"
            >
              Explore principles
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="./framework.html"
              className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white hover:-translate-y-0.5 hover:border-amber-500/20 hover:text-amber-100"
            >
              Implementation roadmap
            </a>
          </div>

          <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              ['71%', 'Organizations affected by supply chain attacks'],
              ['100%', 'Increase in third-party breach activity'],
              ['7', 'Core NIST Zero Trust tenets'],
              ['5', 'CISA maturity pillars in scope'],
            ].map(([value, label]) => (
              <div key={label} className="glass-card rounded-[24px] border-white/10 p-5 text-left">
                <div className="mb-2 text-3xl text-white">{value}</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-200/80">Signal</div>
                <div className="mt-3 text-sm leading-relaxed text-slate-400">{label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
            {[
              {
                icon: Fingerprint,
                title: 'Identity Verification',
                copy: 'Continuously re-check users, devices, and service identities instead of granting standing trust.',
              },
              {
                icon: Lock,
                title: 'Least Privilege',
                copy: 'Shrink every session to the exact permissions, time window, and asset scope it truly needs.',
              },
              {
                icon: Eye,
                title: 'Continuous Monitoring',
                copy: 'Treat telemetry, anomalies, and context drift as first-class inputs to every access decision.',
              },
              {
                icon: Shield,
                title: 'Assume Breach',
                copy: 'Design controls with the expectation that compromise can originate inside a trusted vendor channel.',
              },
            ].map(({ icon: Icon, title, copy }) => (
              <div key={title} className="glass-card rounded-[26px] border-white/10 p-5 text-left">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10">
                  <Icon className="h-5 w-5 text-amber-300" />
                </div>
                <h3 className="mb-2 text-xl text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex h-11 w-7 items-start justify-center rounded-full border border-amber-500/30 p-2">
          <div className="h-3 w-1.5 rounded-full bg-amber-300 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
