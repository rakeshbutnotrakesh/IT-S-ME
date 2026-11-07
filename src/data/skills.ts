export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    icon?: string;
  }[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    description: "Core foundational languages mastered through computer applications coursework and problem-solving practice.",
    skills: [
      { name: "C" },
      { name: "C++" },
      { name: "Python" },
      { name: "Java" }
    ]
  },
  {
    title: "Web Development",
    description: "Modern client-side engineering stack for crafting clean, responsive, and interactive digital interfaces.",
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
    title: "Tools & Technologies",
    description: "Developer tooling, containerization, workflow orchestrators, and hosting platforms used in daily workflow.",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
      { name: "Docker" },
      { name: "n8n" },
      { name: "Google AI Studio" },
      { name: "Vercel" }
    ]
  },
  {
    title: "Technical Interests",
    description: "Active domains of ongoing study, algorithmic thinking, and self-directed project development.",
    skills: [
      { name: "Data Structures and Algorithms" },
      { name: "Cybersecurity" },
      { name: "Workflow Automation" },
      { name: "Artificial Intelligence" },
      { name: "API Integration" },
      { name: "Software Architecture" }
    ]
  }
];
