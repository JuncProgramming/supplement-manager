export const UNITS = {
  PILLS: 'pills',
  GRAMS: 'grams',
  ML: 'milliliters',
  SCOOPS: 'scoops'
} as const

export type UnitType = (typeof UNITS)[keyof typeof UNITS]

export const UNIT_LABELS: Record<UnitType, string> = {
  [UNITS.PILLS]: 'Tablets/Capsules',
  [UNITS.GRAMS]: 'Grams (g)',
  [UNITS.ML]: 'Milliliters (ml)',
  [UNITS.SCOOPS]: 'Scoops'
}

export type Supplement = {
  id?: number
  name: string
  brand?: string
  currentStock: number
  unit: UnitType
  dosagePerServing: number
}

export type IntakeLog = {
  id?: number
  supplementId: number
  date: Date
}
