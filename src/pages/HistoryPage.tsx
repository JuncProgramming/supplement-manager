import Spinner from '@/components/Spinner'
import {
  CalendarDays,
  SlidersHorizontal,
  ChevronDown,
  ScanSearch
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useIntakeHistory } from '@/hooks/useIntakeHistory'
import IntakeLogCard from '@/components/IntakeLogCard'
import { useState } from 'react'
import { TIME_OF_DAY_LABELS, TIMES_OF_DAY, type TimeOfDayType } from '@/types'
import { TIME_OF_DAY_ICONS } from '@/constants/timeOfDayIcons'

const HistoryPage = () => {
  const [selectedStatus, setSelectedStatus] = useState<
    'all' | 'taken' | 'missed'
  >('all')
  const [selectedTimesOfDay, setSelectedTimesOfDay] = useState<
    Set<TimeOfDayType>
  >(new Set(Object.values(TIMES_OF_DAY)))
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const history = useIntakeHistory()
  const filteredHistory = history
    ? history
        .map((daygroup) => ({
          date: daygroup.date,
          entries: daygroup.entries
            .filter((entry) => selectedTimesOfDay.has(entry.timeOfDay))
            .filter((entry) => {
              if (selectedStatus === 'taken') return entry.taken === true
              if (selectedStatus === 'missed') return entry.taken === false
              return true
            })
        }))
        .filter((daygroup) => daygroup.entries.length > 0)
    : undefined

  if (!history || !filteredHistory)
    return (
      <div className="mt-32 flex flex-col items-center justify-center gap-4">
        <Spinner></Spinner>
        <p className="animate-[fadeIn_0.3s_ease-in_0.2s_both] text-sm text-gray-500">
          Loading supplement history...
        </p>
      </div>
    )

  const toggleTimeFilter = (timeOfDay: TimeOfDayType) => {
    setSelectedTimesOfDay((prev) => {
      const newSet = new Set(prev)

      if (newSet.has(timeOfDay)) {
        newSet.delete(timeOfDay)
      } else {
        newSet.add(timeOfDay)
      }

      return newSet
    })
  }

  const totalLogged = filteredHistory.reduce(
    (sum, day) => sum + day.entries.filter((entry) => entry.taken).length,
    0
  )
  const totalScheduled = filteredHistory.reduce(
    (sum, day) => sum + day.entries.length,
    0
  )
  const completionRate =
    totalScheduled > 0 ? Math.round((totalLogged / totalScheduled) * 100) : 0

  let streak = 0
  for (const day of filteredHistory) {
    if (day.entries.length > 0 && day.entries.every((entry) => entry.taken)) {
      streak++
    } else {
      break
    }
  }

  return (
    <div className="mt-4 flex flex-col space-y-6 sm:mt-6 md:mt-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
          Intake History
        </h1>
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className={`flex cursor-pointer items-center gap-2 bg-gray-100 px-4 py-2 font-medium text-gray-800 transition-colors hover:bg-gray-200 focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 sm:w-auto ${
              isFilterOpen ? 'rounded-t-lg' : 'rounded-lg'
            }`}
          >
            <SlidersHorizontal size={16} />
            Filter
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {isFilterOpen && (
            <div className="absolute right-0 z-10 w-56 rounded-tl-lg rounded-b-lg bg-gray-100 p-3 shadow-lg">
              <div className="mb-3">
                <h3 className="mb-1 text-xs font-semibold text-gray-500 uppercase">
                  Status
                </h3>
                <label className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-sm font-semibold text-gray-700 hover:bg-gray-200">
                  <input
                    type="radio"
                    checked={selectedStatus === 'all'}
                    onChange={() => setSelectedStatus('all')}
                    name="status"
                    className="relative flex h-4 w-4 cursor-pointer appearance-none items-center justify-center rounded-full border-2 border-gray-300 bg-white transition-colors duration-200 after:absolute after:h-1.5 after:w-1.5 after:scale-0 after:rounded-full after:bg-white after:transition-transform after:duration-200 checked:border-blue-600 checked:bg-blue-600 checked:after:scale-100 focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                    defaultChecked
                  />
                  All supplements
                </label>
                <label className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-sm font-semibold text-gray-700 hover:bg-gray-200">
                  <input
                    type="radio"
                    checked={selectedStatus === 'taken'}
                    onChange={() => setSelectedStatus('taken')}
                    name="status"
                    className="relative flex h-4 w-4 cursor-pointer appearance-none items-center justify-center rounded-full border-2 border-gray-300 bg-white transition-colors duration-200 after:absolute after:h-1.5 after:w-1.5 after:scale-0 after:rounded-full after:bg-white after:transition-transform after:duration-200 checked:border-blue-600 checked:bg-blue-600 checked:after:scale-100 focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                  />
                  Only taken
                </label>
                <label className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-sm font-semibold text-gray-700 hover:bg-gray-200">
                  <input
                    type="radio"
                    checked={selectedStatus === 'missed'}
                    onChange={() => setSelectedStatus('missed')}
                    name="status"
                    className="relative flex h-4 w-4 cursor-pointer appearance-none items-center justify-center rounded-full border-2 border-gray-300 bg-white transition-colors duration-200 after:absolute after:h-1.5 after:w-1.5 after:scale-0 after:rounded-full after:bg-white after:transition-transform after:duration-200 checked:border-blue-600 checked:bg-blue-600 checked:after:scale-100 focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                  />
                  Only missed
                </label>
              </div>
              <div className="mb-3">
                <h3 className="mb-1 text-xs font-semibold text-gray-500 uppercase">
                  Time of day
                </h3>
                <div className="space-y-1">
                  {Object.values(TIMES_OF_DAY).map((time) => (
                    <label
                      key={time}
                      className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
                    >
                      <input
                        type="checkbox"
                        onChange={() => toggleTimeFilter(time)}
                        checked={selectedTimesOfDay.has(time)}
                        className={`h-4 w-4 cursor-pointer rounded border-2 transition-colors duration-200 focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                          selectedTimesOfDay.has(time)
                            ? 'border-blue-600 bg-blue-600 text-white'
                            : 'border-gray-300'
                        }`}
                      />
                      {TIME_OF_DAY_LABELS[time]}
                      {TIME_OF_DAY_ICONS[time]}
                    </label>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full cursor-pointer rounded-md bg-blue-600 p-1.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>

      {filteredHistory.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border-2 border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Supplements Logged</p>
            <p className="text-2xl font-bold text-gray-800">{totalLogged}</p>
            <p className="text-xs text-gray-400">
              tracked across {filteredHistory.length}{' '}
              {filteredHistory.length === 1 ? 'day' : 'days'}
            </p>
          </div>
          <div className="rounded-lg border-2 border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Completion Rate</p>
            <p className="text-2xl font-bold text-blue-800">
              {completionRate}%
            </p>
            <p className="text-xs text-gray-400">
              {totalLogged} out of {totalScheduled} scheduled doses
            </p>
          </div>
          <div className="rounded-lg border-2 border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Current Streak</p>
            <p
              className={`text-2xl font-bold ${streak > 0 ? 'text-green-600' : 'text-gray-600'}`}
            >
              {streak} {streak === 1 ? 'day' : 'days'}
            </p>
            <p className="text-xs text-gray-400">
              {streak > 0 ? 'keep it up!' : 'start a streak today'}
            </p>
          </div>
        </div>
      )}

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 px-4 py-16 text-center text-balance">
          <CalendarDays size={36} className="mb-4 text-blue-600" />
          <h2 className="mb-1 text-xl font-semibold text-gray-800">
            Your supplement history is empty
          </h2>
          <p className="text-sm text-gray-600">
            Head over to your{' '}
            <NavLink
              className="font-semibold text-blue-600 hover:underline"
              to="/dashboard"
            >
              dashboard
            </NavLink>{' '}
            to start tracking your supplement intake.
          </p>
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 px-4 py-16 text-center text-balance">
          <ScanSearch size={36} className="mb-4 text-blue-600" />
          <h2 className="mb-1 text-xl font-semibold text-gray-800">
            No supplements match your filters
          </h2>
          <p className="text-sm text-gray-600">
            Try adjusting your filters to see more results.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredHistory.map((day) => (
            <IntakeLogCard
              key={day.date}
              date={day.date}
              entries={day.entries}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default HistoryPage
