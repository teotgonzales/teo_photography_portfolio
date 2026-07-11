import { useEffect } from 'react';
import type { ProjectImage } from '../data/projects';
import { assetPath } from '../utils/assetPath';

type LightboxProps = {
  image: ProjectImage | null;
  onClose: () => void;
};

export function Lightbox({ image, onClose }: LightboxProps) {
  useEffect(() => {
    if (!image) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [image, onClose]);

  if (!image) {
    return null;
  }

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image preview">
      <button className="lightbox-close" type="button" onClick={onClose}>
        Close
      </button>
      <button className="lightbox-backdrop" type="button" aria-label="Close preview" onClick={onClose} />
      <img src={assetPath(image.src)} alt={image.alt} decoding="async" />
    </div>
  );
}
