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
  title: "BCA Student | Aspiring Software Developer | Automation Enthusiast",
  tagline: "Building Ideas Into Digital Reality.",
  alternativeHero: "Curious Mind. Creative Logic. Practical Solutions.",
  shortIntro:
    "I'm Rakesh Kumar Mondal, a BCA student passionate about programming, software development, web technologies, cybersecurity and automation. I enjoy exploring new technologies, building practical digital solutions and turning ideas into functional projects.",
  aboutText: [
    "I'm a Bachelor of Computer Applications student with a strong interest in software development and modern technologies.",
    "My journey revolves around learning programming languages, exploring web technologies, experimenting with automation tools and building practical applications.",
    "I believe that technology becomes meaningful when it solves real-world problems. My goal is to continuously improve my technical abilities and develop useful, reliable and well-designed digital products."
  ],
  academic: {
    degree: "Bachelor of Computer Applications (BCA)",
    focus: "Programming, Software Engineering & Computer Applications"
  },
  roles: [
    "BCA Student",
    "Software Developer",
    "Python Programmer",
    "Web Developer",
    "Automation Enthusiast",
    "Cybersecurity Learner"
  ],
  interests: [
    "Software Development",
    "Full-Stack Web Development",
    "Python Programming",
    "Cybersecurity",
    "Workflow Automation",
    "Artificial Intelligence",
    "Problem Solving",
    "Data Structures and Algorithms"
  ],
  contact: {
    github: "https://github.com/rakeshbutnotrakesh",
    portfolioUrl: "https://rakesh-kumar-mondal.vercel.app",
    email: "rakeshkumarmondal51@gmail.com",
    location: "India"
  }
};
