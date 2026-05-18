import { Brain, Settings, ShieldCheck, ArrowRight, Database, Users, Server } from 'lucide-react'

const components = [
  {
    icon: Brain,
    title: 'Policy Engine (PE)',
    subtitle: 'The Decision-Making Center',
    description: 'The Policy Engine is the brain of Zero Trust Architecture. It evaluates all access requests against organizational policies, threat intelligence, user behavior patterns, and environmental factors to make real-time decisions about granting or denying access.',
    features: [
      'Evaluates trust algorithms using multiple data sources',
      'Integrates with Identity Providers (IdP) and SIEM systems',
      'Calculates dynamic risk scores for each access request',
      'Incorporates threat intelligence feeds',
      'Maintains audit logs of all decisions',
    ],
    color: 'cyan',
    position: 'left',
  },
  {
    icon: Settings,
    title: 'Policy Administrator (PA)',
    subtitle: 'The Communication Bridge',
    description: 'The Policy Administrator acts as the bridge between the Policy Engine and enforcement points. It takes decisions from the PE and configures the appropriate enforcement mechanisms, establishing secure communication channels and managing session credentials.',
    features: [
      'Translates PE decisions into actionable configurations',
      'Establishes secure communication channels',
      'Manages session credentials and tokens',
      'Handles authentication token generation',
      'Coordinates with multiple PEPs simultaneously',
    ],
    color: 'teal',
    position: 'center',
  },
  {
    icon: ShieldCheck,
    title: 'Policy Enforcement Point (PEP)',
    subtitle: 'The Gatekeeper',
    description: 'Policy Enforcement Points are the gatekeepers that implement access decisions. Positioned close to protected resources, they monitor and control all communication, acting as the final barrier between users/services and enterprise resources.',
    features: [
      'Enforces access decisions at the resource boundary',
      'Monitors all traffic to protected resources',
      'Can terminate sessions in real-time',
      'Acts as identity-aware proxy or gateway',
      'Provides continuous session monitoring',
    ],
    color: 'blue',
    position: 'right',
  },
]

const signals = [
  { icon: Users, label: 'Identity Assurance', desc: 'Authentication strength, roles, attributes' },
  { icon: Server, label: 'Device Posture', desc: 'Managed status, OS version, EDR presence' },
  { icon: Database, label: 'Resource Sensitivity', desc: 'Data classification, criticality' },
  { icon: Brain, label: 'Behavior Signals', desc: 'Anomalous patterns, impossible travel' },
]

export default function ArchitectureComponents() {
  return (
    <section id="components" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-slate-900/30 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 mb-4">
            <span className="text-xs text-teal-400 font-medium">Core Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Zero Trust <span className="text-gradient-alt">Components</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            The three fundamental logical components that work together to implement Zero Trust. 
            These components decouple access decisions from infrastructure, enabling consistent 
            enforcement across hybrid environments.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="mb-16">
          <div className="glass-card rounded-3xl p-8 border-cyan-500/20">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
              {/* Subject */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-slate-800 border border-slate-600 flex items-center justify-center mb-2">
                  <Users className="w-10 h-10 text-slate-400" />
                </div>
                <span className="text-sm text-slate-400">Subject</span>
                <span className="text-xs text-slate-500">User/Device/Service</span>
              </div>

              {/* Arrow */}
              <ArrowRight className="w-6 h-6 text-slate-600 hidden lg:block" />

              {/* Policy Decision Point */}
              <div className="flex flex-col items-center">
                <div className="glass-card rounded-2xl p-4 border-cyan-500/30 bg-cyan-500/5">
                  <div className="text-center mb-3">
                    <span className="text-sm font-semibold text-cyan-400">Policy Decision Point (PDP)</span>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-24 h-20 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex flex-col items-center justify-center">
                      <Brain className="w-6 h-6 text-cyan-400 mb-1" />
                      <span className="text-xs text-cyan-400">Engine</span>
                    </div>
                    <div className="w-24 h-20 rounded-xl bg-teal-500/10 border border-teal-500/30 flex flex-col items-center justify-center">
                      <Settings className="w-6 h-6 text-teal-400 mb-1" />
                      <span className="text-xs text-teal-400">Admin</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <ArrowRight className="w-6 h-6 text-slate-600 hidden lg:block" />

              {/* Policy Enforcement Point */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-2">
                  <ShieldCheck className="w-10 h-10 text-blue-400" />
                </div>
                <span className="text-sm text-blue-400">PEP</span>
                <span className="text-xs text-slate-500">Enforcement</span>
              </div>

              {/* Arrow */}
              <ArrowRight className="w-6 h-6 text-slate-600 hidden lg:block" />

              {/* Resource */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-2">
                  <Database className="w-10 h-10 text-purple-400" />
                </div>
                <span className="text-sm text-purple-400">Resource</span>
                <span className="text-xs text-slate-500">App/Data/Service</span>
              </div>
            </div>
          </div>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {components.map((component) => {
            const Icon = component.icon
            const colorClasses: Record<string, { bg: string; border: string; text: string; glow: string }> = {
              cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', glow: 'shadow-cyan-500/20' },
              teal: { bg: 'bg-teal-500/10', border: 'border-teal-500/30', text: 'text-teal-400', glow: 'shadow-teal-500/20' },
              blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', glow: 'shadow-blue-500/20' },
            }
            const colors = colorClasses[component.color]

            return (
              <div
                key={component.title}
                className={`group glass-card rounded-2xl p-6 hover:border-${component.color}-500/50 transition-all duration-300 hover:shadow-lg ${colors.glow}`}
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{component.title}</h3>
                    <p className={`text-sm ${colors.text}`}>{component.subtitle}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{component.description}</p>

                {/* Features */}
                <ul className="space-y-2">
                  {component.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <div className={`w-1.5 h-1.5 rounded-full ${colors.bg.replace('/10', '/50')} ${colors.text} mt-1.5 flex-shrink-0`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Trust Signals */}
        <div className="glass-card rounded-2xl p-8 border-cyan-500/20">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">
            Signals That Inform <span className="text-gradient">Trust Decisions</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {signals.map((signal) => {
              const Icon = signal.icon
              return (
                <div key={signal.label} className="text-center p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-500/30 transition-colors">
                  <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                  <h4 className="font-medium text-white text-sm mb-1">{signal.label}</h4>
                  <p className="text-xs text-slate-500">{signal.desc}</p>
                </div>
              )
            })}
          </div>
          <p className="text-center text-slate-400 text-sm mt-6">
            Zero Trust decisions are only as good as the signals they're based on. 
            Additional inputs include threat intelligence, geolocation, time of access, and historical patterns.
          </p>
        </div>
      </div>
    </section>
  )
}
