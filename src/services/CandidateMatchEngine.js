/**
 * CandidateMatchEngine.js
 * Simulates calculated match scores for candidates based on employer configuration weights:
 * - Skill Importance (default: 40%)
 * - Project Experience Importance (default: 20%)
 * - Soft Skill Importance (default: 20%)
 * - Leadership Importance (default: 10%)
 * - Academic Importance (default: 5%)
 * - Career Interest Importance (default: 5%)
 */
export const CandidateMatchEngine = {
  calculateScore: (candidate, weights) => {
    const wSkill = (weights.skill || 40) / 100;
    const wProject = (weights.project || 20) / 100;
    const wSoft = (weights.softSkill || 20) / 100;
    const wLead = (weights.leadership || 10) / 100;
    const wAcademic = (weights.academic || 5) / 100;
    const wInterest = (weights.interest || 5) / 100;

    // 1. Skill Score (based on intersection with common required skills)
    const candidateSkills = (candidate.topSkills || []).map(s => s.toLowerCase());
    const commonSkills = ['python', 'sql', 'react', 'tableau', 'excel', 'power bi'];
    const skillMatches = candidateSkills.filter(s => commonSkills.includes(s)).length;
    const skillScore = Math.min(60 + skillMatches * 15, 100);

    // 2. Project Score (based on projects length)
    const projectCount = (candidate.projects || []).length;
    const projectScore = Math.min(65 + projectCount * 15, 100);

    // 3. Soft Skills Score (based on evidence trace length)
    const evidenceCount = (candidate.evidenceTrace || []).length;
    const softScore = Math.min(70 + evidenceCount * 10, 100);

    // 4. Leadership Score (derived from candidate id/name for variance)
    const nameLength = candidate.name.length;
    const leadershipScore = 70 + (nameLength % 4) * 10;

    // 5. Academic Score (derived from match score baseline or name)
    const academicScore = candidate.match ? candidate.match : (80 + (nameLength % 3) * 8);

    // 6. Career Interest Score (simulated matching fit)
    const interestScore = 75 + (candidate.name.charCodeAt(0) % 5) * 6;

    // Weighted sum
    const totalScore = 
      (skillScore * wSkill) + 
      (projectScore * wProject) + 
      (softScore * wSoft) + 
      (leadershipScore * wLead) + 
      (academicScore * wAcademic) + 
      (interestScore * wInterest);

    return Math.min(Math.max(Math.round(totalScore), 60), 98);
  }
};
