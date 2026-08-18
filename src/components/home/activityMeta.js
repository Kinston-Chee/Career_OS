import { Award, BarChart3, Briefcase, Eye, FileText, MessageCircle, Sparkles, Target, Users } from 'lucide-react'

export const ACTIVITY_ICONS = {
  Sparkles,
  Briefcase,
  FileText,
  Award,
  Users,
  BarChart3,
  Eye,
  Target,
  MessageCircle,
}

export const ACTIVITY_TONES = {
  violet: 'bg-violet-500 text-white',
  emerald: 'bg-emerald-500 text-white',
  blue: 'bg-blue-500 text-white',
  amber: 'bg-amber-500 text-white',
}

export const getActivityIcon = (name) => ACTIVITY_ICONS[name] ?? Sparkles
export const getActivityTone = (tone) => ACTIVITY_TONES[tone] ?? ACTIVITY_TONES.blue
