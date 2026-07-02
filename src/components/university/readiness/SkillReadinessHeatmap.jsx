import React from 'react'
import { ChevronDown, Info } from 'lucide-react'
import { heatmap } from '../../../data/studentReadinessData'

const LEVEL_CLASSES = {
  1: 'bg-green-200 text-green-900',
  2: 'bg-yellow-200 text-yellow-900',
  3: 'bg-orange-300 text-orange-900',
  4: 'bg-red-300 text-red-900',
}

export default function SkillReadinessHeatmap({ selectedColumn, onSelectColumn, detailText, onSelectCell }) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-gray-900">Academic Skill Readiness</h2>
        <button type="button" className="flex items-center gap-1 text-xs text-gray-400">
          {heatmap.cohort}
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="w-28" />
              {heatmap.columns.map((col) => (
                <th key={col} className="px-1 pb-2">
                  <button
                    type="button"
                    onClick={() => onSelectColumn(col)}
                    className={`w-full rounded-md px-2 py-1 text-xs font-semibold transition ${
                      col === selectedColumn ? 'bg-blue-50 text-[#185FA5]' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {col}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {heatmap.rows.map((row) => (
              <tr key={row}>
                <td className="py-1 pr-2 text-xs font-medium text-gray-600">{row}</td>
                {heatmap.columns.map((col, colIndex) => {
                  const level = heatmap.levels[row][colIndex]
                  const isSelectedCol = col === selectedColumn
                  return (
                    <td key={col} className="p-0.5">
                      <button
                        type="button"
                        onClick={() => onSelectCell(row, col)}
                        className={`h-10 w-full rounded-md text-[11px] font-semibold transition ${LEVEL_CLASSES[level]} ${
                          isSelectedCol ? 'ring-2 ring-[#185FA5] ring-offset-1' : ''
                        }`}
                      />
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl bg-blue-50/70 p-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#185FA5]" />
        <p className="text-xs leading-5 text-gray-700">{detailText}</p>
      </div>
    </section>
  )
}
