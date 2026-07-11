import { lifestyleProjects } from './lifestyle';
import { onSetProjects } from './onSet';
import { onStageProjects } from './onStage';
import { portraitProjects } from './portraits';

export type ProjectCategory = 'On Stage' | 'On Set' | 'Portraits' | 'Lifestyle';

export type ProjectImage = {
  src: string;
  alt: string;
  orientation: 'portrait' | 'landscape' | 'square';
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  client: string;
  location: string;
  coverImage: string;
  coverAlt: string;
  images: ProjectImage[];
  description: string;
};

export const categories: ProjectCategory[] = ['On Stage', 'On Set', 'Portraits', 'Lifestyle'];

export const projects: Project[] = [
  ...onStageProjects,
  ...onSetProjects,
  ...portraitProjects,
  ...lifestyleProjects,
];
