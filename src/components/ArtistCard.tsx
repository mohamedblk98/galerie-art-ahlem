import { Link } from 'react-router-dom';
import { useRef, useCallback } from 'react';
import type { Artist } from '../types';

interface ArtistCardProps {
  artist: Artist;
  index: number;
}

/**
 * Modern carousel card — uniform size, 2 hover buttons:
 *   1) Galerie  → /artistes/:slug
 *   2) Infos    → /artistes/:slug/info
 * Parallax image, glow, chromatic aberration, discipline badge.
 */
export default function ArtistCard({ artist, index }: ArtistCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const img = imgRef.current;
    if (!card || !img) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    img.style.transform = `scale(1.06) translate(${x * -12}px, ${y * -12}px)`;
    card.style.setProperty('--glow-x', `${(x + 0.5) * 100}%`);
    card.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const img = imgRef.current;
    if (img) img.style.transform = 'scale(1) translate(0, 0)';
    if (card) {
      card.style.setProperty('--glow-x', '50%');
      card.style.setProperty('--glow-y', '50%');
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="carousel-card"
      style={{ animationDelay: `${0.1 + index * 0.08}s` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <div className="carousel-card__image-wrap">
        <img
          ref={imgRef}
          src={artist.portrait}
          alt={`${artist.nom}, artiste`}
          className="carousel-card__image"
          loading="lazy"
          draggable={false}
        />
        {/* Chromatic aberration */}
        <div className="carousel-card__chroma carousel-card__chroma--red" aria-hidden="true" />
        <div className="carousel-card__chroma carousel-card__chroma--blue" aria-hidden="true" />
        {/* Glow */}
        <div className="carousel-card__glow" aria-hidden="true" />
        {/* Discipline badge */}
        <span className="carousel-card__badge">{artist.discipline}</span>

        {/* ── Hover Overlay with 2 buttons ── */}
        <div className="carousel-card__overlay">
          <span className="carousel-card__overlay-name">{artist.nom}</span>
          <span className="carousel-card__overlay-meta">{artist.ville} &middot; {String(artist.oeuvres.length).padStart(2, '0')} oeuvres</span>

          <div className="carousel-card__buttons">
            <Link
              to={`/artistes/${artist.slug}`}
              className="carousel-card__btn carousel-card__btn--gallery"
              onClick={(e) => e.stopPropagation()}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Galerie
            </Link>
            <Link
              to={`/artistes/${artist.slug}/info`}
              className="carousel-card__btn carousel-card__btn--info"
              onClick={(e) => e.stopPropagation()}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              Infos
            </Link>
          </div>
        </div>
      </div>

      {/* Card info below image */}
      <div className="carousel-card__info">
        <span className="carousel-card__index">{String(index + 1).padStart(2, '0')}</span>
        <h2 className="carousel-card__name">{artist.nom}</h2>
      </div>
    </div>
  );
}
