import { personalInfo } from '../data/portfolio';
import { projectsData } from '../data/projects';
import { skillCategories } from '../data/skills';
import { journeyMilestones } from '../data/journey';
import { achievementsData } from '../data/achievements';
import { fallbackResponse } from '../data/chatbotResponses';

export function getChatbotResponse(input: string): string {
  const query = input.toLowerCase().trim();

  // 0. Who is Rex / Assistant Identity
  if (
    query.includes('who are you') ||
    query.includes('what are you') ||
    query.includes('rex') ||
    query.includes('byte') ||
    query === 'who is rex'
  ) {
    return `I am Rex, Rakesh's AI companion! I can provide detailed insights into his software development projects, technical stack, BCA studies, cybersecurity tools, and automation workflows. Ask me anything about CyberSafe, LifeOS, FileForge, CivicDesk, Vault, or AlgoVision!`;
  }

  // 1. Who is Rakesh / Overview / Intro
  if (
    query.includes('who is') ||
    query.includes('about rakesh') ||
    query.includes('introduce') ||
    query === 'who is rakesh?'
  ) {
    return `${personalInfo.shortIntro}\n\nKey highlights:\n• Academic Focus: Bachelor of Computer Applications (BCA)\n• Interests: Software Development, Python, Web Dev, Automation & Cybersecurity\n• Mindset: "Building Ideas Into Digital Reality."`;
  }

  // 2. Technologies / Skills / Languages
  if (
    query.includes('technolog') ||
    query.includes('skill') ||
    query.includes('what tools') ||
    query.includes('language') ||
    query.includes('stack') ||
    query === 'what technologies does he use?'
  ) {
    const progLangs = skillCategories.find(c => c.title.includes('Languages'))?.skills.map(s => s.name).join(', ');
    const webDev = skillCategories.find(c => c.title.includes('Web'))?.skills.map(s => s.name).join(', ');
    const tools = skillCategories.find(c => c.title.includes('Tools'))?.skills.map(s => s.name).join(', ');
    const interests = skillCategories.find(c => c.title.includes('Interests'))?.skills.map(s => s.name).join(', ');

    return `Here is a breakdown of Rakesh's technical skills:\n\n• Programming Languages: ${progLangs}\n• Web Development: ${webDev}\n• Tools & Tech: ${tools}\n• Technical Interests: ${interests}`;
  }

  // 3. Projects
  if (
    query.includes('project') ||
    query.includes('show his project') ||
    query.includes('portfolio') ||
    query.includes('work') ||
    query.includes('built') ||
    query === 'show his projects.'
  ) {
    const projectList = projectsData
      .map(p => `• ${p.name} [${p.status}]: ${p.description}`)
      .join('\n\n');

    return `Here are the projects in Rakesh's portfolio:\n\n${projectList}\n\nFeel free to explore the interactive cards in the Projects section above!`;
  }

  // 4. Specific Projects
  if (query.includes('fileforge') || query.includes('fireforge')) {
    const p = projectsData.find(item => item.id === 'fileforge');
    return `${p?.name} (${p?.status}): ${p?.description}\n\nTech Stack: ${p?.techStack.join(', ')}\nLive Application: ${p?.liveUrl}\nKey Feature: 100% private, client-side browser file processing without server uploads.`;
  }

  if (query.includes('civicdesk')) {
    const p = projectsData.find(item => item.id === 'civicdesk');
    return `${p?.name} (${p?.status}): ${p?.description}\n\nTech Stack: ${p?.techStack.join(', ')}\nLive Application: ${p?.liveUrl}\nFocus: Local neighbourhood issue reporting and tracking with LocalStorage resilience.`;
  }

  if (query.includes('lifeos')) {
    const p = projectsData.find(item => item.id === 'lifeos');
    return `${p?.name} (${p?.status}): ${p?.description}\n\nTech Stack: ${p?.techStack.join(', ')}\nLive Application: ${p?.liveUrl}\nFocus: Personal productivity workspace for tasks, BCA studies, and habit streaks.`;
  }

  if (query.includes('cybersafe') || query.includes('security tool')) {
    const p = projectsData.find(item => item.id === 'cybersafe');
    return `${p?.name} (${p?.status}): ${p?.description}\n\nTech Stack: ${p?.techStack.join(', ')}\nLive Application: ${p?.liveUrl}\nFocus: Password entropy analysis, SHA-256 file hashing, and security education using Web Crypto API.`;
  }

  if (query.includes('vault')) {
    const p = projectsData.find(item => item.id === 'vault');
    return `${p?.name} (${p?.status}): ${p?.description}\n\nTech Stack: ${p?.techStack.join(', ')}\nLive Application: ${p?.liveUrl}\nKey Feature: Client-side cryptographic encrypted vault for confidential credentials and protected records.`;
  }

  if (query.includes('algovision') || query.includes('algorithm visualizer')) {
    const p = projectsData.find(item => item.id === 'algovision');
    return `${p?.name} (${p?.status}): ${p?.description}\n\nTech Stack: ${p?.techStack.join(', ')}\nLive Application: ${p?.liveUrl}\nKey Feature: Interactive real-time step-by-step visualizer for sorting and graph pathfinding algorithms.`;
  }

  if (query.includes('n8n') || query.includes('automation') || query.includes('workflow')) {
    const p = projectsData.find(item => item.id === 'n8n-automation-workflows');
    return `${p?.name} (${p?.status}): ${p?.description}\n\nTech Stack: ${p?.techStack.join(', ')}\nRakesh explores Docker-hosted n8n workflows for automated data pipelines, webhook listeners, and scheduled actions.`;
  }

  // 5. Education / Academics
  if (
    query.includes('education') ||
    query.includes('academic') ||
    query.includes('college') ||
    query.includes('degree') ||
    query === 'what is his educational background?'
  ) {
    return `Rakesh is currently pursuing a ${personalInfo.academic.degree}.\n\nHe is dedicated to understanding computer science fundamentals, mathematics, algorithms, and practical programming applications. (Note: Verified academic record only; institution names and dates are omitted per strict accuracy guidelines).`;
  }

  // 6. Development Journey
  if (
    query.includes('journey') ||
    query.includes('learning') ||
    query.includes('timeline') ||
    query.includes('how did he start') ||
    query === 'what is his development journey?'
  ) {
    const milestones = journeyMilestones
      .map((m, idx) => `${idx + 1}. ${m.title} (${m.category}): ${m.summary}`)
      .slice(0, 5)
      .join('\n\n');

    return `Rakesh's learning journey is structured around continuous growth:\n\n${milestones}\n\n...followed by Git/GitHub workflows, Docker & n8n automation, and Cybersecurity exploration. Check the Journey section for the complete timeline!`;
  }

  // 7. Contact / Email / GitHub
  if (
    query.includes('contact') ||
    query.includes('email') ||
    query.includes('reach') ||
    query.includes('hire') ||
    query.includes('message') ||
    query.includes('github') ||
    query === 'how can i contact him?'
  ) {
    return `You can connect with Rakesh directly:\n\n• Email: ${personalInfo.contact.email}\n• GitHub: ${personalInfo.contact.github}\n• Live Portfolio: ${personalInfo.contact.portfolioUrl}\n\nYou can also use the contact form at the bottom of the page to compose a message!`;
  }

  // 8. Achievements
  if (
    query.includes('achievement') ||
    query.includes('award') ||
    query.includes('accomplish') ||
    query.includes('score')
  ) {
    const achievements = achievementsData
      .map(a => `• ${a.title} [${a.metric}]: ${a.description}`)
      .join('\n\n');
    return `Here are Rakesh's verified achievements:\n\n${achievements}`;
  }

  // 9. Python / C++ / C / Java specific questions
  if (query.includes('python')) {
    return "Rakesh is an active Python programmer, using Python for scripting, problem solving, utility automation, and working with data structures and file I/O.";
  }
  if (query.includes('c++') || query.includes('cpp') || query.includes(' c ') || query === 'c') {
    return "Rakesh has strong foundations in C and C++, where he practices core memory management, pointers, and object-oriented data structures.";
  }
  if (query.includes('react') || query.includes('typescript')) {
    return "Rakesh builds modern web applications using React, TypeScript, and Tailwind CSS, focusing on clean component architecture, type safety, and responsive design (such as this portfolio!).";
  }

  // Fallback
  return fallbackResponse;
}
