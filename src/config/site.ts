import { SiteConfig } from '../types';

export const initialSiteConfig: SiteConfig = {
  referenceWebsite: "https://touquirakhtar.com/",
  websiteUrl: "https://touquirakhtar.com/",

  identity: {
    fullName: "Touquir Akhtar",
    displayName: "TOUQUIR",
    profession: "App & Web Developer / Designer",
    roleLine2: "Crafting High-Impact Digital Experiences & Creative Code",
    location: "Global / Remote",
    availability: "AVAILABLE FOR WORK",
    headline: "CRAFTING HIGH-PERFORMANCE DIGITAL EXPERIENCES",
    intro: "Full-stack developer and digital designer building bespoke web applications, interactive motion experiences, and scalable software systems with precision.",
    about: "Specializing in the intersection of engineering rigor and editorial design. With expertise across modern web stacks, React, TypeScript, and micro-interactions, I transform ambitious visions into memorable digital products.",
    portrait: "/src/assets/images/hero_abstract_spatial_1793976472134.jpg",
    resume: "#resume",
    favicon: "",
  },

  contact: {
    email: "contact@touquirakhtar.com",
    phone: "",
    whatsapp: "",
    instagram: "https://instagram.com",
    youtube: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    behance: "https://behance.net",
    dribbble: "https://dribbble.com",
    otherLinks: [
      { label: "Twitter / X", url: "https://x.com" }
    ],
  },

  portfolio: {
    categories: ["All", "Web Applications", "Creative Engineering", "UI/UX Systems"],
    featuredProjectIds: ["aura-fintech-os", "aesthete-commerce", "flowforge-canvas", "neuro-spatial"],
    projects: [
      {
        id: "aura-fintech-os",
        title: "Aura Trading Terminal",
        category: "Web Applications",
        year: "2025",
        summary: "High-frequency algorithmic trading terminal with millisecond real-time market telemetry and custom Canvas charts.",
        description: "Architected and built a responsive, low-latency financial trading workstation designed for quantitative traders. Implemented custom WebGL order book visualization, streaming tick websocket feeds, and an ultra-minimalist dark mode layout.",
        role: "Lead Full-Stack Engineer & UI Architect",
        tools: ["React", "TypeScript", "Tailwind CSS", "WebSocket API", "Canvas2D", "Node.js"],
        coverImage: "/src/assets/images/project_fintech_os_1793976471893.jpg",
        gallery: [
          "/src/assets/images/project_fintech_os_1793976471893.jpg",
          "/src/assets/images/hero_abstract_spatial_1793976472134.jpg"
        ],
        liveUrl: "https://example.com/demo/aura",
        sourceUrl: "https://github.com/example/aura-terminal",
        featured: true,
        outcomes: [
          "Sub-16ms chart render performance on 50,000 live data points",
          "Zero layout shifts during real-time tick streaming",
          "Comprehensive keyboard shortcut system for rapid order entry"
        ],
        metrics: "50k data pts @ 60fps"
      },
      {
        id: "aesthete-commerce",
        title: "Aesthete Brutalist Flagship",
        category: "UI/UX Systems",
        year: "2025",
        summary: "Luxury editorial commerce flagship for limited edition sculptural objects and haute couture.",
        description: "Created an avant-garde digital shopping experience inspired by museum exhibitions and modern brutalist architecture. Built smooth page transitions, high-resolution media zooms, and custom cart drawer workflows.",
        role: "Design Technologist & Frontend Lead",
        tools: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Headless Commerce"],
        coverImage: "/src/assets/images/project_avant_commerce_1793976472540.jpg",
        gallery: [
          "/src/assets/images/project_avant_commerce_1793976472540.jpg"
        ],
        liveUrl: "https://example.com/demo/aesthete",
        sourceUrl: "https://github.com/example/aesthete-commerce",
        featured: true,
        outcomes: [
          "Increased session duration by 42% via curated editorial storytelling",
          "100/100 Lighthouse performance and accessibility scores",
          "Graceful fallback behavior for bandwidth-constrained connections"
        ],
        metrics: "+42% Avg Dwell Time"
      },
      {
        id: "flowforge-canvas",
        title: "FlowForge Creative Node Studio",
        category: "Creative Engineering",
        year: "2024",
        summary: "Interactive node-graph shader and logic canvas for generative digital artists and developers.",
        description: "Designed a browser-based node editor allowing engineers to wire real-time GLSL shader nodes, audio inputs, and mathematical transforms. Includes infinite pan-zoom canvas, bezier wire routing, and instant hot-reload execution.",
        role: "Creative Developer & System Architect",
        tools: ["TypeScript", "WebGL", "React 19", "Framer Motion", "AudioContext API"],
        coverImage: "/src/assets/images/project_ai_canvas_1793976473412.jpg",
        gallery: [
          "/src/assets/images/project_ai_canvas_1793976473412.jpg"
        ],
        liveUrl: "https://example.com/demo/flowforge",
        sourceUrl: "https://github.com/example/flowforge",
        featured: true,
        outcomes: [
          "Seamless manipulation of 200+ interconnected shader nodes",
          "Exportable code packages directly to WebGL and Three.js formats",
          "Featured on Awwwards and Product Hunt Top 5 Dev Tools"
        ],
        metrics: "200+ Node Capacity"
      },
      {
        id: "kura-design-system",
        title: "Kura Micro-Interaction Engine",
        category: "UI/UX Systems",
        year: "2024",
        summary: "Zero-dependency design token system and tactile micro-interaction component library.",
        description: "Engineered a production design system powering 6 disparate SaaS web applications. Features physics-based spring transitions, automated contrast validation, and dark/light token propagation.",
        role: "Principal Design Engineer",
        tools: ["TypeScript", "Tailwind CSS", "CSS Custom Properties", "Radix Primitives"],
        coverImage: "/src/assets/images/hero_abstract_spatial_1793976472134.jpg",
        liveUrl: "https://example.com/demo/kura",
        sourceUrl: "https://github.com/example/kura-system",
        featured: false,
        outcomes: [
          "Unified design language across 14 product development squads",
          "Reduced frontend component development cycle time by 35%"
        ],
        metrics: "14 Product Squads"
      }
    ],

    skills: [
      { name: "React 19 / Next.js", category: "Frontend" },
      { name: "TypeScript Architecture", category: "Frontend" },
      { name: "Tailwind CSS & Token Systems", category: "Frontend" },
      { name: "Creative Motion & Framer", category: "Frontend" },
      { name: "Node.js & Express REST/WS", category: "Backend" },
      { name: "Canvas2D & WebGL Shaders", category: "Creative Code" },
      { name: "UI/UX Design & Prototyping", category: "Design" },
      { name: "Web Performance Optimization", category: "Architecture" },
    ],

    tools: [
      "TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion",
      "Vite", "Node.js", "GraphQL", "Figma", "Docker", "Git", "WebGL"
    ],

    experience: [
      {
        id: "exp-1",
        role: "Senior Frontend Engineer & Design Technologist",
        company: "Independent / Digital Studios",
        location: "Remote",
        period: "2023 — Present",
        description: "Leading frontend architecture and creative motion for high-growth tech startups and editorial digital brands worldwide.",
        highlights: [
          "Delivered 12+ production client web apps with sub-second First Contentful Paint times",
          "Created bespoke animation systems and interactive 2D canvas simulations",
          "Spearheaded accessibility audits ensuring full WCAG 2.1 AA compliance across client projects"
        ],
        technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Next.js"]
      },
      {
        id: "exp-2",
        role: "Full-Stack Web Developer",
        company: "Vanguard Interactive",
        location: "Hybrid",
        period: "2021 — 2023",
        description: "Developed complex client-facing applications, interactive customer dashboards, and high-conversion landing pages.",
        highlights: [
          "Refactored legacy monolithic client codebases into modular TypeScript React components",
          "Engineered real-time data synchronization layers using WebSockets and optimistic UI patterns",
          "Collaborated closely with visual designers to execute micro-interactions and motion curves"
        ],
        technologies: ["React", "Node.js", "REST APIs", "Tailwind CSS", "PostgreSQL"]
      },
      {
        id: "exp-3",
        role: "UI/UX Developer & Prototyper",
        company: "Nexus Creative Lab",
        location: "Onsite",
        period: "2019 — 2021",
        description: "Built rapid interactive prototypes, design systems, and frontend web interfaces for international clients.",
        highlights: [
          "Developed reusable UI component library adopted across 8 internal web properties",
          "Implemented responsive layouts and dark-mode styling with strict typography scales"
        ],
        technologies: ["JavaScript", "HTML5/CSS3", "Figma", "React", "Sass"]
      }
    ],

    education: [
      {
        id: "edu-1",
        degree: "Bachelor of Science in Computer Science / Information Technology",
        institution: "State University of Technology",
        year: "2019",
        details: "Focus on Human-Computer Interaction, Software Engineering, and Web Systems"
      }
    ],

    metrics: [
      { label: "Years Experience", value: "6+", detail: "Full-Stack & Design" },
      { label: "Shipped Projects", value: "30+", detail: "Web, Mobile & Tools" },
      { label: "Core Web Vitals", value: "100%", detail: "Optimized Performance" },
      { label: "Client Satisfaction", value: "5.0★", detail: "Verified Feedback" }
    ]
  },

  appearance: {
    style: "cinematic minimal, premium, editorial, refined typography",
    theme: "dark",
    background: "#090909",
    text: "#f2efeb",
    accent: "#e32b3c",
    muted: "#a09c9a",
    displayFont: "Anton",
    bodyFont: "Manrope",
    accentFont: "Caveat",
    animationIntensity: "balanced",
    language: "English"
  },

  preferences: {
    showAwards: false,
    showEducation: true,
    showExperience: true,
    showBeforeAfter: false,
    showClientLogos: false,
    showTestimonials: false,
    showContactForm: true,
    showDownloadResume: true,
    showProjectArchive: true
  }
};
