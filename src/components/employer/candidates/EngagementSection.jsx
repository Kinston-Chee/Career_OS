import React, { useState } from 'react'
import {
  ArrowRight,
  Bot,
  Calendar,
  ClipboardCheck,
  Eye,
  Handshake,
  Users,
  Mail,
  Send,
  Sparkles,
} from 'lucide-react'

const CHANNEL_META = {
  email:      { Icon: Mail,           tone: 'bg-blue-50 text-[#185FA5] ring-blue-100' },
  event:      { Icon: Calendar,       tone: 'bg-purple-50 text-purple-600 ring-purple-100' },
  view:       { Icon: Eye,            tone: 'bg-gray-100 text-gray-500 ring-gray-200' },
  assessment: { Icon: ClipboardCheck, tone: 'bg-orange-50 text-orange-600 ring-orange-100' },
  linkedin:   { Icon: Users,       tone: 'bg-sky-50 text-sky-600 ring-sky-100' },
  default:    { Icon: Handshake,      tone: 'bg-emerald-50 text-emerald-600 ring-emerald-100' },
}

const CAMPAIGN_TONE = {
  green: 'bg-emerald-50 text-emerald-700',
  blue: 'bg-blue-50 text-[#185FA5]',
  gray: 'bg-gray-100 text-gray-500',
}

function ChannelIcon({ channel, size = 4 }) {
  const meta = CHANNEL_META[channel] || CHANNEL_META.default
  return (
    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1 ${meta.tone}`}>
      <meta.Icon className={`h-${size} w-${size}`} />
    </span>
  )
}

export default function EngagementSection({ candidate, engagement, onSendOutreach, onSchedule }) {
  const [customNote, setCustomNote] = useState('')

  return (
    <section className="employer-glass-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <Handshake className="mt-0.5 h-4 w-4 text-[#185FA5]" />
          <div>
            <h2 className="text-sm font-bold text-gray-900">Engagement</h2>
            <p className="mt-0.5 text-xs text-gray-500">
              {candidate.name.split(' ')[0]} hasn&rsquo;t applied to any of your postings yet — build the relationship before pitching a role.
            </p>
          </div>
        </div>
        <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700">
          {candidate.pipelineStage} · not yet applied
        </span>
      </div>

      {/* AI insight */}
      <div className="mt-4 flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50/70 px-3.5 py-2.5">
        <Bot className="mt-0.5 h-4 w-4 shrink-0 text-[#185FA5]" />
        <div>
          <p className="text-[13px] font-semibold text-[#185FA5]">AI recommendation</p>
          <p className="mt-0.5 text-xs leading-5 text-gray-700">{engagement.aiSummary}</p>
          {engagement.bestChannel ? (
            <p className="mt-1 text-[11px] font-medium text-[#185FA5]">Best channel: {engagement.bestChannel}</p>
          ) : null}
        </div>
      </div>

      {/* Suggested outreach */}
      <div className="mt-5">
        <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[.06em] text-gray-500">
          <Sparkles className="h-3 w-3 text-[#185FA5]" /> Suggested outreach
        </p>
        <div className="flex flex-col gap-2">
          {engagement.outreach.map((item, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl border border-blue-100/70 bg-white/80 p-3">
              <ChannelIcon channel={item.channel} />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-gray-900">{item.title}</p>
                <p className="mt-0.5 text-xs leading-5 text-gray-600">{item.preview}</p>
              </div>
              <button
                type="button"
                onClick={() => onSendOutreach?.(item)}
                className="shrink-0 self-center rounded-lg bg-[#185FA5] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#134c87]"
              >
                {item.cta || 'Send'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Past touchpoints */}
      {engagement.touchpoints?.length ? (
        <div className="mt-5">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[.06em] text-gray-500">Past touchpoints</p>
          <div className="flex flex-col">
            {engagement.touchpoints.map((tp, i) => (
              <div key={i} className="flex items-start gap-3 border-b border-blue-100/50 py-2.5 last:border-b-0">
                <ChannelIcon channel={tp.channel} />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-gray-900">{tp.label}</p>
                  {tp.note ? <p className="mt-0.5 text-[11px] text-gray-500">{tp.note}</p> : null}
                </div>
                <span className="shrink-0 self-center text-[11px] text-gray-400">{tp.date}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Campaigns */}
      {engagement.campaigns?.length ? (
        <div className="mt-5">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[.06em] text-gray-500">Add to campaign</p>
          <div className="flex flex-wrap gap-1.5">
            {engagement.campaigns.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => onSchedule?.(c)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold transition hover:brightness-95 ${CAMPAIGN_TONE[c.tone] || CAMPAIGN_TONE.blue}`}
              >
                {c.name}
                <span className="rounded-full bg-white/70 px-1.5 py-0.5 text-[10px] font-bold">{c.status}</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* Custom outreach */}
      <div className="mt-5 border-t border-blue-100/60 pt-4">
        <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[.06em] text-gray-500">
          <Mail className="h-3 w-3 text-[#185FA5]" /> Draft your own note
        </p>
        <textarea
          value={customNote}
          onChange={(e) => setCustomNote(e.target.value)}
          rows={3}
          placeholder={`Hi ${candidate.name.split(' ')[0]}, …`}
          className="w-full resize-y rounded-xl border border-white/70 bg-white/85 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-[#185FA5] focus:bg-white focus:ring-4 focus:ring-[#185FA5]/10"
        />
        <div className="mt-2 flex items-center justify-end">
          <button
            type="button"
            disabled={!customNote.trim()}
            onClick={() => { onSendOutreach?.({ channel: 'email', title: 'Custom message', preview: customNote }); setCustomNote('') }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#185FA5] px-3.5 py-1.5 text-[13px] font-semibold text-white transition hover:bg-[#134c87] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" /> Send message
          </button>
        </div>
      </div>
    </section>
  )
}
