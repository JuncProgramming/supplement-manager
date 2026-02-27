import { format } from 'date-fns/fp'
import { useState, useEffect } from 'react'
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
  const [checkedBoxes, setCheckedBoxes] = useState<Record<string, boolean>>({})

  const today = format('EEEE, d MMMM')(new Date())
  const dbDate = new Date().toISOString().split('T')[0]

  const todaysLogs = useIntakeLog(dbDate)

  useEffect(() => {
    if (todaysLogs) {
      const newCheckedState: Record<string, boolean> = {}

      todaysLogs.forEach((log) => {
        const key = `${log.supplementId}-${log.timeOfDay}`
        newCheckedState[key] = true
      })

      setCheckedBoxes(newCheckedState)
    }
  }, [todaysLogs])

  const supplements = useLiveQuery(() => db.supplements.toArray())

  const handleCheck = async (
    supplement: Supplement,
    timeOfDay: TimeOfDayType
  ) => {
    const key = `${supplement.id}-${timeOfDay}`

    const isCurrentlyChecked = checkedBoxes[key] ?? false

    setCheckedBoxes((prev) => ({ ...prev, [key]: !isCurrentlyChecked }))

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
      setCheckedBoxes((prev) => ({ ...prev, [key]: isCurrentlyChecked }))
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

  const validKeys = new Set(
    supplements.flatMap((supplement) =>
      supplement.timesOfDay.map((timeOfDay) => `${supplement.id}-${timeOfDay}`)
    )
  )

  const totalChecked = Object.entries(checkedBoxes).filter(
    // destructure the key and checked from the created array from the object.
    ([key, checked]) => checked && validKeys.has(key)
  ).length
  const progress = totalScheduled > 0 ? totalChecked / totalScheduled : 0

  return (
    <div className="mt-4 flex flex-col space-y-6 sm:mt-6 md:mt-8">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-blue-800 sm:text-3xl">
          {today}
        </h1>
        <div className="w-full">
          <p className="mb-2 text-lg font-semibold text-gray-800">
            Today's progress:
          </p>
          <div className="flex-start flex h-4 w-full overflow-hidden rounded-full bg-blue-100 font-sans text-xs font-medium">
            <div
              style={{ width: `${progress * 100}%` }}
              className={`flex h-full items-center justify-center overflow-hidden rounded-full bg-blue-800 break-all text-white transition-all`}
            ></div>
          </div>
        </div>
      </div>
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
          checkedBoxes={checkedBoxes}
          onCheckboxToggle={(supplement, timeOfDay) =>
            handleCheck(supplement, timeOfDay)
          }
        />
      )}
    </div>
  )
}

export default DashboardPage
