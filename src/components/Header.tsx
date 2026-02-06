import { NavLink } from 'react-router-dom'
import { PillBottle, X, Menu, CalendarDays, Package, LayoutDashboard } from 'lucide-react'
import { useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4">
        <h1 className="flex flex-row items-center gap-1 font-semibold text-blue-600">
          <PillBottle className="shrink-0 rotate-6" /> Supplement Manager
        </h1>
        <nav className="hidden gap-4 md:flex">
          <NavLink
            to="/dashboard"
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
          className="rounded-lg border-2 border-gray-200 p-2 text-blue-600 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="shrink-0"></X> : <Menu className="shrink-0"></Menu>}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col space-y-5">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex gap-2 font-semibold transition-colors ${
                  isActive
                    ? 'text-blue-800 hover:text-blue-600'
                    : 'text-blue-600 hover:text-blue-800'
                }`
              }
            >
              <LayoutDashboard className="shrink-0"></LayoutDashboard>
              Dashboard
            </NavLink>

            <NavLink
              to="/inventory"
              className={({ isActive }) =>
                `flex gap-2 font-semibold transition-colors ${
                  isActive
                    ? 'text-blue-800 hover:text-blue-600'
                    : 'text-blue-600 hover:text-blue-800'
                }`
              }
            >
              <Package className="shrink-0"></Package>
              Inventory
            </NavLink>

            <NavLink
              to="/history"
              className={({ isActive }) =>
                `flex gap-2 font-semibold transition-colors ${
                  isActive
                    ? 'text-blue-800 hover:text-blue-600'
                    : 'text-blue-600 hover:text-blue-800'
                }`
              }
            >
              <CalendarDays className="shrink-0"></CalendarDays>
              History
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
