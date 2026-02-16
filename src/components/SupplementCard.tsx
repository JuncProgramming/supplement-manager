import type { Supplement } from '@/types'
import { formatServing, formatUnits } from '@/utils'
import { Trash2, TriangleAlert, CircleCheck, Pencil } from 'lucide-react'

const SupplementCard = ({
  supplement,
  onTrashClick,
  onPencilClick
}: {
  supplement: Supplement
  onTrashClick: () => void
  onPencilClick: () => void
}) => {
  const servingsLeft = supplement.currentStock / supplement.dosagePerServing
  const isStockLow = servingsLeft < 10
  return (
    <li className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 transition-colors">
      <div className="mb-4 flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-xs font-medium tracking-wide wrap-break-word text-gray-600 uppercase">
            {supplement.brand}
          </p>
          <h3 className="font-semibold wrap-break-word text-gray-800">{supplement.name}</h3>
        </div>
        <div className="flex shrink-0 gap-6 sm:gap-4">
          <button
            onClick={onTrashClick}
            className="cursor-pointer text-gray-400 transition-colors hover:text-red-400"
          >
            <Trash2 size={20} />
          </button>
          <button
            onClick={onPencilClick}
            className="cursor-pointer text-gray-400 transition-colors hover:text-gray-600"
          >
            <Pencil size={20} />
          </button>
        </div>
      </div>

      <div className="flex items-start gap-6 border-t border-gray-100 pt-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-gray-600">Stock</p>
          <p className="font-medium text-gray-800">
            {supplement.currentStock}
            <span className="ml-0.5 text-xs font-normal text-gray-600">
              {formatUnits(supplement.currentStock, supplement.unit)}
            </span>
          </p>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-gray-600">Dosage</p>
          <p className="font-medium text-gray-800">
            {supplement.dosagePerServing}
            <span className="ml-0.5 text-xs font-normal text-gray-600">
              {formatUnits(supplement.dosagePerServing, supplement.unit)} / serving
            </span>
          </p>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-100 pt-4">
        <div
          className={`mb-2 flex items-center gap-2 text-xs font-semibold ${isStockLow ? 'text-amber-500' : 'text-green-600'}`}
        >
          {isStockLow ? (
            <>
              <TriangleAlert size={16} />
              <span>
                Low stock ({Math.floor(servingsLeft)} {formatServing(Math.floor(servingsLeft))}{' '}
                left)
              </span>
            </>
          ) : (
            <>
              <CircleCheck size={16} />
              <span>
                {Math.floor(servingsLeft)} {formatServing(Math.floor(servingsLeft))} in stock
              </span>
            </>
          )}
        </div>
      </div>
    </li>
  )
}

export default SupplementCard
