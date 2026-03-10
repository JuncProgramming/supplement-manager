import { useLiveQuery } from 'dexie-react-hooks'
import db from '@/db/db'
import type { DayGroup, HistoryEntry } from '@/types'

export const useIntakeHistory = (): DayGroup[] | undefined => {
  return useLiveQuery(async () => {
    const [snapshots, logs] = await Promise.all([
      db.dailySnapshots.orderBy('date').reverse().toArray(),
      db.intakeLogs.toArray()
    ])

    const logsMap = new Map()
    for (const log of logs) {
      logsMap.set(`${log.date}|${log.supplementId}|${log.timeOfDay}`, log)
    }

    return snapshots.map((snapshot) => {
      const entries: HistoryEntry[] = []

      for (const supplement of snapshot.supplements) {
        for (const timeOfDay of supplement.timesOfDay) {
          const existingLog = logsMap.get(
            `${snapshot.date}|${supplement.supplementId}|${timeOfDay}`
          )

          entries.push({
            supplementId: supplement.supplementId,
            name: supplement.name,
            brand: supplement.brand,
            amountTaken:
              existingLog?.amountTaken ?? supplement.dosagePerServing,
            unit: existingLog?.unit ?? supplement.unit,
            timeOfDay,
            taken: !!existingLog
          })
        }
      }

      return { date: snapshot.date, logs: entries }
    })
  })
}
