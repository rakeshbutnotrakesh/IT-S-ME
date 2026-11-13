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
    id: "academic-sgpa",
    metric: "9.65",
    title: "BCA Academic Performance (SGPA)",
    subtitle: "Bachelor of Computer Applications",
    description: "Achieved an SGPA of 9.65 in BCA coursework, demonstrating strong consistency across programming, core computer science, and application development subjects.",
    badge: "Academic Achievement"
  },
  {
    id: "deployed-projects",
    metric: "7 Live",
    title: "Deployed Web Applications on Vercel",
    subtitle: "Production Portfolio & Utilities",
    description: "Built and deployed seven live React and TypeScript web applications including CyberSafe, LifeOS, FileForge, CivicDesk, Vault, AlgoVision, and this portfolio.",
    badge: "Live Deployments"
  },
  {
    id: "github-workflow",
    metric: "Git/GH",
    title: "GitHub-Based Development Workflow",
    subtitle: "Version Controlled Codebases",
    description: "Maintaining structured repositories, commit history, and collaborative workflows on GitHub (@rakeshbutnotrakesh) across web and programming projects.",
    badge: "Developer Tooling"
  },
  {
    id: "automation-exploration",
    metric: "n8n",
    title: "Docker & Workflow Automation Practice",
    subtitle: "Self-Hosted n8n Experiments",
    description: "Running local n8n workflow containers with Docker to explore webhook integrations, automated data processing, and event-driven pipelines.",
    badge: "Automation Practice"
  },
  {
    id: "continuous-practice",
    metric: "DSA",
    title: "Programming & Problem Solving",
    subtitle: "C, C++, Python & Java",
    description: "Consistent practice in core programming languages, data structures, and algorithmic problem solving to build reliable software fundamentals.",
    badge: "Core Fundamentals"
  }
];
