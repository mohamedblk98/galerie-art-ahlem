import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LiquidMetalButton } from '@designcodeio/threeui';
import '@designcodeio/threeui/style.css';
import Artists from '../data/artists';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslation } from '../i18n';
import '../styles/homepage.css';

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

/* ── Featured artists (first 4) ── */
const featured = Artists.slice(0, 4);

/* ── About Section Image Slideshow ── */
const SLIDESHOW_IMAGES = [
  '/gallery-images/3544c9d4-5275-4cdd-a66b-59d075d7416a.jpg',
  '/gallery-images/3beac138-cd91-4343-bc3a-d9594b50b1ce.jpg',
  '/gallery-images/86b7e790-51ae-4b7f-9202-e0586a979705.jpg',
  '/gallery-images/c0dc0bf5-a093-4640-81fd-3a95b5907c07.jpg',
  '/gallery-images/cbca9065-3ed0-4ba2-b416-bedb821a8a3f.jpg',
  '/gallery-images/cf0d03e8-46dc-4022-9043-b4c322f8d623.jpg',
  '/gallery-images/d6cc1d94-a1df-45e6-b56b-60be74af9d6a.jpg',
];

function AboutSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-about__visual-inner" style={{ overflow: 'hidden' }}>
      {SLIDESHOW_IMAGES.map((src, i) => (
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
            transform: i === current ? 'scale(1)' : 'scale(1.08)',
            transition: 'opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        />
      ))}
    </div>
  );
}

/* ── Floating Particles ── */
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.3 + 0.05,
  }));

  return (
    <div className="floating-particles" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="floating-particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ── Scroll Progress Bar ── */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div
        className="scroll-progress__bar"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

/* ── Animated Counter ── */
function useCountUp(target: number, trigger: boolean, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, trigger, duration]);

  return count;
}



/**
 * HomePage — Luxurious, artistic and extraordinary landing page.
 * A cinematic experience for Galerie.
 */
export default function HomePage() {
  const { t, lang } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const hero = useInView(0.1);
  const artistsSec = useInView(0.1);
  const about = useInView(0.15);
  const exhibitions = useInView(0.15);
  const newsletter = useInView(0.15);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(rafId);
  }, []);

  /* ── Mouse tracking for subtle parallax on hero ── */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`home-page ${visible ? 'is-visible' : ''}`}>
      <ScrollProgress />
      <FloatingParticles />

      {/* ── Grain overlay ── */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* ── Ambient orbs ── */}
      <div className="ambient-orb ambient-orb--1" aria-hidden="true" />
      <div className="ambient-orb ambient-orb--2" aria-hidden="true" />
      <div className="ambient-orb ambient-orb--3" aria-hidden="true" />

      {/* ── Background Logos ── */}
      <div className="home-bg-logo home-bg-logo--left" aria-hidden="true">
        <img src="/logod.png" alt="" />
      </div>
      <div className="home-bg-logo home-bg-logo--right" aria-hidden="true">
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
          <Link to="/" className="topbar__link topbar__link--active">{t('nav_home')}</Link>
          <Link to="/artistes" className="topbar__link">{t('nav_artists')}</Link>
          <Link to="/apropos" className="topbar__link">{t('nav_about')}</Link>
          <Link to="/expositions" className="topbar__link">{t('nav_exhibitions')}</Link>
          <Link to="/contact" className="topbar__link">{t('nav_contact')}</Link>
        </nav>
        <div className="topbar__right">
          <LanguageSwitcher />
          <Link to="/artistes" className="topbar__cta">{t('nav_visit')}</Link>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════
          SECTION 1 — HERO
          ════════════════════════════════════════════════════ */}
      <section className="home-section home-hero" ref={hero.ref}>
        <div
          className={`home-hero__inner ${hero.inView ? 'is-visible' : ''}`}
          style={{
            transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)`,
          }}
        >
          {/* Decorative top line */}
          <div className="hero-decorative-line" aria-hidden="true">
            <span className="hero-decorative-line__dash" />
            <span className="hero-decorative-line__diamond">◆</span>
            <span className="hero-decorative-line__dash" />
          </div>

          <span className="home-hero__eyebrow hero-word-reveal" style={{ animationDelay: '0.05s' }}>{t('home_eyebrow')}</span>

          <h1 className="home-hero__title">
            <span className="home-hero__title-line">
              <span className="hero-word-reveal" style={{ animationDelay: '0.2s' }}>{t('home_title_1')}</span>{' '}
              <span className="home-hero__title-line--black hero-word-reveal" style={{ animationDelay: '0.35s' }}>{t('home_title_2_dart')}</span>
            </span>
            <span className="home-hero__title-line home-hero__title-line--accent">
              {lang === 'ar' ? (
                <span className="home-hero__title-word">{t('home_title_2_ahlem')}</span>
              ) : (
                t('home_title_2_ahlem').split('').map((ch, i) => (
                  <span
                    key={`${ch}-${i}`}
                    className="home-hero__title-letter"
                    style={{ animationDelay: `${0.85 + i * 0.09}s` }}
                  >
                    {ch}
                  </span>
                ))
              )}
            </span>
          </h1>

          <p className="home-hero__subtitle hero-word-reveal" style={{ animationDelay: '1.4s' }}>
            {t('home_subtitle')}
          </p>

          <div className="home-hero__actions hero-word-reveal" style={{ animationDelay: '1.6s' }}>
            <Link to="/artistes" className="home-hero__cta-primary">
              <LiquidMetalButton variant="pill" rendering="colored" text={t('home_cta_discover')} />
            </Link>
            <Link to="/artistes" className="home-hero__cta-secondary">
              <span>{t('home_cta_enter')}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="home-hero__side-line" aria-hidden="true" />
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 2 — ARTISTES EN VEDETTE
          ════════════════════════════════════════════════════ */}
      <section className="home-section home-featured" id="artistes" ref={artistsSec.ref}>
        <div className={`home-section__inner ${artistsSec.inView ? 'is-visible' : ''}`}>
          <div className="home-section__header">
            <span className="home-section__eyebrow reveal-line" style={{ animationDelay: '0.1s' }}>{t('featured_eyebrow')}</span>
            <h2 className="home-section__title reveal-line" style={{ animationDelay: '0.25s' }}>{t('featured_title')}</h2>
            <p className="home-section__desc reveal-line" style={{ animationDelay: '0.4s' }}>
              {t('featured_desc')}
            </p>
          </div>

          <div className="home-featured__grid">
            {featured.map((artist, i) => (
              <Link
                to={`/artistes/${artist.slug}`}
                key={artist.id}
                className="home-featured__card card-3d-tilt"
                style={{ animationDelay: `${0.15 * i}s` }}
              >
                <div className="home-featured__card-img">
                  <img src={artist.portrait} alt={artist.nom} loading="lazy" />
                  <div className="home-featured__card-overlay">
                    <span className="home-featured__card-cta">{t('featured_see_gallery')}</span>
                  </div>
                </div>
                <div className="home-featured__card-info">
                  <span className="home-featured__card-discipline">{artist.discipline}</span>
                  <h3 className="home-featured__card-name">{artist.nom}</h3>
                  <span className="home-featured__card-ville">{artist.ville}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="home-featured__more">
            <Link to="/artistes" className="home-featured__more-btn">
              <span>{t('featured_see_all')}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 3 — A PROPOS DE LA GALERIE
          ════════════════════════════════════════════════════ */}
      <section className="home-section home-about" id="apropos" ref={about.ref}>
        <div className={`home-section__inner ${about.inView ? 'is-visible' : ''}`}>
          <div className="home-about__layout">
            <div className="home-about__text">
              <span className="home-section__eyebrow reveal-line" style={{ animationDelay: '0.1s' }}>{t('about_eyebrow')}</span>
              <h2 className="home-section__title home-section__title--left reveal-line" style={{ animationDelay: '0.25s' }}>
                {t('about_title')}
              </h2>
              <p className="home-about__paragraph reveal-line" style={{ animationDelay: '0.4s' }}>
                {t('about_p1')}
              </p>
              <p className="home-about__paragraph reveal-line" style={{ animationDelay: '0.55s' }}>
                {t('about_p2')}
              </p>

              <div className="home-about__stats">
                <div className="home-about__stat">
                  <span className="home-about__stat-number">{useCountUp(Artists.length, about.inView)}</span>
                  <span className="home-about__stat-label">{t('about_stat_artists')}</span>
                </div>
                <div className="home-about__stat">
                  <span className="home-about__stat-number">
                    {useCountUp(Artists.reduce((acc, a) => acc + a.oeuvres.length, 0), about.inView)}
                  </span>
                  <span className="home-about__stat-label">{t('about_stat_works')}</span>
                </div>
                <div className="home-about__stat">
                  <span className="home-about__stat-number">{useCountUp(3, about.inView)}</span>
                  <span className="home-about__stat-label">{t('about_stat_cities')}</span>
                </div>
              </div>
            </div>

            <div className="home-about__visual parallax-visual">
              <div className="home-about__visual-frame">
                <AboutSlideshow />
                <div className="home-about__visual-border" aria-hidden="true" />
                <div className="home-about__visual-accent" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 4 — EXPOSITIONS (Teaser)
          ════════════════════════════════════════════════════ */}
      <section className="home-section home-expos" id="expositions" ref={exhibitions.ref}>
        <div className={`home-section__inner ${exhibitions.inView ? 'is-visible' : ''}`}>
          <div className="home-section__header">
            <span className="home-section__eyebrow reveal-line" style={{ animationDelay: '0.1s' }}>{t('expo_eyebrow')}</span>
            <h2 className="home-section__title reveal-line" style={{ animationDelay: '0.25s' }}>{t('expo_title')}</h2>
          </div>

          <div className="home-expos__list">
            {/* Expo 1 — teaser */}
            <div className="home-expos__item expo-reveal" style={{ animationDelay: '0.15s' }}>
              <div className="home-expos__item-date">
                <span className="home-expos__item-day">15</span>
                <span className="home-expos__item-month">Sep</span>
              </div>
              <div className="home-expos__item-content">
                <span className="home-expos__item-status home-expos__item-status--live pulse-live">{t('expo_now')}</span>
                <h3 className="home-expos__item-title">{t('expo_1_title')}</h3>
                <p className="home-expos__item-desc">
                  {t('expo_1_desc')}
                </p>
                <span className="home-expos__item-artists">
                  {t('expo_1_artists')}
                </span>
              </div>
              <Link to="/artistes/khaled-sebaa" className="home-expos__item-link magnetic-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Expo 2 — teaser */}
            <div className="home-expos__item expo-reveal" style={{ animationDelay: '0.3s' }}>
              <div className="home-expos__item-date">
                <span className="home-expos__item-day">01</span>
                <span className="home-expos__item-month">Oct</span>
              </div>
              <div className="home-expos__item-content">
                <span className="home-expos__item-status">{t('expo_coming')}</span>
                <h3 className="home-expos__item-title">{t('expo_2_title')}</h3>
                <p className="home-expos__item-desc">
                  {t('expo_2_desc')}
                </p>
                <span className="home-expos__item-artists">
                  {t('expo_2_artists')}
                </span>
              </div>
              <Link to="/artistes/amira-khelifi" className="home-expos__item-link magnetic-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/expositions" className="home-featured__more-btn">
              <span>{t('expositions_cta_all')}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 5 — NEWSLETTER / CTA
          ════════════════════════════════════════════════════ */}
      <section className="home-section home-newsletter" ref={newsletter.ref}>
        <div className={`home-section__inner ${newsletter.inView ? 'is-visible' : ''}`}>
          <div className="home-newsletter__card">
            <span className="home-section__eyebrow">{t('newsletter_eyebrow')}</span>
            <h2 className="home-section__title">{t('newsletter_title')}</h2>
            <p className="home-newsletter__desc">
              {t('newsletter_desc')}
            </p>
            <form className="home-newsletter__form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t('newsletter_placeholder')}
                className="home-newsletter__input"
                aria-label={t('newsletter_aria')}
              />
              <button type="submit" className="home-newsletter__submit">
                {t('newsletter_submit')}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════════════ */}
      <footer className="home-footer">
        <div className="home-footer__grid">
          {/* Brand */}
          <div className="home-footer__brand">
            <div className="home-footer__logo-mark">
              <img src="/logod.png" alt="Galerie d'art Ahlem" className="home-footer__logo-img" />
            </div>
            <p className="home-footer__logo-name">Galerie d'art Ahlem</p>
            <p className="home-footer__tagline">
              {t('footer_tagline')}
            </p>
          </div>

          {/* Navigation */}
          <div className="home-footer__col">
            <h4 className="home-footer__heading">{t('footer_nav')}</h4>
            <Link to="/" className="home-footer__link">{t('nav_home')}</Link>
            <Link to="/artistes" className="home-footer__link">{t('nav_artists')}</Link>
            <Link to="/expositions" className="home-footer__link">{t('nav_exhibitions')}</Link>
            <Link to="/apropos" className="home-footer__link">{t('nav_about')}</Link>
          </div>

          {/* Contact */}
          <div className="home-footer__col">
            <h4 className="home-footer__heading">{t('footer_contact')}</h4>
            <span className="home-footer__text">{t('footer_address_2')}</span>
            <a href="mailto:contact@galerie-gallery.com" className="home-footer__link">
              contact@galerie-gallery.com
            </a>
          </div>

          {/* Social */}
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
