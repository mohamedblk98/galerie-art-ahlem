import { useState, useCallback, useEffect, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import Artists from '../data/artists';
import GalleryCanvas from '../components/GalleryCanvas';
import GalleryControls from '../components/GalleryControls';
import ArtworkInfoPanel from '../components/ArtworkInfoPanel';
import WebGLFallback from '../components/WebGLFallback';
import CanvasErrorBoundary from '../components/CanvasErrorBoundary';
import '../styles/gallery.css';

const ANIMATION_DURATION = 3000;

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

function useSwipe(
  onLeft: () => void,
  onRight: () => void,
  isAnimatingRef: React.MutableRefObject<boolean>
) {
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let startTime = 0;

    const handleStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTime = Date.now();
    };

    const handleEnd = (e: TouchEvent) => {
      if (isAnimatingRef.current) return;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      const dt = Date.now() - startTime;
      if (dt > 600) return;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        if (dx < 0) onLeft();
        else onRight();
      }
    };

    window.addEventListener('touchstart', handleStart, { passive: true });
    window.addEventListener('touchend', handleEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleStart);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [onLeft, onRight, isAnimatingRef]);
}

export default function GalleryPage() {
  const { slug } = useParams<{ slug: string }>();
  const artist = Artists.find((a) => a.slug === slug);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const isAnimatingRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);
  const [hasWebGL] = useState(() => isWebGLAvailable());
  const [infoOpen, setInfoOpen] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const revealRef = useRef({ z: 0, rotY: 0, slideX: 0, slideY: 0 });
  const revealTweenRef = useRef<gsap.core.Tween | null>(null);
  const isRevealingRef = useRef(false);
  const setRevealing = useCallback((v: boolean) => {
    isRevealingRef.current = v;
    setIsRevealing(v);
  }, []);

  const artworks = artist?.oeuvres ?? [];
  const count = artworks.length;

  const goNext = useCallback(() => {
    if (isAnimatingRef.current || isRevealingRef.current || infoOpen || count === 0) return;
    isAnimatingRef.current = true;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % count);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      isAnimatingRef.current = false;
      setIsAnimating(false);
    }, ANIMATION_DURATION);
  }, [count, infoOpen]);

  const goPrev = useCallback(() => {
    if (isAnimatingRef.current || isRevealingRef.current || infoOpen || count === 0) return;
    isAnimatingRef.current = true;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + count) % count);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      isAnimatingRef.current = false;
      setIsAnimating(false);
    }, ANIMATION_DURATION);
  }, [count, infoOpen]);

  useSwipe(goNext, goPrev, isAnimatingRef);

  // Clic tableau : avance (ease in-out) → rotation 360° → pause 1s → glisse (30% desktop / 50% mobile) → panneau 70%/50%
  const handleFrameClick = useCallback(() => {
    if (isAnimatingRef.current || isRevealingRef.current || infoOpen) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInfoOpen(true);
      return;
    }
    setRevealing(true);
    revealTweenRef.current?.kill();
    gsap.set(revealRef.current, { z: 0, rotY: 0, slideX: 0, slideY: 0 });
    const isMobile = window.innerWidth <= 768;
    const tl = gsap.timeline({
      onComplete: () => { setRevealing(false); },
    });
    revealTweenRef.current = tl as unknown as gsap.core.Tween;
    // 1. Avance : lent → rapide → lent (power2.inOut)
    tl.to(revealRef.current, { z: 2.8, duration: 0.6, ease: 'power2.inOut' });
    // 2. Rotation 360° : lent → rapide → lent, revient à l'orientation initiale
    tl.to(revealRef.current, { rotY: Math.PI * 2, duration: 0.85, ease: 'power2.inOut' });
    // 3. Pause 1s immobile
    tl.to({}, { duration: 1 });
    // 4. Glisse : desktop → gauche (30%), mobile → haut (50%)
    if (isMobile) {
      tl.to(revealRef.current, { slideY: 0,slideX: 0.05, duration: 0.6, ease: 'power2.inOut' });
    } else {
      tl.to(revealRef.current, { slideX: -2.1, duration: 0.6, ease: 'power2.inOut' });
    }
    // 5. Pause 1s avant panneau
    tl.to({}, { duration: 1 });
    // 6. Panneau morphing (70% desktop / 50% mobile) + waterfall
    tl.call(() => setInfoOpen(true));
  }, [infoOpen]);

  const handleInfoClose = useCallback(() => {
    if (isRevealingRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInfoOpen(false);
      gsap.set(revealRef.current, { z: 0, rotY: 0, slideX: 0, slideY: 0 });
      return;
    }
    setRevealing(true);
    revealTweenRef.current?.kill();
    // D'abord ferme la div (anim miroir dans ArtworkInfoPanel ~0.62s), puis inverse le tableau
    setInfoOpen(false);
    const isMobile = window.innerWidth <= 768;
    const tl = gsap.timeline({
      delay: 0.62,
      onComplete: () => { setRevealing(false); },
    });
    revealTweenRef.current = tl as unknown as gsap.core.Tween;
    // 1. Tableau revient à sa position (inverse glisse) — power2.inOut miroir
    if (isMobile) {
      tl.to(revealRef.current, { slideY: 0, duration: 0.6, ease: 'power2.inOut' });
    } else {
      tl.to(revealRef.current, { slideX: 0, duration: 0.6, ease: 'power2.inOut' });
    }
    // 2. Pause 1s (miroir de la pause ouverture)
    tl.to({}, { duration: 1 });
    // 3. Rotation inverse 360° → orientation initiale
    tl.to(revealRef.current, { rotY: 0, duration: 0.85, ease: 'power2.inOut' });
    // 4. Pause 1s
    tl.to({}, { duration: 1 });
    // 5. Recule vers le mur
    tl.to(revealRef.current, { z: 0, duration: 0.6, ease: 'power2.inOut' });
  }, []);

  // Changement de tableau : referme et reset reveal
  useEffect(() => {
    if (infoOpen || isRevealingRef.current) {
      setInfoOpen(false);
      revealTweenRef.current?.kill();
      gsap.set(revealRef.current, { z: 0, rotY: 0, slideX: 0, slideY: 0 });
      setRevealing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && infoOpen) handleInfoClose();
      else if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, infoOpen, handleInfoClose]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      revealTweenRef.current?.kill();
    };
  }, []);

  if (!artist) {
    return <Navigate to="/artistes" replace />;
  }

  return (
    <div className="gallery-page">
      {/* Grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />
      {hasWebGL ? (
        <div className="gallery-canvas-wrapper">
          <CanvasErrorBoundary
            fallback={
              <WebGLFallback
                artwork={artworks[activeIndex]}
                onPrev={goPrev}
                onNext={goNext}
                isAnimating={isAnimating}
              />
            }
          >
            <GalleryCanvas
              artworks={artworks}
              activeIndex={activeIndex}
              revealRef={revealRef}
              onFrameClick={handleFrameClick}
            />
          </CanvasErrorBoundary>
        </div>
      ) : (
        <WebGLFallback
          artwork={artworks[activeIndex]}
          onPrev={goPrev}
          onNext={goNext}
          isAnimating={isAnimating}
        />
      )}

      <GalleryControls
        artworks={artworks}
        activeIndex={activeIndex}
        onPrev={goPrev}
        onNext={goNext}
        isAnimating={isAnimating || isRevealing}
      />

      <ArtworkInfoPanel
        artwork={artworks[activeIndex]}
        artist={artist}
        isOpen={infoOpen}
        onClose={handleInfoClose}
      />
    </div>
  );
}
