import React, { useEffect, useState } from 'react'
import { Briefcase, Check, Pencil, Target } from 'lucide-react'
import { useCareerStore } from '../../store/useCareerStore'

function Field({ icon: Icon, label, value, placeholder, onChange, autoFocus }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-violet-600">
        <Icon size={12} strokeWidth={2.2} />
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="rounded-xl border border-violet-100 bg-white px-3 py-2 text-sm font-semibold text-[#11104a] shadow-sm transition focus:border-violet-300 focus:outline-none focus:ring-4 focus:ring-violet-100 placeholder:text-slate-400 placeholder:font-medium"
      />
    </label>
  )
}

function ReadOnlyRow({ icon: Icon, label, value, placeholder }) {
  const isEmpty = !value
  return (
    <div className="flex items-center gap-3 rounded-xl border border-violet-50 bg-violet-50/40 px-3 py-2">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-violet-600 shadow-sm">
        <Icon size={13} strokeWidth={2.2} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
        <p className={`truncate text-sm font-bold ${isEmpty ? 'text-slate-400' : 'text-[#11104a]'}`}>
          {value || placeholder}
        </p>
      </div>
    </div>
  )
}

export default function CareerFocusEditor() {
  const careerFocus = useCareerStore((state) => state.careerFocus)
  const targetRole = useCareerStore((state) => state.targetRole)
  const setCareerFocus = useCareerStore((state) => state.setCareerFocus)
  const setTargetRole = useCareerStore((state) => state.setTargetRole)

  const [isEditing, setIsEditing] = useState(false)
  const [draftFocus, setDraftFocus] = useState(careerFocus)
  const [draftRole, setDraftRole] = useState(targetRole)
  const [justSaved, setJustSaved] = useState(false)

  useEffect(() => {
    if (!isEditing) {
      setDraftFocus(careerFocus)
      setDraftRole(targetRole)
    }
  }, [careerFocus, targetRole, isEditing])

  function handleSave() {
    setCareerFocus(draftFocus.trim())
    setTargetRole(draftRole.trim())
    setIsEditing(false)
    setJustSaved(true)
    window.setTimeout(() => setJustSaved(false), 1800)
  }

  function handleCancel() {
    setDraftFocus(careerFocus)
    setDraftRole(targetRole)
    setIsEditing(false)
  }

  return (
    <section className="rounded-3xl border border-violet-100/80 bg-white/95 p-5 shadow-[0_18px_44px_rgba(88,63,188,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-600">
            <span className="flex h-5 w-5 items-center justify-center rounded-md border border-violet-100 bg-violet-50 text-violet-600">
              <Target size={12} strokeWidth={2} />
            </span>
            Career Direction
          </h3>
          <p className="mt-1.5 text-xs font-medium text-slate-500">
            Tell us what you're aiming for — it powers the sidebar, account page, and recommendations.
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex shrink-0 items-center gap-1.5 rounded-xl border border-violet-200 bg-white px-3 py-1.5 text-xs font-bold text-violet-700 transition hover:bg-violet-50"
          >
            <Pencil size={12} strokeWidth={2.2} />
            Edit
          </button>
        )}

        {justSaved && !isEditing && (
          <span className="flex shrink-0 items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-[11px] font-bold text-emerald-700">
            <Check size={13} strokeWidth={2.2} />
            Saved
          </span>
        )}
      </div>

      {isEditing ? (
        <div className="mt-4 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              icon={Briefcase}
              label="Industry Focus"
              value={draftFocus}
              onChange={setDraftFocus}
              placeholder="e.g. Data Scientist"
              autoFocus
            />
            <Field
              icon={Target}
              label="Target Role"
              value={draftRole}
              onChange={setDraftRole}
              placeholder="e.g. Data Analyst / Data Scientist"
            />
          </div>
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-xl border border-violet-200 bg-white px-3 py-2 text-xs font-bold text-violet-700 transition hover:bg-violet-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-violet-200 transition hover:from-violet-700 hover:to-indigo-700"
            >
              <Check size={13} strokeWidth={2.2} />
              Save changes
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <ReadOnlyRow
            icon={Briefcase}
            label="Industry Focus"
            value={careerFocus}
            placeholder="Add your industry focus"
          />
          <ReadOnlyRow
            icon={Target}
            label="Target Role"
            value={targetRole}
            placeholder="Add your target role"
          />
        </div>
      )}
    </section>
  )
}
