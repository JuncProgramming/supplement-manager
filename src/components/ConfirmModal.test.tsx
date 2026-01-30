import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ConfirmModal from '@/components/ConfirmModal'

describe('ConfirmModal', () => {
  const mockOnCloseClick = vi.fn()
  const mockOnConfirmClick = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly with default props', () => {
    render(<ConfirmModal onCloseClick={mockOnCloseClick} onConfirmClick={mockOnConfirmClick} />)

    expect(screen.getByText(/are you sure/i)).toBeVisible()
    expect(screen.getByRole('button', { name: /close/i })).toBeVisible()
    expect(screen.getByRole('button', { name: /confirm/i })).toBeVisible()
  })

  it('renders correctly with custom props', () => {
    render(
      <ConfirmModal
        message="Mock message"
        closeBtnText="Mock close"
        confirmBtnText="Mock confirm"
        onCloseClick={mockOnCloseClick}
        onConfirmClick={mockOnConfirmClick}
      />
    )

    expect(screen.getByText(/mock message/i)).toBeVisible()
    expect(screen.getByRole('button', { name: /mock close/i })).toBeVisible()
    expect(screen.getByRole('button', { name: /mock confirm/i })).toBeVisible()
  })

  it('locks body scrolling on mount and restores it on unmount', () => {
    const { unmount } = render(
      <ConfirmModal onCloseClick={mockOnCloseClick} onConfirmClick={mockOnConfirmClick} />
    )

    expect(document.body.style.overflow).toBe('hidden')

    unmount()

    expect(document.body.style.overflow).toBe('unset')
  })

  it('calls onCloseClick when the modal backdrop is clicked', async () => {
    const user = userEvent.setup()

    render(<ConfirmModal onCloseClick={mockOnCloseClick} onConfirmClick={mockOnConfirmClick} />)

    await user.click(screen.getByTestId('modal-backdrop'))

    expect(mockOnCloseClick).toHaveBeenCalledOnce()
  })

  it('calls onCloseClick when the X button is clicked', async () => {
    const user = userEvent.setup()

    render(<ConfirmModal onCloseClick={mockOnCloseClick} onConfirmClick={mockOnConfirmClick} />)

    await user.click(screen.getByTestId('button-confirm-modal-close'))

    expect(mockOnCloseClick).toHaveBeenCalledOnce()
  })

  it('calls onCloseClick when the Close button is clicked', async () => {
    const user = userEvent.setup()

    render(<ConfirmModal onCloseClick={mockOnCloseClick} onConfirmClick={mockOnConfirmClick} />)

    await user.click(screen.getByRole('button', { name: /close/i }))

    expect(mockOnCloseClick).toHaveBeenCalledOnce()
  })

  it('calls onConfirmClick when the Confirm button is clicked', async () => {
    const user = userEvent.setup()

    render(<ConfirmModal onCloseClick={mockOnCloseClick} onConfirmClick={mockOnConfirmClick} />)

    await user.click(screen.getByRole('button', { name: /confirm/i }))

    await waitFor(() => {
      expect(mockOnConfirmClick).toHaveBeenCalledOnce()
    })
  })

  it('disables the confirm button and shows confirming text while onConfirmClick is pending', async () => {
    const user = userEvent.setup()

    mockOnConfirmClick.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)))

    render(<ConfirmModal onCloseClick={mockOnCloseClick} onConfirmClick={mockOnConfirmClick} />)

    await user.click(screen.getByRole('button', { name: 'Confirm' }))

    expect(screen.getByRole('button', { name: 'Confirming...' })).toBeDisabled()

    await waitFor(() => {
      expect(mockOnConfirmClick).toHaveBeenCalledOnce()
      expect(screen.getByRole('button', { name: 'Confirm' })).toBeEnabled()
    })
  })

  it('disables the close button and shows closing text while onCloseClick is pending', async () => {
    const user = userEvent.setup()

    mockOnCloseClick.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)))

    render(<ConfirmModal onCloseClick={mockOnCloseClick} onConfirmClick={mockOnConfirmClick} />)

    await user.click(screen.getByRole('button', { name: 'Close' }))

    expect(screen.getByRole('button', { name: 'Closing...' })).toBeDisabled()

    await waitFor(() => {
      expect(mockOnCloseClick).toHaveBeenCalledOnce()
      expect(screen.getByRole('button', { name: 'Close' })).toBeEnabled()
    })
  })
})
