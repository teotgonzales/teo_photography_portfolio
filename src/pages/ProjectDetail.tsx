import { Link, Navigate, useParams } from 'react-router-dom';
import { ProjectGallery } from '../components/ProjectGallery';
import { projects } from '../data/projects';

export function ProjectDetail() {
  const { slug } = useParams();
  const projectIndex = projects.findIndex((project) => project.slug === slug);

  if (projectIndex === -1) {
    return <Navigate to="/work" replace />;
  }

  const project = projects[projectIndex];
  const previousProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <article className="project-detail section-fade">
      <header className="project-hero">
        <div>
          <Link className="text-link muted" to="/lifestyle">
            Back to lifestyle
          </Link>
          {project.title ? <h1>{project.title}</h1> : null}
          <p>{project.description}</p>
        </div>
        <dl className="project-meta-list">
          <div>
            <dt>Category</dt>
            <dd>{project.category}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>Client</dt>
            <dd>{project.client}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{project.location}</dd>
          </div>
        </dl>
      </header>
      <ProjectGallery images={project.images} />
      <nav className="project-nav" aria-label="Project navigation">
        <Link to={`/work/${previousProject.slug}`}>Previous / {previousProject.title}</Link>
        <Link to={`/work/${nextProject.slug}`}>Next / {nextProject.title}</Link>
      </nav>
    </article>
  );
}
