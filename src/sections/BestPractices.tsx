import { Lightbulb, CheckCircle, AlertCircle, BookOpen, ExternalLink, Shield, Lock, Eye, Users, Server } from 'lucide-react'

const bestPractices = [
  {
    category: 'Identity & Access',
    icon: Users,
    color: 'cyan',
    practices: [
      'Implement MFA for all users, including service accounts',
      'Deploy Privileged Access Management (PAM) for admin accounts',
      'Use just-in-time access for sensitive operations',
      'Implement continuous authentication with risk-based step-up',
      'Regular access reviews and recertification',
      'Eliminate standing privileges and shared accounts',
    ],
  },
  {
    category: 'Device Security',
    icon: Server,
    color: 'teal',
    practices: [
      'Deploy EDR on all endpoints with real-time monitoring',
      'Implement device compliance checking before access',
      'Maintain up-to-date asset inventory',
      'Enforce disk encryption and secure boot',
      'Regular vulnerability scanning and patching',
      'Network access control (NAC) for device onboarding',
    ],
  },
  {
    category: 'Network Segmentation',
    icon: Shield,
    color: 'blue',
    practices: [
      'Implement microsegmentation for critical workloads',
      'Deploy identity-aware proxies and gateways',
      'Use software-defined perimeter (SDP) for remote access',
      'Block unnecessary outbound connections',
      'Monitor east-west traffic for anomalies',
      'Implement zero-trust network access (ZTNA)',
    ],
  },
  {
    category: 'Application Security',
    icon: Lock,
    color: 'indigo',
    practices: [
      'Implement runtime application self-protection (RASP)',
      'Use API gateways with authentication and rate limiting',
      'Deploy web application firewalls (WAF)',
      'Implement secure software development lifecycle (SSDLC)',
      'Regular penetration testing and code reviews',
      'Maintain software bill of materials (SBOM)',
    ],
  },
  {
    category: 'Data Protection',
    icon: Eye,
    color: 'purple',
    practices: [
      'Classify and label all sensitive data',
      'Encrypt data at rest and in transit',
      'Implement data loss prevention (DLP) controls',
      'Use rights management for sensitive documents',
      'Regular data access audits and monitoring',
      'Secure backup with offline/air-gapped copies',
    ],
  },
]

const commonMistakes = [
  {
    mistake: 'Treating Zero Trust as a product purchase',
    solution: 'Zero Trust is an architectural approach, not a single product. Focus on principles and integration.',
  },
  {
    mistake: 'Implementing only network-level controls',
    solution: 'Zero Trust requires identity, device, application, and data layer controls, not just network segmentation.',
  },
  {
    mistake: 'Neglecting legacy systems',
    solution: 'Develop compensating controls and migration strategies for systems that cannot support modern authentication.',
  },
  {
    mistake: 'Over-reliance on VPN replacement only',
    solution: 'ZTNA is one component; full Zero Trust requires comprehensive policy enforcement across all layers.',
  },
  {
    mistake: 'Ignoring user experience',
    solution: 'Design seamless authentication flows and provide clear guidance to minimize friction and shadow IT.',
  },
]

const resources = [
  {
    title: 'NIST SP 800-207',
    description: 'Zero Trust Architecture - The definitive framework document',
    link: 'https://csrc.nist.gov/publications/detail/sp/800-207/final',
  },
  {
    title: 'CISA Zero Trust Maturity Model',
    description: 'Federal guidance on Zero Trust implementation',
    link: 'https://www.cisa.gov/zero-trust-maturity-model',
  },
  {
    title: 'NIST Cybersecurity Framework',
    description: 'Broader security framework that complements ZTA',
    link: 'https://www.nist.gov/cyberframework',
  },
  {
    title: 'Executive Order 14028',
    description: 'Improving the Nation\'s Cybersecurity',
    link: 'https://www.govinfo.gov/content/pkg/CFR-2022-title3-vol1/pdf/CFR-2022-title3-vol1-eo14028.pdf',
  },
]

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  teal: { bg: 'bg-teal-500/10', border: 'border-teal-500/30', text: 'text-teal-400' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
  indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-400' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
}

export default function BestPractices() {
  return (
    <section id="best-practices" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-slate-900/30 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 mb-4">
            <Lightbulb className="w-4 h-4 text-green-400" />
            <span className="text-xs text-green-400 font-medium">Expert Guidance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Zero Trust <span className="text-gradient">Best Practices</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Practical recommendations for successful Zero Trust implementation based on industry 
            experience and lessons learned from real-world deployments.
          </p>
        </div>

        {/* Best Practices Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
          {bestPractices.map((category) => {
            const Icon = category.icon
            const colors = colorClasses[category.color]

            return (
              <div
                key={category.category}
                className={`glass-card rounded-2xl p-6 ${colors.border} hover:border-${category.color}-500/50 transition-colors`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <h3 className={`text-lg font-semibold ${colors.text}`}>{category.category}</h3>
                </div>
                
                <ul className="space-y-2">
                  {category.practices.map((practice, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0`} />
                      {practice}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Common Mistakes */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">
            Common <span className="text-rose-400">Pitfalls</span> to Avoid
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commonMistakes.map((item, idx) => (
              <div key={idx} className="glass-card rounded-xl p-5 border-rose-500/20">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">{item.mistake}</h4>
                    <p className="text-sm text-slate-400">{item.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="glass-card rounded-2xl p-8 border-cyan-500/20">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-cyan-400" />
            <h3 className="text-2xl font-semibold text-white">
              Additional <span className="text-gradient">Resources</span>
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource) => (
              <a
                key={resource.title}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-500/30 transition-colors"
              >
                <ExternalLink className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    {resource.title}
                  </h4>
                  <p className="text-sm text-slate-400">{resource.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="mt-16 text-center">
          <div className="inline-block glass-card rounded-2xl p-8 border-cyan-500/30 max-w-3xl">
            <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">
              Remember: Zero Trust is a Journey
            </h3>
            <p className="text-slate-400">
              Zero Trust is not a destination but a continuous process of improvement. Start with 
              high-value assets, implement incrementally, and use telemetry to continuously refine 
              your policies. The goal is to reduce risk while maintaining operational efficiency — 
              not to achieve perfect security overnight.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
