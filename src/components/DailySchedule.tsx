import { TIMES_OF_DAY, TIME_OF_DAY_LABELS } from '@/types'
import type { Supplement, TimeOfDayType } from '@/types'
import { TIME_OF_DAY_ICONS } from '@/constants/timeOfDayIcons'
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
    <div className="overflow-x-auto rounded-lg border-2 border-gray-200 bg-white shadow-md">
      <div className="grid w-full min-w-150 grid-cols-[2fr_repeat(6,1fr)]">
        <div className="border-b-2 border-gray-200 bg-gray-50 p-3"></div>
        {Object.values(TIMES_OF_DAY).map((timeOfDay) => (
          <div
            key={timeOfDay}
            className="flex flex-col items-center justify-center gap-1 border-b-2 border-gray-200 bg-gray-50 p-3 text-center text-xs font-semibold text-gray-600"
          >
            <span className="flex items-center justify-center">
              {TIME_OF_DAY_ICONS[timeOfDay]}
            </span>
            <span className="max-w-16">{TIME_OF_DAY_LABELS[timeOfDay]}</span>
          </div>
        ))}

        {supplements.map((supplement, index) => (
          <Fragment key={supplement.id}>
            <div
              className={`flex min-w-0 items-center p-3 font-medium wrap-anywhere ${
                index % 2 === 1 ? 'bg-gray-50/50' : ''
              }`}
            >
              {supplement.name}
            </div>
            {Object.values(TIMES_OF_DAY).map((timeOfDay) => {
              const isScheduled = supplement.timesOfDay.includes(timeOfDay)
              const isChecked = checkedKeys.has(`${supplement.id}-${timeOfDay}`)

              return (
                <div
                  key={`${supplement.id}-${timeOfDay}`}
                  className={`flex items-center justify-center p-3 ${
                    index % 2 === 1 ? 'bg-gray-50/50' : ''
                  }`}
                >
                  {isScheduled ? (
                    <label className="flex cursor-pointer items-center justify-center">
                      <input
                        onChange={() => onCheckboxToggle(supplement, timeOfDay)}
                        checked={isChecked}
                        className={`h-4 w-4 cursor-pointer rounded border-2 transition-colors focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                          isChecked
                            ? 'border-blue-600 bg-blue-600 text-white'
                            : 'border-gray-300'
                        }`}
                        type="checkbox"
                      />
                    </label>
                  ) : (
                    <span className="h-4 w-4"></span>
                  )}
                </div>
              )
            })}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default DailySchedule
