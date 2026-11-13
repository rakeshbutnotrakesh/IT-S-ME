import { personalInfo } from '../data/portfolio';
import { projectsData } from '../data/projects';
import { skillCategories } from '../data/skills';
import { journeyMilestones } from '../data/journey';

export function getChatbotResponse(input: string): string {
  const query = input.toLowerCase().trim();

  if (/^(hi|hello|hey|heyy|greetings|howdy|sup|hola|yo)\b/i.test(query)) {
    const greetings = [
      "Hello there! I'm Rex, Rakesh's portfolio companion. What would you like to explore today?",
      "Hey! Rex is ready to help. Ask me about Rakesh's projects, automation workflows, skills, or learning journey.",
      "Hi! Great to meet you. Feel free to ask about any project or skill in Rakesh's portfolio.",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  if (query.includes('how are you') || query.includes('how are u') || query.includes("how's it going")) {
    return "I'm doing great! Local knowledge is synced with Rakesh's portfolio and ready to help. How can I assist you?";
  }

  if (query.includes('thank') || query.includes('thx') || query.includes('appreciate')) {
    return "You're very welcome! Let me know if you want to explore any project or reach out to Rakesh.";
  }

  if (query.includes('bye') || query.includes('goodbye') || query.includes('see you') || query.includes('cya')) {
    return "Goodbye for now! Thanks for visiting Rakesh's portfolio.";
  }

  if (query.includes('love') || query.includes('cute') || query.includes('like you') || query.includes('sweet')) {
    return "Aww, you just made my circuits smile! Rex sends +1 ❤️ right back to you!";
  }

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
    return `I'm **Rex**, ${personalInfo.name}'s interactive portfolio companion!\n\nAsk me about his BCA program, programming languages, projects, Docker + n8n automation experiments, or contact details.`;
  }

  if (query.includes('joke') || query.includes('funny')) {
    const jokes = [
      "Why do programmers always prefer dark mode?\n\nBecause light attracts bugs!",
      "There are 10 types of people in this world:\n\nThose who understand binary, and those who don't!",
      "Why was the computer cold?\n\nBecause it left its Windows open!",
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  if (
    query.includes('who is rakesh') ||
    query.includes('about rakesh') ||
    query.includes('introduce') ||
    query.includes('bio')
  ) {
    return `${personalInfo.shortIntro}\n\n• **Education:** ${personalInfo.academic.degree} (${personalInfo.academic.academicAchievement})\n• **Focus:** ${personalInfo.academic.focus}\n• **Location:** ${personalInfo.contact.location}`;
  }

  if (query.includes('cybersafe')) {
    const p = projectsData.find((item) => item.id === 'cybersafe');
    return `### ${p?.name} (${p?.status})\n\n${p?.description}\n\n• **Tech Stack:** ${p?.techStack.join(', ')}${p?.liveUrl ? `\n• **Demo:** ${p.liveUrl}` : ''}`;
  }

  if (query.includes('fileforge') || query.includes('passport')) {
    const p = projectsData.find((item) => item.id === 'fileforge');
    return `### ${p?.name} (${p?.status})\n\n${p?.description}\n\n• **Tech Stack:** ${p?.techStack.join(', ')}${p?.liveUrl ? `\n• **Demo:** ${p.liveUrl}` : ''}`;
  }

  if (query.includes('lifeos')) {
    const p = projectsData.find((item) => item.id === 'lifeos');
    return `### ${p?.name} (${p?.status})\n\n${p?.description}\n\n• **Tech Stack:** ${p?.techStack.join(', ')}${p?.liveUrl ? `\n• **Demo:** ${p.liveUrl}` : ''}`;
  }

  if (query.includes('civicdesk')) {
    const p = projectsData.find((item) => item.id === 'civicdesk');
    return `### ${p?.name} (${p?.status})\n\n${p?.description}\n\n• **Tech Stack:** ${p?.techStack.join(', ')}${p?.liveUrl ? `\n• **Demo:** ${p.liveUrl}` : ''}`;
  }

  if (query.includes('n8n') || query.includes('automation')) {
    const p = projectsData.find((item) => item.id === 'n8n-automation-workflows');
    return `### ${p?.name} (${p?.status})\n\n${p?.description}\n\n• **Tech Stack:** ${p?.techStack.join(', ')}\n• **Note:** ${p?.demoNote}`;
  }

  if (
    query.includes('project') ||
    query.includes('portfolio') ||
    query.includes('apps') ||
    query.includes('work')
  ) {
    const list = projectsData
      .map((p) => `• **${p.indexNumber}. ${p.name}** (${p.status}) — ${p.description}`)
      .join('\n');

    return `### Selected Projects (${projectsData.length})\n\n${list}\n\nClick any card on the page to inspect details.`;
  }

  if (query.includes('journey') || query.includes('milestone') || query.includes('timeline') || query.includes('learning')) {
    const steps = journeyMilestones
      .map((m, idx) => `• **${idx + 1}. ${m.title}** — ${m.summary}`)
      .join('\n');

    return `### Learning Journey\n\n${steps}`;
  }

  if (
    query.includes('education') ||
    query.includes('bca') ||
    query.includes('college') ||
    query.includes('degree') ||
    query.includes('sgpa') ||
    query.includes('achievement')
  ) {
    return `### Education & Academic Achievement\n\n• **Degree:** ${personalInfo.academic.degree}\n• **Academic Achievement:** ${personalInfo.academic.academicAchievement}\n• **Focus:** ${personalInfo.academic.focus}\n• **Location:** ${personalInfo.contact.location}`;
  }

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

    return `### Technologies & Interests\n\n${lines}`;
  }

  if (query.includes('resume') || query.includes('cv')) {
    return `You can open Rakesh's formatted resume summary anytime using the **Resume** button in the top navigation bar or Command Palette (\`⌘K\`).`;
  }

  if (query.includes('contact') || query.includes('email') || query.includes('reach') || query.includes('hire') || query.includes('github') || query.includes('linkedin')) {
    return `### Contact Rakesh Kumar Mondal\n\n• **Email:** ${personalInfo.contact.email}\n• **GitHub:** ${personalInfo.contact.github}\n• **LinkedIn:** ${personalInfo.contact.linkedin}\n• **Portfolio:** ${personalInfo.contact.portfolioUrl}`;
  }

  return `Ask me about Rakesh's portfolio:\n\n• **Education:** ${personalInfo.academic.degree} (${personalInfo.academic.academicAchievement})\n• **Technologies:** C, C++, Python, Java, React, TypeScript, Docker, n8n\n• **Projects:** Portfolio, FileForge, CivicDesk, LifeOS, CyberSafe, n8n Workflows\n• **Contact:** GitHub, LinkedIn, and Email`;
}
