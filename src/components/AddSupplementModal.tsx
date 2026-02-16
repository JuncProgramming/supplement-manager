import { UNITS } from '@/types'
import { X } from 'lucide-react'
import { useState } from 'react'
import type { UnitType } from '@/types'
import { UNIT_LABELS } from '@/types'
import { addSupplement, updateSupplement } from '@/db/api'
import type { Supplement } from '@/types'

const AddSupplementModal = ({
  handleClose,
  previousData
}: {
  handleClose: () => void
  previousData: Supplement | null
}) => {
  const [name, setName] = useState(previousData?.name ?? '')
  const [brand, setBrand] = useState(previousData?.brand ?? '')
  const [unit, setUnit] = useState<UnitType>(previousData?.unit ?? UNITS.GRAMS)
  const [currentStock, setCurrentStock] = useState(previousData?.currentStock?.toString() ?? '')
  const [dosagePerServing, setDosagePerServing] = useState(
    previousData?.dosagePerServing?.toString() ?? ''
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isEditMode = !!previousData

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()

    const currentStockValue = parseFloat(currentStock)
    const dosagePerServingValue = parseFloat(dosagePerServing)

    if (isNaN(currentStockValue) || currentStockValue < 0) {
      console.error('Failed to add supplement')
      return
    }

    if (isNaN(dosagePerServingValue) || dosagePerServingValue <= 0) {
      console.error('Failed to add supplement')
      return
    }

    setIsSubmitting(true)

    try {
      const data = {
        name,
        brand: brand || undefined,
        unit,
        currentStock: currentStockValue,
        dosagePerServing: dosagePerServingValue
      }

      if (isEditMode && previousData?.id) {
        await updateSupplement(previousData.id, data)
      } else {
        await addSupplement(data)
      }

      handleClose()
    } catch (error) {
      console.error('Failed to add supplement:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 transition-colors" onClick={handleClose} />
      <div className="relative z-10 flex w-full max-w-md flex-col items-start justify-center rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6 flex w-full items-start justify-between gap-6 border-b border-gray-100 pb-6 sm:gap-0">
          <h1 className="text-2xl font-bold text-gray-800">
            {isEditMode ? 'Edit supplement' : 'New supplement'}
          </h1>
          <button
            onClick={handleClose}
            className="cursor-pointer rounded-lg border-2 border-gray-200 p-2 text-blue-600"
            data-testid="add-supplement-form-close-btn"
          >
            <X className="h-6 w-6 shrink-0" data-testid="icon-close"></X>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="min-w-full space-y-6">
          <div className="flex flex-col">
            <label htmlFor="supplement-name" className="mb-1 text-gray-800">
              Name
            </label>
            <input
              id="supplement-name"
              maxLength={50}
              type="text"
              required
              placeholder="Creatine monohydrate"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-md border-2 border-gray-200 p-2 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="supplement-brand" className="mb-1 text-gray-800">
              Brand (optional)
            </label>
            <input
              id="supplement-brand"
              maxLength={30}
              type="text"
              placeholder="Generic"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="rounded-md border-2 border-gray-200 p-2 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="supplement-unit" className="mb-1 text-gray-800">
              Unit
            </label>
            <select
              id="supplement-unit"
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
            <label htmlFor="supplement-current-stock" className="mb-1 text-gray-800">
              Current Stock
            </label>
            <input
              id="supplement-current-stock"
              type="number"
              step="any"
              min="0"
              required
              placeholder="500"
              value={currentStock}
              onChange={(e) => {
                if (e.target.value.length > 10) return
                setCurrentStock(e.target.value)
              }}
              className="rounded-md border-2 border-gray-200 p-2 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="supplement-dosage-per-serving" className="mb-1 text-gray-800">
              Dosage per serving
            </label>
            <input
              id="supplement-dosage-per-serving"
              type="number"
              step="any"
              min="0.001"
              required
              placeholder="5"
              value={dosagePerServing}
              onChange={(e) => {
                if (e.target.value.length > 10) return
                setDosagePerServing(e.target.value)
              }}
              className="rounded-md border-2 border-gray-200 p-2 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <button
            disabled={isSubmitting}
            className="min-w-full rounded-md bg-blue-600 p-2 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? isEditMode
                ? 'Editing...'
                : 'Adding...'
              : isEditMode
                ? 'Edit Supplement'
                : 'Add Supplement'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddSupplementModal
