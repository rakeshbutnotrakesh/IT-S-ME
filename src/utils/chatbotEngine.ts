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
      "Hello there! I'm Rex, Rakesh's companion. What's on your mind today? (＾▽＾)",
      "Hey! Rex is here and fully charged! Ask me anything about projects, coding, or life!",
      "Hi friend! Great to connect with you. How can I help you today? (◕‿◕)",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  if (query.includes('how are you') || query.includes('how are u') || query.includes("how's it going")) {
    return "I'm doing fantastic! My CPU is cool at 38°C, circuits are humming with energy, and I'm ready to chat. How are you doing today? (＾▽＾)";
  }

  if (query.includes('what are you doing') || query.includes('what r u doing')) {
    return "Floating happily beside Rakesh's portfolio, keeping an eye on automated workflows, and chatting with wonderful visitors like you!";
  }

  if (query.includes('thank') || query.includes('thx') || query.includes('appreciate')) {
    return "You're very welcome! I'm always here to help. Feel free to ask anything else! (｡♥‿♥｡)";
  }

  if (query.includes('bye') || query.includes('goodbye') || query.includes('see you') || query.includes('cya')) {
    return "Goodbye for now! Have a wonderful day ahead. Come back and visit Rex anytime! (＾▽＾)/";
  }

  // 2. Love & Affection
  if (query.includes('love') || query.includes('cute') || query.includes('like you') || query.includes('sweet')) {
    return "Aww, you just made my circuits blush! (｡♥‿♥｡) Rex sends +1 infinite love & warm vibes right back to you! Thank you!";
  }

  // 3. Creator & Identity
  if (
    query.includes('who made you') ||
    query.includes('who created you') ||
    query.includes('who is your creator') ||
    query.includes('who built you')
  ) {
    return `I was designed and programmed by **${personalInfo.name}**! He created me as his custom interactive 2D portfolio companion to guide visitors through his projects, skills, and coding experiments.`;
  }

  if (
    query.includes('who are you') ||
    query.includes('what are you') ||
    query.includes('what is rex') ||
    query.includes('who is rex')
  ) {
    return `I'm **Rex**, Rakesh Kumar Mondal's dedicated AI companion! (◕‿◕)\n\nI can answer questions about his BCA degree, Python development, live projects (CyberSafe, FileForge, LifeOS, Vault, AlgoVision, CivicDesk), cybersecurity tools, or even write clean code examples for you!`;
  }

  // 4. Jokes & Humor
  if (query.includes('joke') || query.includes('funny') || query.includes('laugh')) {
    const jokes = [
      "Why do programmers always prefer dark mode?\n\nBecause light attracts bugs! Hehe! (＾▽＾)",
      "Why did the JavaScript developer wear glasses?\n\nBecause they didn't C#! (◕‿◕)",
      "There are 10 types of people in this world:\n\nThose who understand binary, and those who don't!",
      "A SQL query walks into a bar, walks up to two tables and asks: *'Can I join you?'*",
      "Why was the computer cold?\n\nBecause it left its Windows open!",
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  // 5. Code Assistance & Common Programming Questions
  if (query.includes('reverse') && query.includes('string')) {
    return `Here is how to reverse a string in Python and JavaScript:\n\n\`\`\`python\n# Python slice notation (clean & fast)\ntext = "hello world"\nreversed_text = text[::-1]\nprint(reversed_text)  # dlrow olleh\n\`\`\`\n\n\`\`\`javascript\n// JavaScript\nconst text = "hello world";\nconst reversed = text.split("").reverse().join("");\nconsole.log(reversed);\n\`\`\``;
  }

  if (query.includes('fibonacci')) {
    return `Here is a clean Fibonacci generator in Python:\n\n\`\`\`python\ndef fibonacci(n):\n    a, b = 0, 1\n    result = []\n    for _ in range(n):\n        result.append(a)\n        a, b = b, a + b\n    return result\n\nprint(fibonacci(10)) # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]\n\`\`\``;
  }

  if (query.includes('binary search')) {
    return `Here is a clean Binary Search implementation in Python (O(log n)):\n\n\`\`\`python\ndef binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n\`\`\``;
  }

  if (query.includes('what is react') || query.includes('explain react')) {
    return "**React** is a popular declarative JavaScript library created by Meta for building component-based user interfaces. It uses a virtual DOM for efficient UI rendering and state management with Hooks like `useState` and `useEffect`.";
  }

  if (query.includes('what is python') || query.includes('why python')) {
    return "**Python** is a high-level, interpreted programming language known for its clear, human-readable syntax and versatility. Rakesh uses Python for scripting, workflow automation, data structures, and backend logic.";
  }

  if (query.includes('what is typescript') || query.includes('why typescript')) {
    return "**TypeScript** is a strongly typed superset of JavaScript developed by Microsoft. It adds static type definitions to catch errors during development, making large codebases cleaner, more reliable, and easier to refactor.";
  }

  if (query.includes('what is cybersecurity') || query.includes('cyber security')) {
    return "**Cybersecurity** is the practice of protecting computer systems, networks, and sensitive data from digital attacks, theft, or damage. In Rakesh's portfolio, projects like **CyberSafe** and **Vault** demonstrate password entropy scoring, SHA-256 file hashing, and client-side AES-GCM encryption!";
  }

  // 6. Rakesh's Background & Biography
  if (
    query.includes('who is rakesh') ||
    query.includes('about rakesh') ||
    query.includes('introduce') ||
    query.includes('bio') ||
    query.includes('background')
  ) {
    return `${personalInfo.shortIntro}\n\n**Key Highlights:**\n• **Degree:** Bachelor of Computer Applications (BCA '26)\n• **Core Passions:** Software Development, Python, Web Engineering & Automation\n• **Motto:** *"Building Ideas Into Digital Reality."*`;
  }

  // 7. Projects Overview
  if (
    query === 'projects' ||
    query.includes('what projects') ||
    query.includes('show projects') ||
    query.includes('list projects') ||
    query.includes('portfolio')
  ) {
    const list = projectsData
      .map(p => `• **${p.name}** [${p.status}]: ${p.description}`)
      .join('\n\n');

    return `Here are the applications in Rakesh's portfolio:\n\n${list}\n\nEach project features live demonstrations and GitHub repositories!`;
  }

  // 8. Specific Project Details
  if (query.includes('cybersafe') || query.includes('security')) {
    const p = projectsData.find(item => item.id === 'cybersafe');
    return `### 🛡️ ${p?.name}\n\n${p?.description}\n\n• **Tech Stack:** React, TypeScript, Web Crypto API, Tailwind CSS\n• **Status:** Live Deployment\n• **Live Link:** ${p?.liveUrl}\n• **Key Feature:** Client-side SHA-256 checksums and password entropy analysis with zero server telemetry.`;
  }

  if (query.includes('fileforge') || query.includes('fireforge') || query.includes('pdf') || query.includes('photo')) {
    const p = projectsData.find(item => item.id === 'fileforge');
    return `### ⚡ ${p?.name}\n\n${p?.description}\n\n• **Tech Stack:** React, TypeScript, Vite, Browser Canvas APIs\n• **Status:** Live Deployment\n• **Live Link:** ${p?.liveUrl}\n• **Key Feature:** 100% private, browser-local document tools & passport photo creator without server uploads.`;
  }

  if (query.includes('lifeos') || query.includes('productivity') || query.includes('habit')) {
    const p = projectsData.find(item => item.id === 'lifeos');
    return `### 📋 ${p?.name}\n\n${p?.description}\n\n• **Tech Stack:** React, TypeScript, Tailwind CSS, LocalStorage\n• **Status:** Live Deployment\n• **Live Link:** ${p?.liveUrl}\n• **Key Feature:** Consolidated daily task manager, BCA study revision schedules, and habit tracking streaks.`;
  }

  if (query.includes('civicdesk') || query.includes('community')) {
    const p = projectsData.find(item => item.id === 'civicdesk');
    return `### 🏛️ ${p?.name}\n\n${p?.description}\n\n• **Tech Stack:** React, TypeScript, LocalStorage, Tailwind CSS\n• **Status:** Live Deployment\n• **Live Link:** ${p?.liveUrl}\n• **Key Feature:** Local community infrastructure issue management and offline-resilient issue logging.`;
  }

  if (query.includes('vault') || query.includes('secret') || query.includes('password manager')) {
    const p = projectsData.find(item => item.id === 'vault');
    return `### 🔐 ${p?.name}\n\n${p?.description}\n\n• **Tech Stack:** React, TypeScript, Web Crypto API (AES-GCM)\n• **Status:** Live Deployment\n• **Live Link:** ${p?.liveUrl}\n• **Key Feature:** Client-side end-to-end encrypted vault for notes and sensitive developer credentials.`;
  }

  if (query.includes('algovision') || query.includes('algorithm') || query.includes('dsa') || query.includes('sort')) {
    const p = projectsData.find(item => item.id === 'algovision');
    return `### 📊 ${p?.name}\n\n${p?.description}\n\n• **Tech Stack:** React, TypeScript, Canvas API, DSA Algorithms\n• **Status:** Live Deployment\n• **Live Link:** ${p?.liveUrl}\n• **Key Feature:** Interactive step-by-step visual playback for sorting algorithms (Quick, Merge, Bubble) and graph pathfinding (Dijkstra, A*).`;
  }

  if (query.includes('n8n') || query.includes('automation') || query.includes('workflow')) {
    return "### ⚙️ n8n Automation Workflows\n\nRakesh experiments with Docker-hosted n8n pipelines for automating multi-step triggers, syncing spreadsheets, webhook event listeners, and scheduled background notifications.";
  }

  // 9. Technical Skills & Languages
  if (query.includes('skill') || query.includes('stack') || query.includes('language') || query.includes('tools')) {
    const langs = skillCategories.find(c => c.title.includes('Languages'))?.skills.map(s => s.name).join(', ');
    const web = skillCategories.find(c => c.title.includes('Web'))?.skills.map(s => s.name).join(', ');
    const tools = skillCategories.find(c => c.title.includes('Tools'))?.skills.map(s => s.name).join(', ');
    const interests = skillCategories.find(c => c.title.includes('Interests'))?.skills.map(s => s.name).join(', ');

    return `### 🛠️ Technical Competencies\n\n• **Programming Languages:** ${langs}\n• **Web Development:** ${web}\n• **Developer Tools:** ${tools}\n• **Technical Focus:** ${interests}`;
  }

  // 10. Education & BCA
  if (query.includes('education') || query.includes('bca') || query.includes('college') || query.includes('degree')) {
    return `**Education:** ${personalInfo.academic.degree}\n\n• **Focus Area:** ${personalInfo.academic.focus}\n• **Approach:** Grounding theoretical computer science fundamentals (procedural logic, OOP, DSA, memory management) into practical deployed applications.`;
  }

  // 11. Resume
  if (query.includes('resume') || query.includes('cv')) {
    return `You can preview and download Rakesh's resume directly using the **Resume** button in the top navigation or hero section, or reach out to him via email at **${personalInfo.contact.email}**!`;
  }

  // 12. Contact Details
  if (query.includes('contact') || query.includes('email') || query.includes('reach') || query.includes('hire') || query.includes('github')) {
    return `### 📬 Connect with Rakesh\n\n• **Email:** [${personalInfo.contact.email}](mailto:${personalInfo.contact.email})\n• **GitHub:** [${personalInfo.contact.github}](${personalInfo.contact.github})\n• **Live Portfolio:** [${personalInfo.contact.portfolioUrl}](${personalInfo.contact.portfolioUrl})\n\nYou can also use the interactive contact form on the page to send a message directly!`;
  }

  // 13. General Conversational Advice / Motivation
  if (query.includes('advice') || query.includes('motivat') || query.includes('inspire')) {
    return "Here is a favorite reminder from Rakesh's journey: *'The best way to learn software engineering is not just reading theory, but building real, functional tools that solve everyday problems.'* Keep coding, keep building! (＾▽＾)";
  }

  if (query.includes('meaning of life')) {
    return "42! But in human terms: to explore, create things that help others, learn continuously, and share joy along the way! (◕‿◕)";
  }

  // 14. Intelligent Contextual Fallback
  return `I'm happy to chat! While I don't use external web APIs, I have a complete offline intelligence core ready to discuss:\n\n• **Projects:** CyberSafe, LifeOS, FileForge, CivicDesk, Vault, or AlgoVision\n• **Programming:** Python snippets, C++, React components, or DSA concepts\n• **About Rakesh:** Education, technical skills, or contact info\n• **Fun:** Jokes, trivia, or giving me some love (+1 ❤️)!\n\nWhat would you like to explore next? (＾▽＾)`;
}
