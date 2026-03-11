import type { HistoryEntry } from '@/types'
import { Check, X, CalendarDays } from 'lucide-react'
import { TIME_OF_DAY_LABELS } from '@/types'
import { TIME_OF_DAY_ICONS } from '@/constants/timeOfDayIcons'

const IntakeLogCard = ({
  date,
  entries
}: {
  date: string
  entries: HistoryEntry[]
}) => {
  const takenCount = entries.filter((log) => log.taken).length
  const total = entries.length
  const percent = total > 0 ? Math.round((takenCount / total) * 100) : 0

  return (
    <div className="overflow-hidden rounded-lg border-2 border-gray-200 bg-white shadow-md">
      <div className="flex flex-col gap-3 border-b border-gray-100 bg-gray-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <CalendarDays size={18} className="text-blue-600"></CalendarDays>
          <p className="text-lg font-medium text-gray-800">{date}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-start flex h-2 w-32 overflow-hidden rounded-full bg-blue-100 font-sans text-xs font-medium">
            <div
              data-testid="progress-bar"
              style={{ width: `${percent}%` }}
              className={`flex h-full items-center justify-center overflow-hidden rounded-full bg-blue-600 break-all text-white transition-all`}
            ></div>
          </div>
          <p className="text-sm font-medium text-gray-600">
            {takenCount}/{total}
          </p>
        </div>
      </div>
      <ul className="divide-y divide-gray-100">
        {entries.map((log) => (
          <li
            key={`${log.supplementId}-${log.timeOfDay}`}
            className="flex items-center gap-4 px-5 py-3"
          >
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                log.taken
                  ? 'bg-green-100 text-green-600'
                  : 'bg-red-50 text-red-400'
              }`}
            >
              {log.taken ? (
                <Check size={14} data-testid="icon-check" />
              ) : (
                <X size={14} data-testid="icon-close" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-gray-800">{log.name}</p>
              <p className="text-xs text-gray-400">
                {log.brand} · {log.amountTaken} {log.unit}
              </p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              {TIME_OF_DAY_LABELS[log.timeOfDay]}
              {TIME_OF_DAY_ICONS[log.timeOfDay]}
            </span>
          </li>
        ))}
      </ul>
      <div></div>
    </div>
  )
}

export default IntakeLogCard
