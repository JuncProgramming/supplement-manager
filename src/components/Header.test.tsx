import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Header from '@/components/Header'

describe('Header', () => {
  it('should render the application title and all navigation links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: /supplement manager/i })).toBeVisible()
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeVisible()
    expect(screen.getByRole('link', { name: /inventory/i })).toBeVisible()
    expect(screen.getByRole('link', { name: /history/i })).toBeVisible()
  })

  it('should point to correct paths for Dashboard, Inventory, and History', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /inventory/i })).toHaveAttribute('href', '/inventory')
    expect(screen.getByRole('link', { name: /history/i })).toHaveAttribute('href', '/history')
  })

  it('should apply correct text styling based on the current path', () => {
    render(
      <MemoryRouter initialEntries={['/inventory']}>
        <Header />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: /dashboard/i })).not.toHaveClass(
      'text-blue-800',
      'hover:text-blue-600'
    )
    expect(screen.getByRole('link', { name: /inventory/i })).toHaveClass(
      'text-blue-800',
      'hover:text-blue-600'
    )
    expect(screen.getByRole('link', { name: /history/i })).not.toHaveClass(
      'text-blue-800',
      'hover:text-blue-600'
    )
  })

  it('should open and close the mobile menu when the button is clicked and toggle the button icon', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const toggleButton = screen.getByTestId('button-mobile-menu-toggle')

    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()
    expect(screen.getByTestId('icon-open')).toBeVisible()
    expect(screen.queryByTestId('icon-close')).not.toBeInTheDocument()

    await user.click(toggleButton)

    expect(screen.getByTestId('mobile-menu')).toBeVisible()
    expect(screen.queryByTestId('icon-open')).not.toBeInTheDocument()
    expect(screen.getByTestId('icon-close')).toBeVisible()

    await user.click(toggleButton)

    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()
    expect(screen.getByTestId('icon-open')).toBeVisible()
    expect(screen.queryByTestId('icon-close')).not.toBeInTheDocument()
  })

  it('should close the mobile menu when a navigation link is clicked', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    await user.click(screen.getByRole('button'))

    const mobileMenu = screen.getByTestId('mobile-menu')
    const mobileHistoryLink = within(mobileMenu).getByRole('link', { name: /history/i })

    await user.click(mobileHistoryLink)

    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()
  })
})
