import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import type { Artwork, Artist } from '../types';
import { useTranslation } from '../i18n';

interface ArtworkInfoPanelProps {
  artwork: Artwork;
  artist: Artist;
  isOpen: boolean;
  onClose: () => void;
}

export default function ArtworkInfoPanel({ artwork, artist, isOpen, onClose }: ArtworkInfoPanelProps) {
  const { t } = useTranslation();
  const [animState, setAnimState] = useState<'closed' | 'entering' | 'open' | 'exiting'>('closed');
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Montage / démontage — isOpen seul déclencheur, pas animState
  useEffect(() => {
    if (isOpen && animState === 'closed') {
      prevFocusRef.current = document.activeElement as HTMLElement;
      setAnimState('entering');
    } else if (!isOpen && (animState === 'open' || animState === 'entering')) {
      setAnimState('exiting');
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // GSAP : panneau morphing 70% desktop (droite→gauche) / 50% mobile (bas→haut) + waterfall
  useLayoutEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (animState === 'entering' && overlayRef.current && panelRef.current) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        setAnimState('open');
        closeBtnRef.current?.focus();
        return;
      }
      const overlay = overlayRef.current;
      const panel = panelRef.current;
      const backdrop = backdropRef.current;
      const lines = panel.querySelectorAll<HTMLElement>('.info-panel__line');

      gsap.set(overlay, { opacity: 0 });
      if (isMobile) {
        gsap.set(panel, { yPercent: 100, xPercent: 0 });
      } else {
        gsap.set(panel, { xPercent: 100, yPercent: 0 });
      }
      gsap.set(lines, { y: 16, opacity: 0 });
      if (backdrop) gsap.set(backdrop, { opacity: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          setAnimState('open');
          closeBtnRef.current?.focus();
        },
      });
      tl.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.out' }, 0);
      if (backdrop) tl.to(backdrop, { opacity: 1, duration: 0.35, ease: 'power2.out' }, 0);
      if (isMobile) {
        tl.to(panel, { yPercent: 0, duration: 0.62, ease: 'power2.inOut' }, 0.05);
      } else {
        tl.to(panel, { xPercent: 0, duration: 0.62, ease: 'power2.inOut' }, 0.05);
      }
      tl.to(lines, { y: 0, opacity: 1, duration: 0.44, ease: 'power2.inOut', stagger: 0.07 }, 0.22);

      return () => { tl.kill(); };
    }
    if (animState === 'exiting' && overlayRef.current && panelRef.current) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        setAnimState('closed');
        prevFocusRef.current?.focus();
        return;
      }
      const overlay = overlayRef.current;
      const panel = panelRef.current;
      const backdrop = backdropRef.current;
      const lines = panel.querySelectorAll<HTMLElement>('.info-panel__line');
      const tl = gsap.timeline({
        onComplete: () => {
          setAnimState('closed');
          prevFocusRef.current?.focus();
        },
      });
      // Miroir exact de l'ouverture : lignes d'abord, puis panneau, puis overlay/backdrop
      tl.to(lines, { y: 16, opacity: 0, duration: 0.44, ease: 'power2.inOut', stagger: 0.07 }, 0);
      if (isMobile) {
        tl.to(panel, { yPercent: 100, duration: 0.62, ease: 'power2.inOut' }, 0.12);
      } else {
        tl.to(panel, { xPercent: 100, duration: 0.62, ease: 'power2.inOut' }, 0.12);
      }
      if (backdrop) tl.to(backdrop, { opacity: 0, duration: 0.35, ease: 'power2.inOut' }, 0.18);
      tl.to(overlay, { opacity: 0, duration: 0.35, ease: 'power2.inOut' }, 0.18);
      return () => { tl.kill(); };
    }
  }, [animState]);

  // Fermeture Escape
  useEffect(() => {
    if (animState !== 'open') return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [animState, onClose]);

  if (animState === 'closed') return null;

  const animClass = animState === 'entering' || animState === 'open' ? 'is-entering' : 'is-exiting';

  return (
    <div ref={overlayRef} className={`info-panel-overlay ${animClass}`}>
      <div ref={backdropRef} className="info-panel-overlay__backdrop" onClick={onClose} role="presentation" aria-hidden="true" />
      <aside ref={panelRef} className="info-panel info-panel--wide info-panel--reveal" role="dialog" aria-modal="true" aria-label={t('panel_aria')}>
        <button ref={closeBtnRef} className="info-panel__close" onClick={onClose} aria-label={t('panel_close')} type="button">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="info-panel__grid">
          <div className="info-panel__main">
            <p className="info-panel__label info-panel__line">{t('panel_details')}</p>
            <h3 className="info-panel__title info-panel__line">{artwork.title}</h3>
            <p className="info-panel__meta info-panel__line">{artwork.year} \u2014 {artwork.medium}</p>
            <p className="info-panel__dimensions info-panel__line">{artwork.dimensions}</p>
            <p className="info-panel__description info-panel__line">{artwork.description}</p>
          </div>
          <div className="info-panel__side info-panel__line">
            <div className="info-panel__artist">
              <p className="info-panel__artist-label">{t('panel_artist')}</p>
              <p className="info-panel__artist-name">{artist.nom}</p>
              <p className="info-panel__artist-location">{artist.ville} \u00b7 {artist.discipline}</p>
            </div>
            <p className="info-panel__hint">{t('panel_hint')}</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
