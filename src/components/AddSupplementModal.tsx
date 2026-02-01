import { TIMES_OF_DAY, UNITS, UNIT_LABELS, TIME_OF_DAY_LABELS } from '@/types'
import { X, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { UnitType, TimeOfDayType } from '@/types'
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
  const [timesOfDay, setTimesOfDay] = useState<TimeOfDayType[]>(
    previousData?.timesOfDay ?? [TIMES_OF_DAY.MORNING]
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isEditMode = !!previousData

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()

    setError(null)

    const currentStockValue = parseFloat(currentStock)
    const dosagePerServingValue = parseFloat(dosagePerServing)

    if (isNaN(currentStockValue) || currentStockValue < 0) {
      setError('Current stock has to be greater than 0')
      return
    }

    if (isNaN(dosagePerServingValue) || dosagePerServingValue <= 0) {
      setError('Dosage per serving has to be greater than or equal 0')
      return
    }

    if (timesOfDay.length === 0) {
      setError('At least one time of the day has to be picked')
      return
    }

    setIsSubmitting(true)

    try {
      const supplementData = {
        name,
        brand: brand || undefined,
        unit,
        currentStock: currentStockValue,
        dosagePerServing: dosagePerServingValue,
        timesOfDay
      }

      if (isEditMode && previousData?.id) {
        await updateSupplement(previousData.id, supplementData)
      } else {
        await addSupplement(supplementData)
      }

      handleClose()
    } catch (error) {
      console.log('Failed to save supplement:', error)
      setError('An error has occurred while trying to save supplement')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
      <div className="fixed inset-0 bg-black/50 transition-colors" onClick={handleClose} />
      <div className="relative z-10 my-auto flex w-full max-w-md flex-col items-start justify-center rounded-lg border border-gray-200 bg-white p-6">
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
            <label htmlFor="supplement-times-of-day" className="mb-1 text-gray-800">
              Intake schedule
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {Object.values(TIMES_OF_DAY).map((time) => {
                const isSelected = timesOfDay.includes(time)
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => {
                      setTimesOfDay((prev) =>
                        isSelected ? prev.filter((t) => time !== t) : [...prev, time]
                      )
                    }}
                    className={`flex items-center justify-center rounded-md border-2 font-medium text-gray-800 transition-colors ${isSelected ? 'border-blue-600 bg-gray-50 hover:border-blue-800 hover:bg-gray-100' : 'border-gray-200 hover:border-blue-600 hover:bg-gray-50'} h-14 px-3 py-1 text-center`}
                  >
                    {TIME_OF_DAY_LABELS[time]}
                  </button>
                )
              })}
            </div>
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
              Current stock
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
          {error && (
            <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              <AlertCircle size={18} className="shrink-0" />
              <p>{error}</p>
            </div>
          )}
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
