import React, { useState, useLayoutEffect, useRef } from 'react'
import { 
  Clock, 
  Check, 
  X, 
  Sparkles, 
  TrendingUp, 
  ChevronRight, 
  Milestone, 
  Bookmark, 
  BookOpen, 
  Code2, 
  Award, 
  ChevronDown, 
  Play, 
  BarChart3,
  Calendar,
  DollarSign,
  AlertCircle,
  Folder,
  Briefcase,
  Users,
  ListChecks,
  ListTodo,
  Activity,
  GraduationCap,
  Database,
  Trophy
} from 'lucide-react'
import { careerPathNetwork } from '../../data/mockData'

// Icon resolver for Prediction Timeline milestones
const MILESTONE_ICONS = {
  graduation: GraduationCap,
  database: Database,
  chart: BarChart3,
  briefcase: Briefcase,
  trophy: Trophy,
  award: Award,
  book: BookOpen
}

// ---------------------------------------------------------------------------
// Unified Mock Data Map (ROLE_ADVISOR_DATA)
// Mapped for all roles, coherent with candidate Chris Lee's profile.
// ---------------------------------------------------------------------------

const ROLE_ADVISOR_DATA = {
  'data-scientist': {
    timeline: '6-12 months',
    progress: 78,
    currentStage: "Taylor's Data Science Student",
    targetRole: 'Data Scientist',
    milestones: ['Graduating (Taylor\'s)', 'SQL & Stats Prep', 'Sales Dashboard', 'ML Portfolio Prep', 'Data Scientist'],
    milestoneDetails: [
      { label: "Graduating (Taylor's)", status: 'Completed', icon: 'graduation' },
      { label: "SQL & Stats Prep", status: 'Completed', icon: 'database' },
      { label: "Sales Dashboard", status: 'Completed', icon: 'chart' },
      { label: "ML Portfolio Prep", status: 'In Progress', icon: 'book' },
      { label: "Data Scientist", status: 'Goal', icon: 'trophy' }
    ],
    transitionTimes: ['~1 month', '~1 month', '~2-3 months', '~3-5 months'],
    aiExplanation: "Based on your Taylor's University coursework, Python/SQL strengths, and your completed Sales Dashboard project, you're approximately 78% of the way toward becoming a Data Scientist.",
    existingGaps: ['SQL', 'Python', 'Excel', 'Data Visualization'],
    missingGaps: ['Advanced Machine Learning', 'Big Data Technologies (Spark/Hadoop)', 'ML Model Deployment'],
    salaryOverall: 'RM 11,400',
    salaryGrowth: '+20%',
    salaryTop: 'RM 25,000',
    salaryLevels: ['Junior Data Scientist', 'Data Scientist', 'Senior Data Scientist', 'Lead Data Scientist', 'Principal Data Scientist', 'Director of Data Science'],
    salaryExperience: ['0-2 yrs', '1-3 yrs', '3-5 yrs', '5-8 yrs', '8-12 yrs', '12+ yrs'],
    salaryValues: [4800, 7000, 9800, 13800, 18000, 25000],
    actions: [
      'Master deep learning frameworks (TensorFlow or PyTorch).',
      'Build and deploy a machine learning model using FastAPI and Docker.',
      'Learn big data processing tools like Apache Spark or Hadoop.',
      'Publish a data science portfolio project on GitHub.',
      'Apply to data scientist internships and entry-level positions.'
    ],
    skills: [
      { label: 'Python & SQL', value: 85, color: 'bg-indigo-500' },
      { label: 'Data Visualization', value: 70, color: 'bg-blue-500' },
      { label: 'Machine Learning', value: 45, color: 'bg-amber-500' },
      { label: 'Big Data (Spark)', value: 20, color: 'bg-rose-500' },
      { label: 'Model Deployment', value: 15, color: 'bg-rose-500' }
    ],
    learningResources: [
      { title: 'Deep Learning Specialization by Andrew Ng', platform: 'Coursera', rating: '4.9 ★', mapsTo: 'Maps to Step 1: Deep Learning frameworks', url: '#' },
      { title: 'MLOps Engineering with FastAPI & Docker', platform: 'Udemy', rating: '4.9 ★', mapsTo: 'Maps to Step 2: Build & Deploy ML', url: '#' },
      { title: 'Spark and Python for Big Data', platform: 'Udemy', rating: '4.8 ★', mapsTo: 'Maps to Step 3: Spark/Hadoop', url: '#' },
      { title: 'Data Science Portfolio Guidebook', platform: 'CareerOS Resource', rating: '4.7 ★', mapsTo: 'Maps to Step 4: GitHub Portfolio', url: '#' }
    ]
  },
  'data-analyst': {
    timeline: '3-6 months',
    progress: 88,
    currentStage: "Taylor's Data Science Student",
    targetRole: 'Data Analyst',
    milestones: ['Graduating (Taylor\'s)', 'SQL & Excel Mastery', 'Sales Dashboard', 'Intern Placement', 'Data Analyst'],
    milestoneDetails: [
      { label: "Graduating (Taylor's)", status: 'Completed', icon: 'graduation' },
      { label: "SQL & Excel Mastery", status: 'Completed', icon: 'database' },
      { label: "Sales Dashboard", status: 'Completed', icon: 'chart' },
      { label: "Intern Placement", status: 'In Progress', icon: 'briefcase' },
      { label: "Data Analyst", status: 'Goal', icon: 'trophy' }
    ],
    transitionTimes: ['~1 month', '~1 month', '~1-2 months', '~2-3 months'],
    aiExplanation: "With your existing SQL, Excel, and Power BI dashboard project from Taylor's University, you are extremely close (88%) to launching your career as a Data Analyst.",
    existingGaps: ['SQL', 'Excel', 'Python', 'Data Visualization'],
    missingGaps: ['Tableau Dashboarding', 'Advanced SQL (CTEs, Joins)', 'A/B Testing principles'],
    salaryOverall: 'RM 8,200',
    salaryGrowth: '+15%',
    salaryTop: 'RM 20,000',
    salaryLevels: ['Junior Data Analyst', 'Data Analyst', 'Senior Data Analyst', 'Lead Data Analyst', 'Principal Data Analyst', 'Director of Analytics'],
    salaryExperience: ['0-2 yrs', '1-3 yrs', '3-5 yrs', '5-8 yrs', '8-12 yrs', '12+ yrs'],
    salaryValues: [3800, 5800, 8000, 11000, 15000, 20000],
    actions: [
      'Learn Tableau and build 3 interactive business dashboards.',
      'Practice advanced SQL query optimizations and window functions.',
      'Study basic A/B testing principles for product analytics.',
      'Apply for Data Analyst internships (e.g. Shopee Data Analyst Intern).',
      'Optimize LinkedIn profile targeting data analyst roles.'
    ],
    skills: [
      { label: 'Excel & SQL', value: 90, color: 'bg-indigo-500' },
      { label: 'Data Visualization', value: 85, color: 'bg-blue-500' },
      { label: 'Python Analytics', value: 75, color: 'bg-emerald-500' },
      { label: 'Tableau', value: 40, color: 'bg-amber-500' },
      { label: 'A/B Testing', value: 25, color: 'bg-rose-500' }
    ],
    learningResources: [
      { title: 'Data Visualization with Tableau Specialization', platform: 'Coursera', rating: '4.8 ★', mapsTo: 'Maps to Step 1: Learn Tableau', url: '#' },
      { title: 'Advanced SQL Interview Prep (CTEs & Joins)', platform: 'DataLemur', rating: '4.9 ★', mapsTo: 'Maps to Step 2: Advanced SQL Practice', url: '#' },
      { title: 'A/B Testing for Product Analytics', platform: 'Udemy', rating: '4.7 ★', mapsTo: 'Maps to Step 3: A/B Testing Principles', url: '#' },
      { title: 'Data Analyst Resume & LinkedIn Playbook', platform: 'CareerOS Resource', rating: '4.8 ★', mapsTo: 'Maps to Step 5: LinkedIn Optimization', url: '#' }
    ]
  },
  'software-engineer': {
    timeline: '12-18 months',
    progress: 55,
    currentStage: "Taylor's Data Science Student",
    targetRole: 'Software Engineer',
    milestones: ['Graduating (Taylor\'s)', 'Git & Python Coding', 'LeetCode DSA Prep', 'Full-Stack Web App', 'Software Engineer'],
    milestoneDetails: [
      { label: "Graduating (Taylor's)", status: 'Completed', icon: 'graduation' },
      { label: "Git & Python Coding", status: 'Completed', icon: 'database' },
      { label: "LeetCode DSA Prep", status: 'In Progress', icon: 'book' },
      { label: "Full-Stack Web App", status: 'Upcoming', icon: 'chart' },
      { label: "Software Engineer", status: 'Goal', icon: 'trophy' }
    ],
    transitionTimes: ['~1 month', '~2-3 months', '~3-4 months', '~6-8 months'],
    aiExplanation: "Leveraging your strong Python programming basics, transitioning to software engineering will require focusing heavily on data structures, algorithms, and system design.",
    existingGaps: ['Python', 'SQL', 'Git basics'],
    missingGaps: ['Data Structures & Algorithms', 'System Design Foundations', 'Cloud Architecture (AWS/GCP)'],
    salaryOverall: 'RM 9,800',
    salaryGrowth: '+18%',
    salaryTop: 'RM 23,500',
    salaryLevels: ['Junior Developer', 'Software Engineer', 'Senior Developer', 'Lead Developer', 'Principal Engineer', 'Director of Engineering'],
    salaryExperience: ['0-2 yrs', '1-3 yrs', '3-5 yrs', '5-8 yrs', '8-12 yrs', '12+ yrs'],
    salaryValues: [4200, 6500, 9000, 12800, 17000, 23500],
    actions: [
      'Complete the LeetCode 75 study guide for coding interviews.',
      'Study system design patterns (caching, database scaling, load balancing).',
      'Build a full-stack web application using React and FastAPI.',
      'Gain hands-on experience with AWS, Docker, and CI/CD pipelines.',
      'Participate in a developer hackathon project.'
    ],
    skills: [
      { label: 'Python & Git', value: 80, color: 'bg-indigo-500' },
      { label: 'Data Structures', value: 50, color: 'bg-amber-500' },
      { label: 'SQL Databases', value: 70, color: 'bg-blue-500' },
      { label: 'System Design', value: 30, color: 'bg-rose-500' },
      { label: 'Cloud & Docker', value: 25, color: 'bg-rose-500' }
    ],
    learningResources: [
      { title: 'LeetCode 75 Coding Interview Prep', platform: 'LeetCode', rating: '4.9 ★', mapsTo: 'Maps to Step 1: LeetCode Study Guide', url: '#' },
      { title: 'Grokking the System Design Interview', platform: 'Educative', rating: '4.9 ★', mapsTo: 'Maps to Step 2: System Design Patterns', url: '#' },
      { title: 'Full-Stack Web Development with React & FastAPI', platform: 'Coursera', rating: '4.8 ★', mapsTo: 'Maps to Step 3: Build Full-stack App', url: '#' },
      { title: 'Docker & Kubernetes: The Complete Guide', platform: 'Udemy', rating: '4.8 ★', mapsTo: 'Maps to Step 4: AWS, Docker & CI/CD', url: '#' }
    ]
  },
  'product-manager': {
    timeline: '18-24 months',
    progress: 45,
    currentStage: "Taylor's Data Science Student",
    targetRole: 'Product Manager',
    milestones: ['Graduating (Taylor\'s)', 'Product Analytics Basics', 'Hackathon PM Lead', 'CSPO Agile Cert', 'Product Manager'],
    milestoneDetails: [
      { label: "Graduating (Taylor's)", status: 'Completed', icon: 'graduation' },
      { label: "Product Analytics Basics", status: 'Completed', icon: 'database' },
      { label: "Hackathon PM Lead", status: 'In Progress', icon: 'briefcase' },
      { label: "CSPO Agile Cert", status: 'Upcoming', icon: 'award' },
      { label: "Product Manager", status: 'Goal', icon: 'trophy' }
    ],
    transitionTimes: ['~2 months', '~3-4 months', '~4-6 months', '~8-12 months'],
    aiExplanation: "Your analytics background provides an excellent foundation in data-driven decision-making. Developing product strategy, user story creation, and leading hackathon squads will be key.",
    existingGaps: ['Data Visualization', 'SQL', 'Python'],
    missingGaps: ['Product Strategy & Analytics', 'Agile Product Management', 'Stakeholder Management'],
    salaryOverall: 'RM 11,800',
    salaryGrowth: '+16%',
    salaryTop: 'RM 26,000',
    salaryLevels: ['Associate PM', 'Product Manager', 'Senior PM', 'Lead PM', 'Group PM', 'Director of Product'],
    salaryExperience: ['0-2 yrs', '1-3 yrs', '3-5 yrs', '5-8 yrs', '8-12 yrs', '12+ yrs'],
    salaryValues: [4800, 7200, 10000, 14000, 18500, 26000],
    actions: [
      'Learn product management strategy and customer interview techniques.',
      'Study product funnel analysis using tools like Amplitude.',
      'Lead a student project team or hackathon squad.',
      'Earn Scrum Product Owner (CSPO) or Agile certification.',
      'Apply to Associate Product Manager (APM) graduate roles.'
    ],
    skills: [
      { label: 'Data Storytelling', value: 75, color: 'bg-blue-500' },
      { label: 'Product Funnels', value: 40, color: 'bg-amber-500' },
      { label: 'Agile & Scrum', value: 65, color: 'bg-emerald-500' },
      { label: 'Product Strategy', value: 30, color: 'bg-rose-500' },
      { label: 'Stakeholder Comms', value: 85, color: 'bg-indigo-500' }
    ],
    learningResources: [
      { title: 'Product Management Masterclass Strategy Cert', platform: 'Product School', rating: '4.8 ★', mapsTo: 'Maps to Step 1: Product strategy & Interview', url: '#' },
      { title: 'Product Analytics with Amplitude Academy', platform: 'Amplitude', rating: '4.8 ★', mapsTo: 'Maps to Step 2: Funnel analysis & Amplitude', url: '#' },
      { title: 'Certified Scrum Product Owner (CSPO) Course', platform: 'Scrum Alliance', rating: '4.7 ★', mapsTo: 'Maps to Step 4: CSPO / Agile Certification', url: '#' },
      { title: 'APM Cohort Recruitment Guidebook', platform: 'CareerOS Resource', rating: '4.8 ★', mapsTo: 'Maps to Step 5: APM Graduate Roles', url: '#' }
    ]
  },
  'business-analyst': {
    timeline: '6-12 months',
    progress: 68,
    currentStage: "Taylor's Data Science Student",
    targetRole: 'Business Analyst',
    milestones: ['Graduating (Taylor\'s)', 'Excel & SQL Analytics', 'Sales Dashboard', 'BPMN Process Mapping', 'Business Analyst'],
    milestoneDetails: [
      { label: "Graduating (Taylor's)", status: 'Completed', icon: 'graduation' },
      { label: "Excel & SQL Analytics", status: 'Completed', icon: 'database' },
      { label: "Sales Dashboard", status: 'Completed', icon: 'chart' },
      { label: "BPMN Process Mapping", status: 'In Progress', icon: 'briefcase' },
      { label: "Business Analyst", status: 'Goal', icon: 'trophy' }
    ],
    transitionTimes: ['~1 month', '~1 month', '2-3 months', '~3-5 months'],
    aiExplanation: "Based on your completed Sales Dashboard project, Excel/SQL analytics skills and current coursework, you're approximately 68% of the way toward becoming a Business Analyst.",
    existingGaps: ['SQL', 'Excel', 'Data Visualization'],
    missingGaps: ['Stakeholder Management', 'Business Process Mapping', 'Agile Methodology'],
    salaryOverall: 'RM 9,600',
    salaryGrowth: '+18%',
    salaryTop: 'RM 22,000',
    salaryLevels: ['Junior BA', 'Business Analyst', 'Senior BA', 'Lead BA', 'Principal BA', 'Head of Business Analysis'],
    salaryExperience: ['0-2 yrs', '1-3 yrs', '3-5 yrs', '5-8 yrs', '8-12 yrs', '12+ yrs'],
    salaryValues: [4000, 6200, 8500, 12000, 16500, 22000],
    actions: [
      'Learn BPMN process modelling.',
      'Build an end-to-end dashboard using Power BI.',
      'Earn Scrum Product Owner certification.',
      'Practice SQL joins and aggregations.',
      'Apply for Business Analyst internships.'
    ],
    skills: [
      { label: 'Communication', value: 90, color: 'bg-emerald-500' },
      { label: 'Excel', value: 85, color: 'bg-blue-500' },
      { label: 'Requirements Gathering', value: 65, color: 'bg-amber-500' },
      { label: 'SQL', value: 40, color: 'bg-indigo-500' },
      { label: 'Stakeholder Management', value: 35, color: 'bg-rose-500' }
    ],
    learningResources: [
      { title: 'Business Process Management & BPMN Guide', platform: 'Coursera', rating: '4.8 ★', mapsTo: 'Maps to Step 1: Learn BPMN modelling', url: '#' },
      { title: 'Microsoft Power BI Desktop for Business Intelligence', platform: 'Udemy', rating: '4.9 ★', mapsTo: 'Maps to Step 2: Power BI Dashboard', url: '#' },
      { title: 'Certified Scrum Product Owner (CSPO) Course', platform: 'Scrum Alliance', rating: '4.7 ★', mapsTo: 'Maps to Step 3: Scrum Product Owner', url: '#' },
      { title: 'Advanced SQL Practice & Aggregations', platform: 'DataLemur', rating: '4.9 ★', mapsTo: 'Maps to Step 4: SQL Joins', url: '#' }
    ]
  },
  'ml-engineer': {
    timeline: '12-18 months',
    progress: 60,
    currentStage: "Taylor's Data Science Student",
    targetRole: 'Machine Learning Engineer',
    milestones: ['Graduating (Taylor\'s)', 'Python & Math Foundations', 'ML Modeling Basics', 'PyTorch & Deployment Prep', 'ML Engineer'],
    milestoneDetails: [
      { label: "Graduating (Taylor's)", status: 'Completed', icon: 'graduation' },
      { label: "Python & Math Foundations", status: 'Completed', icon: 'database' },
      { label: "ML Modeling Basics", status: 'In Progress', icon: 'chart' },
      { label: "PyTorch & Deployment Prep", status: 'Upcoming', icon: 'briefcase' },
      { label: "ML Engineer", status: 'Goal', icon: 'trophy' }
    ],
    transitionTimes: ['~1 month', '~2-3 months', '~3-4 months', '~5-7 months'],
    aiExplanation: "Transitioning to ML Engineering will require upgrading your solid Python foundations and statistical modelling basics to deep learning frameworks (PyTorch) and model hosting API services.",
    existingGaps: ['Python', 'SQL', 'NLP basics'],
    missingGaps: ['TensorFlow/PyTorch frameworks', 'MLOps & model deployment', 'GPU scaling & optimization'],
    salaryOverall: 'RM 12,800',
    salaryGrowth: '+24%',
    salaryTop: 'RM 28,000',
    salaryLevels: ['Junior ML Engineer', 'ML Engineer', 'Senior ML Engineer', 'Lead ML Engineer', 'Principal ML Engineer', 'Director of AI'],
    salaryExperience: ['0-2 yrs', '1-3 yrs', '3-5 yrs', '5-8 yrs', '8-12 yrs', '12+ yrs'],
    salaryValues: [5000, 7500, 11000, 15500, 20000, 28000],
    actions: [
      'Learn PyTorch.',
      'Build an image classification project.',
      'Deploy a model with FastAPI.',
      'Learn Docker.',
      'Participate in a Kaggle competition.'
    ],
    skills: [
      { label: 'Python', value: 90, color: 'bg-indigo-500' },
      { label: 'Machine Learning', value: 75, color: 'bg-blue-500' },
      { label: 'PyTorch', value: 45, color: 'bg-amber-500' },
      { label: 'Docker', value: 20, color: 'bg-rose-500' },
      { label: 'Cloud', value: 15, color: 'bg-rose-500' }
    ],
    learningResources: [
      { title: 'PyTorch for Deep Learning Boot Camp', platform: 'DeepLearning.AI', rating: '4.8 ★', mapsTo: 'Maps to Step 1: Learn PyTorch', url: '#' },
      { title: 'FastAPI & Docker: Deploying ML Models in Production', platform: 'Udemy', rating: '4.9 ★', mapsTo: 'Maps to Step 3: Deploy with FastAPI', url: '#' },
      { title: 'Machine Learning Competitions Sandbox Guide', platform: 'Kaggle', rating: '4.7 ★', mapsTo: 'Maps to Step 5: Kaggle Competitions', url: '#' },
      { title: 'MLOps & CI/CD for Data Science Pipelines', platform: 'Coursera', rating: '4.8 ★', mapsTo: 'Maps to Step 4: Learn Docker', url: '#' }
    ]
  },
  'accountant': {
    timeline: '12-18 months',
    progress: 58,
    currentStage: "Taylor's Data Science Student",
    targetRole: 'Accountant',
    milestones: ['Graduating (Taylor\'s)', 'Excel Foundations', 'Financial Auditing Prep', 'ACCA Certification', 'Accountant'],
    milestoneDetails: [
      { label: "Graduating (Taylor's)", status: 'Completed', icon: 'graduation' },
      { label: "Excel Foundations", status: 'Completed', icon: 'database' },
      { label: "Financial Auditing Prep", status: 'In Progress', icon: 'book' },
      { label: "ACCA Certification", status: 'Upcoming', icon: 'award' },
      { label: "Accountant", status: 'Goal', icon: 'trophy' }
    ],
    transitionTimes: ['~1 month', '~3-4 months', '~4-6 months', '~8-12 months'],
    aiExplanation: "Your strong foundations in Excel and data processing give you an analytical edge, but transitioning to accounting requires gaining domain knowledge in financial regulations (IFRS/MFRS) and professional accounting standards.",
    existingGaps: ['Excel', 'SQL', 'Data Auditing'],
    missingGaps: ['Financial Accounting (IFRS)', 'Taxation & Audit Regulations', 'ACCA Certification Prep'],
    salaryOverall: 'RM 5,500',
    salaryGrowth: '+12%',
    salaryTop: 'RM 15,000',
    salaryLevels: ['Junior Accountant', 'Accountant', 'Senior Accountant', 'Finance Manager', 'Finance Director', 'CFO'],
    salaryExperience: ['0-2 yrs', '1-3 yrs', '3-5 yrs', '5-8 yrs', '8-12 yrs', '12+ yrs'],
    salaryValues: [3500, 4800, 7000, 9500, 12000, 15000],
    actions: [
      'Enroll in ACCA or CIMA accounting certification modules.',
      'Master advanced Excel for corporate financial modeling.',
      'Learn regional tax laws, auditing procedures, and IFRS rules.',
      'Apply to junior accountant or finance analyst roles.'
    ],
    skills: [
      { label: 'Excel Modeling', value: 85, color: 'bg-indigo-500' },
      { label: 'Data Auditing', value: 60, color: 'bg-blue-500' },
      { label: 'Financial Accounting', value: 20, color: 'bg-rose-500' },
      { label: 'Taxation & Audit', value: 15, color: 'bg-rose-500' },
      { label: 'Regulatory Compliance', value: 10, color: 'bg-rose-500' }
    ],
    learningResources: [
      { title: 'Introduction to Financial Accounting', platform: 'Coursera', rating: '4.8 ★', mapsTo: 'Maps to Step 3: Financial auditing prep', url: '#' },
      { title: 'Advanced Financial Modeling in Excel', platform: 'Udemy', rating: '4.9 ★', mapsTo: 'Maps to Step 2: Excel foundations', url: '#' },
      { title: 'ACCA Foundation Module Prep', platform: 'ACCA Global', rating: '4.7 ★', mapsTo: 'Maps to Step 4: ACCA Cert', url: '#' }
    ]
  },
  'financial-analyst': {
    timeline: '6-12 months',
    progress: 70,
    currentStage: "Taylor's Data Science Student",
    targetRole: 'Financial Analyst',
    milestones: ['Graduating (Taylor\'s)', 'Excel & SQL Foundations', 'Sales Dashboard', 'Financial Modeling Prep', 'Financial Analyst'],
    milestoneDetails: [
      { label: "Graduating (Taylor's)", status: 'Completed', icon: 'graduation' },
      { label: "Excel & SQL Foundations", status: 'Completed', icon: 'database' },
      { label: "Sales Dashboard", status: 'Completed', icon: 'chart' },
      { label: "Financial Modeling Prep", status: 'In Progress', icon: 'book' },
      { label: "Financial Analyst", status: 'Goal', icon: 'trophy' }
    ],
    transitionTimes: ['~1 month', 'Completed', '~2-3 months', '~3-5 months'],
    aiExplanation: "Your SQL, Excel analytics, and completed Sales Dashboard project provide a strong quantitative framework. Adapting these skills to cash flow modeling and portfolio valuation will be your main challenge.",
    existingGaps: ['SQL', 'Excel', 'Data Visualization'],
    missingGaps: ['Corporate Finance Principles', 'Financial Modeling (DCF, Valuation)', 'Chartered Financial Analyst (CFA) Level 1'],
    salaryOverall: 'RM 6,800',
    salaryGrowth: '+15%',
    salaryTop: 'RM 18,000',
    salaryLevels: ['Junior Analyst', 'Financial Analyst', 'Senior Financial Analyst', 'Finance Manager', 'Finance Director', 'CFO'],
    salaryExperience: ['0-2 yrs', '1-3 yrs', '3-5 yrs', '5-8 yrs', '8-12 yrs', '12+ yrs'],
    salaryValues: [3800, 5200, 7500, 10500, 14000, 18000],
    actions: [
      'Build a DCF (Discounted Cash Flow) evaluation model in Excel.',
      'Study corporate finance fundamentals and accounting ratios.',
      'Practice financial forecasting using statistical analysis in Python.',
      'Apply to junior financial analyst or treasury analyst roles.'
    ],
    skills: [
      { label: 'Excel & Forecasting', value: 85, color: 'bg-indigo-500' },
      { label: 'SQL Analytics', value: 70, color: 'bg-blue-500' },
      { label: 'Financial Modeling', value: 30, color: 'bg-rose-500' },
      { label: 'CFA Candidate', value: 15, color: 'bg-rose-500' },
      { label: 'Market Research', value: 60, color: 'bg-emerald-500' }
    ],
    learningResources: [
      { title: 'Introduction to Corporate Finance', platform: 'Coursera', rating: '4.8 ★', mapsTo: 'Maps to Step 4: Financial modeling prep', url: '#' },
      { title: 'Advanced Financial Modeling with Excel', platform: 'Udemy', rating: '4.9 ★', mapsTo: 'Maps to Step 2: Excel & SQL', url: '#' },
      { title: 'CFA Level 1 Exam Prep Guide', platform: 'CFA Institute', rating: '4.7 ★', mapsTo: 'Maps to Step 4: CFA Candidate Prep', url: '#' }
    ]
  }
}

// Fallback Default Data (Matches Operations Analyst / Marketing Analyst theme)
const DEFAULT_ADVISOR = {
  timeline: '6-12 months',
  progress: 65,
  currentStage: "Taylor's Data Science Student",
  targetRole: 'Marketing Analyst',
  milestones: ['Graduating (Taylor\'s)', 'SQL & Excel Foundations', 'Domain Analytics Prep', 'Junior Placement', 'Marketing Analyst'],
  milestoneDetails: [
    { label: "Graduating (Taylor's)", status: 'Completed', icon: 'graduation' },
    { label: "SQL & Excel Foundations", status: 'Completed', icon: 'database' },
    { label: "Domain Analytics Prep", status: 'In Progress', icon: 'briefcase' },
    { label: "Junior Placement", status: 'Upcoming', icon: 'chart' },
    { label: "Marketing Analyst", status: 'Goal', icon: 'trophy' }
  ],
  transitionTimes: ['~1 month', '~2-3 months', '~3-4 months', '~3-5 months'],
  aiExplanation: "Your SQL and Excel foundations give you an edge. Building domain knowledge in digital campaigns and product marketing is your next step.",
  existingGaps: ['SQL', 'Excel', 'Data Visualization'],
  missingGaps: ['Marketing Analytics Tools', 'A/B Testing & Campaigns', 'Customer Segmentation'],
  salaryOverall: 'RM 8,000',
  salaryGrowth: '+14%',
  salaryTop: 'RM 20,000',
  salaryLevels: ['Junior Analyst', 'Marketing Analyst', 'Senior Analyst', 'Lead Analyst', 'Principal Analyst', 'Director of Analytics'],
  salaryExperience: ['0-2 yrs', '1-3 yrs', '3-5 yrs', '5-8 yrs', '8-12 yrs', '12+ yrs'],
  salaryValues: [3800, 5500, 7800, 10800, 14500, 20000],
  actions: [
    'Complete digital marketing foundations certification.',
    'Build a customer segmentation model using K-means clustering in Python.',
    'Practice Google Analytics campaign mapping and tag manager setup.',
    'Apply to marketing analytics and growth intern positions.',
    'Build a dashboard visualizing marketing campaign ROI.'
  ],
  skills: [
    { label: 'Data Wrangling', value: 75, color: 'bg-indigo-500' },
    { label: 'SQL Databases', value: 70, color: 'bg-blue-500' },
    { label: 'Campaign Analysis', value: 40, color: 'bg-amber-500' },
    { label: 'A/B Testing', value: 30, color: 'bg-rose-500' },
    { label: 'Market Research', value: 50, color: 'bg-emerald-500' }
  ],
  learningResources: [
    { title: 'Digital Marketing Foundations Certification', platform: 'Coursera', rating: '4.7 ★', mapsTo: 'Maps to Step 1: Marketing foundations', url: '#' },
    { title: 'K-Means Customer Segmentation in Python', platform: 'Kaggle', rating: '4.8 ★', mapsTo: 'Maps to Step 2: Customer segmentation', url: '#' },
    { title: 'Google Analytics Campaign Tracking Suite', platform: 'LinkedIn Learning', rating: '4.7 ★', mapsTo: 'Maps to Step 3: Google Analytics setup', url: '#' },
    { title: 'Marketing Analytics Dashboard Building', platform: 'Udemy', rating: '4.8 ★', mapsTo: 'Maps to Step 5: Visualizing Campaign ROI', url: '#' }
  ]
}

// Helper to calculate Estimated Arrival Date dynamically
const getEstimatedArrival = (timeline) => {
  const now = new Date()
  let monthsToAdd = 6
  if (timeline.includes('3-6')) monthsToAdd = 6
  else if (timeline.includes('6-12')) monthsToAdd = 12
  else if (timeline.includes('12-18')) monthsToAdd = 18
  else if (timeline.includes('18-24')) monthsToAdd = 24
  
  now.setMonth(now.getMonth() + monthsToAdd)
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  return `${monthNames[now.getMonth()]} ${now.getFullYear()}`
}

// ---------------------------------------------------------------------------
// Catmull-Rom / Smooth Cubic Bezier Line Generator for SVG Charts
// ---------------------------------------------------------------------------
function getBezierCurvePath(points) {
  if (points.length === 0) return ''
  let path = `M ${points[0].x} ${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i]
    const p1 = points[i + 1]
    const cpX1 = p0.x + (p1.x - p0.x) / 3
    const cpY1 = p0.y
    const cpX2 = p0.x + 2 * (p1.x - p0.x) / 3
    const cpY2 = p1.y
    path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`
  }
  return path
}

// ---------------------------------------------------------------------------
// Core Empty State
// ---------------------------------------------------------------------------
function EmptyState() {
  return (
    <div className="flex min-h-[140px] items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-gray-50/60 p-8 text-center animate-[fadeInScale_200ms_ease-out]">
      <p className="text-sm font-semibold italic text-[#9aa6c3]">
        Select a career role node above to project your prediction timeline & salary benchmark
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Helper Sub-Modules (Retained for Tab Navigation chips from Chat Panel)
// ---------------------------------------------------------------------------
function FitModule({ roleId, roleName }) {
  const data = ROLE_ADVISOR_DATA[roleId] || DEFAULT_ADVISOR
  return (
    <article className="animate-[slideUp_300ms_ease-out_both] rounded-2xl border border-[#e2eaf8] border-l-[3px] border-l-[#185FA5] bg-white p-6 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
      <h3 className="text-base font-bold text-[#11194a]">Fit Score · {roleName}</h3>
      <div className="mt-5 grid gap-6 md:grid-cols-[0.8fr_1.25fr_0.95fr]">
        <div>
          <p className="text-5xl font-bold text-[#185FA5]">{data.progress}%</p>
          <p className="mt-1 text-sm font-semibold text-[#7382a1]">match score</p>
        </div>
        <div className="space-y-4 border-y border-[#e2eaf8] py-4 md:border-x md:border-y-0 md:px-6 md:py-0">
          <div>
            <p className="text-sm font-bold text-[#11194a]">Strong signals</p>
            <p className="mt-2 text-sm font-semibold text-[#3a4669]">
              <span className="text-emerald-500">●</span> {data.existingGaps.join(' · ')}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-[#11194a]">Gaps detected</p>
            <p className="mt-2 text-sm font-semibold text-[#3a4669]">
              <span className="text-orange-500">●</span> {data.missingGaps.join(' · ')}
            </p>
          </div>
        </div>
        <div>
          <div className="flex h-28 items-end justify-center gap-8">
            <div className="text-center">
              <p className="mb-2 text-sm font-bold text-[#11194a]">{data.progress}%</p>
              <div className="h-20 w-14 rounded-t-md bg-blue-600" />
              <p className="mt-2 text-xs font-semibold text-[#7382a1]">Chris</p>
            </div>
            <div className="text-center">
              <p className="mb-2 text-sm font-bold text-[#11194a]">65%</p>
              <div className="h-16 w-14 rounded-t-md bg-slate-200" />
              <p className="mt-2 text-xs font-semibold text-[#7382a1]">Avg. {roleName}</p>
            </div>
          </div>
          <p className="mt-3 text-center text-xs font-semibold text-[#7382a1]">You vs. average candidate</p>
        </div>
      </div>
    </article>
  )
}

function SkillsModule({ roleId, roleName }) {
  const data = ROLE_ADVISOR_DATA[roleId] || DEFAULT_ADVISOR
  return (
    <article className="animate-[slideUp_300ms_ease-out_both] rounded-2xl border border-[#e2eaf8] bg-white p-6 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
      <h3 className="text-base font-bold text-[#11194a]">Skills Required · {roleName}</h3>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-bold text-emerald-600">You have these ✓</p>
          {data.existingGaps.map((skill) => (
            <div key={skill} className="mb-4">
              <p className="text-sm font-semibold text-[#3a4669]">✓ {skill} · Advanced</p>
              <div className="mt-2 h-2 rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: '80%' }} />
              </div>
            </div>
          ))}
        </div>
        <div>
          <p className="mb-3 text-sm font-bold text-orange-600">Build these next</p>
          {data.missingGaps.map((skill) => (
            <div key={skill} className="mb-4">
              <p className="text-sm font-semibold text-[#3a4669]">● {skill}</p>
              <div className="mt-2 h-2 rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-orange-400" style={{ width: '25%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

function DemandModule({ roleName }) {
  const companies = [['Grab', 85], ['Shopee', 72], ['TalentBank', 68], ['CIMB', 55], ['Axiata', 48]]
  return (
    <article className="animate-[slideUp_300ms_ease-out_both] rounded-2xl border border-[#e2eaf8] bg-white p-6 shadow-[0_8px_22px_rgba(44,76,142,0.07)]">
      <h3 className="text-base font-bold text-[#11194a]">Market Demand · {roleName}</h3>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {[
          ['Open roles in Malaysia', '1,452', '↑ 14% this year'],
          ['Avg. starting salary', 'RM 4,500/mo', 'Entry level'],
          ['Your edge', 'NLP & AI skills', '↑ +34% demand'],
        ].map(([label, value, note]) => (
          <div key={label} className="rounded-xl border border-[#e2eaf8] bg-[#f8fbff] p-4">
            <p className="text-xs font-semibold text-[#7382a1]">{label}</p>
            <p className="mt-1 text-xl font-bold text-[#11194a]">{value}</p>
            <p className={`mt-1 text-xs font-bold ${note.includes('Entry') ? 'text-blue-600' : 'text-emerald-600'}`}>{note}</p>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <p className="mb-3 text-sm font-bold text-[#11194a]">Top hiring companies in Malaysia</p>
        {companies.map(([name, value]) => (
          <div key={name} className="mb-3 grid grid-cols-[90px_minmax(0,1fr)] items-center gap-3">
            <p className="text-sm font-semibold text-[#3a4669]">{name}</p>
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${value}%` }} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs font-semibold text-[#9aa6c3]">Based on LinkedIn + JobStreet data · Updated this week</p>
    </article>
  )
}

// ---------------------------------------------------------------------------
// Salary Benchmark Component (With hover bug fixed)
// ---------------------------------------------------------------------------
function SalaryBenchmarkSection({ roleId, roleName }) {
  const data = ROLE_ADVISOR_DATA[roleId] || DEFAULT_ADVISOR
  const levels = data.salaryLevels
  const experience = data.salaryExperience
  const salaries = data.salaryValues

  // Hover state for coordinates
  const [hoveredPoint, setHoveredPoint] = useState(null)

  // Chart coordinates config
  const width = 760
  const height = 230
  const paddingLeft = 70
  const paddingRight = 40
  const paddingTop = 30
  const paddingBottom = 40

  const maxSalary = Math.max(...salaries) * 1.15
  const plotWidth = width - paddingLeft - paddingRight
  const plotHeight = height - paddingTop - paddingBottom
  const spacing = plotWidth / (levels.length - 1)

  const points = salaries.map((sal, index) => {
    const x = paddingLeft + index * spacing
    const y = height - paddingBottom - (sal / maxSalary) * plotHeight
    return { x, y }
  })

  const linePath = getBezierCurvePath(points)
  const fillPath = points.length > 0 
    ? `${linePath} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z` 
    : ''

  const gridLines = [0.25, 0.5, 0.75, 1.0]

  return (
    <div className="rounded-2xl border border-slate-100 bg-[#f8fbff]/60 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] space-y-5">
      {/* 3 stats cards at top */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
            <DollarSign size={16} />
          </span>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Average overall salary</p>
            <p className="text-sm font-black text-[#11194a]">{data.salaryOverall} <span className="text-[10px] font-bold text-slate-400">/ mo</span></p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <TrendingUp size={16} />
          </span>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Salary growth (yoy)</p>
            <p className="text-sm font-black text-emerald-600">{data.salaryGrowth} <span className="text-[10px] font-bold text-slate-400">Average</span></p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <BarChart3 size={16} />
          </span>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Top earning level</p>
            <p className="text-sm font-black text-[#11194a]">{data.salaryTop} <span className="text-[10px] font-bold text-slate-400">/ mo</span></p>
          </div>
        </div>
      </div>

      {/* SVG chart */}
      <div>
        <h4 className="text-xs font-bold text-[#11194a] uppercase tracking-wider mb-2">
          Average Total Monthly Salary by Experience Level
        </h4>

        <div className="overflow-x-auto">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[700px] h-auto">
            <defs>
              <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {gridLines.map((ratio, index) => {
              const yVal = height - paddingBottom - ratio * plotHeight
              const gridLabelVal = Math.round(ratio * maxSalary)
              return (
                <g key={index}>
                  <line 
                    x1={paddingLeft} 
                    y1={yVal} 
                    x2={width - paddingRight} 
                    y2={yVal} 
                    stroke="#e2e8f0" 
                    strokeDasharray="4 4" 
                    strokeWidth="1"
                  />
                  <text 
                    x={paddingLeft - 10} 
                    y={yVal + 4} 
                    textAnchor="end" 
                    className="text-[9px] font-extrabold fill-slate-400"
                  >
                    RM {gridLabelVal.toLocaleString()}
                  </text>
                </g>
              );
            })}

            {/* Base line */}
            <line 
              x1={paddingLeft} 
              y1={height - paddingBottom} 
              x2={width - paddingRight} 
              y2={height - paddingBottom} 
              stroke="#cbd5e1" 
              strokeWidth="1.5"
            />
            <text 
              x={paddingLeft - 10} 
              y={height - paddingBottom + 4} 
              textAnchor="end" 
              className="text-[9px] font-extrabold fill-slate-400"
            >
              RM 0
            </text>

            {/* Polygon fill under the curve */}
            {fillPath && <path d={fillPath} fill="url(#curveGradient)" />}

            {/* Curved line stroke */}
            {linePath && (
              <path 
                d={linePath} 
                fill="none" 
                stroke="#6366f1" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
              />
            )}

            {/* Coordinates */}
            {points.map((pt, index) => {
              const sal = salaries[index]
              const levelName = levels[index]
              const expRange = experience[index]
              
              return (
                <g 
                  key={index} 
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(index)}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  {/* Single marker circle: enlarges 15% on hover with no extra outline drift */}
                  <circle 
                    cx={pt.x} 
                    cy={pt.y} 
                    r={hoveredPoint === index ? 5.5 : 4.8} 
                    fill={hoveredPoint === index ? '#6366f1' : '#ffffff'} 
                    stroke="#6366f1" 
                    strokeWidth={hoveredPoint === index ? 3.0 : 2.2} 
                    className="transition-all duration-200"
                  />

                  {/* Value tag above circle */}
                  <rect 
                    x={pt.x - 32} 
                    y={pt.y - 25} 
                    width="64" 
                    height="16" 
                    rx="4" 
                    fill={hoveredPoint === index ? '#1e1b4b' : '#ffffff'} 
                    stroke={hoveredPoint === index ? '#6366f1' : '#e2e8f0'} 
                    strokeWidth="1"
                    className="shadow-sm transition-colors duration-200"
                  />
                  <text 
                    x={pt.x} 
                    y={pt.y - 14} 
                    textAnchor="middle" 
                    className={`text-[8.5px] font-black transition-colors duration-200 ${hoveredPoint === index ? 'fill-white' : 'fill-[#11194a]'}`}
                  >
                    RM {sal.toLocaleString()}
                  </text>

                  {/* X axis labels */}
                  <text 
                    x={pt.x} 
                    y={height - paddingBottom + 16} 
                    textAnchor="middle" 
                    className="text-[9px] font-bold fill-[#11194a] tracking-tight"
                  >
                    {levelName}
                  </text>
                  <text 
                    x={pt.x} 
                    y={height - paddingBottom + 27} 
                    textAnchor="middle" 
                    className="text-[8px] font-extrabold fill-slate-400 uppercase tracking-wider"
                  >
                    {expRange}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400 bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
        <AlertCircle size={13} className="stroke-[2.5]" />
        <span>Salaries vary based on skills, industry, location, and company size. Benchmark datasets updated dynamically.</span>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// High-Fidelity Product Roadmap Timeline Component
// ---------------------------------------------------------------------------
function RedesignedPredictionTimeline({ roleId, roleName }) {
  const data = ROLE_ADVISOR_DATA[roleId] || DEFAULT_ADVISOR
  const progressPercent = data.progress
  const milestoneDetails = data.milestoneDetails
  const transitionTimes = data.transitionTimes
  const estimatedArrivalDate = getEstimatedArrival(data.timeline)

  // Hardcoded segment widths for exactly 5 steps spaced evenly:
  // Step 0 center: 8%, Step 1: 29%, Step 2: 50%, Step 3: 71%, Step 4: 92%
  return (
    <div className="rounded-2xl border border-slate-100 bg-[#f8fbff]/60 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] space-y-6">
      
      {/* Top section: Two Column Header */}
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-6 items-start">
        
        {/* Left Side: Estimated time & AI explanation bubble */}
        <div className="space-y-3.5">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Estimated Time to Reach</p>
            <p className="text-4xl font-black text-[#11194a] tracking-tight mt-0.5">{data.timeline}</p>
          </div>
          
          <div className="flex items-start gap-2.5 bg-white border border-slate-100 p-3.5 rounded-2xl shadow-sm">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600 border border-violet-100 mt-0.5">
              <Sparkles size={13} className="stroke-[2]" />
            </span>
            <p className="text-[11.5px] font-semibold text-slate-600 leading-normal">
              {data.aiExplanation}
            </p>
          </div>
        </div>

        {/* Right Side: Estimated Arrival Box */}
        <div className="bg-white border border-indigo-50/80 p-4 rounded-2xl shadow-sm flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50/50 text-indigo-600 border border-indigo-100">
            <Calendar size={18} className="stroke-[2.2]" />
          </span>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Estimated Arrival</p>
            <p className="text-lg font-black text-[#11194a] mt-0.5">{estimatedArrivalDate}</p>
            <p className="text-[10.5px] font-semibold text-slate-400 mt-1 leading-snug">
              This timeline is personalized based on your current skills, experience and activity.
            </p>
          </div>
        </div>

      </div>

      {/* Visual Timeline Track */}
      <div className="relative pt-8 pb-3 px-4 select-none">
        
        {/* Base Track Line */}
        <div className="absolute left-[8%] right-[8%] top-[48px] h-[3px] bg-slate-200 -translate-y-1/2 z-0" />

        {/* Color Tones for segments between nodes */}
        {/* Segment 1 (Step 1-2): Solid Green */}
        <div className="absolute left-[8%] w-[21%] top-[48px] h-[3px] bg-emerald-500 -translate-y-1/2 z-0" />
        
        {/* Segment 2 (Step 2-3): Gradient Green to Purple */}
        <div className="absolute left-[29%] w-[21%] top-[48px] h-[3px] bg-gradient-to-r from-emerald-500 to-indigo-500 -translate-y-1/2 z-0" />

        {/* Segment 3 (Step 3-4): Dotted Purple/Grey */}
        <div className="absolute left-[50%] w-[21%] top-[48px] h-0 border-t-2 border-dashed border-indigo-400 -translate-y-1/2 z-0" />

        {/* Segment 4 (Step 4-5): Dotted Grey */}
        <div className="absolute left-[71%] w-[21%] top-[48px] h-0 border-t-2 border-dashed border-slate-300 -translate-y-1/2 z-0" />

        {/* Floating Transition Times above segments */}
        {transitionTimes.map((time, idx) => {
          const positions = [18.5, 39.5, 60.5, 81.5]
          return (
            <div 
              key={idx} 
              className="absolute top-[16px] -translate-x-1/2 text-[9.5px] font-extrabold text-[#7c8ca5] bg-[#f8fbff] px-1.5 py-0.5 rounded border border-slate-100 shadow-sm"
              style={{ left: `${positions[idx]}%` }}
            >
              {time}
            </div>
          )
        })}

        {/* Milestone Steps Nodes & Cards Container */}
        <div className="relative flex justify-between items-start w-full">
          {milestoneDetails.map((milestone, idx) => {
            const IconComponent = MILESTONE_ICONS[milestone.icon] || Trophy
            const isCompleted = milestone.status === 'Completed'
            const isCurrent = milestone.status === 'In Progress'
            const isUpcoming = milestone.status === 'Upcoming'
            
            return (
              <div key={idx} className="flex flex-col items-center relative w-[130px]">
                
                {/* Node Ring Point */}
                <div className="relative h-8 flex items-center justify-center w-full">
                  
                  {/* Floating "YOU ARE HERE" bubble */}
                  {isCurrent && (
                    <div className="absolute -top-[34px] left-1/2 -translate-x-1/2 bg-[#6366f1] text-white text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-md z-30 whitespace-nowrap flex flex-col items-center">
                      <span>You are here</span>
                      <div className="w-1.5 h-1.5 bg-[#6366f1] rotate-45 -mb-[4px] mt-[1.5px]" />
                    </div>
                  )}

                  {/* Circle Pin point */}
                  {isCompleted ? (
                    <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm ring-4 ring-emerald-100/70">
                      <Check size={11} className="stroke-[3]" />
                    </div>
                  ) : isCurrent ? (
                    <div className="relative z-10 flex h-6.5 w-6.5 items-center justify-center rounded-full bg-[#6366f1] text-white shadow-md ring-4 ring-indigo-200/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    </div>
                  ) : (
                    <div className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-white border-2 border-slate-300 text-slate-300 shadow-sm ring-4 ring-slate-100">
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                    </div>
                  )}

                </div>

                {/* Milestone Detail Card below circle */}
                <div className={`mt-4 flex flex-col items-center justify-between p-3.5 rounded-2xl border text-center w-full min-h-[110px] shadow-sm bg-white hover:shadow transition duration-200 ${
                  isCompleted ? 'border-emerald-100/70 bg-emerald-50/10' : 
                  isCurrent ? 'border-indigo-100 bg-indigo-50/20 ring-1 ring-indigo-50' : 
                  'border-slate-100 bg-slate-50/30'
                }`}>
                  <span className={`flex h-8 w-8 items-center justify-center rounded-xl border mb-2.5 ${
                    isCompleted ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                    isCurrent ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                    'bg-slate-50 text-slate-400 border-slate-100'
                  }`}>
                    <IconComponent size={15} className="stroke-[2.5]" />
                  </span>
                  
                  <p className="text-[10.5px] font-black text-[#11194a] leading-tight flex-1 flex items-center justify-center px-1">
                    {milestone.label}
                  </p>

                  <span className={`mt-2.5 rounded-full px-2 py-0.5 text-[8.5px] font-extrabold uppercase tracking-wide border shadow-sm ${
                    isCompleted ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                    isCurrent ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                    isUpcoming ? 'bg-slate-50 text-slate-500 border-slate-100' :
                    'bg-slate-50 text-slate-600 border-slate-150'
                  }`}>
                    {milestone.status}
                  </span>
                </div>

              </div>
            )
          })}
        </div>

      </div>

      {/* Bottom track encouragement banner */}
      <div className="flex items-center gap-2.5 rounded-2xl bg-indigo-50/40 border border-indigo-100/50 p-4 text-xs font-bold text-indigo-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
        <Sparkles size={14} className="text-indigo-500 shrink-0" />
        <span>You're on the right track! Keep building real-world projects and gaining practical experience to move to the next milestone faster.</span>
      </div>

    </div>
  )
}

// ---------------------------------------------------------------------------
// Main REDESIGNED Advisor Dashboard component (Toggles 3D Card Flip)
// ---------------------------------------------------------------------------
function PredictiveRoadmapDashboard({ roleId, roleName }) {
  const data = ROLE_ADVISOR_DATA[roleId] || DEFAULT_ADVISOR
  const networkRole = careerPathNetwork.roles.find((r) => r.id === roleId)
  const progressPercent = networkRole ? networkRole.matchScore : data.progress

  // State to track flipping layout card
  const [isFlipped, setIsFlipped] = useState(false)
  const frontRef = useRef(null)
  const backRef = useRef(null)
  const [cardHeight, setCardHeight] = useState(null)

  useLayoutEffect(() => {
    const measure = () => {
      const activeFace = isFlipped ? backRef.current : frontRef.current
      if (activeFace) {
        setCardHeight(activeFace.scrollHeight)
      }
    }
    measure()
    const timer = setTimeout(measure, 50)
    window.addEventListener('resize', measure)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', measure)
    }
  }, [isFlipped, roleId])

  return (
    <div 
      className="relative w-full overflow-hidden" 
      style={{ 
        perspective: '1200px',
        height: cardHeight ? `${cardHeight}px` : 'auto',
        transition: 'height 500ms cubic-bezier(0.22, 1, 0.36, 1)'
      }}
    >
      <div 
        className="relative w-full h-full"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 650ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        
        {/* ========================================================== */}
        {/* FRONT CARD FACE (Redesigned Timeline & Salary Graph Stack) */}
        {/* ========================================================== */}
        <div 
          ref={frontRef}
          className="absolute top-0 left-0 w-full rounded-[28px] border border-[#e2eaf8] bg-white p-6 shadow-[0_8px_30px_rgba(100,130,200,0.05)] flex flex-col justify-between"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          <div className="space-y-6">
            
            {/* Front Header (No Front Side label badge) */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50/80 text-violet-600 border border-violet-100">
                  <Clock size={18} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#11194a] tracking-tight">AI Career Advisor Report</h3>
                  <p className="text-[10px] font-semibold text-slate-400">Personalized path predictions and local salary benchmarks</p>
                </div>
              </div>
              <span className="bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full text-[10px] font-black text-indigo-700 shadow-sm">
                {progressPercent}% Match Score
              </span>
            </div>

            {/* Redesigned Roadmap Timeline */}
            <RedesignedPredictionTimeline roleId={roleId} roleName={roleName} />

            {/* Salary Benchmark Section */}
            <SalaryBenchmarkSection roleId={roleId} roleName={roleName} />

          </div>

          {/* Flip to Back Side Button */}
          <div className="mt-6 flex justify-center pb-2">
            <button
              type="button"
              onClick={() => setIsFlipped(true)}
              className="flex items-center gap-1.5 rounded-full border border-blue-100 bg-[#f8fbff] px-6 py-2.5 text-xs font-black text-blue-700 shadow-sm hover:bg-blue-50 transition duration-200 cursor-pointer"
            >
              <span>View Action Plan & Skills</span>
              <ChevronRight size={14} className="stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* ========================================================== */}
        {/* BACK CARD FACE (2x2 Grid of Actions, Skills, Gaps, Resources) */}
        {/* ========================================================== */}
        <div 
          ref={backRef}
          className="absolute top-0 left-0 w-full rounded-[28px] border border-[#e2eaf8] bg-white p-6 shadow-[0_8px_30px_rgba(100,130,200,0.05)] flex flex-col justify-between"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="space-y-6">
            
            {/* Back Header (No Back Side label badge) */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <Milestone size={18} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#11194a] tracking-tight">AI Advisor Report · Detailed Plan</h3>
                  <p className="text-[10px] font-semibold text-slate-400">Curated preparation tasks, skill analysis, and learning recommendations</p>
                </div>
              </div>
              <span className="bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full text-[10px] font-black text-indigo-700 shadow-sm">
                {progressPercent}% Complete
              </span>
            </div>

            {/* 2x2 Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Card 1: Personalized Action Plan */}
              <div className="rounded-2xl border border-slate-100 bg-[#f8fbff]/60 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] min-h-[260px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                      <ListTodo size={15} />
                    </span>
                    <span className="text-[11px] font-bold text-[#596987] uppercase tracking-wide">Personalized Action Plan</span>
                  </div>

                  <div className="space-y-3 mt-4">
                    {data.actions.map((action, index) => (
                      <div key={index} className="flex items-start gap-3 text-xs font-bold leading-relaxed text-[#3a4669]">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-[10px] font-black border border-blue-100 mt-0.5 shadow-sm">
                          {index + 1}
                        </span>
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 2: Critical Skills Progress */}
              <div className="rounded-2xl border border-slate-100 bg-[#f8fbff]/60 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] min-h-[260px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <Activity size={15} />
                    </span>
                    <span className="text-[11px] font-bold text-[#596987] uppercase tracking-wide">Critical Skills Progress</span>
                  </div>

                  <div className="space-y-3.5 mt-5">
                    {data.skills.map((skill) => (
                      <div key={skill.label} className="grid grid-cols-[110px_1fr_40px] items-center gap-3">
                        <span 
                          className="text-xs font-bold text-[#3a4669] truncate cursor-help"
                          title={skill.label}
                        >
                          {skill.label}
                        </span>
                        <div className="h-2 w-full rounded-full bg-slate-200/50 overflow-hidden">
                          <div className={`h-full rounded-full ${skill.color}`} style={{ width: `${skill.value}%` }} />
                        </div>
                        <span className="text-xs font-bold text-right text-[#596987]">{skill.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[10px] font-semibold text-slate-400 bg-white border border-slate-100/50 p-2.5 rounded-xl mt-4 shadow-sm">
                  Skills calculated based on evidence inside candidate Career Memory.
                </div>
              </div>

              {/* Card 3: Gap Analysis (Moved from front) */}
              <div className="rounded-2xl border border-slate-100 bg-[#f8fbff]/60 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] min-h-[260px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                      <ListChecks size={15} />
                    </span>
                    <span className="text-[11px] font-bold text-[#596987] uppercase tracking-wide">Gap Analysis</span>
                  </div>

                  <p className="mt-2 text-xs font-bold text-[#11194a]">Target Role competency analysis for {roleName}</p>

                  <div className="grid grid-cols-2 gap-4 mt-3.5">
                    {/* Existing Strengths */}
                    <div className="space-y-1.5">
                      <p className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-600">Existing Strengths</p>
                      {data.existingGaps.map(skill => (
                        <div key={skill} className="flex items-center gap-1.5 text-xs font-bold text-slate-700 truncate" title={skill}>
                          <Check size={12} className="text-emerald-500 stroke-[3] shrink-0" /> {skill}
                        </div>
                      ))}
                    </div>
                    {/* Missing Gaps */}
                    <div className="space-y-1.5">
                      <p className="text-[9px] font-extrabold uppercase tracking-widest text-rose-500">Missing Gaps</p>
                      {data.missingGaps.map(skill => (
                        <div key={skill} className="flex items-start gap-1.5 text-xs font-bold text-slate-700 leading-normal" title={skill}>
                          <X size={12} className="text-rose-500 stroke-[3] mt-0.5 shrink-0" /> <span className="truncate">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Curated Recommended Learning Materials (New Card!) */}
              <div className="rounded-2xl border border-slate-100 bg-[#f8fbff]/60 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] min-h-[260px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-purple-600 border border-purple-100">
                      <BookOpen size={14} className="stroke-[2.2]" />
                    </span>
                    <span className="text-[11px] font-bold text-[#596987] uppercase tracking-wide">Recommended Learning Materials</span>
                  </div>

                  <p className="text-xs font-bold text-[#11194a] mb-2">Curated preparation courses mapping to your Action Plan</p>

                  <div className="space-y-2 max-h-[175px] overflow-y-auto pr-1">
                    {(data.learningResources || DEFAULT_ADVISOR.learningResources).map((resource, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-white shadow-sm hover:border-indigo-200 hover:bg-slate-50/50 transition cursor-pointer"
                      >
                        <div className="flex items-start gap-2.5 max-w-[90%]">
                          <span className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 text-[10.5px] font-black border border-indigo-100">
                            {idx + 1}
                          </span>
                          <div>
                            <p className="text-xs font-bold text-[#3a4669] leading-tight truncate max-w-[210px]" title={resource.title}>
                              {resource.title}
                            </p>
                            <p className="text-[9.5px] font-semibold text-[#7382a1] mt-1">
                              {resource.platform} • <span className="text-amber-500 font-extrabold">{resource.rating}</span>
                            </p>
                            <p className="text-[8.5px] font-extrabold text-blue-600 uppercase tracking-wide mt-1 italic">
                              {resource.mapsTo}
                            </p>
                          </div>
                        </div>
                        <ChevronRight size={13} className="text-slate-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Flip back to Front Side Button */}
            <div className="mt-6 flex justify-center pb-2">
              <button
                type="button"
                onClick={() => setIsFlipped(false)}
                className="flex items-center gap-1.5 rounded-full border border-indigo-100 bg-[#fbfbff] px-6 py-2.5 text-xs font-black text-indigo-700 shadow-sm hover:bg-indigo-50 transition duration-200 cursor-pointer"
              >
                <ChevronRight size={14} className="stroke-[2.5] rotate-180" />
                <span>Back to Summary Report</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Default Export handles route chips overrides or renders advisor report
// ---------------------------------------------------------------------------
export default function DynamicModulePlaceholder({ activeModule, selectedRoleId }) {
  if (!selectedRoleId) return <EmptyState />

  const role = careerPathNetwork.roles.find((r) => r.id === selectedRoleId)
  const roleName = role ? role.label : selectedRoleId

  // Tab overrides from Career Companion Panel chips
  if (activeModule === 'fit') return <FitModule roleId={selectedRoleId} roleName={roleName} />
  if (activeModule === 'skills') return <SkillsModule roleId={selectedRoleId} roleName={roleName} />
  if (activeModule === 'demand') return <DemandModule roleName={roleName} />
  if (activeModule === 'roadmap') return <DetailedRoadmapModule roleId={selectedRoleId} roleName={roleName} />
  
  // Default Advisor report
  return <PredictiveRoadmapDashboard roleId={selectedRoleId} roleName={roleName} />
}

// ---------------------------------------------------------------------------
// Detailed Learning Roadmap Accordion View (Accessible via Chat panel chip)
// ---------------------------------------------------------------------------
const ROADMAP_DETAIL_DATA = {
  'data-scientist': {
    steps: [
      { 
        title: 'Strengthen SQL (Advanced joins, window functions)', 
        description: 'Understand advanced database queries, subqueries, and window functions for analytics.',
        duration: '2-3 weeks', 
        icon: BookOpen, 
        iconColor: 'bg-violet-50 text-violet-600 border-violet-100',
        tags: ['SQL', 'Database Queries', 'Window Functions'],
        recommendation: 'Recommended first'
      },
      { 
        title: 'Build 2 end-to-end data projects', 
        description: 'Build portfolio projects showcasing ETL pipelines, data analysis, and report generation.',
        duration: '6-8 weeks', 
        icon: Code2, 
        iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
        tags: ['Python', 'ETL', 'Data Analysis']
      },
      { 
        title: 'Learn Machine Learning fundamentals', 
        description: 'Understand classification, regression, and validation strategies with scikit-learn.',
        duration: '8-10 weeks', 
        icon: Folder, 
        iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
        tags: ['Machine Learning', 'scikit-learn', 'Algorithms']
      },
      { 
        title: 'Practice data storytelling & visualization', 
        description: 'Create interactive dashboards and slide decks to communicate insights to executives.',
        duration: '3-4 weeks', 
        icon: Briefcase, 
        iconColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        tags: ['Dashboarding', 'Power BI', 'Storytelling']
      },
      { 
        title: 'Apply to internships & build your portfolio', 
        description: 'Network with professionals, optimize your profiles, and apply to data opportunities.',
        duration: 'Ongoing', 
        icon: Users, 
        iconColor: 'bg-orange-50 text-orange-600 border-orange-100',
        tags: ['Resume', 'Internship', 'Networking']
      }
    ],
    resources: [
      { title: 'SQL for Data Scientists', subtitle: 'Coursera • 4.8 ★', type: 'Course', icon: BookOpen, iconColor: 'bg-pink-50 text-pink-600 border-pink-100' },
      { title: 'Hands-on Machine Learning', subtitle: 'Kaggle • 4.9 ★', type: 'Practice', icon: Code2, iconColor: 'bg-violet-50 text-violet-600 border-violet-100' },
      { title: 'Data Science Portfolio Guide', subtitle: 'CareerOS Resource', type: 'Guide', icon: Award, iconColor: 'bg-blue-50 text-blue-600 border-blue-100' }
    ]
  },
  'data-analyst': {
    steps: [
      { 
        title: 'Strengthen SQL (Advanced joins, window functions)', 
        description: 'Understand advanced database queries, subqueries, and window functions for analytics.',
        duration: '2-3 weeks', 
        icon: BookOpen, 
        iconColor: 'bg-violet-50 text-violet-600 border-violet-100',
        tags: ['SQL', 'Database Queries', 'Window Functions'],
        recommendation: 'Recommended first'
      },
      { 
        title: 'Build 2 end-to-end data projects', 
        description: 'Build portfolio projects showcasing ETL pipelines, data analysis, and report generation.',
        duration: '6-8 weeks', 
        icon: Code2, 
        iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
        tags: ['Python', 'ETL', 'Data Analysis']
      },
      { 
        title: 'Learn Machine Learning fundamentals', 
        description: 'Understand classification, regression, and validation strategies with scikit-learn.',
        duration: '8-10 weeks', 
        icon: Folder, 
        iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
        tags: ['Machine Learning', 'scikit-learn', 'Algorithms']
      },
      { 
        title: 'Practice data storytelling & visualization', 
        description: 'Create interactive dashboards and slide decks to communicate insights to executives.',
        duration: '3-4 weeks', 
        icon: Briefcase, 
        iconColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        tags: ['Dashboarding', 'Power BI', 'Storytelling']
      },
      { 
        title: 'Apply to internships & build your portfolio', 
        description: 'Network with professionals, optimize your profiles, and apply to data opportunities.',
        duration: 'Ongoing', 
        icon: Users, 
        iconColor: 'bg-orange-50 text-orange-600 border-orange-100',
        tags: ['Resume', 'Internship', 'Networking']
      }
    ],
    resources: [
      { title: 'SQL for Data Scientists', subtitle: 'Coursera • 4.8 ★', type: 'Course', icon: BookOpen, iconColor: 'bg-pink-50 text-pink-600 border-pink-100' },
      { title: 'Hands-on Machine Learning', subtitle: 'Kaggle • 4.9 ★', type: 'Practice', icon: Code2, iconColor: 'bg-violet-50 text-violet-600 border-violet-100' },
      { title: 'Data Science Portfolio Guide', subtitle: 'CareerOS Resource', type: 'Guide', icon: Award, iconColor: 'bg-blue-50 text-blue-600 border-blue-100' }
    ]
  },
  'software-engineer': {
    steps: [
      { 
        title: 'Master Data Structures & Algorithms (LeetCode 75)', 
        description: 'Get comfortable with trees, graphs, dynamic programming, and binary search.',
        duration: '4-6 weeks', 
        icon: BookOpen, 
        iconColor: 'bg-violet-50 text-violet-600 border-violet-100',
        tags: ['DSA', 'LeetCode', 'Algorithms'],
        recommendation: 'Recommended first'
      },
      { 
        title: 'Learn System Design Fundamentals', 
        description: 'Understand vertical/horizontal scaling, caching, CDNs, load balancing, and SQL vs NoSQL.',
        duration: '3-4 weeks', 
        icon: Code2, 
        iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
        tags: ['System Design', 'Scaling', 'CDNs']
      },
      { 
        title: 'Build a high-performance Backend / API service', 
        description: 'Design robust server applications using Node.js or Python, with proper database indexing.',
        duration: '4-5 weeks', 
        icon: Folder, 
        iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
        tags: ['Backend', 'APIs', 'Node/Python']
      },
      { 
        title: 'Gain familiarity with AWS & Docker containerization', 
        description: 'Learn how to deploy your services, manage microservices, and configure build pipelines.',
        duration: '2-3 weeks', 
        icon: Briefcase, 
        iconColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        tags: ['AWS', 'Docker', 'CI/CD']
      },
      { 
        title: 'Prepare for tech coding & behavioral interviews', 
        description: 'Practice mock technical interviews and optimize your resume profile.',
        duration: 'Ongoing', 
        icon: Users, 
        iconColor: 'bg-orange-50 text-orange-600 border-orange-100',
        tags: ['Mock Interviews', 'Behavioral Prep', 'Resume']
      }
    ],
    resources: [
      { title: 'LeetCode Interview Prep Course', subtitle: 'LeetCode • 4.8 ★', type: 'Course', icon: Code2, iconColor: 'bg-pink-50 text-pink-600 border-pink-100' },
      { title: 'Grokking the System Design Interview', subtitle: 'Educative • 4.9 ★', type: 'Course', icon: BookOpen, iconColor: 'bg-violet-50 text-violet-600 border-violet-100' },
      { title: 'Full-Stack Deployment Guide', subtitle: 'CareerOS Resource', type: 'Guide', icon: Award, iconColor: 'bg-blue-50 text-blue-600 border-blue-100' }
    ]
  },
  'product-manager': {
    steps: [
      { 
        title: 'Learn Product Strategy & Market Research basics', 
        description: 'Understand customer personas, competitive analyses, and target market validation.',
        duration: '3-4 weeks', 
        icon: BookOpen, 
        iconColor: 'bg-violet-50 text-violet-600 border-violet-100',
        tags: ['Strategy', 'Persona Design', 'Market Analysis'],
        recommendation: 'Recommended first'
      },
      { 
        title: 'Master Product Metrics & Analytics frameworks', 
        description: 'Learn AARRR funnel metrics, retention calculations, and product logging setups.',
        duration: '2-3 weeks', 
        icon: Code2, 
        iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
        tags: ['Metrics', 'Funnel', 'A/B Testing']
      },
      { 
        title: 'Lead a hackathon project or student PM challenge', 
        description: 'Build leadership credentials by leading feature design and cross-functional teams.',
        duration: '4-6 weeks', 
        icon: Folder, 
        iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
        tags: ['Hackathon', 'Leadership', 'Wireframes']
      },
      { 
        title: 'Get certified in Agile Product Management (CSPO)', 
        description: 'Master backlog grooming, user story sizing, and Scrum methodologies.',
        duration: '2-3 weeks', 
        icon: Briefcase, 
        iconColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        tags: ['Agile', 'CSPO', 'Scrum']
      },
      { 
        title: 'Apply to Associate PM (APM) cohorts & build case deck', 
        description: 'Build case analysis decks and apply to early-stage APM programmes.',
        duration: 'Ongoing', 
        icon: Users, 
        iconColor: 'bg-orange-50 text-orange-600 border-orange-100',
        tags: ['APM Application', 'Case Deck', 'Resume']
      }
    ],
    resources: [
      { title: 'Product Management Masterclass', subtitle: 'Udemy • 4.7 ★', type: 'Course', icon: BookOpen, iconColor: 'bg-pink-50 text-pink-600 border-pink-100' },
      { title: 'Product Analytics with Amplitude', subtitle: 'Amplitude • 4.8 ★', type: 'Course', icon: Code2, iconColor: 'bg-violet-50 text-violet-600 border-violet-100' },
      { title: 'APM Cohort Recruitment Guide', subtitle: 'CareerOS Resource', type: 'Guide', icon: Award, iconColor: 'bg-blue-50 text-blue-600 border-blue-100' }
    ]
  }
}

// Fallback / Default Detailed Roadmap (Accordion View via Companion chip click)
const DEFAULT_DETAILED_ROADMAP = {
  steps: [
    { 
      title: 'Learn foundational domain theories and concepts', 
      description: 'Understand marketing fundamentals, consumer behavior, market research and analytics concepts.',
      duration: '2-3 weeks', 
      icon: BookOpen, 
      iconColor: 'bg-violet-50 text-violet-600 border-violet-100',
      tags: ['Marketing Basics', 'Consumer Behavior', 'Market Research'],
      recommendation: 'Recommended first'
    },
    { 
      title: 'Practice core tooling and specialized frameworks', 
      description: 'Get hands-on with Excel, SQL, Google Analytics, and visualization tools like Power BI or Tableau.',
      duration: '4-6 weeks', 
      icon: Code2, 
      iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
      tags: ['Excel', 'SQL', 'Google Analytics', 'Power BI / Tableau']
    },
    { 
      title: 'Build 2 portfolio-grade projects showing competencies', 
      description: 'Apply your skills to real-world datasets and build case studies that showcase your impact.',
      duration: '6-8 weeks', 
      icon: Folder, 
      iconColor: 'bg-blue-50 text-blue-600 border-blue-100',
      tags: ['Data Analysis', 'Dashboards', 'Insights & Reporting', 'Case Studies']
    },
    { 
      title: 'Secure a junior or internship placement to build resume', 
      description: 'Gain practical experience, learn from mentors and strengthen your credibility.',
      duration: '3-4 weeks', 
      icon: Briefcase, 
      iconColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      tags: ['Resume', 'Internship', 'Real-world Experience']
    },
    { 
      title: 'Refine professional network and apply to target roles', 
      description: 'Optimize your LinkedIn, connect with professionals and apply strategically to relevant opportunities.',
      duration: 'Ongoing', 
      icon: Users, 
      iconColor: 'bg-orange-50 text-orange-600 border-orange-100',
      tags: ['Networking', 'LinkedIn', 'Job Applications']
    }
  ],
  resources: [
    { title: 'Foundation Syllabus Course', subtitle: 'Coursera • 4.7 ★', type: 'Course', icon: BookOpen, iconColor: 'bg-pink-50 text-pink-600 border-pink-100 animate-[fadeInScale_0.25s_ease-out_both]' },
    { title: 'Practical Hands-on Exercises', subtitle: 'Kaggle • 4.8 ★', type: 'Practice', icon: Code2, iconColor: 'bg-violet-50 text-violet-600 border-violet-100 animate-[fadeInScale_0.25s_ease-out_both]' },
    { title: 'Marketing Analyst Roadmap', subtitle: 'Roadmap.sh • 4.6 ★', type: 'Guide', icon: BarChart3, iconColor: 'bg-blue-50 text-blue-600 border-blue-100 animate-[fadeInScale_0.25s_ease-out_both]' },
    { title: 'SQL for Analysts', subtitle: 'DataLemur • 4.8 ★', type: 'Course', icon: Play, iconColor: 'bg-emerald-50 text-emerald-600 border-emerald-100 animate-[fadeInScale_0.25s_ease-out_both]' },
    { title: 'Power BI Essential Training', subtitle: 'LinkedIn Learning • 4.7 ★', type: 'Course', icon: BarChart3, iconColor: 'bg-amber-50 text-amber-600 border-amber-100 animate-[fadeInScale_0.25s_ease-out_both]' },
    { title: 'Role Resource Guidebook', subtitle: 'CareerOS Resource', type: 'Guide', icon: Award, iconColor: 'bg-purple-50 text-purple-600 border-purple-100 animate-[fadeInScale_0.25s_ease-out_both]' }
  ]
}

function DetailedRoadmapModule({ roleId, roleName }) {
  const data = ROADMAP_DETAIL_DATA[roleId] || DEFAULT_DETAILED_ROADMAP
  const steps = data.steps
  const resources = data.resources

  const [expandedSteps, setExpandedSteps] = useState({})

  const toggleStep = (index) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const stepColors = [
    'bg-violet-600',
    'bg-indigo-600',
    'bg-blue-600',
    'bg-emerald-600',
    'bg-orange-600',
  ]

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr] animate-[slideUp_300ms_ease-out_both]">
      <div className="rounded-[28px] border border-[#e2eaf8] bg-white p-6 shadow-[0_8px_30px_rgba(100,130,200,0.04)] flex flex-col justify-between">
        <div>
          <header className="flex items-center gap-3.5 mb-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
              <Milestone size={24} className="stroke-[2]" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-[#11194a] tracking-tight border-none p-0">
                Learning Roadmap to {roleName}
              </h3>
              <p className="text-xs font-semibold text-[#637094] mt-0.5 leading-normal">
                A personalized step-by-step plan to build the skills, experience and confidence to reach your goal.
              </p>
            </div>
          </header>

          <div className="relative pl-9 space-y-5">
            <div className="absolute left-[13px] top-4 bottom-4 w-[2px] border-l-2 border-dashed border-slate-200" />

            {steps.map((step, index) => {
              const StepIcon = step.icon
              const stepBadgeColor = stepColors[index % stepColors.length]
              const isExpanded = !!expandedSteps[index]
              
              return (
                <div key={index} className="relative flex items-start gap-4 animate-[slideUp_0.3s_ease-out_both]" style={{ animationDelay: `${index * 60}ms` }}>
                  <div className={`absolute -left-[36px] top-3.5 flex h-6 w-6 items-center justify-center rounded-full ${stepBadgeColor} text-[10px] font-black text-white ring-4 ring-white shadow-sm z-10`}>
                    {index + 1}
                  </div>

                  <div 
                    onClick={() => toggleStep(index)}
                    className="flex-1 flex flex-col p-4 rounded-2xl border border-slate-100 bg-[#f8fbff]/30 hover:border-blue-200 hover:bg-[#f8fbff]/60 transition duration-200 cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${step.iconColor || 'bg-violet-50 text-violet-600 border-violet-100'}`}>
                          <StepIcon size={18} className="stroke-[2.2]" />
                        </span>
                        <p className="text-sm font-bold text-[#11194a] tracking-tight">{step.title}</p>
                      </div>

                      <div className="flex items-center gap-3.5 shrink-0">
                        <div className="flex flex-col items-end">
                          <span className="rounded-full bg-violet-50/80 border border-violet-100/60 px-3 py-1 text-[10px] font-extrabold text-violet-700 whitespace-nowrap shadow-sm flex items-center gap-1">
                            <Clock size={11} className="stroke-[2.5]" /> {step.duration}
                          </span>
                          {step.recommendation && (
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 rounded px-2 py-0.5 text-[9px] font-extrabold mt-1.5 tracking-wide uppercase whitespace-nowrap">
                              {step.recommendation}
                            </span>
                          )}
                        </div>
                        <ChevronDown 
                          size={14} 
                          className={`text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-slate-700' : ''}`} 
                        />
                      </div>
                    </div>

                    <div 
                      className={`grid transition-all duration-300 ease-in-out ${
                        isExpanded ? 'grid-rows-[1fr] opacity-100 mt-3 pt-3 border-t border-slate-100/60' : 'grid-rows-[0fr] opacity-0 overflow-hidden'
                      }`}
                    >
                      <div className="overflow-hidden space-y-3">
                        <p className="text-xs font-semibold text-[#637094] leading-relaxed max-w-lg">
                          {step.description}
                        </p>
                        
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                          {step.tags && step.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {step.tags.map((tag) => (
                                <span 
                                  key={tag} 
                                  className="bg-slate-50 text-[#52627f] border border-slate-100 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2.5 rounded-2xl bg-violet-50/40 border border-violet-100/50 p-4.5 text-xs font-bold text-violet-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
          <Sparkles size={14} className="text-indigo-500 shrink-0" />
          <span>Keep learning and tracking your progress. Small steps today lead to big opportunities tomorrow! 💪</span>
        </div>
      </div>

      <div className="rounded-[28px] border border-[#e2eaf8] bg-white p-6 shadow-[0_8px_30px_rgba(100,130,200,0.04)] flex flex-col justify-between">
        <div className="space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-xs font-bold text-[#11194a] uppercase tracking-wider">
              Helpful resources for you
            </h4>
            <span className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer hover:underline">
              View all
            </span>
          </div>

          <div className="space-y-3">
            {resources.map((res, index) => {
              const ResourceIcon = res.icon
              return (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 bg-[#f8fbff]/20 hover:border-blue-200 hover:bg-[#f8fbff]/50 transition duration-200 cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm border ${res.iconColor}`}>
                      <ResourceIcon size={16} className="stroke-[2.2]" />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-[#3a4669] leading-tight group-hover:text-blue-600 transition">
                        {res.title}
                      </p>
                      <p className="text-[10px] font-semibold text-[#7382a1] mt-1.5 flex items-center gap-1">
                        {res.subtitle}
                      </p>
                      <span className="bg-slate-50 text-slate-500 border border-slate-100 text-[8.5px] font-bold px-1.5 py-0.5 rounded mt-2 inline-block shadow-sm">
                        {res.type}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-slate-400 group-hover:text-blue-600 transition" />
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between p-4 rounded-2xl bg-violet-50/50 border border-violet-100/50 hover:border-violet-200 transition duration-200 cursor-pointer group">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 border border-violet-200">
              <Bookmark size={15} className="stroke-[2.5]" />
            </span>
            <div>
              <p className="text-xs font-bold text-violet-950">Save resources for later</p>
              <p className="text-[10px] font-semibold text-violet-600 mt-0.5 leading-normal">
                Access your saved list anytime in Career Memory.
              </p>
            </div>
          </div>
          <ChevronRight size={14} className="text-violet-500 group-hover:translate-x-0.5 transition" />
        </div>
      </div>
    </div>
  )
}
