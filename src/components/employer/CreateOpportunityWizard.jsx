import React, { useState, useEffect } from 'react';
import { Bot, Rocket } from 'lucide-react';
import OpportunityPreview from './OpportunityPreview';

export default function CreateOpportunityWizard({ isOpen, onClose, onSave }) {
  const initialFormState = {
    title: '',
    type: 'Internship',
    location: 'Hybrid',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    openings: 1,
    summary: '',
    responsibilities: '',
    requirements: '',
    preferredQualifications: '',
    benefits: '',
    requiredSkills: ['React', 'JavaScript'],
    preferredSkills: ['TypeScript', 'Tailwind CSS'],
    experienceLevel: 'Undergraduate',
    education: "Bachelor's Degree in Computer Science or related fields",
    deadline: '2026-07-31',
    startDate: '2026-09-01',
    applicationMethod: 'Apply Through CareerOS',
    screeningQuestions: ['What is your experience with modern JavaScript frameworks?', 'Are you available for a 6-month internship?'],
    weights: {
      skill: 40,
      project: 20,
      softSkill: 20,
      leadership: 10,
      academic: 5,
      interest: 5,
    }
  };

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormState);
  const [newReqSkill, setNewReqSkill] = useState('');
  const [newPrefSkill, setNewPrefSkill] = useState('');
  const [newQuestion, setNewQuestion] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData(initialFormState);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleWeightChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      weights: {
        ...prev.weights,
        [key]: parseInt(value) || 0
      }
    }));
  };

  const totalWeight = Object.values(formData.weights).reduce((a, b) => a + b, 0);

  const autoBalanceWeights = () => {
    const keys = Object.keys(formData.weights);
    const sum = Object.values(formData.weights).reduce((a, b) => a + b, 0);
    if (sum === 0) {
      const equalVal = Math.floor(100 / keys.length);
      const newWeights = {};
      keys.forEach(k => { newWeights[k] = equalVal; });
      newWeights[keys[0]] += (100 - (equalVal * keys.length));
      setFormData(prev => ({ ...prev, weights: newWeights }));
      return;
    }
    const newWeights = {};
    let runningSum = 0;
    keys.forEach((k, idx) => {
      if (idx === keys.length - 1) {
        newWeights[k] = 100 - runningSum;
      } else {
        const val = Math.round((formData.weights[k] / sum) * 100);
        newWeights[k] = val;
        runningSum += val;
      }
    });
    setFormData(prev => ({ ...prev, weights: newWeights }));
  };

  const addRequiredSkill = () => {
    if (newReqSkill.trim() && !formData.requiredSkills.includes(newReqSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, newReqSkill.trim()]
      }));
      setNewReqSkill('');
    }
  };

  const removeRequiredSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(s => s !== skill)
    }));
  };

  const addPreferredSkill = () => {
    if (newPrefSkill.trim() && !formData.preferredSkills.includes(newPrefSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        preferredSkills: [...prev.preferredSkills, newPrefSkill.trim()]
      }));
      setNewPrefSkill('');
    }
  };

  const removePreferredSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      preferredSkills: prev.preferredSkills.filter(s => s !== skill)
    }));
  };

  const addQuestion = () => {
    if (newQuestion.trim() && !formData.screeningQuestions.includes(newQuestion.trim())) {
      setFormData(prev => ({
        ...prev,
        screeningQuestions: [...prev.screeningQuestions, newQuestion.trim()]
      }));
      setNewQuestion('');
    }
  };

  const removeQuestion = (q) => {
    setFormData(prev => ({
      ...prev,
      screeningQuestions: prev.screeningQuestions.filter(item => item !== q)
    }));
  };

  const handleNext = () => {
    if (step < 6) setStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const handlePublish = () => {
    onSave({ ...formData, status: 'Active' });
  };

  const handleSaveDraft = () => {
    onSave({ ...formData, status: 'Draft' });
  };

  const countries = [
    'Malaysia', 'Singapore', 'Indonesia', 'Thailand', 'Vietnam',
    'Philippines', 'Australia', 'United Kingdom', 'United States', 'Canada'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-5xl rounded-[8px] border border-slate-200 bg-white p-6 shadow-2xl transition-all duration-300 md:p-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">Create New Opportunity</h2>
            <p className="text-xs text-slate-500 font-semibold mt-1">Configure internship or job openings for university talent</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
          >
            ✕
          </button>
        </div>

        {/* Wizard Steps Indicator */}
        <div className="my-6 flex items-center justify-between gap-2 border-b border-slate-100 pb-5 overflow-x-auto">
          {[
            { num: 1, label: 'Basic Info' },
            { num: 2, label: 'Description' },
            { num: 3, label: 'Requirements' },
            { num: 4, label: 'AI Match Weights' },
            { num: 5, label: 'Settings' },
            { num: 6, label: 'Review & Publish' }
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2 shrink-0">
              <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                step === s.num
                  ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                  : step > s.num
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 text-slate-500'
              }`}>
                {step > s.num ? '✓' : s.num}
              </span>
              <span className={`text-xs font-semibold ${
                step === s.num ? 'text-blue-600' : step > s.num ? 'text-slate-700' : 'text-slate-400'
              }`}>
                {s.label}
              </span>
              {s.num < 6 && <div className="h-0.5 w-6 bg-slate-200" />}
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pr-1 py-1 space-y-6">
          
          {/* STEP 1: BASIC INFO */}
          {step === 1 && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-slate-800">
                    Opportunity Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleTextChange}
                    placeholder="e.g. Data Analyst Intern, Graduate Associate"
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800">
                    Role Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleTextChange}
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Graduate Program">Graduate Program</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800">
                    Number of Openings
                  </label>
                  <input
                    type="number"
                    name="openings"
                    value={formData.openings}
                    onChange={handleNumberChange}
                    min="1"
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800">
                    Location Type *
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleTextChange}
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                  >
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleTextChange}
                    placeholder="e.g. Kuala Lumpur, Singapore"
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleTextChange}
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                  >
                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: ROLE DESCRIPTION */}
          {step === 2 && (
            <div className="space-y-4 max-w-3xl mx-auto">
              <div>
                <label className="block text-sm font-semibold text-slate-800">
                  Role Summary *
                </label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleTextChange}
                  rows="3"
                  placeholder="Provide a high-level summary of the opportunity, team, and expectations..."
                  className="mt-2 min-h-[96px] w-full rounded-xl border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800">
                  Key Responsibilities *
                </label>
                <textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleTextChange}
                  rows="4"
                  placeholder="Bullet points of daily tasks, key achievements desired, and deliverables..."
                  className="mt-2 min-h-24 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800">
                  Requirements & Qualifications *
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleTextChange}
                  rows="4"
                  placeholder="Core requirements, specific technical skills needed, and certifications..."
                  className="mt-2 min-h-24 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800">
                  Fringe Benefits & Perks
                </label>
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleTextChange}
                  rows="2"
                  placeholder="Mentorship opportunities, training allowance, wellness allowances..."
                  className="mt-2 min-h-24 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                />
              </div>
            </div>
          )}

          {/* STEP 3: REQUIREMENTS & SKILLS */}
          {step === 3 && (
            <div className="space-y-5 max-w-2xl mx-auto">
              <div>
                <label className="block text-sm font-semibold text-slate-800">
                  Required Skills
                </label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={newReqSkill}
                    onChange={(e) => setNewReqSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequiredSkill())}
                    placeholder="Type skill and press enter (e.g. SQL, Figma)"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                  />
                  <button
                    type="button"
                    onClick={addRequiredSkill}
                    className="rounded-[8px] bg-blue-600 px-4 text-xs font-bold text-white hover:bg-blue-700 transition h-11 shrink-0"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {formData.requiredSkills.map(s => (
                    <span key={s} className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                      {s}
                      <button type="button" onClick={() => removeRequiredSkill(s)} className="text-[10px] text-blue-400 hover:text-blue-600">✕</button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800">
                  Preferred Skills
                </label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={newPrefSkill}
                    onChange={(e) => setNewPrefSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPreferredSkill())}
                    placeholder="Type skill and press enter (e.g. Python, Tableau)"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                  />
                  <button
                    type="button"
                    onClick={addPreferredSkill}
                    className="rounded-[8px] bg-violet-600 px-4 text-xs font-bold text-white hover:bg-violet-700 transition h-11 shrink-0"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {formData.preferredSkills.map(s => (
                    <span key={s} className="inline-flex items-center gap-1 rounded-full bg-violet-50 border border-violet-100 px-2.5 py-1 text-xs font-semibold text-violet-700">
                      {s}
                      <button type="button" onClick={() => removePreferredSkill(s)} className="text-[10px] text-violet-400 hover:text-violet-600">✕</button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-800">
                    Target Experience Level
                  </label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleTextChange}
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                  >
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Entry Level">Entry Level</option>
                    <option value="1-3 Years">1-3 Years</option>
                    <option value="3+ Years">3+ Years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800">
                    Target Education
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleTextChange}
                    placeholder="e.g. Bachelor's Degree in CS"
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: AI MATCH CONFIGURATION */}
          {step === 4 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="rounded-[8px] border border-indigo-100 bg-indigo-50/50 p-5">
                <h4 className="text-sm font-semibold text-indigo-950 flex items-center gap-2">
                  <Bot className="h-4 w-4 text-indigo-600" />
                  AI Candidate Match Weights
                </h4>
                <p className="text-xs text-slate-600 font-semibold mt-1">
                  Adjust how the AI Match Engine ranks candidates who apply. These weights control how candidate trace data and skill evidence are valued.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'skill', label: 'Technical Skills Importance', desc: 'Weighted score of technical skill validation.', color: 'from-blue-500 to-sky-500' },
                  { key: 'project', label: 'Project Experience Importance', desc: 'Evaluates size, scale, and validation of real-world projects.', color: 'from-emerald-500 to-teal-500' },
                  { key: 'softSkill', label: 'Soft Skill & Verification Trace', desc: 'Trustworthiness score of communication, ownership, and soft attributes.', color: 'from-purple-500 to-indigo-500' },
                  { key: 'leadership', label: 'Leadership & Extracurriculars', desc: 'Club management, hackathon leading, and student organizations.', color: 'from-amber-500 to-orange-500' },
                  { key: 'academic', label: 'Academic Standing', desc: 'Grades, coursework verification, and degree alignment.', color: 'from-rose-500 to-pink-500' },
                  { key: 'interest', label: 'Career Alignment & Focus', desc: 'Match with candidate targeted path and sector engagement.', color: 'from-slate-600 to-slate-800' }
                ].map((item) => (
                  <div key={item.key} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <div>
                        <span className="font-semibold text-slate-900">{item.label}</span>
                        <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">{item.desc}</p>
                      </div>
                      <span className="font-semibold text-slate-950 bg-slate-100 px-2.5 py-1 rounded-[8px]">
                        {formData.weights[item.key]}%
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={formData.weights[item.key]}
                        onChange={(e) => handleWeightChange(item.key, e.target.value)}
                        className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-slate-100 accent-blue-600"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-[8px] border border-slate-100 bg-slate-50 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-700">Total Distribution:</span>
                    <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${
                      totalWeight === 100
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-100 text-rose-800 border border-rose-200'
                    }`}>
                      {totalWeight}%
                    </span>
                  </div>
                  {totalWeight !== 100 && (
                    <p className="text-[10px] text-rose-600 font-semibold mt-1">Weights must equal exactly 100% to run standard evaluations.</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={autoBalanceWeights}
                  className="rounded-[8px] border border-indigo-200 bg-white px-4 py-2 text-xs font-semibold text-indigo-700 shadow-sm hover:bg-indigo-50 transition"
                >
                  ⚖️ Auto-Balance Weights
                </button>
              </div>

              <div className="rounded-[8px] bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-100 p-4 text-xs font-semibold text-slate-700">
                <span className="text-emerald-700 font-semibold">Predicted Match Model:</span> Average student match is expected around <strong className="text-slate-900">84%</strong>. This weighting yields high variance, optimizing for candidates with strong verified project evidence.
              </div>
            </div>
          )}

          {/* STEP 5: SETTINGS */}
          {step === 5 && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-800">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleTextChange}
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800">
                    Target Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleTextChange}
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800">
                  Screening Questions (Recommended)
                </label>
                <p className="text-[10px] text-slate-400 font-semibold mb-2">Candidates will be prompted to answer these questions when applying.</p>
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addQuestion())}
                    placeholder="Type question and press enter..."
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                  />
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="rounded-[8px] bg-blue-600 px-4 text-xs font-bold text-white hover:bg-blue-700 transition h-11 shrink-0"
                  >
                    Add
                  </button>
                </div>
                <ul className="mt-3 space-y-2">
                  {formData.screeningQuestions.map((q, idx) => (
                    <li key={idx} className="flex items-start justify-between gap-3 bg-slate-50 border border-slate-100 p-2.5 rounded-[8px] text-xs font-semibold text-slate-700">
                      <span>{q}</span>
                      <button type="button" onClick={() => removeQuestion(q)} className="text-[10px] text-rose-500 hover:text-rose-700 shrink-0">Remove</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* STEP 6: PREVIEW & PUBLISH */}
          {step === 6 && (
            <div className="space-y-4">
              <div className="rounded-[8px] border border-slate-200 bg-slate-50/50 p-4 max-w-3xl mx-auto text-center">
                <span className="text-xs font-semibold text-slate-600">Candidate Workspace Preview</span>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">This is how the opportunity will render on the student-facing jobs dashboard.</p>
              </div>
              <div className="max-w-3xl mx-auto">
                <OpportunityPreview formData={formData} mockMatchScore={91} />
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 gap-3 shrink-0">
          <div>
            {step === 6 && (
              <button
                type="button"
                onClick={handleSaveDraft}
                className="h-9 rounded-[8px] border border-slate-200 px-4 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition"
              >
                Save as Draft
              </button>
            )}
          </div>
          <div className="flex gap-2">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="h-9 rounded-[8px] border border-slate-200 px-4 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition"
              >
                ← Back
              </button>
            )}
            
            {step < 6 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={step === 1 && !formData.title.trim()}
                className={`h-9 rounded-[8px] px-5 text-xs font-semibold text-white transition ${
                  step === 1 && !formData.title.trim()
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Continue →
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePublish}
                disabled={totalWeight !== 100}
                className={`h-9 rounded-[8px] px-6 text-xs font-semibold text-white shadow-md transition ${
                  totalWeight !== 100
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg'
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  Publish Position
                  <Rocket className="h-3.5 w-3.5" />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
