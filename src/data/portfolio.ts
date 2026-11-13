export interface PersonalInfo {
  name: string;
  firstName: string;
  displayInitials: string;
  title: string;
  tagline: string;
  shortIntro: string;
  aboutText: string[];
  academic: {
    degree: string;
    college: string;
    sgpa: string;
    focus: string;
  };
  roles: string[];
  interests: string[];
  contact: {
    github: string;
    linkedin: string;
    portfolioUrl: string;
    email: string;
    location: string;
  };
}

export const personalInfo: PersonalInfo = {
  name: "Rakesh Kumar Mondal",
  firstName: "Rakesh",
  displayInitials: "RKM",
  title: "Software Developer · Web Applications & Workflow Automation",
  tagline: "Shipping Practical Web Software & Workflow Automation.",
  shortIntro:
    "I build web applications, client-side utilities, and workflow automation tools with Python, React, TypeScript, Docker, and n8n—backed by a BCA degree (9.65 SGPA).",
  aboutText: [
    "I'm Rakesh Kumar Mondal, a software developer building full-featured web applications, browser-local utilities, and automated workflows with Python, React, TypeScript, Docker, and n8n.",
    "Across seven deployed web applications, I focus on practical engineering—combining Web Crypto security tooling, Canvas-based data structure visualizations, and clean responsive interfaces with core C, C++, Python, and Java fundamentals.",
    "My academic background in Bachelor of Computer Applications (BCA, 9.65 SGPA) supports my daily hands-on work in software architecture, cybersecurity tooling, and workflow automation."
  ],
  academic: {
    degree: "Bachelor of Computer Applications (BCA)",
    college: "[YOUR_COLLEGE_NAME]",
    sgpa: "9.65",
    focus: "Programming, Software Development, Web Engineering & Workflow Automation"
  },
  roles: [
    "Software Developer",
    "Web Developer",
    "Python & TypeScript Builder",
    "Workflow Automation Developer"
  ],
  interests: [
    "Programming",
    "Software Development",
    "Web Development",
    "Python",
    "Cybersecurity",
    "Workflow Automation",
    "Artificial Intelligence"
  ],
  contact: {
    github: "https://github.com/rakeshbutnotrakesh",
    linkedin: "[YOUR_LINKEDIN_URL]",
    portfolioUrl: "https://portfolio-two-puce-hj49ocwerj.vercel.app/",
    email: "rakeshkumarmondal51@gmail.com",
    location: "India"
  }
};
