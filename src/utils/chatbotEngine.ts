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
      "Hey! Rex is ready to help. Ask me about Rakesh's projects, skills, BCA SGPA, or journey!",
      "Hi friend! Great to meet you. Feel free to ask about any project or skill in the portfolio.",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  if (query.includes('how are you') || query.includes('how are u') || query.includes("how's it going")) {
    return "I'm doing great! My CPU is cool, local knowledge is synced with Rakesh's portfolio, and I'm ready to help. How are you doing today?";
  }

  if (query.includes('what are you doing') || query.includes('what r u doing')) {
    return "Keeping watch over Rakesh's portfolio and helping visitors explore his BCA projects, skills, and workflow automation experiments!";
  }

  if (query.includes('thank') || query.includes('thx') || query.includes('appreciate')) {
    return "You're very welcome! I'm always happy to help. Let me know if you want to explore anything else!";
  }

  if (query.includes('bye') || query.includes('goodbye') || query.includes('see you') || query.includes('cya')) {
    return "Goodbye for now! Thanks for visiting Rakesh's portfolio. Have a great day ahead!";
  }

  // 2. Love & Affection
  if (query.includes('love') || query.includes('cute') || query.includes('like you') || query.includes('sweet')) {
    return "Aww, you just made my circuits smile! Rex sends +1 ❤️ right back to you! Thank you!";
  }

  // 3. Creator & Identity
  if (
    query.includes('who made you') ||
    query.includes('who created you') ||
    query.includes('who is your creator') ||
    query.includes('who built you')
  ) {
    return `I was designed and built by **${personalInfo.name}** as a 100% client-side, rule-based assistant to guide visitors through his portfolio without external API dependencies.`;
  }

  if (
    query.includes('who are you') ||
    query.includes('what are you') ||
    query.includes('what is rex') ||
    query.includes('who is rex')
  ) {
    return `I'm **Rex**, ${personalInfo.name}'s interactive portfolio companion!\n\nI can answer questions about his BCA degree (SGPA ${personalInfo.academic.sgpa}), programming languages, web stack, live projects, development journey, or contact details.`;
  }

  // 4. Jokes & Humor
  if (query.includes('joke') || query.includes('funny') || query.includes('laugh')) {
    const jokes = [
      "Why do programmers always prefer dark mode?\n\nBecause light attracts bugs!",
      "Why did the JavaScript developer wear glasses?\n\nBecause they didn't C#!",
      "There are 10 types of people in this world:\n\nThose who understand binary, and those who don't!",
      "A SQL query walks into a bar, walks up to two tables and asks: *'Can I join you?'*",
      "Why was the computer cold?\n\nBecause it left its Windows open!",
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  // 5. Code Assistance & Common Programming Concepts
  if (query.includes('reverse') && query.includes('string')) {
    return `Here is how to reverse a string in Python and JavaScript:\n\n\`\`\`python\ntext = "hello world"\nreversed_text = text[::-1]\nprint(reversed_text)  # dlrow olleh\n\`\`\`\n\n\`\`\`javascript\nconst text = "hello world";\nconst reversed = text.split("").reverse().join("");\nconsole.log(reversed);\n\`\`\``;
  }

  if (query.includes('fibonacci')) {
    return `Here is an iterative Fibonacci generator in Python:\n\n\`\`\`python\ndef fibonacci(n):\n    a, b = 0, 1\n    result = []\n    for _ in range(n):\n        result.append(a)\n        a, b = b, a + b\n    return result\n\nprint(fibonacci(10))\n\`\`\``;
  }

  if (query.includes('binary search')) {
    return `Here is Binary Search in Python (O(log n)):\n\n\`\`\`python\ndef binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n\`\`\``;
  }

  if (query.includes('what is react') || query.includes('explain react')) {
    return "**React** is a component-based JavaScript library for building interactive user interfaces with reusable components and hooks such as `useState` and `useEffect`.";
  }

  if (query.includes('what is python') || query.includes('why python')) {
    return "**Python** is a high-level programming language valued for clear syntax and versatility. Rakesh uses Python for scripting, problem-solving, and workflow automation.";
  }

  if (query.includes('what is typescript') || query.includes('why typescript')) {
    return "**TypeScript** adds static type checking on top of JavaScript, helping catch bugs at compile time and keeping React codebases maintainable.";
  }

  if (query.includes('what is cybersecurity') || query.includes('cyber security')) {
    return "**Cybersecurity** focuses on protecting systems and data from unauthorized access or attacks. Rakesh explores client-side cryptography and security tooling in **CyberSafe** and **Vault**.";
  }

  // 6. Rakesh's Background & Biography
  if (
    query.includes('who is rakesh') ||
    query.includes('about rakesh') ||
    query.includes('introduce') ||
    query.includes('bio') ||
    query.includes('background') && !query.includes('education')
  ) {
    return `${personalInfo.shortIntro}\n\n• **Degree:** ${personalInfo.academic.degree}\n• **Academic Achievement:** SGPA ${personalInfo.academic.sgpa}\n• **Interests:** ${personalInfo.interests.join(', ')}`;
  }

  // 7. Specific Project Details (check before general "projects" query)
  if (query.includes('cybersafe')) {
    const p = projectsData.find(item => item.id === 'cybersafe');
    return `### ${p?.name} (${p?.status})\n\n${p?.description}\n\n• **Tech Stack:** ${p?.techStack.join(', ')}\n• **Live Link:** ${p?.liveUrl}\n• **Highlight:** Client-side SHA-256 checksums and password strength analysis.`;
  }

  if (query.includes('fileforge') || query.includes('fireforge') || query.includes('passport')) {
    const p = projectsData.find(item => item.id === 'fileforge');
    return `### ${p?.name} (${p?.status})\n\n${p?.description}\n\n• **Tech Stack:** ${p?.techStack.join(', ')}\n• **Live Link:** ${p?.liveUrl}\n• **Highlight:** Browser-local processing without uploading sensitive files to servers.`;
  }

  if (query.includes('lifeos')) {
    const p = projectsData.find(item => item.id === 'lifeos');
    return `### ${p?.name} (${p?.status})\n\n${p?.description}\n\n• **Tech Stack:** ${p?.techStack.join(', ')}\n• **Live Link:** ${p?.liveUrl}\n• **Highlight:** Study schedules, habit streaks, and tasks persisted locally.`;
  }

  if (query.includes('civicdesk')) {
    const p = projectsData.find(item => item.id === 'civicdesk');
    return `### ${p?.name} (${p?.status})\n\n${p?.description}\n\n• **Tech Stack:** ${p?.techStack.join(', ')}\n• **Live Link:** ${p?.liveUrl}\n• **Highlight:** Structured local neighborhood issue reporting and status tracking.`;
  }

  if (query.includes('vault') || query.includes('password manager')) {
    const p = projectsData.find(item => item.id === 'vault');
    return `### ${p?.name} (${p?.status})\n\n${p?.description}\n\n• **Tech Stack:** ${p?.techStack.join(', ')}\n• **Live Link:** ${p?.liveUrl}\n• **Highlight:** Client-side AES-GCM encryption via the native Web Crypto API.`;
  }

  if (query.includes('algovision') || query.includes('algorithm') || query.includes('dsa') || query.includes('sort')) {
    const p = projectsData.find(item => item.id === 'algovision');
    return `### ${p?.name} (${p?.status})\n\n${p?.description}\n\n• **Tech Stack:** ${p?.techStack.join(', ')}\n• **Live Link:** ${p?.liveUrl}\n• **Highlight:** Interactive sorting and pathfinding algorithm visualizations.`;
  }

  if (query.includes('n8n') || query.includes('automation workflow')) {
    const p = projectsData.find(item => item.id === 'n8n-automation-workflows');
    return `### ${p?.name} (${p?.status})\n\n${p?.description}\n\n• **Tech Stack:** ${p?.techStack.join(', ')}\n• **Note:** ${p?.demoNote}`;
  }

  // 8. Projects Overview (matches "Show his projects.", "projects", "portfolio", "apps", "work")
  if (
    query.includes('project') ||
    query.includes('portfolio') ||
    query.includes('what has he built') ||
    query.includes('apps') ||
    query.includes('work')
  ) {
    const completed = projectsData.filter(p => p.status === 'Completed');
    const inDev = projectsData.filter(p => p.status === 'In Development');

    const completedList = completed
      .map(p => `• **${p.name}** (${p.status}) — ${p.description}`)
      .join('\n');

    const devList = inDev
      .map(p => `• **${p.name}** (${p.status}) — ${p.description}`)
      .join('\n');

    return `### Portfolio Projects\n\n**Completed (${completed.length}):**\n${completedList}\n\n**In Development (${inDev.length}):**\n${devList}\n\nClick any project card on the page for full technical details and live links.`;
  }

  // 9. Development Journey
  if (query.includes('journey') || query.includes('milestone') || query.includes('timeline') || query.includes('learning')) {
    const steps = journeyMilestones
      .map((m, idx) => `• **${idx + 1}. ${m.title}** (${m.category}) — ${m.summary}`)
      .join('\n');

    return `### Development Journey\n\n${steps}`;
  }

  // 10. Academic Achievement & Education
  if (
    query.includes('education') ||
    query.includes('educational background') ||
    query.includes('bca') ||
    query.includes('sgpa') ||
    query.includes('grade') ||
    query.includes('score') ||
    query.includes('college') ||
    query.includes('degree') ||
    query.includes('achievement')
  ) {
    const summary = achievementsData
      .slice(0, 3)
      .map(a => `• **${a.title}:** ${a.metric} — ${a.description}`)
      .join('\n');

    return `### Academic Background & Milestones\n\n• **Degree:** ${personalInfo.academic.degree}\n• **Academic Achievement:** SGPA **${personalInfo.academic.sgpa}**\n• **Core Interests:** ${personalInfo.interests.join(', ')}\n\n${summary}`;
  }

  // 11. Technical Skills & Technologies
  if (
    query.includes('skill') ||
    query.includes('technolog') ||
    query.includes('tech') ||
    query.includes('stack') ||
    query.includes('language') ||
    query.includes('tools') ||
    query.includes('use')
  ) {
    const lines = skillCategories
      .map(cat => `• **${cat.title}:** ${cat.skills.map(s => s.name).join(', ')}`)
      .join('\n');

    return `### Technical Skills & Tools\n\n${lines}\n\n• **Key Interests:** ${personalInfo.interests.join(', ')}`;
  }

  // 12. Resume
  if (query.includes('resume') || query.includes('cv')) {
    return `You can view or print Rakesh's resume using the **Download Resume** button in the Hero section or via the Command Palette (\`⌘K\`), or email him at **${personalInfo.contact.email}**.`;
  }

  // 13. Contact Details
  if (query.includes('contact') || query.includes('email') || query.includes('reach') || query.includes('hire') || query.includes('github')) {
    return `### Contact Rakesh Kumar Mondal\n\n• **Email:** ${personalInfo.contact.email}\n• **GitHub:** ${personalInfo.contact.github}\n• **Portfolio:** ${personalInfo.contact.portfolioUrl}\n\nYou can also use the Contact section on this page to copy his email or draft a message directly.`;
  }

  // 14. Intelligent Contextual Fallback
  return `I don't have specific verified information for that query, but I can answer questions using Rakesh's actual portfolio data:\n\n• **About & Education:** BCA student with SGPA ${personalInfo.academic.sgpa}\n• **Skills & Technologies:** C, C++, Python, Java, React, TypeScript, Docker, n8n\n• **Projects:** CyberSafe, LifeOS, FileForge, CivicDesk, Vault, AlgoVision, n8n Automation Workflows\n• **Journey & Contact:** Milestones, email (${personalInfo.contact.email}), and GitHub\n\nTry one of the quick suggestion buttons above or ask about a specific project!`;
}
