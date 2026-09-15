import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Artist } from '../types';
import { useTranslation } from '../i18n';

interface Props {
  artist: Artist | null;
  onClose: () => void;
}

export default function ArtistInfoModal({ artist, onClose }: Props) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!artist) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [artist, onClose]);

  if (!artist) return null;

  return (
    <div className="artist-modal" onClick={onClose} role="dialog" aria-modal="true">
      <div className="artist-modal__content" onClick={e => e.stopPropagation()}>
        <button className="artist-modal__close" onClick={onClose} aria-label="Fermer">×</button>
        <div className="artist-modal__image">
          <img src={artist.portrait} alt={artist.nom} />
        </div>
        <div className="artist-modal__body">
          <span className="artist-modal__discipline">{artist.discipline}</span>
          <h2 className="artist-modal__name">{artist.nom}</h2>
          <span className="artist-modal__ville">{artist.ville}</span>
          <div className="artist-modal__divider" />
          <p className="artist-modal__bio">{artist.biographie}</p>
          <div className="artist-modal__stats">
            <div className="artist-modal__stat">
              <span className="artist-modal__stat-number">{String(artist.oeuvres.length).padStart(2, '0')}</span>
              <span className="artist-modal__stat-label">{t('artist_works')}</span>
            </div>
            <div className="artist-modal__stat">
              <span className="artist-modal__stat-number">{artist.oeuvres.length > 0 ? artist.oeuvres[artist.oeuvres.length - 1].year : '—'}</span>
              <span className="artist-modal__stat-label">{t('artist_last_year')}</span>
            </div>
          </div>
          <Link to={`/artistes/${artist.slug}`} className="artist-modal__cta" onClick={onClose}>
            {t('artist_see_gallery')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
