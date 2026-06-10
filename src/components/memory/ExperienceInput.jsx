import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SKILLS_DICTIONARY, TECHNOLOGIES_DICTIONARY } from '../../data/skillsDictionary'

const EVENT_TYPES = [
  'Hackathon',
  'Workshop',
  'Competition',
  'Project',
  'Internship',
  'Leadership',
  'Volunteering',
  'Certification',
  'Research',
  'Networking Event',
  'Other',
]

const EMPTY_FORM = {
  title: '',
  date: '',
  role: '',
  type: 'Project',
  description: '',
  skillsLearned: [],
  organization: '',
  teamSize: '',
  duration: '',
  achievement: '',
  technologies: [],
  referenceUrl: '',
  reflection: '',
}

/* ───── Searchable Multi-Select ───── */
function SearchableMultiSelect({ id, label, required, dictionary, selected, onChange, placeholder }) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  const matches = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return dictionary
      .filter((item) => item.toLowerCase().includes(q) && !selected.includes(item))
      .slice(0, 8)
  }, [query, dictionary, selected])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const addItem = useCallback(
    (item) => {
      onChange([...selected, item])
      setQuery('')
      setIsOpen(false)
    },
    [selected, onChange],
  )

  const removeItem = useCallback(
    (item) => {
      onChange(selected.filter((s) => s !== item))
    },
    [selected, onChange],
  )

  const inputBase =
    'w-full rounded-xl border border-violet-100 bg-white/90 px-4 py-3 text-sm leading-6 text-[#11104a] outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100/70'

  return (
    <div ref={containerRef} className="relative">
      <label htmlFor={id} className="block text-xs font-semibold text-[#3f3d78] mb-1.5">
        {label} {required && <span className="text-rose-400">*</span>}
      </label>

      {/* Selected pills */}
      {selected.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {selected.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 rounded-lg bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700 ring-1 ring-violet-100"
            >
              {item}
              <button
                type="button"
                onClick={() => removeItem(item)}
                className="ml-0.5 rounded-full p-0.5 text-violet-400 transition-colors hover:bg-violet-100 hover:text-violet-700"
                aria-label={`Remove ${item}`}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2.5 2.5L7.5 7.5M7.5 2.5L2.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search input */}
      <input
        id={id}
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setIsOpen(true)
        }}
        onFocus={() => query.trim() && setIsOpen(true)}
        className={inputBase}
        placeholder={placeholder}
        autoComplete="off"
      />

      {/* Dropdown */}
      {isOpen && matches.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-48 overflow-y-auto rounded-xl border border-violet-100 bg-white shadow-lg shadow-violet-100/40">
          {matches.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => addItem(item)}
              className="flex w-full items-center px-4 py-2.5 text-left text-sm text-[#11104a] transition-colors hover:bg-violet-50"
            >
              <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-md bg-violet-50 text-[10px] font-bold text-violet-600">+</span>
              {item}
            </button>
          ))}
        </div>
      )}

      {/* No match message */}
      {isOpen && query.trim() && matches.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-20 mt-1 rounded-xl border border-violet-100 bg-white p-3 text-center shadow-lg">
          <p className="text-xs font-medium text-slate-400">No matching items found</p>
        </div>
      )}
    </div>
  )
}

/* ───── Experience Input Form ───── */
export default function ExperienceInput({ onSubmit, isExtracting }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [showMore, setShowMore] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleFormSubmit(event) {
    event.preventDefault()
    if (!form.title.trim() || !form.description.trim()) return
    onSubmit(form)
    setForm(EMPTY_FORM)
    setShowMore(false)
  }

  const inputBase =
    'w-full rounded-xl border border-violet-100 bg-white/90 px-4 py-3 text-sm leading-6 text-[#11104a] outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100/70'
  const labelBase = 'block text-xs font-semibold text-[#3f3d78] mb-1.5'

  return (
    <section className="rounded-3xl border border-violet-100/80 bg-white/92 p-5 shadow-[0_18px_44px_rgba(88,63,188,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-[#11104a]">Add a New Experience</h3>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Turn projects, internships, hackathons, and certifications into career evidence.
          </p>
        </div>
        <span className="rounded-xl bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">
          Structured Entry
        </span>
      </div>

      <form onSubmit={handleFormSubmit} className="mt-5 space-y-5">
        {/* Row 1: Title + Event Type */}
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_200px]">
          <div>
            <label htmlFor="exp-title" className={labelBase}>
              Experience Title <span className="text-rose-400">*</span>
            </label>
            <input
              id="exp-title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className={inputBase}
              placeholder="e.g. DataHack Malaysia 2025"
              required
            />
          </div>
          <div>
            <label htmlFor="exp-type" className={labelBase}>
              Event Type <span className="text-rose-400">*</span>
            </label>
            <select
              id="exp-type"
              name="type"
              value={form.type}
              onChange={handleChange}
              className={`${inputBase} appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M2%204l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_14px_center] bg-no-repeat pr-10`}
            >
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Date + Role */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="exp-date" className={labelBase}>
              Date <span className="text-rose-400">*</span>
            </label>
            <input
              id="exp-date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className={inputBase}
              required
            />
          </div>
          <div>
            <label htmlFor="exp-role" className={labelBase}>
              Role
            </label>
            <input
              id="exp-role"
              name="role"
              value={form.role}
              onChange={handleChange}
              className={inputBase}
              placeholder="e.g. Team Lead, Participant, Intern"
            />
          </div>
        </div>

        {/* Row 3: Description */}
        <div>
          <label htmlFor="exp-description" className={labelBase}>
            Description <span className="text-rose-400">*</span>
          </label>
          <textarea
            id="exp-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className={`${inputBase} min-h-24 resize-none`}
            placeholder="Describe what you did, what you learned, and any measurable outcomes..."
            required
          />
        </div>

        {/* Row 4: Skills Learned — Searchable Multi-Select */}
        <SearchableMultiSelect
          id="exp-skills"
          label="Skills Learned"
          dictionary={SKILLS_DICTIONARY}
          selected={form.skillsLearned}
          onChange={(skills) => setForm((prev) => ({ ...prev, skillsLearned: skills }))}
          placeholder="Type to search skills (e.g. Python, Machine Learning)..."
        />

        {/* Evidence Upload (UI only) */}
        <div className="rounded-2xl border border-dashed border-violet-200 bg-violet-50/30 p-4 transition-all duration-200 hover:border-violet-300 hover:bg-violet-50/70">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#11104a]">Upload evidence files</p>
              <p className="text-xs font-medium text-slate-500">PDF, images, documents. Max 10 MB</p>
            </div>
          </div>
        </div>

        {/* Collapsible Additional Details */}
        <div>
          <button
            type="button"
            onClick={() => setShowMore(!showMore)}
            className="flex items-center gap-2 text-xs font-semibold text-violet-700 transition-colors hover:text-violet-900"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={`transition-transform duration-200 ${showMore ? 'rotate-90' : ''}`}
            >
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {showMore ? 'Hide' : 'Show'} Additional Details
          </button>

          {showMore && (
            <div className="mt-4 space-y-4 rounded-2xl border border-violet-50 bg-violet-50/20 p-4">
              {/* Organization + Team Size */}
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_140px]">
                <div>
                  <label htmlFor="exp-org" className={labelBase}>
                    Organisation / Host
                  </label>
                  <input
                    id="exp-org"
                    name="organization"
                    value={form.organization}
                    onChange={handleChange}
                    className={inputBase}
                    placeholder="e.g. Google DevFest, Petronas"
                  />
                </div>
                <div>
                  <label htmlFor="exp-teamsize" className={labelBase}>
                    Team Size
                  </label>
                  <input
                    id="exp-teamsize"
                    name="teamSize"
                    type="number"
                    min="1"
                    value={form.teamSize}
                    onChange={handleChange}
                    className={inputBase}
                    placeholder="e.g. 4"
                  />
                </div>
              </div>

              {/* Duration + Achievement */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="exp-duration" className={labelBase}>
                    Duration
                  </label>
                  <input
                    id="exp-duration"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    className={inputBase}
                    placeholder="e.g. 3 months, 2 days"
                  />
                </div>
                <div>
                  <label htmlFor="exp-achievement" className={labelBase}>
                    Achievement / Outcome
                  </label>
                  <input
                    id="exp-achievement"
                    name="achievement"
                    value={form.achievement}
                    onChange={handleChange}
                    className={inputBase}
                    placeholder="e.g. Won 1st place, Published paper"
                  />
                </div>
              </div>

              {/* Technologies — Searchable Multi-Select */}
              <SearchableMultiSelect
                id="exp-tech"
                label="Technologies Used"
                dictionary={TECHNOLOGIES_DICTIONARY}
                selected={form.technologies}
                onChange={(techs) => setForm((prev) => ({ ...prev, technologies: techs }))}
                placeholder="Type to search technologies (e.g. React, TensorFlow)..."
              />

              {/* Reference URL */}
              <div>
                <label htmlFor="exp-url" className={labelBase}>
                  Link / Reference URL
                </label>
                <input
                  id="exp-url"
                  name="referenceUrl"
                  type="url"
                  value={form.referenceUrl}
                  onChange={handleChange}
                  className={inputBase}
                  placeholder="https://github.com/..."
                />
              </div>

              {/* Reflection */}
              <div>
                <label htmlFor="exp-reflection" className={labelBase}>
                  Reflection / Key Takeaway
                </label>
                <textarea
                  id="exp-reflection"
                  name="reflection"
                  value={form.reflection}
                  onChange={handleChange}
                  className={`${inputBase} min-h-20 resize-none`}
                  placeholder="What is the most important thing you learned from this experience?"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end border-t border-violet-50 pt-4">
          <button
            type="submit"
            disabled={isExtracting || !form.title.trim() || !form.description.trim()}
            className="h-12 shrink-0 rounded-2xl bg-violet-600 px-7 text-sm font-bold text-white shadow-lg shadow-violet-200 transition-all duration-200 hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isExtracting ? 'Adding...' : 'Add Experience'}
          </button>
        </div>
      </form>
    </section>
  )
}
