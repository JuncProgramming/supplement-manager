import { render, screen } from '@testing-library/react'
import IntakeLogCard from '@/components/IntakeLogCard'
import {
  TIME_OF_DAY_LABELS,
  TIMES_OF_DAY,
  UNITS,
  type HistoryEntry
} from '@/types'

describe('IntakeLogCard', () => {
  const mockEntries: HistoryEntry[] = [
    {
      supplementId: 1,
      name: 'Creatine monohydrate',
      brand: 'Generic brand',
      amountTaken: 5,
      unit: UNITS.GRAMS,
      timeOfDay: TIMES_OF_DAY.MORNING,
      taken: true
    },
    {
      supplementId: 2,
      name: 'D3 + K2 drops',
      brand: 'Aliness',
      amountTaken: 10,
      unit: UNITS.ML,
      timeOfDay: TIMES_OF_DAY.EVENING,
      taken: false
    }
  ]

  it('should render the data properly (date, progress, entry details, time of day label, and correct taken or not taken icon)', () => {
    render(<IntakeLogCard date={'2026-01-20'} entries={mockEntries} />)

    const progressBarEl = screen.getByTestId('progress-bar')

    expect(screen.getByText(/2026-01-20/i)).toBeVisible()
    expect(progressBarEl).toHaveStyle({ width: '50%' })
    expect(screen.getByText('1/2')).toBeVisible()

    const checkIconEl = screen.getByTestId(/icon-check/i)
    const checkBgEl = screen.getByTestId(/icon-check/i).parentElement

    expect(checkIconEl).toBeVisible()
    expect(checkBgEl).toHaveClass('bg-green-100 text-green-600')
    expect(screen.getByText(/creatine monohydrate/i)).toBeVisible()
    expect(screen.getByText(/generic brand · 5 grams/i)).toBeVisible()
    expect(
      screen.getByText(TIME_OF_DAY_LABELS[TIMES_OF_DAY.MORNING])
    ).toBeVisible()

    const closeIconEl = screen.getByTestId(/icon-close/i)
    const closeBgEl = screen.getByTestId(/icon-close/i).parentElement

    expect(closeIconEl).toBeVisible()
    expect(closeBgEl).toHaveClass('bg-red-50 text-red-400')
    expect(screen.getByText(/D3 \+ K2 drops/i)).toBeVisible()
    expect(screen.getByText(/Aliness · 10 milliliters/i)).toBeVisible()
    expect(
      screen.getByText(TIME_OF_DAY_LABELS[TIMES_OF_DAY.EVENING])
    ).toBeVisible()
  })

  it('should render the progress bar with 0% and a 0/0 progress text next to it when entries is an empty array', () => {
    render(<IntakeLogCard date={'2026-01-20'} entries={[]} />)

    const progressBarEl = screen.getByTestId('progress-bar')
    expect(progressBarEl).toHaveStyle({ width: '0%' })
    expect(screen.getByText('0/0')).toBeVisible()
  })
})
