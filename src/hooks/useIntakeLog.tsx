import { useLiveQuery } from 'dexie-react-hooks'
import db from '@/db/db'

export const useIntakeLog = (date: string) => {
  return useLiveQuery(
    () => db.intakeLogs.where('date').equals(date).toArray(),
    [date]
  )
}
