import { useParams, Link } from 'react-router-dom';
import Artists from '../data/artists';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslation } from '../i18n';
import '../styles/artists.css';

/**
 * Artist information page.
 * Shows biography, portrait, discipline, and works list.
 */
export default function ArtistInfoPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const artist = Artists.find((a) => a.slug === slug);

  if (!artist) {
    return (
      <div className="artists-page is-visible">
        <div className="info-page">
          <h1 className="info-page__title">{t('artist_not_found')}</h1>
          <Link to="/artistes" className="info-page__back">&larr; {t('artist_back')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="artists-page is-visible">
      {/* Grain */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Top Bar */}
      <header className="topbar">
        <div className="topbar__left">
          <Link to="/" className="topbar__logo">
            <img src="/logo.png" alt="Atelier Gallery" className="topbar__logo-img" />
          </Link>
        </div>
        <nav className="topbar__nav" aria-label="Navigation">
          <Link to="/artistes" className="topbar__link">{t('nav_artists')}</Link>
          <a href="#expositions" className="topbar__link">{t('nav_exhibitions')}</a>
          <a href="#apropos" className="topbar__link">{t('nav_about')}</a>
        </nav>
        <div className="topbar__right">
          <LanguageSwitcher />
          <Link to={`/artistes/${artist.slug}`} className="topbar__cta">{t('nav_gallery')}</Link>
        </div>
      </header>

      {/* Info Page */}
      <div className="info-page">
        <Link to="/artistes" className="info-page__back">&larr; {t('artist_back_short')}</Link>

        <div className="info-page__layout">
          {/* Portrait */}
          <div className="info-page__portrait-wrap">
            <img
              src={artist.portrait}
              alt={artist.nom}
              className="info-page__portrait"
            />
          </div>

          {/* Details */}
          <div className="info-page__details">
            <span className="info-page__discipline">{artist.discipline}</span>
            <h1 className="info-page__name">{artist.nom}</h1>
            <span className="info-page__location">{artist.ville}</span>

            <div className="info-page__divider" />

            <p className="info-page__bio">{artist.biographie}</p>

            <div className="info-page__stats">
              <div className="info-page__stat">
                <span className="info-page__stat-number">{String(artist.oeuvres.length).padStart(2, '0')}</span>
                <span className="info-page__stat-label">{t('artist_works')}</span>
              </div>
              <div className="info-page__stat">
                <span className="info-page__stat-number">{artist.oeuvres.length > 0 ? artist.oeuvres[artist.oeuvres.length - 1].year : '—'}</span>
                <span className="info-page__stat-label">{t('artist_last_year')}</span>
              </div>
            </div>

            <Link to={`/artistes/${artist.slug}`} className="info-page__cta">
              {t('artist_see_gallery')} &rarr;
            </Link>
          </div>
        </div>

        {/* Works preview */}
        <div className="info-page__works">
          <h2 className="info-page__works-title">{t('artist_selected_works')}</h2>
          <div className="info-page__works-grid">
            {artist.oeuvres.map((oeuvre) => (
              <div key={oeuvre.id} className="info-page__work">
                <div className="info-page__work-image">
                  {oeuvre.image ? (
                    <img src={oeuvre.image} alt={oeuvre.title} />
                  ) : (
                    <div className="info-page__work-placeholder">{oeuvre.title[0]}</div>
                  )}
                </div>
                <div className="info-page__work-info">
                  <span className="info-page__work-title">{oeuvre.title}</span>
                  <span className="info-page__work-year">{oeuvre.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
