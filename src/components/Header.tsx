import { NavLink } from 'react-router-dom'
import { PillBottle } from 'lucide-react'

const Header = () => {
  return (
    <header className="flex h-16 flex-row items-center justify-between border-b border-gray-200 bg-white px-4">
      <h1 className="flex flex-row items-center gap-1 font-semibold text-blue-600">
        <PillBottle className="rotate-6" /> Supplement Manager
      </h1>
      <nav className="flex gap-4">
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
    </header>
  )
}

export default Header
