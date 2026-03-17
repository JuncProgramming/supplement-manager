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
} as const

export type TimeOfDayType = (typeof TIMES_OF_DAY)[keyof typeof TIMES_OF_DAY]

export const TIME_OF_DAY_LABELS: Record<TimeOfDayType, string> = {
  [TIMES_OF_DAY.MORNING]: 'Morning',
  [TIMES_OF_DAY.AFTERNOON]: 'Afternoon',
  [TIMES_OF_DAY.EVENING]: 'Evening',
  [TIMES_OF_DAY.BEFORE_WORKOUT]: 'Before workout',
  [TIMES_OF_DAY.DURING_WORKOUT]: 'During workout',
  [TIMES_OF_DAY.AFTER_WORKOUT]: 'After workout'
}

export const FILTER_STATUS = {
  ALL: 'all',
  TAKEN: 'taken',
  MISSED: 'missed'
} as const

export type FilterStatusType =
  (typeof FILTER_STATUS)[keyof typeof FILTER_STATUS]

export const FILTER_STATUS_LABELS: Record<FilterStatusType, string> = {
  [FILTER_STATUS.ALL]: 'All supplements',
  [FILTER_STATUS.TAKEN]: 'Only taken',
  [FILTER_STATUS.MISSED]: 'Only missed'
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
  date: string
  amountTaken: number
  unit: UnitType
  timeOfDay: TimeOfDayType
}

export type DailySnapshot = {
  date: string
  supplements: {
    supplementId: number
    name: string
    brand?: string
    dosagePerServing: number
    unit: UnitType
    timesOfDay: TimeOfDayType[]
  }[]
}

export type HistoryEntry = {
  supplementId: number
  name: string
  brand?: string
  amountTaken: number
  unit: UnitType
  timeOfDay: TimeOfDayType
  taken: boolean
}

export type DayGroup = {
  date: string
  entries: HistoryEntry[]
}
