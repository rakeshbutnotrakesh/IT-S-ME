export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  description: string;
  detailedOverview?: string;
  techStack: string[];
  status: 'Live' | 'Planned / In Development' | 'Experimental / Personal Projects';
  githubUrl?: string;
  liveUrl?: string;
  highlights: string[];
  coverImage: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "personal-portfolio",
    name: "Personal Developer Portfolio",
    category: "Web Development",
    description: "A personal portfolio website showcasing technical interests, projects and development journey.",
    detailedOverview: "Built from the ground up using React, TypeScript, and Vite with a futuristic dark/light theme aesthetic. Features an interactive rule-based assistant ('Rex'), responsive navigation, live category filters, and an Antigravity particle swarm simulation.",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    status: "Live",
    githubUrl: "https://github.com/rakeshbutnotrakesh",
    liveUrl: "https://rakesh-kumar-mondal.vercel.app",
    highlights: [
      "Lightweight rule-based AI-style assistant (Rex)",
      "Dark & Light mode support with persistent state",
      "Interactive Swarm Antigravity particle canvas",
      "100% responsive layout across all device viewports"
    ],
    coverImage: "/src/assets/images/project_fintech_os_1793976471893.jpg"
  },
  {
    id: "cybersafe",
    name: "CyberSafe",
    category: "Cybersecurity",
    description: "A browser-based cybersecurity toolkit featuring password analysis, secure password generation, URL risk analysis and file hash generation.",
    detailedOverview: "An educational and utility security workspace using the native Web Crypto API. Allows users to compute SHA-256 file hashes client-side, evaluate entropy in passwords, and inspect URL components for suspicious indicators.",
    techStack: ["React", "TypeScript", "Web Crypto API", "Tailwind CSS"],
    status: "Live",
    githubUrl: "https://github.com/rakeshbutnotrakesh",
    liveUrl: "https://cybersafe-eosin-five.vercel.app/",
    highlights: [
      "Cryptographic SHA-256 checksum calculation for local files",
      "Zxcvbn-style entropy scoring and password security analyzer",
      "URL component inspector & educational security best practices"
    ],
    coverImage: "/src/assets/images/project_fintech_os_1793976471893.jpg"
  },
  {
    id: "lifeos",
    name: "LifeOS",
    category: "Productivity & Utilities",
    description: "A personal productivity workspace for managing tasks, studies, finances, habits and goals.",
    detailedOverview: "An integrated personal management operating system consolidating daily task management, BCA study schedules, habit trackers, and milestone planning into one focused dashboard.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "LocalStorage"],
    status: "Live",
    githubUrl: "https://github.com/rakeshbutnotrakesh",
    liveUrl: "https://lifeos-puce-theta.vercel.app/",
    highlights: [
      "Unified student study and revision planner",
      "Habit formation streaks with visual progress meters",
      "Minimalist distraction-free dark interface with local persistence"
    ],
    coverImage: "/src/assets/images/hero_abstract_spatial_1793976472134.jpg"
  },
  {
    id: "fileforge",
    name: "FileForge",
    category: "Productivity & Utilities",
    description: "An all-in-one local file conversion workspace featuring document conversion, PDF tools, image processing and passport-size photo creation.",
    detailedOverview: "A privacy-first, client-side utility suite designed to process files directly inside the browser using modern Web APIs, WebAssembly, and Canvas, eliminating the need to upload sensitive documents to remote servers.",
    techStack: ["React", "TypeScript", "Vite", "Browser APIs", "Canvas API"],
    status: "Live",
    githubUrl: "https://github.com/rakeshbutnotrakesh",
    liveUrl: "https://fileforge-jet.vercel.app/",
    highlights: [
      "Zero server uploads: 100% local browser processing",
      "Image resizing, cropping & passport-size photo generator",
      "PDF merge, split, and client-side document conversions"
    ],
    coverImage: "/src/assets/images/project_avant_commerce_1793976472540.jpg"
  },
  {
    id: "civicdesk",
    name: "CivicDesk",
    category: "Community & Web Apps",
    description: "A local community issue management application that helps users record and track neighbourhood problems.",
    detailedOverview: "A civic empowerment tool enabling residents to document public infrastructure defects (such as streetlights, potholes, and garbage issues) with localized priority tags, status updates, and offline-first LocalStorage tracking.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "LocalStorage"],
    status: "Live",
    githubUrl: "https://github.com/rakeshbutnotrakesh",
    liveUrl: "https://civicdesk-gamma.vercel.app/",
    highlights: [
      "Community problem reporting and status tracking",
      "Offline-resilient state stored locally in the browser",
      "Categorized urgency levels and issue resolution log"
    ],
    coverImage: "/src/assets/images/project_ai_canvas_1793976473412.jpg"
  },
  {
    id: "vault",
    name: "Vault",
    category: "Cybersecurity",
    description: "A secure, privacy-first digital vault for client-side encrypted credentials, protected notes, and sensitive records.",
    detailedOverview: "A client-side cryptographic storage application engineered to keep sensitive notes, API keys, and credentials encrypted in the browser with AES-GCM and zero third-party telemetry.",
    techStack: ["React", "TypeScript", "Web Crypto API", "Tailwind CSS"],
    status: "Live",
    githubUrl: "https://github.com/rakeshbutnotrakesh",
    liveUrl: "https://vault-ruby-theta.vercel.app/",
    highlights: [
      "End-to-end client-side encryption with Web Crypto API",
      "Encrypted note and secret credential manager",
      "Clean zero-knowledge architecture with offline reliability"
    ],
    coverImage: "/src/assets/images/project_fintech_os_1793976471893.jpg"
  },
  {
    id: "algovision",
    name: "AlgoVision",
    category: "Computer Science & DSA",
    description: "An interactive algorithm and data structure visualizer demonstrating sorting, pathfinding, and computational concepts.",
    detailedOverview: "An educational visualizer designed to bring Data Structures and Algorithms to life. Features real-time step-by-step playback, comparison counters, and interactive speed controls for sorting algorithms and graph pathfinding.",
    techStack: ["React", "TypeScript", "Canvas API", "Algorithms"],
    status: "Live",
    githubUrl: "https://github.com/rakeshbutnotrakesh",
    liveUrl: "https://algovision-sand.vercel.app/",
    highlights: [
      "Step-by-step sorting visualization (Quick, Merge, Bubble, Heap)",
      "Interactive pathfinding algorithms (Dijkstra, A* Search)",
      "Real-time speed regulation and comparison metrics"
    ],
    coverImage: "/src/assets/images/project_ai_canvas_1793976473412.jpg"
  },
  {
    id: "n8n-automation-workflows",
    name: "n8n Automation Workflows",
    category: "Automation & Backend",
    description: "Practical workflow automation experiments involving triggers, integrations, data processing and automated tasks.",
    detailedOverview: "A collection of self-hosted n8n nodes and Docker workflows designed to automate repetitive digital tasks, sync spreadsheet records, fetch API webhooks, and trigger periodic notifications.",
    techStack: ["n8n", "Docker", "JavaScript", "Workflow Automation"],
    status: "Experimental / Personal Projects",
    githubUrl: "https://github.com/rakeshbutnotrakesh",
    highlights: [
      "Dockerized local n8n workflow deployment",
      "Webhook trigger listeners and data transformation nodes",
      "Automated multi-step event triggers and alerting"
    ],
    coverImage: "/src/assets/images/hero_abstract_spatial_1793976472134.jpg"
  }
];
