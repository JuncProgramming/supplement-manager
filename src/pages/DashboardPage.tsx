import { format } from 'date-fns/fp'
import { useEffect } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import db from '@/db/db'
import { Package } from 'lucide-react'
import Spinner from '@/components/Spinner'
import { NavLink } from 'react-router-dom'
import { addIntakeLog, deleteIntakeLog } from '@/db/api'
import type { Supplement, TimeOfDayType } from '@/types'
import { useIntakeLog } from '@/hooks/useIntakeLog'
import DailySchedule from '@/components/DailySchedule'

const DashboardPage = () => {
  const today = format('EEEE, d MMMM')(new Date())
  const dbDate = new Date().toISOString().split('T')[0]

  const todaysLogs = useIntakeLog(dbDate)
  const supplements = useLiveQuery(() => db.supplements.toArray())

  const checkedKeys = new Set(
    todaysLogs?.map((log) => `${log.supplementId}-${log.timeOfDay}`) ?? []
  )

  useEffect(() => {
    if (!supplements) return

    const createSnapshot = async () => {
      await db.dailySnapshots.put({
        date: dbDate,
        supplements: supplements.map((supplement) => ({
          supplementId: supplement.id!,
          name: supplement.name,
          brand: supplement.brand ?? '',
          dosagePerServing: supplement.dosagePerServing,
          unit: supplement.unit,
          timesOfDay: supplement.timesOfDay
        }))
      })
    }

    createSnapshot()
  }, [supplements, dbDate])

  const handleCheck = async (
    supplement: Supplement,
    timeOfDay: TimeOfDayType
  ) => {
    const key = `${supplement.id}-${timeOfDay}`
    const isCurrentlyChecked = checkedKeys.has(key)

    try {
      if (!isCurrentlyChecked) {
        await addIntakeLog({
          supplementId: supplement.id!,
          date: dbDate,
          amountTaken: supplement.dosagePerServing,
          unit: supplement.unit,
          timeOfDay: timeOfDay
        })
      } else {
        await deleteIntakeLog(supplement.id!, dbDate, timeOfDay)
      }
    } catch (error) {
      console.error('Failed to add or remove intake log:', error)
    }
  }

  if (!supplements)
    return (
      <div className="mt-32 flex flex-col items-center justify-center gap-4">
        <Spinner></Spinner>
        <p className="animate-[fadeIn_0.3s_ease-in_0.2s_both] text-sm text-gray-500">
          Loading supplement schedule...
        </p>
      </div>
    )

  const totalScheduled = supplements.reduce(
    (sum, supplement) => sum + supplement.timesOfDay.length,
    0
  )
  const progressPercent =
    totalScheduled > 0
      ? Math.round(((todaysLogs?.length ?? 0) / totalScheduled) * 100)
      : 0

  const remainingDoses = totalScheduled - (todaysLogs?.length ?? 0)

  return (
    <div className="mt-4 flex flex-col space-y-6 sm:mt-6 md:mt-8">
      <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">{today}</h1>

      {supplements.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border-2 border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Today's Progress</p>
            <p className="text-2xl font-bold text-blue-800">
              {progressPercent}%
            </p>
            <div className="mt-2 flex h-2.5 overflow-hidden rounded-full bg-blue-100">
              <div
                style={{ width: `${progressPercent}%` }}
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
              ></div>
            </div>
          </div>
          <div className="rounded-lg border-2 border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Remaining Today</p>
            <p className="text-2xl font-bold text-gray-800">{remainingDoses}</p>
            <p className="text-xs text-gray-400">doses left</p>
          </div>
          <div className="rounded-lg border-2 border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Current Stack</p>
            <p className="text-2xl font-bold text-gray-800">
              {supplements.length}
            </p>
            <p className="text-xs text-gray-400">supplements in your routine</p>
          </div>
        </div>
      )}
      {supplements.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 px-4 py-16 text-center text-balance">
          <Package size={36} className="mb-4 text-blue-600" />
          <h2 className="mb-1 text-xl font-semibold text-gray-800">
            Your supplement inventory is empty
          </h2>
          <p className="text-sm text-gray-600">
            Head over to your{' '}
            <NavLink
              className="font-semibold text-blue-600 hover:underline"
              to="/inventory"
            >
              inventory
            </NavLink>{' '}
            to add your first supplement.
          </p>
        </div>
      ) : (
        <DailySchedule
          supplements={supplements}
          checkedKeys={checkedKeys}
          onCheckboxToggle={(supplement, timeOfDay) =>
            handleCheck(supplement, timeOfDay)
          }
        />
      )}
    </div>
  )
}

export default DashboardPage
