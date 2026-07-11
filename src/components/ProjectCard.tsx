import type { Project } from '../data/projects';
import { assetPath } from '../utils/assetPath';

type ProjectCardProps = {
  project: Project;
  onOpen: () => void;
};

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <article className="project-card">
      <button className="project-card-button" type="button" onClick={onOpen} aria-label={`Open ${project.title}`}>
        <div className="project-image-wrap">
          <img src={assetPath(project.coverImage)} alt={project.coverAlt} loading="lazy" decoding="async" />
        </div>
      </button>
    </article>
  );
}
