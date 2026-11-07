export interface AchievementItem {
  id: string;
  metric: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
}

export const achievementsData: AchievementItem[] = [
  {
    id: "academic-foundation",
    metric: "BCA",
    title: "Computer Applications Studies",
    subtitle: "Core Academic Foundation",
    description: "Dedicated study in Bachelor of Computer Applications coursework, emphasizing computer science fundamentals, discrete mathematics, and programming discipline.",
    badge: "Verified Academic Study"
  },
  {
    id: "portfolio-deployment",
    metric: "100%",
    title: "Personal Portfolio Deployed on Vercel",
    subtitle: "Production Live Release",
    description: "Designed, engineered, and continuously deployed this modern, responsive developer portfolio with custom TypeScript architecture and interactive components to Vercel.",
    badge: "Live Deployment"
  },
  {
    id: "github-workflow",
    metric: "Git/GH",
    title: "GitHub-Based Development Workflow",
    subtitle: "Version Controlled Repositories",
    description: "Active development workflow utilizing git version control, semantic branching, atomic commit discipline, and open repository management on GitHub (@rakeshbutnotrakesh).",
    badge: "Developer Tooling"
  },
  {
    id: "automation-exploration",
    metric: "n8n",
    title: "Hands-on Automation Tooling",
    subtitle: "Docker & n8n Experiments",
    description: "Successfully configured self-hosted n8n workflows and Docker containers to explore event-driven automation, webhooks, and programmatic task scheduling.",
    badge: "Automation Practice"
  },
  {
    id: "continuous-practice",
    metric: "DSA",
    title: "Continuous Programming Practice",
    subtitle: "Problem Solving & Core Logic",
    description: "Regularly practicing data structures, algorithms, and logic challenges across C, C++, and Python to reinforce computational thinking and code optimization.",
    badge: "Ongoing Dedication"
  }
];
