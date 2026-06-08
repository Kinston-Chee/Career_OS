import React, { useState, useRef, useEffect } from 'react'

// ─── Mock Data per Program ────────────────────────────────────────────────────

const programData = {
  'BSc Computer Science': {
    cohorts: ['Year 1', 'Year 2', 'Year 3', 'Year 4'],
    defaultCohort: 'Year 3',
    defaultSkill: 'Cloud',
    data: {
      'Year 1': {
        kpis: [
          { label: 'Avg. Readiness Score',        value: '58%',  helper: 'Foundation stage', tone: 'blue' },
          { label: 'Strong Skills',                value: '1',    helper: 'Skills above target', tone: 'emerald' },
          { label: 'Skills Needing Improvement',  value: '7',    helper: 'Skills below target', tone: 'violet' },
          { label: 'Students at Risk',             value: '34',   helper: 'Requiring attention', tone: 'rose' },
        ],
        heatmap: [
          { skill: 'Python',          values: [60, null, null, null], target: 85, roles: ['Software Engineer', 'Data Analyst'],            actions: ['Intro to Python labs', 'Weekly coding practice'],                        missing: 40, demand: 'High'   },
          { skill: 'Data Structures', values: [42, null, null, null], target: 80, roles: ['Software Engineer', 'Backend Engineer'],        actions: ['Fundamentals revision course', 'LeetCode study groups'],                 missing: 58, demand: 'High'   },
          { skill: 'Algorithms',      values: [38, null, null, null], target: 75, roles: ['Software Engineer', 'QA Engineer'],             actions: ['Algorithm crash course', 'Practice problem sets'],                       missing: 62, demand: 'Medium' },
          { skill: 'Database (SQL)',  values: [36, null, null, null], target: 75, roles: ['Data Analyst', 'Backend Engineer'],             actions: ['SQL fundamentals module', 'Database design project'],                    missing: 64, demand: 'High'   },
          { skill: 'Web Development', values: [30, null, null, null], target: 70, roles: ['Frontend Engineer', 'Software Engineer'],       actions: ['HTML/CSS/JS intro sprint', 'Build a personal portfolio'],               missing: 70, demand: 'Medium' },
          { skill: 'Cloud',           values: [10, null, null, null], target: 70, roles: ['DevOps Engineer', 'Data Engineer'],             actions: ['Cloud Practitioner intro session', 'AWS free tier lab'],               missing: 90, demand: 'High'   },
          { skill: 'MLOps',           values: [5,  null, null, null], target: 65, roles: ['ML Engineer', 'Data Engineer'],                actions: ['Defer to Year 2/3', 'Intro ML theory first'],                           missing: 95, demand: 'High'   },
          { skill: 'Product Thinking',values: [20, null, null, null], target: 60, roles: ['Product Analyst', 'Business Analyst'],         actions: ['Case study intro', 'Design thinking workshop'],                         missing: 80, demand: 'Medium' },
        ],
        gapActions: [
          ['Algorithms',      '62% missing', 'Medium demand', 'High impact',   'Algorithm crash course + problem sets', 62],
          ['Database (SQL)',  '64% missing', 'High demand',   'High impact',   'SQL fundamentals module',              64],
          ['Cloud',           '90% missing', 'High demand',   'High impact',   'Intro cloud lab (AWS free tier)',      90],
          ['Product Thinking','80% missing', 'Medium demand', 'Medium impact', 'Design thinking intro workshop',      80],
        ],
        insights: [
          ['Python is the strongest early skill.',     'Year 1 Python coverage is above cohort average.', 'emerald'],
          ['Cloud and MLOps are the deepest gaps.',   'Expected at Year 1 — but needs a clear pathway.',  'amber'],
          ['34 students need early support.',          'Focus on Data Structures and Algorithms.',         'violet'],
        ],
      },
      'Year 2': {
        kpis: [
          { label: 'Avg. Readiness Score',        value: '68%',  helper: '+5% vs Year 1', tone: 'blue' },
          { label: 'Strong Skills',                value: '2',    helper: 'Skills above target', tone: 'emerald' },
          { label: 'Skills Needing Improvement',  value: '5',    helper: 'Skills below target', tone: 'violet' },
          { label: 'Students at Risk',             value: '44',   helper: 'Requiring attention', tone: 'rose' },
        ],
        heatmap: [
          { skill: 'Python',          values: [60, 78, null, null], target: 85, roles: ['Software Engineer', 'Data Analyst'],            actions: ['Advanced Python projects', 'Encourage open-source contribution'],         missing: 22, demand: 'High'   },
          { skill: 'Data Structures', values: [42, 74, null, null], target: 80, roles: ['Software Engineer', 'Backend Engineer'],        actions: ['Intermediate DSA labs', 'Competitive coding events'],                     missing: 26, demand: 'High'   },
          { skill: 'Algorithms',      values: [38, 68, null, null], target: 75, roles: ['Software Engineer', 'QA Engineer'],             actions: ['Add interview-style practice', 'Pair programming sessions'],               missing: 32, demand: 'Medium' },
          { skill: 'Database (SQL)',  values: [36, 70, null, null], target: 75, roles: ['Data Analyst', 'Backend Engineer'],             actions: ['Advanced SQL module', 'Database design project'],                         missing: 30, demand: 'High'   },
          { skill: 'Web Development', values: [30, 55, null, null], target: 70, roles: ['Frontend Engineer', 'Software Engineer'],       actions: ['React/Vue intro module', 'Build a full-stack mini project'],              missing: 45, demand: 'Medium' },
          { skill: 'Cloud',           values: [10, 22, null, null], target: 70, roles: ['DevOps Engineer', 'Data Engineer'],             actions: ['AWS Cloud Practitioner workshop', 'Cloud lab assignments'],              missing: 78, demand: 'High'   },
          { skill: 'MLOps',           values: [5,  14, null, null], target: 65, roles: ['ML Engineer', 'Data Engineer'],                actions: ['Intro to MLOps concepts', 'Create short course pathway'],                 missing: 86, demand: 'High'   },
          { skill: 'Product Thinking',values: [20, 35, null, null], target: 60, roles: ['Product Analyst', 'Business Analyst'],         actions: ['Case-based learning module', 'Product analytics projects'],               missing: 65, demand: 'Medium' },
        ],
        gapActions: [
          ['Cloud',           '78% missing', 'High demand',   'High impact',   'AWS Cloud Practitioner workshop',          78],
          ['MLOps',           '86% missing', 'High demand',   'High impact',   'Intro MLOps concepts short course',        86],
          ['Product Thinking','65% missing', 'Medium demand', 'Medium impact', 'Case-based learning + product projects',  65],
          ['Web Development', '45% missing', 'Medium demand', 'Medium impact', 'React/Vue intro module',                  45],
        ],
        insights: [
          ['Python and Data Structures improving well.', 'Both heading above target by Year 3.',              'emerald'],
          ['Cloud and MLOps still critically low.',      'Must be addressed before Year 3 internship prep.', 'amber'],
          ['44 students in the risk zone.',              'Focus on Cloud, MLOps, and SQL acceleration.',      'violet'],
        ],
      },
      'Year 3': {
        kpis: [
          { label: 'Avg. Readiness Score',        value: '74%',  helper: '+6% vs last semester', tone: 'blue' },
          { label: 'Strong Skills',                value: '3',    helper: 'Skills above target', tone: 'emerald' },
          { label: 'Skills Needing Improvement',  value: '4',    helper: 'Skills below target', tone: 'violet' },
          { label: 'Students at Risk',             value: '62',   helper: 'Requiring attention', tone: 'rose' },
        ],
        heatmap: [
          { skill: 'Python',          values: [60, 78, 92, null], target: 85, roles: ['Software Engineer', 'Data Analyst'],            actions: ['Maintain advanced project work'],                                              missing: 12, demand: 'High'   },
          { skill: 'Data Structures', values: [42, 74, 85, null], target: 80, roles: ['Software Engineer', 'Backend Engineer'],        actions: ['Add more applied coding labs'],                                                missing: 18, demand: 'High'   },
          { skill: 'Algorithms',      values: [38, 68, 72, null], target: 75, roles: ['Software Engineer', 'QA Engineer'],             actions: ['Add interview-style practice'],                                                missing: 28, demand: 'Medium' },
          { skill: 'Database (SQL)',  values: [36, 70, 78, null], target: 75, roles: ['Data Analyst', 'Backend Engineer'],             actions: ['Add advanced SQL project module'],                                             missing: 22, demand: 'High'   },
          { skill: 'Web Development', values: [30, 55, 70, null], target: 70, roles: ['Frontend Engineer', 'Software Engineer'],       actions: ['Refresh practical frontend assignments'],                                      missing: 30, demand: 'Medium' },
          { skill: 'Cloud',           values: [10, 22, 38, null], target: 70, roles: ['DevOps Engineer', 'Data Engineer', 'ML Eng'],  actions: ['AWS Cloud Practitioner workshop', 'Partner with AWS Educate', 'Cloud hackathon'], missing: 62, demand: 'High'   },
          { skill: 'MLOps',           values: [5,  14, 26, null], target: 65, roles: ['ML Engineer', 'Data Engineer'],                actions: ['MLOps short course', 'Add certification path'],                               missing: 58, demand: 'High'   },
          { skill: 'Product Thinking',values: [20, 35, 40, null], target: 60, roles: ['Product Analyst', 'Business Analyst'],         actions: ['Case-based learning', 'Run product analytics projects'],                      missing: 40, demand: 'Medium' },
        ],
        gapActions: [
          ['Cloud',           '62% missing', 'High demand',   'High impact',   'Add workshop / Industry partner',             62],
          ['MLOps',           '58% missing', 'High demand',   'High impact',   'Short course / Certification path',           58],
          ['Power BI',        '48% missing', 'High demand',   'Medium impact', 'Elective module',                             48],
          ['Product Thinking','40% missing', 'Medium demand', 'Medium impact', 'Case-based learning / Projects',              40],
        ],
        insights: [
          ['Core technical skills are strong.',           'Python, SQL, and Data Structures are above target.', 'emerald'],
          ['Cloud and MLOps are the biggest gaps.',       'High market demand in 70%+ job postings.',           'amber'],
          ['62 students need targeted intervention.',     'Personalised cloud + MLOps plans recommended.',       'violet'],
        ],
      },
      'Year 4': {
        kpis: [
          { label: 'Avg. Readiness Score',        value: '82%',  helper: '+8% vs Year 3', tone: 'blue' },
          { label: 'Strong Skills',                value: '5',    helper: 'Skills above target', tone: 'emerald' },
          { label: 'Skills Needing Improvement',  value: '2',    helper: 'Skills below target', tone: 'violet' },
          { label: 'Students at Risk',             value: '28',   helper: 'Requiring attention', tone: 'rose' },
        ],
        heatmap: [
          { skill: 'Python',          values: [60, 78, 92, 94], target: 85, roles: ['Software Engineer', 'Data Analyst'],             actions: ['Capstone-level projects', 'Open source contribution'],                         missing: 8,  demand: 'High'   },
          { skill: 'Data Structures', values: [42, 74, 85, 90], target: 80, roles: ['Software Engineer', 'Backend Engineer'],         actions: ['Interview prep sessions', 'Advanced DSA contests'],                           missing: 10, demand: 'High'   },
          { skill: 'Algorithms',      values: [38, 68, 72, 84], target: 75, roles: ['Software Engineer', 'QA Engineer'],              actions: ['Mock interview programme', 'Algorithm optimisation workshops'],                missing: 16, demand: 'Medium' },
          { skill: 'Database (SQL)',  values: [36, 70, 78, 88], target: 75, roles: ['Data Analyst', 'Backend Engineer'],              actions: ['Advanced DB design', 'Query optimisation module'],                            missing: 12, demand: 'High'   },
          { skill: 'Web Development', values: [30, 55, 70, 80], target: 70, roles: ['Frontend Engineer', 'Software Engineer'],        actions: ['Capstone full-stack project', 'Internship preparation'],                      missing: 20, demand: 'Medium' },
          { skill: 'Cloud',           values: [10, 22, 38, 56], target: 70, roles: ['DevOps Engineer', 'Data Engineer', 'ML Eng'],   actions: ['Cloud certification push', 'Final semester cloud lab'],                       missing: 44, demand: 'High'   },
          { skill: 'MLOps',           values: [5,  14, 26, 46], target: 65, roles: ['ML Engineer', 'Data Engineer'],                 actions: ['MLOps capstone integration', 'Model deployment final project'],               missing: 38, demand: 'High'   },
          { skill: 'Product Thinking',values: [20, 35, 40, 52], target: 60, roles: ['Product Analyst', 'Business Analyst'],          actions: ['Industry project collaboration', 'PM mentorship sessions'],                   missing: 28, demand: 'Medium' },
        ],
        gapActions: [
          ['Cloud',           '44% missing', 'High demand',   'High impact',   'Cloud certification push (final semester)',     44],
          ['MLOps',           '38% missing', 'High demand',   'High impact',   'MLOps capstone integration project',            38],
          ['Product Thinking','28% missing', 'Medium demand', 'Medium impact', 'Industry project + PM mentorship',              28],
          ['Algorithms',      '16% missing', 'Medium demand', 'Medium impact', 'Mock interview prep sessions',                  16],
        ],
        insights: [
          ['Strongest cohort readiness in program.',     'Python, SQL, Web Dev, Algorithms all above target.', 'emerald'],
          ['Cloud and MLOps still need final push.',     'Closing these gaps will maximise graduate outcomes.', 'amber'],
          ['28 students in risk zone heading to grad.',  'Focus on Cloud certification and MLOps capstone.',    'violet'],
        ],
      },
    },
  },

  'BSc Data Science': {
    cohorts: ['Year 1', 'Year 2', 'Year 3', 'Year 4'],
    defaultCohort: 'Year 3',
    defaultSkill: 'MLOps',
    data: {
      'Year 1': {
        kpis: [
          { label: 'Avg. Readiness Score',        value: '60%',  helper: 'Foundation stage', tone: 'blue' },
          { label: 'Strong Skills',                value: '1',    helper: 'Skills above target', tone: 'emerald' },
          { label: 'Skills Needing Improvement',  value: '7',    helper: 'Skills below target', tone: 'violet' },
          { label: 'Students at Risk',             value: '28',   helper: 'Requiring attention', tone: 'rose' },
        ],
        heatmap: [
          { skill: 'Statistics',         values: [72, null, null, null], target: 90, roles: ['Data Scientist', 'Research Analyst'],        actions: ['Intro stats workshops', 'Weekly problem sets'],                               missing: 28, demand: 'High'   },
          { skill: 'Python',             values: [55, null, null, null], target: 88, roles: ['Data Scientist', 'ML Engineer'],              actions: ['Python intro labs', 'Kaggle beginner competitions'],                         missing: 45, demand: 'High'   },
          { skill: 'R Programming',      values: [50, null, null, null], target: 75, roles: ['Research Analyst', 'Statistician'],           actions: ['R fundamentals course', 'Stats + R integration labs'],                       missing: 50, demand: 'High'   },
          { skill: 'SQL',               values: [40, null, null, null], target: 80, roles: ['Data Analyst', 'Data Scientist'],              actions: ['SQL fundamentals module', 'Database intro project'],                         missing: 60, demand: 'High'   },
          { skill: 'Data Visualization', values: [35, null, null, null], target: 78, roles: ['Data Analyst', 'BI Developer'],              actions: ['Matplotlib/Seaborn intro', 'Data storytelling session'],                      missing: 65, demand: 'High'   },
          { skill: 'Machine Learning',   values: [20, null, null, null], target: 85, roles: ['Data Scientist', 'ML Engineer'],              actions: ['ML intro theory', 'Supervised learning labs'],                               missing: 80, demand: 'High'   },
          { skill: 'MLOps',             values: [5,  null, null, null], target: 72, roles: ['ML Engineer', 'MLOps Engineer'],               actions: ['Defer to Year 2/3', 'MLOps awareness session'],                              missing: 95, demand: 'High'   },
          { skill: 'Data Engineering',   values: [8,  null, null, null], target: 70, roles: ['Data Engineer', 'Data Scientist'],            actions: ['Defer to Year 2', 'Intro to data pipelines (awareness)'],                    missing: 92, demand: 'High'   },
        ],
        gapActions: [
          ['Machine Learning',  '80% missing', 'High demand', 'High impact',   'ML intro theory + supervised learning labs', 80],
          ['Data Visualization','65% missing', 'High demand', 'High impact',   'Matplotlib/Seaborn intro + storytelling',    65],
          ['SQL',               '60% missing', 'High demand', 'High impact',   'SQL fundamentals module',                   60],
          ['R Programming',     '50% missing', 'High demand', 'Medium impact', 'R fundamentals integration labs',           50],
        ],
        insights: [
          ['Statistics is the strongest Year 1 skill.', 'Solid foundation for ML and DS work ahead.',    'emerald'],
          ['ML and Data Viz need early introduction.',   'Later cohorts require earlier exposure.',        'amber'],
          ['28 students need early academic support.',   'Focus on statistics and Python fundamentals.',   'violet'],
        ],
      },
      'Year 2': {
        kpis: [
          { label: 'Avg. Readiness Score',        value: '70%',  helper: '+5% vs Year 1', tone: 'blue' },
          { label: 'Strong Skills',                value: '2',    helper: 'Skills above target', tone: 'emerald' },
          { label: 'Skills Needing Improvement',  value: '5',    helper: 'Skills below target', tone: 'violet' },
          { label: 'Students at Risk',             value: '32',   helper: 'Requiring attention', tone: 'rose' },
        ],
        heatmap: [
          { skill: 'Statistics',         values: [72, 88, null, null], target: 90, roles: ['Data Scientist', 'Research Analyst'],       actions: ['Bayesian statistics module', 'Statistical modelling project'],                 missing: 12, demand: 'High'   },
          { skill: 'Python',             values: [55, 80, null, null], target: 88, roles: ['Data Scientist', 'ML Engineer'],             actions: ['Advanced Python for DS', 'Pandas/NumPy deep dive'],                           missing: 20, demand: 'High'   },
          { skill: 'R Programming',      values: [50, 72, null, null], target: 75, roles: ['Research Analyst', 'Statistician'],          actions: ['Advanced R for data analysis', 'Tidyverse module'],                           missing: 28, demand: 'High'   },
          { skill: 'SQL',               values: [40, 68, null, null], target: 80, roles: ['Data Analyst', 'Data Scientist'],             actions: ['Advanced SQL + window functions', 'DB optimisation lab'],                     missing: 32, demand: 'High'   },
          { skill: 'Data Visualization', values: [35, 65, null, null], target: 78, roles: ['Data Analyst', 'BI Developer'],             actions: ['Tableau/Plotly module', 'Dashboard design project'],                          missing: 35, demand: 'High'   },
          { skill: 'Machine Learning',   values: [20, 58, null, null], target: 85, roles: ['Data Scientist', 'ML Engineer'],             actions: ['Applied ML projects', 'Scikit-learn deep dive labs'],                         missing: 42, demand: 'High'   },
          { skill: 'MLOps',             values: [5,  18, null, null], target: 72, roles: ['ML Engineer', 'MLOps Engineer'],              actions: ['MLOps intro course', 'Model versioning workshop'],                            missing: 82, demand: 'High'   },
          { skill: 'Data Engineering',   values: [8,  20, null, null], target: 70, roles: ['Data Engineer', 'Data Scientist'],           actions: ['Intro to pipelines (Airflow)', 'ETL mini project'],                           missing: 80, demand: 'High'   },
        ],
        gapActions: [
          ['MLOps',           '82% missing', 'High demand', 'High impact',   'MLOps intro + model versioning workshop',  82],
          ['Data Engineering','80% missing', 'High demand', 'High impact',   'Airflow intro + ETL mini project',         80],
          ['Machine Learning','42% missing', 'High demand', 'High impact',   'Applied ML projects with Scikit-learn',    42],
          ['Data Visualization','35% missing','High demand', 'High impact',  'Tableau/Plotly dashboard design project',  35],
        ],
        insights: [
          ['Statistics and Python ahead of schedule.', 'Both tracking strongly toward target.',             'emerald'],
          ['MLOps and Data Engineering critically low.','Must be addressed before final year job prep.',    'amber'],
          ['32 students need ML and Data Eng support.', 'Group-based Kaggle challenge recommended.',        'violet'],
        ],
      },
      'Year 3': {
        kpis: [
          { label: 'Avg. Readiness Score',        value: '78%',  helper: '+7% vs last semester', tone: 'blue' },
          { label: 'Strong Skills',                value: '4',    helper: 'Skills above target', tone: 'emerald' },
          { label: 'Skills Needing Improvement',  value: '3',    helper: 'Skills below target', tone: 'violet' },
          { label: 'Students at Risk',             value: '38',   helper: 'Requiring attention', tone: 'rose' },
        ],
        heatmap: [
          { skill: 'Statistics',         values: [72, 88, 94, null], target: 90, roles: ['Data Scientist', 'Research Analyst'],       actions: ['Maintain advanced modelling', 'Research project integration'],               missing: 6,  demand: 'High'   },
          { skill: 'Python',             values: [55, 80, 90, null], target: 88, roles: ['Data Scientist', 'ML Engineer'],             actions: ['DS-focused Python projects', 'Kaggle competition participation'],            missing: 10, demand: 'High'   },
          { skill: 'R Programming',      values: [50, 72, 82, null], target: 75, roles: ['Research Analyst', 'Statistician'],          actions: ['R + Python integration projects', 'Research statistical modelling'],         missing: 10, demand: 'High'   },
          { skill: 'SQL',               values: [40, 68, 86, null], target: 80, roles: ['Data Analyst', 'Data Scientist'],             actions: ['Advanced SQL + NoSQL intro', 'Data pipeline project'],                      missing: 8,  demand: 'High'   },
          { skill: 'Data Visualization', values: [35, 65, 78, null], target: 78, roles: ['Data Analyst', 'BI Developer'],             actions: ['Interactive dashboards module', 'D3.js intro workshop'],                     missing: 12, demand: 'High'   },
          { skill: 'Machine Learning',   values: [20, 58, 80, null], target: 85, roles: ['Data Scientist', 'ML Engineer'],             actions: ['Advanced ML project', 'Model tuning & evaluation labs'],                    missing: 18, demand: 'High'   },
          { skill: 'MLOps',             values: [5,  18, 36, null], target: 72, roles: ['ML Engineer', 'MLOps Engineer'],              actions: ['MLOps bootcamp', 'Model serving API project'],                               missing: 54, demand: 'High'   },
          { skill: 'Data Engineering',   values: [8,  20, 38, null], target: 70, roles: ['Data Engineer', 'Data Scientist'],           actions: ['Data pipeline lab', 'Airflow + Spark intro module'],                         missing: 52, demand: 'High'   },
        ],
        gapActions: [
          ['MLOps',           '54% missing', 'High demand', 'High impact',   'MLOps bootcamp + model serving project',    54],
          ['Data Engineering','52% missing', 'High demand', 'High impact',   'Pipeline lab + Airflow/Spark intro',        52],
          ['Machine Learning','18% missing', 'High demand', 'High impact',   'Advanced ML + model evaluation labs',       18],
          ['Data Visualization','12% missing','High demand', 'Medium impact', 'Interactive dashboards + D3.js workshop',  12],
        ],
        insights: [
          ['Stats, Python, R, SQL all above target.',  'Analytical core is excellent heading into Year 4.', 'emerald'],
          ['MLOps and Data Engineering still critical.','Biggest production skill gaps in the program.',     'amber'],
          ['38 students need MLOps/pipeline support.', 'Structured bootcamp is the highest-impact action.', 'violet'],
        ],
      },
      'Year 4': {
        kpis: [
          { label: 'Avg. Readiness Score',        value: '85%',  helper: '+9% vs Year 3', tone: 'blue' },
          { label: 'Strong Skills',                value: '6',    helper: 'Skills above target', tone: 'emerald' },
          { label: 'Skills Needing Improvement',  value: '2',    helper: 'Skills below target', tone: 'violet' },
          { label: 'Students at Risk',             value: '16',   helper: 'Requiring attention', tone: 'rose' },
        ],
        heatmap: [
          { skill: 'Statistics',         values: [72, 88, 94, 96], target: 90, roles: ['Data Scientist', 'Research Analyst'],      actions: ['Capstone research integration', 'Publication prep workshops'],              missing: 4,  demand: 'High'   },
          { skill: 'Python',             values: [55, 80, 90, 94], target: 88, roles: ['Data Scientist', 'ML Engineer'],            actions: ['Advanced DS capstone', 'Open source DS projects'],                         missing: 6,  demand: 'High'   },
          { skill: 'R Programming',      values: [50, 72, 82, 88], target: 75, roles: ['Research Analyst', 'Statistician'],         actions: ['R + Python DS pipeline capstone', 'Research mentorship'],                  missing: 6,  demand: 'High'   },
          { skill: 'SQL',               values: [40, 68, 86, 92], target: 80, roles: ['Data Analyst', 'Data Scientist'],            actions: ['Advanced data pipeline SQL', 'Performance tuning lab'],                   missing: 5,  demand: 'High'   },
          { skill: 'Data Visualization', values: [35, 65, 78, 88], target: 78, roles: ['Data Analyst', 'BI Developer'],            actions: ['Final dashboards capstone', 'Storytelling with data workshop'],             missing: 8,  demand: 'High'   },
          { skill: 'Machine Learning',   values: [20, 58, 80, 90], target: 85, roles: ['Data Scientist', 'ML Engineer'],            actions: ['Capstone ML system design', 'Industry collaboration project'],             missing: 6,  demand: 'High'   },
          { skill: 'MLOps',             values: [5,  18, 36, 58], target: 72, roles: ['ML Engineer', 'MLOps Engineer'],             actions: ['MLOps capstone project', 'Cloud ML deployment lab'],                      missing: 36, demand: 'High'   },
          { skill: 'Data Engineering',   values: [8,  20, 38, 60], target: 70, roles: ['Data Engineer', 'Data Scientist'],          actions: ['Full pipeline capstone', 'Spark + cloud integration lab'],                 missing: 28, demand: 'High'   },
        ],
        gapActions: [
          ['MLOps',           '36% missing', 'High demand', 'High impact',   'MLOps capstone + Cloud ML deployment',       36],
          ['Data Engineering','28% missing', 'High demand', 'High impact',   'Full pipeline capstone (Spark + Cloud)',      28],
          ['Data Visualization','8% missing','High demand', 'Medium impact', 'Final dashboards capstone project',           8],
          ['Python',           '6% missing', 'High demand', 'Low impact',    'Open source DS contribution programme',       6],
        ],
        insights: [
          ['Outstanding analytical readiness.',         '6 of 8 skills are above or at target.', 'emerald'],
          ['MLOps is the last critical gap.',           'Production deployment must be addressed before graduation.', 'amber'],
          ['Only 16 students still at risk.',           'Targeted 1-on-1 mentorship recommended for final push.',    'violet'],
        ],
      },
    },
  },

  'BSc Data Analytics': {
    cohorts: ['Year 1', 'Year 2', 'Year 3'],
    defaultCohort: 'Year 2',
    defaultSkill: 'Power BI',
    data: {
      'Year 1': {
        kpis: [
          { label: 'Avg. Readiness Score',        value: '55%',  helper: 'Foundation stage', tone: 'blue' },
          { label: 'Strong Skills',                value: '1',    helper: 'Skills above target', tone: 'emerald' },
          { label: 'Skills Needing Improvement',  value: '6',    helper: 'Skills below target', tone: 'violet' },
          { label: 'Students at Risk',             value: '40',   helper: 'Requiring attention', tone: 'rose' },
        ],
        heatmap: [
          { skill: 'SQL',                  values: [52, null, null], target: 88, roles: ['Data Analyst', 'Business Analyst'],             actions: ['SQL fundamentals bootcamp', 'Weekly query challenges'],                   missing: 48, demand: 'High'   },
          { skill: 'Excel / Sheets',       values: [64, null, null], target: 85, roles: ['Business Analyst', 'Reporting Analyst'],         actions: ['Advanced Excel module', 'Pivot table and formulas workshop'],             missing: 36, demand: 'High'   },
          { skill: 'Data Reporting',       values: [40, null, null], target: 82, roles: ['Reporting Analyst', 'Operations Analyst'],       actions: ['Report design fundamentals', 'Dashboard principles session'],             missing: 60, demand: 'High'   },
          { skill: 'Statistics',           values: [35, null, null], target: 75, roles: ['Data Analyst', 'Business Analyst'],             actions: ['Intro statistics module', 'Descriptive stats labs'],                     missing: 65, demand: 'High'   },
          { skill: 'Power BI',             values: [15, null, null], target: 82, roles: ['Business Analyst', 'BI Analyst'],               actions: ['Power BI intro session', 'Self-paced learning track'],                    missing: 85, demand: 'High'   },
          { skill: 'Tableau',              values: [12, null, null], target: 78, roles: ['Data Analyst', 'BI Developer'],                 actions: ['Tableau public intro', 'Defer to Year 2'],                               missing: 88, demand: 'High'   },
          { skill: 'Python Analytics',     values: [18, null, null], target: 75, roles: ['Data Analyst', 'Analytics Engineer'],           actions: ['Intro Python for analysts', 'Pandas awareness module'],                  missing: 82, demand: 'High'   },
          { skill: 'Predictive Modelling', values: [8,  null, null], target: 68, roles: ['Senior Analyst', 'Analytics Lead'],             actions: ['Defer to Year 2/3', 'Statistics foundation first'],                      missing: 92, demand: 'Medium' },
        ],
        gapActions: [
          ['Power BI',             '85% missing', 'High demand',   'High impact',   'Power BI intro + self-paced track',          85],
          ['Tableau',              '88% missing', 'High demand',   'High impact',   'Tableau Public intro (defer deeper to Y2)',  88],
          ['Statistics',           '65% missing', 'High demand',   'High impact',   'Intro statistics module + labs',             65],
          ['Data Reporting',       '60% missing', 'High demand',   'High impact',   'Report design fundamentals session',         60],
        ],
        insights: [
          ['Excel is the strongest early skill.',        'Above average for Year 1 DA students.',           'emerald'],
          ['Power BI and Tableau critically absent.',   'Both are core tools in every analyst job posting.', 'amber'],
          ['40 students need early quantitative support.','Focus on SQL and statistics foundations.',        'violet'],
        ],
      },
      'Year 2': {
        kpis: [
          { label: 'Avg. Readiness Score',        value: '68%',  helper: '+6% vs Year 1', tone: 'blue' },
          { label: 'Strong Skills',                value: '2',    helper: 'Skills above target', tone: 'emerald' },
          { label: 'Skills Needing Improvement',  value: '5',    helper: 'Skills below target', tone: 'violet' },
          { label: 'Students at Risk',             value: '52',   helper: 'Requiring attention', tone: 'rose' },
        ],
        heatmap: [
          { skill: 'SQL',                  values: [52, 82, null], target: 88, roles: ['Data Analyst', 'Business Analyst'],             actions: ['Advanced SQL + window functions', 'DB optimisation project'],             missing: 18, demand: 'High'   },
          { skill: 'Excel / Sheets',       values: [64, 86, null], target: 85, roles: ['Business Analyst', 'Reporting Analyst'],         actions: ['Power Excel techniques', 'Advanced pivot and VBA intro'],                 missing: 8,  demand: 'High'   },
          { skill: 'Data Reporting',       values: [40, 68, null], target: 82, roles: ['Reporting Analyst', 'Operations Analyst'],       actions: ['Advanced dashboard design', 'Report automation intro'],                   missing: 30, demand: 'High'   },
          { skill: 'Statistics',           values: [35, 65, null], target: 75, roles: ['Data Analyst', 'Business Analyst'],             actions: ['Inferential stats module', 'Applied stats project'],                      missing: 32, demand: 'High'   },
          { skill: 'Power BI',             values: [15, 42, null], target: 82, roles: ['Business Analyst', 'BI Analyst'],               actions: ['Power BI intensive (4-6 weeks)', 'Dashboard project milestone'],          missing: 58, demand: 'High'   },
          { skill: 'Tableau',              values: [12, 38, null], target: 78, roles: ['Data Analyst', 'BI Developer'],                 actions: ['Tableau desktop training', 'Tableau Public portfolio project'],           missing: 62, demand: 'High'   },
          { skill: 'Python Analytics',     values: [18, 36, null], target: 75, roles: ['Data Analyst', 'Analytics Engineer'],           actions: ['Python for analysts module (pandas focus)', 'Weekly coding challenges'],  missing: 64, demand: 'High'   },
          { skill: 'Predictive Modelling', values: [8,  22, null], target: 68, roles: ['Senior Analyst', 'Analytics Lead'],             actions: ['Intro regression module', 'Business forecasting project'],               missing: 78, demand: 'Medium' },
        ],
        gapActions: [
          ['Power BI',             '58% missing', 'High demand',   'High impact',   'Power BI intensive (4-6 wk) + dashboard project', 58],
          ['Python Analytics',     '64% missing', 'High demand',   'High impact',   'Pandas-focused analytics scripting module',        64],
          ['Tableau',              '62% missing', 'High demand',   'High impact',   'Tableau desktop training + portfolio project',     62],
          ['Predictive Modelling', '78% missing', 'Medium demand', 'Medium impact', 'Intro regression + business forecasting project',  78],
        ],
        insights: [
          ['SQL and Excel are above target.',            'Strong foundation for BI and reporting roles.',    'emerald'],
          ['Power BI and Tableau urgently need coverage.','Both appear in 85%+ of analyst job postings.',   'amber'],
          ['52 students need BI tooling support.',       'Power BI intensive is the highest-impact action.','violet'],
        ],
      },
      'Year 3': {
        kpis: [
          { label: 'Avg. Readiness Score',        value: '74%',  helper: '+7% vs Year 2', tone: 'blue' },
          { label: 'Strong Skills',                value: '3',    helper: 'Skills above target', tone: 'emerald' },
          { label: 'Skills Needing Improvement',  value: '3',    helper: 'Skills below target', tone: 'violet' },
          { label: 'Students at Risk',             value: '55',   helper: 'Requiring attention', tone: 'rose' },
        ],
        heatmap: [
          { skill: 'SQL',                  values: [52, 82, 90], target: 88, roles: ['Data Analyst', 'Business Analyst'],               actions: ['Advanced SQL capstone project', 'Query optimisation lab'],                  missing: 6,  demand: 'High'   },
          { skill: 'Excel / Sheets',       values: [64, 86, 92], target: 85, roles: ['Business Analyst', 'Reporting Analyst'],           actions: ['Excel automation (VBA/macros)', 'Final Excel capstone'],                  missing: 5,  demand: 'High'   },
          { skill: 'Data Reporting',       values: [40, 68, 86], target: 82, roles: ['Reporting Analyst', 'Operations Analyst'],         actions: ['Automated reporting system project', 'Stakeholder presentation'],          missing: 10, demand: 'High'   },
          { skill: 'Statistics',           values: [35, 65, 78], target: 75, roles: ['Data Analyst', 'Business Analyst'],               actions: ['Predictive stats application', 'Business stats capstone'],                 missing: 14, demand: 'High'   },
          { skill: 'Power BI',             values: [15, 42, 58], target: 82, roles: ['Business Analyst', 'BI Analyst'],                 actions: ['Power BI capstone dashboard', 'Enterprise BI case study'],                 missing: 38, demand: 'High'   },
          { skill: 'Tableau',              values: [12, 38, 55], target: 78, roles: ['Data Analyst', 'BI Developer'],                   actions: ['Tableau capstone project', 'Tableau storytelling workshop'],               missing: 42, demand: 'High'   },
          { skill: 'Python Analytics',     values: [18, 36, 52], target: 75, roles: ['Data Analyst', 'Analytics Engineer'],             actions: ['Python automation project', 'Data pipeline scripting module'],              missing: 46, demand: 'High'   },
          { skill: 'Predictive Modelling', values: [8,  22, 38], target: 68, roles: ['Senior Analyst', 'Analytics Lead'],               actions: ['Predictive modelling capstone', 'Regression + forecasting project'],       missing: 52, demand: 'Medium' },
        ],
        gapActions: [
          ['Predictive Modelling','52% missing', 'Medium demand', 'High impact',   'Predictive modelling capstone project',            52],
          ['Python Analytics',    '46% missing', 'High demand',   'High impact',   'Python automation + data pipeline module',         46],
          ['Tableau',             '42% missing', 'High demand',   'High impact',   'Tableau capstone + storytelling workshop',         42],
          ['Power BI',            '38% missing', 'High demand',   'High impact',   'Power BI enterprise BI case study capstone',       38],
        ],
        insights: [
          ['SQL, Excel, and Reporting are all above target.', 'Core DA skills solidly market-ready.',              'emerald'],
          ['Power BI, Tableau, and Python still lagging.',   'These are required for 80%+ of analyst job posts.', 'amber'],
          ['55 students need BI tooling focus.',             'Power BI and Tableau must be closed before grad.',    'violet'],
        ],
      },
    },
  },
}

// ─── Constants ────────────────────────────────────────────────────────────────

const toneClasses = {
  blue:    'bg-blue-50 text-blue-700 ring-blue-100',
  violet:  'bg-violet-50 text-violet-700 ring-violet-100',
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  amber:   'bg-amber-50 text-amber-700 ring-amber-100',
  rose:    'bg-rose-50 text-rose-700 ring-rose-100',
}

function readinessTone(value) {
  if (value === null || value === undefined) return 'bg-slate-50 text-slate-400 ring-slate-100'
  if (value >= 80) return 'bg-emerald-50 text-emerald-700 ring-emerald-100'
  if (value >= 50) return 'bg-amber-50 text-amber-700 ring-amber-100'
  return 'bg-rose-50 text-rose-700 ring-rose-100'
}

// ─── Filter Dropdown ──────────────────────────────────────────────────────────

function FilterDropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function outside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', outside)
    return () => document.removeEventListener('mousedown', outside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex h-11 min-w-[180px] items-center justify-between gap-3 rounded-[8px] border px-3 text-sm font-semibold shadow-sm transition ${
          open ? 'border-blue-300 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-700'
        }`}
      >
        <span className="flex flex-col items-start leading-none">
          <span className="text-[10px] font-medium text-slate-400">{label}</span>
          <span className="mt-0.5 whitespace-nowrap">{value}</span>
        </span>
        <svg className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-30 mt-1.5 min-w-[200px] overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.12)]">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => { onChange(option); setOpen(false) }}
              className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-medium transition hover:bg-blue-50 hover:text-blue-700 ${option === value ? 'bg-blue-50 text-blue-700' : 'text-slate-700'}`}
            >
              {option === value
                ? <svg className="h-3.5 w-3.5 shrink-0 text-blue-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                : <span className="h-3.5 w-3.5 shrink-0" />}
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function KpiCard({ item }) {
  const valueColor =
    item.tone === 'rose'    ? 'text-rose-600' :
    item.tone === 'emerald' ? 'text-emerald-600' :
    item.tone === 'violet'  ? 'text-violet-600' : 'text-blue-700'
  return (
    <article className="rounded-[8px] border border-slate-200/80 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.04)]">
      <p className="text-xs font-medium uppercase text-slate-400">{item.label}</p>
      <p className={`mt-3 text-4xl font-semibold ${valueColor}`}>{item.value}</p>
      <p className="mt-3 text-sm font-semibold text-slate-500">{item.helper}</p>
    </article>
  )
}

function HeatmapTable({ rows, cohort, selectedSkill, onSelectSkill }) {
  // Determine how many year columns to show based on non-null values across all rows
  const maxCols = Math.max(...rows.map((r) => r.values.length))

  return (
    <section className="rounded-[8px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.05)]">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-lg font-medium text-slate-950">Skill Readiness Heatmap</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Click a row to deep-dive. Highlighted column = selected cohort.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />High 80–100%</span>
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-400" />Medium 50–79%</span>
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-rose-500" />Low &lt;50%</span>
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-slate-300" />Not started</span>
        </div>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[820px] border-separate border-spacing-0 text-left">
          <thead>
            <tr className="text-xs font-medium uppercase text-slate-400">
              <th className="rounded-l-[8px] bg-slate-50 px-3 py-3">Skill</th>
              {Array.from({ length: maxCols }, (_, i) => (
                <th
                  key={`yr-${i}`}
                  className={`bg-slate-50 px-2 py-3 text-center ${cohort === `Year ${i + 1}` ? 'text-blue-700' : ''}`}
                >
                  Year {i + 1}
                </th>
              ))}
              <th className="rounded-r-[8px] bg-slate-50 px-3 py-3 text-center">Target</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const active = row.skill === selectedSkill.skill
              return (
                <tr
                  key={row.skill}
                  onClick={() => onSelectSkill(row)}
                  className={`cursor-pointer transition ${active ? 'bg-blue-50/45' : 'hover:bg-slate-50/70'}`}
                >
                  <td className="border-b border-slate-100 px-3 py-3">
                    <div className="flex items-center gap-3">
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] text-xs font-semibold ring-1 ${active ? toneClasses.blue : 'bg-slate-50 text-slate-500 ring-slate-100'}`}>
                        {row.skill.slice(0, 1)}
                      </span>
                      <span className="text-sm font-semibold text-slate-950">{row.skill}</span>
                    </div>
                  </td>
                  {row.values.map((value, index) => (
                    <td key={`${row.skill}-${index}`} className="border-b border-white p-1">
                      <div
                        className={`flex min-h-[52px] items-center justify-center rounded-[8px] text-sm font-semibold ring-1 ${readinessTone(value)} ${cohort === `Year ${index + 1}` ? 'ring-2 ring-blue-300' : ''}`}
                        title={`${row.skill} / Year ${index + 1}: ${value == null ? 'Not started' : `${value}% readiness`}`}
                      >
                        {value == null ? '–' : `${value}%`}
                      </div>
                    </td>
                  ))}
                  {/* Pad missing columns */}
                  {Array.from({ length: maxCols - row.values.length }, (_, i) => (
                    <td key={`pad-${i}`} className="border-b border-white p-1">
                      <div className="flex min-h-[52px] items-center justify-center rounded-[8px] text-sm font-semibold ring-1 bg-slate-50 text-slate-300 ring-slate-100">–</div>
                    </td>
                  ))}
                  <td className="border-b border-slate-100 px-3 py-3 text-center text-sm font-semibold text-slate-700">{row.target}%</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function KeyInsightsPanel({ insights }) {
  return (
    <section className="rounded-[8px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.05)]">
      <h2 className="text-lg font-medium text-slate-950">Key Insights</h2>
      <div className="mt-4 divide-y divide-slate-100">
        {insights.map(([title, detail, tone]) => (
          <div key={title} className="flex gap-3 py-4 first:pt-0 last:pb-0">
            <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] text-xs font-semibold ring-1 ${toneClasses[tone]}`}>
              {title.slice(0, 1)}
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-950">{title}</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function DeepDivePanel({ skill, cohort }) {
  const cohortIndex = parseInt(cohort.replace('Year ', '')) - 1
  const cohortValue = skill.values[cohortIndex]

  return (
    <section className="rounded-[8px] border border-violet-100 bg-white p-5 shadow-[0_16px_42px_rgba(79,70,229,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-medium text-slate-950">Skill Deep Dive</h2>
        <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700 ring-1 ring-violet-100">
          {cohort}
        </span>
      </div>
      <div className="mt-5 flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-blue-50 text-sm font-semibold text-blue-700 ring-1 ring-blue-100">
          {skill.skill.slice(0, 1)}
        </span>
        <div>
          <h3 className="text-base font-semibold text-slate-950">{skill.skill}</h3>
          <p className="mt-1 text-sm font-medium text-slate-500">
            {cohort} Readiness:{' '}
            <span className={cohortValue == null ? 'text-slate-400' : cohortValue < 50 ? 'text-rose-600' : cohortValue < 80 ? 'text-amber-600' : 'text-emerald-600'}>
              {cohortValue == null ? 'Not started' : `${cohortValue}%`}
            </span>
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs font-medium text-slate-400">
          <span>Current</span>
          <span>Target {skill.target}%</span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
            style={{ width: `${cohortValue ?? 0}%` }}
          />
        </div>
        {cohortValue != null && (
          <p className={`mt-1 text-right text-xs font-semibold ${cohortValue >= skill.target ? 'text-emerald-600' : 'text-rose-500'}`}>
            {cohortValue >= skill.target ? '✓ Above target' : `${skill.target - cohortValue}% below target`}
          </p>
        )}
      </div>

      <div className="mt-5 space-y-4 border-t border-slate-100 pt-5">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-slate-600">Students Missing</span>
          <span className="text-xl font-semibold text-rose-600">{skill.missing}%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-slate-600">Market Demand</span>
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${skill.demand === 'High' ? toneClasses.emerald : toneClasses.amber}`}>
            {skill.demand}
          </span>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-950">Top Related Roles</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {skill.roles.map((role) => (
            <span key={role} className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">{role}</span>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-950">Recommended Actions</p>
        <div className="mt-3 space-y-2">
          {skill.actions.map((action) => (
            <div key={action} className="flex gap-2 text-sm leading-6 text-slate-600">
              <span className="font-semibold text-emerald-600">✓</span>
              <span>{action}</span>
            </div>
          ))}
        </div>
      </div>

      <button type="button" className="mt-6 w-full rounded-[8px] border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 shadow-sm">
        View Students Affected ({skill.missing}%)
      </button>
    </section>
  )
}

function GapActionsTable({ gapActions }) {
  return (
    <section className="rounded-[8px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.05)]">
      <h2 className="text-lg font-medium text-slate-950">Top Skill Gaps & Recommended Actions</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="text-xs font-medium uppercase text-slate-400">
              <th className="rounded-l-[8px] bg-slate-50 px-3 py-3">Skill</th>
              <th className="bg-slate-50 px-3 py-3">% of Students Missing</th>
              <th className="bg-slate-50 px-3 py-3">Market Demand</th>
              <th className="bg-slate-50 px-3 py-3">Impact on Career Outcomes</th>
              <th className="rounded-r-[8px] bg-slate-50 px-3 py-3">Recommended Action</th>
            </tr>
          </thead>
          <tbody>
            {gapActions.map(([skill, missing, demand, impact, action, value]) => (
              <tr key={skill}>
                <td className="border-b border-slate-100 px-3 py-4 text-sm font-semibold text-slate-950">{skill}</td>
                <td className="border-b border-slate-100 px-3 py-4">
                  <div className="flex items-center gap-3">
                    <span className={`w-24 text-sm font-semibold ${value >= 50 ? 'text-rose-600' : 'text-amber-600'}`}>{missing}</span>
                    <div className="h-2 w-32 rounded-full bg-slate-100">
                      <div className={`h-2 rounded-full ${value >= 50 ? 'bg-rose-500' : 'bg-amber-400'}`} style={{ width: `${value}%` }} />
                    </div>
                  </div>
                </td>
                <td className="border-b border-slate-100 px-3 py-4">
                  <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${demand.startsWith('High') ? toneClasses.emerald : toneClasses.amber}`}>
                    {demand}
                  </span>
                </td>
                <td className="border-b border-slate-100 px-3 py-4">
                  <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${impact.startsWith('High') ? toneClasses.rose : toneClasses.amber}`}>
                    {impact}
                  </span>
                </td>
                <td className="border-b border-slate-100 px-3 py-4 text-sm font-semibold text-slate-600">{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function StudentReadinessOverviewPage() {
  const programOptions = Object.keys(programData)
  const [selectedProgram, setSelectedProgram] = useState('BSc Computer Science')

  const currentProgramMeta = programData[selectedProgram]
  const [selectedCohort, setSelectedCohort] = useState(currentProgramMeta.defaultCohort)

  function handleProgramChange(p) {
    setSelectedProgram(p)
    const meta = programData[p]
    setSelectedCohort(meta.defaultCohort)
    // reset selected skill after state updates
    setSelectedSkill(null)
  }

  // Resolve current data slice
  const cohortKey = selectedCohort in currentProgramMeta.data ? selectedCohort : currentProgramMeta.cohorts[0]
  const d = currentProgramMeta.data[cohortKey]

  const [selectedSkill, setSelectedSkill] = useState(null)
  const activeSkill = selectedSkill ?? d.heatmap.find((r) => r.skill === currentProgramMeta.defaultSkill) ?? d.heatmap[0]

  // When cohort changes, reset the selected skill to the default for that program
  function handleCohortChange(c) {
    setSelectedCohort(c)
    setSelectedSkill(null)
  }

  return (
    <div className="mx-auto max-w-[1560px] space-y-6">
      <header className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase text-blue-600">University Intelligence</p>
          <h1 className="mt-2 text-3xl font-medium text-slate-950">Student Readiness</h1>
          <p className="mt-2 text-base leading-7 text-slate-500">
            Understand how your students are progressing across key career skills.
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
            options={currentProgramMeta.cohorts}
            onChange={handleCohortChange}
          />
          <button
            type="button"
            className="h-11 rounded-[8px] bg-blue-600 px-4 text-sm font-semibold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
          >
            Export Report
          </button>
        </div>
      </header>

      {/* Context pill */}
      <div className="flex items-center gap-2 text-sm">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
          {selectedProgram}
        </span>
        <span className="text-slate-300">·</span>
        <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-100">
          {selectedCohort}
        </span>
      </div>

      {/* KPIs */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {d.kpis.map((item) => <KpiCard key={item.label} item={item} />)}
      </section>

      {/* Heatmap + Sidebar */}
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px] 2xl:grid-cols-[minmax(0,1fr)_400px]">
        <div className="min-w-0 space-y-5">
          <HeatmapTable
            rows={d.heatmap}
            cohort={selectedCohort}
            selectedSkill={activeSkill}
            onSelectSkill={setSelectedSkill}
          />
          <GapActionsTable gapActions={d.gapActions} />
        </div>
        <aside className="space-y-5">
          <KeyInsightsPanel insights={d.insights} />
          <DeepDivePanel skill={activeSkill} cohort={selectedCohort} />
        </aside>
      </section>
    </div>
  )
}
