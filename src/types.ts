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

export const TIMES_OF_DAY = {
  MORNING: 'morning',
  AFTERNOON: 'afternoon',
  EVENING: 'evening',
  BEFORE_WORKOUT: 'before_workout',
  DURING_WORKOUT: 'during_workout',
  AFTER_WORKOUT: 'after_workout'
}

export type TimeOfDayType = (typeof TIMES_OF_DAY)[keyof typeof TIMES_OF_DAY]

export const TIME_OF_DAY_LABELS: Record<TimeOfDayType, string> = {
  [TIMES_OF_DAY.MORNING]: 'Morning',
  [TIMES_OF_DAY.AFTERNOON]: 'Afternoon',
  [TIMES_OF_DAY.EVENING]: 'Evening',
  [TIMES_OF_DAY.BEFORE_WORKOUT]: 'Before workout',
  [TIMES_OF_DAY.DURING_WORKOUT]: 'During workout',
  [TIMES_OF_DAY.AFTER_WORKOUT]: 'After workout'
}

export type Supplement = {
  id?: number
  name: string
  brand?: string
  currentStock: number
  unit: UnitType
  dosagePerServing: number
  timesOfDay: TimeOfDayType[]
}

export type IntakeLog = {
  id?: number
  supplementId: number
  date: Date
  amountTaken: number
  unit: UnitType
}
