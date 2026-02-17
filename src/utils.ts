import { UNITS, type UnitType } from '@/types'

export const formatUnits = (amount: number, unit: UnitType): string => {
  if (unit === UNITS.GRAMS) return 'g'
  if (unit === UNITS.ML) return 'ml'

  if (unit === UNITS.PILLS) {
    return amount === 1 ? 'pill' : 'pills'
  }

  if (unit === UNITS.SCOOPS) {
    return amount === 1 ? 'scoop' : 'scoops'
  }

  return unit
}

export const formatServing = (amount: number): string => {
  if (amount) {
    return amount === 1 ? 'serving' : 'servings'
  }

  return 'servings'
}
