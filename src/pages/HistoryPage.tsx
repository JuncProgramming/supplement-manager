import Spinner from '@/components/Spinner'
import { CalendarDays, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useIntakeHistory } from '@/hooks/useIntakeHistory'
import IntakeLogCard from '@/components/IntakeLogCard'

const HistoryPage = () => {
  const history = useIntakeHistory()

  if (!history)
    return (
      <div className="mt-32 flex flex-col items-center justify-center gap-4">
        <Spinner></Spinner>
        <p className="animate-[fadeIn_0.3s_ease-in_0.2s_both] text-sm text-gray-500">
          Loading supplement history...
        </p>
      </div>
    )

  const totalLogged = history.reduce(
    (sum, day) => sum + day.entries.filter((entry) => entry.taken).length,
    0
  )
  const totalScheduled = history.reduce(
    (sum, day) => sum + day.entries.length,
    0
  )
  const completionRate =
    totalScheduled > 0 ? Math.round((totalLogged / totalScheduled) * 100) : 0

  let streak = 0
  for (const day of history) {
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
        <button className="flex cursor-pointer items-center gap-2 rounded-lg border-gray-800 bg-gray-100 px-4 py-2 font-medium text-gray-800 transition-colors hover:bg-gray-200 sm:w-auto">
          <SlidersHorizontal size={16} />
          Filter
          <ChevronDown size={16}></ChevronDown>
        </button>
      </div>

      {history.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border-2 border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Supplements Logged</p>
            <p className="text-2xl font-bold text-gray-800">{totalLogged}</p>
            <p className="text-xs text-gray-400">
              tracked across {history.length}{' '}
              {history.length === 1 ? 'day' : 'days'}
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
      ) : (
        <div className="space-y-6">
          {history.map((day) => (
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
