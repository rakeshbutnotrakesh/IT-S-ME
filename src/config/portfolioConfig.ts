import imgFintech from '../assets/images/project_fintech_os_1793976471893.jpg';
import imgSpatial from '../assets/images/hero_abstract_spatial_1793976472134.jpg';
import imgCommerce from '../assets/images/project_avant_commerce_1793976472540.jpg';
import imgCanvas from '../assets/images/project_ai_canvas_1793976473412.jpg';

export type ProjectStatus = 'Completed' | 'In Development' | 'Planned';

export interface ProjectConfigItem {
  id: string;
  name: string;
  category: string;
  featured?: boolean;
  description: string;
  problem: string;
  solution: string;
  result: string;
  detailedOverview?: string;
  techStack: string[];
  status: ProjectStatus;
  githubUrl?: string;
  liveUrl?: string;
  demoNote?: string;
  highlights: string[];
  coverImage: string;
}

export interface CertificationOrAchievement {
  id: string;
  metric: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  badge: string;
  credentialUrl?: string;
}

/**
 * ============================================================================
 * CENTRAL PORTFOLIO CONFIGURATION — EDIT ONLY THIS FILE TO UPDATE YOUR SITE
 * ============================================================================
 * Replace any [PLACEHOLDER] values below with your own details:
 * - [GITHUB_USERNAME] -> your GitHub handle (currently set to rakeshbutnotrakesh)
 * - [YOUR_COLLEGE_NAME] -> your college or university name
 * - [EXPECTED_GRADUATION_YEAR] -> e.g. "2027"
 * - [YOUR_LINKEDIN_URL] -> your full LinkedIn profile URL
 * - [YOUR_FORMSPREE_ENDPOINT] -> e.g. "https://formspree.io/f/xxxxxxxx"
 * - [BOOKING_CALENDAR_URL] -> Cal.com / Calendly link (optional; defaults to email)
 */
export const portfolioConfig = {
  meta: {
    siteTitle: 'Rakesh Kumar Mondal | Software Developer Portfolio',
    siteDescription:
      'Software developer building high-speed web apps, browser security utilities, and n8n workflow automation with Python, React, TypeScript, and Docker.',
    canonicalUrl: 'https://portfolio-two-puce-hj49ocwerj.vercel.app/',
    lastUpdated: 'November 2026',
  },

  profile: {
    name: 'Rakesh Kumar Mondal',
    shortName: 'Rakesh Mondal',
    firstName: 'Rakesh',
    initials: 'RKM',
    title: 'Software Developer · Web Apps & Workflow Automation',
    heroKicker: 'Software Developer · Available for Internships & Junior Roles',
    heroHeadline: 'I engineer fast web software and automated workflows.',
    heroSubheadline:
      'Building React & TypeScript interfaces, client-side cryptography utilities, and self-hosted Docker + n8n automation systems.',
    rotatingRoles: [
      'React & TypeScript Interfaces',
      'n8n & Docker Automation',
      'Browser Security Utilities',
      'Python Scripting & Tooling',
    ],
    avatarPlaceholderLabel: '[ADD YOUR PROFILE PHOTO]',
    aboutParagraphs: [
      "I'm Rakesh Kumar Mondal, a BCA student and software developer focused on building practical web applications, browser-local tools, and reliable automation systems.",
      'Across seven live Vercel deployments, I solve real user workflows end-to-end—engineering Web Crypto security toolkits, Canvas data-structure visualizers, and offline-first productivity apps backed by C, C++, Python, and Java fundamentals.',
      'Beyond frontend interfaces, I run self-hosted Docker and n8n automation pipelines to connect webhooks, transform payloads, and remove repetitive manual work.',
    ],
    interests: [
      'Software Engineering',
      'Web Development',
      'Workflow Automation',
      'Python Scripting',
      'Cybersecurity Tooling',
      'Algorithms & Data Structures',
    ],
  },

  // Clean education block: degree, college, and expected graduation year (no scores/grades)
  education: {
    degree: 'Bachelor of Computer Applications (BCA)',
    college: 'Swami Vivekananda University',
    expectedGraduation: '2029',
    location: 'India',
    focus: 'Programming Fundamentals, Data Structures, Web Engineering & Workflow Automation',
  },

  contact: {
    email: 'rakeshkumarmondal51@gmail.com',
    // Set to your GitHub username — used by GitHub REST API auto-fetch
    githubUsername: 'rakeshbutnotrakesh', // Replace if changing [GITHUB_USERNAME]
    githubUrl: 'https://github.com/rakeshbutnotrakesh',
    linkedinUrl: 'https://www.linkedin.com/in/rakesh-kumar-mondal-0a46b236b/',
    portfolioUrl: 'https://portfolio-two-puce-hj49ocwerj.vercel.app/',
    // Optional Cal.com / Calendly link; fallback opens direct email composer
    bookingUrl: '[BOOKING_CALENDAR_URL]',
    // Optional Formspree endpoint e.g. "https://formspree.io/f/your_form_id"
    formspreeEndpoint: '[YOUR_FORMSPREE_ENDPOINT]',
    // Offline static PDF placed in /public/resume.pdf (falls back to clean downloadable summary)
    resumePdfPath: '/resume.pdf',
  },

  github: {
    // Repository names pinned to top of the Open-Source Repositories showcase
    pinnedRepos: [
      'CyberSafe',
      'LifeOS',
      'FileForge',
      'CivicDesk',
      'Vault',
      'AlgoVision',
    ],
    maxReposToShow: 6,
  },

  stats: [
    { id: 'apps', target: 7, suffix: '+', label: 'Live Deployed Web Apps' },
    { id: 'tech', target: 17, suffix: '', label: 'Core Languages & Tools' },
    { id: 'builds', target: 8, suffix: '', label: 'Production & Automation Builds' },
  ],

  featuredProjects: [
    {
      id: 'cybersafe',
      name: 'CyberSafe',
      category: 'Cybersecurity',
      featured: true,
      description:
        'Browser-native security toolkit for password entropy analysis, configurable credential generation, URL inspection, and local SHA-256 checksums.',
      problem:
        'Users frequently upload sensitive files or paste passwords into untrusted third-party web tools just to check hashes or entropy.',
      solution:
        'Engineered a zero-upload security suite powered by the browser Web Crypto API so hashing, entropy math, and URL parsing execute entirely in memory.',
      result:
        'Deployed live on Vercel with instant sub-millisecond SHA-256 verification and zero server data exposure.',
      detailedOverview:
        'An educational security utility powered by the native Web Crypto API. Users compute local SHA-256 file checksums, evaluate password entropy, and inspect URL components for suspicious patterns without uploading files.',
      techStack: ['React', 'TypeScript', 'Web Crypto API', 'Tailwind CSS'],
      status: 'Completed',
      githubUrl: 'https://github.com/rakeshbutnotrakesh',
      liveUrl: 'https://cybersafe-eosin-five.vercel.app/',
      highlights: [
        'Zero-upload client-side SHA-256 file checksum verification',
        'Real-time password entropy analyzer & customizable generator',
        'URL structure & phishing-pattern inspector',
      ],
      coverImage: imgFintech,
    },
    {
      id: 'fileforge',
      name: 'FileForge',
      category: 'Productivity & Utilities',
      featured: true,
      description:
        'Client-side document and image workspace for resizing, cropping, PDF utilities, and passport photo formatting.',
      problem:
        'Simple document formatting and passport photo cropping often force users onto ad-heavy websites requiring remote file uploads.',
      solution:
        'Built an offline-capable Canvas API and Vite web utility that processes images and documents locally inside the browser viewport.',
      result:
        'Shipped fast browser-local workflows handling resizing, aspect presets, and document helpers without external storage.',
      detailedOverview:
        'A privacy-focused client-side utility suite engineered to process images and documents directly in the browser using modern Web and Canvas APIs so sensitive files stay on the user device.',
      techStack: ['React', 'TypeScript', 'Vite', 'Canvas API'],
      status: 'Completed',
      githubUrl: 'https://github.com/rakeshbutnotrakesh',
      liveUrl: 'https://fileforge-jet.vercel.app/',
      highlights: [
        '100% browser-local Canvas image processing',
        'Precision passport-size cropping and DPI-ready sizing',
        'Client-side PDF & document workflow helpers',
      ],
      coverImage: imgCommerce,
    },
    {
      id: 'algovision',
      name: 'AlgoVision',
      category: 'Computer Science & DSA',
      featured: true,
      description:
        'Interactive sorting and graph pathfinding visualizer with live step controls and operation counters.',
      problem:
        'Understanding recursive sorting splits and graph heuristic exploration from static textbook diagrams is unintuitive.',
      solution:
        'Implemented step-interpolated visualizations for Quick, Merge, Bubble, Heap sort and Dijkstra / A* pathfinding with live speed sliders.',
      result:
        'Created a responsive interactive CS lab used for hands-on algorithm analysis and complexity comparison.',
      detailedOverview:
        'An educational computer science tool built to visualize how classic sorting and pathfinding algorithms operate in real time, complete with speed controls and comparison tracking.',
      techStack: ['React', 'TypeScript', 'Canvas API', 'Algorithms'],
      status: 'Completed',
      githubUrl: 'https://github.com/rakeshbutnotrakesh',
      liveUrl: 'https://algovision-sand.vercel.app/',
      highlights: [
        'Animated sorting algorithms (Quick, Merge, Bubble, Heap)',
        'Interactive grid pathfinding (Dijkstra, A* Search)',
        'Live comparison & step telemetry controls',
      ],
      coverImage: imgCanvas,
    },
    {
      id: 'n8n-automation-workflows',
      name: 'n8n Automation Workflows',
      category: 'Automation & Backend',
      featured: true,
      description:
        'Self-hosted Docker + n8n automation pipelines connecting webhooks, scheduled triggers, and JSON transformations.',
      problem:
        'Repetitive webhook normalization, alert routing, and scheduled data checks consume valuable engineering time when done manually.',
      solution:
        'Containerized n8n instances via Docker Compose and authored modular JavaScript transformation nodes for reliable event-driven flows.',
      result:
        'Built reproducible, self-hosted automation blueprints that eliminate manual payload processing without SaaS lock-in.',
      detailedOverview:
        'A self-hosted collection of n8n workflows running inside Docker containers to automate repetitive tasks, transform webhook payloads, and test automated notification pipelines.',
      techStack: ['n8n', 'Docker', 'JavaScript', 'Webhooks'],
      status: 'In Development',
      githubUrl: 'https://github.com/rakeshbutnotrakesh',
      demoNote: 'Self-hosted locally via Docker — no public web demo is hosted.',
      highlights: [
        'Containerized Docker + n8n runtime setup',
        'Custom JS payload parsers & webhook listeners',
        'Scheduled alert & synchronization pipelines',
      ],
      coverImage: imgSpatial,
    },
    {
      id: 'lifeos',
      name: 'LifeOS',
      category: 'Productivity & Utilities',
      featured: false,
      description:
        'Unified personal workspace organizing tasks, study plans, habit streaks, expenses, and milestone tracking.',
      problem:
        'Students and builders juggle scattered notes, timers, and spreadsheets across disconnected apps.',
      solution:
        'Consolidated daily planning, study schedules, and habit streaks into a single local-first React workspace.',
      result:
        'Instant zero-latency state updates saved cleanly in browser LocalStorage.',
      detailedOverview:
        'An integrated personal workspace consolidating daily task lists, study revision planning, habit streaks, and goal milestones inside a clean local-first interface.',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'LocalStorage'],
      status: 'Completed',
      githubUrl: 'https://github.com/rakeshbutnotrakesh',
      liveUrl: 'https://lifeos-puce-theta.vercel.app/',
      highlights: [
        'Unified task, study & habit tracker',
        'Instant LocalStorage state persistence',
        'Clean keyboard-friendly dashboard layout',
      ],
      coverImage: imgSpatial,
    },
    {
      id: 'vault',
      name: 'Vault',
      category: 'Cybersecurity',
      featured: false,
      description:
        'Privacy-first digital vault for AES-GCM client-side encrypted notes and developer snippets.',
      problem:
        'Cloud note tools store plain or server-decrypted snippets, risking exposure of sensitive keys and notes.',
      solution:
        'Used AES-GCM encryption through the browser Web Crypto API so secrets never leave the device unencrypted.',
      result:
        'Delivered a lightweight encrypted storage app with zero external analytics or third-party servers.',
      detailedOverview:
        'A client-side cryptographic storage app designed to encrypt private notes and credentials right inside the browser using the Web Crypto API without external telemetry.',
      techStack: ['React', 'TypeScript', 'Web Crypto API', 'Tailwind CSS'],
      status: 'Completed',
      githubUrl: 'https://github.com/rakeshbutnotrakesh',
      liveUrl: 'https://vault-ruby-theta.vercel.app/',
      highlights: [
        'Browser-native AES-GCM symmetric encryption',
        'Structured developer snippet organization',
        'Zero external network telemetry',
      ],
      coverImage: imgFintech,
    },
    {
      id: 'civicdesk',
      name: 'CivicDesk',
      category: 'Community & Web Apps',
      featured: false,
      description:
        'Structured community issue tracker allowing residents to log, prioritize, and monitor neighborhood repairs.',
      problem:
        'Local infrastructure complaints get buried in unorganized chat threads without clear priority or resolution history.',
      solution:
        'Built a category-driven issue logger with priority filters and status progression persisted locally.',
      result:
        'Live responsive web app enabling clear issue prioritization on both mobile and desktop screens.',
      detailedOverview:
        'A civic issue logger enabling residents to record local infrastructure concerns (such as streetlights, road damage, or sanitation issues) with priority levels, category filters, and local persistence.',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'LocalStorage'],
      status: 'Completed',
      githubUrl: 'https://github.com/rakeshbutnotrakesh',
      liveUrl: 'https://civicdesk-gamma.vercel.app/',
      highlights: [
        'Priority tagging & category filtering',
        'Offline-resilient LocalStorage persistence',
        'Clean mobile-first reporting flow',
      ],
      coverImage: imgCanvas,
    },
  ] as ProjectConfigItem[],

  certificationsAndAchievements: [
    {
      id: 'deployed-apps',
      metric: '7 Live',
      title: 'Production Vercel Web Applications',
      issuer: 'Vercel · Independent Engineering',
      year: '2025 – 2026',
      description:
        'Designed, engineered, and shipped seven responsive React & TypeScript applications covering cybersecurity, client-side file utilities, DSA visualization, and productivity.',
      badge: 'Shipping Proof',
    },
    {
      id: 'automation-lab',
      metric: 'n8n + Docker',
      title: 'Self-Hosted Workflow Automation Architecture',
      issuer: 'Dockerized Local Infrastructure',
      year: '2025 – 2026',
      description:
        'Built automated webhook orchestration and data-transformation pipelines using n8n inside Docker containers to eliminate repetitive manual operations.',
      badge: 'Automation',
    },
  ] as CertificationOrAchievement[],
};
