import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslation } from '../i18n';
import '../styles/contact.css';

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

export default function ContactPage() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const hero = useInView(0.1);
  const form = useInView(0.15);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = t('contact_error_name');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = t('contact_error_email');
    if (!message) nextErrors.message = t('contact_error_message');
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSent(true);
    formRef.current?.reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className={`contact-page ${visible ? 'is-visible' : ''}`}>
      <div className="grain-overlay" aria-hidden="true" />

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
          <Link to="/expositions" className="topbar__link">{t('nav_exhibitions')}</Link>
          <Link to="/contact" className="topbar__link topbar__link--active">{t('nav_contact')}</Link>
        </nav>
        <div className="topbar__right">
          <LanguageSwitcher />
          <Link to="/artistes" className="topbar__cta">{t('nav_visit')}</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="contact-hero" ref={hero.ref}>
        <div className={`contact-hero__inner ${hero.inView ? 'is-visible' : ''}`}>
          <div className="hero-decorative-line" aria-hidden="true">
            <span className="hero-decorative-line__dash" />
            <span className="hero-decorative-line__diamond">◆</span>
            <span className="hero-decorative-line__dash" />
          </div>
          <span className="contact-hero__eyebrow">{t('contact_eyebrow')}</span>
          <h1 className="contact-hero__title">{t('contact_title')}</h1>
          <p className="contact-hero__subtitle">{t('contact_subtitle')}</p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="contact-section" ref={form.ref}>
        <div className={`contact-section__inner ${form.inView ? 'is-visible' : ''}`}>
          <div className="contact-layout">
            {/* Info */}
            <div className="contact-info">
              <div className="contact-info__item">
                <span className="contact-info__label">{t('contact_info_address')}</span>
                <span className="contact-info__value">{t('footer_address_2')}</span>
              </div>
              <div className="contact-info__item">
                <span className="contact-info__label">{t('contact_info_email')}</span>
                <a href="mailto:contact@galerie-gallery.com" className="contact-info__link">contact@galerie-gallery.com</a>
              </div>
              <div className="contact-info__item">
                <span className="contact-info__label">{t('contact_info_phone')}</span>
                <a href="tel:+213000000000" className="contact-info__link">+213 000 000 000</a>
              </div>
              <div className="contact-info__item">
                <span className="contact-info__label">{t('contact_info_hours')}</span>
                <span className="contact-info__value">{t('contact_hours')}</span>
              </div>
            </div>

            {/* Form */}
            <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label className="contact-form__label" htmlFor="contact-name">{t('contact_label_name')}</label>
                  <input id="contact-name" name="name" type="text" className="contact-form__input" placeholder={t('contact_placeholder_name')} />
                  {errors.name && <span className="contact-form__error">{errors.name}</span>}
                </div>
                <div className="contact-form__field">
                  <label className="contact-form__label" htmlFor="contact-email">{t('contact_label_email')}</label>
                  <input id="contact-email" name="email" type="email" className="contact-form__input" placeholder={t('contact_placeholder_email')} />
                  {errors.email && <span className="contact-form__error">{errors.email}</span>}
                </div>
              </div>
              <div className="contact-form__field">
                <label className="contact-form__label" htmlFor="contact-subject">{t('contact_label_subject')}</label>
                <input id="contact-subject" name="subject" type="text" className="contact-form__input" placeholder={t('contact_placeholder_subject')} />
              </div>
              <div className="contact-form__field">
                <label className="contact-form__label" htmlFor="contact-message">{t('contact_label_message')}</label>
                <textarea id="contact-message" name="message" rows={5} className="contact-form__textarea" placeholder={t('contact_placeholder_message')} />
                {errors.message && <span className="contact-form__error">{errors.message}</span>}
              </div>
              <button type="submit" className="contact-form__submit">
                {t('contact_submit')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              {sent && <p className="contact-form__success">{t('contact_success')}</p>}
            </form>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="contact-map">
        <iframe
          title="Galerie d'Art Ahlem"
          src="https://maps.google.com/maps?q=36.750004,3.0377353&z=17&hl=fr&output=embed"
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: '16px' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <a
          href="https://www.google.com/maps/place/GALERIE+D'ART+AHLEM/@36.7499563,3.037632,57m/data=!3m1!1e3!4m6!3m5!1s0x128fb3e8b56d9a21:0x129cd3cfbc8e7fb8!8m2!3d36.750004!4d3.0377353!16s%2Fg%2F11xml54rgm"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-map__link"
        >
          Ouvrir dans Google Maps →
        </a>
      </section>

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
