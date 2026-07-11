import { useState } from 'react';
import type { ProjectImage } from '../data/projects';
import { Lightbox } from './Lightbox';

type ProjectGalleryProps = {
  images: ProjectImage[];
};

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [activeImage, setActiveImage] = useState<ProjectImage | null>(null);

  return (
    <>
      <div className="project-gallery">
        {images.map((image) => (
          <button
            className={`gallery-item ${image.orientation}`}
            type="button"
            key={`${image.src}-${image.alt}`}
            onClick={() => setActiveImage(image)}
          >
            <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
          </button>
        ))}
      </div>
      <Lightbox image={activeImage} onClose={() => setActiveImage(null)} />
    </>
  );
}
