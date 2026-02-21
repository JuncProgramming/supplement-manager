import { useLiveQuery } from 'dexie-react-hooks'
import db from '@/db/db'
import AddSupplementModal from '@/components/AddSupplementModal'
import { useState } from 'react'
import SupplementCard from '@/components/SupplementCard'
import { deleteSupplement } from '@/db/api'
import type { Supplement } from '@/types'
import { Package } from 'lucide-react'
import ConfirmModal from '@/components/ConfirmModal'

const InventoryPage = () => {
  const supplements = useLiveQuery(() => db.supplements.toArray())

  const [isSupplementModalOpen, setIsSupplementModalOpen] = useState(false)
  const [supplementToDelete, setSupplementToDelete] = useState<number | null>(null)
  const [supplementToEdit, setSupplementToEdit] = useState<Supplement | null>(null)

  const handleAdd = () => {
    setSupplementToEdit(null)
    setIsSupplementModalOpen(true)
  }

  const handleDelete = async (supplementId?: number) => {
    try {
      await deleteSupplement(supplementId)
    } catch (error) {
      console.error('Failed to delete supplement:', error)
    }
  }

  const handleEdit = (supplement: Supplement) => {
    setSupplementToEdit(supplement)
    setIsSupplementModalOpen(true)
  }

  if (!supplements)
    return (
      <div className="-mt-32 flex flex-1 flex-col items-center justify-center">
        <p className="text-gray-600">Loading inventory...</p>
      </div>
    )

  return (
    <>
      <div className="mt-4 flex flex-col sm:mt-6 md:mt-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">My supplement inventory</h1>
          <button
            onClick={handleAdd}
            className="w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-800 sm:w-auto"
          >
            Add New Supplement
          </button>
        </div>

        {supplements.length === 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-16 text-center">
            <Package size={36} className="mb-4 text-blue-600" />
            <h2 className="mb-1 text-xl font-semibold text-gray-800">Your inventory is empty</h2>
            <p className="text-sm text-gray-600">Click the button above to get started</p>
          </div>
        ) : (
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {supplements.map((supplement) => (
              <SupplementCard
                key={supplement.id}
                supplement={supplement}
                onTrashClick={() => {
                  if (supplement.id) setSupplementToDelete(supplement.id)
                }}
                onPencilClick={() => handleEdit(supplement)}
              ></SupplementCard>
            ))}
          </ul>
        )}
      </div>

      {isSupplementModalOpen && (
        <AddSupplementModal
          handleClose={() => setIsSupplementModalOpen(false)}
          previousData={supplementToEdit}
        />
      )}

      {supplementToDelete && (
        <ConfirmModal
          onCloseClick={() => setSupplementToDelete(null)}
          onConfirmClick={async () => {
            await handleDelete(supplementToDelete)
            setSupplementToDelete(null)
          }}
        />
      )}
    </>
  )
}

export default InventoryPage
