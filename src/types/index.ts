export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  description: string;
  role: string;
  tools: string[];
  coverImage: string;
  gallery?: string[];
  videoUrl?: string;
  liveUrl?: string;
  sourceUrl?: string;
  featured: boolean;
  outcomes?: string[];
  metrics?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year: string;
  details?: string;
}

export interface MetricItem {
  label: string;
  value: string;
  detail?: string;
}

export interface SiteConfig {
  referenceWebsite: string;
  websiteUrl: string;

  identity: {
    fullName: string;
    displayName: string;
    profession: string;
    roleLine2: string;
    location: string;
    availability: string;
    headline: string;
    intro: string;
    about: string;
    portrait: string;
    resume: string;
    favicon: string;
  };

  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    instagram: string;
    youtube: string;
    linkedin: string;
    github: string;
    behance: string;
    dribbble: string;
    otherLinks: { label: string; url: string }[];
  };

  portfolio: {
    projects: Project[];
    featuredProjectIds: string[];
    categories: string[];
    skills: { name: string; category: string }[];
    tools: string[];
    experience: ExperienceItem[];
    education: EducationItem[];
    metrics: MetricItem[];
  };

  appearance: {
    style: string;
    theme: 'dark' | 'light';
    background: string;
    text: string;
    accent: string;
    muted: string;
    displayFont: string;
    bodyFont: string;
    accentFont: string;
    animationIntensity: 'subtle' | 'balanced' | 'expressive';
    language: string;
  };

  preferences: {
    showEducation: boolean;
    showExperience: boolean;
    showAwards: boolean;
    showClientLogos: boolean;
    showTestimonials: boolean;
    showBeforeAfter: boolean;
    showContactForm: boolean;
    showDownloadResume: boolean;
    showProjectArchive: boolean;
  };
}
