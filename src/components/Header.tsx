import { NavLink } from 'react-router-dom'
import { PillBottle } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-white h-16 items-center px-4 justify-between flex flex-row border-b border-gray-200">
      <h1 className="font-semibold text-blue-600 flex flex-row gap-1 items-center">
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
