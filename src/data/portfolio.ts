import { portfolioConfig } from '../config/portfolioConfig';

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
    expectedGraduation: string;
    focus: string;
  };
  roles: string[];
  interests: string[];
  contact: {
    githubUsername: string;
    github: string;
    linkedin: string;
    portfolioUrl: string;
    email: string;
    location: string;
  };
}

export const personalInfo: PersonalInfo = {
  name: portfolioConfig.profile.name,
  firstName: portfolioConfig.profile.firstName,
  displayInitials: portfolioConfig.profile.initials,
  title: portfolioConfig.profile.title,
  tagline: portfolioConfig.profile.heroHeadline,
  shortIntro: portfolioConfig.profile.heroSubheadline,
  aboutText: portfolioConfig.profile.aboutParagraphs,
  academic: {
    degree: portfolioConfig.education.degree,
    college: portfolioConfig.education.college,
    expectedGraduation: portfolioConfig.education.expectedGraduation,
    focus: portfolioConfig.education.focus,
  },
  roles: portfolioConfig.profile.rotatingRoles,
  interests: portfolioConfig.profile.interests,
  contact: {
    githubUsername: portfolioConfig.contact.githubUsername,
    github: portfolioConfig.contact.githubUrl,
    linkedin: portfolioConfig.contact.linkedinUrl,
    portfolioUrl: portfolioConfig.contact.portfolioUrl,
    email: portfolioConfig.contact.email,
    location: portfolioConfig.education.location,
  },
};
