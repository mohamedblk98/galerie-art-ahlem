import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Artists from '../data/artists';
import { useTranslation } from '../i18n';
import '../styles/apropos.css';

/* ── Intersection Observer hook for scroll animations ── */
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

/* ── Apropos Images from gallery-image-apropos ── */
const APROPOS_IMAGES = Array.from({ length: 29 }, (_, i) =>
  `/gallery-image-apropos/img_${String(i + 1).padStart(2, '0')}.jpeg`
);

/* ── Hero Full-Viewport Background Slideshow ── */
function HeroBackgroundSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % APROPOS_IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="apropos-hero-bg-slideshow" aria-hidden="true">
      {APROPOS_IMAGES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`apropos-hero-bg-slideshow__img ${i === current ? 'is-active' : ''}`}
        />
      ))}
    </div>
  );
}

/* ── Mission Section Image Slideshow (from /gallery) ── */
const GALLERY_IMAGES = [
  '/gallery/5ddeff5a-937c-4b5e-83b3-4d5d363cbf65.jpg',
  '/gallery/6ae80cf7-e535-4ca4-beba-c4b803266ac5.jpg',
  '/gallery/6e08a830-3604-42f8-a3e5-e74bc2eefc8b.jpg',
  '/gallery/9a4f0378-4327-46c2-aa0b-d2479cd98494.jpg',
];

function AboutSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="apropos-visual-inner" style={{ overflow: 'hidden' }}>
      {GALLERY_IMAGES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
        />
      ))}
    </div>
  );
}

/**
 * AproposPage — À propos / About page.
 * Same visual style as HomePage: white gradient, ambient orbs, grain overlay.
 */
export default function AproposPage() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  const hero = useInView(0.1);
  const mission = useInView(0.15);
  const values = useInView(0.15);
  const cta = useInView(0.15);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className={`apropos-page ${visible ? 'is-visible' : ''}`}>
      {/* ── Grain overlay ── */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* ── Ambient orbs ── */}
      <div className="ambient-orb ambient-orb--1" aria-hidden="true" />
      <div className="ambient-orb ambient-orb--2" aria-hidden="true" />
      <div className="ambient-orb ambient-orb--3" aria-hidden="true" />

      {/* ── Background Logos ── */}
      <div className="apropos-bg-logo apropos-bg-logo--left" aria-hidden="true">
        <img src="/logod.png" alt="" />
      </div>
      <div className="apropos-bg-logo apropos-bg-logo--right" aria-hidden="true">
        <img src="/logod.png" alt="" />
      </div>

      {/* ── Topbar ── */}
      <header className="topbar">
        <div className="topbar__left">
          <Link to="/" className="topbar__logo">
            <img src="/logo.png" alt="Galerie" className="topbar__logo-img" style={{ height: '60px', width: 'auto' }} />
          </Link>
        </div>
        <nav className="topbar__nav" aria-label="Navigation">
          <Link to="/" className="topbar__link">{t('nav_home')}</Link>
          <Link to="/artistes" className="topbar__link">{t('nav_artists')}</Link>
          <Link to="/apropos" className="topbar__link topbar__link--active">{t('nav_about')}</Link>
          <Link to="/expositions" className="topbar__link">{t('nav_exhibitions')}</Link>
          <Link to="/contact" className="topbar__link">{t('nav_contact')}</Link>
        </nav>
        <div className="topbar__right">
          <LanguageSwitcher />
          <Link to="/artistes" className="topbar__cta">{t('nav_visit')}</Link>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════
          HERO — À Propos
          ════════════════════════════════════════════════════ */}
      <section className="apropos-section apropos-hero" ref={hero.ref}>
        <HeroBackgroundSlideshow />
        <div className={`apropos-hero__inner ${hero.inView ? 'is-visible' : ''}`}>
          <div className="hero-decorative-line" aria-hidden="true">
            <span className="hero-decorative-line__dash" />
            <span className="hero-decorative-line__diamond">◆</span>
            <span className="hero-decorative-line__dash" />
          </div>

          <span className="apropos-hero__eyebrow">{t('apropos_hero_eyebrow')}</span>

          <h1 className="apropos-hero__title">
            <span className="apropos-hero__title-line apropos-hero__title-line--black">{t('apropos_hero_title')}</span>
          </h1>

          <p className="apropos-hero__subtitle">
            {t('apropos_hero_subtitle')}
          </p>
        </div>

        <div className="apropos-hero__side-line" aria-hidden="true" />

        <div className="home-scroll-hint" aria-hidden="true">
          <div className="home-scroll-hint__line" />
          <span className="home-scroll-hint__text">{t('home_scroll')}</span>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          MISSION
          ════════════════════════════════════════════════════ */}
      <section className="apropos-section apropos-mission" ref={mission.ref}>
        <div className={`apropos-section__inner ${mission.inView ? 'is-visible' : ''}`}>
          <div className="apropos-mission__layout">
            <div className="apropos-mission__text">
              <span className="apropos-section__eyebrow">{t('apropos_mission_eyebrow')}</span>
              <h2 className="apropos-section__title apropos-section__title--left">
                {t('apropos_mission_title')}
              </h2>
              <p className="apropos-mission__paragraph">
                {t('apropos_mission_p1')}
              </p>
              <p className="apropos-mission__paragraph">
                {t('apropos_mission_p2')}
              </p>
              <p className="apropos-mission__paragraph">
                {t('apropos_mission_p3')}
              </p>
              <p className="apropos-mission__bold">
                {t('apropos_mission_bold')}
              </p>

              <div className="apropos-mission__stats">
                <div className="apropos-mission__stat">
                  <span className="apropos-mission__stat-number">{Artists.length}</span>
                  <span className="apropos-mission__stat-label">{t('apropos_stat_artists')}</span>
                </div>
                <div className="apropos-mission__stat">
                  <span className="apropos-mission__stat-number">
                    {Artists.reduce((acc, a) => acc + a.oeuvres.length, 0)}
                  </span>
                  <span className="apropos-mission__stat-label">{t('apropos_stat_works')}</span>
                </div>
                <div className="apropos-mission__stat">
                  <span className="apropos-mission__stat-number">3</span>
                  <span className="apropos-mission__stat-label">{t('apropos_stat_cities')}</span>
                </div>
                <div className="apropos-mission__stat">
                  <span className="apropos-mission__stat-number">12</span>
                  <span className="apropos-mission__stat-label">{t('apropos_stat_exhibitions')}</span>
                </div>
              </div>
            </div>

            <div className="apropos-mission__visual">
              <div className="apropos-mission__visual-frame">
                <AboutSlideshow />
                <div className="apropos-mission__visual-border" aria-hidden="true" />
                <div className="apropos-mission__visual-accent" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          VALEURS
          ════════════════════════════════════════════════════ */}
      <section className="apropos-section apropos-values" ref={values.ref}>
        <div className={`apropos-section__inner ${values.inView ? 'is-visible' : ''}`}>
          <div className="apropos-section__header">
            <span className="apropos-section__eyebrow">{t('apropos_values_eyebrow')}</span>
            <h2 className="apropos-section__title">{t('apropos_values_title')}</h2>
          </div>

          <div className="apropos-values__grid">
            <div className="apropos-values__card">
              <div className="apropos-values__card-icon">✦</div>
              <h3 className="apropos-values__card-title">{t('apropos_value_1_title')}</h3>
              <p className="apropos-values__card-desc">{t('apropos_value_1_desc')}</p>
            </div>
            <div className="apropos-values__card">
              <div className="apropos-values__card-icon">◈</div>
              <h3 className="apropos-values__card-title">{t('apropos_value_2_title')}</h3>
              <p className="apropos-values__card-desc">{t('apropos_value_2_desc')}</p>
            </div>
            <div className="apropos-values__card">
              <div className="apropos-values__card-icon">◆</div>
              <h3 className="apropos-values__card-title">{t('apropos_value_3_title')}</h3>
              <p className="apropos-values__card-desc">{t('apropos_value_3_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          CTA
          ════════════════════════════════════════════════════ */}
      <section className="apropos-section apropos-cta" ref={cta.ref}>
        <div className={`apropos-section__inner ${cta.inView ? 'is-visible' : ''}`}>
          <div className="apropos-cta__card">
            <h2 className="apropos-section__title">{t('apropos_hero_title')}</h2>
            <p className="apropos-cta__desc">
              {t('apropos_hero_subtitle')}
            </p>
            <div className="apropos-cta__actions">
              <Link to="/artistes" className="apropos-cta__btn apropos-cta__btn--primary">
                {t('apropos_cta_discover')}
              </Link>
              <a href="mailto:contact@galerie-gallery.com" className="apropos-cta__btn apropos-cta__btn--secondary">
                {t('apropos_cta_contact')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════════════ */}
      <footer className="home-footer">
        <div className="home-footer__grid">
          <div className="home-footer__brand">
            <div className="home-footer__logo-mark">
              <img src="/logod.png" alt="Galerie d'art Ahlem" className="home-footer__logo-img" />
            </div>
            <p className="home-footer__logo-name">Galerie d'art Ahlem</p>
          </div>
          <div className="home-footer__col">
            <h4 className="home-footer__heading">{t('footer_nav')}</h4>
            <Link to="/" className="home-footer__link">{t('nav_home')}</Link>
            <Link to="/artistes" className="home-footer__link">{t('nav_artists')}</Link>
            <Link to="/apropos" className="home-footer__link">{t('nav_about')}</Link>
          </div>
          <div className="home-footer__col">
            <h4 className="home-footer__heading">{t('footer_contact')}</h4>
            <span className="home-footer__text">{t('footer_address_2')}</span>
            <a href="mailto:contact@galerie-gallery.com" className="home-footer__link">
              contact@galerie-gallery.com
            </a>
          </div>
          <div className="home-footer__col">
            <h4 className="home-footer__heading">{t('footer_follow')}</h4>
            <a href="#" className="home-footer__link">Instagram</a>
            <a href="#" className="home-footer__link">Twitter</a>
            <a href="#" className="home-footer__link">LinkedIn</a>
          </div>
        </div>
        <div className="home-footer__bottom">
          <span className="home-footer__copyright">
            © 2026 Galerie d'Art Ahlem. {t('footer_copyright').replace('© 2026 Galerie. ', '')}
          </span>
        </div>
      </footer>
    </div>
  );
}
