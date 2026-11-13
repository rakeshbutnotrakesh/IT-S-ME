export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
  }[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    description: "Core programming languages practiced through BCA coursework, logic building, and data structures.",
    skills: [
      { name: "C" },
      { name: "C++" },
      { name: "Python" },
      { name: "Java" }
    ]
  },
  {
    title: "Frameworks & Web",
    description: "Frontend technologies used to build responsive, typed, and accessible web applications.",
    skills: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "React" },
      { name: "Tailwind CSS" }
    ]
  },
  {
    title: "Tools",
    description: "Version control, containerization, workflow automation, and deployment platforms.",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Docker" },
      { name: "n8n" },
      { name: "VS Code" },
      { name: "Google AI Studio" },
      { name: "Vercel" }
    ]
  }
];
