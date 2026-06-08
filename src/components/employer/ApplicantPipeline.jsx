import React, { useState, useMemo } from 'react';
import ApplicantCard from './ApplicantCard';
import { CandidateMatchEngine } from '../../services/CandidateMatchEngine';

export default function ApplicantPipeline({
  opportunity,
  candidates,
  onUpdateCandidates,
  onBack,
  allMockCandidates = []
}) {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [invitedIds, setInvitedIds] = useState(new Set());

  // Show Toast notification
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Drag and Drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStage) => {
    e.preventDefault();
    const candidateId = e.dataTransfer.getData('text/plain');
    if (candidateId) {
      moveCandidateStage(candidateId, targetStage);
    }
  };

  const moveCandidateStage = (candidateId, targetStage) => {
    const updated = candidates.map(cand => {
      if (cand.id === candidateId) {
        return { ...cand, stage: targetStage };
      }
      return cand;
    });
    onUpdateCandidates(updated);
    triggerToast(`Moved candidate to ${targetStage}`);
  };

  // Group candidates by pipeline stage
  const stages = ['Applied', 'Shortlisted', 'Interviewing', 'Offer', 'Hired'];
  
  const groupedCandidates = useMemo(() => {
    const groups = {
      Applied: [],
      Shortlisted: [],
      Interviewing: [],
      Offer: [],
      Hired: []
    };
    candidates.forEach(cand => {
      const stage = cand.stage || 'Applied';
      if (groups[stage]) {
        groups[stage].push(cand);
      } else {
        groups.Applied.push(cand);
      }
    });
    return groups;
  }, [candidates]);

  // AI Hiring Insights: University Distribution
  const universityStats = useMemo(() => {
    const counts = {};
    candidates.forEach(c => {
      if (c.university) {
        counts[c.university] = (counts[c.university] || 0) + 1;
      }
    });
    const total = candidates.length || 1;
    return Object.entries(counts).map(([name, count]) => ({
      name,
      percentage: Math.round((count / total) * 100),
      count
    })).sort((a, b) => b.count - a.count);
  }, [candidates]);

  // AI Hiring Insights: Required Skills Coverage
  const skillsCoverage = useMemo(() => {
    const required = opportunity.requiredSkills || ['SQL', 'React'];
    const total = candidates.length || 1;
    return required.map(skill => {
      const count = candidates.filter(c => 
        (c.topSkills || []).some(s => s.toLowerCase() === skill.toLowerCase())
      ).length;
      return {
        skill,
        found: Math.round((count / total) * 100),
        missing: 100 - Math.round((count / total) * 100)
      };
    });
  }, [opportunity, candidates]);

  // Suggested Candidates list (people not currently in the pipeline)
  const suggestedCandidates = useMemo(() => {
    const currentIds = new Set(candidates.map(c => c.id));
    return allMockCandidates
      .filter(c => !currentIds.has(c.id))
      .map(c => {
        // Calculate match percentage dynamically using this job's weights
        const matchScore = CandidateMatchEngine.calculateScore(c, opportunity.weights || {});
        return { ...c, matchScore };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
  }, [allMockCandidates, candidates, opportunity]);

  // Invite candidate to apply
  const handleInviteCandidate = (candidate) => {
    setInvitedIds(prev => {
      const next = new Set(prev);
      next.add(candidate.id);
      return next;
    });

    // Add candidate to "Applied" column
    const newApplicant = {
      ...candidate,
      stage: 'Applied',
      match: candidate.matchScore || 85,
      evidenceCount: candidate.evidenceCount || candidate.verifiedEvidence || 5,
      trustScore: candidate.trustScore || 80,
      appliedDate: 'Just now'
    };

    onUpdateCandidates([...candidates, newApplicant]);
    triggerToast(`Sent invite to ${candidate.name}! Added to Applied pipeline.`);
  };

  const getStageDotColor = (stage) => {
    switch (stage) {
      case 'Applied': return 'bg-slate-400';
      case 'Shortlisted': return 'bg-indigo-500';
      case 'Interviewing': return 'bg-blue-500';
      case 'Offer': return 'bg-amber-500';
      case 'Hired': return 'bg-emerald-500';
      default: return 'bg-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-bold text-white shadow-lg animate-bounce">
          <span>🔔</span> {toastMessage}
        </div>
      )}

      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-5 gap-4">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-extrabold text-blue-600 hover:text-blue-800 transition mb-2"
          >
            ← Back to Jobs Dashboard
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-slate-900">{opportunity.title}</h1>
            <span className="rounded-full bg-blue-50 border border-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-700">
              {opportunity.type}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Manage candidates, evaluate trace logs, and execute decisions.
          </p>
        </div>

        {/* AI Weights Display Widget */}
        <div className="rounded-2xl border border-indigo-50 bg-indigo-50/30 p-4 max-w-sm">
          <span className="text-[10px] font-extrabold uppercase tracking-wide text-indigo-700">AI Match Model Weights</span>
          <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1.5 text-[10px] font-bold text-slate-600">
            <div>Skills: <span className="text-slate-900">{opportunity.weights?.skill || 40}%</span></div>
            <div>Projects: <span className="text-slate-900">{opportunity.weights?.project || 20}%</span></div>
            <div>Soft Skills: <span className="text-slate-900">{opportunity.weights?.softSkill || 20}%</span></div>
            <div>Lead: <span className="text-slate-900">{opportunity.weights?.leadership || 10}%</span></div>
          </div>
        </div>
      </div>

      {/* Main Board Layout (Kanban board full width + Insights below) */}
      <div className="space-y-10">
        {/* Kanban Board columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 items-start w-full">
          {stages.map((stage) => {
            const list = groupedCandidates[stage] || [];
            return (
              <div
                key={stage}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage)}
                className="rounded-3xl bg-slate-50/70 border border-slate-100 p-4 flex flex-col min-h-[560px] w-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"
              >
                {/* Column Header */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${getStageDotColor(stage)}`} />
                    <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">{stage}</h3>
                  </div>
                  <span className="rounded-full bg-slate-200/80 px-2 py-0.5 text-[10px] font-extrabold text-slate-600">
                    {list.length}
                  </span>
                </div>

                {/* Column Body */}
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[580px] pr-0.5">
                  {list.length > 0 ? (
                    list.map((cand) => (
                      <ApplicantCard
                        key={cand.id}
                        candidate={cand}
                        onSelect={setSelectedCandidate}
                        onMoveStage={moveCandidateStage}
                      />
                    ))
                  ) : (
                    <div className="border border-dashed border-slate-200 rounded-xl p-6 text-center text-[10px] font-semibold text-slate-400 mt-2">
                      Drop candidates here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Insights & Actions Section below the board */}
        <div className="border-t border-slate-100 pt-8">
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Section 1: AI Hiring Insights */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-slate-900">AI Pipeline Insights</h3>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">Active</span>
              </div>

              {/* University Distribution Chart */}
              <div className="space-y-2.5 border-t border-slate-100 pt-3">
                <h4 className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">University representation</h4>
                <div className="space-y-2">
                  {universityStats.map((univ) => (
                    <div key={univ.name} className="text-xs">
                      <div className="flex justify-between font-semibold text-slate-700 mb-1">
                        <span className="truncate pr-2">{univ.name}</span>
                        <span>{univ.percentage}% ({univ.count})</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${univ.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Skills Gap */}
              <div className="space-y-2.5 border-t border-slate-100 pt-3">
                <h4 className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Required Skills Coverage</h4>
                <div className="space-y-2">
                  {skillsCoverage.map((sc) => (
                    <div key={sc.skill} className="text-xs">
                      <div className="flex justify-between font-semibold text-slate-700 mb-1">
                        <span>{sc.skill}</span>
                        <span>{sc.found}% Have it</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${sc.found}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 2: Suggested Talent (Invite to Apply) */}
            <div className="rounded-2xl border border-indigo-100 bg-gradient-to-b from-indigo-50/50 to-white p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-sm font-extrabold text-indigo-950 flex items-center gap-1.5">
                  <span>✨</span> Invite Suggested Candidates
                </h3>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                  Top matched candidates from Taylor University & others.
                </p>
              </div>

              <div className="space-y-3.5 border-t border-slate-100 pt-3.5">
                {suggestedCandidates.length > 0 ? (
                  suggestedCandidates.map((candidate) => {
                    const isInvited = invitedIds.has(candidate.id);
                    return (
                      <div key={candidate.id} className="flex items-start justify-between gap-3 text-xs bg-white border border-slate-100 p-3 rounded-xl shadow-xs">
                        <div>
                          <h4 className="font-extrabold text-slate-900 leading-snug">{candidate.name}</h4>
                          <p className="text-[10px] text-slate-400 font-semibold mt-0.5 truncate max-w-[150px]">
                            {candidate.university}
                          </p>
                          <span className="inline-block mt-1.5 text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                            {candidate.matchScore}% Match
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleInviteCandidate(candidate)}
                          disabled={isInvited}
                          className={`rounded-lg px-2.5 py-1.5 text-[10px] font-extrabold transition shrink-0 ${
                            isInvited
                              ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-default'
                              : 'bg-indigo-600 text-white hover:bg-indigo-700'
                          }`}
                        >
                          {isInvited ? 'Invited' : 'Invite'}
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-[10px] text-slate-400 font-semibold text-center py-2">No further matches recommended.</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Candidate Profile Details Drawer / Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
          <div className="h-full w-full max-w-2xl bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-slide-over">
            
            {/* Drawer Header */}
            <div className="border-b border-slate-100 p-5 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-base font-extrabold text-white">
                  {selectedCandidate.name.split(' ').map(n=>n[0]).join('')}
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{selectedCandidate.name}</h3>
                  <p className="text-xs text-slate-500 font-semibold">{selectedCandidate.targetRole} · {selectedCandidate.university}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition"
              >
                ✕
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Trust Panel */}
              <div className="grid grid-cols-2 gap-4 rounded-xl border border-indigo-100 bg-indigo-50/20 p-4">
                <div>
                  <span className="text-[9px] uppercase tracking-wide text-indigo-700 font-extrabold">Match Rating</span>
                  <p className="text-lg font-extrabold text-slate-900">{selectedCandidate.match}% Fit</p>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wide text-indigo-700 font-extrabold">Verified Trust Score</span>
                  <p className="text-lg font-extrabold text-indigo-600">{selectedCandidate.trustScore || 88}%</p>
                </div>
              </div>

              {/* Summary */}
              {selectedCandidate.summary && (
                <div className="space-y-1.5">
                  <h4 className="text-xs font-extrabold uppercase tracking-wide text-slate-400">Professional Summary</h4>
                  <p className="text-xs leading-relaxed text-slate-700 font-semibold">{selectedCandidate.summary}</p>
                </div>
              )}

              {/* Fit Scores */}
              {selectedCandidate.fitScores && (
                <div className="space-y-3 border-t border-slate-100 pt-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-wide text-slate-400">Attribute Breakdowns</h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {selectedCandidate.fitScores.map((score, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs border border-slate-100 p-2.5 rounded-lg bg-slate-50/50">
                        <span className="font-semibold text-slate-600">{score.label}</span>
                        <span className="font-extrabold text-slate-900">{score.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Evidence Trace Trails */}
              {selectedCandidate.evidenceTrace && (
                <div className="space-y-3.5 border-t border-slate-100 pt-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-wide text-slate-400">Verified Evidence Traces</h4>
                  <div className="space-y-2">
                    {selectedCandidate.evidenceTrace.map((t, idx) => (
                      <div key={idx} className="border border-slate-200 bg-white p-3 rounded-xl space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-extrabold text-blue-700">{t.skill}</span>
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-500">{t.source}</span>
                        </div>
                        <p className="text-xs text-slate-600 font-semibold leading-normal">{t.detail}</p>
                        <div className="text-[10px] font-bold text-slate-400 pt-1">Confidence rating: <span className="text-slate-700 font-extrabold">{t.confidence}%</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {selectedCandidate.projects && (
                <div className="space-y-3.5 border-t border-slate-100 pt-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-wide text-slate-400">Projects</h4>
                  <div className="space-y-2">
                    {selectedCandidate.projects.map((p, idx) => (
                      <div key={idx} className="border border-slate-100 bg-slate-50/50 p-3 rounded-xl">
                        <h5 className="text-xs font-extrabold text-slate-900 leading-snug">{p.title}</h5>
                        <p className="text-xs text-slate-500 font-semibold mt-1">Proof: <span className="text-slate-700 font-medium">{p.proof}</span></p>
                        <p className="text-xs text-slate-600 font-medium mt-1 leading-normal">Outcome: {p.outcome}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience */}
              {selectedCandidate.experience && (
                <div className="space-y-3 border-t border-slate-100 pt-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-wide text-slate-400">Work History</h4>
                  <div className="space-y-3">
                    {selectedCandidate.experience.map((exp, idx) => (
                      <div key={idx} className="flex justify-between text-xs">
                        <div>
                          <h5 className="font-extrabold text-slate-900">{exp.title}</h5>
                          <p className="text-slate-500 font-semibold mt-0.5">{exp.org}</p>
                          <p className="text-[11px] text-slate-400 font-medium mt-1 leading-normal">{exp.impact}</p>
                        </div>
                        <span className="text-slate-400 font-bold shrink-0 text-right">{exp.period}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Drawer Actions */}
            <div className="border-t border-slate-100 p-4 bg-slate-50 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => {
                  if (selectedCandidate.stage !== 'Hired') {
                    moveCandidateStage(selectedCandidate.id, 'Hired');
                    setSelectedCandidate(prev => ({ ...prev, stage: 'Hired' }));
                  }
                }}
                disabled={selectedCandidate.stage === 'Hired'}
                className={`rounded-xl px-4 py-2.5 text-xs font-extrabold text-white transition ${
                  selectedCandidate.stage === 'Hired'
                    ? 'bg-slate-300 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 shadow-sm shadow-emerald-100'
                }`}
              >
                {selectedCandidate.stage === 'Hired' ? 'Hired' : 'Hire Candidate 🎉'}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
