export type ProjectStatus = 'Live' | 'In Development' | 'Experimental' | 'Planned';

export interface ProjectConfigItem {
  id: string;
  indexNumber: string;
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
  previewType: 'portfolio' | 'fileforge' | 'civicdesk' | 'lifeos' | 'cybersafe' | 'n8n';
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
 * CENTRAL PORTFOLIO CONFIGURATION — EDIT HERE TO UPDATE PROFILE & LINKS
 * ============================================================================
 * Editable fields for email, LinkedIn, Formspree endpoint, and resume PDF.
 */
export const portfolioConfig = {
  meta: {
    siteTitle: 'Rakesh Kumar Mondal | Software Developer Portfolio',
    siteDescription:
      'Portfolio of Rakesh Kumar Mondal, a BCA student building practical web applications, browser security utilities, and workflow automation systems.',
    canonicalUrl: 'https://portfolio-two-puce-hj49ocwerj.vercel.app/',
    lastUpdated: '2026',
  },

  profile: {
    name: 'Rakesh Kumar Mondal',
    shortName: 'Rakesh Mondal',
    firstName: 'Rakesh',
    initials: 'RKM',
    heroKicker: "HELLO, I'M RAKESH",
    heroHeadlinePrefix: 'Building thoughtful digital experiences through',
    heroHeadlineAccent: 'code',
    heroHeadlineSuffix: '.',
    heroDescription:
      "I'm Rakesh Kumar Mondal, a BCA student passionate about software development, web technologies and automation. I enjoy transforming ideas into practical digital solutions.",
    roleLine: 'BCA Student · Developer · Automation Enthusiast',
    title: 'BCA Student · Developer · Automation Enthusiast',
    avatarUrl: '/assets/aistudio/photo_84d49c99.jpeg',
    avatarPlaceholderLabel: 'Profile photo placeholder',
    heroTechLabels: ['C / C++', 'Python', 'React', 'TypeScript', 'Docker', 'n8n'],
    aboutParagraphs: [
      "I'm a Bachelor of Computer Applications student interested in building software, exploring modern technologies and solving practical problems.",
      'My learning journey includes programming, web development, automation and experimenting with different tools to understand how technology works.',
      'I enjoy learning by building projects, testing ideas and continuously improving my technical abilities.',
      'My goal is to grow as a developer and create useful digital products that solve real-world problems.',
    ],
    interests: [
      'Cybersecurity',
      'Workflow Automation',
      'Artificial Intelligence',
      'Data Structures and Algorithms',
    ],
    rotatingRoles: [
      'Software Development',
      'Web Technologies',
      'Workflow Automation',
    ],
  },

  education: {
    degree: 'Bachelor of Computer Applications',
    college: 'Swami Vivekananda University',
    expectedGraduation: '2029',
    academicAchievement: 'SGPA 9.65',
    focus: 'Software Development & Automation',
    location: 'West Bengal, India',
  },

  contact: {
    // Editable email & LinkedIn profile configuration
    email: 'rakeshkumarmondal51@gmail.com',
    githubUsername: 'rakeshbutnotrakesh',
    githubUrl: 'https://github.com/rakeshbutnotrakesh',
    linkedinUrl: 'https://www.linkedin.com/in/rakesh-kumar-mondal-0a46b236b/',
    portfolioUrl: 'https://portfolio-two-puce-hj49ocwerj.vercel.app/',
    // Optional Formspree endpoint (leave placeholder if no backend email service is connected)
    formspreeEndpoint: '[YOUR_FORMSPREE_ENDPOINT]',
    // Static PDF path checked dynamically before showing "Download Resume" in Hero
    resumePdfPath: '/resume.pdf',
  },

  github: {
    pinnedRepos: ['CyberSafe', 'LifeOS', 'FileForge', 'CivicDesk'],
    maxReposToShow: 6,
  },

  featuredProjects: [
    {
      id: 'personal-portfolio',
      indexNumber: '01',
      name: 'Personal Developer Portfolio',
      category: 'Web Application',
      description:
        'A personal website showcasing my development journey, technical interests and projects.',
      detailedOverview:
        'A minimalist editorial portfolio built with React, TypeScript, and Tailwind CSS, featuring clean typography, light/dark theme persistence, interactive project modals, and static HTML prerendering for search engines.',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      status: 'Live',
      liveUrl: 'https://portfolio-two-puce-hj49ocwerj.vercel.app/',
      highlights: [
        'Swiss-inspired editorial typography and responsive grid layout',
        'Persistent light and dark color scheme switching',
        'Static HTML prerendering and complete SEO metadata',
      ],
      previewType: 'portfolio',
    },
    {
      id: 'fileforge',
      indexNumber: '02',
      name: 'FileForge',
      category: 'Browser Utility',
      description:
        'An all-in-one file conversion and passport photo processing application.',
      detailedOverview:
        'A client-side utility focused on formatting images, resizing dimensions, and preparing passport-ready photos directly inside the browser using Canvas and modern Web APIs.',
      techStack: ['React', 'TypeScript', 'Canvas API', 'Vite'],
      status: 'In Development',
      liveUrl: 'https://fileforge-jet.vercel.app/',
      highlights: [
        'Browser-local image resizing and cropping without external uploads',
        'Passport-size aspect ratio presets and print formatting helpers',
        'Clean modular workspace built with TypeScript',
      ],
      previewType: 'fileforge',
    },
    {
      id: 'civicdesk',
      indexNumber: '03',
      name: 'CivicDesk',
      category: 'Civic Web App',
      description:
        'A local community issue management platform for reporting and tracking neighbourhood problems.',
      detailedOverview:
        'A civic reporting application structured to help residents log neighborhood issues, assign categories and priority levels, and follow resolution states in one organized interface.',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'LocalStorage'],
      status: 'In Development',
      liveUrl: 'https://civicdesk-gamma.vercel.app/',
      highlights: [
        'Category filtering and issue priority classification',
        'Structured status tracking for neighborhood maintenance',
        'Responsive interface across mobile and desktop screens',
      ],
      previewType: 'civicdesk',
    },
    {
      id: 'lifeos',
      indexNumber: '04',
      name: 'LifeOS',
      category: 'Productivity',
      description:
        'A personal productivity platform for managing tasks, studies, habits and finances.',
      detailedOverview:
        'A unified daily organizer designed to track study plans, daily tasks, habit streaks, and personal expense records within a single local-first workspace.',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'LocalStorage'],
      status: 'In Development',
      liveUrl: 'https://lifeos-puce-theta.vercel.app/',
      highlights: [
        'Consolidated task management, study planning, and habit tracking',
        'Personal expense logging and milestone overview',
        'Fast local persistence in browser storage',
      ],
      previewType: 'lifeos',
    },
    {
      id: 'cybersafe',
      indexNumber: '05',
      name: 'CyberSafe',
      category: 'Security Utility',
      description:
        'A browser-based cybersecurity toolkit featuring password analysis, URL analysis and file hashing.',
      detailedOverview:
        'An educational security toolkit utilizing the native browser Web Crypto API for local SHA-256 checksum computation, password entropy evaluation, and structured URL pattern inspection.',
      techStack: ['React', 'TypeScript', 'Web Crypto API', 'Tailwind CSS'],
      status: 'In Development',
      liveUrl: 'https://cybersafe-eosin-five.vercel.app/',
      highlights: [
        'Client-side SHA-256 file checksum calculation',
        'Real-time password strength and entropy feedback',
        'URL component breakdown and inspection tools',
      ],
      previewType: 'cybersafe',
    },
    {
      id: 'n8n-automation-workflows',
      indexNumber: '06',
      name: 'n8n Automation Workflows',
      category: 'Workflow Automation',
      description:
        'Practical workflow automation experiments using n8n, Docker and related technologies.',
      detailedOverview:
        'Self-hosted Docker Compose experiments running n8n automation nodes to connect webhooks, parse JSON payloads, and automate routine digital workflows locally.',
      techStack: ['n8n', 'Docker', 'JavaScript', 'Webhooks'],
      status: 'Experimental',
      demoNote: 'Runs locally in Docker containers — no public hosted demo.',
      highlights: [
        'Self-hosted n8n runtime managed with Docker',
        'Webhook trigger handling and payload transformation nodes',
        'Automated scheduling and routine task experiments',
      ],
      previewType: 'n8n',
    },
  ] as ProjectConfigItem[],

  certificationsAndAchievements: [
    {
      id: 'academic-sgpa',
      metric: 'SGPA 9.65',
      title: 'Bachelor of Computer Applications',
      issuer: 'Swami Vivekananda University',
      year: 'Ongoing',
      description:
        'Consistent academic performance across core programming, computer science fundamentals, and web technology coursework.',
      badge: 'Academic Achievement',
    },
    {
      id: 'practical-builds',
      metric: '6 Projects',
      title: 'Web Applications & Automation Lab',
      issuer: 'Independent Learning',
      year: '2025 – 2026',
      description:
        'Hands-on software projects spanning web utilities, security tooling, community issue tracking, and n8n workflow automation.',
      badge: 'Practical Building',
    },
  ] as CertificationOrAchievement[],
};
