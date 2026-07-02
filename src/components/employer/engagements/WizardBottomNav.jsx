import React from 'react'

const CONTINUE_LABELS = { 2: 'Yes, create this →', 3: 'Looks good →', 4: 'Publish now' }

export default function WizardBottomNav({ step, onBack, onContinue }) {
  return (
    <div className="flex shrink-0 items-center justify-between border-t border-gray-100 bg-white px-8 py-4">
      <button type="button" onClick={onBack} className="text-sm font-semibold text-gray-500 hover:text-gray-700">
        ← {step === 1 ? 'Cancel' : 'Back'}
      </button>

      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4].map((dot) => (
          <span key={dot} className={`h-2 w-2 rounded-full ${dot <= step ? 'bg-[#185FA5]' : 'border border-gray-300'}`} />
        ))}
      </div>

      {step > 1 && onContinue ? (
        <button type="button" onClick={onContinue} className="rounded-full bg-[#185FA5] px-5 py-2 text-sm font-semibold text-white hover:bg-[#134c87]">
          {CONTINUE_LABELS[step]}
        </button>
      ) : (
        <span className="w-[88px]" />
      )}
    </div>
  )
}
