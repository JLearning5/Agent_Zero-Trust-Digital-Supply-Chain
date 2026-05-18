import { AlertTriangle, Package, Code, Users, FileText, CheckCircle, XCircle, Shield } from 'lucide-react'

const threats = [
  {
    icon: Code,
    title: 'Software Compromise',
    description: 'Attackers breach a software vendor\'s network and implant malicious code distributed through standard updates.',
    example: 'SolarWinds Orion compromise affected 18,000+ organizations',
    impact: 'Critical',
  },
  {
    icon: Users,
    title: 'MSP Compromise',
    description: 'Managed Service Providers are targeted to access multiple victims simultaneously through trusted channels.',
    example: 'Kaseya VSA ransomware attack impacted thousands of downstream customers',
    impact: 'High',
  },
  {
    icon: Package,
    title: 'Open Source Risks',
    description: 'Malicious packages on public repositories or compromised dependencies in software builds.',
    example: 'Log4Shell vulnerability in widely-used logging library',
    impact: 'High',
  },
  {
    icon: FileText,
    title: 'SBOM Gaps',
    description: 'Lack of Software Bill of Materials makes it difficult to identify vulnerable components.',
    example: 'Organizations unable to quickly assess exposure to new vulnerabilities',
    impact: 'Medium',
  },
]

const ztscStrategies = [
  {
    icon: Shield,
    title: 'Patch Management with Zero Trust',
    description: 'Apply "never trust, always verify" principles to patch management. Scan, evaluate, test, and sandbox patches before production deployment.',
    color: 'cyan',
  },
  {
    icon: CheckCircle,
    title: 'Software Verification',
    description: 'Verify software behavior and constrain access regardless of vendor trust. Implement code signing verification and behavioral monitoring.',
    color: 'teal',
  },
  {
    icon: FileText,
    title: 'SBOM Implementation',
    description: 'Maintain comprehensive Software Bill of Materials to track all components and dependencies for rapid vulnerability assessment.',
    color: 'blue',
  },
]

const stats = [
  { value: '71%', label: 'Experienced supply chain incidents', sub: 'in the past 12 months' },
  { value: '30%', label: 'Third-party breaches', sub: 'of all breaches in 2025' },
  { value: '100%', label: 'YoY increase', sub: 'in supply chain attacks' },
  { value: '11%', label: 'Average revenue loss', sub: 'per incident' },
]

export default function SupplyChainSecurity() {
  return (
    <section id="supply-chain" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-slate-900/50 to-background" />
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-15">
        <img
          src="/supply-chain.jpg"
          alt="Digital Supply Chain"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 mb-4">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span className="text-xs text-rose-400 font-medium">Critical Threat Area</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Digital Supply Chain <span className="text-gradient">Security</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Supply chain attacks have escalated to a top-tier risk for businesses worldwide. 
            Zero Trust Architecture provides a comprehensive framework to mitigate these threats 
            through continuous verification and least-privilege principles.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-4 text-center border-rose-500/10">
              <div className="text-3xl font-bold text-rose-400 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-300">{stat.label}</div>
              <div className="text-xs text-slate-500">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Threats Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-white mb-6">
            Key <span className="text-rose-400">Supply Chain Threats</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {threats.map((threat) => {
              const Icon = threat.icon
              return (
                <div
                  key={threat.title}
                  className="glass-card rounded-xl p-6 border-rose-500/20 hover:border-rose-500/40 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-rose-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold text-white">{threat.title}</h4>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          threat.impact === 'Critical' 
                            ? 'bg-rose-500/20 text-rose-400' 
                            : threat.impact === 'High'
                            ? 'bg-orange-500/20 text-orange-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {threat.impact}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm mb-2">{threat.description}</p>
                      <p className="text-xs text-slate-500">
                        <span className="text-rose-400">Example:</span> {threat.example}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Zero Trust Supply Chain Strategies */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-white mb-6">
            Zero Trust <span className="text-gradient">Supply Chain</span> (ZTSC) Strategies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ztscStrategies.map((strategy) => {
              const Icon = strategy.icon
              const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
                cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
                teal: { bg: 'bg-teal-500/10', border: 'border-teal-500/30', text: 'text-teal-400' },
                blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
              }
              const colors = colorClasses[strategy.color]

              return (
                <div
                  key={strategy.title}
                  className={`glass-card rounded-xl p-6 ${colors.border} hover:border-${strategy.color}-500/50 transition-colors`}
                >
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <h4 className={`text-lg font-semibold ${colors.text} mb-2`}>{strategy.title}</h4>
                  <p className="text-slate-400 text-sm">{strategy.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* ZTSC Implementation */}
        <div className="glass-card rounded-2xl p-8 border-cyan-500/20">
          <h3 className="text-2xl font-semibold text-white mb-6">
            Implementing <span className="text-gradient">Zero Trust</span> for Supply Chain
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-cyan-400 mb-4">Microsegmentation</h4>
              <p className="text-slate-400 text-sm mb-4">
                Implement granular network segmentation to isolate vendor software and limit lateral movement. 
                Only 20-30% of SolarWinds Orion servers needed internet access — blocking the rest would 
                have prevented the callback to command and control.
              </p>
              <ul className="space-y-2">
                {['Isolate vendor software in dedicated network segments', 'Implement allow-list based firewall rules', 'Block unnecessary outbound connections', 'Monitor east-west traffic between segments'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-teal-400 mb-4">Vendor Access Controls</h4>
              <p className="text-slate-400 text-sm mb-4">
                Implement rigorous controls over third-party and vendor access. The SolarWinds attack 
                highlighted the need for just-in-time access and continuous monitoring of vendor activities.
              </p>
              <ul className="space-y-2">
                {['Inventory all vendor connections and software', 'Implement just-in-time access for support', 'Record and audit all vendor sessions', 'Require MFA for all privileged access'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-teal-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                <XCircle className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">The Trust Paradox</h4>
                <p className="text-slate-400 text-sm">
                  The SolarWinds attack created a fundamental paradox: organizations that followed security 
                  best practices — keeping software updated, using reputable vendors, verifying digital signatures — 
                  were compromised precisely because they did so. Zero Trust addresses this by verifying 
                  <span className="text-cyan-400"> behavior</span>, not just <span className="text-cyan-400">identity</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
