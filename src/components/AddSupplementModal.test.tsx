import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import AddSupplementModal from '@/components/AddSupplementModal'
import type { Supplement } from '@/types'
import { UNITS, TIMES_OF_DAY } from '@/types'
import userEvent from '@testing-library/user-event'
import { addSupplement, updateSupplement } from '@/db/api'

vi.mock('@/db/api')

describe('AddSupplementModal', () => {
  const mockHandleClose = vi.fn()
  const mockSupplement: Supplement = {
    name: 'D3 + K2 drops',
    brand: 'Aliness',
    unit: UNITS.ML,
    currentStock: 120,
    dosagePerServing: 5,
    timesOfDay: [TIMES_OF_DAY.MORNING, TIMES_OF_DAY.EVENING]
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders "New supplement" form correctly with default empty values when previousData is null', () => {
    render(<AddSupplementModal handleClose={mockHandleClose} previousData={null} />)

    const nameInputEl = screen.getByLabelText(/name/i)
    const brandInputEl = screen.getByLabelText(/brand/i)
    const morningBtn = screen.getByRole('button', { name: /morning/i })
    const afternoonBtn = screen.getByRole('button', { name: /afternoon/i })
    const eveningBtn = screen.getByRole('button', { name: /evening/i })
    const beforeWorkoutBtn = screen.getByRole('button', { name: /before workout/i })
    const duringWorkoutBtn = screen.getByRole('button', { name: /during workout/i })
    const afterWorkoutBtn = screen.getByRole('button', { name: /after workout/i })
    const unitInputEl = screen.getByLabelText(/unit/i)
    const stockInputEl = screen.getByLabelText(/current stock/i)
    const dosageInputEl = screen.getByLabelText(/dosage per serving/i)

    expect(screen.getByRole('heading', { name: /new supplement/i })).toBeVisible()
    expect(screen.getByTestId('button-add-supplement-form-close')).toBeVisible()

    expect(nameInputEl).toHaveValue('')
    expect(brandInputEl).toHaveValue('')
    expect(morningBtn).toHaveClass('border-blue-600')
    expect(afternoonBtn).toHaveClass('border-gray-200')
    expect(eveningBtn).toHaveClass('border-gray-200')
    expect(beforeWorkoutBtn).toHaveClass('border-gray-200')
    expect(duringWorkoutBtn).toHaveClass('border-gray-200')
    expect(afterWorkoutBtn).toHaveClass('border-gray-200')
    expect(unitInputEl).toHaveValue(UNITS.GRAMS)
    expect(stockInputEl).toHaveValue(null)
    expect(dosageInputEl).toHaveValue(null)

    expect(screen.getByRole('button', { name: /add supplement/i })).toBeVisible()
  })

  it('renders "Edit supplement" form with previous data when it is provided', () => {
    render(<AddSupplementModal handleClose={mockHandleClose} previousData={mockSupplement} />)

    const nameInputEl = screen.getByLabelText(/name/i)
    const brandInputEl = screen.getByLabelText(/brand/i)
    const morningBtn = screen.getByRole('button', { name: /morning/i })
    const afternoonBtn = screen.getByRole('button', { name: /afternoon/i })
    const eveningBtn = screen.getByRole('button', { name: /evening/i })
    const beforeWorkoutBtn = screen.getByRole('button', { name: /before workout/i })
    const duringWorkoutBtn = screen.getByRole('button', { name: /during workout/i })
    const afterWorkoutBtn = screen.getByRole('button', { name: /after workout/i })
    const unitInputEl = screen.getByLabelText(/unit/i)
    const stockInputEl = screen.getByLabelText(/current stock/i)
    const dosageInputEl = screen.getByLabelText(/dosage per serving/i)

    expect(screen.getByRole('heading', { name: /edit supplement/i })).toBeVisible()
    expect(screen.getByTestId('button-add-supplement-form-close')).toBeVisible()

    expect(nameInputEl).toHaveValue(mockSupplement.name)
    expect(brandInputEl).toHaveValue(mockSupplement.brand)
    expect(morningBtn).toHaveClass('border-blue-600')
    expect(afternoonBtn).toHaveClass('border-gray-200')
    expect(eveningBtn).toHaveClass('border-blue-600')
    expect(beforeWorkoutBtn).toHaveClass('border-gray-200')
    expect(duringWorkoutBtn).toHaveClass('border-gray-200')
    expect(afterWorkoutBtn).toHaveClass('border-gray-200')
    expect(unitInputEl).toHaveValue(mockSupplement.unit)
    expect(stockInputEl).toHaveValue(mockSupplement.currentStock)
    expect(dosageInputEl).toHaveValue(mockSupplement.dosagePerServing)

    expect(screen.getByRole('button', { name: /edit supplement/i })).toBeVisible()
  })

  it('calls handleClose when the X button is clicked', async () => {
    const user = userEvent.setup()

    render(<AddSupplementModal handleClose={mockHandleClose} previousData={null} />)

    const closeBtn = screen.getByTestId('button-add-supplement-form-close')

    await user.click(closeBtn)

    expect(mockHandleClose).toHaveBeenCalledOnce()
  })

  it('calls handleClose when the modal backdrop is clicked', async () => {
    const user = userEvent.setup()

    render(<AddSupplementModal handleClose={mockHandleClose} previousData={null} />)

    const backdrop = screen.getByTestId('modal-backdrop')

    await user.click(backdrop)

    expect(mockHandleClose).toHaveBeenCalledOnce()
  })

  it('locks body scrolling on mount and restores it on unmount', () => {
    const { unmount } = render(
      <AddSupplementModal handleClose={mockHandleClose} previousData={null} />
    )

    expect(document.body.style.overflow).toBe('hidden')

    unmount()

    expect(document.body.style.overflow).toBe('unset')
  })

  it('displays an error message when submitting with a negative current stock', () => {
    render(<AddSupplementModal handleClose={mockHandleClose} previousData={mockSupplement} />)

    const stockInputEl = screen.getByLabelText(/current stock/i)
    const form = stockInputEl.closest('form')

    // using fireEvent, because of the min attribue of the input restricts typing it in as a user
    fireEvent.change(stockInputEl, { target: { value: '-10' } })
    if (form) fireEvent.submit(form)

    expect(screen.getByText(/stock has to be greater than 0/i)).toBeVisible()
  })

  it('displays an error message when submitting with dosage per serving equal to 0', () => {
    render(<AddSupplementModal handleClose={mockHandleClose} previousData={mockSupplement} />)

    const dosageInputEl = screen.getByLabelText(/dosage per serving/i)
    const form = dosageInputEl.closest('form')

    // using fireEvent, because of the min attribue of the input restricts typing it in as a user
    fireEvent.change(dosageInputEl, { target: { value: '0' } })
    if (form) fireEvent.submit(form)

    expect(screen.getByText(/dosage per serving has to be greater than or equal 0/i)).toBeVisible()
  })

  it('displays an error message when trying to submit with no time of day selected', async () => {
    const user = userEvent.setup()

    render(<AddSupplementModal handleClose={mockHandleClose} previousData={mockSupplement} />)

    const morningBtn = screen.getByRole('button', { name: /morning/i })
    const eveningBtn = screen.getByRole('button', { name: /evening/i })

    await user.click(morningBtn)
    await user.click(eveningBtn)
    await user.click(screen.getByRole('button', { name: /edit supplement/i }))

    expect(screen.getByText(/at least one time of the day has to be picked/i)).toBeVisible()
  })

  it('calls addSupplement API and closes modal with correct data when creating a new supplement', async () => {
    const user = userEvent.setup()

    render(<AddSupplementModal handleClose={mockHandleClose} previousData={null} />)

    const nameInputEl = screen.getByLabelText(/name/i)
    const brandInputEl = screen.getByLabelText(/brand/i)
    const eveningBtn = screen.getByRole('button', { name: /evening/i })
    const unitInputEl = screen.getByLabelText(/unit/i)
    const stockInputEl = screen.getByLabelText(/current stock/i)
    const dosageInputEl = screen.getByLabelText(/dosage per serving/i)

    await user.type(nameInputEl, mockSupplement.name)
    if (mockSupplement.brand) {
      await user.type(brandInputEl, mockSupplement.brand)
    }
    await user.click(eveningBtn)
    await user.selectOptions(unitInputEl, UNITS.ML)
    await user.type(stockInputEl, mockSupplement.currentStock.toString())
    await user.type(dosageInputEl, mockSupplement.dosagePerServing.toString())
    await user.click(screen.getByRole('button', { name: /add supplement/i }))

    await waitFor(() => {
      expect(addSupplement).toHaveBeenCalledExactlyOnceWith(mockSupplement)
      expect(mockHandleClose).toHaveBeenCalledOnce()
    })
  })

  it('calls updateSupplement API and closes modal with correct data when editing an existing supplement', async () => {
    const user = userEvent.setup()

    const mockSupplementWithId = { id: 123, ...mockSupplement }

    render(<AddSupplementModal handleClose={mockHandleClose} previousData={mockSupplementWithId} />)

    const nameInputEl = screen.getByLabelText(/name/i)

    await user.clear(nameInputEl)
    await user.type(nameInputEl, 'Vitamin A')
    await user.click(screen.getByRole('button', { name: /edit supplement/i }))

    await waitFor(() => {
      // calling with ID, because of the updateSupplement method (supplementId, supplementData)
      expect(updateSupplement).toHaveBeenCalledExactlyOnceWith(123, {
        ...mockSupplement,
        name: 'Vitamin A'
      })
      expect(mockHandleClose).toHaveBeenCalledOnce()
    })
  })
})
