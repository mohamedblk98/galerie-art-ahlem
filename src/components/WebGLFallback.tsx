import type { Artwork } from '../types';
import { useTranslation } from '../i18n';

interface WebGLFallbackProps {
  artwork: Artwork;
  onPrev: () => void;
  onNext: () => void;
  isAnimating?: boolean;
}

export default function WebGLFallback({ artwork, onPrev, onNext, isAnimating = false }: WebGLFallbackProps) {
  const { t } = useTranslation();
  if (!artwork) return null;
  return (
    <div className="webgl-fallback">
      <img src={artwork.image} alt={artwork.title} className="webgl-fallback__image" loading="eager" decoding="async" />
      <div className="webgl-fallback__info">
        <h2 className="webgl-fallback__title">{artwork.title}</h2>
        <p className="webgl-fallback__medium">{artwork.medium}</p>
        <p className="webgl-fallback__dimensions">{artwork.dimensions}</p>
      </div>
      <div className="webgl-fallback__nav" role="group" aria-label={t('gallery_nav_aria')}>
        <button className="webgl-fallback__btn" onClick={onPrev} disabled={isAnimating} aria-label={t('gallery_prev')} type="button">
          {t('fallback_prev')}
        </button>
        <button className="webgl-fallback__btn" onClick={onNext} disabled={isAnimating} aria-label={t('gallery_next')} type="button">
          {t('fallback_next')}
        </button>
      </div>
    </div>
  );
}
