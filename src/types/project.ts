export type ProjectCategory = 'Development' | 'Analysis' | 'Research' | 'Web';
export type ProjectStatus = 'Completed' | 'In Progress' | 'In Closed Beta' | 'Archived';

export interface ProjectLinks {
  live?: string;
  github?: string;
  demo?: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  period: string;
  description: string;
  techStack: string[];
  image?: string;
  video?: string;
  logo?: string;
  links?: ProjectLinks;
  featured: boolean;
  status: ProjectStatus;
}

export interface ProjectsData {
  projects: Project[];
}
