import { create } from 'zustand'
import {
  computeAnimals,
  computeConfidence,
  generateNarrative,
  getConfidenceMessage,
  scoreAnswers,
} from '../data/selfDiscoveryEngine'

const STORAGE_KEY = 'careeros-self-discovery'

function loadPersistedState() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

function persistState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      dimensions: state.dimensions,
      primaryAnimal: state.primaryAnimal,
      emergingAnimal: state.emergingAnimal,
      answers: state.answers,
      narrative: state.narrative,
      strengthReasons: state.strengthReasons,
      confidence: state.confidence,
      confidenceMessage: state.confidenceMessage,
      completedAt: state.completedAt,
      evidenceLog: state.evidenceLog,
      completedDeeperAt: state.completedDeeperAt,
      workingStyleSpectrums: state.workingStyleSpectrums,
    }))
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

const saved = loadPersistedState()

export const useSelfDiscoveryStore = create((set, get) => ({
  // ── State ──────────────────────────────────────────────────────────────
  dimensions: saved?.dimensions ?? null,
  primaryAnimal: saved?.primaryAnimal ?? null,
  emergingAnimal: saved?.emergingAnimal ?? null,
  answers: saved?.answers ?? [],
  narrative: saved?.narrative ?? null,
  strengthReasons: saved?.strengthReasons ?? [],
  confidence: saved?.confidence ?? 0,
  confidenceMessage: saved?.confidenceMessage ?? '',
  completedAt: saved?.completedAt ?? null,
  completedDeeperAt: saved?.completedDeeperAt ?? null,
  workingStyleSpectrums: saved?.workingStyleSpectrums ?? null,
  evidenceLog: saved?.evidenceLog ?? [],

  // ── Computed ───────────────────────────────────────────────────────────
  hasCompleted: () => get().completedAt !== null,

  // ── Actions ────────────────────────────────────────────────────────────

  /**
   * Complete the assessment with the given answers.
   * Scores dimensions, computes animals, generates narrative.
   */
  completeAssessment: (rawAnswers) => {
    const dimensions = scoreAnswers(rawAnswers)
    const { primary, emerging } = computeAnimals(dimensions)
    const { paragraphs, strengthReasons } = generateNarrative(dimensions, primary)
    const confidence = computeConfidence(true, 0)
    const confidenceMessage = getConfidenceMessage(confidence)

    const newState = {
      dimensions,
      primaryAnimal: {
        id: primary.id,
        name: primary.name,
        emoji: primary.emoji,
        archetype: primary.archetype,
        category: primary.category,
        personality: primary.personality,
        strengths: primary.strengths,
        growthAreas: primary.growthAreas,
        preferredEnvironment: primary.preferredEnvironment,
        suggestedRoles: primary.suggestedRoles,
        shortSummary: primary.shortSummary,
      },
      emergingAnimal: emerging ? {
        id: emerging.id,
        name: emerging.name,
        emoji: emerging.emoji,
        archetype: emerging.archetype,
        category: emerging.category,
        shortSummary: emerging.shortSummary,
      } : null,
      answers: rawAnswers,
      narrative: paragraphs,
      strengthReasons,
      confidence,
      confidenceMessage,
      completedAt: new Date().toISOString(),
      evidenceLog: [{
        source: 'Self-Discovery Assessment',
        date: new Date().toISOString(),
        dimensionChanges: { ...dimensions },
      }],
    }

    set(newState)
    persistState({ ...get(), ...newState })
  },

  completeDeeperAssessment: (spectrums) => {
    const newState = {
      completedDeeperAt: new Date().toISOString(),
      workingStyleSpectrums: spectrums,
      confidence: 40,
      confidenceMessage: 'Deeper Working Style metrics calculated. Add experiences to increase confidence further.',
    }
    set(newState)
    persistState({ ...get(), ...newState })
  },

  resetDeeperAssessment: () => {
    const newState = {
      completedDeeperAt: null,
      workingStyleSpectrums: null,
      confidence: 30,
      confidenceMessage: 'Initial estimate calculated from onboarding responses.',
    }
    set(newState)
    persistState({ ...get(), ...newState })
  },

  /**
   * Clear assessment data to allow retaking.
   */
  retakeAssessment: () => {
    const resetState = {
      dimensions: null,
      primaryAnimal: null,
      emergingAnimal: null,
      answers: [],
      narrative: null,
      strengthReasons: [],
      confidence: 0,
      confidenceMessage: '',
      completedAt: null,
      completedDeeperAt: null,
      workingStyleSpectrums: null,
      evidenceLog: [],
    }
    set(resetState)
    try { window.localStorage.removeItem(STORAGE_KEY) } catch { /* noop */ }
  },

  /**
   * Full reset — same as retakeAssessment for now.
   */
  resetDiscovery: () => {
    get().retakeAssessment()
  },
}))
