import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DetailsView from './DetailsView'
import ApplyFlowView from './ApplyFlowView'

export default function OpportunityDetailsPanel({ opportunity, onClose, onApplied }) {
  const [panelState, setPanelState] = useState('details')
  const [applyStep, setApplyStep] = useState(1)
  const wasOpenRef = useRef(false)
  const navigate = useNavigate()
  const isOpen = !!opportunity

  // Reset back to the details view every time the panel transitions from closed to open.
  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      setPanelState('details')
      setApplyStep(1)
    }
    wasOpenRef.current = isOpen
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleSubmitted = () => {
    if (opportunity && typeof onApplied === 'function') onApplied(opportunity)
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40" onClick={onClose} aria-hidden="true" />}

      <aside
        className="fixed right-0 top-0 z-50 flex h-full w-[420px] flex-col transition-transform"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transitionDuration: isOpen ? '300ms' : '250ms',
          transitionTimingFunction: isOpen ? 'ease-out' : 'ease-in',
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(180, 210, 255, 0.5)',
          boxShadow: '-8px 0 32px rgba(30, 80, 200, 0.08)',
        }}
      >
        {opportunity && panelState === 'details' && (
          <DetailsView opportunity={opportunity} onClose={onClose} onApplyNow={() => setPanelState('applying')} />
        )}

        {opportunity && panelState === 'applying' && (
          <ApplyFlowView
            opportunity={opportunity}
            applyStep={applyStep}
            setApplyStep={setApplyStep}
            onClose={onClose}
            onSubmitted={handleSubmitted}
            onViewApplications={() => {
              onClose()
              navigate('/student/applications')
            }}
          />
        )}
      </aside>
    </>
  )
}
