import { Server, Wifi, Clock, Settings, Activity, Lock, Database } from 'lucide-react'

const tenets = [
  {
    icon: Server,
    number: '01',
    title: 'All Resources Are Protected',
    description: 'All data sources and computing services are considered resources. Whether it\'s a database, API, employee laptop, or SaaS application — everything must be secured equally.',
    color: 'cyan',
  },
  {
    icon: Wifi,
    number: '02',
    title: 'Secure All Communications',
    description: 'All communication is secured regardless of network location. No assumption that internal traffic is safe — encryption is applied everywhere.',
    color: 'teal',
  },
  {
    icon: Clock,
    number: '03',
    title: 'Per-Session Access',
    description: 'Access to individual enterprise resources is granted on a per-session basis. Even if you logged in recently, you must re-prove trustworthiness for each resource.',
    color: 'blue',
  },
  {
    icon: Settings,
    number: '04',
    title: 'Dynamic Policy Decisions',
    description: 'Access to resources is determined by dynamic policy. Decisions consider identity, authentication strength, device posture, and behavioral attributes.',
    color: 'indigo',
  },
  {
    icon: Activity,
    number: '05',
    title: 'Continuous Monitoring',
    description: 'The enterprise monitors and measures the integrity and security posture of all owned and associated assets. Patch and fix systems as needed.',
    color: 'purple',
  },
  {
    icon: Lock,
    number: '06',
    title: 'Dynamic Authentication',
    description: 'All resource authentication and authorization are dynamic and strictly enforced before access is allowed. Implement MFA and continuous re-evaluation.',
    color: 'pink',
  },
  {
    icon: Database,
    number: '07',
    title: 'Telemetry Collection',
    description: 'The enterprise collects as much information as possible about assets, network infrastructure, and communications to improve security posture.',
    color: 'rose',
  },
]

const colorClasses: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', glow: 'shadow-cyan-500/20' },
  teal: { bg: 'bg-teal-500/10', border: 'border-teal-500/30', text: 'text-teal-400', glow: 'shadow-teal-500/20' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', glow: 'shadow-blue-500/20' },
  indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-400', glow: 'shadow-indigo-500/20' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', glow: 'shadow-purple-500/20' },
  pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-400', glow: 'shadow-pink-500/20' },
  rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', glow: 'shadow-rose-500/20' },
}

export default function CorePrinciples() {
  return (
    <section id="principles" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-slate-900/50 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-4">
            <span className="text-xs text-cyan-400 font-medium">NIST SP 800-207</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Seven Core Tenets of <span className="text-gradient">Zero Trust</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            The foundational principles that define Zero Trust Architecture. Each tenet represents 
            a critical shift from traditional perimeter-based security to resource-centric protection.
          </p>
        </div>

        {/* Tenets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenets.slice(0, 6).map((tenet) => {
            const colors = colorClasses[tenet.color]
            const Icon = tenet.icon
            return (
              <div
                key={tenet.number}
                className={`group relative glass-card rounded-2xl p-6 hover:border-${tenet.color}-500/50 transition-all duration-300 hover:shadow-lg ${colors.glow}`}
              >
                {/* Number Badge */}
                <div className={`absolute -top-3 -right-3 w-10 h-10 rounded-lg ${colors.bg} ${colors.border} border flex items-center justify-center`}>
                  <span className={`text-sm font-bold ${colors.text}`}>{tenet.number}</span>
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">{tenet.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{tenet.description}</p>
              </div>
            )
          })}
        </div>

        {/* Seventh Tenet - Full Width */}
        <div className="mt-6">
          <div className="group relative glass-card rounded-2xl p-8 hover:border-rose-500/50 transition-all duration-300 hover:shadow-lg shadow-rose-500/20">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Number Badge */}
              <div className="w-14 h-14 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-rose-400">07</span>
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Database className="w-7 h-7 text-rose-400" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-white mb-2">{tenets[6].title}</h3>
                <p className="text-slate-400 leading-relaxed">{tenets[6].description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insight */}
        <div className="mt-16 glass-card rounded-2xl p-8 border-cyan-500/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <Lock className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-white mb-2">Key Insight</h4>
              <p className="text-slate-400">
                Zero Trust is not just about technology — it's a fundamental shift in security philosophy. 
                By assuming breach and verifying every access request, organizations can significantly 
                reduce their attack surface and limit the impact of compromised credentials, which were 
                the initial access vector in <span className="text-cyan-400 font-semibold">20.5%</span> of incident response investigations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
