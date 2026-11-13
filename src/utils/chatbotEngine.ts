import { personalInfo } from '../data/portfolio';
import { projectsData } from '../data/projects';
import { skillCategories } from '../data/skills';
import { journeyMilestones } from '../data/journey';
import { achievementsData } from '../data/achievements';

export function getChatbotResponse(input: string): string {
  const query = input.toLowerCase().trim();

  // 1. Greetings & Small Talk
  if (/^(hi|hello|hey|heyy|greetings|howdy|sup|hola|yo)\b/i.test(query)) {
    const greetings = [
      "Hello there! I'm Rex, Rakesh's portfolio companion. What would you like to explore today?",
      "Hey! Rex is ready to help. Ask me about Rakesh's projects, automation workflows, skills, or journey!",
      "Hi friend! Great to meet you. Feel free to ask about any project or skill in the portfolio.",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  if (query.includes('how are you') || query.includes('how are u') || query.includes("how's it going")) {
    return "I'm doing great! Local knowledge is synced with Rakesh's portfolio and ready to help. How can I assist you?";
  }

  if (query.includes('thank') || query.includes('thx') || query.includes('appreciate')) {
    return "You're very welcome! Let me know if you want to explore any project case studies or contact Rakesh.";
  }

  if (query.includes('bye') || query.includes('goodbye') || query.includes('see you') || query.includes('cya')) {
    return "Goodbye for now! Thanks for visiting Rakesh's portfolio.";
  }

  // 2. Love & Affection
  if (query.includes('love') || query.includes('cute') || query.includes('like you') || query.includes('sweet')) {
    return "Aww, you just made my circuits smile! Rex sends +1 ❤️ right back to you!";
  }

  // 3. Creator & Identity
  if (
    query.includes('who made you') ||
    query.includes('who created you') ||
    query.includes('who built you')
  ) {
    return `I was built by **${personalInfo.name}** as a 100% client-side, rule-based assistant to guide visitors through his portfolio without external API dependencies.`;
  }

  if (
    query.includes('who are you') ||
    query.includes('what are you') ||
    query.includes('who is rex')
  ) {
    return `I'm **Rex**, ${personalInfo.name}'s interactive portfolio companion!\n\nAsk me about his BCA program, programming languages, live web projects, Docker + n8n automation work, or contact details.`;
  }

  // 4. Jokes
  if (query.includes('joke') || query.includes('funny')) {
    const jokes = [
      "Why do programmers always prefer dark mode?\n\nBecause light attracts bugs!",
      "There are 10 types of people in this world:\n\nThose who understand binary, and those who don't!",
      "Why was the computer cold?\n\nBecause it left its Windows open!",
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  // 5. Developer Bio
  if (
    query.includes('who is rakesh') ||
    query.includes('about rakesh') ||
    query.includes('introduce') ||
    query.includes('bio')
  ) {
    return `${personalInfo.shortIntro}\n\n• **Degree:** ${personalInfo.academic.degree} (${personalInfo.academic.college} · Expected ${personalInfo.academic.expectedGraduation})\n• **Focus:** ${personalInfo.interests.join(', ')}`;
  }

  // 6. Specific Project Details
  if (query.includes('cybersafe')) {
    const p = projectsData.find((item) => item.id === 'cybersafe');
    return `### ${p?.name} (${p?.status})\n\n${p?.description}\n\n• **Tech Stack:** ${p?.techStack.join(', ')}\n• **Live Link:** ${p?.liveUrl}`;
  }

  if (query.includes('fileforge') || query.includes('passport')) {
    const p = projectsData.find((item) => item.id === 'fileforge');
    return `### ${p?.name} (${p?.status})\n\n${p?.description}\n\n• **Tech Stack:** ${p?.techStack.join(', ')}\n• **Live Link:** ${p?.liveUrl}`;
  }

  if (query.includes('lifeos')) {
    const p = projectsData.find((item) => item.id === 'lifeos');
    return `### ${p?.name} (${p?.status})\n\n${p?.description}\n\n• **Tech Stack:** ${p?.techStack.join(', ')}\n• **Live Link:** ${p?.liveUrl}`;
  }

  if (query.includes('civicdesk')) {
    const p = projectsData.find((item) => item.id === 'civicdesk');
    return `### ${p?.name} (${p?.status})\n\n${p?.description}\n\n• **Tech Stack:** ${p?.techStack.join(', ')}\n• **Live Link:** ${p?.liveUrl}`;
  }

  if (query.includes('vault')) {
    const p = projectsData.find((item) => item.id === 'vault');
    return `### ${p?.name} (${p?.status})\n\n${p?.description}\n\n• **Tech Stack:** ${p?.techStack.join(', ')}\n• **Live Link:** ${p?.liveUrl}`;
  }

  if (query.includes('algovision') || query.includes('algorithm') || query.includes('dsa')) {
    const p = projectsData.find((item) => item.id === 'algovision');
    return `### ${p?.name} (${p?.status})\n\n${p?.description}\n\n• **Tech Stack:** ${p?.techStack.join(', ')}\n• **Live Link:** ${p?.liveUrl}`;
  }

  if (query.includes('n8n') || query.includes('automation')) {
    const p = projectsData.find((item) => item.id === 'n8n-automation-workflows');
    return `### ${p?.name} (${p?.status})\n\n${p?.description}\n\n• **Tech Stack:** ${p?.techStack.join(', ')}\n• **Note:** ${p?.demoNote}`;
  }

  // 7. Projects Overview
  if (
    query.includes('project') ||
    query.includes('portfolio') ||
    query.includes('apps') ||
    query.includes('work')
  ) {
    const list = projectsData
      .map((p) => `• **${p.name}** (${p.status}) — ${p.description}`)
      .join('\n');

    return `### Featured Builds & Projects (${projectsData.length})\n\n${list}\n\nClick any card on the page for its Problem / Solution / Result breakdown and live links.`;
  }

  // 8. Development Journey
  if (query.includes('journey') || query.includes('milestone') || query.includes('timeline')) {
    const steps = journeyMilestones
      .map((m, idx) => `• **${idx + 1}. ${m.title}** (${m.category}) — ${m.summary}`)
      .join('\n');

    return `### Engineering Journey\n\n${steps}`;
  }

  // 9. Education & Achievements (NO scores/marks/SGPA)
  if (
    query.includes('education') ||
    query.includes('bca') ||
    query.includes('college') ||
    query.includes('degree') ||
    query.includes('achievement') ||
    query.includes('certif')
  ) {
    const summary = achievementsData
      .slice(0, 3)
      .map((a) => `• **${a.title}** (${a.metric}) — ${a.description}`)
      .join('\n');

    return `### Education & Hands-On Achievements\n\n• **Education:** ${personalInfo.academic.degree} · ${personalInfo.academic.college} · Expected Graduation: ${personalInfo.academic.expectedGraduation}\n\n${summary}`;
  }

  // 10. Skills
  if (
    query.includes('skill') ||
    query.includes('technolog') ||
    query.includes('tech') ||
    query.includes('stack') ||
    query.includes('language') ||
    query.includes('tools')
  ) {
    const lines = skillCategories
      .map((cat) => `• **${cat.title}:** ${cat.skills.map((s) => s.name).join(', ')}`)
      .join('\n');

    return `### Technical Skills & Tools\n\n${lines}`;
  }

  // 11. Resume
  if (query.includes('resume') || query.includes('cv')) {
    return `You can download or print Rakesh's resume anytime using **Download Resume** in the Hero section or Command Palette (\`⌘K\`) — works completely offline.`;
  }

  // 12. Contact
  if (query.includes('contact') || query.includes('email') || query.includes('reach') || query.includes('hire') || query.includes('github')) {
    return `### Contact Rakesh Kumar Mondal\n\n• **Email:** ${personalInfo.contact.email}\n• **GitHub:** ${personalInfo.contact.github}\n• **Portfolio:** ${personalInfo.contact.portfolioUrl}`;
  }

  // 13. Contextual Fallback (Zero SGPA)
  return `Ask me using Rakesh's verified portfolio data:\n\n• **Education:** ${personalInfo.academic.degree} (${personalInfo.academic.college})\n• **Stack:** C, C++, Python, Java, React, TypeScript, Docker, n8n\n• **Projects:** CyberSafe, FileForge, AlgoVision, LifeOS, Vault, CivicDesk, n8n Workflows\n• **Contact:** ${personalInfo.contact.email} and GitHub`;
}
