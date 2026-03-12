import { Sun, CloudSun, Moon, Dumbbell } from 'lucide-react'
import { TIMES_OF_DAY } from '@/types'

export const TIME_OF_DAY_ICONS: Record<string, React.ReactNode> = {
  [TIMES_OF_DAY.MORNING]: <Sun size={14} className="text-yellow-500" />,
  [TIMES_OF_DAY.AFTERNOON]: <CloudSun size={14} className="text-amber-500" />,
  [TIMES_OF_DAY.EVENING]: <Moon size={14} className="text-indigo-500" />,
  [TIMES_OF_DAY.BEFORE_WORKOUT]: (
    <Dumbbell size={14} className="text-violet-500" />
  ),
  [TIMES_OF_DAY.DURING_WORKOUT]: (
    <Dumbbell size={14} className="text-purple-500" />
  ),
  [TIMES_OF_DAY.AFTER_WORKOUT]: (
    <Dumbbell size={14} className="text-fuchsia-600" />
  )
}
