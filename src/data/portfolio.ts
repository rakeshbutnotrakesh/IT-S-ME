export interface PersonalInfo {
  name: string;
  firstName: string;
  displayInitials: string;
  title: string;
  tagline: string;
  alternativeHero: string;
  shortIntro: string;
  aboutText: string[];
  academic: {
    degree: string;
    sgpa: string;
    focus: string;
  };
  roles: string[];
  interests: string[];
  contact: {
    github: string;
    portfolioUrl: string;
    email: string;
    location: string;
  };
}

export const personalInfo: PersonalInfo = {
  name: "Rakesh Kumar Mondal",
  firstName: "Rakesh",
  displayInitials: "RKM",
  title: "BCA Student | Aspiring Software Developer | Web Developer | Automation Enthusiast",
  tagline: "Building Ideas Into Digital Reality.",
  alternativeHero: "Curious Mind. Creative Logic. Practical Solutions.",
  shortIntro:
    "I'm Rakesh Kumar Mondal, a BCA student (SGPA 9.65) passionate about programming, software development, web development, Python, cybersecurity, workflow automation, and artificial intelligence. I build practical digital solutions that turn ideas into functional software.",
  aboutText: [
    "I'm a Bachelor of Computer Applications (BCA) student with an SGPA of 9.65 and a strong interest in programming, software development, and modern web technologies.",
    "My learning revolves around core languages like C, C++, Python, and Java, building responsive TypeScript and React applications, experimenting with Docker and n8n workflow automation, and studying cybersecurity fundamentals.",
    "I believe technology becomes meaningful when it solves everyday problems cleanly and reliably. My goal is to keep strengthening my computer science foundation while shipping well-designed, practical software."
  ],
  academic: {
    degree: "Bachelor of Computer Applications (BCA)",
    sgpa: "9.65",
    focus: "Programming, Software Development, Web Engineering & Workflow Automation"
  },
  roles: [
    "BCA Student",
    "Aspiring Software Developer",
    "Web Developer",
    "Automation Enthusiast"
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
    portfolioUrl: "https://portfolio-two-puce-hj49ocwerj.vercel.app/",
    email: "rakeshkumarmondal51@gmail.com",
    location: "India"
  }
};
