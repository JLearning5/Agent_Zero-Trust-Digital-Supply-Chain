import { ArrowRight } from 'lucide-react'
import { overviewCards } from '../data/site'

export default function PageDirectory() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-amber-500/5 to-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber-200">Multi-page navigation</span>
          </div>
          <h2 className="mb-4 text-3xl text-white sm:text-4xl md:text-5xl">
            Explore the Guide <span className="text-gradient">Without Long Scrolls</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-slate-400">
            Each topic now has its own focused page so readers can move directly to the material they need.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {overviewCards.map((card) => {
            const Icon = card.icon

            return (
              <a
                key={card.title}
                href={card.href}
                className="group glass-card rounded-[28px] border-white/10 p-6 transition-all duration-300 hover:border-amber-500/30"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.24em] text-amber-200/80">{card.eyebrow}</p>
                    <h3 className="text-2xl text-white">{card.title}</h3>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6 text-amber-300" />
                  </div>
                </div>

                <p className="mb-5 text-sm leading-relaxed text-slate-400">{card.description}</p>

                <div className="inline-flex items-center gap-2 text-sm font-medium text-amber-200">
                  Open page
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
