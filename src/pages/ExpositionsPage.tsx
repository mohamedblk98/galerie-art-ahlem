import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslation } from '../i18n';
import '../styles/expositions.css';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

interface ExpoData {
  id: string;
  titleKey: string;
  descKey: string;
  artistsKey: string;
  imageKey: string;
  lieuKey: string;
  dateFinKey: string;
  commissaireKey: string;
  status: 'current' | 'upcoming' | 'past';
  dateDebut: string;
  day: string;
  month: string;
  slug: string;
}

const EXPOS: ExpoData[] = [
  {
    id: '1',
    titleKey: 'expo_1_title',
    descKey: 'expo_1_desc',
    artistsKey: 'expo_1_artists',
    imageKey: 'expo_1_image',
    lieuKey: 'expo_1_lieu',
    dateFinKey: 'expo_1_dateFin',
    commissaireKey: 'expo_1_commissaire',
    status: 'current',
    dateDebut: '2026-09-15',
    day: '15',
    month: 'Sep',
    slug: 'khaled-sebaa',
  },
  {
    id: '2',
    titleKey: 'expo_2_title',
    descKey: 'expo_2_desc',
    artistsKey: 'expo_2_artists',
    imageKey: 'expo_2_image',
    lieuKey: 'expo_2_lieu',
    dateFinKey: 'expo_2_dateFin',
    commissaireKey: 'expo_2_commissaire',
    status: 'upcoming',
    dateDebut: '2026-10-01',
    day: '01',
    month: 'Oct',
    slug: 'mustapha-boucenna',
  },
  {
    id: '3',
    titleKey: 'expo_3_title',
    descKey: 'expo_3_desc',
    artistsKey: 'expo_3_artists',
    imageKey: 'expo_3_image',
    lieuKey: 'expo_3_lieu',
    dateFinKey: 'expo_3_dateFin',
    commissaireKey: 'expo_3_commissaire',
    status: 'upcoming',
    dateDebut: '2026-11-20',
    day: '20',
    month: 'Nov',
    slug: 'djamel-zerouk',
  },
];

function getCountdown(dateStr: string): number {
  const now = new Date();
  const target = new Date(dateStr);
  const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

export default function ExpositionsPage() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState<'all' | 'current' | 'upcoming' | 'past'>('all');
  const [selected, setSelected] = useState<ExpoData | null>(null);

  const hero = useInView(0.1);
  const timeline = useInView(0.1);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null); };
      window.addEventListener('keydown', onKey);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', onKey);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [selected]);

  const filtered = filter === 'all' ? EXPOS : EXPOS.filter(e => e.status === filter);

  return (
    <div className={`expositions-page ${visible ? 'is-visible' : ''}`}>
      <div className="grain-overlay" aria-hidden="true" />

      <div className="expositions-bg-logo expositions-bg-logo--left" aria-hidden="true">
        <img src="/logod.png" alt="" />
      </div>
      <div className="expositions-bg-logo expositions-bg-logo--right" aria-hidden="true">
        <img src="/logod.png" alt="" />
      </div>

      {/* Topbar */}
      <header className="topbar">
        <div className="topbar__left">
          <Link to="/" className="topbar__logo">
            <img src="/logo.png" alt="Galerie" className="topbar__logo-img" style={{ height: '60px', width: 'auto' }} />
          </Link>
        </div>
        <nav className="topbar__nav" aria-label="Navigation">
          <Link to="/" className="topbar__link">{t('nav_home')}</Link>
          <Link to="/artistes" className="topbar__link">{t('nav_artists')}</Link>
          <Link to="/apropos" className="topbar__link">{t('nav_about')}</Link>
          <Link to="/expositions" className="topbar__link topbar__link--active">{t('nav_exhibitions')}</Link>
          <Link to="/contact" className="topbar__link">{t('nav_contact')}</Link>
        </nav>
        <div className="topbar__right">
          <LanguageSwitcher />
          <Link to="/artistes" className="topbar__cta">{t('nav_visit')}</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="expositions-hero" ref={hero.ref}>
        <div className={`expositions-hero__inner ${hero.inView ? 'is-visible' : ''}`}>
          <div className="hero-decorative-line" aria-hidden="true">
            <span className="hero-decorative-line__dash" />
            <span className="hero-decorative-line__diamond">◆</span>
            <span className="hero-decorative-line__dash" />
          </div>
          <span className="expositions-hero__eyebrow">{t('expositions_hero_eyebrow')}</span>
          <h1 className="expositions-hero__title">{t('expositions_hero_title')}</h1>
          <p className="expositions-hero__subtitle">{t('expositions_hero_subtitle')}</p>
        </div>
      </section>

      {/* Filters */}
      <div className="expositions-filters" role="group" aria-label="Filtres">
        {(['all', 'current', 'upcoming', 'past'] as const).map(f => (
          <button
            key={f}
            type="button"
            className={`expositions-filter ${filter === f ? 'is-active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {t(`expositions_filter_${f}`)}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <section className="expositions-timeline-section" ref={timeline.ref}>
        <div className={`expositions-timeline ${timeline.inView ? 'is-visible' : ''}`}>
          <div className="expositions-timeline__line" aria-hidden="true" />
          {filtered.length === 0 ? (
            <p className="expositions-empty">Aucune exposition dans cette catégorie.</p>
          ) : (
            filtered.map((expo, i) => {
              const countdown = expo.status === 'upcoming' ? getCountdown(expo.dateDebut) : 0;
              return (
                <div
                  key={expo.id}
                  className="expositions-timeline__item"
                  style={{ animationDelay: `${0.12 * i}s` }}
                  onClick={() => setSelected(expo)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') setSelected(expo); }}
                >
                  <div className="expositions-timeline__dot" aria-hidden="true">
                    <span className="expositions-timeline__dot-inner" />
                  </div>
                  <div className="expositions-card">
                    <div className="expositions-card__image">
                      <img src={t(expo.imageKey)} alt={t(expo.titleKey)} loading="lazy" />
                      <div className="expositions-card__image-overlay" />
                      {expo.status === 'current' && (
                        <span className="expositions-card__badge expositions-card__badge--live pulse-live">{t('expo_now')}</span>
                      )}
                      {expo.status === 'upcoming' && countdown > 0 && (
                        <span className="expositions-card__badge">{t('expositions_countdown')} {countdown}</span>
                      )}
                    </div>
                    <div className="expositions-card__body">
                      <div className="expositions-card__meta">
                        <span className="expositions-card__date">{expo.day} {expo.month}</span>
                        <span className="expositions-card__dot">·</span>
                        <span className="expositions-card__lieu">{t(expo.lieuKey)}</span>
                      </div>
                      <h3 className="expositions-card__title">{t(expo.titleKey)}</h3>
                      <p className="expositions-card__desc">{t(expo.descKey)}</p>
                      <span className="expositions-card__artists">{t(expo.artistsKey)}</span>
                      <div className="expositions-card__footer">
                        <span className="expositions-card__cta">{t('expositions_cta_gallery')}</span>
                        <span className="expositions-card__arrow" aria-hidden="true">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div className="expositions-modal" onClick={() => setSelected(null)} role="dialog" aria-modal="true">
          <div className="expositions-modal__content" onClick={e => e.stopPropagation()}>
            <button className="expositions-modal__close" onClick={() => setSelected(null)} aria-label={t('expositions_modal_close')}>×</button>
            <div className="expositions-modal__image">
              <img src={t(selected.imageKey)} alt={t(selected.titleKey)} />
            </div>
            <div className="expositions-modal__body">
              <span className="expositions-modal__eyebrow">{t(selected.lieuKey)} · {t(selected.dateFinKey)}</span>
              <h2 className="expositions-modal__title">{t(selected.titleKey)}</h2>
              <p className="expositions-modal__desc">{t(selected.descKey)}</p>
              <div className="expositions-modal__grid">
                <div>
                  <span className="expositions-modal__label">{t('expositions_lieu')}</span>
                  <span className="expositions-modal__value">{t(selected.lieuKey)}</span>
                </div>
                <div>
                  <span className="expositions-modal__label">{t('expositions_commissaire')}</span>
                  <span className="expositions-modal__value">{t(selected.commissaireKey)}</span>
                </div>
                <div>
                  <span className="expositions-modal__label">{t('expositions_dates')}</span>
                  <span className="expositions-modal__value">{selected.day} {selected.month} — {t(selected.dateFinKey)}</span>
                </div>
                <div>
                  <span className="expositions-modal__label">Artistes</span>
                  <span className="expositions-modal__value">{t(selected.artistsKey)}</span>
                </div>
              </div>
              <Link to={`/artistes/${selected.slug}`} className="expositions-modal__cta" onClick={() => setSelected(null)}>
                {t('expositions_cta_gallery')}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="home-footer">
        <div className="home-footer__grid">
          <div className="home-footer__brand">
            <div className="home-footer__logo-mark">
              <img src="/logod.png" alt="Galerie d'art Ahlem" className="home-footer__logo-img" />
            </div>
            <p className="home-footer__logo-name">Galerie d'art Ahlem</p>
            <p className="home-footer__tagline">{t('footer_tagline')}</p>
          </div>
          <div className="home-footer__col">
            <h4 className="home-footer__heading">{t('footer_nav')}</h4>
            <Link to="/" className="home-footer__link">{t('nav_home')}</Link>
            <Link to="/artistes" className="home-footer__link">{t('nav_artists')}</Link>
            <Link to="/expositions" className="home-footer__link">{t('nav_exhibitions')}</Link>
            <Link to="/apropos" className="home-footer__link">{t('nav_about')}</Link>
          </div>
          <div className="home-footer__col">
            <h4 className="home-footer__heading">{t('footer_contact')}</h4>
            <span className="home-footer__text">{t('footer_address_2')}</span>
            <a href="mailto:contact@galerie-gallery.com" className="home-footer__link">contact@galerie-gallery.com</a>
          </div>
          <div className="home-footer__col">
            <h4 className="home-footer__heading">{t('footer_follow')}</h4>
            <a href="#" className="home-footer__link">Instagram</a>
            <a href="#" className="home-footer__link">Twitter</a>
            <a href="#" className="home-footer__link">LinkedIn</a>
          </div>
        </div>
        <div className="home-footer__bottom">
          <span className="home-footer__copyright">© 2026 Galerie d'Art Ahlem. {t('footer_copyright').replace('© 2026 Galerie. ', '')}</span>
        </div>
      </footer>
    </div>
  );
}
