import { Fingerprint, Monitor, Network, AppWindow, Database, ChevronRight } from 'lucide-react'

const pillars = [
  {
    icon: Fingerprint,
    title: 'Identity',
    description: 'The Identity pillar focuses on verifying and managing the identities of users, processes, and systems. It ensures access is granted only to authenticated and authorized entities based on least privilege principles.',
    keyPoints: [
      'Multi-factor authentication (MFA) for all access',
      'Continuous authentication and risk scoring',
      'Behavioral baselining and anomaly detection',
      'Real-time revocation of compromised credentials',
      'Privileged Access Management (PAM)',
    ],
    maturityLevels: ['Traditional', 'Initial', 'Advanced', 'Optimal'],
    color: 'cyan',
  },
  {
    icon: Monitor,
    title: 'Device',
    description: 'The Device pillar ensures that all devices accessing the network are identified, monitored, and meet security compliance standards to reduce potential attack surfaces.',
    keyPoints: [
      'Device inventory and asset management',
      'Endpoint Detection and Response (EDR)',
      'Mobile Device Management (MDM)',
      'OS version and patch level verification',
      'Compliance checking before access grant',
    ],
    maturityLevels: ['Traditional', 'Initial', 'Advanced', 'Optimal'],
    color: 'teal',
  },
  {
    icon: Network,
    title: 'Network/Environment',
    description: 'The Network pillar emphasizes secure network segmentation, dynamic access controls, and monitoring of traffic flows to limit lateral movement and protect resources.',
    keyPoints: [
      'Microsegmentation of network zones',
      'Software-Defined Perimeter (SDP)',
      'Identity-aware routing and proxies',
      'SASE/SSE implementation',
      'Continuous inspection of internal traffic',
    ],
    maturityLevels: ['Traditional', 'Initial', 'Advanced', 'Optimal'],
    color: 'blue',
  },
  {
    icon: AppWindow,
    title: 'Application & Workload',
    description: 'The Application Workload pillar protects applications and workloads by enforcing secure access, implementing runtime monitoring, and ensuring trusted interactions.',
    keyPoints: [
      'Runtime identity enforcement between workloads',
      'Explicit inter-service allow lists',
      'Removal of persistent admin access',
      'API security and gateway controls',
      'Application-layer verification',
    ],
    maturityLevels: ['Traditional', 'Initial', 'Advanced', 'Optimal'],
    color: 'indigo',
  },
  {
    icon: Database,
    title: 'Data',
    description: 'The Data pillar focuses on protecting sensitive information through classification, encryption, monitoring, and policies that prevent unauthorized access or exfiltration.',
    keyPoints: [
      'Data classification and labeling',
      'Encryption at rest and in transit',
      'Data Loss Prevention (DLP)',
      'Access logging and auditing',
      'Rights management and data governance',
    ],
    maturityLevels: ['Traditional', 'Initial', 'Advanced', 'Optimal'],
    color: 'purple',
  },
]

const colorClasses: Record<string, { bg: string; border: string; text: string; gradient: string }> = {
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', gradient: 'from-cyan-500 to-blue-500' },
  teal: { bg: 'bg-teal-500/10', border: 'border-teal-500/30', text: 'text-teal-400', gradient: 'from-teal-500 to-cyan-500' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', gradient: 'from-blue-500 to-indigo-500' },
  indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-400', gradient: 'from-indigo-500 to-purple-500' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', gradient: 'from-purple-500 to-pink-500' },
}

export default function FivePillars() {
  return (
    <section id="pillars" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-slate-900/50 to-background" />
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="/pillars.jpg"
          alt="Zero Trust Pillars"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 mb-4">
            <span className="text-xs text-blue-400 font-medium">CISA Zero Trust Maturity Model</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            The Five <span className="text-gradient">Pillars</span> of Zero Trust
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            The CISA Zero Trust Maturity Model defines five core pillars that represent domains 
            where trust needs to be continuously evaluated. Each pillar evolves through four maturity stages.
          </p>
        </div>

        {/* Pillars */}
        <div className="space-y-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            const colors = colorClasses[pillar.color]
            const isEven = index % 2 === 0

            return (
              <div
                key={pillar.title}
                className={`group glass-card rounded-2xl p-6 lg:p-8 hover:border-${pillar.color}-500/50 transition-all duration-300`}
              >
                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-6 lg:gap-10`}>
                  {/* Icon & Title Section */}
                  <div className="lg:w-1/3 flex flex-col">
                    <div className={`w-16 h-16 rounded-2xl ${colors.bg} ${colors.border} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    <h3 className={`text-2xl font-bold ${colors.text} mb-2`}>{pillar.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{pillar.description}</p>
                    
                    {/* Maturity Levels */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {pillar.maturityLevels.map((level) => (
                        <span
                          key={level}
                          className={`px-2 py-1 text-xs rounded-md ${colors.bg} ${colors.text} border ${colors.border}`}
                        >
                          {level}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Points */}
                  <div className="lg:w-2/3">
                    <h4 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">
                      Key Implementation Areas
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {pillar.keyPoints.map((point, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-cyan-500/30 transition-colors"
                        >
                          <ChevronRight className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0`} />
                          <span className="text-sm text-slate-300">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Cross-Cutting Capabilities */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">
            Cross-Cutting <span className="text-gradient-alt">Capabilities</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-xl p-6 border-cyan-500/20">
              <h4 className="text-lg font-semibold text-cyan-400 mb-2">Visibility & Analytics</h4>
              <p className="text-sm text-slate-400">
                Comprehensive logging, monitoring, and analysis of all activities across the enterprise 
                to detect anomalies and inform policy decisions.
              </p>
            </div>
            <div className="glass-card rounded-xl p-6 border-teal-500/20">
              <h4 className="text-lg font-semibold text-teal-400 mb-2">Automation & Orchestration</h4>
              <p className="text-sm text-slate-400">
                Automated response to security events, policy enforcement, and orchestration of 
                security tools for rapid threat mitigation.
              </p>
            </div>
            <div className="glass-card rounded-xl p-6 border-blue-500/20">
              <h4 className="text-lg font-semibold text-blue-400 mb-2">Governance</h4>
              <p className="text-sm text-slate-400">
                Policy definition, compliance management, and risk assessment frameworks that 
                guide Zero Trust implementation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
