import { AlertTriangle, CheckCircle, Download, ExternalLink, XCircle } from 'lucide-react'
import { caseStudies } from '../data/site'

const preventionMatrix = [
  { control: 'Microsegmentation', solarwinds: true, kaseya: true, codecov: true },
  { control: 'Behavioral Analytics', solarwinds: true, kaseya: false, codecov: true },
  { control: 'Just-in-Time Access', solarwinds: true, kaseya: true, codecov: false },
  { control: 'Code Signing Verification', solarwinds: false, kaseya: false, codecov: true },
  { control: 'Network Allow-Lists', solarwinds: true, kaseya: true, codecov: false },
  { control: 'Continuous Monitoring', solarwinds: true, kaseya: true, codecov: true },
]

export default function CaseStudies() {
  return (
    <section id="case-studies" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-slate-900/50 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 mb-4">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span className="text-xs text-rose-400 font-medium">Real-World Analysis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Supply Chain Attack <span className="text-gradient">Case Studies</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Analyzing major supply chain attacks through the lens of Zero Trust Architecture. 
            Understanding how ZTA principles could have prevented or mitigated these breaches.
          </p>
        </div>

        {/* Case Studies */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-16">
          {caseStudies.map((study) => {
            const Icon = study.icon
            const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
              rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400' },
              orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400' },
              yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400' },
            }
            const colors = colorClasses[study.color]

            return (
              <div key={study.title} className={`glass-card rounded-2xl p-6 ${colors.border}`}>
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-white">{study.title}</h3>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${colors.bg} ${colors.text} ${colors.border} border w-fit`}>
                        {study.date}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">{study.summary}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {Object.entries(study.impact).map(([key, value]) => (
                    <div key={key} className="bg-slate-800/50 rounded-lg p-3">
                      <div className={`text-lg font-bold ${colors.text}`}>{value}</div>
                      <div className="text-xs text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Attack Vector</h4>
                  <ul className="space-y-2">
                    {study.attackVector.slice(0, 3).map((vector) => (
                      <li key={vector} className="flex items-start gap-2 text-sm text-slate-400">
                        <XCircle className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0`} />
                        {vector}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 mb-6">
                  {study.ztaLessons.map((lesson) => (
                    <div key={lesson.title} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                      <h5 className="font-semibold text-white mb-1">{lesson.title}</h5>
                      <p className="text-sm text-slate-400">{lesson.description}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={study.detailHref}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500/15 border border-cyan-500/30 px-4 py-3 text-sm font-medium text-cyan-200 hover:bg-cyan-500/25 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open case page
                  </a>
                  <a
                    href={study.paperHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900/70 border border-slate-700 px-4 py-3 text-sm font-medium text-slate-200 hover:border-cyan-500/30 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    PDF archive brief
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Prevention Matrix */}
        <div className="glass-card rounded-2xl p-8 border-cyan-500/20">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">
            Zero Trust <span className="text-gradient">Prevention Matrix</span>
          </h3>
          <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
            How specific Zero Trust controls could have prevented or detected each major supply chain attack.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Control</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-rose-400">SolarWinds</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-orange-400">Kaseya</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-yellow-400">Codecov</th>
                </tr>
              </thead>
              <tbody>
                {preventionMatrix.map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-800">
                    <td className="py-3 px-4 text-sm text-slate-300">{row.control}</td>
                    <td className="text-center py-3 px-4">
                      {row.solarwinds ? (
                        <CheckCircle className="w-5 h-5 text-cyan-400 mx-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-slate-600 mx-auto" />
                      )}
                    </td>
                    <td className="text-center py-3 px-4">
                      {row.kaseya ? (
                        <CheckCircle className="w-5 h-5 text-cyan-400 mx-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-slate-600 mx-auto" />
                      )}
                    </td>
                    <td className="text-center py-3 px-4">
                      {row.codecov ? (
                        <CheckCircle className="w-5 h-5 text-cyan-400 mx-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-slate-600 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-400">Could prevent/detect</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-slate-600" />
              <span className="text-slate-400">Limited effectiveness</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
