import { ProjectGrid } from '../components/ProjectGrid';
import { onSetProjects } from '../data/onSet';
import { portraitProjects } from '../data/portraits';
import type { Project, ProjectCategory } from '../data/projects';

type CategoryPageProps = {
  category: ProjectCategory;
  title?: string;
};

export function CategoryPage({ category }: CategoryPageProps) {
  const projectsByCategory: Partial<Record<ProjectCategory, Project[]>> = {
    'On Set': onSetProjects,
    Portraits: portraitProjects,
  };
  const categoryProjects = projectsByCategory[category] ?? [];

  return (
    <div className="page-content section-fade">
      <ProjectGrid projects={categoryProjects} />
    </div>
  );
}
