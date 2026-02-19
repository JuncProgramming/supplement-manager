import SupplementCard from '@/components/SupplementCard'
import { TIMES_OF_DAY, UNITS, type Supplement } from '@/types'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('SupplementCard', () => {
  const mockSupplement: Supplement = {
    name: 'Creatine monohydrate',
    brand: 'Generic brand',
    unit: UNITS.GRAMS,
    currentStock: 500,
    dosagePerServing: 5,
    timesOfDay: [TIMES_OF_DAY.MORNING, TIMES_OF_DAY.EVENING]
  }
  const mockOnTrashClick = vi.fn()
  const mockOnPencilClick = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders supplement details correctly', () => {
    render(
      <SupplementCard
        supplement={mockSupplement}
        onTrashClick={mockOnTrashClick}
        onPencilClick={mockOnPencilClick}
      />
    )

    const stockEl = screen.getByText('500').closest('p')
    const dosageEl = screen.getByText('5').closest('p')

    expect(screen.getByText(/creatine/i)).toBeVisible()
    expect(screen.getByText(/generic/i)).toBeVisible()
    expect(stockEl).toHaveTextContent(/500g/i)
    expect(dosageEl).toHaveTextContent(/5g \/ serving/i)
  })

  it('calls onTrashClick callback when the trash button is clicked', async () => {
    const user = userEvent.setup()

    render(
      <SupplementCard
        supplement={mockSupplement}
        onTrashClick={mockOnTrashClick}
        onPencilClick={mockOnPencilClick}
      />
    )

    const trashBtn = screen.getByTestId('button-trash')

    await user.click(trashBtn)

    expect(mockOnTrashClick).toHaveBeenCalledOnce()
  })

  it('calls onPencilClick callback when the pencil button is clicked', async () => {
    const user = userEvent.setup()

    render(
      <SupplementCard
        supplement={mockSupplement}
        onTrashClick={mockOnTrashClick}
        onPencilClick={mockOnPencilClick}
      />
    )

    const pencilBtn = screen.getByTestId('button-pencil')

    await user.click(pencilBtn)

    expect(mockOnPencilClick).toHaveBeenCalledOnce()
  })

  it('displays low stock warning when servings left are less than 10', () => {
    render(
      <SupplementCard
        supplement={{ ...mockSupplement, currentStock: 10 }}
        onTrashClick={mockOnTrashClick}
        onPencilClick={mockOnPencilClick}
      />
    )

    const messageEl = screen.getByText(/low stock/i)
    const messageParentEl = messageEl.closest('div')
    const alertIcon = screen.getByTestId('icon-alert')

    expect(alertIcon).toBeVisible()
    expect(messageEl).toBeVisible()
    expect(messageParentEl).toHaveClass('text-amber-500')
  })

  it('displays in stock message when servings left are 10 or more', () => {
    render(
      <SupplementCard
        supplement={mockSupplement}
        onTrashClick={mockOnTrashClick}
        onPencilClick={mockOnPencilClick}
      />
    )

    const messageEl = screen.getByText(/in stock/i)
    const messageParentEl = messageEl.closest('div')
    const checkIcon = screen.getByTestId('icon-check')

    expect(checkIcon).toBeVisible()
    expect(messageEl).toBeVisible()
    expect(messageParentEl).toHaveClass('text-green-600')
  })

  it('renders correctly when the optional brand is not provided', () => {
    render(
      <SupplementCard
        supplement={{ ...mockSupplement, brand: undefined }}
        onTrashClick={mockOnTrashClick}
        onPencilClick={mockOnPencilClick}
      />
    )

    const stockEl = screen.getByText('500').closest('p')
    const dosageEl = screen.getByText('5').closest('p')

    expect(screen.getByText(/creatine/i)).toBeVisible()
    expect(stockEl).toHaveTextContent(/500g/i)
    expect(dosageEl).toHaveTextContent(/5g \/ serving/i)
  })

  it('rounds down servings left correctly when current stock is not perfectly divisible by dosage', () => {
    const { rerender } = render(
      <SupplementCard
        supplement={{ ...mockSupplement, currentStock: 24 }}
        onTrashClick={mockOnTrashClick}
        onPencilClick={mockOnPencilClick}
      />
    )

    let messageEl = screen.getByText(/low stock/i)

    expect(messageEl).toHaveTextContent(/4 servings left/i)

    rerender(
      <SupplementCard
        supplement={{ ...mockSupplement, currentStock: 61 }}
        onTrashClick={mockOnTrashClick}
        onPencilClick={mockOnPencilClick}
      />
    )

    messageEl = screen.getByText(/in stock/i)

    expect(messageEl).toHaveTextContent(/12 servings in stock/i)
  })

  it('renders 0 servings left when current stock is less than dosage per serving', () => {
    render(
      <SupplementCard
        supplement={{ ...mockSupplement, currentStock: 3 }}
        onTrashClick={mockOnTrashClick}
        onPencilClick={mockOnPencilClick}
      />
    )

    const messageEl = screen.getByText(/low stock/i)

    expect(messageEl).toHaveTextContent(/0 servings left/i)
  })
})
