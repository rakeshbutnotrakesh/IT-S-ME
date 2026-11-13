export interface SkillCategory {
  title: string;
  key: 'programming' | 'web' | 'tools' | 'interests';
  description: string;
  skills: {
    name: string;
  }[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Programming',
    key: 'programming',
    description:
      'Foundational languages practiced through coursework, algorithmic thinking, and scripting.',
    skills: [
      { name: 'C' },
      { name: 'C++' },
      { name: 'Python' },
      { name: 'Java' },
    ],
  },
  {
    title: 'Web Development',
    key: 'web',
    description:
      'Modern frontend technologies for building clean, accessible, and type-safe web interfaces.',
    skills: [
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'React' },
      { name: 'Tailwind CSS' },
    ],
  },
  {
    title: 'Tools',
    key: 'tools',
    description:
      'Version control, containerization, workflow automation, and deployment tooling.',
    skills: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'Docker' },
      { name: 'n8n' },
      { name: 'VS Code' },
      { name: 'Google AI Studio' },
      { name: 'Vercel' },
    ],
  },
  {
    title: 'Interests',
    key: 'interests',
    description:
      'Technical domains explored alongside core web engineering and software studies.',
    skills: [
      { name: 'Cybersecurity' },
      { name: 'Workflow Automation' },
      { name: 'Artificial Intelligence' },
      { name: 'Data Structures and Algorithms' },
    ],
  },
];
