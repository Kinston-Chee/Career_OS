import React, { useState, useMemo } from 'react';
import OpportunityCard from '../components/employer/OpportunityCard';
import CreateOpportunityWizard from '../components/employer/CreateOpportunityWizard';
import ApplicantPipeline from '../components/employer/ApplicantPipeline';
import OpportunityAnalytics from '../components/employer/OpportunityAnalytics';
import { employerTalentWorkspace } from '../data/mockData';

// Seed initial opportunity posts
const initialOpportunities = [
  {
    id: 'opp-001',
    title: 'Data Analyst Intern',
    company: 'Google',
    type: 'Internship',
    location: 'Hybrid',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    openings: 2,
    summary: 'Analyze consumer product growth, build sales/retention dashboards, and present findings to leadership.',
    requiredSkills: ['SQL', 'Analytics', 'Dashboard'],
    preferredSkills: ['Python', 'Tableau'],
    experienceLevel: 'Undergraduate',
    education: "Bachelor's in Data Science, Computer Science, or Business",
    deadline: '2026-07-31',
    startDate: '2026-09-01',
    applicationMethod: 'Apply Through CareerOS',
    screeningQuestions: ['What is your experience with SQL and dashboard creation?', 'How many months are you available?'],
    applicantsCount: 4,
    averageMatch: 84,
    status: 'Active',
    weights: { skill: 40, project: 20, softSkill: 20, leadership: 10, academic: 5, interest: 5 }
  },
  {
    id: 'opp-002',
    title: 'Frontend Engineer Associate',
    company: 'Google',
    type: 'Full-Time',
    location: 'On-site',
    city: 'Petaling Jaya',
    country: 'Malaysia',
    openings: 1,
    summary: 'Build responsive web experiences using React, compile clean component suites, and optimize performance.',
    requiredSkills: ['React', 'JavaScript'],
    preferredSkills: ['TypeScript', 'Testing'],
    experienceLevel: 'Entry Level',
    education: "Bachelor's in Computer Science or Software Engineering",
    deadline: '2026-08-15',
    startDate: '2026-10-01',
    applicationMethod: 'Apply Through CareerOS',
    screeningQuestions: ['Describe a complex React UI you built.', 'Are you willing to work on-site in PJ?'],
    applicantsCount: 2,
    averageMatch: 89,
    status: 'Active',
    weights: { skill: 50, project: 15, softSkill: 15, leadership: 10, academic: 5, interest: 5 }
  },
  {
    id: 'opp-003',
    title: 'Growth Operations Intern',
    company: 'Google',
    type: 'Internship',
    location: 'Remote',
    city: 'Subang Jaya',
    country: 'Malaysia',
    openings: 1,
    summary: 'Optimize outbound CRM sequences, track customer growth funnels, and construct reports.',
    requiredSkills: ['CRM', 'Reporting'],
    preferredSkills: ['Automation', 'Excel'],
    experienceLevel: 'Undergraduate',
    education: "Bachelor's in Marketing, Business, or Analytics",
    deadline: '2026-07-20',
    startDate: '2026-08-15',
    applicationMethod: 'Apply Through CareerOS',
    screeningQuestions: ['Do you have experience setting up automated email flows?', 'Detail your familiarity with HubSpot/Salesforce.'],
    applicantsCount: 0,
    averageMatch: 0,
    status: 'Draft',
    weights: { skill: 30, project: 20, softSkill: 25, leadership: 10, academic: 5, interest: 10 }
  },
  {
    id: 'opp-004',
    title: 'Product Manager Graduate Associate',
    company: 'Google',
    type: 'Graduate Program',
    location: 'Hybrid',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    openings: 1,
    summary: 'Lead cross-functional product alignments, research competitor offerings, and deliver scoping specs.',
    requiredSkills: ['Product Thinking', 'Stakeholder Communication'],
    preferredSkills: ['Figma', 'Agile'],
    experienceLevel: 'Entry Level',
    education: "Bachelor's or Master's in Business, CS, or Design",
    deadline: '2026-05-30',
    startDate: '2026-07-01',
    applicationMethod: 'Apply Through CareerOS',
    screeningQuestions: [],
    applicantsCount: 1,
    averageMatch: 92,
    status: 'Closed',
    weights: { skill: 30, project: 30, softSkill: 20, leadership: 10, academic: 5, interest: 5 }
  },
  {
    id: 'opp-005',
    title: 'UX/UI Design Associate',
    company: 'Google',
    type: 'Full-Time',
    location: 'Hybrid',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    openings: 1,
    summary: 'Collaborate with product managers and engineers to design beautiful, user-centered flows for web and mobile dashboards.',
    requiredSkills: ['Figma', 'User Research'],
    preferredSkills: ['Wireframing', 'Communication'],
    experienceLevel: 'Entry Level',
    education: "Bachelor's or Diploma in Design, HCI, or related fields",
    deadline: '2026-08-30',
    startDate: '2026-10-01',
    applicationMethod: 'Apply Through CareerOS',
    screeningQuestions: ['Link your portfolio.', 'What is your UX research process?'],
    applicantsCount: 2,
    averageMatch: 81,
    status: 'Active',
    weights: { skill: 30, project: 30, softSkill: 20, leadership: 10, academic: 5, interest: 5 }
  },
  {
    id: 'opp-006',
    title: 'AI/ML Engineer Intern',
    company: 'Google',
    type: 'Internship',
    location: 'Remote',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    openings: 2,
    summary: 'Assist the AI core team in training custom recommendation models, refining matching logic, and evaluating prompt traces.',
    requiredSkills: ['Python', 'Machine Learning'],
    preferredSkills: ['SQL', 'NLP'],
    experienceLevel: 'Undergraduate',
    education: "Bachelor's or Master's in Computer Science, Data Science, or AI",
    deadline: '2026-07-15',
    startDate: '2026-08-01',
    applicationMethod: 'Apply Through CareerOS',
    screeningQuestions: ['What ML packages are you most comfortable with?', 'Have you worked on NLP models?'],
    applicantsCount: 3,
    averageMatch: 92,
    status: 'Active',
    weights: { skill: 45, project: 25, softSkill: 15, leadership: 5, academic: 5, interest: 5 }
  }
];

// Seed candidate applications associated with jobs
const initialPipelineApplications = {
  'opp-001': [
    { ...employerTalentWorkspace.candidates.find(c => c.id === 'alyssa-tan'), stage: 'Shortlisted' },
    { ...employerTalentWorkspace.candidates.find(c => c.id === 'daniel-lim'), stage: 'Applied' },
    { ...employerTalentWorkspace.candidates.find(c => c.id === 'mei-wong'), stage: 'Interviewing' },
    { ...employerTalentWorkspace.candidates.find(c => c.id === 'hakim-ridwan'), stage: 'Applied' }
  ],
  'opp-002': [
    { ...employerTalentWorkspace.candidates.find(c => c.id === 'daniel-lim'), stage: 'Interviewing' },
    { ...employerTalentWorkspace.candidates.find(c => c.id === 'alyssa-tan'), stage: 'Applied' }
  ],
  'opp-003': [],
  'opp-004': [
    { ...employerTalentWorkspace.candidates.find(c => c.id === 'alyssa-tan'), stage: 'Offer' }
  ],
  'opp-005': [
    { ...employerTalentWorkspace.candidates.find(c => c.id === 'alyssa-tan'), stage: 'Applied' },
    { ...employerTalentWorkspace.candidates.find(c => c.id === 'mei-wong'), stage: 'Interviewing' }
  ],
  'opp-006': [
    { ...employerTalentWorkspace.candidates.find(c => c.id === 'alyssa-tan'), stage: 'Shortlisted' },
    { ...employerTalentWorkspace.candidates.find(c => c.id === 'daniel-lim'), stage: 'Applied' },
    { ...employerTalentWorkspace.candidates.find(c => c.id === 'hakim-ridwan'), stage: 'Shortlisted' }
  ]
};

export default function JobMarketplacePage() {
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [pipelineApplications, setPipelineApplications] = useState(initialPipelineApplications);
  
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  
  const [activeTab, setActiveTab] = useState('Active');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');

  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const stats = useMemo(() => {
    const activeCount = opportunities.filter(o => o.status === 'Active').length;
    
    let totalApplicants = 0;
    let totalInterviews = 0;
    let totalHired = 0;

    Object.values(pipelineApplications).forEach(list => {
      totalApplicants += list.length;
      totalInterviews += list.filter(c => c.stage === 'Interviewing').length;
      totalHired += list.filter(c => c.stage === 'Hired').length;
    });

    return {
      active: activeCount,
      applicants: totalApplicants,
      interviews: totalInterviews,
      filled: totalHired,
      matchRate: 89
    };
  }, [opportunities, pipelineApplications]);

  const handleCreateOpportunity = (newOpp) => {
    const id = `opp-${String(opportunities.length + 1).padStart(3, '0')}`;
    const formattedOpp = {
      ...newOpp,
      id,
      company: 'Google',
      applicantsCount: 0,
      averageMatch: 0,
    };
    
    setOpportunities(prev => [formattedOpp, ...prev]);
    setPipelineApplications(prev => ({
      ...prev,
      [id]: []
    }));
    setIsWizardOpen(false);
    
    if (newOpp.status === 'Active') {
      setActiveTab('Active');
    } else {
      setActiveTab('Drafts');
    }
  };

  const handleUpdatePipelineCandidates = (opportunityId, updatedList) => {
    setPipelineApplications(prev => ({
      ...prev,
      [opportunityId]: updatedList
    }));
    
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === opportunityId) {
        const count = updatedList.length;
        const avgMatch = count > 0 
          ? Math.round(updatedList.reduce((sum, c) => sum + (c.match || c.matchScore || 0), 0) / count)
          : 0;
        return {
          ...opp,
          applicantsCount: count,
          averageMatch: avgMatch
        };
      }
      return opp;
    }));
  };

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      if (activeTab === 'Active' && opp.status !== 'Active') return false;
      if (activeTab === 'Drafts' && opp.status !== 'Draft') return false;
      if (activeTab === 'Closed' && opp.status !== 'Closed') return false;
      if (activeTab === 'Archived' && opp.status !== 'Archived') return false;

      const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            opp.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesType = filterType === 'All' || opp.type === filterType;
      const matchesLocation = filterLocation === 'All' || opp.location === filterLocation;

      return matchesSearch && matchesType && matchesLocation;
    });
  }, [opportunities, activeTab, searchQuery, filterType, filterLocation]);

  return (
    <div className="space-y-6">
      
      {/* 1. Main View: Jobs Dashboard */}
      {currentView === 'dashboard' && (
        <div className="space-y-6">
          
          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Job & Internship Marketplace</h2>
              <p className="mt-2 text-sm text-slate-500">Publish vacancies, review trace-matched applications, and direct-hire university talent.</p>
            </div>
            <button
              onClick={() => setIsWizardOpen(true)}
              className="h-11 rounded-[8px] bg-gradient-to-br from-indigo-600 to-blue-600 px-6 text-sm font-semibold text-white shadow-md shadow-indigo-100 hover:bg-gradient-to-br hover:from-indigo-700 hover:to-blue-700 transition duration-200"
              type="button"
            >
              + Create Opportunity
            </button>
          </header>

          {/* Stats Cards Section */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { label: 'Active Positions', value: stats.active },
              { label: 'Total Applicants', value: stats.applicants },
              { label: 'Interviews Running', value: stats.interviews },
              { label: 'Positions Filled', value: stats.filled },
              { label: 'Average Match Rate', value: `${stats.matchRate}%` }
            ].map((stat) => (
              <div key={stat.label} className="rounded-[8px] border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)] flex flex-col justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{stat.label}</span>
                <p className="mt-3 text-2xl font-semibold text-slate-950 leading-none">{stat.value}</p>
                <div className="mt-2.5 h-1 w-12 rounded bg-gradient-to-r from-slate-200 to-slate-300" />
              </div>
            ))}
          </section>

          {/* Tabs bar */}
          <div className="border-b border-slate-200">
            <div className="flex gap-8 overflow-x-auto">
              {['Active', 'Drafts', 'Closed', 'Archived', 'Analytics'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative whitespace-nowrap px-1 pb-4 text-sm font-semibold transition-all duration-200 ${
                    activeTab === tab ? 'text-blue-700' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Render Active/Drafts/Closed listings */}
          {activeTab !== 'Analytics' ? (
            <div className="space-y-6">
              
              {/* Filters Panel */}
              <div className="rounded-[8px] border border-slate-200 bg-white p-4 flex flex-col md:flex-row items-center gap-4 shadow-sm">
                
                {/* Search */}
                <div className="relative w-full md:w-80">
                  <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">🔍</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title or skills..."
                    className="w-full rounded-[8px] border border-slate-200 pl-9 pr-4 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Role Type:</span>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="rounded-[8px] border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 bg-white focus:outline-none"
                    >
                      <option value="All">All Types</option>
                      <option value="Internship">Internships</option>
                      <option value="Graduate Program">Graduate Programs</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Work Mode:</span>
                    <select
                      value={filterLocation}
                      onChange={(e) => setFilterLocation(e.target.value)}
                      className="rounded-[8px] border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 bg-white focus:outline-none"
                    >
                      <option value="All">All Modes</option>
                      <option value="On-site">On-site</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Opportunities list grid */}
              {filteredOpportunities.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch">
                  {filteredOpportunities.map((opportunity) => (
                    <OpportunityCard
                      key={opportunity.id}
                      opportunity={opportunity}
                      onViewApplicants={() => {
                        setSelectedOpportunity(opportunity);
                        setCurrentView('pipeline');
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-[8px] border border-dashed border-slate-200 bg-slate-50/50 p-16 text-center space-y-3">
                  <span className="text-3xl">📭</span>
                  <h3 className="text-sm font-semibold text-slate-950">No opportunities found</h3>
                  <p className="text-xs text-slate-400 font-normal max-w-sm mx-auto">Try clearing search filters or create a new vacancy listing to get started.</p>
                </div>
              )}

            </div>
          ) : (
            // Render aggregated Analytics tab
            <OpportunityAnalytics 
              opportunities={opportunities} 
              allCandidates={Object.values(pipelineApplications).flat()} 
            />
          )}

        </div>
      )}

      {/* 2. Secondary View: Candidate Application Pipeline stage board */}
      {currentView === 'pipeline' && selectedOpportunity && (
        <ApplicantPipeline
          opportunity={selectedOpportunity}
          candidates={pipelineApplications[selectedOpportunity.id] || []}
          onUpdateCandidates={(updatedList) => handleUpdatePipelineCandidates(selectedOpportunity.id, updatedList)}
          onBack={() => {
            setCurrentView('dashboard');
            setSelectedOpportunity(null);
          }}
          allMockCandidates={employerTalentWorkspace.candidates}
        />
      )}

      {/* Posting Overlay wizard modal */}
      <CreateOpportunityWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSave={handleCreateOpportunity}
      />
    </div>
  );
}
