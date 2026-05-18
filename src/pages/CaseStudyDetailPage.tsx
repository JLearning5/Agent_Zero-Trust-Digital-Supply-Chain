import { ArrowLeft, Download, ExternalLink, FileText } from 'lucide-react'
import SiteFrame from '../components/layout/SiteFrame'
import { caseStudies } from '../data/site'

interface CaseStudyDetailPageProps {
  currentPath: string
  slug: string
}

const colorClasses = {
  rose: {
    badge: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
    accent: 'text-rose-400',
  },
  orange: {
    badge: 'bg-orange-500/10 border-orange-500/30 text-orange-300',
    accent: 'text-orange-400',
  },
  yellow: {
    badge: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-200',
    accent: 'text-yellow-400',
  },
}

export default function CaseStudyDetailPage({ currentPath, slug }: CaseStudyDetailPageProps) {
  const study = caseStudies.find((entry) => entry.slug === slug)

  if (!study) {
    return (
      <SiteFrame currentPath={currentPath}>
        <section className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto glass-card rounded-2xl p-8 border-rose-500/20">
            <h1 className="text-3xl font-bold text-white mb-3">Case Study Not Found</h1>
            <p className="text-slate-400 mb-6">The requested case study could not be loaded.</p>
            <a href="./case-studies.html" className="inline-flex items-center gap-2 text-cyan-300">
              <ArrowLeft className="w-4 h-4" />
              Return to case studies
            </a>
          </div>
        </section>
      </SiteFrame>
    )
  }

  const colors = colorClasses[study.color]
  const Icon = study.icon

  return (
    <SiteFrame currentPath={currentPath}>
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-slate-900/50 to-background" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <a href="./case-studies.html" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to case studies
          </a>

          <div className="glass-card rounded-3xl p-8 lg:p-10 border-slate-700 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              <div className={`w-16 h-16 rounded-2xl ${colors.badge} border flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-8 h-8 ${colors.accent}`} />
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                  <span className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-medium ${colors.badge}`}>
                    {study.date}
                  </span>
                  <span className="text-xs uppercase tracking-[0.25em] text-slate-500">Detailed Review</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{study.title}</h1>
                <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">{study.summary}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={study.paperHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500/15 border border-cyan-500/40 px-5 py-3 text-sm font-medium text-cyan-200 hover:bg-cyan-500/25 transition-colors"
              >
                <Download className="w-4 h-4" />
                {study.paperLabel}
              </a>
              <a
                href={study.references[0]?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900/70 border border-slate-700 px-5 py-3 text-sm font-medium text-slate-200 hover:border-cyan-500/30 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Open primary source
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {Object.entries(study.impact).map(([key, value]) => (
              <div key={key} className="glass-card rounded-2xl p-5 border-slate-700">
                <div className={`text-lg font-semibold ${colors.accent}`}>{value}</div>
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500 mt-2">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-8">
            <div className="space-y-8">
              <div className="glass-card rounded-2xl p-6 border-slate-700">
                <h2 className="text-2xl font-semibold text-white mb-4">Attack Chain</h2>
                <ul className="space-y-3">
                  {study.attackVector.map((vector) => (
                    <li key={vector} className="flex items-start gap-3 text-sm text-slate-300">
                      <div className={`mt-1.5 h-2 w-2 rounded-full ${study.color === 'yellow' ? 'bg-yellow-400' : study.color === 'orange' ? 'bg-orange-400' : 'bg-rose-400'}`} />
                      <span>{vector}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card rounded-2xl p-6 border-cyan-500/20">
                <h2 className="text-2xl font-semibold text-white mb-4">Zero Trust Lessons</h2>
                <div className="space-y-4">
                  {study.ztaLessons.map((lesson) => (
                    <div key={lesson.title} className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                      <h3 className="text-base font-semibold text-white mb-2">{lesson.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-400">{lesson.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="glass-card rounded-2xl p-6 border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-xl font-semibold text-white">Reference Packet</h2>
                </div>
                <p className="text-sm text-slate-400 mb-5">
                  Each case page includes a bundled PDF brief so the evidence remains available even if an external site changes.
                </p>

                <a
                  href={study.paperHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-4 hover:bg-cyan-500/15 transition-colors"
                >
                  <div>
                    <div className="text-sm font-semibold text-white">{study.paperLabel}</div>
                    <div className="text-xs text-slate-400">PDF archive companion for this case study</div>
                  </div>
                  <Download className="w-4 h-4 text-cyan-300" />
                </a>

                <div className="mt-5 space-y-3">
                  {study.references.map((reference) => (
                    <a
                      key={reference.href}
                      href={reference.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start justify-between gap-3 rounded-xl border border-slate-700 bg-slate-900/50 p-4 hover:border-cyan-500/30 transition-colors"
                    >
                      <div>
                        <div className="text-sm font-medium text-white">{reference.label}</div>
                        <div className="text-xs text-slate-500 mt-1">External source</div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-cyan-300 flex-shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 border-slate-700">
                <h2 className="text-xl font-semibold text-white mb-3">Why This Matters</h2>
                <p className="text-sm leading-relaxed text-slate-400">
                  Zero Trust works best when it treats software factories, vendor tooling, and administrative channels as high-risk resources instead of
                  inherited trust zones. This case shows how supply chain compromise can bypass traditional perimeter assumptions in a single step.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteFrame>
  )
}
