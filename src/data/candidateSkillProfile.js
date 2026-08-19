// Canonical candidate skill evidence used by Skills Development and Career Intelligence.
// Updating a level here keeps the Data Science assessment consistent across both pages.
export const DATA_SCIENCE_SKILLS = [
  { id: 'python', name: 'Python', level: 78, target: 75, state: 'demonstrated', color: 'bg-indigo-500' },
  { id: 'sql', name: 'SQL', level: 64, target: 75, state: 'develop-next', color: 'bg-amber-500' },
  { id: 'statistics', name: 'Statistics', level: 58, target: 70, state: 'develop-next', color: 'bg-amber-500' },
  { id: 'data-analysis', name: 'Data Analysis', level: 82, target: 75, state: 'demonstrated', color: 'bg-emerald-500' },
  { id: 'machine-learning', name: 'Machine Learning', level: 61, target: 72, state: 'develop-next', color: 'bg-amber-500' },
  { id: 'data-visualization', name: 'Data Visualization', level: 70, target: 70, state: 'demonstrated', color: 'bg-blue-500' },
]

export const DATA_SCIENCE_READINESS = Math.round(
  DATA_SCIENCE_SKILLS.reduce((total, skill) => total + skill.level, 0) / DATA_SCIENCE_SKILLS.length,
)

export const DATA_SCIENCE_STRENGTHS = DATA_SCIENCE_SKILLS
  .filter((skill) => skill.state === 'demonstrated')
  .map((skill) => skill.name)

export const DATA_SCIENCE_GAPS = DATA_SCIENCE_SKILLS
  .filter((skill) => skill.state === 'develop-next')
  .map((skill) => skill.name)

export function getDataScienceSkill(skillId) {
  return DATA_SCIENCE_SKILLS.find((skill) => skill.id === skillId)
}
