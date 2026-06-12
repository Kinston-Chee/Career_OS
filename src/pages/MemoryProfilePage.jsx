import React, { useState } from 'react'
import CareerProfileBar from '../components/memory/CareerProfileBar'
import ExperienceInput from '../components/memory/ExperienceInput'
import ExperienceTimeline from '../components/memory/ExperienceTimeline'
import { useCareerStore } from '../store/useCareerStore'

export default function MemoryProfilePage() {
  const [isExtracting, setIsExtracting] = useState(false)
  const experiences = useCareerStore((state) => state.experiences)
  const addExperience = useCareerStore((state) => state.addExperience)

  function handleSubmit(formData) {
    setIsExtracting(true)

    // Skills are now an array (from searchable selector), not a comma-separated string
    const skillNames = Array.isArray(formData.skillsLearned)
      ? formData.skillsLearned
      : formData.skillsLearned
        ? formData.skillsLearned.split(',').map((s) => s.trim()).filter(Boolean)
        : []

    // Technologies are now an array (from searchable selector), not a comma-separated string
    const techList = Array.isArray(formData.technologies)
      ? formData.technologies
      : formData.technologies
        ? formData.technologies.split(',').map((s) => s.trim()).filter(Boolean)
        : []

    // Format date from "2026-01-15" (full date) to "Jan 15 2026"
    let formattedDate = 'Jun 15 2026'
    if (formData.date) {
      const dateObj = new Date(formData.date)
      if (!isNaN(dateObj.getTime())) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const day = dateObj.getDate().toString().padStart(2, '0')
        formattedDate = `${months[dateObj.getMonth()]} ${day} ${dateObj.getFullYear()}`
      }
    }

    // Simulate a brief processing delay for UX
    window.setTimeout(() => {
      addExperience({
        title: formData.title,
        type: formData.type,
        role: formData.role || formData.type,
        date: formattedDate,
        summary: formData.description,
        evidenceLinks: ['Portfolio Entry'],
        credibility: 'Pending',
        extractedSkills: skillNames.map((name) => ({
          name,
          level: 'Emerging',
          credibility: 70,
        })),
        organization: formData.organization || '',
        teamSize: formData.teamSize ? parseInt(formData.teamSize, 10) : undefined,
        duration: formData.duration || undefined,
        achievement: formData.achievement || '',
        technologies: techList,
      })
      setIsExtracting(false)
    }, 400)
  }

  return (
    <div className="min-h-full pb-2 text-[#11104a]">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">Student Workspace</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">Career Memory</h2>
        <p className="mt-2 text-sm font-medium text-slate-500">Your journey, your story, your evidence.</p>
      </header>

      <div className="space-y-6">
        <CareerProfileBar experiences={experiences} />
        <ExperienceInput
          onSubmit={handleSubmit}
          isExtracting={isExtracting}
        />
        <ExperienceTimeline experiences={experiences} />
      </div>
    </div>
  )
}
