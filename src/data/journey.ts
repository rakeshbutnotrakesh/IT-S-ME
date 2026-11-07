export interface JourneyMilestone {
  title: string;
  category: string;
  summary: string;
  keyLearnings: string[];
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    title: "Programming Fundamentals",
    category: "Foundation",
    summary: "Acquired core computer science fundamentals: memory management, logic building, data representation, and algorithmic thinking.",
    keyLearnings: [
      "Procedural programming logic and control flow",
      "Pointers, structures, and arrays",
      "Complexity analysis and algorithmic decomposition"
    ]
  },
  {
    title: "C & C++ Practice",
    category: "Low-Level & OOP",
    summary: "Deepened programming rigor through hands-on implementation of Data Structures and Object-Oriented Programming principles.",
    keyLearnings: [
      "Object-oriented design: inheritance, encapsulation, polymorphism",
      "Custom linked lists, stacks, queues, and binary trees",
      "Memory efficiency and compiling workflows"
    ]
  },
  {
    title: "Python Learning & Scripting",
    category: "Languages",
    summary: "Leveraged Python's expressive syntax to build practical utility scripts, file parsers, and data manipulation tools.",
    keyLearnings: [
      "Functional programming and list comprehensions",
      "Working with JSON, CSV, and local file I/O",
      "Rapid prototyping of algorithms and problem sets"
    ]
  },
  {
    title: "Web Development (HTML, CSS, JavaScript)",
    category: "Frontend",
    summary: "Transitioned to building interactive browser interfaces using modern semantic HTML5, responsive CSS, and ES6+ JavaScript.",
    keyLearnings: [
      "DOM manipulation, event bubbling, and async/await",
      "Responsive layout engineering with Flexbox and Grid",
      "Browser security boundaries and client-side storage"
    ]
  },
  {
    title: "React & TypeScript Exploration",
    category: "Modern Stack",
    summary: "Embraced declarative component architecture, typed interfaces, and state-driven web applications.",
    keyLearnings: [
      "Type safety, interfaces, and strict TypeScript configurations",
      "Custom React hooks, component lifecycles, and render optimization",
      "Vite tooling, modular styles, and Tailwind CSS systems"
    ]
  },
  {
    title: "Git & GitHub Workflow",
    category: "Developer Tools",
    summary: "Integrated industry-standard version control and collaborative Git workflows into daily coding practice.",
    keyLearnings: [
      "Branch management, atomic commits, and pull requests",
      "Repository documentation, README drafting, and issue tracking",
      "Automated deployments connected to cloud git repos"
    ]
  },
  {
    title: "Docker & n8n Workflow Automation",
    category: "Automation & DevOps",
    summary: "Explored containerization and visual automation pipelines to connect APIs and eliminate repetitive manual workflows.",
    keyLearnings: [
      "Containerizing local environments with Docker",
      "n8n node orchestration, webhook triggers, and data mappings",
      "Self-hosted automation instances and micro-service testing"
    ]
  },
  {
    title: "AI-Powered Application Experiments",
    category: "Modern Technology",
    summary: "Explored prompt engineering, developer tools, and intelligent client-side interfaces in Google AI Studio.",
    keyLearnings: [
      "Human-computer interaction with AI-assisted software",
      "Lightweight rule-based logic and structured local assistants",
      "Rapid prototyping with modern AI dev environments"
    ]
  },
  {
    title: "Cybersecurity Exploration",
    category: "Security",
    summary: "Studying network security fundamentals, browser cryptography, secure coding practices, and vulnerability prevention.",
    keyLearnings: [
      "Client-side cryptography with Web Crypto API",
      "Password entropy evaluation and hashing algorithms (SHA-256)",
      "Safe URL handling and defense against common web vulnerabilities"
    ]
  }
];
