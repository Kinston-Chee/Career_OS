import React from 'react'
import { AlertTriangle } from 'lucide-react'
import EmployerModal from '../../employer/EmployerModal'

export default function OverrideConfirmModal({ requirementName, onClose, onConfirm }) {
  return (
    <EmployerModal
      title="Confirm override"
      icon={<AlertTriangle className="h-4 w-4 text-orange-500" />}
      onClose={onClose}
      maxWidth="max-w-[440px]"
      footer={
        <div className="flex items-center justify-end gap-2">
          <button type="button" onClick={onClose} className="employer-secondary-button px-4 py-2 text-sm">
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Mark as ready (override)
          </button>
        </div>
      }
    >
      <p className="text-sm leading-6 text-gray-700">
        Are you sure? This will mark <span className="font-semibold">{requirementName}</span> as ready even though not all data sources are complete. This will be logged.
      </p>
    </EmployerModal>
  )
}
