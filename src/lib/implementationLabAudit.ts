const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL?.trim() || 'https://vxtswbochhlrpvsdhrlf.supabase.co'

const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() ||
  'sb_publishable_wWb_YCNntF9IFiiHx1D1uw_-D6D5nuF'

const AUDIT_STORAGE_KEY = 'implementation-lab-audit-trails-v2'
const AUDIT_TABLE = 'implementation_lab_audit_trails'
const MAX_AUDIT_ITEMS = 8

export type AuditDecision = 'allow' | 'step-up' | 'deny'
export type AuditResourceTier = 'low' | 'medium' | 'high' | 'critical'
export type AuditNetworkZone = 'corp' | 'vendor' | 'internet'
export type AuditSource = 'supabase' | 'local'

export interface AuditRecord {
  id: string
  createdAt: string
  decision: AuditDecision
  trustScore: number
  resourceTier: AuditResourceTier
  networkZone: AuditNetworkZone
  identityAssurance: number
  devicePosture: number
  behaviorRisk: number
  privilegedAccess: boolean
  mfaVerified: boolean
}

export interface AuditLoadResult {
  records: AuditRecord[]
  source: AuditSource
  message: string | null
}

interface AuditRow {
  client_event_id: string
  created_at: string
  decision: AuditDecision
  trust_score: number
  resource_tier: AuditResourceTier
  network_zone: AuditNetworkZone
  identity_assurance: number
  device_posture: number
  behavior_risk: number
  privileged_access: boolean
  mfa_verified: boolean
}

function isBrowser() {
  return typeof window !== 'undefined'
}

function hasSupabaseConfig() {
  return Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY)
}

function sortAuditRecords(records: AuditRecord[]) {
  return [...records]
    .sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt))
    .slice(0, MAX_AUDIT_ITEMS)
}

function mergeAuditRecords(primary: AuditRecord[], secondary: AuditRecord[]) {
  const unique = new Map<string, AuditRecord>()

  for (const record of [...primary, ...secondary]) {
    unique.set(record.id, record)
  }

  return sortAuditRecords([...unique.values()])
}

function mapRowToRecord(row: AuditRow): AuditRecord {
  return {
    id: row.client_event_id,
    createdAt: row.created_at,
    decision: row.decision,
    trustScore: row.trust_score,
    resourceTier: row.resource_tier,
    networkZone: row.network_zone,
    identityAssurance: row.identity_assurance,
    devicePosture: row.device_posture,
    behaviorRisk: row.behavior_risk,
    privilegedAccess: row.privileged_access,
    mfaVerified: row.mfa_verified,
  }
}

function mapRecordToRow(record: AuditRecord) {
  return {
    client_event_id: record.id,
    created_at: record.createdAt,
    decision: record.decision,
    trust_score: record.trustScore,
    resource_tier: record.resourceTier,
    network_zone: record.networkZone,
    identity_assurance: record.identityAssurance,
    device_posture: record.devicePosture,
    behavior_risk: record.behaviorRisk,
    privileged_access: record.privilegedAccess,
    mfa_verified: record.mfaVerified,
    source: 'implementation_lab',
    user_agent: isBrowser() ? window.navigator.userAgent : 'unknown',
  }
}

export function formatAuditTimestamp(value: string) {
  return new Date(value).toLocaleString()
}

export function readLocalAuditRecords() {
  if (!isBrowser()) {
    return [] as AuditRecord[]
  }

  try {
    const stored = window.localStorage.getItem(AUDIT_STORAGE_KEY)

    if (!stored) {
      return [] as AuditRecord[]
    }

    const parsed = JSON.parse(stored) as AuditRecord[]

    if (!Array.isArray(parsed)) {
      return [] as AuditRecord[]
    }

    return sortAuditRecords(
      parsed.filter((entry) => typeof entry?.id === 'string' && typeof entry?.createdAt === 'string'),
    )
  } catch {
    return [] as AuditRecord[]
  }
}

function writeLocalAuditRecords(records: AuditRecord[]) {
  if (!isBrowser()) {
    return
  }

  window.localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(sortAuditRecords(records)))
}

async function requestAuditRows(path: string, init?: RequestInit) {
  const headers = new Headers(init?.headers)
  headers.set('apikey', SUPABASE_PUBLISHABLE_KEY)
  headers.set('Authorization', `Bearer ${SUPABASE_PUBLISHABLE_KEY}`)
  headers.set('Content-Type', 'application/json')

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers,
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(body || `Supabase request failed with status ${response.status}.`)
  }

  return response
}

export async function loadAuditRecords(): Promise<AuditLoadResult> {
  const localRecords = readLocalAuditRecords()

  if (!hasSupabaseConfig()) {
    return {
      records: localRecords,
      source: 'local',
      message: 'Supabase credentials are missing, so audit events are staying in local session storage.',
    }
  }

  try {
    const response = await requestAuditRows(
      `${AUDIT_TABLE}?select=client_event_id,created_at,decision,trust_score,resource_tier,network_zone,identity_assurance,device_posture,behavior_risk,privileged_access,mfa_verified&order=created_at.desc&limit=${MAX_AUDIT_ITEMS}`,
    )

    const rows = (await response.json()) as AuditRow[]
    const remoteRecords = sortAuditRecords(rows.map(mapRowToRecord))
    const records = mergeAuditRecords(remoteRecords, localRecords)
    writeLocalAuditRecords(records)

    return {
      records,
      source: 'supabase',
      message: null,
    }
  } catch {
    return {
      records: localRecords,
      source: 'local',
      message:
        'Supabase audit sync is not reachable yet. Recent evaluations are still preserved in this browser session.',
    }
  }
}

export async function persistAuditRecord(record: AuditRecord): Promise<AuditLoadResult> {
  const localRecords = mergeAuditRecords([record], readLocalAuditRecords())
  writeLocalAuditRecords(localRecords)

  if (!hasSupabaseConfig()) {
    return {
      records: localRecords,
      source: 'local',
      message: 'Supabase credentials are missing, so audit events are staying in local session storage.',
    }
  }

  try {
    const response = await requestAuditRows(`${AUDIT_TABLE}`, {
      method: 'POST',
      headers: {
        Prefer: 'return=representation',
      },
      body: JSON.stringify(mapRecordToRow(record)),
    })

    const rows = (await response.json()) as AuditRow[]
    const savedRecord = rows[0] ? mapRowToRecord(rows[0]) : record
    const mergedRecords = mergeAuditRecords([savedRecord], localRecords)
    writeLocalAuditRecords(mergedRecords)

    return {
      records: mergedRecords,
      source: 'supabase',
      message: null,
    }
  } catch {
    return {
      records: localRecords,
      source: 'local',
      message:
        'The UI evaluation completed, but the Supabase insert could not be confirmed. The event remains available locally.',
    }
  }
}
