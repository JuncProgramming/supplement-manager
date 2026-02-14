import type { Supplement } from '@/types'
import db from './db'

export const addSupplement = async (supplement: Supplement) => {
  try {
    const id = await db.supplements.add(supplement)
    return id
  } catch (error) {
    console.error('Failed to add supplement:', error)
    throw error
  }
}

export const deleteSupplement = async (supplementId?: number) => {
  if (!supplementId) return

  try {
    await db.supplements.delete(supplementId)
  } catch (error) {
    console.error('Failed to delete supplement:', error)
    throw error
  }
}

export const updateSupplement = async (supplementId: number, data: object) => {
  try {
    await db.supplements.update(supplementId, data)
  } catch (error) {
    console.error('Failed to update supplement:', error)
    throw error
  }
}
