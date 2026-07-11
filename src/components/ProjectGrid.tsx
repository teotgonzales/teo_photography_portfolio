import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '../data/projects';
import { assetPath } from '../utils/assetPath';
import { ProjectCard } from './ProjectCard';

type ProjectGridProps = {
  projects: Project[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [previousProject, setPreviousProject] = useState<Project | null>(null);
  const transitionTimeoutRef = useRef<number | null>(null);
  const activeProject = activeIndex === null ? null : projects[activeIndex];
  const activeImage = activeProject?.images[0];
  const previousImage = previousProject?.images[0];
  const activeDisplayIndex = activeIndex === null ? 0 : activeIndex + 1;

  const clearTransitionTimeout = () => {
    if (transitionTimeoutRef.current !== null) {
      window.clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
  };

  const openProject = (nextIndex: number) => {
    if (activeIndex !== null && projects[activeIndex]) {
      setPreviousProject(projects[activeIndex]);
      clearTransitionTimeout();
      transitionTimeoutRef.current = window.setTimeout(() => {
        setPreviousProject(null);
        transitionTimeoutRef.current = null;
      }, 320);
    } else {
      setPreviousProject(null);
    }

    setActiveIndex(nextIndex);
  };

  const closeLightbox = () => {
    clearTransitionTimeout();
    setPreviousProject(null);
    setActiveIndex(null);
  };

  const showPrevious = () => {
    if (activeIndex === null) {
      return;
    }

    openProject((activeIndex - 1 + projects.length) % projects.length);
  };

  const showNext = () => {
    if (activeIndex === null) {
      return;
    }

    openProject((activeIndex + 1) % projects.length);
  };

  useEffect(() => {
    if (activeIndex === null) {
      return undefined;
    }

    document.body.classList.add('lightbox-open');

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }

      if (event.key === 'ArrowLeft') {
        showPrevious();
      }

      if (event.key === 'ArrowRight') {
        showNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('lightbox-open');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, projects.length]);

  useEffect(() => {
    if (activeIndex === null || projects.length < 2) {
      return;
    }

    const adjacentIndexes = [
      (activeIndex - 1 + projects.length) % projects.length,
      (activeIndex + 1) % projects.length,
    ];

    adjacentIndexes.forEach((index) => {
      const project = projects[index];
      const imageSrc = project.images[0]?.src ?? project.coverImage;
      const image = new Image();
      image.src = assetPath(imageSrc);
    });
  }, [activeIndex, projects]);

  return (
    <>
      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} onOpen={() => openProject(index)} />
        ))}
      </div>
      {activeProject
        ? createPortal(
        <div className="grid-lightbox" role="dialog" aria-modal="true" aria-label="Image preview">
          <button
            className="grid-lightbox-backdrop"
            type="button"
            aria-label="Close image preview"
            onClick={closeLightbox}
          />
          <button className="grid-lightbox-close" type="button" aria-label="Close image preview" onClick={closeLightbox}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
          {projects.length > 1 ? (
            <button className="grid-lightbox-arrow previous" type="button" aria-label="Previous image" onClick={showPrevious}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
          ) : null}
          <figure className="grid-lightbox-content">
            <div className="grid-lightbox-image-stage">
              {previousProject ? (
                <img
                  className="previous-image"
                  src={assetPath(previousImage?.src ?? previousProject.coverImage)}
                  alt={previousImage?.alt ?? previousProject.coverAlt}
                  decoding="async"
                />
              ) : null}
              <img
                key={activeProject.id}
                className="current-image"
                src={assetPath(activeImage?.src ?? activeProject.coverImage)}
                alt={activeImage?.alt ?? activeProject.coverAlt}
                decoding="async"
              />
            </div>
            <figcaption>
              <span>{activeProject.title}</span>
              <span>
                {activeDisplayIndex} / {projects.length}
              </span>
            </figcaption>
          </figure>
          {projects.length > 1 ? (
            <button className="grid-lightbox-arrow next" type="button" aria-label="Next image" onClick={showNext}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          ) : null}
        </div>,
          document.body,
        )
        : null}
    </>
  );
}
