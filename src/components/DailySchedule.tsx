import { TIMES_OF_DAY, TIME_OF_DAY_LABELS } from '@/types'
import type { Supplement, TimeOfDayType } from '@/types'
import { Fragment } from 'react/jsx-runtime'

const DailySchedule = ({
  supplements,
  onCheckboxToggle,
  checkedKeys
}: {
  supplements: Supplement[]
  onCheckboxToggle: (supplement: Supplement, timeOfDay: TimeOfDayType) => void
  checkedKeys: Set<string>
}) => {
  return (
    <div className="grid w-full grid-cols-[2fr_repeat(6,1fr)] rounded-lg border-2 border-gray-200 bg-white px-4 py-2 pb-4 shadow-md">
      <div className="p-2"></div>
      {Object.values(TIMES_OF_DAY).map((timeOfDay) => (
        <div
          key={timeOfDay}
          className="flex items-center justify-center border-gray-200 p-2 text-center font-semibold text-gray-800"
        >
          {TIME_OF_DAY_LABELS[timeOfDay]}
        </div>
      ))}

      {supplements.map((supplement) => (
        <Fragment key={supplement.id}>
          <div className="flex min-w-0 items-center border-t-2 border-gray-200 p-2 font-medium wrap-anywhere">
            {supplement.name}
          </div>
          {Object.values(TIMES_OF_DAY).map((timeOfDay) => {
            const isScheduled = supplement.timesOfDay.includes(timeOfDay)

            return (
              <div
                key={`${supplement.id}-${timeOfDay}`}
                className="flex items-center justify-center border-t-2 border-gray-200 p-2"
              >
                <input
                  onChange={() => onCheckboxToggle(supplement, timeOfDay)}
                  checked={checkedKeys.has(`${supplement.id}-${timeOfDay}`)}
                  disabled={!isScheduled}
                  className="cursor-pointer rounded transition-colors focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:opacity-30"
                  type="checkbox"
                />
              </div>
            )
          })}
        </Fragment>
      ))}
    </div>
  )
}

export default DailySchedule
