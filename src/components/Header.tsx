import { NavLink, Link } from 'react-router-dom'
import { PillBottle, X, Menu, CalendarDays, Package, LayoutDashboard } from 'lucide-react'
import { useState } from 'react'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4">
        <Link to="/" className="font-semibold text-blue-600 transition-colors hover:text-blue-800">
          <h1 className="flex flex-row items-center gap-1">
            <PillBottle className="shrink-0 rotate-6" /> Supplement Manager
          </h1>
        </Link>

        <nav className="hidden gap-4 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-semibold transition-colors ${
                isActive ? 'text-blue-800 hover:text-blue-600' : 'text-blue-600 hover:text-blue-800'
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              `font-semibold transition-colors ${
                isActive ? 'text-blue-800 hover:text-blue-600' : 'text-blue-600 hover:text-blue-800'
              }`
            }
          >
            Inventory
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              `font-semibold transition-colors ${
                isActive ? 'text-blue-800 hover:text-blue-600' : 'text-blue-600 hover:text-blue-800'
              }`
            }
          >
            History
          </NavLink>
        </nav>

        <button
          className="cursor-pointer rounded-lg border-2 border-gray-200 p-2 text-blue-600 md:hidden"
          data-testid="button-mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="shrink-0" data-testid="icon-close" />
          ) : (
            <Menu className="shrink-0" data-testid="icon-open" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          className="border-t border-gray-100 bg-white px-4 py-4 md:hidden"
          data-testid="mobile-menu"
        >
          <nav className="flex flex-col space-y-5">
            <NavLink
              onClick={() => setIsMobileMenuOpen(false)}
              to="/"
              className={({ isActive }) =>
                `flex gap-2 font-semibold transition-colors ${
                  isActive
                    ? 'text-blue-800 hover:text-blue-600'
                    : 'text-blue-600 hover:text-blue-800'
                }`
              }
            >
              <LayoutDashboard className="shrink-0" />
              Dashboard
            </NavLink>

            <NavLink
              onClick={() => setIsMobileMenuOpen(false)}
              to="/inventory"
              className={({ isActive }) =>
                `flex gap-2 font-semibold transition-colors ${
                  isActive
                    ? 'text-blue-800 hover:text-blue-600'
                    : 'text-blue-600 hover:text-blue-800'
                }`
              }
            >
              <Package className="shrink-0" />
              Inventory
            </NavLink>

            <NavLink
              onClick={() => setIsMobileMenuOpen(false)}
              to="/history"
              className={({ isActive }) =>
                `flex gap-2 font-semibold transition-colors ${
                  isActive
                    ? 'text-blue-800 hover:text-blue-600'
                    : 'text-blue-600 hover:text-blue-800'
                }`
              }
            >
              <CalendarDays className="shrink-0" />
              History
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
