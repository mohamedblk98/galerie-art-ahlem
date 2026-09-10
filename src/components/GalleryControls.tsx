import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import type { Artwork } from '../types';
import { useTranslation } from '../i18n';

interface GalleryControlsProps {
  artworks: Artwork[];
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  isAnimating: boolean;
}

export default function GalleryControls({
  artworks,
  activeIndex,
  onPrev,
  onNext,
  isAnimating,
}: GalleryControlsProps) {
  const { t } = useTranslation();
  const artwork = artworks[activeIndex];
  const cartelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!cartelRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = cartelRef.current;
    gsap.fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.62, ease: 'power3.out', overwrite: true });
  }, [activeIndex]);

  if (!artwork) return null;

  return (
    <div className="gallery-ui">
      <div className="gallery-topbar">
        <div className="gallery-logo" aria-label="Atelier Gallery">
          <img src="/logo.png" alt="Atelier Gallery" className="gallery-logo-img" />
        </div>
        <a href="/artistes" className="gallery-back">
          {t('gallery_back')}
        </a>
      </div>

      <div className="gallery-bottom">
        <div ref={cartelRef} className="gallery-cartel" aria-live="polite" aria-atomic="true" />

        <div className="gallery-nav" role="group" aria-label={t('gallery_nav_aria')}>
          <button
            className="gallery-nav__btn"
            onClick={onPrev}
            disabled={isAnimating}
            aria-label={t('gallery_prev')}
            aria-disabled={isAnimating}
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className="gallery-nav__btn"
            onClick={onNext}
            disabled={isAnimating}
            aria-label={t('gallery_next')}
            aria-disabled={isAnimating}
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
