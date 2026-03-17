import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DailySchedule from './DailySchedule'
import type { Supplement } from '@/types'
import { TIME_OF_DAY_LABELS, TIMES_OF_DAY, UNITS } from '@/types'
import { vi } from 'vitest'

const mockSupplements: Supplement[] = [
  {
    id: 1,
    name: 'Creatine',
    brand: 'Generic',
    currentStock: 500,
    dosagePerServing: 5,
    unit: UNITS.GRAMS,
    timesOfDay: [TIMES_OF_DAY.DURING_WORKOUT]
  },
  {
    id: 2,
    name: 'Omega-3',
    currentStock: 60,
    dosagePerServing: 2,
    unit: UNITS.PILLS,
    timesOfDay: [TIMES_OF_DAY.MORNING, TIMES_OF_DAY.EVENING]
  },
  {
    id: 3,
    name: 'K2',
    currentStock: 100,
    dosagePerServing: 1,
    unit: UNITS.ML,
    timesOfDay: [TIMES_OF_DAY.AFTERNOON]
  },
  {
    id: 4,
    name: 'Magnesium',
    currentStock: 120,
    dosagePerServing: 400,
    unit: UNITS.SCOOPS,
    timesOfDay: [TIMES_OF_DAY.EVENING, TIMES_OF_DAY.AFTER_WORKOUT]
  }
]

describe('DailySchedule', () => {
  const mockOnCheckboxToggle = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render all time of day headers', () => {
    render(
      <DailySchedule
        supplements={mockSupplements}
        onCheckboxToggle={mockOnCheckboxToggle}
        checkedKeys={new Set()}
      />
    )

    Object.values(TIME_OF_DAY_LABELS).forEach((label) =>
      expect(screen.getByText(label)).toBeVisible()
    )
  })

  it('should render all supplement names', () => {
    render(
      <DailySchedule
        supplements={mockSupplements}
        onCheckboxToggle={mockOnCheckboxToggle}
        checkedKeys={new Set()}
      />
    )

    mockSupplements.forEach((supplement) =>
      expect(screen.getByText(supplement.name)).toBeVisible()
    )
  })

  it('should render checkboxes exactly in the scheduled time slots', () => {
    render(
      <DailySchedule
        supplements={mockSupplements}
        onCheckboxToggle={mockOnCheckboxToggle}
        checkedKeys={new Set()}
      />
    )

    mockSupplements.forEach((supplement) => {
      supplement.timesOfDay.forEach((time) => {
        const timeLabel = TIME_OF_DAY_LABELS[time]
        expect(
          screen.getByRole('checkbox', {
            name: `${supplement.name} - ${timeLabel}`
          })
        ).toBeVisible()
      })
    })

    expect(screen.getAllByRole('checkbox')).toHaveLength(6)
  })

  it('should render a checkbox as checked if its key exists in checkedKeys', () => {
    render(
      <DailySchedule
        supplements={mockSupplements}
        onCheckboxToggle={mockOnCheckboxToggle}
        checkedKeys={new Set(['3-afternoon'])}
      />
    )

    expect(
      screen.getByRole('checkbox', { name: `K2 - Afternoon` })
    ).toBeChecked()
  })

  it('should render a checkbox as unchecked if its key does not exist in checkedKeys', () => {
    render(
      <DailySchedule
        supplements={mockSupplements}
        onCheckboxToggle={mockOnCheckboxToggle}
        checkedKeys={new Set()}
      />
    )

    expect(
      screen.getByRole('checkbox', { name: `K2 - Afternoon` })
    ).not.toBeChecked()
  })

  it('should call onCheckboxToggle with the correct supplement and timeOfDay when clicked', async () => {
    const user = userEvent.setup()

    render(
      <DailySchedule
        supplements={mockSupplements}
        onCheckboxToggle={mockOnCheckboxToggle}
        checkedKeys={new Set()}
      />
    )

    await user.click(screen.getByRole('checkbox', { name: `K2 - Afternoon` }))

    expect(mockOnCheckboxToggle).toHaveBeenCalledExactlyOnceWith(
      mockSupplements[2],
      'afternoon'
    )
  })

  it('should not crash and should render only headers when the supplements array is empty', () => {
    render(
      <DailySchedule
        supplements={[]}
        onCheckboxToggle={mockOnCheckboxToggle}
        checkedKeys={new Set()}
      />
    )

    Object.values(TIME_OF_DAY_LABELS).forEach((label) =>
      expect(screen.getByText(label)).toBeVisible()
    )

    expect(screen.queryAllByRole('checkbox')).toHaveLength(0)
  })
})
