import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const ConfirmModal = ({
  message = 'Are you sure you want to delete this supplement?',
  onCloseClick,
  onConfirmClick,
  confirmBtnText = 'Confirm',
  confirmingBtnText = 'Confirming...',
  closeBtnText = 'Close',
  closingBtnText = 'Closing...'
}: {
  message?: string
  onCloseClick: () => void | Promise<void>
  onConfirmClick: () => void | Promise<void>
  confirmBtnText?: string
  confirmingBtnText?: string
  closeBtnText?: string
  closingBtnText?: string
}) => {
  const [isConfirming, setIsConfirming] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = async () => {
    try {
      setIsClosing(true)
      await onCloseClick()
    } finally {
      setIsClosing(false)
    }
  }

  const handleConfirm = async () => {
    try {
      setIsConfirming(true)
      await onConfirmClick()
    } finally {
      setIsConfirming(false)
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
      <div
        className="fixed inset-0 bg-black/50 transition-colors"
        data-testid="modal-backdrop"
        onClick={handleClose}
      />
      <div className="relative z-10 my-auto flex w-full max-w-md flex-col items-start justify-center rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6 flex w-full items-start justify-between gap-6 border-b border-gray-100 pb-6">
          <h1 className="text-xl font-bold text-gray-800">{message}</h1>
          <button
            onClick={handleClose}
            className="cursor-pointer rounded-lg border-2 border-gray-200 p-2 text-blue-600 hover:bg-gray-50 focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            data-testid="button-confirm-modal-close"
          >
            <X className="h-6 w-6 shrink-0" data-testid="icon-close"></X>
          </button>
        </div>
        <div className="flex w-full justify-end gap-2">
          <button
            onClick={handleClose}
            disabled={isClosing}
            className="bg-white-600 cursor-pointer rounded-md border-2 border-gray-200 p-2 px-4 font-semibold text-blue-600 hover:bg-gray-50 focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed"
          >
            {isClosing ? closingBtnText : closeBtnText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={isConfirming}
            className="w-full cursor-pointer rounded-md bg-blue-600 p-2 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed"
          >
            {isConfirming ? confirmingBtnText : confirmBtnText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
