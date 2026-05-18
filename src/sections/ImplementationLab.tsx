import { type ReactNode, useEffect, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Cloud,
  DatabaseZap,
  HardDriveDownload,
  LoaderCircle,
  Lock,
  ShieldCheck,
} from 'lucide-react'
import {
  type AuditDecision,
  type AuditNetworkZone,
  type AuditRecord,
  type AuditResourceTier,
  type AuditSource,
  formatAuditTimestamp,
  loadAuditRecords,
  persistAuditRecord,
  readLocalAuditRecords,
} from '../lib/implementationLabAudit'

type ResourceTier = AuditResourceTier
type NetworkZone = AuditNetworkZone
type Decision = AuditDecision
type AuditEntry = AuditRecord

interface AccessRequest {
  identityAssurance: number
  devicePosture: number
  behaviorRisk: number
  resourceTier: ResourceTier
  networkZone: NetworkZone
  privilegedAccess: boolean
  mfaVerified: boolean
}

interface EvaluationResult {
  decision: Decision
  trustScore: number
  controls: string[]
  reasons: string[]
}

const defaultRequest: AccessRequest = {
  identityAssurance: 78,
  devicePosture: 72,
  behaviorRisk: 30,
  resourceTier: 'high',
  networkZone: 'vendor',
  privilegedAccess: true,
  mfaVerified: true,
}

function evaluateAccess(request: AccessRequest): EvaluationResult {
  const reasons: string[] = []
  const controls: string[] = ['Continuous telemetry collection', 'Session audit logging enabled']

  if (request.devicePosture < 40) {
    reasons.push('Endpoint posture is below the minimum compliance baseline of 40.')
    return { decision: 'deny', trustScore: 0, controls, reasons }
  }

  if (request.behaviorRisk > 85) {
    reasons.push('Behavior analytics detected a critical anomaly risk above 85.')
    return { decision: 'deny', trustScore: 0, controls, reasons }
  }

  if (!request.mfaVerified && (request.privilegedAccess || request.resourceTier === 'high' || request.resourceTier === 'critical')) {
    reasons.push('MFA is mandatory for privileged sessions and sensitive resource access.')
    return { decision: 'deny', trustScore: 0, controls, reasons }
  }

  const resourceWeight: Record<ResourceTier, number> = {
    low: 12,
    medium: 8,
    high: 4,
    critical: 0,
  }

  const zoneWeight: Record<NetworkZone, number> = {
    corp: 12,
    vendor: 7,
    internet: 0,
  }

  const trustScore = Math.round(
    request.identityAssurance * 0.35 +
      request.devicePosture * 0.3 +
      (100 - request.behaviorRisk) * 0.2 +
      resourceWeight[request.resourceTier] +
      zoneWeight[request.networkZone] +
      (request.mfaVerified ? 8 : 0) -
      (request.privilegedAccess ? 8 : 0),
  )

  if (request.networkZone === 'internet' && request.resourceTier === 'critical') {
    reasons.push('Critical resources cannot be directly accessed from internet zones.')
    controls.push('Require brokered access via a Zero Trust gateway')
    return { decision: 'deny', trustScore: Math.max(0, trustScore - 20), controls, reasons }
  }

  if (trustScore >= 80) {
    reasons.push('Risk and trust signals satisfy the policy threshold for this resource.')
    controls.push('Allow a least-privilege scoped token')
    controls.push('Force token expiry within 30 minutes')
    return { decision: 'allow', trustScore, controls, reasons }
  }

  if (trustScore >= 60) {
    reasons.push('Conditional access is approved with additional verification steps.')
    controls.push('Step-up authentication required')
    controls.push('Just-in-time privileged session limited to 15 minutes')
    controls.push('Real-time anomaly response policy attached')
    return { decision: 'step-up', trustScore, controls, reasons }
  }

  reasons.push('The combined trust score is below the minimum policy threshold of 60.')
  controls.push('Trigger the incident workflow for repeated failures')
  return { decision: 'deny', trustScore, controls, reasons }
}

function buildAuditRecord(request: AccessRequest, result: EvaluationResult): AuditEntry {
  return {
    id: globalThis.crypto?.randomUUID?.() ?? `audit-${Date.now()}`,
    createdAt: new Date().toISOString(),
    decision: result.decision,
    trustScore: result.trustScore,
    resourceTier: request.resourceTier,
    networkZone: request.networkZone,
    identityAssurance: request.identityAssurance,
    devicePosture: request.devicePosture,
    behaviorRisk: request.behaviorRisk,
    privilegedAccess: request.privilegedAccess,
    mfaVerified: request.mfaVerified,
  }
}

export default function ImplementationLab() {
  const [request, setRequest] = useState<AccessRequest>(defaultRequest)
  const [result, setResult] = useState<EvaluationResult | null>(null)
  const [auditLog, setAuditLog] = useState<AuditEntry[]>(() => readLocalAuditRecords())
  const [auditSource, setAuditSource] = useState<AuditSource>('local')
  const [isAuditSyncing, setIsAuditSyncing] = useState(false)

  useEffect(() => {
    let active = true

    setIsAuditSyncing(true)

    void loadAuditRecords()
      .then((response) => {
        if (!active) {
          return
        }

        setAuditLog(response.records)
        setAuditSource(response.source)
      })
      .finally(() => {
        if (active) {
          setIsAuditSyncing(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  const runEvaluation = async () => {
    const nextResult = evaluateAccess(request)
    const entry = buildAuditRecord(request, nextResult)

    setResult(nextResult)
    setAuditLog((current) => [entry, ...current].slice(0, 8))
    setIsAuditSyncing(true)

    const persisted = await persistAuditRecord(entry)

    setAuditLog(persisted.records)
    setAuditSource(persisted.source)
    setIsAuditSyncing(false)
  }

  const decisionStyles: Record<Decision, { badge: string; text: string; icon: ReactNode }> = {
    allow: {
      badge: 'bg-emerald-500/10 border-emerald-500/30',
      text: 'text-emerald-400',
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
    },
    'step-up': {
      badge: 'bg-amber-500/10 border-amber-500/30',
      text: 'text-amber-400',
      icon: <ShieldCheck className="h-5 w-5 text-amber-400" />,
    },
    deny: {
      badge: 'bg-rose-500/10 border-rose-500/30',
      text: 'text-rose-400',
      icon: <AlertTriangle className="h-5 w-5 text-rose-400" />,
    },
  }

  const auditSourceMeta = {
    supabase: {
      icon: <Cloud className="h-4 w-4 text-emerald-300" />,
      label: 'Supabase live',
      tone: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-100',
    },
    local: {
      icon: <HardDriveDownload className="h-4 w-4 text-amber-300" />,
      label: 'Local fallback',
      tone: 'border-amber-500/20 bg-amber-500/10 text-amber-100',
    },
  } as const

  return (
    <section id="implementation-lab" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-amber-500/5 to-background" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2">
            <Lock className="h-4 w-4 text-amber-300" />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber-200">Practical demonstration</span>
          </div>
          <h2 className="mb-4 text-3xl text-white sm:text-4xl lg:text-5xl">
            Zero Trust <span className="text-gradient">Implementation Lab</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-slate-400">
            Simulate a policy decision flow using identity, device posture, behavior risk, resource sensitivity, and network
            context. Each evaluation writes an audit event locally first, then syncs to Supabase when the project table is
            available.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          <div className="glass-card rounded-[30px] border-white/10 p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl text-white">Access Request Inputs</h3>
                <p className="mt-2 text-sm text-slate-400">Adjust the trust context and re-run the policy engine.</p>
              </div>
              <div className="hidden rounded-2xl border border-amber-500/20 bg-amber-500/10 p-3 text-amber-200 sm:block">
                <DatabaseZap className="h-5 w-5" />
              </div>
            </div>

            <div className="space-y-5">
              <label className="block">
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                  <span>Identity assurance</span>
                  <span className="font-mono text-amber-200">{request.identityAssurance}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={request.identityAssurance}
                  onChange={(event) => setRequest((prev) => ({ ...prev, identityAssurance: Number(event.target.value) }))}
                  className="w-full cursor-pointer accent-amber-500"
                />
              </label>

              <label className="block">
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                  <span>Device posture</span>
                  <span className="font-mono text-amber-200">{request.devicePosture}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={request.devicePosture}
                  onChange={(event) => setRequest((prev) => ({ ...prev, devicePosture: Number(event.target.value) }))}
                  className="w-full cursor-pointer accent-amber-500"
                />
              </label>

              <label className="block">
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                  <span>Behavior risk</span>
                  <span className="font-mono text-rose-300">{request.behaviorRisk}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={request.behaviorRisk}
                  onChange={(event) => setRequest((prev) => ({ ...prev, behaviorRisk: Number(event.target.value) }))}
                  className="w-full cursor-pointer accent-rose-500"
                />
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm text-slate-300">Resource tier</span>
                  <select
                    value={request.resourceTier}
                    onChange={(event) => setRequest((prev) => ({ ...prev, resourceTier: event.target.value as ResourceTier }))}
                    className="w-full cursor-pointer rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm text-slate-300">Network zone</span>
                  <select
                    value={request.networkZone}
                    onChange={(event) => setRequest((prev) => ({ ...prev, networkZone: event.target.value as NetworkZone }))}
                    className="w-full cursor-pointer rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
                  >
                    <option value="corp">Corporate</option>
                    <option value="vendor">Vendor</option>
                    <option value="internet">Internet</option>
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-3">
                  <span className="text-sm text-slate-300">Privileged access request</span>
                  <input
                    type="checkbox"
                    checked={request.privilegedAccess}
                    onChange={(event) => setRequest((prev) => ({ ...prev, privilegedAccess: event.target.checked }))}
                    className="h-4 w-4 cursor-pointer accent-amber-500"
                  />
                </label>

                <label className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-3">
                  <span className="text-sm text-slate-300">MFA verified</span>
                  <input
                    type="checkbox"
                    checked={request.mfaVerified}
                    onChange={(event) => setRequest((prev) => ({ ...prev, mfaVerified: event.target.checked }))}
                    className="h-4 w-4 cursor-pointer accent-amber-500"
                  />
                </label>
              </div>

              <button
                onClick={() => {
                  void runEvaluation()
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/15 px-6 py-3 font-medium text-amber-100 hover:-translate-y-0.5 hover:bg-amber-500/25"
              >
                {isAuditSyncing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Activity className="h-4 w-4" />}
                Evaluate and record event
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card rounded-[30px] border-white/10 p-6">
              <h3 className="mb-4 text-2xl text-white">Policy Engine Decision</h3>

              {!result && (
                <p className="text-sm text-slate-400">
                  Run an evaluation to generate a decision, trust score, and the controls attached to the session.
                </p>
              )}

              {result && (
                <div className="space-y-4">
                  <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 ${decisionStyles[result.decision].badge}`}>
                    {decisionStyles[result.decision].icon}
                    <span className={`text-sm font-semibold uppercase ${decisionStyles[result.decision].text}`}>
                      {result.decision.replace('-', ' ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-amber-300" />
                    <span className="text-sm text-slate-300">Trust score:</span>
                    <span className="font-semibold text-amber-200">{result.trustScore}</span>
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-white">Why this decision</h4>
                    <ul className="space-y-1">
                      {result.reasons.map((reason) => (
                        <li key={reason} className="text-sm text-slate-300">
                          - {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-white">Enforcement controls</h4>
                    <ul className="space-y-1">
                      {result.controls.map((control) => (
                        <li key={control} className="text-sm text-slate-300">
                          - {control}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="glass-card rounded-[30px] border-white/10 p-6">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-2xl text-white">Audit Trail</h3>
                </div>

                <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${auditSourceMeta[auditSource].tone}`}>
                  {isAuditSyncing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : auditSourceMeta[auditSource].icon}
                  <span>{isAuditSyncing ? 'Syncing' : auditSourceMeta[auditSource].label}</span>
                </div>
              </div>

              {auditLog.length === 0 && <p className="text-sm text-slate-400">No events yet.</p>}

              {auditLog.length > 0 && (
                <div className="space-y-3">
                  {auditLog.map((entry) => (
                    <div key={entry.id} className="rounded-[22px] border border-white/10 bg-slate-900/60 px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-400">{formatAuditTimestamp(entry.createdAt)}</span>
                        <span className={`text-xs font-semibold uppercase ${decisionStyles[entry.decision].text}`}>{entry.decision.replace('-', ' ')}</span>
                      </div>
                      <div className="mt-2 text-sm text-slate-300">
                        Score {entry.trustScore} | {entry.resourceTier} resource | {entry.networkZone} zone
                      </div>
                      <div className="mt-2 text-xs text-slate-500">
                        Identity {entry.identityAssurance} / Device {entry.devicePosture} / Risk {entry.behaviorRisk}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
