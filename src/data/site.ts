import {
  AlertTriangle,
  Blocks,
  BookOpen,
  FileCheck,
  Fingerprint,
  FlaskConical,
  Globe,
  LayoutDashboard,
  Network,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

const gmailComposeUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=chidubema28@gmail.com'

export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
}

export interface OverviewCard {
  title: string
  description: string
  href: string
  icon: LucideIcon
  eyebrow: string
}

export interface CaseStudyLesson {
  title: string
  description: string
}

export interface CaseStudySource {
  label: string
  href: string
}

export interface CaseStudy {
  slug: string
  title: string
  date: string
  summary: string
  detailHref: string
  paperHref: string
  paperLabel: string
  color: 'rose' | 'orange' | 'yellow'
  icon: LucideIcon
  impact: {
    organizations: string
    agencies: string
    cost: string
    detection: string
  }
  attackVector: string[]
  ztaLessons: CaseStudyLesson[]
  references: CaseStudySource[]
}

export const primaryNavLinks: NavLink[] = [
  { label: 'Home', href: './index.html' },
  { label: 'Principles', href: './principles.html' },
  { label: 'Architecture', href: './architecture.html' },
  { label: 'Pillars', href: './pillars.html' },
  { label: 'Supply Chain', href: './supply-chain.html' },
  { label: 'Framework', href: './framework.html' },
  { label: 'Lab', href: './implementation-lab.html' },
  { label: 'Case Studies', href: './case-studies.html' },
  { label: 'Best Practices', href: './best-practices.html' },
  { label: 'Resources', href: './resources.html' },
]

export const footerResources = [
  { label: 'NIST SP 800-207', href: 'https://csrc.nist.gov/publications/detail/sp/800-207/final' },
  { label: 'CISA ZTMM', href: 'https://www.cisa.gov/zero-trust-maturity-model' },
  { label: 'NIST CSF', href: 'https://www.nist.gov/cyberframework' },
  {
    label: 'EO 14028 (PDF)',
    href: 'https://www.govinfo.gov/content/pkg/CFR-2022-title3-vol1/pdf/CFR-2022-title3-vol1-eo14028.pdf',
  },
]

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/JLearning5/Agent_Zero-Trust-Digital-Supply-Chain' },
  { label: 'X', href: 'https://x.com/Austico7' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/augustine-chidubem-b0457837a?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  },
  { label: 'Gmail', href: gmailComposeUrl },
]

export const overviewCards: OverviewCard[] = [
  {
    title: 'Seven Core Tenets',
    description: 'Review the NIST SP 800-207 principles that anchor the entire architecture.',
    href: './principles.html',
    icon: Fingerprint,
    eyebrow: 'Foundations',
  },
  {
    title: 'Architecture Components',
    description: 'See how the policy engine, administrator, and enforcement point coordinate.',
    href: './architecture.html',
    icon: Blocks,
    eyebrow: 'System Design',
  },
  {
    title: 'Five Pillars',
    description: 'Understand how identity, device, network, workload, and data maturity connect.',
    href: './pillars.html',
    icon: LayoutDashboard,
    eyebrow: 'Maturity Model',
  },
  {
    title: 'Supply Chain Threats',
    description: 'Map today’s vendor, CI/CD, and dependency risks to concrete Zero Trust responses.',
    href: './supply-chain.html',
    icon: Globe,
    eyebrow: 'Threat Lens',
  },
  {
    title: 'Implementation Framework',
    description: 'Follow the phased roadmap from discovery through iterative scale-out.',
    href: './framework.html',
    icon: ShieldCheck,
    eyebrow: 'Roadmap',
  },
  {
    title: 'Implementation Lab',
    description: 'Test a policy decision flow with interactive trust, posture, and risk inputs.',
    href: './implementation-lab.html',
    icon: FlaskConical,
    eyebrow: 'Interactive',
  },
  {
    title: 'Case Studies',
    description: 'Compare SolarWinds, Kaseya, and Codecov through Zero Trust lessons and evidence.',
    href: './case-studies.html',
    icon: AlertTriangle,
    eyebrow: 'Evidence',
  },
  {
    title: 'Best Practices',
    description: 'Use practical guidance to avoid common Zero Trust rollout failures.',
    href: './best-practices.html',
    icon: FileCheck,
    eyebrow: 'Execution',
  },
  {
    title: 'Resource Hub',
    description: 'Open the live deployment, project links, official references, and contact channels.',
    href: './resources.html',
    icon: BookOpen,
    eyebrow: 'Reference',
  },
]

export const caseStudies: CaseStudy[] = [
  {
    slug: 'solarwinds',
    title: 'SolarWinds Supply Chain Attack',
    date: 'December 2020',
    summary:
      "Threat actors compromised SolarWinds' Orion build environment, inserted the SUNBURST backdoor, and distributed it through trusted software updates to thousands of customers.",
    detailHref: './solarwinds.html',
    paperHref: './papers/solarwinds-archive-brief.pdf',
    paperLabel: 'Archived PDF brief',
    color: 'rose',
    icon: Network,
    impact: {
      organizations: '18,000+',
      agencies: '9 federal agencies',
      cost: '$40M+',
      detection: 'Roughly 9 months',
    },
    attackVector: [
      'Compromised the Orion build pipeline and inserted malicious code before release.',
      'Signed and distributed poisoned updates through legitimate vendor channels.',
      'Blended post-compromise activity into normal Orion telemetry flows.',
      'Used follow-on access and privilege abuse to expand across downstream victims.',
    ],
    ztaLessons: [
      {
        title: 'Assume breach across trusted vendors',
        description: 'Vendor reputation cannot replace verification of behavior, process integrity, and least-privilege exposure.',
      },
      {
        title: 'Microsegment management infrastructure',
        description: 'Monitoring tools should not have broad lateral reach or routine outbound access to the internet.',
      },
      {
        title: 'Continuously validate service behavior',
        description: 'Identity-aware analytics should flag trusted software when it touches systems or data outside its expected scope.',
      },
    ],
    references: [
      {
        label: 'FERC white paper on SolarWinds and related compromise',
        href: 'https://www.ferc.gov/sites/default/files/2021-07/SolarWinds%20and%20RelatedSupply%20Chain%20Compromise%20White%20Paper_1.pdf',
      },
      {
        label: 'DFS summary of the SolarWinds attack',
        href: 'https://www.dfs.ny.gov/reports_and_publications/press_releases/pr202104271',
      },
    ],
  },
  {
    slug: 'kaseya',
    title: 'Kaseya VSA Ransomware Attack',
    date: 'July 2021',
    summary:
      'REvil exploited a zero-day in Kaseya VSA and pushed ransomware through managed service provider channels, amplifying the blast radius across downstream organizations.',
    detailHref: './kaseya.html',
    paperHref: './papers/kaseya-archive-brief.pdf',
    paperLabel: 'Archived PDF brief',
    color: 'orange',
    icon: ShieldCheck,
    impact: {
      organizations: '1,500+',
      agencies: 'MSP customers',
      cost: '$70M ransom demand',
      detection: 'Immediate outbreak',
    },
    attackVector: [
      'Exploited Kaseya VSA vulnerabilities affecting on-premise management servers.',
      'Leveraged MSP trust relationships to reach many customer environments at once.',
      'Delivered ransomware through the same administrative tooling defenders relied on.',
      'Targeted backup and recovery paths to increase operational pressure on victims.',
    ],
    ztaLessons: [
      {
        title: 'Constrain vendor and MSP privilege',
        description: 'Remote management platforms should operate with time-bound, just-in-time access and full session observability.',
      },
      {
        title: 'Isolate administration planes',
        description: 'Management networks and update infrastructure must be segmented from business-critical production zones.',
      },
      {
        title: 'Treat updates as policy events',
        description: 'Critical software changes should trigger extra verification rather than inheriting automatic trust.',
      },
    ],
    references: [
      {
        label: 'FortiGuard outbreak alert PDF',
        href: 'https://filestore.fortinet.com/fortiguard/outbreak_alert/kaseya_vsa_attack/report.pdf',
      },
      {
        label: 'Kaseya helpdesk guidance hub',
        href: 'https://helpdesk.kaseya.com/hc/en-gb/articles/4403440681361-Kaseya-VSA-SaaS-On-Premises-Security-Incident-Overview',
      },
    ],
  },
  {
    slug: 'codecov',
    title: 'Codecov Bash Uploader Breach',
    date: 'April 2021',
    summary:
      "Attackers altered Codecov's Bash Uploader script and silently exfiltrated environment variables and secrets from CI environments that trusted the tooling.",
    detailHref: './codecov.html',
    paperHref: './papers/codecov-archive-brief.pdf',
    paperLabel: 'Archived PDF brief',
    color: 'yellow',
    icon: AlertTriangle,
    impact: {
      organizations: '29,000+',
      agencies: 'Global CI users',
      cost: 'Undisclosed',
      detection: 'More than 2 months',
    },
    attackVector: [
      'Modified the Bash Uploader script used in CI pipelines across many customer environments.',
      'Captured secrets, tokens, and environment variables during otherwise legitimate build activity.',
      'Impacted adjacent integrations that embedded the uploader in GitHub Actions, orbs, and steps.',
      'Demonstrated how third-party build tooling can bypass perimeter assumptions entirely.',
    ],
    ztaLessons: [
      {
        title: 'Verify tool integrity in CI/CD',
        description: 'Build and deployment tooling needs checksum validation, provenance checks, and constrained trust paths.',
      },
      {
        title: 'Minimize secret exposure',
        description: 'Ephemeral credentials and tight scoping reduce the value of leaked CI environment variables.',
      },
      {
        title: 'Instrument developer workflows',
        description: 'Zero Trust controls must extend into build systems, automation runners, and software factories.',
      },
    ],
    references: [
      {
        label: 'Codecov incident disclosure',
        href: 'https://about.codecov.io/security-update/',
      },
      {
        label: 'Unit 42 threat brief',
        href: 'https://unit42.paloaltonetworks.com/codecov-bash-uploader/',
      },
    ],
  },
]
