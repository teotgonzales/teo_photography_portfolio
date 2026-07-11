import { ProjectGrid } from '../components/ProjectGrid';
import { onStageProjects } from '../data/onStage';

export function Home() {
  return (
    <div className="page-content section-fade">
      <ProjectGrid projects={onStageProjects} />
    </div>
  );
}
