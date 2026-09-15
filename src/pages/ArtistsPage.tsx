import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Artists from '../data/artists';
import ProfileCarousel from '../components/ProfileCarousel';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslation } from '../i18n';
import '../styles/artists.css';

/**
 * Artists page — fullscreen immersive gallery landing.
 * 100vw × 100vh · Profile Carousel with focus effect · Premium dark luxury.
 */
export default function ArtistsPage() {
  const { t } = useTranslation();
  const [, setActiveIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setModalOpen(true);
    const onClose = () => setModalOpen(false);
    window.addEventListener('artist-modal-open', onOpen);
    window.addEventListener('artist-modal-close', onClose);
    return () => {
      window.removeEventListener('artist-modal-open', onOpen);
      window.removeEventListener('artist-modal-close', onClose);
    };
  }, []);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(rafId);
  }, []);

  if (!Artists.length) return null;

  return (
    <div className={`artists-page ${visible ? 'is-visible' : ''}`}>
      {/* Grain */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* ── Topbar — transparent overlay ── */}
      <header className="topbar">
        <div className="topbar__left">
          <Link to="/" className="topbar__logo">
            <img src="/logo.png" alt="Galerie Gallery" className="topbar__logo-img" />
          </Link>
        </div>
        <nav className="topbar__nav" aria-label="Navigation">
          <Link to="/" className="topbar__link">{t('nav_home')}</Link>
          <Link to="/artistes" className="topbar__link topbar__link--active">{t('nav_artists')}</Link>
          <Link to="/apropos" className="topbar__link">{t('nav_about')}</Link>
          <Link to="/expositions" className="topbar__link">{t('nav_exhibitions')}</Link>
          <Link to="/contact" className="topbar__link">{t('nav_contact')}</Link>
        </nav>
        <div className="topbar__right">
          <LanguageSwitcher />
          <a href="#galerie" className="topbar__cta">{t('nav_visit')}</a>
        </div>
      </header>

      {/* ── Background Logos ── */}
      <div className="artists-bg-logo artists-bg-logo--left" aria-hidden="true">
        <img src="/logod.png" alt="" />
      </div>
      <div className="artists-bg-logo artists-bg-logo--right" aria-hidden="true">
        <img src="/logod.png" alt="" />
      </div>

      {/* ── Hero — compact overlay top left ── */}
      {!modalOpen && (
        <section className="hero hero--overlay" id="artistes">
          <h1 className="hero__title">{t('artists_title')}</h1>
          <p className="hero__subtitle">
            {t('artists_subtitle').split('—').length > 1
              ? <>{t('artists_subtitle').split('—')[0]}—<br />{t('artists_subtitle').split('—')[1]}</>
              : t('artists_subtitle')
            }
          </p>
        </section>
      )}

      {/* ── Profile Carousel — Interactive Focus Effect ── */}
      <section className="carousel-section" aria-label={t('artists_aria')}>
        <ProfileCarousel artists={Artists} onActiveChange={setActiveIdx} />
      </section>
    </div>
  );
}
