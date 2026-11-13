import { portfolioConfig, ProjectConfigItem, ProjectStatus } from '../config/portfolioConfig';

export type { ProjectStatus };
export type ProjectItem = ProjectConfigItem;

export const projectsData: ProjectItem[] = portfolioConfig.featuredProjects;
