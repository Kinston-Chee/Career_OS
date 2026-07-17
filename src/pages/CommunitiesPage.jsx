import React, { useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  ChevronDown,
  Clock3,
  Code2,
  Eye,
  GraduationCap,
  Laptop,
  Lightbulb,
  MessageCircle,
  Palette,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react'
import HomeTopNav from '../components/home/HomeTopNav'
import TypewriterText from '../components/ui/TypewriterText'
import robotImage from '../assets/career-os-robot.png'
import { candidateOverview, mockUser } from '../data/mockData'

const communities = [
  { id: 'data-science', name: 'Data Science', icon: BarChart3, tone: 'blue', industry: 'Technology', path: 'Data Science', members: 5284, discussions: 684, activity: '2 minutes ago', description: 'Projects, interviews, internships and practical career advice for aspiring Data Scientists.' },
  { id: 'software-engineering', name: 'Software Engineering', icon: Code2, tone: 'indigo', industry: 'Technology', path: 'Software Engineering', members: 7130, discussions: 912, activity: '5 minutes ago', description: 'Build stronger engineering skills and learn from students and working developers.' },
  { id: 'business-analysis', name: 'Business Analysis', icon: BriefcaseBusiness, tone: 'emerald', industry: 'Business', path: 'Business Analysis', members: 3126, discussions: 426, activity: '11 minutes ago', description: 'Discuss case interviews, requirements, stakeholder work and analyst career paths.' },
  { id: 'machine-learning', name: 'Machine Learning', icon: Sparkles, tone: 'violet', industry: 'Technology', path: 'Machine Learning', members: 2487, discussions: 318, activity: '18 minutes ago', description: 'Share ML projects, learning resources and advice for moving into applied AI roles.' },
  { id: 'cybersecurity', name: 'Cybersecurity', icon: ShieldCheck, tone: 'rose', industry: 'Technology', path: 'Cybersecurity', members: 2814, discussions: 355, activity: '24 minutes ago', description: 'Learn from security students and practitioners through real scenarios and resources.' },
  { id: 'product-management', name: 'Product Management', icon: Lightbulb, tone: 'amber', industry: 'Product', path: 'Product Management', members: 2218, discussions: 296, activity: '31 minutes ago', description: 'Explore product thinking, APM applications, case studies and stakeholder skills.' },
  { id: 'ui-ux-design', name: 'UI/UX Design', icon: Palette, tone: 'rose', industry: 'Design', path: 'UI/UX Design', members: 1972, discussions: 274, activity: '42 minutes ago', description: 'Get portfolio feedback and exchange practical design process and interview advice.' },
  { id: 'graduate-careers', name: 'Graduate Careers Malaysia', icon: GraduationCap, tone: 'emerald', industry: 'Cross-industry', path: 'Graduate Jobs', members: 4316, discussions: 588, activity: '1 hour ago', description: 'Navigate graduate programmes, career fairs and early-career applications together.' },
  { id: 'women-in-tech', name: 'Women in Tech', icon: Laptop, tone: 'violet', industry: 'Technology', path: 'Women in Tech', members: 3648, discussions: 472, activity: '7 minutes ago', description: 'A supportive space for women building careers across software, data, product, design and emerging technology.' },
]

const recommended = [
  { communityId: 'data-science', match: 97 },
  { communityId: 'business-analysis', match: 95 },
  { communityId: 'machine-learning', match: 93 },
  { communityId: 'software-engineering', match: 91 },
]

const initialDiscussions = [
  { id: 'post-1', communityId: 'data-science', author: 'Aina Rahman', initials: 'AR', university: "Taylor's University", time: '2 hours ago', category: 'Interview Experiences', title: 'My Shopee Data Analyst interview experience', preview: 'Sharing the SQL questions, case study and presentation format I received during the process...', replies: 24, views: 186, lastReply: '18 minutes ago', tags: ['SQL', 'Interview'] },
  { id: 'post-2', communityId: 'data-science', author: 'Jason Lim', initials: 'JL', university: 'Monash University Malaysia', time: '4 hours ago', category: 'Resume Reviews', title: 'Can someone review my resume before I apply to Grab?', preview: 'I am applying for a Data Analyst internship and would appreciate feedback on how I describe my dashboard project.', replies: 15, views: 104, lastReply: '1 hour ago', tags: ['Resume', 'Internship'] },
  { id: 'post-3', communityId: 'data-science', author: 'Nur Izzati', initials: 'NI', university: 'Universiti Malaya', time: 'Yesterday', category: 'Learning Resources', title: 'Best SQL course for beginners?', preview: 'I have basic Excel knowledge and want a practical SQL course with projects before internship applications.', replies: 32, views: 241, lastReply: '36 minutes ago', tags: ['SQL', 'Learning'] },
  { id: 'post-4', communityId: 'data-science', author: 'Marcus Tan', initials: 'MT', university: 'Sunway University', time: 'Yesterday', category: 'Projects', title: 'Looking for feedback on my Power BI dashboard', preview: 'I built a Malaysian e-commerce sales dashboard and would love feedback on the story and visual hierarchy.', replies: 18, views: 137, lastReply: '2 hours ago', tags: ['Power BI', 'Portfolio'] },
  { id: 'post-5', communityId: 'business-analysis', author: 'Siti Hajar', initials: 'SH', university: 'Universiti Teknologi MARA', time: '3 hours ago', category: 'Interview Experiences', title: 'What to expect during a Deloitte interview', preview: 'Here is how my analyst interview was structured, including the group case and stakeholder questions.', replies: 21, views: 162, lastReply: '44 minutes ago', tags: ['Deloitte', 'Interview'] },
  { id: 'post-6', communityId: 'business-analysis', author: 'Ethan Wong', initials: 'EW', university: 'HELP University', time: 'Yesterday', category: 'Career Advice', title: 'Is a portfolio necessary for Business Analysts?', preview: 'I have case studies from class but no public portfolio. What evidence helped you get interviews?', replies: 28, views: 209, lastReply: '3 hours ago', tags: ['Portfolio', 'Business Analysis'] },
  { id: 'post-7', communityId: 'machine-learning', author: 'Hafiz Musa', initials: 'HM', university: 'Asia Pacific University', time: '5 hours ago', category: 'Learning Resources', title: 'Should I learn Python before Power BI?', preview: 'My goal is analytics first and machine learning later. I am unsure which skill should come first.', replies: 35, views: 276, lastReply: '22 minutes ago', tags: ['Python', 'Power BI'] },
  { id: 'post-8', communityId: 'software-engineering', author: 'Chloe Ng', initials: 'CN', university: 'UCSI University', time: 'Yesterday', category: 'Internships', title: 'How I landed my software internship at Grab', preview: 'The projects, coding preparation and referral conversation that helped me secure the role.', replies: 41, views: 354, lastReply: '12 minutes ago', tags: ['Grab', 'Internship'] },
  { id: 'post-9', communityId: 'graduate-careers', author: 'Bryan Lee', initials: 'BL', university: "Taylor's University", time: '2 days ago', category: 'Career Advice', title: 'My experience attending the Career Fair', preview: 'What I brought, which employer questions worked and how I followed up after the event.', replies: 19, views: 148, lastReply: 'Yesterday', tags: ['Career Fair', 'Networking'] },
  { id: 'post-10', communityId: 'cybersecurity', author: 'Amir Hakim', initials: 'AH', university: 'Asia Pacific University', time: '1 hour ago', category: 'Projects', title: 'How should I present my CTF experience in a portfolio?', preview: 'I completed several beginner CTF challenges but I am unsure how much detail recruiters want to see in a write-up.', replies: 22, views: 174, lastReply: '14 minutes ago', tags: ['CTF', 'Portfolio'] },
  { id: 'post-11', communityId: 'cybersecurity', author: 'Mei Xin Low', initials: 'ML', university: 'Multimedia University', time: '5 hours ago', category: 'Certifications', title: 'Security+ or Google Cybersecurity Certificate first?', preview: 'For a student aiming at a SOC internship in Malaysia, which certification creates the strongest practical foundation?', replies: 31, views: 228, lastReply: '47 minutes ago', tags: ['Security+', 'SOC'] },
  { id: 'post-12', communityId: 'cybersecurity', author: 'Danish Firdaus', initials: 'DF', university: 'Universiti Teknologi Malaysia', time: 'Yesterday', category: 'Internships', title: 'What I learned during my first SOC internship', preview: 'A realistic look at alert triage, documentation, shift handovers and the skills I wish I had practised earlier.', replies: 27, views: 203, lastReply: '2 hours ago', tags: ['SOC', 'Internship'] },
  { id: 'post-13', communityId: 'product-management', author: 'Nadia Wong', initials: 'NW', university: 'Sunway University', time: '2 hours ago', category: 'Projects', title: 'Feedback on my food delivery product case study', preview: 'I redesigned the restaurant discovery flow and would appreciate feedback on my problem framing and prioritisation.', replies: 18, views: 139, lastReply: '28 minutes ago', tags: ['Case Study', 'Product'] },
  { id: 'post-14', communityId: 'product-management', author: 'Imran Zulkifli', initials: 'IZ', university: "Taylor's University", time: '6 hours ago', category: 'Interview Experiences', title: 'My AirAsia APM case interview experience', preview: 'The interview focused on customer pain points, success metrics and how I would prioritise competing solutions.', replies: 25, views: 192, lastReply: '1 hour ago', tags: ['APM', 'Interview'] },
  { id: 'post-15', communityId: 'product-management', author: 'Rachel Teh', initials: 'RT', university: 'Monash University Malaysia', time: 'Yesterday', category: 'Career Advice', title: 'Can I move from Business Analyst to Product Manager?', preview: 'I enjoy requirements and stakeholder work but want more product ownership. What experience should I build next?', replies: 34, views: 267, lastReply: '39 minutes ago', tags: ['Career Switch', 'Product'] },
  { id: 'post-16', communityId: 'ui-ux-design', author: 'Samantha Lee', initials: 'SL', university: 'The One Academy', time: '48 minutes ago', category: 'Projects', title: 'Portfolio feedback for my healthcare app redesign', preview: 'I want to make sure the case study explains my research decisions instead of showing only polished screens.', replies: 16, views: 118, lastReply: '9 minutes ago', tags: ['Portfolio', 'UX Research'] },
  { id: 'post-17', communityId: 'ui-ux-design', author: 'Farhan Rosli', initials: 'FR', university: 'Limkokwing University', time: '4 hours ago', category: 'Interview Experiences', title: 'What happened in my Shopee product design interview', preview: 'Sharing the whiteboard task, portfolio questions and collaboration scenarios from the interview.', replies: 29, views: 216, lastReply: '33 minutes ago', tags: ['Shopee', 'Design Interview'] },
  { id: 'post-18', communityId: 'ui-ux-design', author: 'Jia Min Ong', initials: 'JO', university: 'UCSI University', time: 'Yesterday', category: 'Learning Resources', title: 'Best way to practise UX research without a client?', preview: 'I need realistic research evidence for my portfolio but do not currently have access to a company project.', replies: 23, views: 181, lastReply: '2 hours ago', tags: ['UX Research', 'Portfolio'] },
  { id: 'post-19', communityId: 'women-in-tech', author: 'Alyssa Tan', initials: 'AT', university: 'Universiti Malaya', time: '35 minutes ago', category: 'Career Advice', title: 'Finding women mentors in software engineering', preview: 'I would love advice on approaching senior engineers respectfully and building a genuine mentorship relationship.', replies: 26, views: 194, lastReply: '6 minutes ago', tags: ['Mentorship', 'Software Engineering'] },
  { id: 'post-20', communityId: 'women-in-tech', author: 'Nur Amalina', initials: 'NA', university: 'Universiti Teknologi MARA', time: '3 hours ago', category: 'Internships', title: 'My first week as a cloud engineering intern', preview: 'What surprised me, how I handled feeling underqualified and the technical habits that helped me settle in.', replies: 38, views: 302, lastReply: '21 minutes ago', tags: ['Cloud', 'Internship'] },
  { id: 'post-21', communityId: 'women-in-tech', author: 'Priya Nair', initials: 'PN', university: 'Monash University Malaysia', time: 'Yesterday', category: 'Projects', title: "Looking for teammates for a women's health hackathon project", preview: 'I am exploring an accessible health information tool and looking for women interested in product, design or ML.', replies: 19, views: 157, lastReply: '54 minutes ago', tags: ['Hackathon', 'Machine Learning'] },
  { id: 'post-22', communityId: 'women-in-tech', author: 'Grace Lim', initials: 'GL', university: 'Asia Pacific University', time: 'Yesterday', category: 'Interview Experiences', title: 'How I negotiated my graduate developer offer', preview: 'Sharing the research, wording and confidence-building steps that helped me discuss compensation professionally.', replies: 42, views: 341, lastReply: '17 minutes ago', tags: ['Graduate Job', 'Negotiation'] },
]

const discussionCategories = ['All', 'General Questions', 'Interview Experiences', 'Resume Reviews', 'Projects', 'Learning Resources', 'Career Advice', 'Internships', 'Certifications']

const toneClasses = {
  blue: 'border-blue-100 bg-blue-50 text-blue-700',
  indigo: 'border-indigo-100 bg-indigo-50 text-indigo-700',
  emerald: 'border-emerald-100 bg-emerald-50 text-emerald-700',
  violet: 'border-violet-100 bg-violet-50 text-violet-700',
  rose: 'border-rose-100 bg-rose-50 text-rose-700',
  amber: 'border-amber-100 bg-amber-50 text-amber-700',
}

function formatCount(value) {
  return new Intl.NumberFormat('en-MY').format(value)
}

function ModalShell({ title, description, onClose, children, size = 'max-w-xl' }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 px-4 py-6 backdrop-blur-sm" onMouseDown={onClose}>
      <section role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => event.stopPropagation()} className={`max-h-[88vh] w-full ${size} overflow-y-auto rounded-2xl border border-white/80 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.18)]`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#11194a]">{title}</h2>
            {description && <p className="mt-1 text-sm font-medium leading-6 text-[#637094]">{description}</p>}
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-2 text-[#7382a1] transition hover:bg-blue-50 hover:text-blue-700"><X size={18} /></button>
        </div>
        <div className="mt-5">{children}</div>
      </section>
    </div>
  )
}

function CommunityCard({ community, joined, onJoin, onOpen }) {
  const Icon = community.icon
  return (
    <article className="flex min-h-[260px] flex-col rounded-2xl border border-[#e2eaf8] bg-white p-5 shadow-[0_8px_22px_rgba(44,76,142,0.07)] transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_14px_32px_rgba(37,99,235,0.10)]">
      <div className="flex items-start justify-between gap-3">
        <span className={`flex h-12 w-12 items-center justify-center rounded-xl border ${toneClasses[community.tone]}`}><Icon size={22} /></span>
        <span className="text-xs font-semibold text-[#8a96af]">Active {community.activity}</span>
      </div>
      <button type="button" disabled={!joined} onClick={onOpen} className={`mt-4 text-left text-lg font-bold transition ${joined ? 'text-[#11194a] hover:text-blue-700' : 'cursor-default text-[#11194a]'}`}>{community.name}</button>
      <p className="mt-2 text-sm font-medium leading-6 text-[#637094]">{community.description}</p>
      <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-[#52627f]">
        <span className="flex items-center gap-1.5"><Users size={13} /> {formatCount(community.members)} Members</span>
        <span className="flex items-center gap-1.5"><MessageCircle size={13} /> {formatCount(community.discussions)} Discussions</span>
      </div>
      <div className="mt-auto flex gap-2 pt-5">
        {joined && <button type="button" onClick={onOpen} className="h-10 flex-1 rounded-xl border border-blue-100 bg-white text-sm font-bold text-blue-700 transition hover:bg-blue-50">Open</button>}
        <button type="button" onClick={onJoin} className={`h-10 flex-1 rounded-xl text-sm font-bold transition ${joined ? 'border border-emerald-200 bg-emerald-50 text-emerald-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>{joined ? 'Joined' : 'Join'}</button>
      </div>
    </article>
  )
}

function DiscussionCard({ discussion, onOpen }) {
  return (
    <article className="rounded-2xl border border-[#e2eaf8] bg-white p-5 shadow-[0_8px_22px_rgba(44,76,142,0.06)] transition hover:border-blue-200 hover:shadow-[0_12px_28px_rgba(37,99,235,0.08)]">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">{discussion.initials}</span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-sm font-bold text-[#26365c]">{discussion.author}</span>
            <span className="text-xs font-medium text-[#8a96af]">{discussion.university}</span>
            <span className="text-xs font-medium text-[#a0abc2]">· {discussion.time}</span>
          </div>
          <span className="mt-2 inline-flex rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-bold text-violet-700">{discussion.category}</span>
          <button type="button" onClick={onOpen} className="mt-3 block text-left text-lg font-bold text-[#11194a] transition hover:text-blue-700">{discussion.title}</button>
          <p className="mt-2 text-sm font-medium leading-6 text-[#637094]">{discussion.preview}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#7382a1]">
            <span className="flex items-center gap-1.5"><MessageCircle size={13} /> {discussion.replies} Replies</span>
            <span className="flex items-center gap-1.5"><Eye size={13} /> {discussion.views} Views</span>
            <span className="flex items-center gap-1.5"><Clock3 size={13} /> Last reply {discussion.lastReply}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

function CreateDiscussionModal({ community, discussions, onClose, onSubmit, onOpenDiscussion }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('General Questions')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')

  const similar = useMemo(() => {
    if (title.trim().length < 8) return []
    const words = title.toLowerCase().split(/\s+/).filter((word) => word.length > 3)
    const ranked = discussions
      .map((discussion) => ({ discussion, score: words.filter((word) => discussion.title.toLowerCase().includes(word) || discussion.preview.toLowerCase().includes(word)).length }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.discussion)
    return ranked.length > 0 ? ranked : discussions.slice(0, 3)
  }, [discussions, title])

  return (
    <ModalShell title="Create a discussion" description={`Ask the ${community.name} community and learn from real experiences.`} onClose={onClose} size="max-w-2xl">
      <form onSubmit={(event) => { event.preventDefault(); onSubmit({ title, category, content, tags }) }} className="space-y-4">
        <label className="block text-sm font-semibold text-[#26365c]">Discussion Title
          <input required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="What would you like to ask or share?" className="mt-2 h-11 w-full rounded-xl border border-[#dfe8f7] px-3 text-sm font-medium outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50" />
        </label>

        {similar.length > 0 && (
          <div className="rounded-2xl border border-violet-100 bg-violet-50/55 p-4">
            <p className="flex items-center gap-1.5 text-sm font-bold text-violet-800"><Sparkles size={15} /> We found similar discussions that may answer your question.</p>
            <div className="mt-3 space-y-2">
              {similar.map((discussion) => (
                <button key={discussion.id} type="button" onClick={() => onOpenDiscussion(discussion)} className="flex w-full items-center justify-between gap-3 rounded-xl bg-white px-3 py-2.5 text-left shadow-sm transition hover:bg-blue-50">
                  <span className="text-sm font-semibold text-[#26365c]">{discussion.title}</span>
                  <span className="shrink-0 text-xs font-bold text-blue-700">{discussion.replies} replies</span>
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs font-medium text-[#637094]">You can open an existing answer or continue creating your own discussion below.</p>
          </div>
        )}

        <label className="block text-sm font-semibold text-[#26365c]">Category
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#dfe8f7] bg-white px-3 text-sm font-medium outline-none focus:border-blue-300">
            {discussionCategories.filter((item) => item !== 'All').map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="block text-sm font-semibold text-[#26365c]">Content
          <textarea required rows={5} value={content} onChange={(event) => setContent(event.target.value)} placeholder="Add context so others can give useful, specific advice..." className="mt-2 w-full resize-none rounded-xl border border-[#dfe8f7] p-3 text-sm font-medium outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50" />
        </label>
        <label className="block text-sm font-semibold text-[#26365c]">Optional Tags
          <input value={tags} onChange={(event) => setTags(event.target.value)} placeholder="SQL, Resume, Internship, Python" className="mt-2 h-11 w-full rounded-xl border border-[#dfe8f7] px-3 text-sm font-medium outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50" />
        </label>
        <div className="flex justify-end gap-3 pt-1">
          <button type="button" onClick={onClose} className="h-11 rounded-xl border border-[#dfe8f7] px-4 text-sm font-bold text-[#52627f]">Cancel</button>
          <button type="submit" className="h-11 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(37,99,235,0.20)] hover:bg-blue-700">Submit Discussion</button>
        </div>
      </form>
    </ModalShell>
  )
}

export default function CommunitiesPage() {
  const readiness = candidateOverview.careerSnapshot.readiness
  const browseRef = useRef(null)
  const [joinedIds, setJoinedIds] = useState(['data-science'])
  const [selectedCommunityId, setSelectedCommunityId] = useState(null)
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [industry, setIndustry] = useState('')
  const [careerPath, setCareerPath] = useState('')
  const [popularity, setPopularity] = useState('Most Popular')
  const [discussionCategory, setDiscussionCategory] = useState('All')
  const [discussions, setDiscussions] = useState(initialDiscussions)
  const [showCreate, setShowCreate] = useState(false)
  const [selectedDiscussion, setSelectedDiscussion] = useState(null)
  const [toast, setToast] = useState('')
  const [showRecommendations, setShowRecommendations] = useState(false)

  const selectedCommunity = communities.find((community) => community.id === selectedCommunityId)
  const recommendedCommunities = recommended.map((item) => ({ ...communities.find((community) => community.id === item.communityId), match: item.match }))
  const companionMessage = `Based on your Career Goal and Career Intelligence, I found ${recommendedCommunities.length} communities where people are having conversations relevant to your journey.`

  const filteredCommunities = useMemo(() => {
    const query = searchQuery.toLowerCase()
    const result = communities.filter((community) => (!query || `${community.name} ${community.description}`.toLowerCase().includes(query)) && (!industry || community.industry === industry) && (!careerPath || community.path === careerPath))
    return [...result].sort((a, b) => popularity === 'Most Active' ? a.activity.localeCompare(b.activity) : popularity === 'Most Discussions' ? b.discussions - a.discussions : b.members - a.members)
  }, [careerPath, industry, popularity, searchQuery])

  const communityDiscussions = useMemo(() => {
    if (!selectedCommunity) return []
    const direct = discussions.filter((discussion) => discussion.communityId === selectedCommunity.id)
    return discussionCategory === 'All' ? direct : direct.filter((discussion) => discussion.category === discussionCategory)
  }, [discussionCategory, discussions, selectedCommunity])

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2400)
  }

  const toggleJoin = (communityId) => {
    setJoinedIds((current) => {
      const joined = current.includes(communityId)
      showToast(joined ? 'Left community.' : 'Welcome to the community.')
      if (joined && selectedCommunityId === communityId) setSelectedCommunityId(null)
      return joined ? current.filter((id) => id !== communityId) : [...current, communityId]
    })
  }

  const openCommunity = (communityId) => {
    if (!joinedIds.includes(communityId)) {
      showToast('Join this community before opening its discussions.')
      return
    }
    setSelectedCommunityId(communityId)
    setDiscussionCategory('All')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submitDiscussion = ({ title, category, content, tags }) => {
    const newDiscussion = { id: `post-${Date.now()}`, communityId: selectedCommunity.id, author: mockUser.name, initials: mockUser.avatarInitials, university: "Taylor's University", time: 'Just now', category, title, preview: content, replies: 0, views: 1, lastReply: 'Just now', tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean) }
    setDiscussions((current) => [newDiscussion, ...current])
    setShowCreate(false)
    setDiscussionCategory('All')
    showToast('Your discussion is now live.')
  }

  if (selectedCommunity) {
    const Icon = selectedCommunity.icon
    return (
      <div className="min-h-screen bg-[#f6f9ff] text-[#121a3a]">
        <HomeTopNav user={mockUser} readiness={readiness} />
        <main className="mx-auto max-w-[1280px] px-4 py-5 sm:px-6 lg:px-8">
          <button type="button" onClick={() => setSelectedCommunityId(null)} className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700"><ArrowLeft size={16} /> All Communities</button>
          <section className="mt-4 rounded-2xl border border-[#dfe8fb] bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(245,243,255,0.80))] p-6 shadow-[0_10px_28px_rgba(38,72,140,0.08)] sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${toneClasses[selectedCommunity.tone]}`}><Icon size={25} /></span>
                <div>
                  <h1 className="text-2xl font-bold text-[#11194a] sm:text-3xl">{selectedCommunity.name} Community</h1>
                  <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-[#637094]">{selectedCommunity.description}</p>
                  <p className="mt-3 flex flex-wrap gap-4 text-xs font-semibold text-[#52627f]"><span>{formatCount(selectedCommunity.members)} Members</span><span>{formatCount(selectedCommunity.discussions)} Discussions</span></p>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button type="button" onClick={() => toggleJoin(selectedCommunity.id)} className={`h-11 rounded-xl px-4 text-sm font-bold ${joinedIds.includes(selectedCommunity.id) ? 'border border-emerald-200 bg-emerald-50 text-emerald-700' : 'border border-blue-200 bg-white text-blue-700'}`}>{joinedIds.includes(selectedCommunity.id) ? 'Joined' : 'Join Community'}</button>
                <button type="button" onClick={() => setShowCreate(true)} className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white shadow-[0_12px_28px_rgba(37,99,235,0.20)] hover:bg-blue-700"><Plus size={16} /> Create Discussion</button>
              </div>
            </div>
          </section>

          <section className="mt-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {discussionCategories.map((category) => <button key={category} type="button" onClick={() => setDiscussionCategory(category)} className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-bold transition ${discussionCategory === category ? 'border-blue-600 bg-blue-600 text-white' : 'border-[#dfe8f7] bg-white text-[#52627f] hover:border-blue-200 hover:bg-blue-50'}`}>{category}</button>)}
            </div>
            <div className="mt-4 grid gap-4">
              {communityDiscussions.map((discussion) => <DiscussionCard key={discussion.id} discussion={discussion} onOpen={() => setSelectedDiscussion(discussion)} />)}
              {communityDiscussions.length === 0 && <div className="rounded-2xl border border-dashed border-blue-200 bg-white p-10 text-center"><p className="font-bold text-[#11194a]">No discussions in this category yet.</p><button type="button" onClick={() => setShowCreate(true)} className="mt-3 text-sm font-bold text-blue-700">Start the first discussion</button></div>}
            </div>
          </section>
        </main>

        {showCreate && <CreateDiscussionModal community={selectedCommunity} discussions={discussions} onClose={() => setShowCreate(false)} onSubmit={submitDiscussion} onOpenDiscussion={(discussion) => { setShowCreate(false); setSelectedDiscussion(discussion) }} />}
        {selectedDiscussion && <ModalShell title={selectedDiscussion.title} description={`${selectedDiscussion.author} · ${selectedDiscussion.university} · ${selectedDiscussion.time}`} onClose={() => setSelectedDiscussion(null)}><span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-bold text-violet-700">{selectedDiscussion.category}</span><p className="mt-4 text-sm font-medium leading-7 text-[#3a4669]">{selectedDiscussion.preview}</p><div className="mt-5 flex gap-4 border-t border-[#e2eaf8] pt-4 text-xs font-semibold text-[#7382a1]"><span>{selectedDiscussion.replies} Replies</span><span>{selectedDiscussion.views} Views</span></div><textarea rows={3} placeholder="Share a helpful reply..." className="mt-5 w-full resize-none rounded-xl border border-[#dfe8f7] p-3 text-sm outline-none focus:border-blue-300" /><button type="button" onClick={() => { setSelectedDiscussion(null); showToast('Your reply was posted.') }} className="mt-3 h-10 w-full rounded-xl bg-blue-600 text-sm font-bold text-white">Post Reply</button></ModalShell>}
        {toast && <div className="fixed bottom-5 right-5 z-[60] rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm font-semibold text-[#26365c] shadow-[0_18px_44px_rgba(37,99,235,0.16)]">{toast}</div>}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-[#121a3a]">
      <HomeTopNav user={mockUser} readiness={readiness} />
      <main className="mx-auto max-w-[1480px] px-4 py-5 sm:px-6 lg:px-8">
        <header>
          <h1 className="text-2xl font-bold tracking-[-0.01em] text-[#11194a] sm:text-3xl">Communities</h1>
          <p className="mt-1 max-w-3xl text-sm font-medium text-[#637094]">Connect with people who share your career goals, ask questions, exchange experiences, and learn from those who have already taken the path you're on.</p>
        </header>

        <section className="relative mt-5 overflow-hidden rounded-2xl border border-[#dfe8fb] bg-white shadow-[0_10px_28px_rgba(38,72,140,0.08)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(167,139,250,0.20),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.96),rgba(239,246,255,0.84))]" />
          <div className="relative grid grid-cols-1 gap-5 px-5 py-6 sm:px-8 lg:grid-cols-[minmax(330px,0.9fr)_minmax(0,1.55fr)]">
            <div className="flex items-center gap-5">
              <img src={robotImage} alt="CareerOS companion robot" className="h-28 w-28 flex-shrink-0 object-contain drop-shadow-[0_18px_24px_rgba(37,99,235,0.22)] sm:h-36 sm:w-36 lg:h-40 lg:w-40" />
              <p className="text-xl font-semibold leading-tight text-[#11194a] sm:text-2xl">
                <TypewriterText text={companionMessage} speed={20} onComplete={() => setShowRecommendations(true)} />
              </p>
            </div>
            <div className="min-w-0">
              <div className="flex gap-3 overflow-x-auto pb-2">
                {showRecommendations && recommendedCommunities.map((community, index) => (
                  <article key={community.id} className="min-w-[230px] rounded-xl border border-white/80 bg-white/78 p-4 shadow-[0_12px_30px_rgba(37,99,235,0.10)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white" style={{ animation: 'chatFadeIn 200ms ease both', animationDelay: `${index * 70}ms` }}>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">{community.match}% Match</span>
                    <h3 className="mt-3 font-bold text-[#11194a]">{community.name} Community</h3>
                    <p className="mt-1 text-xs font-semibold text-[#7382a1]">{formatCount(community.members)} Members</p>
                    <p className="mt-3 min-h-[54px] text-xs font-medium leading-5 text-[#637094]">{community.description}</p>
                    <button type="button" onClick={() => toggleJoin(community.id)} className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-700">{joinedIds.includes(community.id) ? 'Joined' : 'Join Community'} <ArrowRight size={13} /></button>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section ref={browseRef} className="mt-5 rounded-2xl border border-[#e2eaf8] bg-white p-4 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
          <div className="grid gap-3 lg:grid-cols-[minmax(260px,1fr)_180px_200px_170px_auto]">
            <label className="flex h-12 items-center gap-3 rounded-xl border border-[#dfe8f7] px-4"><Search size={18} className="text-[#8a96af]" /><input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && setSearchQuery(searchInput.trim())} placeholder="Search communities..." className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-[#9aa6c3]" /></label>
            <label className="relative"><span className="sr-only">Industry</span><select value={industry} onChange={(event) => setIndustry(event.target.value)} className="h-12 w-full appearance-none rounded-xl border border-[#dfe8f7] bg-white px-4 pr-9 text-sm font-semibold text-[#52627f]"><option value="">Industry</option>{['Technology', 'Business', 'Product', 'Design', 'Cross-industry'].map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={15} className="pointer-events-none absolute right-3 top-4 text-[#8a96af]" /></label>
            <label className="relative"><span className="sr-only">Career Path</span><select value={careerPath} onChange={(event) => setCareerPath(event.target.value)} className="h-12 w-full appearance-none rounded-xl border border-[#dfe8f7] bg-white px-4 pr-9 text-sm font-semibold text-[#52627f]"><option value="">Career Path</option>{communities.map((item) => <option key={item.id}>{item.path}</option>)}</select><ChevronDown size={15} className="pointer-events-none absolute right-3 top-4 text-[#8a96af]" /></label>
            <label className="relative"><span className="sr-only">Popularity</span><select value={popularity} onChange={(event) => setPopularity(event.target.value)} className="h-12 w-full appearance-none rounded-xl border border-[#dfe8f7] bg-white px-4 pr-9 text-sm font-semibold text-[#52627f]"><option>Most Popular</option><option>Most Active</option><option>Most Discussions</option></select><ChevronDown size={15} className="pointer-events-none absolute right-3 top-4 text-[#8a96af]" /></label>
            <button type="button" onClick={() => { setSearchQuery(searchInput.trim()); browseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }} className="h-12 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-[0_14px_30px_rgba(37,99,235,0.22)] hover:bg-blue-700">Explore Communities</button>
          </div>
        </section>

        <section className="mt-7">
          <div className="flex items-end justify-between gap-3"><div><h2 className="text-xl font-bold text-[#11194a]">Featured Communities</h2><p className="mt-1 text-sm font-medium text-[#637094]">Curated spaces for focused, useful career conversations.</p></div><span className="text-xs font-semibold text-[#8a96af]">{filteredCommunities.length} communities</span></div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filteredCommunities.map((community) => <CommunityCard key={community.id} community={community} joined={joinedIds.includes(community.id)} onJoin={() => toggleJoin(community.id)} onOpen={() => openCommunity(community.id)} />)}</div>
          {filteredCommunities.length === 0 && <div className="mt-4 rounded-2xl border border-dashed border-blue-200 bg-white p-10 text-center"><p className="font-bold text-[#11194a]">No communities match these filters.</p><button type="button" onClick={() => { setSearchInput(''); setSearchQuery(''); setIndustry(''); setCareerPath('') }} className="mt-3 text-sm font-bold text-blue-700">Clear filters</button></div>}
        </section>
      </main>
      {toast && <div className="fixed bottom-5 right-5 z-[60] rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm font-semibold text-[#26365c] shadow-[0_18px_44px_rgba(37,99,235,0.16)]">{toast}</div>}
    </div>
  )
}
