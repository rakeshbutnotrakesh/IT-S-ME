export interface QuickQuestion {
  id: string;
  question: string;
}

export const quickQuestions: QuickQuestion[] = [
  { id: "who", question: "Who is Rakesh?" },
  { id: "tech", question: "What technologies does he use?" },
  { id: "projects", question: "Show his projects." },
  { id: "education", question: "What is his educational background?" },
  { id: "journey", question: "What is his development journey?" },
  { id: "contact", question: "How can I contact him?" },
];

export const fallbackResponse = 
  "I don't have verified information about that specific query in Rakesh's portfolio. You can ask me about his academic background (Bachelor of Computer Applications), programming languages, projects (like CyberSafe, FileForge, LifeOS, CivicDesk, Vault, AlgoVision), automation experiments (n8n, Docker), or how to contact him via email or GitHub!";
