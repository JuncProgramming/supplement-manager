import { Dexie, type EntityTable } from 'dexie'
import type { Supplement, IntakeLog } from '@/types'

const db = new Dexie('supplementDatabase') as Dexie & {
  supplements: EntityTable<Supplement, 'id'>
  intakeLogs: EntityTable<IntakeLog, 'id'>
}

db.version(1).stores({
  supplements: '++id, name, brand, stock',
  intakeLogs: '++id, supplementId, date, [supplementId+date]'
})

export default db
