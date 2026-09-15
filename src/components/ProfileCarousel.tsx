import { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Artist } from '../types';
import { useTranslation } from '../i18n';
import ArtistInfoModal from './ArtistInfoModal';
import '../styles/artist-modal.css';

interface ProfileCarouselProps {
  artists: Artist[];
  onActiveChange?: (index: number) => void;
}

/**
 * ProfileCarousel — Interactive horizontal carousel with focus effect.
 * Active card is wide with gradient background and color photo.
 * Inactive cards are narrow grayscale strips with pill-corners.
 */
export default function ProfileCarousel({ artists, onActiveChange }: ProfileCarouselProps) {
  const { t } = useTranslation();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [infoArtist, setInfoArtist] = useState<Artist | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (infoArtist) window.dispatchEvent(new Event('artist-modal-open'));
    else window.dispatchEvent(new Event('artist-modal-close'));
  }, [infoArtist]);

  const handleCardClick = useCallback((index: number) => {
    if (index === activeIdx || isTransitioning) return;
    setIsTransitioning(true);
    setActiveIdx(index);
    onActiveChange?.(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [activeIdx, isTransitioning, onActiveChange]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActiveIdx(prev => {
          const newIdx = prev > 0 ? prev - 1 : artists.length - 1;
          onActiveChange?.(newIdx);
          return newIdx;
        });
      } else if (e.key === 'ArrowRight') {
        setActiveIdx(prev => {
          const newIdx = prev < artists.length - 1 ? prev + 1 : 0;
          onActiveChange?.(newIdx);
          return newIdx;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [artists.length, onActiveChange]);

  // Touch/swipe support
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) {
        // Swipe left → next
        setActiveIdx(prev => {
          const newIdx = prev < artists.length - 1 ? prev + 1 : 0;
          onActiveChange?.(newIdx);
          return newIdx;
        });
      } else {
        // Swipe right → prev
        setActiveIdx(prev => {
          const newIdx = prev > 0 ? prev - 1 : artists.length - 1;
          onActiveChange?.(newIdx);
          return newIdx;
        });
      }
    }
  };

  return (
    <div className="profile-carousel" ref={containerRef}>
      {/* ── Prev / Next Buttons ── */}
      <button
        className="profile-carousel__nav-btn profile-carousel__nav-btn--prev"
        onClick={() => {
          setActiveIdx(prev => {
            const newIdx = prev > 0 ? prev - 1 : artists.length - 1;
            onActiveChange?.(newIdx);
            return newIdx;
          });
        }}
        aria-label={t('artists_prev')}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <button
        className="profile-carousel__nav-btn profile-carousel__nav-btn--next"
        onClick={() => {
          setActiveIdx(prev => {
            const newIdx = prev < artists.length - 1 ? prev + 1 : 0;
            onActiveChange?.(newIdx);
            return newIdx;
          });
        }}
        aria-label={t('artists_next')}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      {/* ── Cards Container ── */}
      <div 
        className="profile-carousel__cards"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {artists.map((artist, index) => {
          const isActive = index === activeIdx;
          const distance = Math.abs(index - activeIdx);
          const isLeft = index < activeIdx;
          
          return (
            <div
              key={artist.id}
              className={`profile-card ${isActive ? 'profile-card--active' : ''} ${isLeft ? 'profile-card--left' : 'profile-card--right'}`}
              style={{
                '--distance': distance,
                '--index': index,
              } as React.CSSProperties}
              onClick={() => handleCardClick(index)}
              role="button"
              tabIndex={0}
              aria-label={`${artist.nom} — ${artist.discipline}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(index);
                }
              }}
            >
              {/* Portrait Image */}
              <div className="profile-card__image-wrap">
                <img
                  src={artist.portrait}
                  alt={artist.nom}
                  className="profile-card__image"
                  loading="lazy"
                />
                <div className="profile-card__overlay" />
              </div>

              {/* Info Overlay — visible only when active */}
              <div className="profile-card__info">
                <h3 className="profile-card__name">{artist.nom}</h3>
                <span className="profile-card__ville">{artist.ville}</span>
              </div>

              {/* Bottom Bar — Buttons spread left/right */}
              <div className="profile-card__bottom">
                <button
                  type="button"
                  className="profile-card__info-btn"
                  onClick={(e) => { e.stopPropagation(); setInfoArtist(artist); }}
                >
                  <svg className="profile-card__info-btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4"/>
                    <path d="M12 8h.01"/>
                  </svg>
                  <span className="profile-card__info-btn-text">{t('artists_infos')}</span>
                </button>
                <Link
                  to={`/artistes/${artist.slug}`}
                  className="profile-card__gallery-btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="profile-card__gallery-btn-text">{t('artists_gallery')}</span>
                  <svg className="profile-card__gallery-btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"/>
                    <path d="m12 5 7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Navigation Dots ── */}
      <div className="profile-carousel__dots">
        {artists.map((_, index) => (
          <button
            key={index}
            className={`profile-carousel__dot ${index === activeIdx ? 'profile-carousel__dot--active' : ''}`}
            onClick={() => {
              setActiveIdx(index);
              onActiveChange?.(index);
            }}
            aria-label={`${t('artists_goto')} ${index + 1}`}
          />
        ))}
      </div>

      <ArtistInfoModal artist={infoArtist} onClose={() => setInfoArtist(null)} />
    </div>
  );
}
