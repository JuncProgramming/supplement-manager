import { UNITS } from '@/types'
import { X } from 'lucide-react'
import { useState } from 'react'
import type { UnitType } from '@/types'
import { UNIT_LABELS } from '@/types'

const AddSupplementModal = ({ handleClose }: { handleClose: () => void }) => {
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [unit, setUnit] = useState<UnitType>(UNITS.GRAMS)
  const [currentStock, setCurrentStock] = useState<number | ''>('')
  const [dosagePerServing, setDosagePerServing] = useState<number | ''>('')

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    handleClose()
  }

  return (
    <div
      className="fixed inset-0 z-100 -mt-16 flex items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      <div
        className="flex w-fit flex-col items-start justify-center rounded-lg border border-gray-200 bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex min-w-xl justify-between border-b border-gray-100 pb-6">
          <h1 className="text-2xl font-semibold text-zinc-800">New supplement</h1>
          <button
            onClick={handleClose}
            className="cursor-pointer rounded-lg border-2 border-gray-200 p-2 text-blue-600"
            data-testid="add-supplement-form-close-btn"
          >
            <X className="shrink-0" data-testid="icon-close"></X>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="min-w-full space-y-6">
          <div className="flex flex-col">
            <label className="mb-1 text-zinc-800">Name</label>
            <input
              type="text"
              required
              placeholder="Creatine monohydrate"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-md border-2 border-gray-200 p-2 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-zinc-800">Brand (optional)</label>
            <input
              type="text"
              placeholder="Generic"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="rounded-md border-2 border-gray-200 p-2 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-zinc-800">Unit</label>
            <select
              required
              value={unit}
              onChange={(e) => setUnit(e.target.value as UnitType)}
              className="appearance-none rounded-md border-2 border-gray-200 p-2 focus:border-blue-600 focus:outline-none"
            >
              {Object.values(UNITS).map((unit) => (
                <option key={unit} value={unit}>
                  {UNIT_LABELS[unit]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-zinc-800">Current Stock</label>
            <input
              type="number"
              required
              placeholder="500"
              value={currentStock}
              onChange={(e) => setCurrentStock(e.target.value === '' ? '' : Number(e.target.value))}
              className="rounded-md border-2 border-gray-200 p-2 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-zinc-800">Dosage per serving</label>
            <input
              type="number"
              required
              placeholder="5"
              value={dosagePerServing}
              onChange={(e) =>
                setDosagePerServing(e.target.value === '' ? '' : Number(e.target.value))
              }
              className="rounded-md border-2 border-gray-200 p-2 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <button className="min-w-full rounded-md bg-blue-600 p-2 font-semibold text-white hover:bg-blue-800">
            Add
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddSupplementModal
