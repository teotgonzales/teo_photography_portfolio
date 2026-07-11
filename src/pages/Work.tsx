import { ProjectGrid } from '../components/ProjectGrid';
import { lifestyleProjects } from '../data/lifestyle';

export function Work() {
  return (
    <div className="page-content section-fade">
      <ProjectGrid projects={lifestyleProjects} />
    </div>
  );
}
