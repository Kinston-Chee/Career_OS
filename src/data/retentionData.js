// Department retention data for the employer Home "Talent Retention Tracker".
// Ported from the retention_pie prototype: headcount drives slice size, and
// retention drives the inner arc and the colour band.
export const RETENTION_DEPARTMENTS = [
  { id: 'eng',   name: 'Engineering',   headcount: 38, retention: 77.6, trend: -4.2, atRisk: 8, riskLevel: 'critical' },
  { id: 'prod',  name: 'Product',       headcount: 22, retention: 80.1, trend: -2.8, atRisk: 5, riskLevel: 'critical' },
  { id: 'ops',   name: 'Operations',    headcount: 18, retention: 83.3, trend: -1.5, atRisk: 4, riskLevel: 'high' },
  { id: 'sales', name: 'Sales',         headcount: 19, retention: 84.2, trend: 0.4,  atRisk: 3, riskLevel: 'high' },
  { id: 'mkt',   name: 'Marketing',     headcount: 15, retention: 89.5, trend: 1.2,  atRisk: 2, riskLevel: 'medium' },
  { id: 'fin',   name: 'Finance',       headcount: 10, retention: 92.0, trend: 0.8,  atRisk: 1, riskLevel: 'good' },
  { id: 'hr',    name: 'HR',            headcount: 6,  retention: 93.8, trend: 1.6,  atRisk: 1, riskLevel: 'good' },
  { id: 'ds',    name: 'Data & AI',     headcount: 12, retention: 95.2, trend: 2.1,  atRisk: 0, riskLevel: 'great' },
]

export const RISK_COLOR = {
  critical: { fill: '#EF4444', light: '#FCA5A5', label: 'Critical' },
  high:     { fill: '#F97316', light: '#FDBA74', label: 'High risk' },
  medium:   { fill: '#EAB308', light: '#FDE047', label: 'Medium' },
  good:     { fill: '#22C55E', light: '#4ADE80', label: 'Healthy' },
  great:    { fill: '#818CF8', light: '#A5B4FC', label: 'Excellent' },
}

export const RISK_BADGE = {
  critical: 'border-red-200 bg-red-50 text-red-600',
  high:     'border-orange-200 bg-orange-50 text-orange-600',
  medium:   'border-yellow-200 bg-yellow-50 text-yellow-700',
  good:     'border-emerald-200 bg-emerald-50 text-emerald-600',
  great:    'border-indigo-200 bg-indigo-50 text-indigo-600',
}

export const TOTAL_HEADCOUNT = RETENTION_DEPARTMENTS.reduce((sum, d) => sum + d.headcount, 0)

// Company retention = headcount-weighted average of the department rates, so
// the centre of the chart always agrees with the slices around it.
export const OVERALL_RETENTION =
  RETENTION_DEPARTMENTS.reduce((sum, d) => sum + d.retention * d.headcount, 0) / TOTAL_HEADCOUNT

export const TOTAL_AT_RISK = RETENTION_DEPARTMENTS.reduce((sum, d) => sum + d.atRisk, 0)
