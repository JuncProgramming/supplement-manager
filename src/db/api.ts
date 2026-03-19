import type { IntakeLog, Supplement, TimeOfDayType } from '@/types'
import db from '@/db/db'

export const addSupplement = async (supplement: Supplement) => {
  try {
    const id = await db.supplements.add(supplement)
    return id
  } catch (error) {
    console.error('Failed to add supplement:', error)
    throw error
  }
}

export const deleteSupplement = async (
  supplementId?: number,
  dateToDeleteLogsFor?: string
) => {
  if (!supplementId) return

  try {
    await db.transaction(
      'rw',
      db.supplements,
      db.intakeLogs,
      db.dailySnapshots,
      async () => {
        await db.supplements.delete(supplementId)

        if (dateToDeleteLogsFor) {
          await db.intakeLogs
            .where('supplementId')
            .equals(supplementId)
            .and((log) => log.date === dateToDeleteLogsFor)
            .delete()

          const todaySnapshot = await db.dailySnapshots.get(dateToDeleteLogsFor)
          if (todaySnapshot) {
            await db.dailySnapshots.put({
              ...todaySnapshot,
              supplements: todaySnapshot.supplements.filter(
                (supplement) => supplement.supplementId !== supplementId
              )
            })
          }
        }
      }
    )
  } catch (error) {
    console.error('Failed to delete supplement:', error)
    throw error
  }
}

export const updateSupplement = async (
  supplementId: number,
  supplementData: Partial<Supplement>
) => {
  try {
    await db.supplements.update(supplementId, supplementData)
  } catch (error) {
    console.error('Failed to update supplement:', error)
    throw error
  }
}

// using Omit, because TS with Dexie complain about Partial
export const addIntakeLog = async (supplementInfo: Omit<IntakeLog, 'id'>) => {
  try {
    await db.intakeLogs.add(supplementInfo)
  } catch (error) {
    console.error('Failed to add intake log:', error)
    throw error
  }
}

export const deleteIntakeLog = async (
  supplementId: number,
  date: string,
  timeOfDay: TimeOfDayType
) => {
  try {
    await db.intakeLogs
      .where('[supplementId+date+timeOfDay]')
      .equals([supplementId, date, timeOfDay])
      .delete()
  } catch (error) {
    console.error('Failed to delete intake log:', error)
    throw error
  }
}
