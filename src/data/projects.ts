import imgFintech from '../assets/images/project_fintech_os_1793976471893.jpg';
import imgSpatial from '../assets/images/hero_abstract_spatial_1793976472134.jpg';
import imgCommerce from '../assets/images/project_avant_commerce_1793976472540.jpg';
import imgCanvas from '../assets/images/project_ai_canvas_1793976473412.jpg';

export type ProjectStatus = 'Completed' | 'In Development' | 'Planned';

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  description: string;
  detailedOverview?: string;
  techStack: string[];
  status: ProjectStatus;
  githubUrl?: string;
  liveUrl?: string;
  demoNote?: string;
  highlights: string[];
  coverImage: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "personal-portfolio",
    name: "Personal Developer Portfolio",
    category: "Web Development",
    description: "A responsive developer portfolio showcasing technical skills, projects, academic record, and interactive companion Rex.",
    detailedOverview: "Built with React, TypeScript, Vite, and Tailwind CSS with dark and light theme persistence. Features an offline rule-based portfolio assistant ('Rex'), category filtering, keyboard command palette, and an interactive particle swarm canvas.",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    status: "Completed",
    githubUrl: "https://github.com/rakeshbutnotrakesh",
    liveUrl: "https://portfolio-two-puce-hj49ocwerj.vercel.app/",
    highlights: [
      "Offline rule-based portfolio assistant (Rex) with zero API keys",
      "Dark & Light mode support with persisted theme preference",
      "Interactive Swarm Antigravity canvas with toggleable physics",
      "Responsive layout verified from 320px mobile to 1920px desktop"
    ],
    coverImage: imgFintech
  },
  {
    id: "cybersafe",
    name: "CyberSafe",
    category: "Cybersecurity",
    description: "A browser-based cybersecurity toolkit featuring password strength analysis, secure password generation, URL inspection, and SHA-256 file hashing.",
    detailedOverview: "An educational security utility powered by the native Web Crypto API. Users can compute local SHA-256 file checksums, evaluate password entropy, and inspect URL components for suspicious patterns without uploading files.",
    techStack: ["React", "TypeScript", "Web Crypto API", "Tailwind CSS"],
    status: "Completed",
    githubUrl: "https://github.com/rakeshbutnotrakesh",
    liveUrl: "https://cybersafe-eosin-five.vercel.app/",
    highlights: [
      "Client-side SHA-256 checksum computation for local files",
      "Password entropy scoring and configurable secure generator",
      "URL component analyzer and security awareness checks"
    ],
    coverImage: imgFintech
  },
  {
    id: "lifeos",
    name: "LifeOS",
    category: "Productivity & Utilities",
    description: "A personal productivity workspace for organizing tasks, study schedules, habits, expenses, and goals.",
    detailedOverview: "An integrated personal workspace consolidating daily task lists, BCA revision planning, habit streaks, and goal milestones inside a clean local-first interface.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "LocalStorage"],
    status: "Completed",
    githubUrl: "https://github.com/rakeshbutnotrakesh",
    liveUrl: "https://lifeos-puce-theta.vercel.app/",
    highlights: [
      "Unified student study and revision planner",
      "Habit formation streaks with clear progress tracking",
      "Offline-ready browser LocalStorage persistence"
    ],
    coverImage: imgSpatial
  },
  {
    id: "fileforge",
    name: "FileForge",
    category: "Productivity & Utilities",
    description: "A browser-local file utility workspace for document workflows, PDF tools, image resizing, and passport-size photo preparation.",
    detailedOverview: "A privacy-focused client-side utility suite engineered to process images and documents directly in the browser using modern Web and Canvas APIs so sensitive files stay on the user's device.",
    techStack: ["React", "TypeScript", "Vite", "Canvas API"],
    status: "Completed",
    githubUrl: "https://github.com/rakeshbutnotrakesh",
    liveUrl: "https://fileforge-jet.vercel.app/",
    highlights: [
      "Local browser processing with zero server file uploads",
      "Image resizing, cropping, and passport-size photo creation",
      "Fast client-side document and PDF helper utilities"
    ],
    coverImage: imgCommerce
  },
  {
    id: "civicdesk",
    name: "CivicDesk",
    category: "Community & Web Apps",
    description: "A community issue tracking web application that helps users record, prioritize, and monitor neighborhood problems.",
    detailedOverview: "A civic issue logger enabling residents to record local infrastructure concerns (such as streetlights, road damage, or sanitation issues) with priority levels, category filters, and local persistence.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "LocalStorage"],
    status: "Completed",
    githubUrl: "https://github.com/rakeshbutnotrakesh",
    liveUrl: "https://civicdesk-gamma.vercel.app/",
    highlights: [
      "Structured neighborhood issue reporting and status workflow",
      "Offline-resilient state persisted in browser LocalStorage",
      "Priority tagging and resolution progress log"
    ],
    coverImage: imgCanvas
  },
  {
    id: "vault",
    name: "Vault",
    category: "Cybersecurity",
    description: "A privacy-first digital vault for client-side encrypted notes, credentials, and sensitive developer snippets.",
    detailedOverview: "A client-side cryptographic storage app designed to encrypt private notes and credentials right inside the browser using the Web Crypto API without external telemetry.",
    techStack: ["React", "TypeScript", "Web Crypto API", "Tailwind CSS"],
    status: "Completed",
    githubUrl: "https://github.com/rakeshbutnotrakesh",
    liveUrl: "https://vault-ruby-theta.vercel.app/",
    highlights: [
      "Client-side AES-GCM encryption via Web Crypto API",
      "Organized encrypted notes and credential storage",
      "Zero external tracking or third-party cloud storage"
    ],
    coverImage: imgFintech
  },
  {
    id: "algovision",
    name: "AlgoVision",
    category: "Computer Science & DSA",
    description: "An interactive algorithm and data structure visualizer demonstrating sorting and graph pathfinding step by step.",
    detailedOverview: "An educational computer science tool built to visualize how classic sorting and pathfinding algorithms operate in real time, complete with speed controls and comparison tracking.",
    techStack: ["React", "TypeScript", "Canvas API", "Algorithms"],
    status: "Completed",
    githubUrl: "https://github.com/rakeshbutnotrakesh",
    liveUrl: "https://algovision-sand.vercel.app/",
    highlights: [
      "Step-by-step sorting animations (Quick, Merge, Bubble, Heap)",
      "Interactive grid pathfinding (Dijkstra, A* Search)",
      "Adjustable execution speed and comparison counters"
    ],
    coverImage: imgCanvas
  },
  {
    id: "n8n-automation-workflows",
    name: "n8n Automation Workflows",
    category: "Automation & Backend",
    description: "Hands-on workflow automation experiments involving webhooks, scheduled triggers, data processing, and API integrations.",
    detailedOverview: "A self-hosted collection of n8n workflows running inside Docker containers to automate repetitive tasks, transform webhook payloads, and test automated notification pipelines.",
    techStack: ["n8n", "Docker", "JavaScript", "Workflow Automation"],
    status: "In Development",
    githubUrl: "https://github.com/rakeshbutnotrakesh",
    demoNote: "Self-hosted locally via Docker — no public web demo is hosted.",
    highlights: [
      "Dockerized local n8n workflow environment",
      "Webhook listeners and JSON data transformation nodes",
      "Scheduled triggers and automated alert pipelines"
    ],
    coverImage: imgSpatial
  }
];
