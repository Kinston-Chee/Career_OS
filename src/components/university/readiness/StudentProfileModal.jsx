import React from 'react'
import { User } from 'lucide-react'
import EmployerModal from '../../employer/EmployerModal'

function Bar({ label, value, tone }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-gray-600">{label}</span>
        <span className="font-bold text-gray-800">{value}%</span>
      </div>
      <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export default function StudentProfileModal({ student, onClose }) {
  const [name, year, gpa] = student.label.split(' · ')

  return (
    <EmployerModal title={name} icon={<User className="h-4 w-4" />} onClose={onClose} maxWidth="max-w-[440px]">
      <p className="text-xs text-gray-400">Anonymized profile — identity withheld per institutional data policy</p>

      <div className="mt-3 flex items-center gap-4 rounded-xl bg-slate-50 p-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-[#185FA5]">
          {name.replace('Student ', '')}
        </span>
        <div>
          <p className="text-sm font-bold text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">{year} · {gpa}</p>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <Bar label="Academic performance" value={student.academic} tone="bg-green-500" />
        <Bar label="Employability signal" value={student.employability} tone="bg-red-500" />
      </div>

      <div className="mt-4 rounded-xl border border-orange-100 bg-orange-50/70 p-3 text-xs leading-5 text-gray-700">
        Strong academic performance masks weak career-readiness signals — incomplete Career Memory, no logged internship experience, and low platform engagement. Flagged for intervention.
      </div>
    </EmployerModal>
  )
}
