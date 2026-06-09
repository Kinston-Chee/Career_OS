import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ─── Mock Data per Program ────────────────────────────────────────────────────

const programData = {
  'BSc Computer Science': {
    cohorts: ['Year 1', 'Year 2', 'Year 3'],
    semesters: ['This Semester', 'Last Semester', 'Last Year'],
    aiInsight:
      'Your program excels in core technical skills, but significant gaps in Cloud and MLOps are limiting graduate readiness for high-demand software and AI roles.',
    potentialImpact: '+14%',
    strengths: ['Python', 'SQL', 'Data Analysis'],
    weaknesses: ['Cloud Deployment', 'MLOps', 'Product Thinking'],
    interventions: [
      { title: 'Cloud Workshop Series', impact: 'High Impact', duration: '8-12 weeks', tone: 'blue' },
      { title: 'AWS Educate Partnership', impact: 'High Impact', duration: 'Ongoing', tone: 'violet' },
      { title: 'AI Society Hackathon', impact: 'Medium Impact', duration: '1-2 weeks', tone: 'amber' },
      { title: 'MLOps Short Course', impact: 'Medium Impact', duration: '4 weeks', tone: 'emerald' },
    ],
    advisorFocus: [
      { title: 'Cloud competencies', impact: 'High Impact', students: '62 students', tone: 'blue' },
      { title: 'MLOps fundamentals', impact: 'Medium Impact', students: '48 students', tone: 'violet' },
      { title: 'Product thinking', impact: 'Medium Impact', students: '40 students', tone: 'amber' },
    ],
    cohortData: {
      'Year 1': {
        'This Semester': {
          metrics: [
            { label: 'Market Alignment Score', value: '65%', status: 'Fair', change: '+3%', tone: 'blue', helper: 'Foundational skills building. Core CS modules underway.' },
            { label: 'Graduate Readiness Score', value: '58%', status: 'Fair', change: '+4%', tone: 'violet', helper: 'Early-stage readiness. Python and fundamentals in progress.' },
            { label: 'Students at Risk', value: '28', status: '8% of cohort', change: '+2', tone: 'rose', helper: 'Primarily programming fundamentals concerns.' },
            { label: 'Top Emerging Gap', value: 'Algorithms', status: 'Medium demand', change: 'Low coverage', tone: 'amber', helper: 'Critical foundation for later technical roles.' },
            { label: 'Data Confidence', value: 'Low', status: '32% coverage', change: 'Student data', tone: 'emerald', helper: 'Early cohort; limited profile signals available.' },
          ],
          skills: [
            { rank: 1, skill: 'Python', demand: 92, coverage: 60, gap: -32, priority: 'High' },
            { rank: 2, skill: 'SQL', demand: 88, coverage: 45, gap: -43, priority: 'High' },
            { rank: 3, skill: 'Data Structures', demand: 85, coverage: 55, gap: -30, priority: 'High' },
            { rank: 4, skill: 'Algorithms', demand: 82, coverage: 40, gap: -42, priority: 'High' },
            { rank: 5, skill: 'Web Development', demand: 70, coverage: 30, gap: -40, priority: 'High' },
            { rank: 6, skill: 'Cloud Deployment', demand: 76, coverage: 10, gap: -66, priority: 'High' },
            { rank: 7, skill: 'MLOps', demand: 74, coverage: 8, gap: -66, priority: 'High' },
            { rank: 8, skill: 'Networking Basics', demand: 50, coverage: 35, gap: -15, priority: 'Medium' },
          ],
        },
        'Last Semester': {
          metrics: [
            { label: 'Market Alignment Score', value: '62%', status: 'Fair', change: '+1%', tone: 'blue', helper: 'Alignment improving as fundamentals take hold.' },
            { label: 'Graduate Readiness Score', value: '54%', status: 'Fair', change: '+2%', tone: 'violet', helper: 'Building foundations. Python intro just completed.' },
            { label: 'Students at Risk', value: '34', status: '10% of cohort', change: '+4', tone: 'rose', helper: 'Higher risk in first semester as students adjust.' },
            { label: 'Top Emerging Gap', value: 'Python Basics', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'Most students still learning syntax fundamentals.' },
            { label: 'Data Confidence', value: 'Very Low', status: '18% coverage', change: 'Student data', tone: 'emerald', helper: 'Minimal profile data available at program start.' },
          ],
          skills: [
            { rank: 1, skill: 'Python', demand: 92, coverage: 42, gap: -50, priority: 'High' },
            { rank: 2, skill: 'SQL', demand: 88, coverage: 30, gap: -58, priority: 'High' },
            { rank: 3, skill: 'Data Structures', demand: 85, coverage: 36, gap: -49, priority: 'High' },
            { rank: 4, skill: 'Algorithms', demand: 82, coverage: 28, gap: -54, priority: 'High' },
            { rank: 5, skill: 'Web Development', demand: 70, coverage: 20, gap: -50, priority: 'High' },
            { rank: 6, skill: 'Cloud Deployment', demand: 76, coverage: 5, gap: -71, priority: 'High' },
            { rank: 7, skill: 'MLOps', demand: 74, coverage: 3, gap: -71, priority: 'High' },
            { rank: 8, skill: 'Networking Basics', demand: 50, coverage: 22, gap: -28, priority: 'Medium' },
          ],
        },
        'Last Year': {
          metrics: [
            { label: 'Market Alignment Score', value: '60%', status: 'Fair', change: '0%', tone: 'blue', helper: 'Baseline alignment for incoming CS cohort.' },
            { label: 'Graduate Readiness Score', value: '52%', status: 'Fair', change: '0%', tone: 'violet', helper: 'Baseline readiness at program entry.' },
            { label: 'Students at Risk', value: '36', status: '11% of cohort', change: '0', tone: 'rose', helper: 'Baseline risk profile for Year 1 cohort.' },
            { label: 'Top Emerging Gap', value: 'Python Basics', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'Consistent pattern in incoming Year 1 cohorts.' },
            { label: 'Data Confidence', value: 'Very Low', status: '15% coverage', change: 'Student data', tone: 'emerald', helper: 'Minimal data at program entry for previous cohort.' },
          ],
          skills: [
            { rank: 1, skill: 'Python', demand: 90, coverage: 38, gap: -52, priority: 'High' },
            { rank: 2, skill: 'SQL', demand: 86, coverage: 26, gap: -60, priority: 'High' },
            { rank: 3, skill: 'Data Structures', demand: 83, coverage: 30, gap: -53, priority: 'High' },
            { rank: 4, skill: 'Algorithms', demand: 80, coverage: 22, gap: -58, priority: 'High' },
            { rank: 5, skill: 'Web Development', demand: 68, coverage: 18, gap: -50, priority: 'High' },
            { rank: 6, skill: 'Cloud Deployment', demand: 72, coverage: 4, gap: -68, priority: 'High' },
            { rank: 7, skill: 'MLOps', demand: 70, coverage: 2, gap: -68, priority: 'High' },
            { rank: 8, skill: 'Networking Basics', demand: 48, coverage: 18, gap: -30, priority: 'Medium' },
          ],
        },
      },
      'Year 2': {
        'This Semester': {
          metrics: [
            { label: 'Market Alignment Score', value: '70%', status: 'Good', change: '+5%', tone: 'blue', helper: 'Strong improvement as core CS skills solidify.' },
            { label: 'Graduate Readiness Score', value: '67%', status: 'Good', change: '+5%', tone: 'violet', helper: 'Readiness growing steadily with applied projects.' },
            { label: 'Students at Risk', value: '44', status: '13% of cohort', change: '+3', tone: 'rose', helper: 'Risk concentrated in database and systems topics.' },
            { label: 'Top Emerging Gap', value: 'Cloud & Systems', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'Systems architecture courses not yet introduced.' },
            { label: 'Data Confidence', value: 'Medium', status: '52% coverage', change: 'Student data', tone: 'emerald', helper: 'Growing profile data from project submissions.' },
          ],
          skills: [
            { rank: 1, skill: 'Python', demand: 92, coverage: 78, gap: -14, priority: 'Low' },
            { rank: 2, skill: 'SQL', demand: 88, coverage: 70, gap: -18, priority: 'Medium' },
            { rank: 3, skill: 'Data Structures', demand: 85, coverage: 74, gap: -11, priority: 'Low' },
            { rank: 4, skill: 'Algorithms', demand: 82, coverage: 68, gap: -14, priority: 'Low' },
            { rank: 5, skill: 'Web Development', demand: 70, coverage: 55, gap: -15, priority: 'Medium' },
            { rank: 6, skill: 'Cloud Deployment', demand: 76, coverage: 22, gap: -54, priority: 'High' },
            { rank: 7, skill: 'MLOps', demand: 74, coverage: 14, gap: -60, priority: 'High' },
            { rank: 8, skill: 'System Design', demand: 62, coverage: 30, gap: -32, priority: 'High' },
          ],
        },
        'Last Semester': {
          metrics: [
            { label: 'Market Alignment Score', value: '67%', status: 'Good', change: '+3%', tone: 'blue', helper: 'Alignment improving as data modules complete.' },
            { label: 'Graduate Readiness Score', value: '63%', status: 'Fair', change: '+3%', tone: 'violet', helper: 'Steady growth with first internship preparation.' },
            { label: 'Students at Risk', value: '48', status: '14% of cohort', change: '+2', tone: 'rose', helper: 'Elevated risk near semester transition.' },
            { label: 'Top Emerging Gap', value: 'Cloud & Systems', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'Cloud modules not yet introduced in Year 2.' },
            { label: 'Data Confidence', value: 'Medium', status: '46% coverage', change: 'Student data', tone: 'emerald', helper: 'Coverage growing from first-year project signals.' },
          ],
          skills: [
            { rank: 1, skill: 'Python', demand: 92, coverage: 72, gap: -20, priority: 'Medium' },
            { rank: 2, skill: 'SQL', demand: 88, coverage: 64, gap: -24, priority: 'Medium' },
            { rank: 3, skill: 'Data Structures', demand: 85, coverage: 68, gap: -17, priority: 'Medium' },
            { rank: 4, skill: 'Algorithms', demand: 82, coverage: 60, gap: -22, priority: 'Medium' },
            { rank: 5, skill: 'Web Development', demand: 70, coverage: 48, gap: -22, priority: 'Medium' },
            { rank: 6, skill: 'Cloud Deployment', demand: 76, coverage: 16, gap: -60, priority: 'High' },
            { rank: 7, skill: 'MLOps', demand: 74, coverage: 10, gap: -64, priority: 'High' },
            { rank: 8, skill: 'System Design', demand: 62, coverage: 24, gap: -38, priority: 'High' },
          ],
        },
        'Last Year': {
          metrics: [
            { label: 'Market Alignment Score', value: '64%', status: 'Fair', change: '+2%', tone: 'blue', helper: 'Historical alignment for Year 2 cohort last year.' },
            { label: 'Graduate Readiness Score', value: '60%', status: 'Fair', change: '+2%', tone: 'violet', helper: 'Year 2 readiness baseline from prior cohort.' },
            { label: 'Students at Risk', value: '50', status: '15% of cohort', change: '+1', tone: 'rose', helper: 'Historical risk for Year 2 last year.' },
            { label: 'Top Emerging Gap', value: 'Databases & Cloud', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'Consistent gap pattern across Year 2 cohorts.' },
            { label: 'Data Confidence', value: 'Low', status: '40% coverage', change: 'Student data', tone: 'emerald', helper: 'Prior cohort historical signal coverage.' },
          ],
          skills: [
            { rank: 1, skill: 'Python', demand: 90, coverage: 68, gap: -22, priority: 'Medium' },
            { rank: 2, skill: 'SQL', demand: 86, coverage: 58, gap: -28, priority: 'Medium' },
            { rank: 3, skill: 'Data Structures', demand: 83, coverage: 62, gap: -21, priority: 'Medium' },
            { rank: 4, skill: 'Algorithms', demand: 80, coverage: 55, gap: -25, priority: 'Medium' },
            { rank: 5, skill: 'Web Development', demand: 68, coverage: 40, gap: -28, priority: 'Medium' },
            { rank: 6, skill: 'Cloud Deployment', demand: 72, coverage: 12, gap: -60, priority: 'High' },
            { rank: 7, skill: 'MLOps', demand: 70, coverage: 8, gap: -62, priority: 'High' },
            { rank: 8, skill: 'System Design', demand: 60, coverage: 18, gap: -42, priority: 'High' },
          ],
        },
      },
      'Year 3': {
        'This Semester': {
          metrics: [
            { label: 'Market Alignment Score', value: '76%', status: 'Good', change: '+8%', tone: 'blue', helper: 'Core program skills remain aligned with employer demand.' },
            { label: 'Graduate Readiness Score', value: '74%', status: 'Good', change: '+6%', tone: 'violet', helper: 'Readiness improved after analytics and Python reinforcement.' },
            { label: 'Students at Risk', value: '62', status: '18% of cohort', change: '+5', tone: 'rose', helper: 'Mostly concentrated around cloud deployment readiness.' },
            { label: 'Top Emerging Gap', value: 'Cloud & MLOps', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'Priority gap for software, data, and AI roles.' },
            { label: 'Data Confidence', value: 'High', status: '68% coverage', change: 'Student data', tone: 'emerald', helper: 'Based on 68% student profile and course coverage signals.' },
          ],
          skills: [
            { rank: 1, skill: 'Python', demand: 92, coverage: 88, gap: -4, priority: 'Low' },
            { rank: 2, skill: 'SQL', demand: 88, coverage: 82, gap: -6, priority: 'Low' },
            { rank: 3, skill: 'Data Analysis', demand: 85, coverage: 80, gap: -5, priority: 'Low' },
            { rank: 4, skill: 'AI / ML Basics', demand: 70, coverage: 75, gap: 5, priority: 'Low' },
            { rank: 5, skill: 'Cloud Deployment', demand: 76, coverage: 38, gap: -38, priority: 'High' },
            { rank: 6, skill: 'MLOps', demand: 74, coverage: 26, gap: -48, priority: 'High' },
            { rank: 7, skill: 'Product Analytics', demand: 58, coverage: 30, gap: -28, priority: 'Medium' },
            { rank: 8, skill: 'Power BI', demand: 42, coverage: 42, gap: 0, priority: 'Medium' },
          ],
        },
        'Last Semester': {
          metrics: [
            { label: 'Market Alignment Score', value: '72%', status: 'Good', change: '+5%', tone: 'blue', helper: 'Solid alignment as students complete advanced modules.' },
            { label: 'Graduate Readiness Score', value: '70%', status: 'Good', change: '+4%', tone: 'violet', helper: 'Readiness building ahead of final year.' },
            { label: 'Students at Risk', value: '57', status: '17% of cohort', change: '+3', tone: 'rose', helper: 'Risk concentrated in cloud and deployment topics.' },
            { label: 'Top Emerging Gap', value: 'Cloud & MLOps', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'Consistent gap pattern heading into final year.' },
            { label: 'Data Confidence', value: 'High', status: '64% coverage', change: 'Student data', tone: 'emerald', helper: 'Strong profile data from projects and assessments.' },
          ],
          skills: [
            { rank: 1, skill: 'Python', demand: 92, coverage: 84, gap: -8, priority: 'Low' },
            { rank: 2, skill: 'SQL', demand: 88, coverage: 78, gap: -10, priority: 'Low' },
            { rank: 3, skill: 'Data Analysis', demand: 85, coverage: 75, gap: -10, priority: 'Low' },
            { rank: 4, skill: 'AI / ML Basics', demand: 70, coverage: 68, gap: -2, priority: 'Low' },
            { rank: 5, skill: 'Cloud Deployment', demand: 76, coverage: 30, gap: -46, priority: 'High' },
            { rank: 6, skill: 'MLOps', demand: 74, coverage: 20, gap: -54, priority: 'High' },
            { rank: 7, skill: 'Product Analytics', demand: 58, coverage: 26, gap: -32, priority: 'Medium' },
            { rank: 8, skill: 'Power BI', demand: 42, coverage: 38, gap: -4, priority: 'Low' },
          ],
        },
        'Last Year': {
          metrics: [
            { label: 'Market Alignment Score', value: '68%', status: 'Good', change: '+4%', tone: 'blue', helper: 'Prior cohort Year 3 alignment benchmark.' },
            { label: 'Graduate Readiness Score', value: '66%', status: 'Good', change: '+3%', tone: 'violet', helper: 'Prior cohort readiness at Year 3 stage.' },
            { label: 'Students at Risk', value: '58', status: '17% of cohort', change: '+2', tone: 'rose', helper: 'Consistent risk pattern across Year 3 cohorts.' },
            { label: 'Top Emerging Gap', value: 'Cloud & MLOps', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'Persistent gap across multiple Year 3 cohorts.' },
            { label: 'Data Confidence', value: 'High', status: '60% coverage', change: 'Student data', tone: 'emerald', helper: 'Historical Year 3 signal coverage.' },
          ],
          skills: [
            { rank: 1, skill: 'Python', demand: 90, coverage: 80, gap: -10, priority: 'Low' },
            { rank: 2, skill: 'SQL', demand: 86, coverage: 74, gap: -12, priority: 'Low' },
            { rank: 3, skill: 'Data Analysis', demand: 83, coverage: 70, gap: -13, priority: 'Low' },
            { rank: 4, skill: 'AI / ML Basics', demand: 68, coverage: 60, gap: -8, priority: 'Low' },
            { rank: 5, skill: 'Cloud Deployment', demand: 72, coverage: 24, gap: -48, priority: 'High' },
            { rank: 6, skill: 'MLOps', demand: 70, coverage: 16, gap: -54, priority: 'High' },
            { rank: 7, skill: 'Product Analytics', demand: 55, coverage: 22, gap: -33, priority: 'High' },
            { rank: 8, skill: 'Power BI', demand: 40, coverage: 34, gap: -6, priority: 'Low' },
          ],
        },
      },
    },
  },

  'BSc Data Science': {
    cohorts: ['Year 1', 'Year 2', 'Year 3'],
    semesters: ['This Semester', 'Last Semester', 'Last Year'],
    aiInsight:
      'Your Data Science program has a strong statistics and Python foundation. The critical gaps are in production ML deployment (MLOps) and real-world data engineering pipelines — skills increasingly required by top hiring companies.',
    potentialImpact: '+18%',
    strengths: ['Statistics', 'Python', 'Machine Learning'],
    weaknesses: ['MLOps', 'Data Engineering', 'Cloud Platforms'],
    interventions: [
      { title: 'MLOps Bootcamp', impact: 'High Impact', duration: '6-8 weeks', tone: 'blue' },
      { title: 'Data Engineering Pipeline Lab', impact: 'High Impact', duration: '4 weeks', tone: 'violet' },
      { title: 'Kaggle Competition Programme', impact: 'Medium Impact', duration: 'Ongoing', tone: 'amber' },
      { title: 'Cloud ML Platform Workshop', impact: 'Medium Impact', duration: '3 weeks', tone: 'emerald' },
    ],
    advisorFocus: [
      { title: 'MLOps & model deployment', impact: 'High Impact', students: '54 students', tone: 'blue' },
      { title: 'Data Engineering pipelines', impact: 'High Impact', students: '46 students', tone: 'violet' },
      { title: 'Business communication of insights', impact: 'Medium Impact', students: '38 students', tone: 'amber' },
    ],
    cohortData: {
      'Year 1': {
        'This Semester': {
          metrics: [
            { label: 'Market Alignment Score', value: '68%', status: 'Good', change: '+4%', tone: 'blue', helper: 'Early DS cohort building strong stats and Python base.' },
            { label: 'Graduate Readiness Score', value: '60%', status: 'Fair', change: '+3%', tone: 'violet', helper: 'Foundation-stage readiness. Maths and stats in focus.' },
            { label: 'Students at Risk', value: '22', status: '7% of cohort', change: '+1', tone: 'rose', helper: 'Risk mainly around linear algebra and calculus modules.' },
            { label: 'Top Emerging Gap', value: 'Programming Skills', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'Python and R still being introduced.' },
            { label: 'Data Confidence', value: 'Low', status: '28% coverage', change: 'Student data', tone: 'emerald', helper: 'Early-stage; minimal profile data collected yet.' },
          ],
          skills: [
            { rank: 1, skill: 'Statistics', demand: 95, coverage: 72, gap: -23, priority: 'Medium' },
            { rank: 2, skill: 'Python', demand: 90, coverage: 55, gap: -35, priority: 'High' },
            { rank: 3, skill: 'R Programming', demand: 78, coverage: 50, gap: -28, priority: 'High' },
            { rank: 4, skill: 'SQL', demand: 85, coverage: 40, gap: -45, priority: 'High' },
            { rank: 5, skill: 'Data Visualization', demand: 80, coverage: 35, gap: -45, priority: 'High' },
            { rank: 6, skill: 'Machine Learning', demand: 88, coverage: 20, gap: -68, priority: 'High' },
            { rank: 7, skill: 'MLOps', demand: 76, coverage: 5, gap: -71, priority: 'High' },
            { rank: 8, skill: 'Data Engineering', demand: 72, coverage: 8, gap: -64, priority: 'High' },
          ],
        },
        'Last Semester': {
          metrics: [
            { label: 'Market Alignment Score', value: '63%', status: 'Fair', change: '+2%', tone: 'blue', helper: 'Baseline DS alignment for first semester students.' },
            { label: 'Graduate Readiness Score', value: '55%', status: 'Fair', change: '+1%', tone: 'violet', helper: 'Very early stage. Math fundamentals only.' },
            { label: 'Students at Risk', value: '28', status: '9% of cohort', change: '+3', tone: 'rose', helper: 'Higher early risk typical for DS programs.' },
            { label: 'Top Emerging Gap', value: 'Python & R', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'Programming languages just being introduced.' },
            { label: 'Data Confidence', value: 'Very Low', status: '15% coverage', change: 'Student data', tone: 'emerald', helper: 'Minimal signal data at program start.' },
          ],
          skills: [
            { rank: 1, skill: 'Statistics', demand: 95, coverage: 60, gap: -35, priority: 'High' },
            { rank: 2, skill: 'Python', demand: 90, coverage: 38, gap: -52, priority: 'High' },
            { rank: 3, skill: 'R Programming', demand: 78, coverage: 35, gap: -43, priority: 'High' },
            { rank: 4, skill: 'SQL', demand: 85, coverage: 28, gap: -57, priority: 'High' },
            { rank: 5, skill: 'Data Visualization', demand: 80, coverage: 22, gap: -58, priority: 'High' },
            { rank: 6, skill: 'Machine Learning', demand: 88, coverage: 10, gap: -78, priority: 'High' },
            { rank: 7, skill: 'MLOps', demand: 76, coverage: 2, gap: -74, priority: 'High' },
            { rank: 8, skill: 'Data Engineering', demand: 72, coverage: 4, gap: -68, priority: 'High' },
          ],
        },
        'Last Year': {
          metrics: [
            { label: 'Market Alignment Score', value: '61%', status: 'Fair', change: '0%', tone: 'blue', helper: 'Year 1 DS baseline from prior cohort.' },
            { label: 'Graduate Readiness Score', value: '52%', status: 'Fair', change: '0%', tone: 'violet', helper: 'Historical baseline for incoming DS students.' },
            { label: 'Students at Risk', value: '30', status: '9% of cohort', change: '0', tone: 'rose', helper: 'Consistent early-cohort risk profile.' },
            { label: 'Top Emerging Gap', value: 'Python & Statistics', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'Consistent pattern across DS Year 1 intakes.' },
            { label: 'Data Confidence', value: 'Very Low', status: '12% coverage', change: 'Student data', tone: 'emerald', helper: 'Historical prior-cohort Year 1 signal.' },
          ],
          skills: [
            { rank: 1, skill: 'Statistics', demand: 93, coverage: 55, gap: -38, priority: 'High' },
            { rank: 2, skill: 'Python', demand: 88, coverage: 32, gap: -56, priority: 'High' },
            { rank: 3, skill: 'R Programming', demand: 76, coverage: 30, gap: -46, priority: 'High' },
            { rank: 4, skill: 'SQL', demand: 83, coverage: 24, gap: -59, priority: 'High' },
            { rank: 5, skill: 'Data Visualization', demand: 78, coverage: 18, gap: -60, priority: 'High' },
            { rank: 6, skill: 'Machine Learning', demand: 86, coverage: 8, gap: -78, priority: 'High' },
            { rank: 7, skill: 'MLOps', demand: 74, coverage: 1, gap: -73, priority: 'High' },
            { rank: 8, skill: 'Data Engineering', demand: 70, coverage: 3, gap: -67, priority: 'High' },
          ],
        },
      },
      'Year 2': {
        'This Semester': {
          metrics: [
            { label: 'Market Alignment Score', value: '74%', status: 'Good', change: '+6%', tone: 'blue', helper: 'Strong stats and ML fundamentals improving alignment.' },
            { label: 'Graduate Readiness Score', value: '70%', status: 'Good', change: '+5%', tone: 'violet', helper: 'Readiness growing with applied ML and stats coursework.' },
            { label: 'Students at Risk', value: '32', status: '10% of cohort', change: '+1', tone: 'rose', helper: 'Risk around ML implementation and data wrangling.' },
            { label: 'Top Emerging Gap', value: 'Data Engineering', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'Pipeline and ETL skills not yet introduced.' },
            { label: 'Data Confidence', value: 'Medium', status: '50% coverage', change: 'Student data', tone: 'emerald', helper: 'Growing signal data from lab and assignment submissions.' },
          ],
          skills: [
            { rank: 1, skill: 'Statistics', demand: 95, coverage: 88, gap: -7, priority: 'Low' },
            { rank: 2, skill: 'Python', demand: 90, coverage: 80, gap: -10, priority: 'Low' },
            { rank: 3, skill: 'R Programming', demand: 78, coverage: 72, gap: -6, priority: 'Low' },
            { rank: 4, skill: 'SQL', demand: 85, coverage: 68, gap: -17, priority: 'Medium' },
            { rank: 5, skill: 'Data Visualization', demand: 80, coverage: 65, gap: -15, priority: 'Medium' },
            { rank: 6, skill: 'Machine Learning', demand: 88, coverage: 58, gap: -30, priority: 'High' },
            { rank: 7, skill: 'MLOps', demand: 76, coverage: 18, gap: -58, priority: 'High' },
            { rank: 8, skill: 'Data Engineering', demand: 72, coverage: 20, gap: -52, priority: 'High' },
          ],
        },
        'Last Semester': {
          metrics: [
            { label: 'Market Alignment Score', value: '70%', status: 'Good', change: '+4%', tone: 'blue', helper: 'Good momentum as ML modules deepen.' },
            { label: 'Graduate Readiness Score', value: '66%', status: 'Good', change: '+4%', tone: 'violet', helper: 'Consistent improvement with applied coursework.' },
            { label: 'Students at Risk', value: '36', status: '11% of cohort', change: '+2', tone: 'rose', helper: 'Some risk around transition from theory to application.' },
            { label: 'Top Emerging Gap', value: 'Data Engineering', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'ETL pipeline skills not yet introduced in curriculum.' },
            { label: 'Data Confidence', value: 'Medium', status: '44% coverage', change: 'Student data', tone: 'emerald', helper: 'Moderate signal from Year 2 assignments.' },
          ],
          skills: [
            { rank: 1, skill: 'Statistics', demand: 95, coverage: 84, gap: -11, priority: 'Low' },
            { rank: 2, skill: 'Python', demand: 90, coverage: 74, gap: -16, priority: 'Medium' },
            { rank: 3, skill: 'R Programming', demand: 78, coverage: 65, gap: -13, priority: 'Low' },
            { rank: 4, skill: 'SQL', demand: 85, coverage: 60, gap: -25, priority: 'Medium' },
            { rank: 5, skill: 'Data Visualization', demand: 80, coverage: 58, gap: -22, priority: 'Medium' },
            { rank: 6, skill: 'Machine Learning', demand: 88, coverage: 48, gap: -40, priority: 'High' },
            { rank: 7, skill: 'MLOps', demand: 76, coverage: 12, gap: -64, priority: 'High' },
            { rank: 8, skill: 'Data Engineering', demand: 72, coverage: 14, gap: -58, priority: 'High' },
          ],
        },
        'Last Year': {
          metrics: [
            { label: 'Market Alignment Score', value: '67%', status: 'Good', change: '+3%', tone: 'blue', helper: 'Prior Year 2 DS cohort alignment benchmark.' },
            { label: 'Graduate Readiness Score', value: '63%', status: 'Fair', change: '+3%', tone: 'violet', helper: 'Historical readiness for Year 2 DS students.' },
            { label: 'Students at Risk', value: '38', status: '12% of cohort', change: '+1', tone: 'rose', helper: 'Consistent risk pattern in Year 2 DS cohorts.' },
            { label: 'Top Emerging Gap', value: 'ML & Data Eng', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'Consistent Year 2 gap across DS cohorts.' },
            { label: 'Data Confidence', value: 'Medium', status: '40% coverage', change: 'Student data', tone: 'emerald', helper: 'Prior cohort historical signal for Year 2.' },
          ],
          skills: [
            { rank: 1, skill: 'Statistics', demand: 93, coverage: 80, gap: -13, priority: 'Low' },
            { rank: 2, skill: 'Python', demand: 88, coverage: 70, gap: -18, priority: 'Medium' },
            { rank: 3, skill: 'R Programming', demand: 76, coverage: 60, gap: -16, priority: 'Medium' },
            { rank: 4, skill: 'SQL', demand: 83, coverage: 55, gap: -28, priority: 'Medium' },
            { rank: 5, skill: 'Data Visualization', demand: 78, coverage: 50, gap: -28, priority: 'Medium' },
            { rank: 6, skill: 'Machine Learning', demand: 86, coverage: 40, gap: -46, priority: 'High' },
            { rank: 7, skill: 'MLOps', demand: 74, coverage: 8, gap: -66, priority: 'High' },
            { rank: 8, skill: 'Data Engineering', demand: 70, coverage: 10, gap: -60, priority: 'High' },
          ],
        },
      },
      'Year 3': {
        'This Semester': {
          metrics: [
            { label: 'Market Alignment Score', value: '81%', status: 'Strong', change: '+9%', tone: 'blue', helper: 'Excellent stats and ML alignment with data-driven employers.' },
            { label: 'Graduate Readiness Score', value: '78%', status: 'Good', change: '+7%', tone: 'violet', helper: 'High readiness in analytical core; deployment skills lagging.' },
            { label: 'Students at Risk', value: '38', status: '12% of cohort', change: '+2', tone: 'rose', helper: 'Risk mostly around MLOps and production deployment.' },
            { label: 'Top Emerging Gap', value: 'MLOps & Cloud ML', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'Production deployment skills critical for DS roles.' },
            { label: 'Data Confidence', value: 'High', status: '72% coverage', change: 'Student data', tone: 'emerald', helper: 'Strong signal from project and competition data.' },
          ],
          skills: [
            { rank: 1, skill: 'Statistics', demand: 95, coverage: 94, gap: -1, priority: 'Low' },
            { rank: 2, skill: 'Python', demand: 90, coverage: 90, gap: 0, priority: 'Low' },
            { rank: 3, skill: 'R Programming', demand: 78, coverage: 82, gap: 4, priority: 'Low' },
            { rank: 4, skill: 'Machine Learning', demand: 88, coverage: 80, gap: -8, priority: 'Low' },
            { rank: 5, skill: 'SQL', demand: 85, coverage: 86, gap: 1, priority: 'Low' },
            { rank: 6, skill: 'Data Visualization', demand: 80, coverage: 78, gap: -2, priority: 'Low' },
            { rank: 7, skill: 'MLOps', demand: 76, coverage: 36, gap: -40, priority: 'High' },
            { rank: 8, skill: 'Data Engineering', demand: 72, coverage: 38, gap: -34, priority: 'High' },
          ],
        },
        'Last Semester': {
          metrics: [
            { label: 'Market Alignment Score', value: '77%', status: 'Good', change: '+7%', tone: 'blue', helper: 'Strong Year 3 DS alignment across analytical roles.' },
            { label: 'Graduate Readiness Score', value: '74%', status: 'Good', change: '+6%', tone: 'violet', helper: 'Good readiness with strong analytical foundations.' },
            { label: 'Students at Risk', value: '42', status: '13% of cohort', change: '+3', tone: 'rose', helper: 'Risk around production ML and cloud skills.' },
            { label: 'Top Emerging Gap', value: 'MLOps & Cloud ML', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'Deployment gap persists into Year 3.' },
            { label: 'Data Confidence', value: 'High', status: '68% coverage', change: 'Student data', tone: 'emerald', helper: 'Good signal data from assessments and labs.' },
          ],
          skills: [
            { rank: 1, skill: 'Statistics', demand: 95, coverage: 90, gap: -5, priority: 'Low' },
            { rank: 2, skill: 'Python', demand: 90, coverage: 86, gap: -4, priority: 'Low' },
            { rank: 3, skill: 'R Programming', demand: 78, coverage: 78, gap: 0, priority: 'Low' },
            { rank: 4, skill: 'Machine Learning', demand: 88, coverage: 74, gap: -14, priority: 'Low' },
            { rank: 5, skill: 'SQL', demand: 85, coverage: 82, gap: -3, priority: 'Low' },
            { rank: 6, skill: 'Data Visualization', demand: 80, coverage: 72, gap: -8, priority: 'Low' },
            { rank: 7, skill: 'MLOps', demand: 76, coverage: 28, gap: -48, priority: 'High' },
            { rank: 8, skill: 'Data Engineering', demand: 72, coverage: 30, gap: -42, priority: 'High' },
          ],
        },
        'Last Year': {
          metrics: [
            { label: 'Market Alignment Score', value: '73%', status: 'Good', change: '+5%', tone: 'blue', helper: 'Historical Year 3 DS alignment benchmark.' },
            { label: 'Graduate Readiness Score', value: '70%', status: 'Good', change: '+5%', tone: 'violet', helper: 'Prior cohort Year 3 DS readiness.' },
            { label: 'Students at Risk', value: '44', status: '14% of cohort', change: '+2', tone: 'rose', helper: 'Consistent Year 3 DS risk pattern.' },
            { label: 'Top Emerging Gap', value: 'MLOps & Data Eng', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'Consistent production deployment gap across DS cohorts.' },
            { label: 'Data Confidence', value: 'High', status: '65% coverage', change: 'Student data', tone: 'emerald', helper: 'Historical Year 3 DS signal coverage.' },
          ],
          skills: [
            { rank: 1, skill: 'Statistics', demand: 93, coverage: 86, gap: -7, priority: 'Low' },
            { rank: 2, skill: 'Python', demand: 88, coverage: 82, gap: -6, priority: 'Low' },
            { rank: 3, skill: 'R Programming', demand: 76, coverage: 74, gap: -2, priority: 'Low' },
            { rank: 4, skill: 'Machine Learning', demand: 86, coverage: 70, gap: -16, priority: 'Medium' },
            { rank: 5, skill: 'SQL', demand: 83, coverage: 78, gap: -5, priority: 'Low' },
            { rank: 6, skill: 'Data Visualization', demand: 78, coverage: 68, gap: -10, priority: 'Low' },
            { rank: 7, skill: 'MLOps', demand: 74, coverage: 22, gap: -52, priority: 'High' },
            { rank: 8, skill: 'Data Engineering', demand: 70, coverage: 24, gap: -46, priority: 'High' },
          ],
        },
      },
    },
  },

  'BSc Data Analytics': {
    cohorts: ['Year 1', 'Year 2', 'Year 3'],
    semesters: ['This Semester', 'Last Semester', 'Last Year'],
    aiInsight:
      'Your Data Analytics program has excellent SQL and Excel foundations. The critical gaps are in advanced analytics tooling (Power BI, Tableau) and predictive modelling — skills that are increasingly expected even at entry-level analyst roles.',
    potentialImpact: '+16%',
    strengths: ['SQL', 'Excel', 'Data Reporting'],
    weaknesses: ['Power BI', 'Predictive Modelling', 'Python Analytics'],
    interventions: [
      { title: 'Power BI & Tableau Intensive', impact: 'High Impact', duration: '4-6 weeks', tone: 'blue' },
      { title: 'Python for Analytics Course', impact: 'High Impact', duration: '6 weeks', tone: 'violet' },
      { title: 'Business Analytics Case Studies', impact: 'Medium Impact', duration: 'Ongoing', tone: 'amber' },
      { title: 'Industry Analytics Mentorship', impact: 'Medium Impact', duration: '1 semester', tone: 'emerald' },
    ],
    advisorFocus: [
      { title: 'Power BI & data visualisation', impact: 'High Impact', students: '70 students', tone: 'blue' },
      { title: 'Python analytics scripting', impact: 'High Impact', students: '58 students', tone: 'violet' },
      { title: 'Predictive & statistical modelling', impact: 'Medium Impact', students: '44 students', tone: 'amber' },
    ],
    cohortData: {
      'Year 1': {
        'This Semester': {
          metrics: [
            { label: 'Market Alignment Score', value: '62%', status: 'Fair', change: '+2%', tone: 'blue', helper: 'Early DA cohort building Excel and basic SQL foundation.' },
            { label: 'Graduate Readiness Score', value: '55%', status: 'Fair', change: '+2%', tone: 'violet', helper: 'Very early stage. Business and data fundamentals in focus.' },
            { label: 'Students at Risk', value: '32', status: '10% of cohort', change: '+2', tone: 'rose', helper: 'Risk around quantitative skills and data interpretation.' },
            { label: 'Top Emerging Gap', value: 'Analytical Tools', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'Power BI and Tableau not yet introduced.' },
            { label: 'Data Confidence', value: 'Low', status: '26% coverage', change: 'Student data', tone: 'emerald', helper: 'Early intake; limited profile data available.' },
          ],
          skills: [
            { rank: 1, skill: 'SQL', demand: 90, coverage: 52, gap: -38, priority: 'High' },
            { rank: 2, skill: 'Excel / Sheets', demand: 88, coverage: 64, gap: -24, priority: 'Medium' },
            { rank: 3, skill: 'Data Reporting', demand: 82, coverage: 40, gap: -42, priority: 'High' },
            { rank: 4, skill: 'Power BI', demand: 85, coverage: 15, gap: -70, priority: 'High' },
            { rank: 5, skill: 'Tableau', demand: 80, coverage: 12, gap: -68, priority: 'High' },
            { rank: 6, skill: 'Python Analytics', demand: 78, coverage: 18, gap: -60, priority: 'High' },
            { rank: 7, skill: 'Statistics', demand: 75, coverage: 35, gap: -40, priority: 'High' },
            { rank: 8, skill: 'Predictive Modelling', demand: 70, coverage: 8, gap: -62, priority: 'High' },
          ],
        },
        'Last Semester': {
          metrics: [
            { label: 'Market Alignment Score', value: '58%', status: 'Fair', change: '+1%', tone: 'blue', helper: 'First-semester DA students building business acumen.' },
            { label: 'Graduate Readiness Score', value: '50%', status: 'Fair', change: '+1%', tone: 'violet', helper: 'Baseline readiness. Excel and business context introduced.' },
            { label: 'Students at Risk', value: '38', status: '12% of cohort', change: '+4', tone: 'rose', helper: 'Higher early risk typical for quantitative beginners.' },
            { label: 'Top Emerging Gap', value: 'SQL & Analytics Tools', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'Core tools not yet introduced in first semester.' },
            { label: 'Data Confidence', value: 'Very Low', status: '14% coverage', change: 'Student data', tone: 'emerald', helper: 'Minimal signal data at program start.' },
          ],
          skills: [
            { rank: 1, skill: 'SQL', demand: 90, coverage: 35, gap: -55, priority: 'High' },
            { rank: 2, skill: 'Excel / Sheets', demand: 88, coverage: 48, gap: -40, priority: 'High' },
            { rank: 3, skill: 'Data Reporting', demand: 82, coverage: 28, gap: -54, priority: 'High' },
            { rank: 4, skill: 'Power BI', demand: 85, coverage: 8, gap: -77, priority: 'High' },
            { rank: 5, skill: 'Tableau', demand: 80, coverage: 6, gap: -74, priority: 'High' },
            { rank: 6, skill: 'Python Analytics', demand: 78, coverage: 10, gap: -68, priority: 'High' },
            { rank: 7, skill: 'Statistics', demand: 75, coverage: 22, gap: -53, priority: 'High' },
            { rank: 8, skill: 'Predictive Modelling', demand: 70, coverage: 2, gap: -68, priority: 'High' },
          ],
        },
        'Last Year': {
          metrics: [
            { label: 'Market Alignment Score', value: '56%', status: 'Fair', change: '0%', tone: 'blue', helper: 'Prior intake Year 1 DA alignment baseline.' },
            { label: 'Graduate Readiness Score', value: '48%', status: 'Fair', change: '0%', tone: 'violet', helper: 'Historical Year 1 DA baseline readiness.' },
            { label: 'Students at Risk', value: '40', status: '12% of cohort', change: '0', tone: 'rose', helper: 'Consistent early intake risk profile for DA program.' },
            { label: 'Top Emerging Gap', value: 'Analytics Tools', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'Consistent tool gap across Year 1 DA intakes.' },
            { label: 'Data Confidence', value: 'Very Low', status: '12% coverage', change: 'Student data', tone: 'emerald', helper: 'Minimal historical Year 1 DA signal.' },
          ],
          skills: [
            { rank: 1, skill: 'SQL', demand: 88, coverage: 30, gap: -58, priority: 'High' },
            { rank: 2, skill: 'Excel / Sheets', demand: 86, coverage: 42, gap: -44, priority: 'High' },
            { rank: 3, skill: 'Data Reporting', demand: 80, coverage: 24, gap: -56, priority: 'High' },
            { rank: 4, skill: 'Power BI', demand: 83, coverage: 6, gap: -77, priority: 'High' },
            { rank: 5, skill: 'Tableau', demand: 78, coverage: 4, gap: -74, priority: 'High' },
            { rank: 6, skill: 'Python Analytics', demand: 76, coverage: 8, gap: -68, priority: 'High' },
            { rank: 7, skill: 'Statistics', demand: 73, coverage: 18, gap: -55, priority: 'High' },
            { rank: 8, skill: 'Predictive Modelling', demand: 68, coverage: 1, gap: -67, priority: 'High' },
          ],
        },
      },
      'Year 2': {
        'This Semester': {
          metrics: [
            { label: 'Market Alignment Score', value: '72%', status: 'Good', change: '+6%', tone: 'blue', helper: 'SQL and reporting skills driving strong market alignment.' },
            { label: 'Graduate Readiness Score', value: '68%', status: 'Good', change: '+5%', tone: 'violet', helper: 'Readiness improving as students build BI tool experience.' },
            { label: 'Students at Risk', value: '48', status: '15% of cohort', change: '+3', tone: 'rose', helper: 'Risk concentrated in Python and predictive modelling modules.' },
            { label: 'Top Emerging Gap', value: 'Power BI & Python', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'BI tools and Python analytics not yet fully covered.' },
            { label: 'Data Confidence', value: 'Medium', status: '48% coverage', change: 'Student data', tone: 'emerald', helper: 'Growing signal from assignments and case study submissions.' },
          ],
          skills: [
            { rank: 1, skill: 'SQL', demand: 90, coverage: 82, gap: -8, priority: 'Low' },
            { rank: 2, skill: 'Excel / Sheets', demand: 88, coverage: 86, gap: -2, priority: 'Low' },
            { rank: 3, skill: 'Data Reporting', demand: 82, coverage: 75, gap: -7, priority: 'Low' },
            { rank: 4, skill: 'Power BI', demand: 85, coverage: 42, gap: -43, priority: 'High' },
            { rank: 5, skill: 'Tableau', demand: 80, coverage: 38, gap: -42, priority: 'High' },
            { rank: 6, skill: 'Python Analytics', demand: 78, coverage: 36, gap: -42, priority: 'High' },
            { rank: 7, skill: 'Statistics', demand: 75, coverage: 65, gap: -10, priority: 'Low' },
            { rank: 8, skill: 'Predictive Modelling', demand: 70, coverage: 22, gap: -48, priority: 'High' },
          ],
        },
        'Last Semester': {
          metrics: [
            { label: 'Market Alignment Score', value: '68%', status: 'Good', change: '+4%', tone: 'blue', helper: 'Good alignment growth as BI tools introduced.' },
            { label: 'Graduate Readiness Score', value: '64%', status: 'Fair', change: '+4%', tone: 'violet', helper: 'Steady readiness improvement through Year 2.' },
            { label: 'Students at Risk', value: '52', status: '16% of cohort', change: '+4', tone: 'rose', helper: 'Elevated risk as students transition to BI tools.' },
            { label: 'Top Emerging Gap', value: 'Power BI & Modelling', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'BI tools and modelling just being introduced.' },
            { label: 'Data Confidence', value: 'Medium', status: '42% coverage', change: 'Student data', tone: 'emerald', helper: 'Growing signal from Year 2 submissions.' },
          ],
          skills: [
            { rank: 1, skill: 'SQL', demand: 90, coverage: 76, gap: -14, priority: 'Low' },
            { rank: 2, skill: 'Excel / Sheets', demand: 88, coverage: 82, gap: -6, priority: 'Low' },
            { rank: 3, skill: 'Data Reporting', demand: 82, coverage: 68, gap: -14, priority: 'Low' },
            { rank: 4, skill: 'Power BI', demand: 85, coverage: 30, gap: -55, priority: 'High' },
            { rank: 5, skill: 'Tableau', demand: 80, coverage: 26, gap: -54, priority: 'High' },
            { rank: 6, skill: 'Python Analytics', demand: 78, coverage: 26, gap: -52, priority: 'High' },
            { rank: 7, skill: 'Statistics', demand: 75, coverage: 58, gap: -17, priority: 'Medium' },
            { rank: 8, skill: 'Predictive Modelling', demand: 70, coverage: 14, gap: -56, priority: 'High' },
          ],
        },
        'Last Year': {
          metrics: [
            { label: 'Market Alignment Score', value: '65%', status: 'Fair', change: '+3%', tone: 'blue', helper: 'Prior Year 2 DA cohort alignment benchmark.' },
            { label: 'Graduate Readiness Score', value: '60%', status: 'Fair', change: '+3%', tone: 'violet', helper: 'Historical readiness for Year 2 DA students.' },
            { label: 'Students at Risk', value: '56', status: '17% of cohort', change: '+2', tone: 'rose', helper: 'Consistent risk pattern in Year 2 DA cohorts.' },
            { label: 'Top Emerging Gap', value: 'BI Tools & Python', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'Persistent gap across Year 2 DA cohorts.' },
            { label: 'Data Confidence', value: 'Low', status: '38% coverage', change: 'Student data', tone: 'emerald', helper: 'Prior cohort historical Year 2 DA signal.' },
          ],
          skills: [
            { rank: 1, skill: 'SQL', demand: 88, coverage: 72, gap: -16, priority: 'Medium' },
            { rank: 2, skill: 'Excel / Sheets', demand: 86, coverage: 78, gap: -8, priority: 'Low' },
            { rank: 3, skill: 'Data Reporting', demand: 80, coverage: 62, gap: -18, priority: 'Medium' },
            { rank: 4, skill: 'Power BI', demand: 83, coverage: 22, gap: -61, priority: 'High' },
            { rank: 5, skill: 'Tableau', demand: 78, coverage: 18, gap: -60, priority: 'High' },
            { rank: 6, skill: 'Python Analytics', demand: 76, coverage: 18, gap: -58, priority: 'High' },
            { rank: 7, skill: 'Statistics', demand: 73, coverage: 50, gap: -23, priority: 'Medium' },
            { rank: 8, skill: 'Predictive Modelling', demand: 68, coverage: 10, gap: -58, priority: 'High' },
          ],
        },
      },
      'Year 3': {
        'This Semester': {
          metrics: [
            { label: 'Market Alignment Score', value: '78%', status: 'Good', change: '+8%', tone: 'blue', helper: 'Strong SQL and reporting alignment. BI tools closing gap.' },
            { label: 'Graduate Readiness Score', value: '74%', status: 'Good', change: '+7%', tone: 'violet', helper: 'Good readiness. Python analytics and modelling still gaps.' },
            { label: 'Students at Risk', value: '55', status: '17% of cohort', change: '+4', tone: 'rose', helper: 'Risk concentrated in Python and predictive modelling.' },
            { label: 'Top Emerging Gap', value: 'Power BI & Modelling', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'Advanced BI and predictive skills need more coverage.' },
            { label: 'Data Confidence', value: 'High', status: '65% coverage', change: 'Student data', tone: 'emerald', helper: 'Good signal from case studies and industry projects.' },
          ],
          skills: [
            { rank: 1, skill: 'SQL', demand: 90, coverage: 90, gap: 0, priority: 'Low' },
            { rank: 2, skill: 'Excel / Sheets', demand: 88, coverage: 92, gap: 4, priority: 'Low' },
            { rank: 3, skill: 'Data Reporting', demand: 82, coverage: 86, gap: 4, priority: 'Low' },
            { rank: 4, skill: 'Power BI', demand: 85, coverage: 58, gap: -27, priority: 'Medium' },
            { rank: 5, skill: 'Tableau', demand: 80, coverage: 55, gap: -25, priority: 'Medium' },
            { rank: 6, skill: 'Python Analytics', demand: 78, coverage: 52, gap: -26, priority: 'Medium' },
            { rank: 7, skill: 'Statistics', demand: 75, coverage: 78, gap: 3, priority: 'Low' },
            { rank: 8, skill: 'Predictive Modelling', demand: 70, coverage: 38, gap: -32, priority: 'High' },
          ],
        },
        'Last Semester': {
          metrics: [
            { label: 'Market Alignment Score', value: '74%', status: 'Good', change: '+6%', tone: 'blue', helper: 'Year 3 DA students showing strong analytical alignment.' },
            { label: 'Graduate Readiness Score', value: '70%', status: 'Good', change: '+5%', tone: 'violet', helper: 'Approaching graduation readiness. Core tools solid.' },
            { label: 'Students at Risk', value: '60', status: '18% of cohort', change: '+5', tone: 'rose', helper: 'Risk elevated as predictive modelling module introduced.' },
            { label: 'Top Emerging Gap', value: 'Python & Modelling', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'Advanced analytics skills still lagging for DA students.' },
            { label: 'Data Confidence', value: 'High', status: '60% coverage', change: 'Student data', tone: 'emerald', helper: 'Growing signal from Year 3 projects.' },
          ],
          skills: [
            { rank: 1, skill: 'SQL', demand: 90, coverage: 86, gap: -4, priority: 'Low' },
            { rank: 2, skill: 'Excel / Sheets', demand: 88, coverage: 88, gap: 0, priority: 'Low' },
            { rank: 3, skill: 'Data Reporting', demand: 82, coverage: 80, gap: -2, priority: 'Low' },
            { rank: 4, skill: 'Power BI', demand: 85, coverage: 50, gap: -35, priority: 'High' },
            { rank: 5, skill: 'Tableau', demand: 80, coverage: 46, gap: -34, priority: 'High' },
            { rank: 6, skill: 'Python Analytics', demand: 78, coverage: 44, gap: -34, priority: 'High' },
            { rank: 7, skill: 'Statistics', demand: 75, coverage: 72, gap: -3, priority: 'Low' },
            { rank: 8, skill: 'Predictive Modelling', demand: 70, coverage: 30, gap: -40, priority: 'High' },
          ],
        },
        'Last Year': {
          metrics: [
            { label: 'Market Alignment Score', value: '70%', status: 'Good', change: '+5%', tone: 'blue', helper: 'Historical Year 3 DA cohort alignment benchmark.' },
            { label: 'Graduate Readiness Score', value: '66%', status: 'Good', change: '+4%', tone: 'violet', helper: 'Prior Year 3 DA cohort readiness at graduation.' },
            { label: 'Students at Risk', value: '62', status: '19% of cohort', change: '+3', tone: 'rose', helper: 'Consistent risk pattern in Year 3 DA cohorts.' },
            { label: 'Top Emerging Gap', value: 'Power BI & Python', status: 'High demand', change: 'Low coverage', tone: 'amber', helper: 'Consistent BI tool and Python gap in DA program.' },
            { label: 'Data Confidence', value: 'High', status: '56% coverage', change: 'Student data', tone: 'emerald', helper: 'Historical Year 3 DA signal coverage.' },
          ],
          skills: [
            { rank: 1, skill: 'SQL', demand: 88, coverage: 82, gap: -6, priority: 'Low' },
            { rank: 2, skill: 'Excel / Sheets', demand: 86, coverage: 84, gap: -2, priority: 'Low' },
            { rank: 3, skill: 'Data Reporting', demand: 80, coverage: 76, gap: -4, priority: 'Low' },
            { rank: 4, skill: 'Power BI', demand: 83, coverage: 42, gap: -41, priority: 'High' },
            { rank: 5, skill: 'Tableau', demand: 78, coverage: 38, gap: -40, priority: 'High' },
            { rank: 6, skill: 'Python Analytics', demand: 76, coverage: 36, gap: -40, priority: 'High' },
            { rank: 7, skill: 'Statistics', demand: 73, coverage: 68, gap: -5, priority: 'Low' },
            { rank: 8, skill: 'Predictive Modelling', demand: 68, coverage: 24, gap: -44, priority: 'High' },
          ],
        },
      },
    },
  },
}

// ─── Constants ────────────────────────────────────────────────────────────────

const metricToneClasses = {
  blue: 'bg-blue-50 text-blue-700 ring-blue-100',
  violet: 'bg-violet-50 text-violet-700 ring-violet-100',
  rose: 'bg-rose-50 text-rose-700 ring-rose-100',
  amber: 'bg-amber-50 text-amber-700 ring-amber-100',
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
}

const priorityClasses = {
  Low: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  Medium: 'bg-amber-50 text-amber-700 ring-amber-100',
  High: 'bg-rose-50 text-rose-700 ring-rose-100',
}

const changeColor = (change) => {
  if (!change) return 'text-slate-400'
  if (change.startsWith('+') || change.startsWith('-0') || change === '0%') return 'text-emerald-600'
  if (change.startsWith('-')) return 'text-rose-500'
  return 'text-slate-500'
}

// ─── Dropdown Filter Component ─────────────────────────────────────────────────

function FilterDropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex h-11 min-w-[180px] items-center justify-between gap-3 rounded-[8px] border px-3 text-sm font-semibold shadow-sm transition ${
          open
            ? 'border-blue-300 bg-blue-50 text-blue-700'
            : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-700'
        }`}
      >
        <span className="flex flex-col items-start leading-none">
          <span className="text-[10px] font-medium text-slate-400">{label}</span>
          <span className="mt-0.5 whitespace-nowrap">{value}</span>
        </span>
        <svg
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-30 mt-1.5 min-w-[180px] overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.12)]">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => { onChange(option); setOpen(false) }}
              className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-medium transition hover:bg-blue-50 hover:text-blue-700 ${
                option === value ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
              }`}
            >
              {option === value && (
                <svg className="h-3.5 w-3.5 shrink-0 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
              )}
              {option !== value && <span className="h-3.5 w-3.5 shrink-0" />}
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function ProgressCell({ value, tone }) {
  const toneClass = tone === 'green' ? 'bg-emerald-500' : 'bg-blue-500'
  return (
    <div className="min-w-[128px]">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>{value}%</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-slate-100">
        <div className={`h-2 rounded-full ${toneClass}`} style={{ width: `${Math.max(value, 6)}%` }} />
      </div>
    </div>
  )
}

function GapCell({ gap }) {
  const isImportant = gap <= -20
  const width = Math.min(Math.abs(gap), 50) * 2
  return (
    <div className="min-w-[112px]">
      <span className={`text-sm font-medium ${isImportant ? 'text-rose-600' : gap < 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
        {gap > 0 ? `+${gap}%` : `${gap}%`}
      </span>
      <div className="mt-2 h-2 rounded-full bg-slate-100">
        {isImportant ? <div className="h-2 rounded-full bg-gradient-to-r from-orange-400 to-rose-500" style={{ width: `${width}%` }} /> : null}
      </div>
    </div>
  )
}

function SkillSetupModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/30 px-4 backdrop-blur-sm">
      <section className="w-full max-w-xl rounded-[8px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase text-blue-600">Program Skills Setup</p>
            <h2 className="mt-2 text-xl font-medium text-slate-950">Manage Program Skills</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Define course skill coverage so AI can compare curriculum signals with market demand.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-slate-200 text-sm font-medium text-slate-500 hover:bg-slate-50"
            aria-label="Close program skills setup"
          >
            ✕
          </button>
        </div>
        <div className="mt-6 space-y-3">
          {[
            'Select program template',
            'Upload course outline',
            'Review AI-extracted skills',
            'Manually adjust skill coverage',
          ].map((item, index) => (
            <div key={item} className="flex items-center gap-4 rounded-[8px] border border-slate-200 bg-slate-50/70 p-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-medium text-blue-700 ring-1 ring-blue-100">
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-slate-950">{item}</p>
                <p className="mt-1 text-xs text-slate-500">Placeholder workflow for the prototype.</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-[8px] border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600">
            Cancel
          </button>
          <button type="button" onClick={onClose} className="rounded-[8px] bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-200">
            Save setup draft
          </button>
        </div>
      </section>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function UniversityOverviewPage() {
  const [showSkillSetup, setShowSkillSetup] = useState(false)

  const programOptions = Object.keys(programData)
  const [selectedProgram, setSelectedProgram] = useState('BSc Computer Science')

  const currentProgram = programData[selectedProgram]
  const [selectedCohort, setSelectedCohort] = useState(currentProgram.cohorts[2] || currentProgram.cohorts[0])
  const [selectedSemester, setSelectedSemester] = useState(currentProgram.semesters[0])

  // When program changes, reset cohort/semester to sensible defaults
  function handleProgramChange(program) {
    setSelectedProgram(program)
    const pd = programData[program]
    setSelectedCohort(pd.cohorts[2] || pd.cohorts[0])
    setSelectedSemester(pd.semesters[0])
  }

  // Resolve current data slice
  const cohortKey = selectedCohort in currentProgram.cohortData ? selectedCohort : currentProgram.cohorts[0]
  const semesterKey = selectedSemester in currentProgram.cohortData[cohortKey]
    ? selectedSemester
    : currentProgram.semesters[0]

  const { metrics, skills } = currentProgram.cohortData[cohortKey][semesterKey]
  const { aiInsight, potentialImpact, strengths, weaknesses, interventions, advisorFocus } = currentProgram

  return (
    <div className="mx-auto max-w-[1560px] space-y-6">
      <header className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase text-blue-600">University Workspace</p>
          <h1 className="mt-2 text-3xl font-medium text-slate-950">University Career Intelligence Hub</h1>
          <p className="mt-2 text-base leading-7 text-slate-500">
            AI-powered insights to strengthen curriculum relevance and graduate outcomes.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 xl:justify-end">
          <FilterDropdown
            label="Program"
            value={selectedProgram}
            options={programOptions}
            onChange={handleProgramChange}
          />
          <FilterDropdown
            label="Cohort"
            value={selectedCohort}
            options={currentProgram.cohorts}
            onChange={setSelectedCohort}
          />
          <FilterDropdown
            label="Semester"
            value={selectedSemester}
            options={currentProgram.semesters}
            onChange={setSelectedSemester}
          />
          <button
            type="button"
            className="flex h-11 items-center rounded-[8px] bg-blue-600 px-4 text-sm font-medium text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
          >
            Export Report
          </button>
        </div>
      </header>

      <section className="rounded-[8px] border border-indigo-100 bg-white p-5 shadow-[0_10px_28px_rgba(79,70,229,0.06)]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex gap-4 items-start">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-indigo-600 text-white shadow-sm text-sm font-bold">EC</span>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-slate-900">Dr. Evelyn Chen</h3>
              <span className="rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 border border-indigo-100/50">Dean of Computing & AI</span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 border border-slate-200">Heriot-Watt University Malaysia, MACS</span>
            </div>
            <p className="text-xs font-medium text-slate-600 mt-1.5 leading-relaxed max-w-3xl">
              Dr. Chen is preparing the MACS curriculum review across <strong>BSc Computer Science</strong>, <strong>BSc Data Science</strong>, and <strong>BSc Data Analytics</strong>. The goal is to find the highest-risk Year 1 to Year 3 skill gaps, validate them with alumni and market signals, then launch targeted partner interventions.
            </p>
            <p className="mt-1 text-xs font-medium text-slate-400">Contact: evelyn.chen@hw.edu.my</p>
          </div>
        </div>
        <div className="flex gap-3 shrink-0 w-full md:w-auto border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
          <div className="text-center px-4 py-2 border-r border-slate-100 last:border-none flex-1 md:flex-none">
            <span className="block text-lg font-bold text-indigo-600 leading-none">3</span>
            <span className="block text-[10px] text-slate-400 font-semibold uppercase mt-1 tracking-wider">Programs</span>
          </div>
          <div className="text-center px-4 py-2 border-r border-slate-100 last:border-none flex-1 md:flex-none">
            <span className="block text-lg font-bold text-violet-600 leading-none">9</span>
            <span className="block text-[10px] text-slate-400 font-semibold uppercase mt-1 tracking-wider">Y1-Y3 Cohorts</span>
          </div>
          <div className="text-center px-4 py-2 last:border-none flex-1 md:flex-none">
            <span className="block text-lg font-bold text-emerald-600 leading-none">840+</span>
            <span className="block text-[10px] text-slate-400 font-semibold uppercase mt-1 tracking-wider">Students</span>
          </div>
        </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {[
            ['1', 'Spot the risk', 'Start with program-market gaps by selected program and cohort.'],
            ['2', 'Validate the signal', 'Use alumni outcomes to confirm which gaps affect placement.'],
            ['3', 'Inspect readiness', 'Check Year 1 to Year 3 skill heatmaps and affected students.'],
            ['4', 'Launch action', 'Move to collaboration marketplace for workshops and mentors.'],
          ].map(([step, title, detail]) => (
            <div key={title} className="rounded-[8px] border border-slate-100 bg-slate-50/70 p-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-blue-700 ring-1 ring-blue-100">{step}</span>
                <p className="text-xs font-bold text-slate-900">{title}</p>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-500">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KPI Metrics */}
      <section className="rounded-[8px] border border-blue-100 bg-white/95 p-5 shadow-[0_18px_48px_rgba(30,64,175,0.08)]">
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-medium text-slate-950">Program Intelligence at a Glance</h2>
            <p className="mt-1 text-sm text-slate-500">
              {selectedProgram} · {selectedCohort} · {selectedSemester}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowSkillSetup(true)}
            className="w-fit rounded-[8px] border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
          >
            Manage Program Skills
          </button>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {metrics.map((metric) => (
            <article key={metric.label} className="min-w-0 border-l border-slate-100 pl-4 first:border-l-0 first:pl-0 md:first:border-l md:first:pl-4 xl:first:border-l-0 xl:first:pl-0">
              <p className="text-xs font-medium uppercase text-slate-400">{metric.label}</p>
              <div className="mt-3 flex flex-wrap items-end gap-2">
                <p className="text-2xl font-medium text-slate-950">{metric.value}</p>
                <span className={`mb-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${metricToneClasses[metric.tone]}`}>
                  {metric.status}
                </span>
              </div>
              <p className={`mt-2 text-sm font-medium ${changeColor(metric.change)}`}>{metric.change}</p>
              <p className="mt-2 text-xs leading-5 text-slate-500">{metric.helper}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Skills Table + AI Advisor */}
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px] 2xl:grid-cols-[minmax(0,1fr)_400px]">
        <section className="min-w-0 rounded-[8px] border border-slate-200/80 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
          <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-lg font-medium text-slate-950">Top Market Skills vs Program Coverage</h2>
              <p className="mt-1 text-sm text-slate-500">Table-style intelligence view of demand, readiness, and intervention priority.</p>
            </div>
            <span className="w-fit rounded-full bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700 ring-1 ring-violet-100">
              {selectedProgram}
            </span>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[820px] border-separate border-spacing-0 text-left">
              <thead>
                <tr className="text-xs font-medium uppercase text-slate-400">
                  <th className="rounded-l-[8px] bg-slate-50 px-3 py-3">Rank</th>
                  <th className="bg-slate-50 px-3 py-3">Skill</th>
                  <th className="bg-slate-50 px-3 py-3">Market Demand</th>
                  <th className="bg-slate-50 px-3 py-3">Program Coverage</th>
                  <th className="bg-slate-50 px-3 py-3">Coverage Gap</th>
                  <th className="rounded-r-[8px] bg-slate-50 px-3 py-3">Priority</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((row) => (
                  <tr key={row.skill} className="border-b border-slate-100">
                    <td className="border-b border-slate-100 px-3 py-4 text-sm font-medium text-slate-500">{row.rank}</td>
                    <td className="border-b border-slate-100 px-3 py-4 text-sm font-medium text-slate-950">{row.skill}</td>
                    <td className="border-b border-slate-100 px-3 py-4"><ProgressCell value={row.demand} tone="blue" /></td>
                    <td className="border-b border-slate-100 px-3 py-4"><ProgressCell value={row.coverage} tone="green" /></td>
                    <td className="border-b border-slate-100 px-3 py-4"><GapCell gap={row.gap} /></td>
                    <td className="border-b border-slate-100 px-3 py-4">
                      <span className={`rounded-full px-3 py-1.5 text-xs font-medium ring-1 ${priorityClasses[row.priority]}`}>
                        {row.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs font-medium text-slate-500">
            Market demand data based on mock job postings in the past 60 days
          </p>
        </section>

        <aside className="rounded-[8px] border border-violet-100 bg-gradient-to-br from-white via-violet-50/60 to-blue-50 p-5 shadow-[0_18px_48px_rgba(79,70,229,0.1)]">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-white text-sm font-semibold text-violet-700 shadow-sm ring-1 ring-violet-100">
              AI
            </span>
            <div>
              <p className="text-xs font-medium uppercase text-violet-600">AI University Advisor</p>
              <h2 className="text-lg font-medium text-slate-950">Key Insight</h2>
            </div>
          </div>
          <p className="mt-5 text-sm leading-6 text-slate-600">{aiInsight}</p>
          <div className="mt-6">
            <h3 className="text-sm font-medium text-slate-950">Recommended Focus</h3>
            <div className="mt-3 space-y-3">
              {advisorFocus.map((item) => (
                <div key={item.title} className="rounded-[8px] border border-white bg-white/80 p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium text-slate-950">{item.title}</p>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${metricToneClasses[item.tone]}`}>
                      {item.impact}
                    </span>
                  </div>
                  <p className="mt-2 text-xs font-semibold text-slate-500">{item.students}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 rounded-[8px] border border-blue-100 bg-white/85 p-4">
            <p className="text-xs font-medium uppercase text-slate-400">Potential Impact</p>
            <p className="mt-2 text-3xl font-semibold text-blue-700">{potentialImpact}</p>
            <p className="mt-1 text-sm font-semibold text-slate-600">readiness improvement</p>
            <p className="mt-1 text-xs text-slate-500">Estimated: 3-6 months</p>
          </div>
          <button
            type="button"
            className="mt-5 w-full rounded-[8px] bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
          >
            View full AI recommendations
          </button>
        </aside>
      </section>

      {/* Strengths vs Weaknesses + Interventions */}
      <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[8px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
          <h2 className="text-lg font-medium text-slate-950">Program Strengths vs Emerging Weaknesses</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-[8px] border border-emerald-100 bg-emerald-50/60 p-4">
              <p className="text-sm font-medium text-emerald-800">What We Do Well</p>
              <div className="mt-4 space-y-3">
                {strengths.map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-[8px] bg-white px-3 py-3 text-sm font-medium text-slate-800 ring-1 ring-emerald-100">
                    <span>{item}</span>
                    <span className="text-emerald-600">Strong</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[8px] border border-rose-100 bg-rose-50/55 p-4">
              <p className="text-sm font-medium text-rose-800">What We Need To Improve</p>
              <div className="mt-4 space-y-3">
                {weaknesses.map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-[8px] bg-white px-3 py-3 text-sm font-medium text-slate-800 ring-1 ring-rose-100">
                    <span>{item}</span>
                    <span className="text-rose-600">Gap</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[8px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-medium text-slate-950">Recommended Interventions</h2>
              <p className="mt-1 text-sm text-slate-500">Concrete actions mapped to the most urgent coverage gaps.</p>
            </div>
            <Link to="/university/collaboration" className="text-sm font-medium text-blue-700">
              Go to Collaboration Marketplace -&gt;
            </Link>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {interventions.map((item) => (
              <article key={item.title} className="rounded-[8px] border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-medium text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-xs font-semibold text-slate-500">{item.duration}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${metricToneClasses[item.tone]}`}>
                    {item.impact}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>

      {showSkillSetup ? <SkillSetupModal onClose={() => setShowSkillSetup(false)} /> : null}
    </div>
  )
}
