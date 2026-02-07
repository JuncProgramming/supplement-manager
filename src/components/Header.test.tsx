import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from './Header'

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

    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/dashboard')
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
})
