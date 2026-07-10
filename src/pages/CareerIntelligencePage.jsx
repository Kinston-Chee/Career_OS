import React, { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import HomeTopNav from '../components/home/HomeTopNav'
import CareerPathCompanionPanel from '../components/careerPath/CareerPathCompanionPanel'
import DynamicModulePlaceholder from '../components/careerPath/DynamicModulePlaceholder'
import CareerPathNetworkGraph from '../components/career/network/CareerPathNetworkGraph'
import { candidateOverview, careerPathNetwork, mockUser } from '../data/mockData'

const COMPANION_MESSAGE =
  "This is your career path. I've mapped out possible directions based on your Career Memory.\n\nTap any role to explore it - I'll tell you how well you fit and what it takes to get there."

const ROLE_MESSAGES = {
  'software-engineer':
    "Software Engineer - solid choice. Based on your Career Memory, you're a 78% fit here.\n\nWhat do you want to explore?",
  'data-analyst':
    "Data Analyst - actually your highest fit role. Based on your NLP and data pipeline work at Grab, you're an 84% match here.\n\nWhat do you want to explore?",
  'product-manager':
    "Product Manager - interesting choice. Your leadership signals are strong, but this role needs more business strategy experience. You're a 61% fit right now.\n\nWhat do you want to explore?",
}

const EXPLORE_CHIPS = ['How well do I fit?', 'What skills do I need?', 'Show me the roadmap', 'Market demand']

const CHIP_FLOW = {
  'How well do I fit?': {
    module: 'fit',
    reply:
      'Your fit score is 78%. Your strongest signals are Python, Leadership, and NLP - all in demand for SWE roles. Your main gap is System Design experience.',
    chips: ['How do I close the gap?', 'Show me the roadmap'],
  },
  'What skills do I need?': {
    module: 'skills',
    reply:
      "For Software Engineer roles, the market prioritises these skills right now. You already have 4 of 7 - here's what to build.",
    chips: ['Where do I learn these?', 'Show me the roadmap'],
  },
  'Show me the roadmap': {
    module: 'roadmap',
    reply: "Here's your path to Software Engineer. You're currently at Stage 2. Estimated time to job-ready: 4 months.",
    chips: ['How well do I fit?', 'Market demand'],
  },
  'Market demand': {
    module: 'demand',
    reply:
      'Software Engineer is one of the highest demand roles in Malaysia right now. NLP and AI skills are giving candidates like you a significant edge.',
    chips: ['How well do I fit?', 'Show me the roadmap'],
  },
  'How do I close the gap?': {
    reply:
      "Focus on System Design first - it's the most common SWE interview topic and your biggest gap. I'd recommend starting with the Grokking System Design course.",
    chips: ['Show me learning resources', 'Show me the roadmap'],
  },
}

export default function CareerIntelligencePage() {
  const readiness = candidateOverview.careerSnapshot.readiness
  const [selectedPathId, setSelectedPathId] = useState(null)
  const [chatMessages, setChatMessages] = useState([{ id: 'intro', role: 'robot', text: COMPANION_MESSAGE }])
  const [isTyping, setIsTyping] = useState(false)
  const [chips, setChips] = useState(null)
  const [activeModule, setActiveModule] = useState(null)

  const addRobotReply = (text, nextChips, delay = 1000) => {
    setIsTyping(true)
    window.setTimeout(() => {
      setChatMessages((prev) => [...prev, { id: `robot-${Date.now()}`, role: 'robot', text }])
      setChips(nextChips)
      setIsTyping(false)
    }, delay)
  }

  const handleRoleSelect = (id) => {
    if (selectedPathId === id) {
      setSelectedPathId(null)
      setChips(null)
      setActiveModule(null)
      return
    }

    setSelectedPathId(id)
    setChips(null)
    setActiveModule(null)
    addRobotReply(
      ROLE_MESSAGES[id] ?? 'This role is part of your wider career map. Pick Software Engineer, Data Analyst, or Product Manager to explore the full demo flow.',
      EXPLORE_CHIPS,
    )
  }

  const handleChipClick = (chip) => {
    const flow = CHIP_FLOW[chip]
    setChips(null)
    setChatMessages((prev) => [...prev, { id: `user-${Date.now()}`, role: 'user', text: chip }])

    if (!flow) {
      addRobotReply('Demo resources are coming next. For now, use the roadmap and fit score to continue the flow.', ['Show me the roadmap'], 800)
      return
    }

    if (flow.module) setActiveModule(null)
    setIsTyping(true)
    window.setTimeout(() => {
      setChatMessages((prev) => [...prev, { id: `robot-${Date.now()}`, role: 'robot', text: flow.reply }])
      if (flow.module) setActiveModule(flow.module)
      setChips(flow.chips)
      setIsTyping(false)
    }, 1200)
  }

  const resetPath = () => {
    setSelectedPathId(null)
    setActiveModule(null)
    setChips(null)
  }

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-[#121a3a]">
      <HomeTopNav user={mockUser} readiness={readiness} />

      <div className="mx-auto max-w-[1480px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="min-w-0 lg:sticky lg:top-4 lg:self-start lg:h-[min(calc(100vh-2rem),36rem)]">
            <CareerPathCompanionPanel
              message={COMPANION_MESSAGE}
              messages={chatMessages}
              chips={chips}
              isTyping={isTyping}
              onChipClick={handleChipClick}
            />
          </div>

          <div className="min-w-0 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-[-0.01em] text-[#11194a] sm:text-3xl">Career Path</h1>
                <p className="mt-1 text-sm font-medium text-[#637094]">Your AI-mapped directions based on who you are.</p>
              </div>
              <button
                type="button"
                onClick={resetPath}
                className="flex flex-shrink-0 items-center gap-1.5 rounded-full border border-[#dfe8f7] bg-white px-4 py-2.5 text-sm font-bold text-[#35507d] shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
              >
                <RefreshCw size={15} strokeWidth={2.2} /> Regenerate path
              </button>
            </div>

            <CareerPathNetworkGraph
              network={careerPathNetwork}
              selectedPathId={selectedPathId}
              onSelectPath={handleRoleSelect}
            />

            <DynamicModulePlaceholder 
              activeModule={activeModule} 
              selectedRoleId={selectedPathId}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
