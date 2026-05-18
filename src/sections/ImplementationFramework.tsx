import { Search, Target, FileCode, Rocket, BarChart3, CheckCircle, ArrowRight, Layers } from 'lucide-react'

const phases = [
  {
    icon: Search,
    number: '01',
    title: 'Asset Discovery',
    description: 'Identify and catalog all users, devices, data flows, and critical services within your environment.',
    tasks: [
      'Inventory all hardware and software assets',
      'Map data flows and dependencies',
      'Identify high-value targets and crown jewels',
      'Document user roles and access patterns',
      'Catalog third-party connections and vendors',
    ],
    color: 'cyan',
  },
  {
    icon: Target,
    number: '02',
    title: 'Define Trust Zones',
    description: 'Classify workloads and communication paths by risk level to establish security boundaries.',
    tasks: [
      'Segment network based on data sensitivity',
      'Define protection surfaces for critical assets',
      'Establish security zones and trust levels',
      'Map communication flows between zones',
      'Identify legacy system constraints',
    ],
    color: 'teal',
  },
  {
    icon: FileCode,
    number: '03',
    title: 'Policy Modeling',
    description: 'Create comprehensive access policies based on identity, device posture, and contextual factors.',
    tasks: [
      'Define identity and authentication policies',
      'Establish device compliance requirements',
      'Create least-privilege access rules',
      'Define risk scoring criteria',
      'Document exception handling procedures',
    ],
    color: 'blue',
  },
  {
    icon: Rocket,
    number: '04',
    title: 'Pilot Deployment',
    description: 'Start with a low-risk segment or single application group to validate your approach.',
    tasks: [
      'Select pilot environment and use cases',
      'Deploy Policy Engine and PEP infrastructure',
      'Configure initial policies and rules',
      'Test with limited user group',
      'Gather feedback and refine approach',
    ],
    color: 'indigo',
  },
  {
    icon: BarChart3,
    number: '05',
    title: 'Monitor & Expand',
    description: 'Use telemetry to continuously improve policies and scale adoption across the enterprise.',
    tasks: [
      'Establish continuous monitoring dashboards',
      'Analyze policy effectiveness and gaps',
      'Tune policies based on real-world data',
      'Expand to additional applications and zones',
      'Conduct regular security assessments',
    ],
    color: 'purple',
  },
]

const deploymentModels = [
  {
    title: 'Enhanced Identity Governance (EIG)',
    description: 'Controls access at the application level via identity providers, MFA, and SSO. Best for organizations with strong identity infrastructure.',
    pros: ['Strong user authentication', 'Centralized policy management', 'Good for cloud apps'],
    cons: ['Limited network-level control', 'Requires mature IdP'],
  },
  {
    title: 'Microsegmentation',
    description: 'Uses host-based agents or SDN to isolate network zones and enforce per-service access. Ideal for data center and cloud workloads.',
    pros: ['Granular network control', 'Limits lateral movement', 'Works with legacy apps'],
    cons: ['Complex to implement', 'Requires agent deployment'],
  },
  {
    title: 'Software-Defined Perimeter (SDP)',
    description: 'Builds overlay tunnels between authenticated users and services. Excellent for remote access and cloud-native applications.',
    pros: ['No network exposure', 'Scalable for remote work', 'Cloud-native friendly'],
    cons: ['Requires client software', 'Latency considerations'],
  },
]

const colorClasses: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', glow: 'shadow-cyan-500/20' },
  teal: { bg: 'bg-teal-500/10', border: 'border-teal-500/30', text: 'text-teal-400', glow: 'shadow-teal-500/20' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', glow: 'shadow-blue-500/20' },
  indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-400', glow: 'shadow-indigo-500/20' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', glow: 'shadow-purple-500/20' },
}

export default function ImplementationFramework() {
  return (
    <section id="framework" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-slate-900/30 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-4">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span className="text-xs text-indigo-400 font-medium">Implementation Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Zero Trust <span className="text-gradient-alt">Implementation</span> Framework
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            NIST recommends a phased, iterative approach to Zero Trust adoption. This framework 
            provides a practical roadmap for organizations at any stage of their Zero Trust journey.
          </p>
        </div>

        {/* Implementation Phases */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">
            Five-Phase <span className="text-indigo-400">Implementation</span> Model
          </h3>
          
          <div className="space-y-6">
            {phases.map((phase) => {
              const Icon = phase.icon
              const colors = colorClasses[phase.color]

              return (
                <div
                  key={phase.number}
                  className={`group glass-card rounded-2xl p-6 hover:border-${phase.color}-500/50 transition-all duration-300`}
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Phase Number & Icon */}
                    <div className="lg:w-64 flex lg:flex-col items-center lg:items-start gap-4">
                      <div className={`w-16 h-16 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-8 h-8 ${colors.text}`} />
                      </div>
                      <div>
                        <div className={`text-sm font-bold ${colors.text} mb-1`}>Phase {phase.number}</div>
                        <h4 className="text-xl font-semibold text-white">{phase.title}</h4>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="lg:w-1/3">
                      <p className="text-slate-400">{phase.description}</p>
                    </div>

                    {/* Tasks */}
                    <div className="lg:w-1/3">
                      <ul className="space-y-2">
                        {phase.tasks.map((task, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                            <CheckCircle className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0`} />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Deployment Models */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">
            ZTA <span className="text-gradient">Deployment Models</span>
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {deploymentModels.map((model) => (
              <div
                key={model.title}
                className="glass-card rounded-2xl p-6 border-slate-700 hover:border-cyan-500/30 transition-colors"
              >
                <h4 className="text-lg font-semibold text-white mb-2">{model.title}</h4>
                <p className="text-slate-400 text-sm mb-4">{model.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Pros</span>
                    <ul className="mt-1 space-y-1">
                      {model.pros.map((pro, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                          <CheckCircle className="w-3 h-3 text-cyan-400" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">Cons</span>
                    <ul className="mt-1 space-y-1">
                      {model.cons.map((con, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                          <ArrowRight className="w-3 h-3 text-rose-400" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Start Checklist */}
        <div className="glass-card rounded-2xl p-8 border-cyan-500/20">
          <h3 className="text-2xl font-semibold text-white mb-6">
            Quick Start <span className="text-gradient">Checklist</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-cyan-400 mb-3">Identity Foundation</h4>
              <ul className="space-y-2">
                {['Implement MFA across all systems', 'Deploy Privileged Access Management', 'Establish identity governance', 'Enable SSO where possible'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                    <div className="w-4 h-4 rounded border border-cyan-500/30 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-sm bg-cyan-400/50" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-teal-400 mb-3">Device Security</h4>
              <ul className="space-y-2">
                {['Deploy EDR on all endpoints', 'Implement MDM for mobile devices', 'Establish device compliance policies', 'Enable disk encryption'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                    <div className="w-4 h-4 rounded border border-teal-500/30 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-sm bg-teal-400/50" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-3">Network Controls</h4>
              <ul className="space-y-2">
                {['Implement network segmentation', 'Deploy identity-aware proxies', 'Enable TLS inspection', 'Establish microsegmentation pilot'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                    <div className="w-4 h-4 rounded border border-blue-500/30 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-sm bg-blue-400/50" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
